var arr = ["<p>Free Delivery <br> Applies to orders of 5.000.000₫ or more. View details </p>",
    "<p>New Styles on Sale: Up to 40% Off <br> Shop All Our New Markdowns </p>",
    "<p>Hello Nike App <br> Download the app to access everything Nike. Get Your Great</p>"];
var i = 0;
function slideShow() {
    document.getElementById("demo").innerHTML = arr[i];
    i++;
    if (i == arr.length) i = 0;
}
setInterval(slideShow, 2500);
/////

// const arrBagStrings = localStorage.getItem("bag");
// const arrBags = JSON.parse(arrBagStrings);
// document.getElementById("quatity").innerHTML = arrBags.length; 

// RESPONSIVE
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.main-menu');

menuIcon.addEventListener('click',() => {
    menuIcon.classList.toggle('bi-x-lg');
    navbar.classList.toggle('active');

});

