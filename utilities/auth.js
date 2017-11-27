const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');


const userCtrl = require('../controllers/user.ctrl');
//dependency injection
function Auth(app) {

    this.configureAuth = function () {
        app.use(session({ secret: 'secret' }));
        app.use(passport.initialize());
        app.use(passport.session());

        passport.serializeUser(function (user, done) {
            done(null, user.email);
        });

        passport.deserializeUser(function (email, done) {
            done(null, email);
        });

        passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        }, function (req, email, password, done) {
            req.userEmail = email;
            userCtrl.signin(req, email, password, done);
        }));
    }
}

module.exports = Auth;