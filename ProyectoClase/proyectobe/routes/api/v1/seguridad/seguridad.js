const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Usuarios = require("../../../../dao/usuarios/usuarios.model");
const usuariosModel = new Usuarios();

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    let rslt = await usuariosModel.new(email, password);
    res.status(200).json({ status: "Ok", result: rslt });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: "Failed" });
  }
  //res.status(502).json({msg: 'incomplete'});
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userInDb = await usuariosModel.getByEmail(email);
    if (userInDb) {
      const isPassValid = await usuariosModel.comparePassword(
        password,
        userInDb.password
      );
      if (isPassValid) {
        const { email, roles, _id } = userInDb;
        const payload = {
          jwt: jwt.sign({ email, roles, _id }, process.env.JWT_SECRET),
          user: { email, roles, _id },
        };
        res.status(200).json(payload);
      } else {
        res.status(400).json({ status: "Failed", error: 2 });
      }
    } else {
      res.status(400).json({ status: "Failed", error: 1 });
    }
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: "Failed" });
  }
});

//CONTRASENIA
//Olvidar
router.post("/forget", async (req, res) => {
  try {
    const email = req.body.email;
    const hostUrl = req.get("host");

    const user = await usuariosModel.getByEmail(email);

    if (!user) {
      res.status(400).json({ status: "failed", msg: "Bad request" });
      return;
    }

    const payload = {
      _id: user._id,
      roles: user.roles,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    const link = `http://${hostUrl}/api/v1/seguridad/recovery/${user._id}/${token}`;

    res.status(200).json({
      status: "ok",
      questionLink: link,
    });
  } catch (error) {
    res.status(500).json({ status: "failed", msg: "Internal Server error" });
  }
});

//Recuperar
router.post("/recovery/:id/:token", async (req, res) => {
  try {
    const { id, token } = req.params;
    const answer = req.body.answer;
    const hostUrl = req.get("host");

    const user = await usuariosModel.getById(id);

    if (!user) {
      res.status(404).json({ status: "Not found" });
      return;
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyToken) {
      res.status(404).json({ status: "Not found" });
      return;
    }

    if (user.recovery !== answer) {
      res.status(401).json({ status: "failed", msg: "Unauthorized" });
      return;
    }

    const payload = {
      _id: user._id,
      roles: user.roles,
      email: user.email,
    };

    const resetToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    const resetLink = `http://${hostUrl}/api/v1/seguridad/reset/${user._id}/${resetToken}`;

    res.status(200).json({
      status: "ok",
      resetPasswordLink: resetLink,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", msg: "Internal Server error" });
  }
});

//Cambiar
router.post("/reset/:id/:token", async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password, confirmPassword } = req.body;

    const user = await usuariosModel.getById(id);

    if (!user) {
      res.status(404).json({ status: "Not found" });
      return;
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyToken) {
      res.status(404).json({ status: "Not found" });
      return;
    }

    if (password !== confirmPassword) {
      res
        .status(400)
        .json({
          status: "failed",
          msg: "password and confirmPassword must be the same",
        });
      return;
    }

    const result = await usuariosModel.updatePassword(user._id, password);
    res.status(200).json({
      status: "ok",
      msg: "Password reset successful",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", msg: "Internal Server error" });
  }
});

module.exports = router;
