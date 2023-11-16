document.getElementById("page-next").onclick = function(){
    let lists = document.querySelectorAll('.page-item-shoes');
    document.getElementById('page-slide').appendChild(lists[0]);
}
document.getElementById("page-prev").onclick = function(){
    let lists = document.querySelectorAll('.page-item-shoes');
    document.getElementById('page-slide').prepend(lists[lists.length-1]);
}