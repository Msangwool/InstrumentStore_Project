const express = require('express');
const bcrypt = require('bcrypt')
const User = require('../models/user');

const { logout, isLoggedIn } = require('./helpers');


const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        res.redirect('/main');
    });

router.get('/login', async (req, res, next) => {
    res.render('login', {
        title: require('../package.json').name,
        port: process.env.PORT,
        html: 'login',
        description: '로그인',
        link: '/auth/login',
    });
});

router.route('/signUp')
    .get(async (req, res, next) => {
        res.render('signUp', {
            title: require('../package.json').name,
            port: process.env.PORT,
            html: 'signUp',
            description: '회원가입',
            link: '/user/signUp',
        });
    })
    .post(async (req, res, next) => {
        const { id, password, name, description, phoneNumber, email } = req.body;

        const user = await User.findOne({ where: { id } });
        if (user) {
            next('이미 등록된 사용자 아이디입니다.');
            return;
        }

        try {
            const hash = await bcrypt.hash(password, 12);
            await User.create({
                id,
                password: hash,
                name,
                description,
                phoneNumber,
                email,
            });

            res.redirect('/main');
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

router.get('/info', isLoggedIn, async (req, res, next) => {
    try {
        res.render('user', {
            title: require('../package.json').name,
            port: process.env.PORT,
            html: 'user',
            user: req.user,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/delete/:id', async (req, res, next) => {
    try {
        const result = await User.destroy({
            where: { id: req.params.id }
        });

        if (result) next();
        else next(`There is no user with ${req.params.id}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
}, logout);

module.exports = router;
