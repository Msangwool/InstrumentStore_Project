const express = require('express');
const environment = require('nunjucks/src/environment');
const { INTEGER } = require('sequelize');
const { Administrator, Instrument } = require('../models');
const { getPercussions, getWinds, getStrings, getKeyboards } = require('../provide/instrument-info');
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
    if (admin) {                                            // passport로 권한을 얻고 url로 직접 접근하는 경우를 막음.
        isTrue = true                                        // admin 계정이 존재한다면 isTrue값을 true로 바꿈

        const instruments = await Instrument.findAll({
            attributes: ['name', 'cost', 'category', 'creatorId']
        });
        const percussions = getPercussions(instruments);
        const winds = getWinds(instruments);
        const strings = getStrings(instruments);
        const keyboards = getKeyboards(instruments);

        res.render('mainPage', {
            title: require('../package.json').name,
            port: process.env.PORT,
            html: 'mainPage',
            name: req.user.name,
            link: '/administrator',
            isTrue,
            percussions,
            winds,
            strings,
            keyboards,
        });
    } else {
        res.write("<script>alert('No permission')</script>");
        res.write("<script>window.location=\"/main\"</script>");
    }
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
        const { name, cost, count, category, content } = req.body;
        const instrument = await Instrument.findOne({ // 상품, 가격, 아이디를 비교함
            where: {
                name: name,
                cost: cost,
                creatorId: req.user.id,
            }
        });
        if (instrument) {                   // 동일한 제품으로 판단되면, 개수만 더해줌.
            const increase = parseInt(instrument.count) + parseInt(count)
            Instrument.update({ count: increase }, { where: { instrumentId: instrument.instrumentId } })
            // res.send('중복 제품이 존재해 기존 제품에 추가되었습니다.');
            res.write("<script>alert('중복 제품이 존재해 기존 제품에 추가되었습니다.')</script>");
            res.write("<script>window.location=\"/administrator\"</script>");
        } else {
            try {
                await Instrument.create({
                    name,
                    cost,
                    category,
                    count,
                    description: content,
                    creatorId: req.user.id,
                });
                res.redirect('/administrator');
            } catch (err) {
                console.error(err);
                next(err);
            }
        }
    });



module.exports = router;