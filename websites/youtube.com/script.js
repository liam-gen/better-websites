document.onkeyup = function(e){
    if(e.ctrlKey && e.key == "z"){
        extension.modals.createModal("Anti-prof", `<div><span>Activer l'anti prof</span><input type='checkbox' ${localStorage.getItem("anti-prof") == "true" || localStorage.getItem("anti-prof") == "" ? "checked" : "unchecked"} id='anti-prof'><div>`, function(e){
            localStorage.setItem("anti-prof", document.getElementById("anti-prof").checked)
            location.reload()
        })
    }
}

if(localStorage.getItem("anti-prof") == "true"){
    if(window.location.href.startsWith("https://youtube.com/watch?v=")){
        window.title = "404 Not found"
        document.body.innerHTML = `<style>body, html {width: 100%; height: 100%; margin: 0; padding: 0}
    .row-container {display: flex; width: 100%; height: 100%; flex-direction: column; overflow: hidden;}
    .second-row { flex-grow: 1; border: none; margin: 0; padding: 0; overflow:hidden;}</style><div class='row-container'><iframe src='https://youtube.com/watch?v=0'  class="second-row" scrolling="no"></iframe></div>`

        document.querySelector("iframe").contentWindow.document.onkeyup = function(e){
        console.log(e.key)
        if(e.ctrlKey && e.key == "z"){
            console.log("ok")
            extension.modals.createModal("Anti-prof", `<div><span>Activer l'anti prof</span><input type='checkbox' ${localStorage.getItem("anti-prof") == "true" || localStorage.getItem("anti-prof") == "" ? "checked" : "unchecked"} id='anti-prof'><div>`, function(e){
                localStorage.setItem("anti-prof", document.getElementById("anti-prof").checked)
                location.reload()
            })
        }
    }
    }
    
}