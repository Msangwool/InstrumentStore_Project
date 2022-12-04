const express = require('express');
const environment = require('nunjucks/src/environment');
const { User, Administrator } = require('../models');

const { isLoggedIn } = require('./helpers');


const router = express.Router();

router.route('/')
    .get( async(req, res, next) => {
        const admin = await Administrator.findOne({                 // 로그인 인증을 받고 넘어 왔을 때,
            where: { userId: req?.user?.id || null }                // req.user.id 즉, 사용자 아이디가 Administrator 테이블의 userID에 존재하면
        })       
        if (admin) {
            res.redirect('/administrator/getPermission');
        } else {
            res.render('mainPage', {
                title: require('../package.json').name,
                port: process.env.PORT,
                html: 'mainPage',
                user: req.user
            });
        }
    });

router.get('/login', async (req, res, next) => {
    console.log('login요청');
    res.render('login', {
        title: require('../package.json').name,
        port: process.env.PORT,
        html: 'login',
        description: '로그인',
        link: '/auth/login',
    });
});

router.get('/users', async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'description']
        });
        res.json(users);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;