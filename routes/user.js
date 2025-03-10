const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const {newUrl}=require("../middleware.js");
const userController=require("../controllers/user.js");

// router.route() used to combine same rotes destinations

// signup
router.route("/signup")
.get(userController.renderForm)
.post(wrapAsync(userController.signup));

// login  Render Login
router.route("/login")
.get(userController.login)
.post(newUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true,}),userController.renderLogin);

// Logout
router.get("/logout",userController.logout);


module.exports=router;