window["better-modals-open"] = false

class Extension{
    constructor(){
        this.page = new Page()
        this.modals = new Modals(this)
        this.href = document.querySelector("script[ext]").getAttribute("ext")
    }

    utf8(text){
        try{
            return decodeURIComponent(escape(text))
        }catch(e){
            return text
        }
    }
}

class Page{
    getElementByXpath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
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

    createModal(id, title, text){
        const html = extension.utf8(`<div id="${id}" class="modal-window"><div><button onclick="extension.modals.closeModal('${id}')" title="Fermer" class="modal-close nobtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="gray" d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg></button><h1>${title}</h1>${text}<br><span class="better-settings-copyrights">Powered by Better Websites <img src="${this.ext.href+"assets/logo.png"}" class="better-settings-logo"></span></div></div>`)
        this.ext.page.insertHTML(html)
    }

    openModal(id){
        let i = document.getElementById(id);
        i.style.visibility = "visible";
        i.style.opacity = 1;
        i.style.pointerEvents = 'auto'
        window["better-modals-open"] = true
    }

    closeModal(id){
        let i = document.getElementById(id);
        i.style.visibility = "hidden";
        i.style.opacity = 0;
        i.style.pointerEvents = 'none'
        window["better-modals-open"] = false
    }

    setSettings(){
        localStorage.setItem('better-settings-load', document.getElementById("better-settings-load").checked)
        localStorage.setItem("better-settings-background", document.getElementById("better-settings-background").value)
        localStorage.setItem("better-settings-text-color", document.getElementById("better-settings-text-color").value)
        location.reload()
    }
}

const extension = new Extension()