modelCheckout = require('../Models/checkout.model');
modelCart = require('../Models/cart.model');

class CheckoutController {


    postCheckout = async function (req, res) {
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
                if (resultIdProduct.quantity > 0) {
                    const variableValue = resultIdProduct.product_id;
                    res.render('products/gs-checkout', { variable: variableValue });
                }
                else {
                    return res.redirect(previousUrl);
                }
            } catch (error) {

            }

        }
    }
    createCheckoutGs = function (req, res) {
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
        modelCheckout.createGsCheckout(data, function (err, data) {
            if (err) {
                console.log("Lỗi truy vấn Delete Carts SQL", err);
            }
            // return res.json(data)
            res.redirect('/?successOrder');
        })

    }

    // controller checkout cart
    postCheckoutCart = function (req, res) {
        let userInformation = req.session.user;
        res.render('products/checkout', { user: userInformation });
    }

    createCheckout = async function (req, res) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        let order_detail_address = req.body.address;
        let order_detail_phone = req.body.phone;

        let userInformation = req.session.user;
        let userId = userInformation.id;
        let resultCart = await modelCart.readCartSS(userId);
        let total = 0;
        for (let cart of resultCart) {
            total += (cart.promotion_price) ? cart.promotion_price * cart.quantity_cart : cart.price * cart.quantity_cart;
        }
        let totalPrice = total>5000000 ? total : total + 250000;

        let data = {
            id_user: userId,
            total_price: totalPrice,
            payment: "tiền mặt",
            careted_at: currentDateTime,
            order_status: 0
        }
        await modelCheckout.createOrder(data);

        let order = await modelCheckout.readOrder(userId)
        let order_id = order[0].order_id

        let dataOrderDetail = {
            order_id: order_id,
            product_id: 0,
            size_id : 0,
            color_id : 0,
            order_detail_quantity: 0,
            order_detail_created: currentDateTime,
            order_detail_phone: order_detail_phone,
            order_detail_address: order_detail_address
        }

        let deleteCart = {
            id_cart: 0,
            user_id: userId
        }
        for (let cart of resultCart) {
            dataOrderDetail.product_id = cart.product_id;
            dataOrderDetail.size_id = cart.size_id;
            dataOrderDetail.color_id = cart.color_id;
            dataOrderDetail.order_detail_quantity = cart.quantity_cart;

            await modelCheckout.createOrderDetail(dataOrderDetail);
            deleteCart.id_cart = cart.id_cart;
            await modelCheckout.deleteCart(deleteCart);
        }
        req.session.cart = 0;
        res.redirect('/?successOrder');
        
    }

}

module.exports = new CheckoutController();