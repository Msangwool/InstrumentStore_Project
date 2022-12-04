const express = require('express');
const environment = require('nunjucks/src/environment');


const router = express.Router();

// localhost:3000/administrator
router.get('/', (req, res) =>
    res.render('login', {
        title: require('../package.json').name,
        port: process.env.PORT,
        html: 'login',
        description: '관리자 계정 로그인',
        link: '/auth/login',
    }));

    

module.exports = router;