const db = require('./dataBase')

exports.createCart = function(data, callback) { 
    let sql = `INSERT INTO carts SET ?`;
    db.query(sql,data, function(err, d) { 
        callback(err, d); 
    });
}

exports.checkCart = async function(data) {
    return new Promise(function(resolve, reject){
        let sql = ` SELECT * FROM carts WHERE user_id = ? AND product_id = ? AND size_id = ? AND color_id = ?`
        db.query(sql,[data.user_id, data.product_id, data.size_id, data.color_id], function(err,result){
            if(err){
                reject(err);
                return
            }
            if(result){
                resolve(result[0]);
            }
            else{
                resolve(null);
            }
        })
    })
}

// exports.checkCart = function(data, callback) {
//     let sql = ` SELECT * FROM carts WHERE user_id = ? AND product_id = ? AND size_id = ? AND color_id = ?`
//     db.query(sql,[data.user_id, data.product_id, data.size_id, data.color_id], function(err,result){
//         if(err){
//             callback(err, null);
//         }
//         if(result){
//             return callback(null, result[0]);
//         }
//         callback(null, null);
//     })
// }

exports.plusQuantity = function(updateCart, callback) {
    let sql = ` UPDATE carts SET quantity = ? WHERE id = ? `
    db.query(sql,[updateCart.quantity, updateCart.id], function(err,result){
        callback(err, result);
    })
}