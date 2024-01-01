const cartApi = 'http://localhost:3000/users/APIcarts';
    async function start() {
        let aipCarts = await getCarts(); // lấy API to Array
        renderCarts(aipCarts) // render view cart
        renderCartSummary(aipCarts) // render view Summary
    }
    start();


    async function getCarts() {
        const response = await fetch(cartApi);
        const carts = await response.json();
        return carts
    }

    function renderCarts(carts) {
        document.getElementById("quatity").innerHTML = carts.length;// cập nhật lại số lượng giỏ hàng

        let listCarts = document.querySelector('#cart-bag');
        let html = carts.map(function (cart) {
            return `
            <div class="main-cartitem cart-item-${cart.id_cart}">
                <div class="content-autocontent-auto">
                    <a href=""><img src="../../.././images/products/${cart.thumbnail_1}" alt=""></a>
                </div>
                <div class="content-auto1">
                    <div class="main-cartdata">
                        <div class="main-datavertion">
                            <a style="text-decoration: none; color: black; font-weight: 500;" href="">${cart.product_name}</a>
                            <p style="padding-top: 10px;">${cart.type} Shoes</p>
                            <p>Color: ${cart.color_name}</p>
                            <div class="detail-size-quantity">
                                <p >${cart.size_name}</p>
                                <p >Quantity</p>
                                <div class="quantity-container">
                                    <button onclick="decreaseQuantity(${cart.id_cart}, ${cart.quantity})"><i class="bi bi-dash"></i></button>
                                    <input id="quantity_input_${cart.id_cart}" class="quantity_input" type="text" oninput="handleUpdateQuantityCart(${cart.id_cart}, ${cart.quantity})" value="${cart.quantity_cart}">
                                    <button onclick="increaseQuantity(${cart.id_cart}, ${cart.quantity})"><i class="bi bi-plus"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="cart-detail">
                            ${cart.promotion_price ? `<p class="detail-cardPrice">${(cart.quantity_cart * cart.price).toLocaleString('vi-VN')} đ</p>` : `<p>${(cart.quantity_cart * cart.price).toLocaleString('vi-VN')} đ </p>`}
                            ${cart.promotion_price ? `<p>${(cart.quantity_cart * cart.promotion_price).toLocaleString('vi-VN')} đ </p>` : ''} 
                        </div>
                    </div>
                    
                    <div class="content-ht" >
                        <button onclick="handleDeleteCart(${cart.id_cart})"><i style="color: black; font-size: 20px;" class="bi bi-trash3"></i></button>
                    </div>
                </div>
            </div>
            `;
        })
        listCarts.innerHTML = html.join('');
    }

    function renderCartSummary(carts) {
        let cartSummary = document.querySelector('.detail-subtotal');
        let cartShip = document.querySelector('.cart-ship');
        let cartTotal = document.querySelector('.cart-total');

        function handlePrice(accumulator, currenValue) {
            let total = currenValue.promotion_price > 0 ? accumulator + (currenValue.promotion_price * currenValue.quantity_cart) : accumulator + (currenValue.price * currenValue.quantity_cart)
            return total;
        }
        let totalPrice = carts.reduce(handlePrice, 0);// tổng tiền giỏ hàng
        cartSummary.innerHTML = totalPrice.toLocaleString('vi-VN') + ' đ';
        //XL phí ship hàng
        if (totalPrice > 5000000) {
            cartShip.innerHTML = "Free"
        } else if (totalPrice == 0) {
            cartShip.innerHTML = 0 + ' đ'
        } else {
            cartShip.innerHTML = (250000).toLocaleString('vi-VN') + ' đ'
        };
        // totalPrice > 5000000 ? cartShip.innerHTML = "Free" : cartShip.innerHTML = (250000).toLocaleString('vi-VN') + ' đ';
        //XL tổng đơn hàng
        if (totalPrice > 5000000) {
            cartTotal.innerHTML = totalPrice.toLocaleString('vi-VN') + ' đ'
        } else if (totalPrice == 0) {
            cartTotal.innerHTML = 0 + ' đ'
        } else {
            cartTotal.innerHTML = (totalPrice + 250000).toLocaleString('vi-VN') + ' đ'
        };
        // totalPrice > 5000000 ? cartTotal.innerHTML = totalPrice.toLocaleString('vi-VN') + ' đ' : cartTotal.innerHTML = (totalPrice + 250000).toLocaleString('vi-VN') + ' đ';
    }

    function handleDeleteCart(id) {
        let options = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        }
        fetch(cartApi + '/' + id, options)
            .then(function (res) {
                return res.json();
            })
            .then(function () {
                // xử lý xóa elements
                let cartItem = document.querySelector('.cart-item-' + id);
                if (cartItem) {
                    cartItem.remove();
                    return start();
                }
            });

        ;
    }

    function handleQuantityCart(carts) {
        carts.map(function (cart) {
            const inputElement = document.getElementById("quantity_input_" + cart.id_cart)
            let quantityInput = parseInt(inputElement.value) || 0;
            quantityInput = Math.max(0, Math.min(cart.quantity, quantityInput));
            inputElement.value = quantityInput;
            handleUpdateQuantityCart(cart.id_cart, cart.quantity)
        })
    }

    function handleUpdateQuantityCart(id, quantity) {

        const inputElement = document.getElementById("quantity_input_" + id)
        let quantityInput = parseInt(inputElement.value) || 0;
        // quantityInput = Math.max(0, quantityInput);
        quantityInput = Math.max(1, Math.min(quantity, quantityInput));
        inputElement.value = quantityInput;
        let data = {
            quantity_cart: quantityInput,
            id_cart: id
        }
        let options = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json ; charset=UTF-8",
            },
        }
        fetch(cartApi, options)
            .then(function (res) {
                return res.json();
            })
            .then(function () {
                return start();
            })
    }
    
    function increaseQuantity(id, quantity){
        const inputElement = document.getElementById("quantity_input_" + id)
        let quantityInput = parseInt(inputElement.value) || 0;
        quantityInput = Math.min(quantity, quantityInput +1);
        inputElement.value = quantityInput;
        // Kích hoạt sự kiện input sau khi thay đổi giá trị
        const event = new Event('input', { bubbles: true });
        inputElement.dispatchEvent(event);
    }
    function decreaseQuantity(id, quantity){
        const inputElement = document.getElementById("quantity_input_" + id)
        let quantityInput = parseInt(inputElement.value) || 0;
        quantityInput = Math.max(1,quantityInput -1);
        inputElement.value = quantityInput;
        // Kích hoạt sự kiện input sau khi thay đổi giá trị
        const event = new Event('input', { bubbles: true });
        inputElement.dispatchEvent(event);
    }