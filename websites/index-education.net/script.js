/*
* © Copyright 2023 liamgen.js
* Version : 1.0.0
* GitHub : liam-gen
*/
extension.page.waitElement("#GInterface_T").then(element => {
    element.className = "interface_affV"
})

let len = document.querySelector("div[role=treegrid]").childNodes.length

document.querySelector("div[role=treegrid]").childNodes.forEach(v => console.log(v))