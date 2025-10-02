const express = require('express');
const router = express.Router(); //this is express Router Object to handle routering
const wrapasync = require("../utils/wrapasync.js"); //wrapasync is for handling async errors
const {listingSchema} = require("../schema.js"); //this is for Server Side Scehma validation

const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner} = require("../middleware.js");
const {validatelisting} = require("../middleware.js"); 
const listingcontroller = require('../controllers/listings.js'); 
const multer  = require('multer'); //multer is for handling multipart/form-data like images which have been uploaded
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage}); //and this is for dest in which my files have to store like in cloudinary storage

//now here we are using router object to create the router and then we are exproting that so app.js file will not look like bloated(very big)


router.route("/")
    //INDEX ROUTE
    //and /listings is been used in app.js so need to use that again in listing.js
    .get(wrapasync (listingcontroller.index))
    //Create Route //validatelisting it is middleware defined above
    .post(isLoggedIn,validatelisting,upload.single("listing[image]"), wrapasync ( listingcontroller.CreateRoute));
    

//NEW Route
router.get("/new",isLoggedIn, listingcontroller.renderNewForm);

router.route("/:id")
    .get(wrapasync (listingcontroller.showListings))
    //update route
    .put(isLoggedIn,isOwner, upload.single("listing[image]"),validatelisting,wrapasync (listingcontroller.updateroute))
    //Delete Route
    .delete(isLoggedIn,isOwner, wrapasync(listingcontroller.deleteroute ));





//EDIT ROUTE
router.get("/:id/edit", isLoggedIn,isOwner,wrapasync (listingcontroller.EditRoute)); 

module.exports = router;

