const express = require('express');
const environment = require('nunjucks/src/environment');
const { User, Administrator, Instrument } = require('../models');
const { getPercussions, getWinds, getStrings, getKeyboards } = require('../provide/instrument-info');

const { isLoggedIn } = require('./helpers');


const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        const admin = await Administrator.findOne({                 // 로그인 인증을 받고 넘어 왔을 때,
            where: { userId: req?.user?.id || null }                // req.user.id 즉, 사용자 아이디가 Administrator 테이블의 userID에 존재하면
        })
        if (admin) {
            res.redirect('/administrator');
        } else {
            const instruments = await Instrument.findAll({
                attributes: ['instrumentId', 'name', 'cost', 'category', 'creatorId']
            });
            const percussions = getPercussions(instruments);
            const winds = getWinds(instruments);
            const strings = getStrings(instruments);
            const keyboards = getKeyboards(instruments);

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
            html: 'purchase',
            user: req.user,
            instruments,
        });
    } else {
        // 권한 x -> redirect rogin
        res.redirect('/user/login');
    }
})

module.exports = router;