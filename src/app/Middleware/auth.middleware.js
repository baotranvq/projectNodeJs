class checkLogin {

    loggedIn = (req, res, next) => {
        if(req.session.loggedIn){
            res.locals.user =  req.session.user;
            next();
        }
        else{
            res.redirect('/auth/login');
        }
    }
    
    isAuth = (req, res, next) => {
        if(req.session.loggedIn){
            res.locals.user = req.session.user;
            res.redirect('/');
        }
        else{
            next();
        }
    }

    logged = (req, res, next) => {
        res.locals.isAuthenticated = req.session && req.session.user;
        if (res.locals.isAuthenticated) {
            res.locals.username = req.session.user.firstname;
            res.locals.lengthCart = req.session.cart;
        }
        next();
    };

    //check admin
    checkAdmin = (req, res, next) => {
        if(req.session.loggedIn){
            res.locals.email =  req.session.user.email;
            console.log("admin", res.locals.email)
            if(res.locals.email == "admin@gmail.com"){
                next();
            }
            else{
                res.redirect('/');
            }
        }
        else{
            res.redirect('/auth/login');
        }
    }

}
module.exports = new checkLogin();

