const express = require('express');
const router = express.Router();

router.post('/signin', async (req, res) => {
    res.status(502).json({msg: 'incomplete'});
});

router.post('/login', async (req, res) => {
    res.status(502).json({msg: 'incomplete'});
});

module.exports = router;