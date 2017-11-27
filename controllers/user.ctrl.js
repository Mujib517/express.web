const User = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports = {

    login: (req, res) => {
        res.render("login");
    },

    signin: (req, email, password, done) => {
        User.findOne({ email: email })
            .exec()
            .then(function (usr) {
                if (usr) {
                    var pwd = usr.password; //db pwd
                    var isCorrectPwd = bcrypt.compareSync(password, pwd);
                    if (isCorrectPwd) done(null, { email: usr.email });
                    else done("Wrong username or password");
                }
                else done("Wrong username or password");
            })
            .catch(function (err) {
                done("Wrong username or password");
            });
    },

    logout: (req, res) => {
        req.logout();
        res.redirect("/users/login");
    }
}