const express = require('express');
const environment = require('nunjucks/src/environment');
const { INTEGER } = require('sequelize');
const { Administrator, Instrument } = require('../models');
const { isLoggedIn } = require('./helpers');


const router = express.Router();

// localhost:3000/administrator
router.get('/', isLoggedIn, async (req, res) => {
    // res.render('login', {
    //     title: require('../package.json').name,
    //     port: process.env.PORT,
    //     html: 'login',
    //     description: '관리자 계정 로그인',
    //     link: '/auth/login',
    // })
    const admin = await Administrator.findOne({                     // admin 계정을 탐색.
        where: { userId: req.user.id }
    })
    if (admin) isTrue = true                                        // admin 계정이 존재한다면 isTrue값을 true로 바꿈

    res.render('mainPage', {
        title: require('../package.json').name,
        port: process.env.PORT,
        html: 'mainPage',
        name: req.user.name,
        link: '/administrator',
        isTrue
    });
});

router.route('/createInstrument')                                 // 상품 추가 요청
    .get(isLoggedIn, async (req, res) => {                    // get 요청시에, 로그인이 유효하다면, addInstrument 페이지를 띄워줌.
        res.render('addInstrument', {
            title: require('../package.json').name,
            port: process.env.PORT,
            html: 'addInstrument',
            user: req.user,                 // :adminName으로 받아온 값을 그대로 사용하기 위함.
            link: '/administrator/createInstrument'
        });
    })
    .post(async (req, res, next) => {
        const { name, cost, count, category } = req.body;
        const instrument = await Instrument.findOne({ // 상품이 있는지. 그럼 가격까지 같은지 확인해야 함.
            where: {
                name: name,
                cost: cost,
            }
        });
        if (instrument) {
            const increase = parseInt(instrument.count) + parseInt(count)
            Instrument.update({count: increase}, {where: {instrumentId: instrument.instrumentId}})
            res.send('중복 제품이 존재해 기존 제품에 추가되었습니다.');
        }
        // try {
        //     await Instrument.create({
        //         name,
        //         cost,
        //         category,
        //         count,
        //         creatorId: req.user.id,
        //     });

        //     res.redirect('/administrator');
        // } catch (err) {
        //     console.error(err);
        //     next(err);
        // }
    });



module.exports = router;