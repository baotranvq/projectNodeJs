const db = require('./dataBase')


exports.read = function (callback) {
    let sql = ` SELECT * FROM orders
                JOIN users on orders.id_user = users.id  `
    db.query(sql, function (err, data) {
        callback(err,data);
    })
}

exports.readOrderDetail = function (order_id,callback) {
    let sql = ` SELECT * FROM order_detail 
    JOIN product on order_detail.product_id = product.product_id 
    JOIN orders on order_detail.order_id = orders.order_id 
    JOIN users on orders.id_user = users.id
    JOIN colors on product.color_id = colors.color_id
    JOIN sizes on product.size_id = sizes.size_id
    WHERE order_detail.order_id = ?  `
    db.query(sql, order_id, function (err, data) {
        callback(err,data);
    })
}