const Joi = require("joi");
const review = require("./models/review");

//here we are defining the server side schema to validate attributes like price should only of 5 digit etc
module.exports.listingSchema = Joi.object({
    //here we are defining the object for which schema is defining
    listing : Joi.object({

        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required().min(0),
        image:Joi.string().allow("",null) //it should be string but we are allowing it to be null or empty


    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        review:Joi.number().required().min(0).max(5),
        comment:Joi.string().required(),
    }).required()
})

