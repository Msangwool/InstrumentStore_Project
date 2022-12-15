exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) next();
    else res.status(403).send('로그인 필요');
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) next();
    else res.redirect(`/`);
};

exports.logout = (req, res, next) => {
    req.logout(err => {
        if (err) { return next(err); }
        req.session.destroy();
        res.redirect('/main');
    });
};