const express = require("express"); //this is for express Session
const app = express();
const session = require("express-session");
const path = require("path");
const flash = require("connect-flash");

//resave its basically for saving that data and saveuninitialized if for force to session that is "uninitiliazed to be saved to the store"
const sessionOptions = {
    secret:"Mysupersecretsession" , 
    resave:false, 
    saveUninitialized:true
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(session(sessionOptions)); //this will create the session id for each request where its get request,post request etc it will creata the session id for it which will helpful for creating or storing the webpage data
app.use(flash());

app.use((req,res,next)=>{
    res.locals.succmsg = req.flash("success"); //don't need to pass succmsg and errormsg in render it can accessable
    res.locals.errormsg = req.flash("Error");
    next();
});

app.get("/register",(req,res)=>{
    let {name="Anonymouns"} = req.query;
    req.session.name = name; //storing name in express session //this name is accessiable from everywhere
    if(name==="Anonymouns")
    {
        req.flash("Error","User Not Register!");
    }else{
        req.flash("success","User Registered!"); //this will excute when re.flash() in /hello will get excuted //"success" its string only to access it further
    }
    
    res.redirect("/hello");
});

app.use("/hello",(req,res)=>{
    
    res.render("page.ejs",{name:req.session.name}); //message is printing in page.ejs 
});



// app.get("/reqcount",(req,res) =>{ //basically this will track the same session like if you paste in next new tab it will give you same value just like amazon cart when you switch it and again come back it will show you same cart items
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count = 1;
//     }
    
//     res.send(`You send Request ${req.session.count} times`);
// });

// app.get("/test",(req,res)=>{
//     res.send("test Successful!");
// });

app.listen(8080,(req,res)=>{
    console.log("Port Listing 8080");
});