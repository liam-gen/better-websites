elements = document.querySelectorAll(`#center_col a`)

Array.prototype.slice.call(elements).forEach(v => {
    v.setAttribute("target", "_blank")
})