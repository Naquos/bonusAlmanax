function cacherLesElements() {
    // $() <- Sélecteur jQuery (jQuery truc pour réduire l'écriture du code JS)
    // Ici on choisit de récupérer tous les élément html qui possèdent la classe "divACacher"
    // On aurait également pu utiliser le document.getElementsByClassName("myClass") pour récupérer nos différents éléments
    // Ce qui est contenu dans le each c'est du lambda calcul : où comment écrire une instruction en 1 ligne au lieu de 3+ ^^
    // Si tu comprends pas c'est normal ^^
    $(".divACacher").each((index, element) => $(element).hide());
}

function afficherUnElement(idElement) {
    cacherLesElements();
    // Là on utilise encore le sélecteur jQuery mais pour récupérer un élément par rapport à son id
    // Attention les fonctions show() et hide() sont des fonctions jQuerry
    // Pour faire la même chose en js : 
    // - Pour afficher : document.getElementById(idElement).style.display="";
    // - Pour cacher : document.getElementById(idElement).style.display="none";
    $("#" + idElement).show();
}

// ------------------------- MAIN ----------------------
afficherUnElement("div1");
