modelUser = require('../../Models/user.model');

const bcrypt = require('bcryptjs');


class LoginController {
    
    login = function (req, res) {
        let error = null;
        res.render('auth/login',{error: error});
    };


    postLogin = function (req, res) {
        let email = req.body.email;
        let password = req.body.password;
        if(email && password){
            modelUser.findEmail(email, function (err, user){
                if(!user){
                    let notification = "Account does not exist";
                    res.redirect('/auth/login',{error: notification})
                }else{
                    bcrypt.compare( password, user.password, function(err, result) {
                        if(result === true){
                            req.session.loggedIn = true;
                            req.session.user = user;
                            res.redirect('/');
                        }else{
                            let notification = "Password is incorrect";
                            return res.render('auth/login', { error: notification})
                        }
                    });
                }
            })

        }else{
            let notification = "All fields are required to be filled in";
            return res.render('auth/login', { error: notification})
        }
    };

    getSession = function(req, res){
        res.send(req.session);
    }


    logout = function(req, res){
        req.session.destroy(function (err){
            if(err){
                res.redirect('/500');
            }
            req.session = null
            res.redirect('/');
        })
    }
    
}

module.exports = new LoginController();