const mongoose = require("mongoose"); //basically created module for property to show on website
const review = require("./review");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const User = require("./user.js");
const { types, ref } = require("joi");

const listingSchema = new Schema({
    title:{
        type:String,

    },
    description:{
        type:String,
    },
    image:{
        url: String,
        filename : String,
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    review:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],

    owner:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    geometry:{   
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },   
    category:{
        type:String,
        enum:["Mountains","Iconic City","Castles","Camping","Farms","Artict","Domes","Boats","Amazing Pool"],
    }
});

//creating middleware when listings are deleted all reviews which belong to that listings should be deleted 
listingSchema.post("findOneAndDelete", async(listing)=>{ //this will trigger when listing deletemethod is been call
    if(listing)
    {
        await Review.deleteMany({_id:{$in: listing.review}}); //here listings review make group and then check each id of it
    }  
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;