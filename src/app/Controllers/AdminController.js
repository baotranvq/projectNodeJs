
class AdminController {
    

    readOrder = function (req, res) {
        res.render('admin/order-list');
    };
   
}

module.exports = new AdminController();