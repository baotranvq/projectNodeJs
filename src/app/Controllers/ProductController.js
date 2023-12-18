
class ProductController {
    
    menJordanShoes = function (req, res) {
        res.render('products/men-jordan-shoes');
    };
    detail = function (req, res) {
        let id = req.params.id
        let color = req.params.color
        res.render('products/detail',{ id: id});
    };
    product = function (req, res) {
        res.render('products/all-products');
    };
    
}

module.exports = new ProductController();
