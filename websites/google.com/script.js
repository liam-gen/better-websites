/*
* © Copyright 2023 liamgen.js
* Version : 1.0.0
* GitHub : liam-gen
*/
elements = document.querySelectorAll(`#center_col a`)

Array.prototype.slice.call(elements).forEach(v => {
    v.setAttribute("target", "_blank")
})