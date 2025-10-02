const { response } = require("express");
const Listing = require("../models/listing") //basically this for controlling backend login its part of MVC framework(Model,View,controller)
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding'); //This is for Geocoding file converting Mumbai,India -> [latitude,longitude]
const mapToken = process.env.MAP_TOKEN;
const ExpressError = require("../utils/ExpressError");
const geoCodingClient = mbxGeocoding({ accessToken: mapToken }); //this is like functionality which has features like to convert geocoding conversion

module.exports.index = async (req, res) => {
    const filter = req.query.type; // e.g., /listings?type=Trending
    const country = req.query.country; // country search

    let query = {};

    if (filter) query.category = filter;
    if (country) query.country = country;

    const alllisting = await Listing.find(query);

    res.render("./listing/index.ejs", { alllisting });
};


module.exports.renderNewForm = (req,res)=>{
    res.render("./listing/new.ejs");
}

module.exports.showListings = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"review",populate:{path:"author"}}).populate("owner"); //populate is for reviews to show there data
    if(!listing)
    {
        req.flash("error","Listing Not Found 404!");
        return res.redirect("/listings");
    }
    
    res.render("./listing/show.ejs",{listing});
}

module.exports.CreateRoute = async (req,res,next)=>{ //here using wrapasync and passing this as function check to errors
    
    let respone = await geoCodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit:1,
    })
    .send();

    let url = req.file.path;
    let filename = req.file.filename;

    
    let newlisting = new Listing(req.body.listing);//here listing its object coming from new.ejs and coverting that into Listing module to store in db
    newlisting.owner = req.user._id;
    newlisting.image = {url,filename};

    newlisting.geometry = respone.body.features[0].geometry;

    let savedLsiting = await newlisting.save();
    console.log(savedLsiting);
    req.flash("success","new Listings Created!");
    res.redirect("/listings");
}



module.exports.EditRoute = async (req,res)=>{ //finding list with id and send there data to show.ejs
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing)
    {
        req.flash("error","Listing Not Found 404!");
        return res.redirect("/listings");
    }
    let originalImage = listing.image.url;
    originalImage = originalImage.replace("/upload","/upload/w_200");
    res.render("listing/edit",{listing,originalImage});
}

module.exports.updateroute = async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Send validate DATA");
    }
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing}); //deconstructing all object into each value

    if(typeof req.file!== "undefined"){ //only if user update the files image
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = {url,filename};
      await listing.save();
    }
    
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteroute = async (req,res)=>{
    let {id } = req.params;
    await Listing.findByIdAndDelete(id); 
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");  
}