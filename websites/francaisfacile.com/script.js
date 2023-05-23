/*
* © Copyright 2023 liamgen.js
* Version : 1.0.6
* GitHub : liam-gen
*/
const ext = extension

ext.setCustomSettings({
    "target-correct": {
        title: "Ouvrir les corrections dans un nouvel onglet",
        type: "checkbox",
        default: true
    },

    "show-definition": {
        title: "Désactiver la nouvelle fenêtre quand on double clique sur un mot",
        type: "checkbox",
        default: true
    }
    
})

const title_header = ext.page.getElementByXpath("/html/body/table[1]")

let title = ext.utf8("Le Français Facile")

if (ext.page.elementExist(title_header)) {
    title_header.innerHTML = `<div class="ext-align-text"><h1>${title}</h1><!--<a href='https://www.francaisfacile.com/correspondants/contribuer.php'>Créer un test</a>--></div>`
}

const content = ext.page.getElementByXpath("/html/body/table[3]/tbody/tr/td[3]")

if (ext.page.elementExist(content)) {
    content.querySelector("div").style = "margin: 50px;"
    content.className += " bw-content"
}

const search_bar = ext.page.getElementByXpath("/html/body/table[2]/tbody/tr/td[2]/b/font/form")

if (ext.page.elementExist(search_bar)) {
    search_bar.childNodes.forEach(v => {
        if (v.nodeType == 1) {
            v.className += " bw-search-bar"
        }
    })
}

const to_remove_bar = ext.page.getElementByXpath("/html/body/table[3]/tbody/tr/td[2]")

if (ext.page.elementExist(to_remove_bar)) {
    to_remove_bar.remove()
}

const left_bar = ext.page.getElementByXpath("/html/body/table[3]/tbody/tr/td[1]")

if (ext.page.elementExist(left_bar)) {
    left_bar.remove()
}

if(!location.href.startsWith("https://www.francaisfacile.com/exercices/")){
    const news_bar = ext.page.getElementByXpath("/html/body/table[3]/tbody/tr/td/div/main/article/b/div");

    if (ext.page.elementExist(news_bar)) {
        news_bar.style = "display: none;"
    }
}

let url = new URL(window.location.href)

if(url.searchParams.get("display") == "new_window_correction"){
    extension.page.insertCSS(`table:not(body > table:nth-child(5)){display: none !important}#navi{display: none !important}body div:nth-child(9){display: none !important;}img[src='//www.anglaisfacile.com/test.gif']{display: none !important}img[src='https://www.anglaisfacile.com/cgi2/myexam/connectez-vous.gif']{display: none !important}form{display: none !important}`)
}

if(ext.getCustomSetting("target-correct")){
    let form = document.querySelector("form[action*='/cgi2/myexam/voir2r.php?id=']")
    if(extension.page.elementExist(form)){
        form.onsubmit = function(e){
        
            e.preventDefault();
            var left = screen.width;
            let i = window.open("https://google.com","new_window_correction","width=500,height=1020,toolbar=0,left="+left);
            i.onload = function(){
                i.document.title = "Correction de l'exercice"
                i.document.querySelector("link[rel='shortcut icon']").href = extension.href+"assets/logo.png"
            }
            form.setAttribute("target", "new_window_correction")
            form.setAttribute("action", form.action+"&display=new_window_correction")
            form.submit()
        }

        form.querySelector("input[type='submit']").onclick = function(){this.value = "CORRECTION >>"}
    }
}





const navbar = ext.page.getElementByXpath("/html/body/table[2]/tbody/tr/td[1]")

if(ext.page.elementExist(navbar)){
    navbar.style.textAlign = "center"
}

const copyrights = ext.page.getElementByXpath("/html/body/div[3]")
if(url.searchParams.get("display") == "new_window_correction"){
    copyrights.remove()
}
if (ext.page.elementExist(copyrights) && url.searchParams.get("display") != "new_window_correction") {
    div = document.createElement("div")
    div.style = "margin: 30px;"
    div.align = "center"
    div.onclick = function(){
        ext.modals.createModal("Bas de page", `<div>Copyright <a href="https://www.francaisfacile.com/whoamif.php">Laurent Camus</a><br><br><a href="https://www.francaisfacile.com/feedbackf.php">En savoir plus, Aide, Contactez-nous</a> <a href="https://www.francaisfacile.com/conditions.php">Conditions d'utilisation</a> <a href="https://www.francaisfacile.com/conseils-de-securite.php">Conseils de sécurité</a> <a href="https://www.francaisfacile.com/plan-du-site.php">Plan du site</a> | <a href="https://www.francaisfacile.com/cgi2/faq/voir.php?id=93">Mentions légales / Vie privée</a> / <a href="https://www.francaisfacile.com/cgi2/faq/voir.php?id=249">Cookies.</a><br><br> Cours et exercices de français 100% gratuits, hors abonnement internet auprès d'un fournisseur d'accès.</div><br><div>Better websites by liamgen.js &copy; 2023</div><br><span><a href="javascript:Sddan.cmp.displayUI()">Modifier vos préférences de cookies</a> - <a href="https://www.francaisfacile.com/copyright.php">Copyrights complets</a></span><br>`)
    }
    
    div.innerHTML = `<button class="bw-nobtn bw-btn">Voir le bas de page</button>`

    copyrights.innerHTML = ""
    copyrights.appendChild(div)
}

if(extension.getCustomSetting("show-definition")){
    function letsgo(){}
}

const div_content = ext.page.getElementByXpath("/html/body/table[3]/tbody/tr/td/div")
if (ext.page.elementExist(div_content)) {
    div_content.className += " bw-div-content"
}

const after_copyrights = ext.page.getElementByXpath("/html/body/font")
if (ext.page.elementExist(after_copyrights)) {
    after_copyrights.remove()
}