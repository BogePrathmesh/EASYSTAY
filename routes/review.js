const express = require("express");
const router = express.Router({mergeParams:true}); //this for merging parent route in child route
const wrapasync = require("../utils/wrapasync.js"); //wrapasync is for handling async errors
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isreviewAuthor} = require("../middleware.js");
const reviewcontroller = require("../controllers/review.js");

//review ROute from showe.ejs file
router.post("/",isLoggedIn ,validateReview, wrapasync(reviewcontroller.createreview));

//delete route for deleting review from any listings
router.delete("/:reviewid",isLoggedIn,isreviewAuthor,wrapasync(reviewcontroller.deletereview));

module.exports = router;