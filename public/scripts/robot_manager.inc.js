function lanceUnePartieDeRobots() {
  $("#game p#tour").text("Robot Vs. Robot");
  resetGame();
  // On choisis une équipe qui commence aléatoirement
  let color = getCouleurEquipeAleatoire();
  // On lance la partie
  RobotVsRobot(color);
}

function RobotVsRobot(Color) {
  // Taille du puissance 4 en horizontale (x)
  // et en verticale (y)
  let tailleHorizontale = game.getPx();
  let tailleVerticale   = game.getPy();

  // Si la partie n'est pas terminé
  if (!robotPlaceUnPion(tailleHorizontale, tailleVerticale, Color))
  {
    // On fais jouer l'équipe adverse
    setTimeout(function () {
      RobotVsRobot(getCouleurEquipeAdverse(Color))
    }, 5)
  }
}

function getCouleurEquipeAleatoire() {
  let listeDeCouleurs = ["yellow", "red"];
  let nombreAleatoire = Math.floor(Math.random() * listeDeCouleurs.length);
  return listeDeCouleurs[nombreAleatoire];
}

function getCouleurEquipeAdverse(couleurEquipeActuelle) {
  if (couleurEquipeActuelle == 'red') {
    return 'yellow';
  } else {
    return 'red';
  }
}

function getLesColonnesNonCompletes() {
  let liste = [];
  for (let i = 1; i <= game.getPx(); i++) {
    let el = $(".row[val=1] .icon[case='" + i + "']").attr("team");
    if (!el) {
      liste.push(i);
    }
  }
  return liste;
}

function getLesCasesPouvantEtreJouer() {
  let listeDesCasesPouvantEtreJouer = [];
  let listeColonnesNonCompletes = getLesColonnesNonCompletes();
  let aTrouverLePion;
  listeColonnesNonCompletes.forEach(numeroColonneHorizontale => {
    numeroColonneVerticale = game.getPy();
    aTrouverLePion = false;
    while (numeroColonneVerticale > 0 && !aTrouverLePion) {
      if (!array2DContainsArray(jeton.get(1), [numeroColonneHorizontale, numeroColonneVerticale])
        && !array2DContainsArray(jeton.get(2), [numeroColonneHorizontale, numeroColonneVerticale])) {
          listeDesCasesPouvantEtreJouer.push([numeroColonneHorizontale, numeroColonneVerticale])
          aTrouverLePion = true;
        }

      numeroColonneVerticale--;
    }
  });
  return listeDesCasesPouvantEtreJouer;
}

function robotPlaceUnPion(tailleHorizontale, tailleVerticale, CouleurPion) {
  // On récupère la liste des colonnes qui n'ont pas leurs
  // colonnes complétés.
  let listeColonnesNonCompletes = getLesColonnesNonCompletes();
  let colonneChoisitAleatoirement = getElementAleatoire(listeColonnesNonCompletes);
  let continueAChercher = true;
  let lesCasesPouvantEtreJouer  = getLesCasesPouvantEtreJouer();

  lesCasesPouvantEtreJouer.forEach(casePouvantEtreJouer => {
    let indiceHorizontale = casePouvantEtreJouer[0];
    let indiceVerticale   = casePouvantEtreJouer[1];
    if (verifIfPionPlacedGiveWin(tailleHorizontale, tailleVerticale, indiceHorizontale, indiceVerticale, CouleurPion)) {
      colonneChoisitAleatoirement = indiceHorizontale;
    }
    else if (verifIfPionPlacedGiveWin(tailleHorizontale, tailleVerticale, indiceHorizontale, indiceVerticale, getCouleurEquipeAdverse(CouleurPion))) {
      colonneChoisitAleatoirement = indiceHorizontale;
    }
  });
    
  if (!lesCasesPouvantEtreJouer || lesCasesPouvantEtreJouer.length === 0) {
    game.setWinner(CouleurPion, null);
    return true;
  } else {
    let boucleActive = true;
    let indiceTailleVerticale = tailleVerticale;
    while (indiceTailleVerticale > 0 && boucleActive) {
      let couleurDuPionPlace = getColorOfPionPlaced(colonneChoisitAleatoirement, indiceTailleVerticale);
      if (!couleurDuPionPlace) {
        boucleActive = false;
        jeton.forceAdd(colonneChoisitAleatoirement, indiceTailleVerticale, CouleurPion)
        //ajouteUnPionDansBdd(colonneChoisitAleatoirement, indiceTailleVerticale, CouleurPion);
        isWinner = verifWin(tailleHorizontale, tailleVerticale, CouleurPion);
        if (isWinner) {
          game.setWinner(CouleurPion, isWinner);
          return true;
        }
      }
      indiceTailleVerticale--;
    }
  }
}
