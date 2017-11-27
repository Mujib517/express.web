const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserCtrl = require('../controllers/user.ctrl');
const productCtrl = require('../controllers/product.ctrl');

router.get("/login", UserCtrl.login); //redirects to login page

router.post('/login', passport.authenticate('local-login', {
    failureRedirect: '/users/login'
}), function (req, res) {
    res.locals.email = req.userEmail;
    res.locals.isLoggedIn = true;
    productCtrl.get(req, res);
});

router.get('/logout', UserCtrl.logout);

module.exports = router;