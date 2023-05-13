/*
 * © Copyright 2023 Better Websites
 * File version : 1.0.2-4
 * File author : liamgen.js
 * Informations : DO NOT TOUCH THIS FILE !
*/

function load(){

    // Si on trouve la variable extension & le modification du style est activé
    if(extension && window["better-websites-load"] != false){

        document.onkeydown = function(e){

            // Quand on fait Ctrl+B
            if(e.ctrlKey && e.key == "b"){
                Swal.fire({
                    title: extension.utf8('Better Settings - Paramètres'),
                    html: extension.utf8(`<div><input style="transform: scale(1.5)" type="checkbox" id="better-settings-load" ${localStorage.getItem("better-settings-load") == "true" || localStorage.getItem("better-settings-load") == "" ? "checked" : "unchecked"}>&nbsp;&nbsp;<span>Modifier le style du site</span></div><div><span>Utiliser un fond personnalisé</span><br><input style="width: 90%" type="text" id="better-settings-background" class="better-settings-input" value="${localStorage.getItem("better-settings-background")}"></div><div><span>Modifier la couleur du texte</span><br><input type="color" id="better-settings-text-color" value="${localStorage.getItem("better-settings-text-color") || "#FFFFFF"}"><br><br><input style="transform: scale(1.5)" type="checkbox" id="better-settings-editable" ${localStorage.getItem("better-settings-editable") == "true" || localStorage.getItem("better-settings-editable") == "" ? "checked" : "unchecked"}>&nbsp;<span>Rendre le contenu modifiable</span></div>`),
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

        // On définis les variables en css
        var r = document.querySelector(':root');
        r.style.setProperty('--background', 'url("'+localStorage.getItem("better-settings-background")+'")');
        r.style.setProperty('--text-color', localStorage.getItem("better-settings-text-color"));
        window["better-websites-load"] = true
    }else{
        setTimeout(load, 100)
    }
}

load()
