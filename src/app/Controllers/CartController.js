modelCart = require('../Models/cart.model');

class CartController {

    cart = function (req, res, next) {

        // res.locals.isAuthenticated = req.session && req.session.cart;
        // if (res.locals.isAuthenticated) {
        //     res.locals.cart = req.session.cart;
        // }
        // next();

        res.render('products/cart');
    };


    getCart = function (req, res, next) {
        if (req.session.cart && req.session.cart.length > 0) {
            console.log("Thông tin giỏ hàng:", req.session.cart);
            res.send("Giỏ hàng đã được lưu trong session.");
        } else {
            console.log("Không có giỏ hàng trong session.");
            res.send("Không có giỏ hàng trong session.");
        }
    };

    postCart = async function (req, res) {
        let productId = req.body.productId;
        let sizeId = req.body.sizeId;
        let colorId = req.body.colorId;
        let userInformation = req.session.user;
        let userId = userInformation.id;
        let quantity = 1;
 
        const previousUrl = req.body.previousUrl // lấy URL để xl quay về lại trang detail

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; 
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        console.log("check product id: ", productId)
        console.log("check size id: ", sizeId)
        console.log("check color id: ", colorId)
        console.log("check color user: ", userId)


        if (productId, sizeId, colorId, userId && sizeId !='') {
            let carts = {
                user_id: userId,
                product_id: productId,
                size_id: sizeId,
                color_id: colorId,
                quantity_cart: quantity,
                created_at: currentDateTime
            }
            console.log("check object cart ->>>>>>>", carts)
            try {
                let resultCart = await modelCart.checkCart(carts)
                if(resultCart){
                    console.log("check carttttt trả về ", resultCart);
                    console.log("check id cart ", resultCart.id_cart);
                    console.log("check quantity cart ", resultCart.quantity_cart +1);

                    let updateCart = {
                        id_cart: resultCart.id_cart,
                        quantity_cart: resultCart.quantity_cart +1
                    }
                    modelCart.plusQuantity(updateCart, function (err, data){
                        if(err) return console.log("Lỗi SQL khi update Quantity",err);
                        console.log("Đã cập nhật Quantity", data)
                    })
                    return res.redirect(previousUrl);
                }else{
                    modelCart.createCart(carts, function (err, d) {
                        if (err) {
                            console.log("Lỗi SQL ->>>>>>>", err)
                        }
                    })
                    return res.redirect(previousUrl);
                }
            } catch (error) {
                console.log("Lỗi SQL kiểm tra người dùng ->>>>>>>", err)
            }
        }
        else {
            let notification = "Mời bạn chọn đầy đủ thông tin!";
            return res.redirect(previousUrl,{ error: notification });
        }
    }

   
    
    // postCart = function (req, res) {
    //     let productId = req.body.productId;
    //     let sizeId = req.body.sizeId;
    //     let colorId = req.body.colorId;
    //     let userInformation = req.session.user;
    //     let userId = userInformation.id;
    //     let quantity = 1;

    //     const currentDate = new Date();
    //     const year = currentDate.getFullYear();
    //     const month = currentDate.getMonth() + 1; 
    //     const day = currentDate.getDate();
    //     const hours = currentDate.getHours();
    //     const minutes = currentDate.getMinutes();
    //     const seconds = currentDate.getSeconds();
    //     const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    //     console.log("check product id: ", productId)
    //     console.log("check size id: ", sizeId)
    //     console.log("check color id: ", colorId)
    //     console.log("check color user: ", userId)


    //     if (productId, sizeId, colorId, userId) {
    //         let carts = {
    //             user_id: userId,
    //             product_id: productId,
    //             size_id: sizeId,
    //             color_id: colorId,
    //             quantity: quantity,
    //             created_at: currentDateTime
    //         }
    //         console.log("check object cart ->>>>>>>", carts)

    //         modelCart.checkCart(carts, function (err, cart) {

    //             if(err){
    //                 console.log("Lỗi SQL ->>>>>>>", err)
    //             }
    //             if(cart){
    //                 console.log("check carttttt trung ", cart);
    //                 console.log("check id cart ", cart.id);
    //                 console.log("check quantity cart ", cart.quantity +1);

    //                 let updateCart = {
    //                     id: cart.id,
    //                     quantity: cart.quantity +1
    //                 }
    //                 modelCart.plusQuantity(updateCart, function (err, data){
    //                     if(err) return console.log("Lỗi SQL khi update Quantity",err);
    //                     console.log("Đã cập nhật Quantity", data)
    //                 })
    //             }
    //             else{
    //                 modelCart.createCart(carts, function (err, d) {
    //                     if (err) {
    //                         console.log("Lỗi SQL ->>>>>>>", err)
    //                     }
    //                 })
    //             }
    //         })
    //     }
    //     else {
    //         let notification = "Mời bạn chọn đầy đủ thông tin!";
    //         return res.render('cart', { error: notification })
    //     }
        
    //     // let carts = {
    //     //     productId : productId,
    //     //     sizeId : sizeId,
    //     //     colorId : colorId,
    //     //     userId : user.id
    //     // }

    //     // if(!req.session.cart){
    //     //     req.session.cart = []
    //     // }
    //     // req.session.cart.push(carts);

    //     // let cart = req.session.cart
    //     // console.log("gio hang ", cart)



    //     return res.redirect('/cart');
    // }
}

module.exports = new CartController();