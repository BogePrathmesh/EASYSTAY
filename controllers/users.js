const User = require("../models/user.js")

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup = async (req,res)=>{

    try{
        let {email, username, password} = req.body;
        const newUser = new User({email,username});

        const registerUSer = await User.register(newUser,password);
        console.log(registerUSer);

        req.login(registerUSer,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to EASYSTAY");
            res.redirect("/listings");
        });
        
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
}

module.exports.renderLoginForm =(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.Login = async(req,res)=>{
    req.flash("success","Welcome back To EASYSTAY!");

    let redirectUrl = res.locals.redirectUrl || "/listings" //why this bcaz when user login through homepage not through any other page it will give me url as undefined so if res.locals.redirectUrl has info store it or otherwise go it /listings
    res.redirect(redirectUrl); //this is from middleware.js file  line 4
}

module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You have loggout!");
        res.redirect("/listings")
    })
}