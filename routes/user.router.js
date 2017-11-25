const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/user.ctrl');

router.get("/login", UserCtrl.login); //redirects to login page
//router.post("/login", UserCtrl.signin); //validates user credentials


module.exports = router;