const express = require('express');


const router = express.Router();

router.get('/', async (req, res, next) => {
    res.redirect('/main');
});

module.exports = router;
