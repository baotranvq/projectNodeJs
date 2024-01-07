const db = require('./dataBase')


exports.read =async function (id) {
    return new Promise(function (resolve,reject) {
        let sql = ` SELECT * FROM orders
                JOIN users on orders.id_user = users.id 
                WHERE order_id = ?`
        db.query(sql,id, function (err, data) {
            if(err){
                return reject(err)
            }
            return resolve(data);
        })
    })
    
}

exports.updateOrder =async function (data) {
    return new Promise(function (resolve,reject) {
        let sql = ` UPDATE orders SET order_status = ? WHERE order_id = ?`
        db.query(sql,[data.order_status,data.order_id], function (err, d) {
            if(err){
                return reject(err)
            }
            return resolve(d);
        })
    })
    
}