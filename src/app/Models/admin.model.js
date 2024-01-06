const db = require('./dataBase')


exports.read = function (callback) {
    let sql = ` SELECT * FROM orders
                JOIN users on orders.id_user = users.id  `
    db.query(sql, function (err, data) {
        callback(err,data);
    })
}