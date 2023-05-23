/*
 * © Copyright 2023 Better Websites
 * File version : 1.0.2-4
 * File author : liamgen.js
 * Informations : DO NOT TOUCH THIS FILE !
*/

function load(){

    

    // Si on trouve la variable extension & le modification du style est activé
    if(extension && window["better-websites-load"] != false){

        window.addEventListener('replaceState', function(e) {
            if(new URL(window.location.href).searchParams.get("bw-settings") == 'show'){
                let myurl = new URL(window.location.href)
                myurl.searchParams.delete("bw-settings")
                const nextURL = myurl.toString();
                const nextTitle = 'My new page title';
                const nextState = { additionalInformation: 'Updated the URL with JS' };


                history.replaceState(nextState, nextTitle, nextURL);
                extension.openSettings()
                
            }

            if(new URL(window.location.href).searchParams.get("bw-custom-settings") == 'show'){
                let myurl = new URL(window.location.href)
                myurl.searchParams.delete("bw-custom-settings")
                const nextURL = myurl.toString();
                const nextTitle = 'My new page title';
                const nextState = { additionalInformation: 'Updated the URL with JS' };


                history.replaceState(nextState, nextTitle, nextURL);
                extension.openCustomSettings()
                
            }
        });

        document.onkeydown = function(e){

            // Quand on fait Ctrl+B
            if(e.ctrlKey && e.key == "b"){
                extension.openSettings()
            }
        }

        // On définis les variables en css
        var r = document.querySelector(':root');
        let bg = localStorage.getItem("better-settings-background") ? localStorage.getItem("better-settings-background") : ""
        r.style.setProperty('--background', 'url("'+bg+'")');
        r.style.setProperty('--text-color', localStorage.getItem("better-settings-text-color"));
        r.style.setProperty('--font', localStorage.getItem("better-settings-font"));
        window["better-websites-load"] = true
    }else{
        setTimeout(load, 100)
    }
}

load()
