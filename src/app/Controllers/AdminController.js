
class AdminController {
    

    readOrder = function (req, res) {
        res.render('admin/order-list');
    };

    readOrderDetail = function (req, res) {
        res.render('admin/order-detail');

    };
}

module.exports = new AdminController();