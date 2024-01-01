const db = require('./dataBase')

// exports.createCart = async function(data) { 
//     return new Promise(function(resolve, reject){
//         let sql = `INSERT INTO carts SET ?`;
//         db.query(sql,data, function(err, d) { 
//             if(err){
//                 return reject(err)
//             }
//             return resolve(d)
//         });
//     })
    
// }
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

exports.getIdProduct = async function(data) {
    return new Promise(function(resolve, reject){
        let sql = ` SELECT * FROM product WHERE color_id = ? AND code = ? AND size_id = ? `
        db.query(sql,[data.color_id, data.code,data.size_id], function(err,result){
            if(err){
                reject(err);
                return
            }
            else{
                resolve(result[0]);
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
    let sql = ` UPDATE carts SET quantity_cart = ? WHERE id_cart = ? `
    db.query(sql,[updateCart.quantity_cart, updateCart.id_cart], function(err,result){
        callback(err, result);
    })
}

exports.readCartSS = async function(userId) { 
    return new Promise(function(resolve, reject){
        let sql = `SELECT * FROM carts  
        JOIN users ON carts.user_id = users.id
        JOIN product ON carts.product_id = product.product_id
        JOIN sizes ON carts.size_id = sizes.size_id
        JOIN colors ON carts.color_id = colors.color_id
        JOIN images ON product.image_id = images.image_id
        WHERE user_id = ?
        ORDER BY id_cart DESC `;
        db.query(sql,userId, function(err, d) { 
            if(err){
                return reject(err);
            }
            return resolve(d);
        });
    })
}

exports.readCart = function(userId, callback) { 
    let sql = `SELECT * FROM carts  
                JOIN users ON carts.user_id = users.id
                JOIN product ON carts.product_id = product.product_id
                JOIN sizes ON carts.size_id = sizes.size_id
                JOIN colors ON carts.color_id = colors.color_id
                JOIN images ON product.image_id = images.image_id
                WHERE user_id = ?
                ORDER BY id_cart DESC `;
    db.query(sql,userId, function(err, d) { 
        callback(err, d); 
    });
}
// exports.deleteCart = async function(id) { 
//     return new Promise(function(resolve, reject){
//         let sql = `DELETE FROM carts WHERE id_cart = ? `;
//         db.query(sql,id, function(err, d) { 
//             if(err) return reject(err);
//             return resolve(d);
//         });
//     })
// }
exports.deleteCart = function(data, callback) { 
    let sql = `DELETE FROM carts WHERE id_cart = ? AND user_id =? `;
    db.query(sql,[data.id_cart, data.user_id], function(err, d) { 
        callback(err, d); 
    });
}

exports.updateCart = function(data, callback) { 
    let sql = `UPDATE carts SET quantity_cart = ? WHERE id_cart = ? AND user_id =?`;
    db.query(sql,[data.quantity_cart,data.id_cart,data.user_id], function(err, d) { 
        callback(err, d); 
    });
}