modelUser = require('../../Models/user.model');

const bcrypt = require('bcryptjs');

class RegisterController {

    register = function (req, res) {
        let error = null;
        res.render('auth/register', { error: error });
    };

    postRegister = async (req, res) => {
        let email = req.body.email
        let password = req.body.password
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let birthday = req.body.birthday
        let gender = req.body.gender
        if (email && password && firstname && lastname && birthday && gender) {
            try{
                let resultUser = await modelUser.findEmail(email);
                if (resultUser) {
                    let notification = "Email already exists "
                    return res.render('auth/register', { error: notification });
                }else {
                    var salt = bcrypt.genSaltSync(10);
                    var hashPassword = bcrypt.hashSync(password, salt);

                    let userData = {
                        email: email,
                        password: hashPassword,
                        firstname: firstname,
                        lastname: lastname,
                        birthday: birthday,
                        gender: gender
                    };

                    modelUser.create(userData, function (err, d) {
                        if (!err) {
                            return res.redirect('/auth/login');
                        }
                    });
                }
            }
            catch(err){
                console.log("Quá trình truy vấn dữ liệu bị lỗi", err);
            }
        }else {
            let notification = "All fields are required to be filled in";
            return res.render('auth/register', { error: notification })
        }
    }

    // postRegister = function (req, res) {
    //     let email = req.body.email
    //     let password = req.body.password
    //     let firstname = req.body.firstname
    //     let lastname = req.body.lastname
    //     let birthday = req.body.birthday
    //     let gender = req.body.gender

    //     if (email && password && firstname && lastname && birthday && gender) {
    //         var promise = new Promise((resolve, reject) => {
    //             modelUser.findEmail(email, function (err, user) {
    //                 resolve(user)
    //                 reject(err)
    //             })
    //         })
    //         promise
    //             .then(function (user) {
    //                 if (user) {
    //                     let notification = "Email already exists "
    //                     return res.render('auth/register', { error: notification });
    //                 }
    //                 else {
    //                     var salt = bcrypt.genSaltSync(10);
    //                     var hashPassword = bcrypt.hashSync(password, salt);

    //                     let userData = {
    //                         email: email,
    //                         password: hashPassword,
    //                         firstname: firstname,
    //                         lastname: lastname,
    //                         birthday: birthday,
    //                         gender: gender
    //                     };

    //                     modelUser.create(userData, function (err, d) {
    //                         if (!err) {
    //                             return res.redirect('/auth/login');
    //                         }
    //                     });
    //                 }
    //             })
    //             .catch(function (err) {
    //                 console.log("Qua trinh truy van loi", err)
    //             })
    //     }
    //     else {
    //         let notification = "All fields are required to be filled in";
    //         return res.render('auth/register', { error: notification })
    //     }

        // if (email && password && firstname && lastname && birthday && gender) {
        //     modelUser.findEmail(email, function (err, user) {
        //         if (err || user) {
        //             let notification = "Email already exists "
        //             return res.render('auth/register', { error: notification });
        //         }
        //     });

        //     var salt = bcrypt.genSaltSync(10);
        //     var hashPassword = bcrypt.hashSync(password, salt);

        //     let userData = {
        //         email: email,
        //         password: hashPassword,
        //         firstname: firstname,
        //         lastname: lastname,
        //         birthday: birthday,
        //         gender: gender
        //     };
        //     console.log(userData);

        //     modelUser.create(userData, function (err, d) {
        //         console.log(">>>>>>>>>>>>>> lol09999999999");
        //         console.log(">>>> check ERR", err);
        //         if (!err) {
        //             return res.redirect('/auth/login');
        //         }
        //     });
        // }
        // else {
        //     let notification = "All fields are required to be filled in";
        //     return res.render('auth/register', { error: notification })
        // }
    

}

module.exports = new RegisterController(); 