function webcompatible() {
    document.getElementById("compatible").style.visibility = "visible";
    document.getElementById("menu").style.visibility = "hidden";
}
function menu_show(){
    document.getElementById("compatible").style.visibility = "hidden";
    document.getElementById("menu").style.visibility = "visible";
}
function notweb(){
    window.open("https://better-websites.liamgen.repl.co");
}

document.getElementById("list").onclick = function(){webcompatible()};
document.getElementById("nous").onclick = function(){notweb()};
document.getElementById("go_to").onclick = function(){menu_show()};