const ext = extension

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

const news_bar = ext.page.getElementByXpath("/html/body/table[3]/tbody/tr/td/div/main/article/b/div");

if (ext.page.elementExist(news_bar)) {
    news_bar.style = "display: none;"
}

const navbar = ext.page.getElementByXpath("/html/body/table[2]/tbody/tr/td[1]")

if(ext.page.elementExist(navbar)){
    navbar.style.textAlign = "center"
}

const copyrights = ext.page.getElementByXpath("/html/body/div[3]")
if (ext.page.elementExist(copyrights)) {
    copyrights.innerHTML = `<div align="center" style="margin: 30px;" onclick="extension.modals.openModal('copyrights')"><button class="nobtn btn">Voir le bas de page</button></div>`
}

const div_content = ext.page.getElementByXpath("/html/body/table[3]/tbody/tr/td/div")
if (ext.page.elementExist(div_content)) {
    div_content.className += " bw-div-content"
}

const after_copyrights = ext.page.getElementByXpath("/html/body/font")
if (ext.page.elementExist(after_copyrights)) {
    after_copyrights.remove()
}

ext.modals.createModal("copyrights", "Bas de page", `<div>Copyright <a href="https://www.francaisfacile.com/whoamif.php">Laurent Camus</a><br><br><a href="https://www.francaisfacile.com/feedbackf.php">En savoir plus, Aide, Contactez-nous</a> <a href="https://www.francaisfacile.com/conditions.php">Conditions d'utilisation</a> <a href="https://www.francaisfacile.com/conseils-de-securite.php">Conseils de sécurité</a> <a href="https://www.francaisfacile.com/plan-du-site.php">Plan du site</a> | <a href="https://www.francaisfacile.com/cgi2/faq/voir.php?id=93">Mentions légales / Vie privée</a> / <a href="https://www.francaisfacile.com/cgi2/faq/voir.php?id=249">Cookies.</a><br><br> Cours et exercices de français 100% gratuits, hors abonnement internet auprès d'un fournisseur d'accès.</div><br><div>Better websites by liamgen.js &copy; 2023</div><br><span><a href="javascript:Sddan.cmp.displayUI()">Modifier vos préférences de cookies</a> - <a href="https://www.francaisfacile.com/copyright.php">Copyrights complets</a></span><br>`)