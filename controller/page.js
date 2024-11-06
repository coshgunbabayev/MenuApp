function getIndexPage(req, res) {
    res.status(200).render('index');
};

function getSignUpPage(req, res) {
    res.status(200).render('signup');
};

function getVerificationCodePage(req, res) {
    res.status(200).render('verification-code', {
        token: req.params.token
    });
};

function getVerificationEmailPage(req, res) {
    res.status(200).render('verification-email');
};

function getLoginPage(req, res) {
    res.status(200).render('login');
};

function getCreatePage(req, res) {
    res.status(200).render('create');
};

function getMenuPage(req, res) {
    res.status(200).render('menu');
};

export {
    getIndexPage,
    getSignUpPage,
    getVerificationCodePage,
    getVerificationEmailPage,
    getLoginPage,
    getCreatePage,
    getMenuPage
};