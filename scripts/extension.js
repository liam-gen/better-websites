/*
 * © Copyright 2023 Better Websites
 * File version : 1.0.2-1
 * File author : liamgen.js
 * Informations : DO NOT TOUCH THIS FILE !
*/

class Extension{
    constructor(){
        this.page = new Page()
        this.modals = new Modals(this)
        this.href = document.querySelector("script[ext]").getAttribute("ext")
        this.settings = {}
        this.customSettings = {}
        this.hasCustomSettings = false
    }

    getWebsite(){
        function getCanonicalHost(hostname) {
            const MAX_TLD_LENGTH = 3;
            
            function isNotTLD(_) { return _.length > MAX_TLD_LENGTH; };
          
            hostname = hostname.split('.');
            hostname = hostname.slice(Math.max(0, hostname.findLastIndex(isNotTLD)));
            hostname = hostname.join('.');
          
            return hostname;
        }

        return getCanonicalHost(new URL(location.href).host)
    }

    utf8(text){
        try{
            return decodeURIComponent(escape(text))
        }catch(e){
            return text
        }
    }

    getURL(){
        return document.querySelector("script[ext]").getAttribute("ext")
    }

    getCustomSetting(id){
        let value = localStorage.getItem("bw-cs-"+id) ? localStorage.getItem("bw-cs-"+id) : this.customSettings[id].default
        if(value == "true"){
            value = true
        }
        else if(value == "false"){
            value = false
        }
        return value
    }

    setCustomSettings(settings){
        this.customSettings = settings
        this.hasCustomSettings = true
    }

    openCustomSettings(){
        const container = document.createElement("div")

        const content = document.createElement("div")
        content.style = "text-align: left !important;"
        const settings = this.customSettings

        Object.keys(settings).forEach((k) => {
            let s = settings[k]

            let span = document.createElement("span")
            span.innerHTML = s.title

            let input = document.createElement("input")
            input.setAttribute("type", s.type)
            if(s.type == "checkbox"){
                let statut = extension.getCustomSetting(k) ? "checked" : "unchecked"
                input.style.margin = "10px"
                input.setAttribute(statut, "")
                input.id = "bw-cs-set-"+k
                content.appendChild(input)
                content.appendChild(span)
            }
            else {
                let value = localStorage.getItem("bw-cs-"+k) ? localStorage.getItem("bw-cs-"+k) : s.default
                input.setAttribute("value", value)
                input.id = "bw-cs-set-"+k
                content.appendChild(span)
                content.appendChild(document.createElement("br"))
                content.appendChild(input)
            }
            content.appendChild(document.createElement("br"))

            container.appendChild(content)
            
        })

        

            Swal.fire({
                title: extension.utf8('Paramètres du site'),
                html: extension.utf8(container.innerHTML),
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Sauvegarder',
                denyButtonText: `Annuler`,
              }).then((result) => {
                if (result.isConfirmed) {
                    Object.keys(settings).forEach((k) => {
                        let v = settings[k]
                        let value;
                        if(v.type == "checkbox"){
                            value = document.getElementById("bw-cs-set-"+k).checked
                        }else{
                            value = document.getElementById("bw-cs-set-"+k).value
                        }
                        localStorage.setItem("bw-cs-"+k, value)
                        
                    })
                    location.reload()
                } else if (result.isDenied) {
                  return
                }
              })
    }

