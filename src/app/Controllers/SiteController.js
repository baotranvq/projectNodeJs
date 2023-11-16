const modeSlides = require('../Models/slide');

class SiteController {
    index = function (req, res) {
        modeSlides.slide( (banners) => {
            res.render('site/home',{slides: banners});
        }) 
    };  
   
    contact = function (req, res) {
        res.render('site/contact');
    };
}

module.exports = new SiteController();
