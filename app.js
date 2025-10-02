if(process.env.NODE_ENV!="producation") //this is for producation level
{
  require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodoverride = require('method-override');
const ejsMate = require("ejs-mate"); //this will create the same pages style ex footer or navbar
const wrapasync = require("./utils/wrapasync.js"); //wrapasync is for handling async errors
// const MONGOURL=  "mongodb://127.0.0.1:27017/stayeasy"
const AtlasMongo = process.env.ATLASTDB_URL; //mongodb atlas Url which is cloud DB 

const ExpressError = require("./utils/ExpressError.js"); //this is for express Error
const session = require("express-session");
const MongoStore = require("connect-mongo"); //this is for storing session information on cloud side(MongoDb)
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local"); //we are using local startegy like username and password from user so thats why passport-local
const User = require("./models/user.js"); //requring user module


const listingrouter = require("./routes/listings.js");
const reviewrouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const review = require("./models/review.js");

main().then((result)=>{
    console.log("Connected to DB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(AtlasMongo);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));

const store = MongoStore.create({ //this will store in session infomation on cloud instead of local machine
  mongoUrl: AtlasMongo,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter: 24*3600, //touchAfter is Basically for store in session information after 24 hours like user doesn't intereact with server so nothing to store in in session so thats why 
});

store.on("error",()=>{
  console.log("Error in Mongo Session Store",err);
})

const sessionoptions = {
  store:store,
  secret : process.env.SECRET,
  resave: false,
  saveUninitialized : true,
  //here we are using cookies to track session
  cookie:{
    expries:Date.now() + 7 * 24 * 60 * 60 * 1000, //here cookies dont have expriry time to expries this we have to set time its 7days 24hr 60min 60 sec 100 millesc
    maxAge: 7 * 24 * 60 * 60 * 1000, //like setting age for cookie
    httpOnly : true,
  },
};

// app.get("/",(req,res)=>{
//     res.send("WELCOME TO HOMEPAGE");
// });



app.use(session(sessionoptions)); //this is express Session
app.use(flash()) //to show message using connect-flash

app.engine('ejs',ejsMate);

app.use(passport.initialize());// Initializa the passport
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); ///make all user authenticate by using Local Stategy(username,pass) not by using sign in google etc

passport.serializeUser(User.serializeUser()); //serialize means storing user data into sessions
passport.deserializeUser(User.deserializeUser()); //deserialize is opposite to serialize


app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user; //this is accessiable from everywhere
  next();
});

//Demo User


//and /listings is been used in app.js so dont need to use that again in listing.js
app.use("/listings",listingrouter); //whenever /listings will come in url or in route this will trigger and passes it for ./routes/listings
app.use("/listing/:id/review",reviewrouter);  //here :id is accessible here only not in review.js file to make useable in that file we are using following
//const router = express.Router({mergeParams:true}); //this for merging parent route in child route in review.js file 

app.use("/",userRouter);

//when none route its matching it will throw this error
app.use((req, res, next) => {
  next(new ExpressError(404, "PAGE NOT FOUND"));
});

//this will occurs when error get calleds
app.use((err,req,res,next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("listing/Error.ejs",{err});

});

app.listen(8080,()=>{
    console.log("Port Number 8080 listening");
});