const express = require('express');
const environment = require('nunjucks/src/environment');
const provideAdministrator = require("../provide/administrator-provide.js");
const provideInstrument = require("../provide/instrument-provide.js");
const { isLoggedIn } = require('./helpers');


const router = express.Router();

// localhost:3000/administrator
router.get('/', isLoggedIn, async (req, res) => {
    const admin = await provideAdministrator.getTarget(req.user.id);

    if (admin) {                                             // passport로 권한을 얻고 url로 직접 접근하는 경우를 막음.
        isTrue = true                                        // admin 계정이 존재한다면 isTrue값을 true로 바꿈

        const { percussions, winds, strings, keyboards } = await provideInstrument.getClassification();

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
        res.json({ fail: 'No permission' });
    }
});

router.route('/createInstrument')                           // 상품 추가 요청
    .get(isLoggedIn, async (req, res) => {                  // get 요청시에, 로그인이 유효하다면, addInstrument 페이지를 띄워줌.
        res.render('addInstrument', {
            title: require('../package.json').name,
            port: process.env.PORT,
            html: 'addInstrument',
            user: req.user,                                 // :adminName으로 받아온 값을 그대로 사용하기 위함.
            link: '/administrator/createInstrument'
        });
    })
    .post(async (req, res, next) => {
        const { name, cost, count, category, content } = req.body;
        const instrument = await provideInstrument.duplicateCheck(name, cost, req.user.id);

        if (instrument) {                                   // 동일한 제품으로 판단되면, 개수만 더해줌.
            const increase = parseInt(instrument.count) + parseInt(count)
            // increase, instrument.instrumentId
            await provideInstrument.updateCount(increase, instrument.instrumentId);
            // res.send('중복 제품이 존재해 기존 제품에 추가되었습니다.');
            res.json({success:'중복 제품이 존재해 기존 제품에 추가되었습니다.', instrumentId:instrument.instrumentId, count:increase});
        } else {
            try {
                await provideInstrument.createInstrument(name, cost, category, count, content, req.user.id);
                res.json({name, cost, category, count, content, userId: req.user.id});
            } catch (err) {
                console.error(err);
                next(err);
            }
        }
    });

module.exports = router;