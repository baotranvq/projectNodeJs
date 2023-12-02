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
}
module.exports = new UsersController();
