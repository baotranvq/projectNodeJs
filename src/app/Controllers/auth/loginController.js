modelUser = require('../../Models/user.model');
modelCart = require('../../Models/cart.model');
const bcrypt = require('bcryptjs');


class LoginController {

    login = function (req, res) {
        let error = null;
        res.render('auth/login', { error: error });
    };

    postLogin = async (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        if (email && password) {
            try {
                let resultUser = await modelUser.findEmail(email);
                if (!resultUser) {
                    let notification = "Account does not exist";
                    return res.render('auth/login', { error: notification });
                }
                else {
                    let resultCart = await modelCart.readCartSS(resultUser.id)
                    bcrypt.compare(password, resultUser.password, function (err, result) {
                        if (result === true) {
                            req.session.loggedIn = true;
                            req.session.user = resultUser;
                            req.session.cart = resultCart.length; // lưu thông tin cart khi đăng nhập
                            res.redirect('/');
                        } else {
                            let notification = "Password is incorrect";
                            return res.render('auth/login', { error: notification })
                        }
                    });
                }
            }
            catch (err) {
                console.log("Quá trình truy vấn dữ liệu bị lỗi", err);
            }
        }
        else {
            let notification = "All fields are required to be filled in";
            return res.render('auth/login', { error: notification });
        }

    }


    // postLogin = function (req, res) {
    //     let email = req.body.email;
    //     let password = req.body.password;

    //     if (email && password) {
    //         var promise = new Promise((resolve, reject) => {
    //             modelUser.findEmail(email, function (err, user) {
    //                 resolve(user);
    //                 reject(err);
    //             })

    //         })
    //         promise
    //             .then(function (user) {
    //                 if (!user) {
    //                     let notification = "Account does not exist";
    //                     return res.render('auth/login', { error: notification });
    //                 } else {
    //                     bcrypt.compare(password, user.password, function (err, result) {
    //                         if (result === true) {
    //                             req.session.loggedIn = true;
    //                             req.session.user = user;
    //                             res.redirect('/');
    //                         } else {
    //                             let notification = "Password is incorrect";
    //                             return res.render('auth/login', { error: notification })
    //                         }
    //                     });
    //                 }
    //             })
    //             .catch(function (err) {
    //                 console.log("Quá trình truy vấn dữ liệu bị lỗi", err);
    //             })

    //     }
    //     else {
    //         let notification = "All fields are required to be filled in";
    //         return res.render('auth/login', { error: notification })
    //     }
    // }


    //     if(email && password){
    //         modelUser.findEmail(email, function (err, user){
    //             if(!user){
    //                 let notification = "Account does not exist";
    //                 res.redirect('/auth/login',{error: notification})
    //             }else{

    //                 console.log("Check login >>>>>")
    //                 bcrypt.compare( password, user.password, function(err, result) {
    //                     if(result === true){
    //                         req.session.loggedIn = true;
    //                         req.session.user = user;
    //                         res.redirect('/');
    //                     }else{
    //                         let notification = "Password is incorrect";
    //                         return res.render('auth/login', { error: notification})
    //                     }
    //                 });
    //             }
    //         })

    //     }else{
    //         let notification = "All fields are required to be filled in";
    //         return res.render('auth/login', { error: notification})
    //     }
    // };

    getSession = function (req, res) {
        res.send(req.session);
    }


    logout = function (req, res) {
        req.session.destroy(function (err) {
            if (err) {
                res.redirect('/500');
            }
            req.session = null
            res.redirect('/');
        })
    }

}

module.exports = new LoginController();