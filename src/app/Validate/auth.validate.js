class authValidate {
    
    postRegister = function (req, res, next) {
        let errors = [];
        if(!req.body.email){
            errors.push("Email is required.");
        }
        if(!req.body.password){
            errors.push("Password is required.");
        }
        if(!req.body.firstname){
            errors.push("Firstname is required.");
        }
        if(!req.body.lastname){
            errors.push("Lastname is required.");
        }
        if(!req.body.birthday){
            errors.push("Birthday is required.");
        }
        if(!req.body.gender){
            errors.push("Gender is required.");
        }
        if(errors.length){
            res.render('auth/register',{
                errors: errors,
                values: req.body
            });
            return;
        }

    };
    

}

module.exports = new authValidate();