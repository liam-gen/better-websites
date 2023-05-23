/*
* © Copyright 2023 liamgen.js
* Version : 1.0.0
* GitHub : liam-gen
*/

extension.setCustomSettings({
    "link-target": {
        title: "Ouvrir les liens dans un nouvel onglet",
        type: "checkbox",
        default: true
    },
    "fixed-infos": {
        title: "Rendre les informations complémentaires fixes (bêta)",
        type: "checkbox",
        default: false
    }
    
})

if(extension.getCustomSetting("link-target")){
    let elements = document.querySelectorAll(`#center_col a`)

    if(extension.page.elementExist(elements)){
        Array.prototype.slice.call(elements).forEach(v => {
            v.setAttribute("target", "_blank")
        })
    }
}

if(extension.getCustomSetting("fixed-infos")){
    let div = document.querySelector("div[role='complementary']")
    if(extension.page.elementExist(div)){
        div.style = `    position: fixed;
        top: 120px;
        right: 10px;
        z-index: 9999;`
    }
}