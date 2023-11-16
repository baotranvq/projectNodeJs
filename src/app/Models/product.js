const db = require('./dataBase')

exports.product = function( callback) { 
    let sql = `SELECT *  FROM product 
                JOIN categories on product.categories_id = categories.categories_id
                JOIN colors on product.color_id = colors.color_id
                JOIN sizes on product.size_id = sizes.size_id
                JOIN images on product.image_id = images.image_id
                GROUP BY product.code
                ORDER BY product_id`;
    db.query(sql, function(err, data) { 
        callback(data); 
    });
}
exports.read = function(id, callback){
    let sql = ` SELECT * FROM product
                JOIN categories on product.categories_id = categories.categories_id
                JOIN colors on product.color_id = colors.color_id
                JOIN sizes on product.size_id = sizes.size_id
                JOIN images on product.image_id = images.image_id
                WHERE product.code = ? `
    db.query(sql, id, function(err, data) {
        data = data;
        callback(data);
    })
}