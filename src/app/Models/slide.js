const db = require('./dataBase')

exports.slide = function( callback) { 
    let sql = `SELECT *  FROM slides WHERE status=1`;
    db.query(sql, function(err, banner) { 
        callback(banner); 
    });
}