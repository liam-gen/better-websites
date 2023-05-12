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
        location.reload()
    }
}

const extension = new Extension()