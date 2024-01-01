modelCheckout = require('../Models/checkout.model');
class CheckoutController {
    
    // GsCheckout = function (req, res) {
    //     res.render('products/gs-checkout');
    // };

    postCheckout =async function (req, res) {
        let productCode = req.body.productCode;
        let sizeId = req.body.sizeId;
        let colorId = req.body.colorId;
        const previousUrl = req.body.previousUrl // lấy URL để xl quay về lại trang detail

        if (productCode, sizeId, colorId && sizeId != '') {

            let getproduct = {
                code: productCode,
                color_id: colorId,
                size_id: sizeId
            }
            try {
                let resultIdProduct = await modelCart.getIdProduct(getproduct)
                if(resultIdProduct.quantity >0){
                    const variableValue = resultIdProduct.product_id;
                    res.render('products/gs-checkout', { variable: variableValue });
                }
                else{
                    return res.redirect(previousUrl);
                }
            } catch (error) {
                
            }

        }
    }
    createCheckoutGs =  function(req, res){
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        let data = req.body;
        data.orderguest_quantity = 1;
        data.orderguest_date = currentDateTime;
        data.orderguest_status = 0;
        console.log("information customer",data);
        modelCheckout.createGsCheckout(data,function(err,data){
            if(err){
                console.log("Lỗi truy vấn Delete Carts SQL",err);
            }
            return res.json(data)
        })
    }
    
}

module.exports = new CheckoutController();