const express = require('express');
const { redirect } = require('express/lib/response');
const { Administrator, Instrument } = require('../models');
const { logout, isLoggedIn } = require('./helpers');

const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        res.redirect('/main');
    });

router.get('/delete/:instrumentId', async (req, res, next) => {
    try {
        const result = await Instrument.destroy({
            where: { instrumentId: req.params.instrumentId }
        });

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
    const admin = await Administrator.findOne({                 // 로그인 인증을 받고 넘어 왔을 때,
        where: { userId: req?.user?.id || null }                // req.user.id 즉, 사용자 아이디가 Administrator 테이블의 userID에 존재하면
    })
    if (admin) {    // 관리자 권한.
        const updateContext = {};
        if (cost != undefined & cost.trim() != '') { 
            const instrument = await Instrument.findOne({ // 상품, 가격, 아이디를 비교함
                where: {
                    name: name,
                    cost: cost,
                    creatorId: req.user.id,
                }
            });
            
            if (!instrument) {
                updateContext['cost'] = cost
            } else if (instrument.instrumentId != req.params.instrumentId){
                res.write("<script>alert('Wrong Approach')</script>");
                res.write(`<script>window.location=\"${link}\"</script>`);
                return
            }
        }
        if (count != undefined & count.trim() != '') { updateContext['count'] = count }
        if (category != undefined & category != '') { updateContext['category'] = category }
        if (content != undefined & content.trim() != '') { updateContext['description'] = content }
        const result = await Instrument.update(
            updateContext, 
            {
            where: { instrumentId: req.params.instrumentId }
            });
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
    const admin = await Administrator.findOne({                 // 로그인 인증을 받고 넘어 왔을 때,
        where: { userId: req?.user?.id || null }                // req.user.id 즉, 사용자 아이디가 Administrator 테이블의 userID에 존재하면
    })
    const instruments = await Instrument.findOne({
        where: { instrumentId: req.params.instrumentId || null }
    })
    if (admin) {
        // 관리자 권한
        if (instruments.creatorId == admin.userId) {
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
            instruments,
        });
    } else {
        // 권한 x -> redirect rogin
        res.redirect('/user/login');
    }
})

module.exports = router;