    openThemeInfos(){
        let infos;

        try{
            var xmlHttp = new XMLHttpRequest();
            
            xmlHttp.open( "GET", this.href+"websites/"+this.getWebsite()+"/manifest.json", false );
            xmlHttp.send( null );
            infos = JSON.parse(xmlHttp.responseText)
        }
        catch(e){
            infos = false
        }

        if(infos){
            let director = document.createElement("div")
            let container = document.createElement("div")
            container.style = "text-align: left !important;"
            Object.keys(infos).forEach(v => {
                let element = document.createElement("span")
                switch(v){
                    case "author":
                        element.innerHTML = `<svg width='15px' fill='gray' style='vertical-align: center' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg> Auteur : <b>${infos[v]}</b>`
                        break
                    case "version":
                        element.innerHTML = `<svg width='15px' fill='gray' style='vertical-align: center' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M320 488c0 9.5-5.6 18.1-14.2 21.9s-18.8 2.3-25.8-4.1l-80-72c-5.1-4.6-7.9-11-7.9-17.8s2.9-13.3 7.9-17.8l80-72c7-6.3 17.2-7.9 25.8-4.1s14.2 12.4 14.2 21.9v40h16c35.3 0 64-28.7 64-64V153.3C371.7 141 352 112.8 352 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V320c0 70.7-57.3 128-128 128H320v40zM456 80a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM192 24c0-9.5 5.6-18.1 14.2-21.9s18.8-2.3 25.8 4.1l80 72c5.1 4.6 7.9 11 7.9 17.8s-2.9 13.3-7.9 17.8l-80 72c-7 6.3-17.2 7.9-25.8 4.1s-14.2-12.4-14.2-21.9V128H176c-35.3 0-64 28.7-64 64V358.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V192c0-70.7 57.3-128 128-128h16V24zM56 432a24 24 0 1 0 48 0 24 24 0 1 0 -48 0z"/></svg> Version : <code>${infos[v]}</code>`
                        break
                    case "email":
                        element.innerHTML = `<svg width='15px' fill='gray' style='vertical-align: center' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg> E-mail : <a href='mailto:${infos[v]}' target='_blank'>${infos[v]}</a>`
                        break
                    case "github":
                        element.innerHTML = `<svg width='15px' fill='gray' style='vertical-align: center' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg> GitHub : <a href='https://github.com/${infos[v]}' target='_blank'>${infos[v]}</a>`
                        break
                    case "website":
                        element.innerHTML = `<svg width='15px' fill='gray' style='vertical-align: center' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"/></svg> Site Web : <a href='${infos[v]}' target='_blank'>${infos[v]}</a>`
                        break
                }

                container.appendChild(element)
                container.appendChild(document.createElement("br"))
            })

            director.appendChild(container)


            Swal.fire({
                title: this.utf8('A propos du thème'),
                html: this.utf8(director.innerHTML),
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'OK',
              })
        }
    }

