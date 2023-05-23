
chrome.tabs.onUpdated.addListener(function(t){
    //console.log(t)
    /*fetch("https://better-websites.liamgen.repl.co/websites/francaisfacile.com/script.js").then(code => {
        chrome.scripting.executeScript({target: {tabId: t}, func: new Function(code.body)})
    })*/
    //xmlHttp.responseText;
    //chrome.tabs.executeScript({code: 'alert("yo")'})
    //chrome.scripting.executeScript({target: {tabId: t}, func: new Function(xmlHttp.responseText)})
})

chrome.runtime.onInstalled.addListener(function(){
    chrome.contextMenus.create({ id: "bw-settings", title: "Better Websites"});
    chrome.contextMenus.create({ id: "bw-page-settings", title: "Paramètres généraux", parentId: "bw-settings"});
    chrome.contextMenus.create({ id: "bw-custom-settings", title: "Paramètres du site", parentId: "bw-settings"});
    
})


chrome.contextMenus.onClicked.addListener(function(e, t){
    if(e.menuItemId == "bw-page-settings"){
        try{
            chrome.tabs.sendMessage(t.id, "bw-settings", function(response) {});
        }catch(e){
            console.log(e)
        }
    }

    if(e.menuItemId == "bw-custom-settings"){
        try{
            chrome.tabs.sendMessage(t.id, "bw-custom-settings", function(response) {});
        }catch(e){
            console.error(e)
        }
    }
})