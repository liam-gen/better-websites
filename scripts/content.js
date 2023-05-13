/*
 * © Copyright 2023 Better Websites
 * File version : 1.0.2-3
 * File author : liamgen.js
 * Informations : DO NOT TOUCH THIS FILE !
*/

function getCanonicalHost(hostname) {
    const MAX_TLD_LENGTH = 3;
    
    function isNotTLD(_) { return _.length > MAX_TLD_LENGTH; };
  
    hostname = hostname.split('.');
    hostname = hostname.slice(Math.max(0, hostname.findLastIndex(isNotTLD)));
    hostname = hostname.join('.');
  
    return hostname;
  }

function UrlExists(url)
{
    try{
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status!=404;
    }catch(e){
        throw "BW - Aucun style trouvé pour cette extension"
    }
}


(async () => {
    console.log("BW - Starting...")
    try {

        // Si le dossier avec l'url existe pas on annule
        if(!UrlExists(chrome.runtime.getURL("websites/"+getCanonicalHost(new URL(window.location.href).host)+"/script.js"))){
            return
        }
        
        await console.log("BW - Load default style")

        // On charge les styles par défaut
        style = await document.createElement('link');
        await style.setAttribute("href", chrome.runtime.getURL("styles/default.css"));
        await style.setAttribute("rel", "stylesheet")
        await document.body.appendChild(style)

        await console.log("BW - Load extensions")

        // On changr le script avec la classe extension
        script = await document.createElement('script');
        await script.setAttribute("src", chrome.runtime.getURL("scripts/extension.js"));
        await script.setAttribute("ext", chrome.runtime.getURL(""))
        await document.head.appendChild(script)

        console.log("BW - Loading settings")

        // On charge le script par défaut
        script = await document.createElement('script');
        await script.setAttribute("src", chrome.runtime.getURL("scripts/default.js"));
        await document.body.appendChild(script)

        await console.log("BW - Loading page add-ons")
        
        // On charge le script qui permet de faire les alertes
        script = await document.createElement('script');
        await script.setAttribute("src", chrome.runtime.getURL("assets/sweet.js"));
        await document.body.appendChild(script)

        // On charge le style qui permet de faire les alertes
        style = await document.createElement('link');
        await style.setAttribute("href", chrome.runtime.getURL("assets/sweet.css"));
        await style.setAttribute("rel", "stylesheet")
        await document.body.appendChild(style)

        // Si dans les paramètres la Modification du style est activé
        if (localStorage.getItem("better-settings-load") == "true" || localStorage.getItem("better-settings-load") == "") {
            try{
                // On va chercher la dernière version
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open( "GET", "https://better-websites.liamgen.repl.co/api/version", false );
                xmlHttp.send( null );
                const new_version = xmlHttp.responseText;
                const version = chrome.runtime.getManifest().version;

                // On vérifie si la version est à jour
        
                if(version.localeCompare(new_version, undefined, { numeric: true, sensitivity: 'base' })){
                    window.open("https://better-websites.liamgen.repl.co/newversion.html", "_blank")
                }
            }catch(e){
                console.log(e)
            }
        
            await console.log("BW - Loading page script")

            // On charge le script personalisé du site
            script = await document.createElement('script');
            await script.setAttribute("src", chrome.runtime.getURL("websites/"+getCanonicalHost(new URL(window.location.href).host)+"/script.js"));
            await document.body.appendChild(script)
        
            await console.log("BW - Loading page assets")

            // On charge le style personalisé du site
            style = await document.createElement('link');
            await style.setAttribute("href", chrome.runtime.getURL("websites/"+getCanonicalHost(new URL(window.location.href).host)+"/style.css"));
            await style.setAttribute("rel", "stylesheet")
            await document.body.appendChild(style)
            
            // Si le mode design est activé dans les paramètres
            if(localStorage.getItem("better-settings-editable") == "true" || localStorage.getItem("better-settings-editable") == ""){
                document.designMode = "on"
            }
        }
    } catch (e) {
        console.log(e)
    }
})();