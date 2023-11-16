const modeProducts = require('../Models/product')

class UsersController {
    users = function (req, res) {
        res.send('respond with a resource');
    };
    APIproduct = function (req, res) {
        modeProducts.product(function(data){
            res.json(data);
        })
    };
    APIproductDetail = function (req, res) {
        let id = req.params.id;
        modeProducts.read(id, function(data){
            res.json(data);
        })
    };
}
module.exports = new UsersController();
