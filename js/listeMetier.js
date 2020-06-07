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
    let nomMetierModif = nomMetier.split("'").join("_").split(" ").join("_");
    Object.keys(listePersonnage)
        .filter(x => x != "null")
        .sort((x, y) => listePersonnage[y].Lvl - listePersonnage[x].Lvl)
        .forEach(
            nomPersonnage => html += createHtmlPersonnageInListe(nomPersonnage, listePersonnage[nomPersonnage].Lvl)
        );
    return `
    <div style="border:#e3e3e3 solid 1px;padding:1px; border-radius: 10px;margin:2px;"
        data-toggle="collapse" data-target="#`+ nomMetierModif + `Liste" aria-expanded="false" aria-controls="` + nomMetierModif + `Liste" 
        onclick="changeArrow(this)">
        <div
            style="background-color: #e3e3e3; border-radius: 10px; color:#51636b; text-indent:2mm">

            <i class="fa fa-arrow-circle-right"></i>
            ` + nomMetier + `
        </div>
    </div>
    <div class="collapse" id="`+ nomMetierModif + `Liste">
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
 * @param {String} nomPersonnage 
 * @param {String} lvlMetier 
 */
function createHtmlPersonnageInListe(nomPersonnage, lvlMetier) {
    return `
    <div style="background-color: #f3f3f3; border-radius: 10px;
                margin-left:3%;width:94%;border:#e3e3e3 solid 1px; 
                color:#51636b; text-indent:2mm" 
                onclick='afficherCommande("` + nomPersonnage + `")'>
        `+ nomPersonnage + ` Lvl ` + lvlMetier + `
    </div>`;
}
/**
 * 
 * @param {String} joueur 
 */
function getListeCommande(joueur) {
    let commandes = "Commandes";
    let dateDemande = "DateDemande";
    let result = {};
    Object.keys(listeMetier)
        .forEach(function (x) {
            if (listeMetier[x][joueur]) {
                Object.keys(listeMetier[x][joueur][commandes])
                    .forEach(function (y) {
                        if (listeMetier[x][joueur][commandes][y][dateDemande]) {
                            result[y] = listeMetier[x][joueur][commandes][y];
                        }
                    });
            }
        });
    return result;
}

/**
 * 
 * @param {String} joueur 
 */
function afficherCommande(joueur) {
    $("#nomJoueurCommande").html(joueur);

    let listeCommande = getListeCommande(joueur);
    let html = "";
    if (typeof (listeCommande) != "string") {
        Object.keys(listeCommande)
            .forEach(x => html += createHtmlLigneCommande(listeCommande[x]));
    }
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

/**
 * 
 * @param {String} listeNomMetier 
 */
function createChoixMetier(listeNomMetier) {
    let html = "";
    listeNomMetier.forEach(x => html += "<option>" + x + "</option>");
    $("#metierSave").html(html);
    $("#metierCommande").html(html);
}

function listerArtisanDisponible() {
    let html = "";
    let metier = $("#metierCommande").val();
    Object.keys(listeMetier[metier])
        .filter(x => x != "null")
        .forEach(x => html += "<option>" + x + "</option>");
    let nomArtisanCommande = $("#nomArtisanCommande");
    nomArtisanCommande.val("");
    nomArtisanCommande.html(html);
}

function addOrUpdateMetier() {
    let nomArtisan = $("#nomArtisanSave").val();
    let metier = $("#metierSave").val();
    let lvlArtisan = $("#lvlArtisanSave").val();
    if (nomArtisan == "" || lvlArtisan == 0) {
        //Si la saisie est incorrecte, on sort de la fonction
        return;
    }
    if (listeMetier[metier][nomArtisan] == undefined) {
        database.ref("/listeMetier/" + metier + "/" + nomArtisan).set({
            Lvl: lvlArtisan,
            Commandes: "vide"
        });
    } else {
        let update = {};
        update["/listeMetier/" + metier + "/" + nomArtisan + "/Lvl"] = lvlArtisan;
        firebase.database().ref().update(update);
    }
}

function addCommande() {
    let demandeur = $("#demandeurCommande").val();
    let metier = $("#metierCommande").val();
    let nomArtisan = $("#nomArtisanCommande").val();
    let item = $("#itemCommande").val();
    let nbItem = $("#nbItemCommande").val();
    if (demandeur == "" || metier == "" || nomArtisan == "" || item == "" || nbItem == 0 || nbItem == undefined) {
        //Si la saisie est incorrecte on sort de la fonction
        return;
    }
    let url = "/listeMetier/" + metier + "/" + nomArtisan + "/Commandes/" + (Math.floor(Math.random() * 10000000));
    console.log(url);
    database.ref(url).set({
        DateDemande: new Date().toISOString().slice(0, 10),
        Demandeur: demandeur,
        Item: item,
        Nombre: nbItem,
        Status: "En cours"
    });
    setTimeout(500, afficherCommande(metier, nomArtisan));
}

//-------------- MAIN ---------------------

let listeMetier = "";
listeNomMetier = ["Forestier", "Herboriste", "Mineur",
    "Paysan", "Pecheur", "Trappeur",
    "Armurier", "Bijoutier", "Boulanger",
    "Cuisinier", "Ebeniste", "Maitre d 'armes",
    "Maroquinier", "Tailleur", "Drop"];

database.ref('/listeMetier').on('value', function (snapshot) {
    listeMetier = snapshot.val();
    affichageMétierCollapse(listeMetier);
});
createChoixMetier(listeNomMetier);


// Exemple pour enregistrer des données 
// Chaque action est irréversible, merci de pas décommenter les lignes suivantes sans raison


// let id = "truc"
// database.ref("/" + id).set({
//     machin: "chose",
//     test: 42
// });


// Exemple de la structure de donnée se trouvant dans la base de donnée
// Chaque élément doit posséder une valeur, sinon elle se voit supprimer
// Les chaînes de caractères "vide" sont là pour permettre à des données d'exister 
// Mais ils ne doivent pas être affichées sur le site

// let listeMetier = {
//     Paysan: {
//         NatWhisp: {
//             Lvl: 130,
//             Commandes: "vide",
//         },
//         Zewynn: {
//             Lvl: 130,
//             Commandes: {
//                 MotRandom1: {
//                     DateDemande: "2020-06-14",
//                     Demandeur: "Alpha",
//                     Item: "Champoule Tout",
//                     Nombre: "12",
//                     Status: "Acceptée"
//                 },
//                 MotRandom2: {
//                     DateDemande: "2020-05-22",
//                     Demandeur: "NorAax",
//                     Item: "Graine de Tournesol",
//                     Nombre: "1000",
//                     Status: "Terminée"
//                 },
//                 MotRandom3: {
//                     DateDemande: "2020-06-14",
//                     Demandeur: "Amateratsu",
//                     Item: "Farine Eternelle",
//                     Nombre: "4",
//                     Status: "En cours"
//                 },
//             },
//         },
//         Clemdu: {
//             Lvl: 98,
//             Commandes: "vide",
//         },
//         NewYoshi: {
//             Lvl: 110,
//             Commandes: "vide",
//         },
//         null:"vide"
//     },
//     Herboriste: {
//         null:"vide"
//     },
//     Boulanger: {
//         null:"vide"
//     },
//     Pecheur: {
//         null:"vide"
//     },
// };