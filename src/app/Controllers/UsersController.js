const modelProducts = require('../Models/product')
const modelCart = require('../Models/cart.model')
const modelCheckout = require('../Models/checkout.model')

class UsersController {
    users = function (req, res) {
        res.send('respond with a resource');
    };
    APIproduct = function (req, res) {
        modelProducts.product(function(data){
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
        modelProducts.read(id_code,async function(data){
            res.json(data);
        })
    };

    APIcart= function (req, res) {
        let userInformation = req.session.user;
        let userId = userInformation.id;
        modelCart.readCart(userId,function(err,data){
            if(err){
                console.log("Lỗi truy vấn Carts SQL",err);
            }
            res.json(data);
        })
    };

    // deleteCart = async function(req, res){
    //     let id = req.params.id;
    //     let userInformation = req.session.user;
    //     let userId = userInformation.id;
    //     await modelCart.deleteCart(id)
    //     let lengthCart= await modelCart.readCartSS(userId)
    //     req.session.cart = lengthCart.length;
    // }
    deleteCart = function(req, res){
        let id = req.params.id;
        let userInformation = req.session.user;
        let userId = userInformation.id;
        let data = {
            id_cart: id,
            user_id: userId
        }
        modelCart.deleteCart(data, async function(err,data){
            if(err){
                console.log("Lỗi truy vấn Delete Carts SQL",err);
            }
            let lengthCart= await modelCart.readCartSS(userId)
            req.session.cart = lengthCart.length;
            res.json(data)
        })
    }

    updateCart = function(req, res){
        let dataUpdate = req.body;
        let userInformation = req.session.user;
        let userId = userInformation.id;
        dataUpdate.user_id = userId;// thêm dữ liệu user và object
        modelCart.updateCart(dataUpdate,function(err,data){
            if(err){
                console.log("Lỗi truy vấn Delete Carts SQL",err);
            }
            res.json(data)
        })
    }

    // Checkout GS
    getCheckoutGs =  function(req, res){
        let product_id = req.params.id;
        modelCheckout.getGsCheckout(product_id,function(err,data){
            if(err){
                console.log("Lỗi truy vấn Delete Carts SQL",err);
            }
            return res.json(data)
        })
    }

    
}
module.exports = new UsersController();
