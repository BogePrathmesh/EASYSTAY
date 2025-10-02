const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ //this is for connection of cloudinary to this code
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({ //this for showing in which folder on cloudinary account data has to store
  cloudinary: cloudinary,
  params: {
    folder: 'easy_stay_dev', //folder name
    allowedFormats: ["png","jpg","jpeg"], // supports promises as well
  },
});

module.exports ={
    cloudinary,
    storage,
}