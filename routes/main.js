const express = require('express');
const environment = require('nunjucks/src/environment');
const { User, Administrator, Instrument } = require('../models');
const provide = require("../provide/instrument-info.js");
const { isLoggedIn } = require('./helpers');


const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        const admin = await Administrator.findOne({                 // 로그인 인증을 받고 넘어 왔을 때,
            where: { userId: req?.user?.id || null }                // req.user.id 즉, 사용자 아이디가 Administrator 테이블의 userID에 존재하면
        })
        if (admin) {
            if (req.header('User-Agent').toLowerCase().match(/chrome/)) {
                res.redirect('/administrator');
            } else {
                res.json({'success':'res.redirect(\'\/administrator\')','description':'관리자 권환이 확인 되었다면, 관리자 페이지로 이동합니다.'});
            }
        } else {
            if (req.header('User-Agent').toLowerCase().match(/chrome/)) {
                const { percussions, winds, strings, keyboards } = await provide.getALL();

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
                res.json({'success':'res.redirect(\'\/mainPage\')','description':'유저(로그인o) 권한을 가지고 메인 페이지로 이동합니다.'});
            } else {
                res.json({'success':'res.redirect(\'\/mainPage\')','description':'일반(로그인x) 권한을 가지고 메인 페이지로 이동합니다.'});
            }
        }
    });

module.exports = router;