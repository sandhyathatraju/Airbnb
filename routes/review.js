const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const reviewController=require("../controllers/review.js");

const {validateReview,isLoggedIn,isReviewAuthor} =require("../middleware.js") ;
  
// Reviews
// Post Route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.reviewPost));

// Review Delete Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,reviewController.destroyPost);

module.exports=router;    