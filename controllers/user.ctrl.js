const User = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports = {

    login: (req, res) => {
        res.render("login");
    },

    signin: (req, res) => {
        var user = new User(req.body);


        User.findOne({ email: user.email })
            .exec()
            .then(function (usr) {
                if (usr) {
                    console.log(usr);
                    var pwd = usr.password; //db pwd
                    var isCorrectPwd = bcrypt.compareSync(req.body.password, pwd);
                    if (isCorrectPwd) res.redirect("/products");
                    else {
                        res.locals.error = true;
                        res.render("login");
                    }
                }
                else {
                    res.locals.error = true;
                    res.render("login");
                }
            })
            .catch(function (err) {
                res.render("error", { err: err });
            });
    }
}