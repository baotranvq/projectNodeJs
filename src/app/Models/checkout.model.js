const db = require('./dataBase')

// exports.createGsCheckout = function(data, callback) { 
//     let sql = `INSERT INTO orderguest SET ?`;
//     db.query(sql,data, function(err, d) { 
//         callback(err, d); 
//     });
// }

// checkout GS createGsCheckout
exports.getGsCheckout = function(id_product, callback) { 
    let sql = `SELECT * FROM product 
                JOIN categories on product.categories_id = categories.categories_id
                JOIN colors on product.color_id = colors.color_id
                JOIN sizes on product.size_id = sizes.size_id
                JOIN images on product.image_id = images.image_id
                WHERE product_id = ?`;
    db.query(sql,id_product, function(err, d) { 
        callback(err, d); 
    });
}


exports.createGsCheckout = function(data, callback) { 
    let sql = `INSERT INTO 	orderguest	SET ?`;
    db.query(sql,data, function(err, d) { 
        callback(err, d); 
    });
}

// SQL order cart
exports.createOrder =async function(data) { 
    return new Promise(function(resolve, reject) {
        let sql = `INSERT INTO 	orders	SET ?`;
        db.query(sql,data, function(err, d) { 
            if(err) {
                return reject;
            }
            return resolve(d);
        });
    })
    
}

exports.readOrder =async function(userId) { 
    return new Promise(function(resolve, reject) {
        let sql = `SELECT * FROM orders WHERE id_user = ? ORDER BY order_id DESC`;
        db.query(sql,userId, function(err, d) { 
            if(err) {
                return reject;
            }
            return resolve(d);
        });
    })
    
}

exports.createOrderDetail = async function(data) { 
    return new Promise(function(resolve, reject) {
        let sql = `INSERT INTO 	order_detail SET ?`;
        db.query(sql,data, function(err, d) { 
            if(err) {
                return reject;
            }
            return resolve(d);
        });
    })
    
}

exports.deleteCart =async function(data) { 
    return new Promise(function(resolve, reject) {
        let sql = `DELETE FROM carts WHERE id_cart = ? AND user_id =? `;
        db.query(sql,[data.id_cart, data.user_id], function(err, d) { 
            if(err) {
                return reject;
            }
            return resolve(d);
        });
    })
    
}


