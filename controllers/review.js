const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createreview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id); //this will find the id of that listing under which we have to store the review
    let newreview = new Review(req.body.review); //this will fetch the review deatils from form and create the new review
    newreview.author = req.user._id;
    listing.review.push(newreview); //pushing that review on listings db

    await newreview.save(); //saving
    await listing.save();
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.deletereview = async(req,res)=>{
    let {id,reviewid} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {review: reviewid}}); //here we are pulling(deleting) that reviewid from listing review array
    await Review.findByIdAndDelete(reviewid); //and deleting that id from review db also
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
}