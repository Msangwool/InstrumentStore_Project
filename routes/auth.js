const express = require('express');
const passport = require('passport');

const router = express.Router();

const { logout } = require('./helpers');


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (user) req.login(user, loginError => res.redirect('/main'));
        else next(info);
    })(req, res, next);
});

router.get('/logout', logout);

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback',
    passport.authenticate('kakao', { failureRedirect: '/' }),
    (req, res) => res.redirect('/')
);

module.exports = router;
