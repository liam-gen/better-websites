
function load(){
    if(extension && window["better-websites-load"] != false){

        extension.page.loadScript("assets/sweet.js")
        extension.page.insertStylesheet("assets/sweet.css")

        document.onkeydown = function(e){
            if(e.ctrlKey && e.key == "b"){
                Swal.fire({
                    title: extension.utf8('Better Settings - Paramètres'),
                    html: extension.utf8(`<div><input style="transform: scale(1.5)" type="checkbox" id="better-settings-load" ${localStorage.getItem("better-settings-load") == "true" || localStorage.getItem("better-settings-load") == "" ? "checked" : "unchecked"}>&nbsp;&nbsp;<span>Modifier le style du site</span></div><div><span>Utiliser un fond personnalisé</span><br><input style="width: 90%" type="text" id="better-settings-background" class="better-settings-input" value="${localStorage.getItem("better-settings-background")}"></div><div><span>Modifier la couleur du texte</span><br><input type="color" id="better-settings-text-color" value="${localStorage.getItem("better-settings-text-color") || "#FFFFFF"}"><br><br><span>Rendre le contenu modifiable</span>&nbsp;<input style="transform: scale(1.5)" type="checkbox" id="better-settings-editable" ${localStorage.getItem("better-settings-editable") == "true" || localStorage.getItem("better-settings-editable") == "" ? "checked" : "unchecked"}></div>`),
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Sauvegarder',
                    denyButtonText: `Annuler`,
                  }).then((result) => {
                    if (result.isConfirmed) {
                        extension.modals.setSettings()
                    } else if (result.isDenied) {
                      return
                    }
                  })
            }
        }


        var r = document.querySelector(':root');
        r.style.setProperty('--background', 'url("'+localStorage.getItem("better-settings-background")+'")');
        r.style.setProperty('--text-color', localStorage.getItem("better-settings-text-color"));
        window["better-websites-load"] = true
    }else{
        setTimeout(load, 100)
    }
}

load()
