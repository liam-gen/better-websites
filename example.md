## Exemple de site basique


Dossier : site.com

script.js
```js
document.body.innerHTML = "Hello World"
```

style.css
```css
body{
    background : blue
}
```

## Exemple de site avec les variables css

Dossier : site.com

script.js
```js
document.body.innerHTML = "Hello World"
```

style.css
```css
body{
    background : var(--background);
    background-color: #00FF00;
    font-family: var(--font);
    color: var(--text-color);
}
```

## Exemple de site des paramètres custom

Dossier : site.com

*Les paramètres personalisés pour le site peuvent être modifiés dans les paramètres de Better Websites sur la page du site ou avec la fonction `extension.openCustomSettings()`*

script.js
```js

// La variable extension est déjà définie de base
extension.setCustomSettings({
    "remove-body": {
        title: "Enlever le contenu",
        type: "checkbox",
        default: true
    }
    
})

if(extension.getCustomSetting("remove-body")){
    document.body.innerHTML = ""
}
```

style.css
```css
body{
    background : var(--background);
    background-color: #00FF00;
    font-family: var(--font);
    color: var(--text-color);
}
```