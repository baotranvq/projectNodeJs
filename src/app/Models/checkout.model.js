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


