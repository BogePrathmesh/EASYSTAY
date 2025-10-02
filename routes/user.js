const express = require("express");
const router = express.Router(); 
const User = require("../models/user.js")
const wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userscontroller = require("../controllers/users.js");

router.route("/signup")
    .get(userscontroller.renderSignupForm)
    .post(wrapasync(userscontroller.signup));

router.route("/login")
    .get(userscontroller.renderLoginForm)
    //here passport.authenticate() will authencticare the user which is present in db or not and failureredirect will redirect to page if user fails to authenticate
    //it is bascially middleware
    .post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userscontroller.Login);
    
router.get("/logout",userscontroller.logout)

module.exports = router;