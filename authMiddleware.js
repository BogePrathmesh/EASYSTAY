const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js"); //this is for express Error
const { model } = require("mongoose");
const {listingSchema} = require("./schema.js"); //this is for Server Side Scehma validation
const {reviewSchema} = require("./schema.js"); //this is for Server Side Scehma validation
const Review = require("./models/review.js");


module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()) //this will check current user session id if it has something
    {
        req.session.redirectUrl = req.originalUrl; //basically this is redirect to page from which user has requested to access the page but need to login first
        req.flash("error","You must be logged in to create the listing");
        return res.redirect("/login");
    }
    next();
}
//this is beacuse when user log in passport will reset the req.session.redirectUrl so it will undefine but we need that we are storing it in locals and passport dont have access to delete it so that why 
module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner =async (req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currentUser._id)){
        req.flash("error","You Are Not Owner of this");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isreviewAuthor =async (req,res,next)=>{
    let {id, reviewid} = req.params;
    let review = await Review.findById(reviewid);
    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash("error","You Are Not Author of this Review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

//Middleware Schema Validation in Server Side
module.exports.validatelisting = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body); //this will check the server side schema validation which in schem.ejs file
    if(error)
    {
        throw new ExpressError(400, error); //if joi throws error we will catch it 
    }
    else{
        next();
    }
}

//middleWare Schema for Validation of review
module.exports.validateReview = (req,res,next) =>{
    let {error} = reviewSchema.validate(req.body); //this will check the server side schema validation which in schem.ejs file
    if(error)
    {
        throw new ExpressError(400, error); //if joi throws error we will catch it 
    }
    else{
        next();
    }
}
