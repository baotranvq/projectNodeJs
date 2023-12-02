const db = require('./dataBase')



exports.create = function(data, callback) { 
    let sql = `INSERT INTO users SET ?`;
    db.query(sql,data, function(err, d) { 
        callback(err, d); 
    });
}

exports.findEmail = function(email, callback) { 
    let sql = `SELECT * From users WHERE email = '${email}'`;
    db.query(sql, function(err, result) {
        if(err){
            callback(err, null);
            return;
        }
        if(result.length){
            callback(null, result[0]);
            return;
        } 
        callback(null,null); 
    });
}
