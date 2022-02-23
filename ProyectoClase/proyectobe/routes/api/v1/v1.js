const express = require('express');
const router = express.Router();
const {verifyApiHeaderToken} = require('./headerVerifyMiddleware');
const {passport, jwtMiddleware} = require('./seguridad/jwtHelper');
const pacientesRoutes = require('./pacientes/pacientes');
const expedientesRoutes = require('./expedientes/expedientes');
const seguridadRoutes = require('./seguridad/seguridad');

router.use(passport.initialize());
//public
router.use('/seguridad', seguridadRoutes);
//middlewares
router.use('/pacientes', verifyApiHeaderToken, jwtMiddleware, pacientesRoutes);
router.use('/expedientes', expedientesRoutes);

module.exports = router;