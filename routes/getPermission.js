const express = require('express');
const bcrypt = require('bcrypt');
const environment = require('nunjucks/src/environment');
const { Administrator } = require('../models');
const { isLoggedIn } = require('./helpers');

const router = express.Router();

// localhost:3000/administrator/getPermission
router.get('/', isLoggedIn, async (req, res, next) => {             // passport를 사용하여 url 직접 접근을 막음. 
    const admin = await Administrator.findOne({                     // admin 계정을 탐색.
        where: { userId: req.user.id }                            
    })
    if (admin) isTrue = true                                        // admin 계정이 존재한다면 isTrue값을 true로 바꿈

    res.render('mainPage', {
        title: require('../package.json').name,
        port: process.env.PORT,
        html: 'mainPage',
        name: req.user.name,
        link: '/administrator/getPermission',
        isTrue
    });
});

router.route('/create/:adminName')
    .get(isLoggedIn, (req, res) => {                    // get 요청시에, 로그인이 유효하다면, addInstrument 페이지를 띄워줌.
        res.render('addInstrument', {
            title: require('../package.json').name,
            port: process.env.PORT,
            html: 'addInstrument',
            name: req.params.adminName,                 // :adminName으로 받아온 값을 그대로 사용하기 위함.
            link: '/administrator/getPermission'
        });
    })
    .post(async (req, res, next) => {
        const { name, cost, age, category } = req.body;
        console.log(name);
        console.log(cost);
        console.log(age);
        console.log(category);
    });


module.exports = router;