
document.getElementById("listProduct-Ari").innerHTML = "Air Max 95 Shoes (" + arrShoe.length + ")";
// ///////////////// side Bar ////////////////////////////////////////
function selectGenderShow() {
    document.getElementById("listProduct-genderShow").classList.add("listProduct-hide");
    document.getElementById("listProduct-genderHide").classList.remove("listProduct-Gender-hide");
    document.getElementById("listProduct-genderHide").classList.remove("listProduct-hide");
}
document.getElementById("listProduct-btn-show").onclick = selectGenderShow;

function selectGenderHide() {
    document.getElementById("listProduct-genderHide").classList.add("listProduct-hide");
    document.getElementById("listProduct-genderShow").classList.remove("listProduct-hide");
}
document.getElementById("listProduct-btn-hide").onclick = selectGenderHide;

function selectPriceShow() {
    document.getElementById("listProduct-price").classList.add("listProduct-hide");
    document.getElementById("listProduct-priceHide").classList.remove("listProduct-priceHide");
    document.getElementById("listProduct-priceHide").classList.remove("listProduct-hide");
}
document.getElementById("listProduct-btn-priceShow").onclick = selectPriceShow;

function selectPriceHide() {
    document.getElementById("listProduct-priceHide").classList.add("listProduct-hide");
    document.getElementById("listProduct-price").classList.remove("listProduct-hide");
}
document.getElementById("listProduct-btn-priceHide").onclick = selectPriceHide;
// ///////////////////////////TECHNOLOGY //////////////////////////////////
function selectTechnologyShow() {
    document.getElementById("listProduct-technology").classList.add("listProduct-hide");
    document.getElementById("listProduct-technologyHide").classList.remove("listProduct-technologyHide");
    document.getElementById("listProduct-technologyHide").classList.remove("listProduct-hide");
}
document.getElementById("listProduct-btn-technologyShow").onclick = selectTechnologyShow;

function selectTechnologyHide() {
    document.getElementById("listProduct-technologyHide").classList.add("listProduct-hide");
    document.getElementById("listProduct-technology").classList.remove("listProduct-hide");
}
document.getElementById("listProduct-btn-technologyHide").onclick = selectTechnologyHide;
// /////////////////////// end side bar//////////////////////////


