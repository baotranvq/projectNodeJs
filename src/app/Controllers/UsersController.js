const modeProducts = require('../Models/product')
const modeCarts = require('../Models/cart.model')

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
        // const arr = [];
        // // arr = [DV5141, 611];
        // let string = '';

        // for (let i = 0; i < id.length; i++) {
        //     if(id[i] != '-'){
        //         string +=id[i];
        //     }
        //     if(id[i] === '-'){
        //         arr.push(string);
        //         string = '';
        //     }            
        //     if(i === id.length - 1){
        //         arr.push(string);
        //     }
        // }
        const arr = id.split('-')
        let id_code = arr[0];
        // console.log("ID: ",id);
        // console.log("arr:",arr)
        modeProducts.read(id_code, function(data){
            res.json(data);
        })
    };

    APIcart= function (req, res) {
        let userInformation = req.session.user;
        let userId = userInformation.id;
        console.log("APIcart userID", userId);
        modeCarts.readCart(userId,function(err,data){
            if(err){
                console.log("Lỗi truy vấn Carts SQL",err);
            }
            res.json(data);
        })
    };

    deleteCart = function(req, res){
        let id = req.params.id;
        modeCarts.deleteCart(id,function(err,data){
            if(err){
                console.log("Lỗi truy vấn Delete Carts SQL",err);
            }
            res.json(data)
        })
    }

    updateCart = function(req, res){
        let dataUpdate = req.body;
        console.log("Update Carts 2112", dataUpdate);
        modeCarts.updateCart(dataUpdate,function(err,data){
            if(err){
                console.log("Lỗi truy vấn Delete Carts SQL",err);
            }
            res.json(data)
        })
    }
}
module.exports = new UsersController();
