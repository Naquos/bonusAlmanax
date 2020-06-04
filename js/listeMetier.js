/**
 * 
 * @param {ListeMetier} listeMetier 
 */
function affichageMétierCollapse(listeMetier) {
    let html = "";
    Object.keys(listeMetier).forEach(nomMetier => html += createHtmlMetierCollapse(nomMetier, listeMetier[nomMetier]));
    $("#listeMetierCollapse").html(html);
}

/**
 * 
 * @param {String} nomMetier 
 * @param {Object} listePersonnage 
 */
function createHtmlMetierCollapse(nomMetier, listePersonnage) {
    let html = "";
    Object.keys(listePersonnage)
        .sort((x, y) => listePersonnage[y].Lvl - listePersonnage[x].Lvl)
        .forEach(
            nomPersonnage => html += createHtmlPersonnageInListe(nomMetier, nomPersonnage, listePersonnage[nomPersonnage].Lvl)
        );
    return `
    <div style="border:#e3e3e3 solid 1px;padding:1px; border-radius: 10px;margin:2px;"
        data-toggle="collapse" data-target="#`+ nomMetier + `Liste" aria-expanded="false" aria-controls="` + nomMetier + `Liste" 
        onclick="changeArrow(this)">
        <div
            style="background-color: #e3e3e3; border-radius: 10px; color:#51636b; text-indent:2mm">

            <i class="fa fa-arrow-circle-right"></i>
            ` + nomMetier + `
        </div>
    </div>
    <div class="collapse" id="`+ nomMetier + `Liste">
        ` + html + `
    </div>`;
}

/**
 * 
 * @param {elementHtml} element 
 */
function changeArrow(element) {
    let i = element.getElementsByTagName("i")[0];
    if (i.classList.contains("fa-arrow-circle-right")) {
        i.classList.remove("fa-arrow-circle-right");
        i.classList.add("fa-arrow-circle-down");
    } else {
        i.classList.add("fa-arrow-circle-right");
        i.classList.remove("fa-arrow-circle-down");
    }
}

/**
 * 
 * @param {String} nomMetier 
 * @param {String} nomPersonnage 
 * @param {String} lvlMetier 
 */
function createHtmlPersonnageInListe(nomMetier, nomPersonnage, lvlMetier) {
    return `
    <div style="background-color: #f3f3f3; border-radius: 10px;
                margin-left:3%;width:94%;border:#e3e3e3 solid 1px; 
                color:#51636b; text-indent:2mm" 
                onclick='afficherCommande("`+ nomMetier + `","` + nomPersonnage + `")'>
        `+ nomPersonnage + ` Lvl ` + lvlMetier + `
    </div>`;
}

/**
 * 
 * @param {String} metier 
 * @param {String} joueur 
 */
function afficherCommande(metier, joueur) {
    $("#nomJoueurCommande").html(joueur);
    let commandes = "Commandes";
    let listeCommande = listeMetier[metier][joueur][commandes];
    let html = "";
    Object.keys(listeCommande)
        .forEach(x => html += createHtmlLigneCommande(listeCommande[x]));
    $("#bodyListeCommande").html(html);
}

/**
 * 
 * @param {Objet} detailCommande 
 */
function createHtmlLigneCommande(detailCommande) {
    return `
        <tr>
            <td>
                `+ detailCommande.DateDemande.split("-").reverse().join("/") + `
            </td>
            <td>
                `+ detailCommande.Demandeur + `
            </td>
            <td>
                `+ detailCommande.Item + `
            </td>
            <td>
                `+ detailCommande.Nombre + `
            </td>
            <td>
            `   + createHtmlColorStatus(detailCommande.Status) + `
            </td>
        </tr>`;
}

/**
 * 
 * @param {String} status 
 */
function createHtmlColorStatus(status) {
    color = "green";
    if (status == "Refusée") {
        color = "red";
    } else if (status == "Terminée") {
        color = "gray";
    } else if (status == "En cours") {
        color = "yellow";
    }
    return `
        <div style="background-color:` + color + `;margin:auto; width:20px;height:20px; border-radius:100%">
        </div>
    `;
}

//-------------- MAIN ---------------------

let listeMetier = {
    Paysan: {
        NatWhisp: {
            Lvl: 130,
            Commandes: {},
        },
        Zewynn: {
            Lvl: 130,
            Commandes: {
                MotRandom1: {
                    DateDemande: "2020-06-14",
                    Demandeur: "Alpha",
                    Item: "Champoule Tout",
                    Nombre: "12",
                    Status: "Acceptée"
                },
                MotRandom2: {
                    DateDemande: "2020-05-22",
                    Demandeur: "NorAax",
                    Item: "Graine de Tournesol",
                    Nombre: "1000",
                    Status: "Terminée"
                },
                MotRandom3: {
                    DateDemande: "2020-06-14",
                    Demandeur: "Amateratsu",
                    Item: "Farine Eternelle",
                    Nombre: "4",
                    Status: "En cours"
                },
            },
        },
        Clemdu: {
            Lvl: 98,
            Commandes: {},
        },
        NewYoshi: {
            Lvl: 110,
            Commandes: {},
        },
    },
    Herboriste: {},
    Boulanger: {},
    Pecheur: {},
};

affichageMétierCollapse(listeMetier);
