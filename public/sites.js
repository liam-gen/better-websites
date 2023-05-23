/*
 * © Copyright 2023 Better Websites
 * File version : 1.0.5-2
 * File author : liamgen.js
*/

let manifest = chrome.runtime.getManifest()
let matches = manifest["content_scripts"][0]["matches"]
let websites = []
matches.forEach(v => {
    let url = v.replaceAll("*", "")
    url = url.replaceAll("/", "")
    url = url.replaceAll(":", "")
    url = url.replace(".", "")
    websites.push(url)
})

websites.forEach(i => {
    let li = document.createElement("li")
    let a = document.createElement("a")

    a.href = "http://"+i
    a.innerHTML = i
    a.target = "_blank"

    li.appendChild(a)
    document.getElementById("websites").appendChild(li)
})
