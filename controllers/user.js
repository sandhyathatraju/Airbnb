const User=require("../modules/user.js")
// Render Form
module.exports.renderForm=(req,res)=>
    { 
        res.render("user/signup.ejs");
    }
// signup
module.exports.signup=async(req,res)=>
    { try
        {
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        const registeredUser=await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>
        {
            if(err)
            {
                next(err);
            }
            req.flash("success","Welcome to Wanderlust!");
        res.redirect("/listings");
        })
        
        }
        catch(e)
        {
            req.flash("error",e.message);
            res.redirect("/signup");
        }
    }
// Login
module.exports.login=(req,res)=>
    {
        res.render("user/login.ejs");
    }
    
// Render Login
module.exports.renderLogin=async(req,res)=>
    {
    req.flash("success","Welcome back to Wanderlust!");
    let redir=res.locals.redirectUrl || "/listings"
    res.redirect(redir);
    };
    
// logout    
module.exports.logout=(req,res,next)=>
    {
        req.logout((err)=>
        {
            if(err)
            {
                next(err);
            }
            req.flash("success","You are logged out");
            res.redirect("/listings");
        })
    }    