    openSettings(){
        let fonts;
        let infos;

        try{
            var xmlHttp = new XMLHttpRequest();
            
            xmlHttp.open( "GET", this.href+"websites/"+this.getWebsite()+"/manifest.json", false );
            xmlHttp.send( null );
            infos = true
        }
        catch(e){
            infos = false
        }

                try{
                    var xmlHttp = new XMLHttpRequest();
                    xmlHttp.open( "GET", this.href+"assets/fonts.json", false );
                    xmlHttp.send( null );
                    fonts = JSON.parse(xmlHttp.responseText).sort()
                }
                catch(e){
                    fonts = []
                }

                let container = document.createElement("div")

                let font_input = document.createElement("select")
                font_input.style = "color: black !important"
                font_input.id = "better-settings-font"

                fonts.forEach(v => {
                    let e = document.createElement("option")
                    e.value = v
                    e.innerHTML = v
                    e.style.fontFamily = v
                    if(localStorage.getItem("better-settings-font") == v){
                        e.setAttribute("selected", "")
                        font_input.style.fontFamily = v
                    }
                    e.style.color = "black"
                    font_input.appendChild(e)
                })

                font_input.setAttribute("onchange", `document.getElementById("better-settings-font").style.fontFamily = document.getElementById("better-settings-font").value`)
                container.appendChild(font_input)

                let after = "";

                if(this.hasCustomSettings){

                    let div = document.createElement("div")
                    let button = document.createElement("button")

                    button.id = "bw-open-custom-settings-"+Math.floor(Math.random() * 9999999)

                    this.page.waitElement("#"+button.id).then(e => {
                        e.onclick = function(){
                            extension.openCustomSettings()
                        }
                    })
                    button.innerHTML = "Paramètres du site"
                    button.className = "bw-nobtn bw-btn"
                    button.style = "border: solid .1px gray !important;"

                    div.appendChild(button)

                    after = div.innerHTML
                }

                let info_container = document.createElement("div");

                if(infos){
                    let svg = document.createElement("svg")
                    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
                    svg.setAttribute("viewBox", "0 0 512 512")
                    svg.setAttribute("width", "30px")
                    svg.setAttribute("fill", "#3E88EF")
                    svg.style = "vertical-align: middle;"
                    svg.id = "bw-settings-theme-infos"

                    this.page.waitElement("#"+svg.id).then(e => {
                        e.onclick = function(){
                            extension.openThemeInfos()
                        }

                        e.onmouseover = function(){
                            setTimeout(function(){
                                e.setAttribute("fill", "#1D63DC")
                            }, 100)
                        }

                        e.onmouseleave = function(){
                            setTimeout(function(){
                                e.setAttribute("fill", "#3E88EF")
                            }, 100)

                        }
                    })

                    svg.innerHTML = `<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>`

                    info_container.appendChild(svg)
                }



                Swal.fire({
                    title: this.utf8('Better Websites - Paramètres '+info_container.innerHTML),
                    html: this.utf8(`<div style="color: black !important"><input style="color: black !important" style="transform: scale(1.5)" type="checkbox" id="better-settings-load" ${localStorage.getItem("better-settings-load") == "true" || localStorage.getItem("better-settings-load") == "" ? "checked" : "unchecked"}>&nbsp;&nbsp;<span style="color: black !important">Modifier le style du site</span></div><div style="color: black !important"><span style="color: black !important">Utiliser un fond personnalisé</span><br><input style="color: black !important" style="width: 90%" type="text" id="better-settings-background" class="better-settings-input" value="${localStorage.getItem("better-settings-background") == "null" ? "" : localStorage.getItem("better-settings-background")}"></div><div style="color: black !important"><span style="color: black !important">Modifier la couleur du texte</span><br><input style="color: black !important" type="color" id="better-settings-text-color" value="${localStorage.getItem("better-settings-text-color") || "#FFFFFF"}"><br><br><input style="color: black !important" style="transform: scale(1.5)" type="checkbox" id="better-settings-editable" ${localStorage.getItem("better-settings-editable") == "true" || localStorage.getItem("better-settings-editable") == "" ? "checked" : "unchecked"}>&nbsp;<span style="color: black !important">Rendre le contenu modifiable</span><br><br><span style="color: black !important">Choisir la police</span><br>${container.innerHTML}<br><br>${after}</div>`),
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Sauvegarder',
                    denyButtonText: `Annuler`,
                  }).then((result) => {
                    if (result.isConfirmed) {
                        this.modals.setSettings()
                    } else if (result.isDenied) {
                      return
                    }
                  })
            }
}

class Page{
    getElementByXpath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    exists(element){
        return new Promise((res, rej) => {
            this.elementExist(element) ? res(element) : rej()
        })
    }

    waitElement(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }
    
            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });
    
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    insertCSS(css, where="beforeend"){
        document.body.insertAdjacentHTML(where, "<style>"+css+"</style>");
    }

    elementExist(element){
        return typeof(element) != 'undefined' && element != null
    }

    insertHTML(html, where="beforeend"){
        document.body.insertAdjacentHTML(where, html);
    }

    loadScript(src){
        let url = document.querySelector("script[ext]").getAttribute("ext")
        const script = document.createElement('script');
        script.setAttribute("src", url+src);
        document.body.appendChild(script)
    }

    insertStylesheet(src){
        let url = document.querySelector("script[ext]").getAttribute("ext")
        const style = document.createElement('link');
        style.href = url+src
        style.rel = "stylesheet"
        document.head.appendChild(style)
    }
}

class Modals{
    constructor(ext){
        this.ext = ext
    }

    createModal(title, html, callback){
        Swal.fire({
            title: extension.utf8(title),
            html: extension.utf8(html),
            showDenyButton: false,
            showCancelButton: false,
          }).then(callback)
    }

    setSettings(){
        localStorage.setItem('better-settings-load', document.getElementById("better-settings-load").checked)
        localStorage.setItem("better-settings-background", document.getElementById("better-settings-background").value)
        localStorage.setItem("better-settings-text-color", document.getElementById("better-settings-text-color").value)
        localStorage.setItem("better-settings-editable", document.getElementById("better-settings-editable").checked)
        localStorage.setItem("better-settings-font", document.getElementById("better-settings-font").value)
        location.reload()
    }
}

const extension = new Extension()