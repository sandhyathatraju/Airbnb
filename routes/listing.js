const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listController=require("../controllers/listing.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js")
const upload=multer({storage})
// New Route
router.get("/new",isLoggedIn,listController.newList);

// router.route() it used to combine the routes which have same destinations

// Index Route and Create Route
router.route("/")
.get (wrapAsync(listController.index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listController.validateList));



    
// Show ,Update,Delete Routes
router.route("/:id")
.get(wrapAsync(listController.showList))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listController.updateList))
.delete(isLoggedIn,isOwner,wrapAsync(listController.deleteList)); 

// Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listController.editList));

module.exports=router;