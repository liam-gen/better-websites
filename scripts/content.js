function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}


(async () => {
    console.log("ok")
    try {

        await console.log("BW - Load default style")

        style = await document.createElement('link');
        await style.setAttribute("href", chrome.runtime.getURL("styles/default.css"));
        await style.setAttribute("rel", "stylesheet")
        await document.body.appendChild(style)

        await console.log("BW - Load extensions")

        script = await document.createElement('script');
        await script.setAttribute("src", chrome.runtime.getURL("scripts/extension.js"));
        await script.setAttribute("ext", chrome.runtime.getURL(""))
        await document.head.appendChild(script)

        console.log("BW - Loading settings")

        script = await document.createElement('script');
        await script.setAttribute("src", chrome.runtime.getURL("scripts/default.js"));
        await document.body.appendChild(script)

        if (localStorage.getItem("better-settings-load") == "true" || localStorage.getItem("better-settings-load") == "") {
            try{
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open( "GET", "https://better-websites.liamgen.repl.co/api/version", false ); // false for synchronous request
                xmlHttp.send( null );
                const new_version = xmlHttp.responseText;
                const version = chrome.runtime.getManifest().version;
        
                if(version.localeCompare(new_version, undefined, { numeric: true, sensitivity: 'base' })){
                    window.open("https://better-websites.liamgen.repl.co/newversion.html", "_blank")
                }
            }catch(e){
                console.log(e)
            }
        
            await console.log("BW - Loading page script")
        
            script = await document.createElement('script');
            await script.setAttribute("src", chrome.runtime.getURL("websites/"+new URL(window.location.href).host+"/script.js"));
            await document.body.appendChild(script)
        
            await console.log("BW - Loading page assets")
        
            style = await document.createElement('link');
            await style.setAttribute("href", chrome.runtime.getURL("websites/"+new URL(window.location.href).host+"/style.css"));
            await style.setAttribute("rel", "stylesheet")
            await document.body.appendChild(style)
        }
    } catch (e) {
        console.log(e)
    }
})();