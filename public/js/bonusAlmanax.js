function dayDiff(d1, d2) {
    d1 = d1.getTime() / 86400000;
    d2 = d2.getTime() / 86400000;
    return parseInt((Number(d2 - d1 + (1 / 24))));
}

function bonusDuJour() {

    let date1 = new Date("1 January 2000");
    let date2 = new Date();

    indiceBonus = (Number(dayDiff(date1, date2)) + 2) % nbBonus;
    afficherBonus();
}

function bonusSuivant() {
    indiceBonus = (indiceBonus + 1) % nbBonus;
    afficherBonus();
}

function bonusPrecedant() {
    indiceBonus = (indiceBonus - 1) % nbBonus;
    if (indiceBonus < 0) {
        indiceBonus = nbBonus - 1;
    }
    afficherBonus();
}

function afficherBonus() {
    listeBonus = ["Sagesse", "Prospection", "Fabrication", "Xp récolte & Xp plantation",
        "Quantité récoltée & Chance plantation"
    ];
    $("#bonus").html(listeBonus[indiceBonus]);
    listeTexteAAfficher = ["+40 Sagesse [2H]", "+40 Prospection [2H]", "+20% (Xp & Vitesse) Fabrication [2H]",
        "+30% Xp (récolte & plantation) [2H]", "+20% (Quantité récoltée & Chance plantation) [2H]"
    ];
    $("#information").html(listeTexteAAfficher[indiceBonus]);
}

function bonusStasis() {

    indiceBonusSource = 0;

    afficherBonusSource();
}

function bonusWakfu() {

    indiceBonusSource = 1;

    afficherBonusSource();
}

function afficherBonusSource() {
    listeConditionSource = ["Condition d'accès : Jauge WS>50% Stasis", "Condition d'accès : Jauge WS>50% Wakfu"];
    $("#conditionSource").html(listeConditionSource[indiceBonusSource]);
    listeBonusSource = ["+10% Xp récolte [30 min]", "+30% Xp plantation [30 min]"];
    $("#bonusSource").html(listeBonusSource[indiceBonusSource]);
}

function dayDiffCalcul(d1, d2) {
    d1 = d1.getTime() / 86400000;
    d2 = d2.getTime() / 86400000;
    return parseInt((Number(d2 - d1)));
}

function getUserDayInput() {
    let monString = document.getElementById("date").value;
    var date = new Date(monString);
    return date;
}

function bonusDuJourCalcul() {

    let date1 = new Date("1 January 2000");
    let date2 = getUserDayInput();

    indiceBonusCalcul = (Number(dayDiffCalcul(date1, date2)) + 2) % nbBonusCalcul;
    afficherBonusCalcul();
}

function afficherBonusCalcul() {
    listeBonusCalcul = ["Sagesse", "Prospection", "Fabrication", "Xp récolte & Xp plantation",
        "Quantité récoltée & Chance plantation"
    ];
    $("#bonusCalcul").html(listeBonus[indiceBonusCalcul]);
    listeTexteAAfficherCalcul = ["+40 Sagesse [2H]", "+40 Prospection [2H]", "+20% (Xp & Vitesse) Fabrication [2H]",
        "+30% Xp (récolte & plantation) [2H]", "+20% (Quantité récoltée & Chance plantation) [2H]"
    ];
    $("#informationCalcul").html(listeTexteAAfficherCalcul[indiceBonusCalcul]);
}

//  ----------------------------- MAIN --------------------------

nbBonus = 5;
indiceBonus = 0;
bonusDuJour();

nbBonusCalcul = 5;
indiceBonusCalcul = 0;
bonusDuJourCalcul();