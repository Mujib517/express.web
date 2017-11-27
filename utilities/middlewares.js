module.exports = {
    isAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) next();
        else res.redirect("/users/login");
    },

    attchAuthInfo: function (req, res, next) {
        res.locals.isLoggedIn = true;
        next();
    },

    noCache: function (req, res, next) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        next();
    }
}