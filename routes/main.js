const express = require('express');
const environment = require('nunjucks/src/environment');
const provideAdministrator = require("../provide/administrator-provide.js");
const provideInstrument = require("../provide/instrument-provide.js");
const { isLoggedIn } = require('./helpers');


const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        const admin = await provideAdministrator.getTarget((req?.user?.id) ? req.user.id : null);
        if (admin) {
            if (req.header('User-Agent').toLowerCase().match(/chrome/)) {
                res.redirect('/administrator');
            } else {
                res.json({ 'success': 'res.redirect(\'\/administrator\')', 'description': '관리자 권환이 확인 되었다면, 관리자 페이지로 이동합니다.' });
            }
        } else {
            if (req.header('User-Agent').toLowerCase().match(/chrome/)) {
                const { percussions, winds, strings, keyboards } = await provideInstrument.getClassification();

                res.render('mainPage', {
                    title: require('../package.json').name,
                    port: process.env.PORT,
                    html: 'mainPage',
                    user: req.user,
                    percussions,
                    winds,
                    strings,
                    keyboards,
                });
            } else if (req.user) {
                res.json({ 'success': 'res.redirect(\'\/mainPage\')', 'description': '유저(로그인o) 권한을 가지고 메인 페이지로 이동합니다.' });
            } else {
                res.json({ 'success': 'res.redirect(\'\/mainPage\')', 'description': '일반(로그인x) 권한을 가지고 메인 페이지로 이동합니다.' });
            }
        }
    });

module.exports = router;

