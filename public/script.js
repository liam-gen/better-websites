/*
 * © Copyright 2023 Better Websites
 * File version : 1.0.5-0
 * File author : liamgen.js
*/

document.querySelectorAll("button[meta-href]").forEach(element => {
    element.onclick = function(){
        console.log(element.getAttribute("meta-href"), element.getAttribute("target") ? element.getAttribute("target") : "_self")
        window.open(element.getAttribute("meta-href"), element.getAttribute("target") ? element.getAttribute("target") : "_self")
    }
})

function wildcardToRegExp (s) {
    return new RegExp('^' + s.split(/\*+/).map(regExpEscape).join('.*') + '$');
}

function regExpEscape (s) {
    return s.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    let manifest = chrome.runtime.getManifest()
    let websites = manifest["content_scripts"][0]["matches"]
    websites.forEach(v => {
        if(tabs[0].url.match(wildcardToRegExp(v))){
            document.getElementById("open_settings").style.display = "block"
            document.getElementById("open_settings").onclick = function(){
                chrome.tabs.sendMessage(tabs[0].id, "bw-settings", function(response) {
                    window.close()
                });
            }
        }
    })
});