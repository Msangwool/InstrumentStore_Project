const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
    if (req.header('User-Agent').toLowerCase().match(/chrome/)) {
        res.redirect('/main');
    } else {
        res.json({'success':'res.redirect(\'\/main\')','description':'메인페이지로 이동하는 페이지 입니다.'});
    }
});

module.exports = router;
