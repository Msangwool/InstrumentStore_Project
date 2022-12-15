const express = require('express');
const { redirect } = require('express/lib/response');
const provideAdministrator = require("../provide/administrator-provide.js");
const provideInstrument = require("../provide/instrument-provide.js");
const { logout, isLoggedIn } = require('./helpers');

const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        res.redirect('/main');
    });

router.get('/info', isLoggedIn, async (req, res, next) => {
    const instruments = await provideInstrument.getAll();
    res.json(instruments);
});

router.get('/delete/:instrumentId', async (req, res, next) => {
    try {
        const result = await provideInstrument.destroyInstrument(req.params.instrumentId);

        if (result) {
            res.redirect('/main');
        }
        else next(`There is no instrumentId with ${req.params.instrumentId}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/update/:instrumentId', isLoggedIn, async (req, res, next) => {
    const { name, cost, count, category, content } = req.body;
    const link = '/instrument/' + req.params.instrumentId;
    const admin = await provideAdministrator.getTarget((req?.user?.id) ? req.user.id : null);

    if (admin) {    // 관리자 권한.
        const updateContext = {};
        if (cost != undefined & cost.trim() != '') {
            const instrument = await provideInstrument.duplicateCheck(name, cost, req.user.id);

            if (!instrument) {
                updateContext['cost'] = cost
            } else if (instrument.instrumentId != req.params.instrumentId) {
                res.write("<script>alert('Wrong Approach')</script>");
                res.write(`<script>window.location=\"${link}\"</script>`);
                return
            }
        }
        if (count != undefined & count.trim() != '') { updateContext['count'] = count }
        if (category != undefined & category != '') { updateContext['category'] = category }
        if (content != undefined & content.trim() != '') { updateContext['description'] = content }
        const result = await provideInstrument.updateAll(updateContext, req.params.instrumentId);

        if (result) {
            res.write("<script>alert('update complete')</script>");
            res.write(`<script>window.location=\"${link}\"</script>`);
        } else {
            res.write("<script>alert('update fail')</script>");
            res.write(`<script>window.location=\"${link}\"</script>`);
        }
    } else {
        res.write("<script>alert('No permission')</script>");
        res.write("<script>window.location=\"/main\"</script>");
    }
});

router.get('/:instrumentId', async (req, res, next) => {
    const admin = await provideAdministrator.getTarget((req?.user?.id) ? req.user.id : null);
    const instruments = await provideInstrument.getTartget(req.params.instrumentId);

    if (admin) {
        // 관리자 권한
        if (instruments.creatorId == admin.userId) {
            if (req.header('User-Agent').toLowerCase().match(/chrome/)) {
                res.render('instrumentPage', {
                    title: require('../package.json').name,
                    port: process.env.PORT,
                    html: 'updateConfirm',
                    isTrue: true,
                    user: req.user,
                    link: '/instrument/update',
                    instruments,
                });
            } else {
                res.json(instruments);
            }
        } else {
            res.write("<script>alert('No permission')</script>");
            res.write("<script>window.location=\"/main\"</script>");
        }
    } else if (req.user) {
        // 사용자 권한
        res.render('instrumentPage', {
            title: require('../package.json').name,
            port: process.env.PORT,
            html: 'purchase',                               // 구매 or 장바구니 목적.
            user: req.user,                                 // 구매는 아예 사라지고, 장바구니는 안 사라짐.대신 선택만 count 개수에 맞게 해주도록.
            link: '/basket',
            instruments,
        });
    } else {
        // 권한 x -> redirect rogin
        res.redirect('/user/login');
    }
})

module.exports = router;