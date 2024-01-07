const nodemailer = require('nodemailer');
modelEmail = require('../Models/email.model');


class EmailController {

    sendEmail = async function (req, res) {
        let order_id = req.params.id;
        let result = await modelEmail.read(order_id);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tranvanquocbao333@gmail.com',
                pass: 'dwtbvxuszrndzyfw'
            }
        });

        var mailOptions = {
            from: '"Nike Custom" <tranvanquocbao333@gmail.com>',
            to: result[0].email,
            subject: 'Nike Custom: Đặt Hàng Thành Công',
            html: ` <div>   
                        <h2>Chào bạn! <br> Cảm ơn bạn đã chọn Nike Custom</h2>
                        <h3>Mã đơn hàng của bạn là #${result[0].order_id}</h3> 
                        <p>Chúng tôi sẽ gửi đơn hàng đến bạn trong thời gian sớm nhất. Bạn vui lòng kiểm tra điện thoại để shipper có thể gọi và giao hàng.</p>
                        <p>Chúc bạn một ngày tốt lành.</p>
                        <br>
                        <p>Trận trọng</p>
                        <h4>Nike Custom</h4>
                    </div>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        let data = {
            order_status: 1,
            order_id: order_id
        }
        await modelEmail.updateOrder(data);
        res.redirect("/admin")
    }
}

module.exports = new EmailController();
