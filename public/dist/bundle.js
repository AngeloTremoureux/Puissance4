/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Game": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _MonTour__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


class Game {
  constructor(tailleHorizontale, tailleVerticale) {
    this.tailleHorizontaleDuJeu = tailleHorizontale;
    this.tailleVerticaleDuJeu = tailleVerticale;
    this.listePionsRouge = new Array();
    this.listePionsJaune = new Array();
    this.monTour = new _MonTour__WEBPACK_IMPORTED_MODULE_0__.MonTour()
    this.disableGame()
    this.log(
      "Puissance 4",
      "Initialisation du jeu en " + this.tailleHorizontaleDuJeu + "x" + this.tailleVerticaleDuJeu
    );
    Game.game = this;
  }
  static getGame(tailleHorizontale, tailleVerticale) {
    if (Game.game) {
      return Game.game
    } else {
      return new Game(tailleHorizontale, tailleVerticale)
    }
  }
  searchPiece(couleur, initCase) {
    const redCircle = $('#preview #red_circle')
    const yellowCircle = $('#preview #yellow_circle')
    const defaultCircle = $('#preview #basic_circle')
    if (initCase) {
      if (couleur === 'red') {
        $(redCircle).children().children().attr('case', initCase)
        return $(redCircle).html()
      } else if (couleur === 'yellow') {
        $(yellowCircle).children().children().attr('case', initCase)
        return $(yellowCircle).html()
      } else {
        $(defaultCircle).children().children().attr('case', initCase)
        return $(defaultCircle).html()
      }
    } else {
      if (couleur === 'red') {
        return $(redCircle).html()
      } else if (couleur === 'yellow') {
        return $(yellowCircle).html()
      } else {
        return $(defaultCircle).html()
      }
    }
  }
  getColorOfPionPlaced(indexHorizontale, indexVerticale) {
    const listePionsRouge  = this.getPions(1)
    const listePionsJaune  = this.getPions(2)
  
    if (Utils.array2DContainsArray(listePionsRouge, [indexHorizontale, indexVerticale])) {
      return 'red';
    }
    else if (Utils.array2DContainsArray(listePionsJaune, [indexHorizontale, indexVerticale])) {
      return 'yellow';
    }
    else {
      return false;
    }
  }
  clearGame() {
    $('.row').remove()
  }
  resetGame() {
    this.clearGame()
    this.clearPions()
    this.createBackground()
    this.disableGame()
  }
  playGame()  {
    let audio = new Audio('../public/audio/startGame.mp4');
    audio.play();
    audio = null;
    this.resetGame()
    this.setMessage("A toi de jouer !")
    this.enableGame()
  }
  select(indexHorizontale) {
    indexHorizontale = parseInt(indexHorizontale)
    let indexVerticale = this.getTailleVerticale();
    while (indexVerticale > 0) {
      let teamColor = this.getColorOfPionPlaced(indexHorizontale, indexVerticale)
      if (!teamColor) {
        let couleur = $("#game .row").eq((indexVerticale - 1)).find(".icon").eq((indexHorizontale - 1))
        couleur.attr("surbrillance", "red");
        return;
      }
      indexVerticale--;
    }
  }
  getLesColonnesNonCompletes() {
    let listeColonnesNonCompletes = [];
    for (let indexHorizontale = 1; indexHorizontale <= this.tailleHorizontaleDuJeu; indexHorizontale++) {
      if (!this.getColorOfPionPlaced(indexHorizontale, 1)) {
        listeColonnesNonCompletes.push(indexHorizontale);
      }
    }
    return listeColonnesNonCompletes;
  }
  isDraw() {
    return this.listePionsJaune.length + this.listePionsRouge.length >= this.getTailleHorizontale() * this.getTailleVerticale()
  }
  getTailleHorizontale() {
    return parseInt(this.tailleHorizontaleDuJeu);
  }
  getTailleVerticale() {
    return parseInt(this.tailleVerticaleDuJeu);
  }
  getLesCasesPouvantEtreJouer() {
    let listeDesCasesPouvantEtreJouer = [];
    let listeColonnesNonCompletes = this.getLesColonnesNonCompletes();
    let aTrouverLePion;
    listeColonnesNonCompletes.forEach(numeroColonneHorizontale => {
      let numeroColonneVerticale = this.getTailleVerticale();
      aTrouverLePion = false;
      while (numeroColonneVerticale > 0 && !aTrouverLePion) {
        if (!Utils.array2DContainsArray(this.getPions(1), [numeroColonneHorizontale, numeroColonneVerticale])
          && !Utils.array2DContainsArray(this.getPions(2), [numeroColonneHorizontale, numeroColonneVerticale])) {
            listeDesCasesPouvantEtreJouer.push([numeroColonneHorizontale, numeroColonneVerticale])
            aTrouverLePion = true;
          }

        numeroColonneVerticale--;
      }
    });
    return listeDesCasesPouvantEtreJouer;
  }
  export() {
    this.log("Puissance 4", "Affichage de l'export...");
    let params = [];
    params['red']    = this.getPions('red')
    params['yellow'] = this.getPions('yellow')
    const red = params['red'];
    const yellow = params['yellow'];
    const request = $.ajax({
      type: 'POST',
      url: "api/export?x=" + this.tailleHorizontaleDuJeu + "&y=" + this.tailleVerticaleDuJeu,
      data: {red:red, yellow:yellow},
      cache: false,
      timeout: 120000
    })
    request.done(function (output_success) {
      console.log(output_success)
      this.log("Puissance 4", "L'export s'est correctement terminé");
    })
    request.fail(function (http_error) {
      let server_msg = http_error.responseText;
      let code = http_error.status;
      let code_label = http_error.statusText;
      this.log("Puissance 4", "Echec lors de l'export ("+code+")");
    });
  }
  unSelect() {
    $(".row .icon").attr("surbrillance", "");
  }
  setMessage(message) {
    $("#game p#tour").text(message);
  }
  import (gameObject, parameters) {
    this.log("Puissance 4", "Début de l'import ...");
    this.log("Puissance 4", "Initialisation des paramètres ...");
    this.tailleHorizontaleDuJeu = gameObject.parametres.x
    this.tailleVerticaleDuJeu = gameObject.parametres.y
    this.resetGame()
    this.log("Puissance 4", "Import des pions ...");
    gameObject.datas.pions.red.forEach(pionRouge => {
      this.forceAddPion(pionRouge[0], pionRouge[1], 'red')
    });
    gameObject.datas.pions.yellow.forEach(pionYellow => {
      this.forceAddPion(pionYellow[0], pionYellow[1], 'yellow')
    });
    if (parameters) {
      this.log("Puissance 4", "Vérification d'un potentiel gagnant ...");
      let gagnantRouge = WinnerManager.verifWin(this, "red");
      let gagnantJaune = WinnerManager.verifWin(this, "yellow");
      if (gagnantRouge) {
        this.setWinner(gagnantRouge);
        this.setMessage("Tu as gagné !");
        this.log("Puissance 4", "Gagné ! Bien joué");
        this.unSelect();
      } else if (gagnantJaune) {
        this.setWinner(gagnantJaune);
        this.setMessage("Tu as perdu la partie !");
        this.log("Puissance 4", "Perdu ! :(");
        this.monTour.set(false);
        this.unSelect();
      }
    }
    this.log("Puissance 4", "Fin de l'import");
  }
  setWinner(couleur, pionsGagnants) {
    this.disableGame()
    if (pionsGagnants) {       
      for (let i = 0; i < pionsGagnants.length; i++) {
        let indexVerticale = pionsGagnants[i][0]
        let indexHorizontale   = pionsGagnants[i][1]
        let couleur = $("#game .row").eq((indexVerticale - 1)).find(".icon").eq((indexHorizontale - 1))
        $(couleur).css("opacity", 1)
      }
    }
    if (couleur == 'red') {
      this.setMessage("Les rouges ont gagnés");
    } else if (couleur == 'yellow') {
      this.setMessage("Les jaunes ont gagnés");
    } else {
      this.setMessage("Match nul !");
    }
  }
  log (prefix, message, colorText) {
    if (!colorText) {
      colorText = "false"
    }
    console.log(
      "%c[" + prefix + "] %c" + message,
      "color: purple; font-size: 13px; font-weight: bold;",
      "font-size: 13px; color: " + colorText
    );
  }
  disableGame() {
    $("#game .icon").css("opacity", 0.3)
    this.monTour.set(false)
  }
  enableGame() {
    $("#game .icon").css("opacity", 1)
    this.monTour.set(true)
  }
  createBackground() {
    console.log($('.row').remove())
    let Px = this.tailleHorizontaleDuJeu;
    let Py = this.tailleVerticaleDuJeu;
    for (let i = 1; i <= this.tailleVerticaleDuJeu; i++) {
      let rowY = '<div class="row" val="' + i + '"></div>';
      $("#game").append(rowY);
      for (let j = 1; j <= this.tailleHorizontaleDuJeu; j++) {
        console.log("ok")
        $('.row[val="' + i + '"]').append(this.searchPiece(null, j));
      }
    }
    console.log($('.row').remove())
  }
  forceAddPion(positionHorizontale, positionVerticale, couleur) {
    $(".row[val='" + positionVerticale + "'] .icon[case='" + positionHorizontale + "']").replaceWith(this.searchPiece(couleur, positionHorizontale));
    $(".row[val='" + positionVerticale + "'] .icon[case='" + positionHorizontale + "']").attr("team",couleur);
    if (couleur == 'yellow') {
      this.setPion(2, [positionHorizontale, positionVerticale]);
    } else {
      this.setPion(1, [positionHorizontale, positionVerticale]);
    }
  }
  getPositionHorizontale(event) {
    return $(event).parent().index() + 1;
  }
  addPion(indexHorizontaleClicked) {
    const tailleVerticale = this.getTailleVerticale()
    const tailleHorizontale = this.getTailleHorizontale()
    let placeIsNotTaken = true;
    let indexVerticale = tailleVerticale;
    if (this.monTour.get()) {
      while (indexVerticale > 0 && placeIsNotTaken) {
        let couleurDuPion = this.getColorOfPionPlaced(indexHorizontaleClicked, indexVerticale);
        if (!couleurDuPion) {
          placeIsNotTaken = false;
          this.monTour.set(false);
          this.unSelect();
          this.forceAddPion(indexHorizontaleClicked, indexVerticale, "red")
          
          let lesPionsGagnants = WinnerManager.verifWin(this, "red");
          if (lesPionsGagnants) {
            this.setWinner('red', lesPionsGagnants);
          } else if (this.isDraw()) {
            this.setWinner(null, null)
          } else {
            this.select(indexHorizontaleClicked);
            this.setMessage("Au tour de l'adversaire!");
            const game = this;
            setTimeout(function () {
              const audio = new Audio('../../public/audio/pop.mp4');
              audio.play();
              const robotManager = RobotManager.getRobotManager(game)
              if (robotManager.robotPlaceUnPion("yellow")) {
                game.setMessage("Tu as perdu la partie !");
                game.log("Puissance 4", "Perdu !");
                game.monTour.set(false);
                game.unSelect();
              } else {
                if (game.getColorOfPionPlaced(indexHorizontaleClicked, indexVerticale+1)) {
                  // Si le robot a joué sur la même colonne, on actualise la sélection
                  game.select(indexHorizontaleClicked);
                }
                game.monTour.set(true);
                game.setMessage("A ton tour !");
              }
            }, 50);
          }
        }
        indexVerticale--;
      }
      this.log(
        "Puissance 4",
        "Jeton en X:" + indexHorizontaleClicked + " Y:" + (indexVerticale + 1)
      );
    }
  }
  setPion(team, value) {
    if (team == 1 || team == 'red') {
      this.listePionsRouge.push(value);
    } else if (team == 2 || team == 'yellow') {
      this.listePionsJaune.push(value);
    } else {
      throw new Error("Le joueur est introuvable");
    }
  }
  removePion (team, value) {
    let index;
    if (team == 1 || team == 'red') {
      index = Utils.getIndexOf2DArray(this.listePionsRouge, value)
      this.listePionsRouge.splice(index, 1)
    } else if (team == 2 || team == 'yellow') {
      index = Utils.getIndexOf2DArray(this.listePionsJaune, value)
      this.listePionsJaune.splice(index, 1)
    } else {
      throw "Le joueur est introuvable";
    }
  }
  clearPions () {
    this.listePionsRouge = [];
    this.listePionsJaune = [];
    this.log("Puissance 4", "Les données des pions ont été effacés");
  }
  getPions (team) {
    if (team == 1 || team == 'red') {
      return this.listePionsRouge;
    } else if (team == 2 || team == 'yellow') {
      return this.listePionsJaune;
    } else {
      throw "Le joueur est introuvable";
    }
  }
}

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MonTour": () => (/* binding */ MonTour)
/* harmony export */ });
class MonTour {
  set(monTour) {
    this.monTour = monTour
  }
  get() {
    return this.monTour
  }
}

/***/ }),
/* 3 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./CheckIfWinner.js": 4,
	"./Game.js": 1,
	"./Jeton.js": 5,
	"./MonTour.js": 2,
	"./RobotManager.js": 6,
	"./TestsUnits.js": 7,
	"./Utils.js": 8,
	"./WinnerManager.js": 9,
	"./game_manager.inc.js": 10,
	"./main.inc.js": 11
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 3;

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CheckIfWinner": () => (/* binding */ CheckIfWinner)
/* harmony export */ });
class CheckIfWinner {
  static horizontal(game, couleurAVerifier) {
    const tailleVerticale   = game.getTailleVerticale()
    const tailleHorizontale = game.getTailleHorizontale()
    // Vérification en horizontal
    let listeDesPionsGagnants = [];
    let couleurDuPion;
    let nbPionsGagnants;
    for (let indexVerticale = 1; indexVerticale <= tailleVerticale; indexVerticale++) {
      nbPionsGagnants = 0;
      listeDesPionsGagnants = [];
      for (let indexHorizontale = 1; indexHorizontale <= tailleHorizontale; indexHorizontale++) {
        couleurDuPion = game.getColorOfPionPlaced(indexHorizontale, indexVerticale)
        if (couleurDuPion == couleurAVerifier) {
          nbPionsGagnants++;
          listeDesPionsGagnants.push([indexVerticale, indexHorizontale]);
          if (nbPionsGagnants >= 4) {
            return listeDesPionsGagnants;
          }
        } else {
          listeDesPionsGagnants = [];
          nbPionsGagnants = 0;
        }
      }
      if (nbPionsGagnants >= 4) {
        return listeDesPionsGagnants;
      }
    }
    return false;
  }
  static vertical (game, couleurAVerifier) {
    const tailleVerticale   = game.getTailleVerticale()
    const tailleHorizontale = game.getTailleHorizontale()
    // Parcours de chaque case horizontale du jeu
    let listeDesPionsGagnants = [];
    let couleurDuPion;
    let nbPionsGagnants;
    for (let indexHorizontale = 1; indexHorizontale <= tailleHorizontale; indexHorizontale++) {
      nbPionsGagnants = 0;
      listeDesPionsGagnants = [];
      // Parcours chaque case verticale de la colonne
      for (let indexVerticale = 1; indexVerticale <= tailleVerticale; indexVerticale++) {
        couleurDuPion = game.getColorOfPionPlaced(indexHorizontale, indexVerticale)
        if (couleurDuPion == couleurAVerifier) {
          listeDesPionsGagnants.push([indexVerticale, indexHorizontale]);
          nbPionsGagnants++;
          if (nbPionsGagnants >= 4) {
            return listeDesPionsGagnants;
          }
        } else {
          listeDesPionsGagnants = [];
          nbPionsGagnants = 0;
        }
      }
      if (nbPionsGagnants >= 4) {
        return listeDesPionsGagnants;
      }
    }
    return false;
  }

  static diagonalTopLeft (game, couleurAVerifier) {
    const tailleVerticale   = game.getTailleVerticale()
    const tailleHorizontale = game.getTailleHorizontale()

    let couleurDuPion, nbPionsGagnants;
    let indexCourantHorizontale;
    let listeDesPionsGagnants = [];
    let indexCourantVerticale = 4;

    // Parcours toutes les diagonales à gauches à partir de 4.
    for (let indexVerticale = 4; indexVerticale <= tailleVerticale; indexVerticale++) {
      nbPionsGagnants = 0;
      listeDesPionsGagnants = [];
      indexCourantHorizontale = 1;
      
      // Vérifier la ligne en diagonale
      while (indexCourantHorizontale <= tailleHorizontale && indexCourantVerticale >= 1) {
        couleurDuPion = game.getColorOfPionPlaced(indexCourantHorizontale, indexCourantVerticale)
        if (couleurDuPion == couleurAVerifier) {
          listeDesPionsGagnants.push([indexCourantVerticale, indexCourantHorizontale]);
          nbPionsGagnants++;
          if (nbPionsGagnants >= 4) {
            return listeDesPionsGagnants;
          }
        } else {
          nbPionsGagnants = 0;
          listeDesPionsGagnants = [];
        }
        indexCourantVerticale--;
        indexCourantHorizontale++;
      }
      indexCourantVerticale = indexVerticale + 1;
    }

    listeDesPionsGagnants = [];

    for (let indexHorizontale = 2; indexHorizontale <= (tailleHorizontale-4); indexHorizontale++) {
      nbPionsGagnants = 0;
      listeDesPionsGagnants = [];
      indexCourantHorizontale = indexHorizontale;
      indexCourantVerticale = tailleVerticale;
      // Vérifier la ligne en diagonale
      while (indexCourantHorizontale <= tailleHorizontale && indexCourantVerticale >= 1) {
        couleurDuPion = game.getColorOfPionPlaced(indexCourantHorizontale, indexCourantVerticale)
        if (couleurDuPion == couleurAVerifier) {
          listeDesPionsGagnants.push([indexCourantVerticale, indexCourantHorizontale]);
          nbPionsGagnants++;
          if (nbPionsGagnants >= 4) {
            return listeDesPionsGagnants;
          }
        } else {
          nbPionsGagnants = 0;
          listeDesPionsGagnants = [];
        }
        indexCourantVerticale--;
        indexCourantHorizontale++;
      }
      
    }
    return false;
  }

  static diagonalTopRight(game, couleurAVerifier) {
    const tailleVerticale   = game.getTailleVerticale()
    const tailleHorizontale = game.getTailleHorizontale()

    let couleurDuPion, nbPionsGagnants;
    let indexCourantHorizontale;
    let listeDesPionsGagnants = [];

    // Parcours toutes les diagonales à gauches à partir de 4.
    for (let indexVerticale = 4; indexVerticale <= tailleVerticale; indexVerticale++) {
      nbPionsGagnants = 0;
      listeDesPionsGagnants = [];
      indexCourantHorizontale = tailleHorizontale;
      let indexCourantVerticale = indexVerticale;
      // Vérifier la ligne en diagonale
      while (indexCourantHorizontale >= 1 && indexCourantVerticale >= 1) {
        couleurDuPion = game.getColorOfPionPlaced(indexCourantHorizontale, indexCourantVerticale)
        if (couleurDuPion == couleurAVerifier) {
          listeDesPionsGagnants.push([indexCourantVerticale, indexCourantHorizontale]);
          nbPionsGagnants++;
          if (nbPionsGagnants >= 4) {
            return listeDesPionsGagnants;
          }
        } else {
          nbPionsGagnants = 0;
          listeDesPionsGagnants = [];
        }
        indexCourantHorizontale--;
        indexCourantVerticale--;
      }
      
    }

    listeDesPionsGagnants = [];
    for (let indexHorizontale = (tailleHorizontale - 1); indexHorizontale >= 4; indexHorizontale--) {
      nbPionsGagnants = 0;
      listeDesPionsGagnants = [];
      indexCourantHorizontale = indexHorizontale;
      let indexCourantVerticale = tailleVerticale;
      // Vérifier la ligne en diagonale
      while (indexCourantHorizontale >= 1 && indexCourantVerticale >= 1) {
        couleurDuPion = game.getColorOfPionPlaced(indexCourantHorizontale, indexCourantVerticale)
        if (couleurDuPion == couleurAVerifier) {
          listeDesPionsGagnants.push([indexCourantVerticale, indexCourantHorizontale]);
          nbPionsGagnants++;
          if (nbPionsGagnants >= 4) {
            return listeDesPionsGagnants;
          }
        } else {
          nbPionsGagnants = 0;
          listeDesPionsGagnants = [];
        }
        indexCourantVerticale--;
        indexCourantHorizontale--;
      }
    }
    return false;
  }
}

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Jeton": () => (/* binding */ Jeton)
/* harmony export */ });
class Jeton {
  constructor(positionHorizontale, positionVerticale) {
    this.positionHorizontale = positionHorizontale;
    this.positionVerticale   = positionVerticale;
  }
}

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RobotManager": () => (/* binding */ RobotManager)
/* harmony export */ });
class RobotManager {
  constructor(game) {
    if (game) {
      this.tailleHorizontaleDuJeu = game.getTailleHorizontale();
      this.tailleVerticaleDuJeu   = game.getTailleVerticale();
      this.game = game
      RobotManager.robotManager = this
    } else {
      throw new Error("Aucune partie définit")
    }
    
  }

  static getRobotManager(game) {
    if (RobotManager.robotManager) {
      return RobotManager.robotManager
    } else {
      return new RobotManager(game)
    }
  }

  lanceUnePartieDeRobots() {
    this.game.setMessage("Robot Vs. Robot");
    this.game.resetGame()
    this.game.enableGame()
    this.game.monTour.set(false)
    // On choisis une équipe qui commence aléatoirement
    const color = Utils.getCouleurEquipeAleatoire();
    // On lance la partie
    this.robotVsRobot(color);
  }

  robotVsRobot(color) {
    // Si la partie n'est pas terminé
    const that = this;
    if (!this.robotPlaceUnPion(color))
    {
      // On fais jouer l'équipe adverse
      setTimeout(function () {
        that.robotVsRobot(Utils.getCouleurEquipeAdverse(color))
      }, 5)
    }
  }

  robotPlaceUnPion(color) {
    const game = this.game;
    // On récupère la liste des colonnes qui n'ont pas leurs
    // colonnes complétés.
    const listeColonnesNonCompletes = game.getLesColonnesNonCompletes();
    let colonneChoisitAleatoirement = Utils.getElementAleatoire(listeColonnesNonCompletes);
    const lesCasesPouvantEtreJouer  = game.getLesCasesPouvantEtreJouer();
    lesCasesPouvantEtreJouer.forEach(casePouvantEtreJouer => {
      let indiceHorizontale = casePouvantEtreJouer[0];
      let indiceVerticale   = casePouvantEtreJouer[1];
      if (WinnerManager.verifIfPionPlacedGiveWin(game, indiceHorizontale, indiceVerticale, color)) {
        colonneChoisitAleatoirement = indiceHorizontale;
      }
      else if (WinnerManager.verifIfPionPlacedGiveWin(game, indiceHorizontale, indiceVerticale, Utils.getCouleurEquipeAdverse(color))) {
        colonneChoisitAleatoirement = indiceHorizontale;
      }
    });
      
    if (!lesCasesPouvantEtreJouer || lesCasesPouvantEtreJouer.length === 0) {
      this.game.setWinner(null, null);
      return true;
    } else {
      let boucleActive = true;
      let indiceTailleVerticale = this.tailleVerticaleDuJeu;
      while (indiceTailleVerticale > 0 && boucleActive) {
        let couleurDuPionPlace = this.game.getColorOfPionPlaced(colonneChoisitAleatoirement, indiceTailleVerticale);
        if (!couleurDuPionPlace) {
          boucleActive = false;
          this.game.forceAddPion(colonneChoisitAleatoirement, indiceTailleVerticale, color)
          //ajouteUnPionDansBdd(colonneChoisitAleatoirement, indiceTailleVerticale, color);
          const isWinner = WinnerManager.verifWin(this.game, color);
          if (isWinner) {
            this.game.setWinner(color, isWinner);
            return true;
          }
        }
        indiceTailleVerticale--;
      }
    }
  }

}

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TestsUnits": () => (/* binding */ TestsUnits)
/* harmony export */ });
class TestsUnits {
  constructor(game) {
    if (game) {
      this.game = game
    } else {
      throw new Error("Aucune partie fournit")
    }
  }
  launchTestsUnits () {
    this.defaultTailleHorizontale = this.game.getTailleHorizontale()
    this.defaultTailleVerticale   = this.game.getTailleVerticale()

    const listsTestsUnits = []
    listsTestsUnits.push(this.testUnit1())
    listsTestsUnits.push(this.testUnit2())
    listsTestsUnits.push(this.testUnit3())
    listsTestsUnits.push(this.testUnit4())
    listsTestsUnits.push(this.testUnit5())
    listsTestsUnits.push(this.testUnit6())
    listsTestsUnits.push(this.testUnit7())
    listsTestsUnits.push(this.testUnit8())
    listsTestsUnits.push(this.testUnit9())
    listsTestsUnits.push(this.testUnit10())
    listsTestsUnits.push(this.testUnit11())

    for (let index = 0; index < listsTestsUnits.length; index++) {
      let color;
      if (listsTestsUnits[index]) {
        color = "green";
      }  else {
        color = "red";
      }
      let message = "Test " + (index + 1) + " : " + listsTestsUnits[index] + "\n";
      this.game.log("Test", message, color);
      
      
    }
    this.resetTests();
    

  }
  resetTests() {
    this.game.tailleHorizontaleDuJeu = this.defaultTailleHorizontale;
    this.game.tailleVerticaleDuJeu   = this.defaultTailleVerticale;
    game.resetGame()
  }
  testUnit1() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"7","y":"5"},"datas":{"pions":{"red":[[4,5],[3,5],[2,5],[6,4],[3,4],[4,4],[7,4],[3,3],[4,3],[7,3],[1,4],[1,2],[1,1],[2,1],[7,2],[5,2]],"yellow":[[1,5],[6,5],[5,5],[7,5],[2,4],[5,4],[2,3],[3,2],[4,2],[4,1],[1,3],[6,3],[2,2],[7,1],[5,3]]}}}
    game.import(gameExport)
    
    let valeurAttendu = [[5,2],[4,3],[3,4],[2,5]]
    return (!WinnerManager.verifWin(this.game,'yellow') && JSON.stringify(WinnerManager.verifWin(this.game,'red')) === JSON.stringify(valeurAttendu))
  }
  testUnit2() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"7","y":"5"},"datas":{"pions":{"red":[[1,5],[3,5],[2,5],[2,3],[5,5],[7,4],[2,1],[5,4]],"yellow":[[7,5],[4,5],[2,4],[6,5],[3,4],[2,2],[4,4],[1,4]]}}}
    game.import(gameExport)
    
    let valeurAttendu = [[4,1],[4,2],[4,3],[4,4]]
    return (!WinnerManager.verifWin(this.game,'red') && JSON.stringify(WinnerManager.verifWin(this.game,'yellow')) === JSON.stringify(valeurAttendu))
  }
  testUnit3() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"7","y":"5"},"datas":{"pions":{"red":[[3,5],[7,5],[1,5],[7,4],[5,4],[4,2],[2,5],[1,4],[2,3],[7,2],[2,2],[3,3],[1,3],[6,4]],"yellow":[[4,5],[5,5],[3,4],[4,4],[4,3],[7,3],[4,1],[2,4],[6,5],[7,1],[5,3],[5,2],[2,1],[1,2],[6,3]]}}}
    game.import(gameExport)
    
    let valeurAttendu = [[3,4],[3,5],[3,6],[3,7]]
    return (!WinnerManager.verifWin(this.game,'red') && JSON.stringify(WinnerManager.verifWin(this.game,'yellow')) === JSON.stringify(valeurAttendu))
  }
  testUnit4() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"7","y":"5"},"datas":{"pions":{"red":[[5,5],[5,4],[3,5],[4,5],[1,5],[1,4],[4,3],[6,2],[4,2],[2,3],[5,2],[7,3],[5,1],[7,1],[2,2],[2,1],[3,4],[3,3]],"yellow":[[7,5],[6,5],[6,4],[2,5],[4,4],[7,4],[6,3],[5,3],[2,4],[4,1],[6,1],[1,3],[7,2],[1,2],[1,1],[3,2],[3,1]]}}}
    game.import(gameExport)
    
    return (!WinnerManager.verifWin(this.game,'red') && !WinnerManager.verifWin(this.game,'yellow'))
  }
  testUnit5() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"7","y":"5"},"datas":{"pions":{"red":[[3,5],[4,5],[1,5],[7,5],[7,4],[6,2],[5,5],[5,4],[5,2],[2,2],[1,4],[4,3],[7,3],[4,2],[3,1],[7,1],[1,2],[1,1]],"yellow":[[6,5],[6,4],[2,5],[2,4],[6,3],[3,4],[6,1],[5,3],[2,3],[4,4],[1,3],[3,3],[7,2],[3,2],[4,1],[2,1],[5,1]]}}}
    game.import(gameExport)
    
    return (!WinnerManager.verifWin(this.game,'red') && !WinnerManager.verifWin(this.game,'yellow'))
  }
  testUnit6() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"7","y":"5"},"datas":{"pions":{"red":[[3,5],[7,4],[4,5],[5,4],[4,4],[1,4],[3,4],[4,3],[3,3],[5,2],[6,4]],"yellow":[[7,5],[5,5],[7,3],[2,5],[1,5],[7,2],[5,3],[2,4],[4,2],[3,2],[6,5]]}}}
    game.import(gameExport)
    
    let valeurAttendu = [[4,3],[4,4],[4,5],[4,6]]
    return (!WinnerManager.verifWin(this.game,'yellow') && JSON.stringify(WinnerManager.verifWin(this.game,'red')) === JSON.stringify(valeurAttendu))
  }
  testUnit7() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"7","y":"10"},"datas":{"pions":{"red":[[6,10],[2,10],[7,9],[1,10],[5,10],[3,9],[6,8],[6,6],[6,5],[7,7],[5,8],[3,7],[3,6],[4,8],[6,3],[4,7],[1,8],[4,5],[2,6],[2,4],[3,4],[3,3],[1,7]],"yellow":[[7,10],[3,10],[6,9],[2,9],[4,10],[1,9],[7,8],[6,7],[4,9],[2,8],[5,9],[3,8],[7,6],[5,7],[6,4],[5,6],[3,5],[4,6],[2,7],[2,5],[4,4],[6,2],[7,5],[1,6]]}}}
    game.import(gameExport)
    
    let valeurAttendu = [[9,4],[8,3],[7,2],[6,1]]
    return (!WinnerManager.verifWin(this.game,'red') && JSON.stringify(WinnerManager.verifWin(this.game,'yellow')) === JSON.stringify(valeurAttendu))
  }
  testUnit8() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"11","y":"6"},"datas":{"pions":{"red":[[1,6],[5,6],[7,6],[2,5],[11,6],[9,6],[9,5],[8,3],[3,4],[4,6],[9,4]],"yellow":[[8,6],[8,5],[2,6],[6,6],[3,6],[3,5],[8,4],[1,5],[2,4],[7,5],[9,3]]}}}
    game.import(gameExport)
    
    let valeurAttendu = [[6,6],[5,7],[4,8],[3,9]]
    return (!WinnerManager.verifWin(this.game,'red') && JSON.stringify(WinnerManager.verifWin(this.game,'yellow')) === JSON.stringify(valeurAttendu))
  }
  testUnit9() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"4","y":"4"},"datas":{"pions":{"red":[[4,4],[2,4],[4,2],[2,3],[4,1],[2,1],[1,2],[3,1]],"yellow":[[1,4],[4,3],[3,4],[3,3],[2,2],[1,3],[3,2],[1,1]]}}}
    game.import(gameExport)
    
    return (!WinnerManager.verifWin(this.game,'red') && !WinnerManager.verifWin(this.game,'yellow'))
  }
  testUnit10() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"4","y":"4"},"datas":{"pions":{"red":[[2,4],[3,4],[2,2],[2,1],[1,3],[4,2]],"yellow":[[4,4],[4,3],[2,3],[1,4],[3,3],[3,2],[4,1]]}}}
    game.import(gameExport)
    
    let valeurAttendu = [[4,1],[3,2],[2,3],[1,4]]
    return (!WinnerManager.verifWin(this.game,'red') && JSON.stringify(WinnerManager.verifWin(this.game,'yellow')) === JSON.stringify(valeurAttendu))
  }
  testUnit11() {
    game.resetGame()
    let gameExport = {"parametres":{"x":"8","y":"7"},"datas":{"pions":{"red":[[1,7],[6,7],[4,6],[8,6],[3,6],[7,7],[7,6],[7,5],[5,7],[2,7],[5,6],[5,5],[5,3],[7,3],[6,5]],"yellow":[[8,7],[3,7],[4,7],[4,5],[4,4],[1,6],[8,5],[8,4],[7,4],[3,5],[6,6],[2,6],[5,4],[3,4],[7,2],[6,4]]}}}
    game.import(gameExport)
    
    let valeurAttendu = [[4,3],[4,4],[4,5],[4,6]]
    return (!WinnerManager.verifWin(this.game,'red') && JSON.stringify(WinnerManager.verifWin(this.game,'yellow')) === JSON.stringify(valeurAttendu))
  }
}

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Utils": () => (/* binding */ Utils)
/* harmony export */ });
class Utils {
  static getEntierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  static getElementAleatoire(liste) {
    let longueurListe = liste.length;
    let entierAleatoireIndexeParListe = Utils.getEntierAleatoire(0, longueurListe);
    return liste[entierAleatoireIndexeParListe];
  }
  
  static array2DContainsArray(array2D, arraySearch) {
    let itemString = JSON.stringify(arraySearch);
    let contains = array2D.some(function(element) {
      return JSON.stringify(element) === itemString;
    });
    return contains;
  }
  
  static getIndexOf2DArray(array2D, index) {
    for (var i = 0; i < array2D.length; i++) {
      var currentArray = array2D[i];
      if (currentArray[0] == index[0] && currentArray[1] == index[1]) {
        return i;
      }
    }
  }

  static getCouleurEquipeAleatoire() {
    let listeDeCouleurs = ["yellow", "red"];
    let nombreAleatoire = Math.floor(Math.random() * listeDeCouleurs.length);
    return listeDeCouleurs[nombreAleatoire];
  }

  static getCouleurEquipeAdverse(couleurEquipeActuelle) {
    if (couleurEquipeActuelle == 'red') {
      return 'yellow';
    } else {
      return 'red';
    }
  }
}


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WinnerManager": () => (/* binding */ WinnerManager)
/* harmony export */ });
class WinnerManager {
  static verifWin(game, color) {
    let verification = CheckIfWinner.horizontal(game, color);
    if (verification) {
      return verification;
    }
    verification = CheckIfWinner.vertical(game, color);
    if (verification) {
      return verification;
    }
    verification = CheckIfWinner.diagonalTopLeft(game, color);
    if (verification) {
      return verification;
    }
    verification = CheckIfWinner.diagonalTopRight(game, color);
    if (verification) {
      return verification;
    } else {
      return false;
    }
  }

  static verifIfPionPlacedGiveWin(game, numeroColonneHorizontale, numeroColonneVerticale, couleurPion) {
    game.setPion(couleurPion, [numeroColonneHorizontale, numeroColonneVerticale])
    const isWinner = WinnerManager.verifWin(game, couleurPion)
    game.removePion(couleurPion, [numeroColonneHorizontale, numeroColonneVerticale])
    return isWinner;
  }

}

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ajouteUnPionDansBdd": () => (/* binding */ ajouteUnPionDansBdd),
/* harmony export */   "testsUnits": () => (/* binding */ testsUnits),
/* harmony export */   "playGame": () => (/* binding */ playGame),
/* harmony export */   "lanceUnePartieDeRobots": () => (/* binding */ lanceUnePartieDeRobots),
/* harmony export */   "openParam": () => (/* binding */ openParam),
/* harmony export */   "loadParam": () => (/* binding */ loadParam)
/* harmony export */ });
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


function ajouteUnPionDansBdd(px, py, color) {
  let gameId = 4;
  $.post("/api/pions/setList/", {
      id: gameId,
      Px:px,
      Py:py,
      Color:color
    })
    .done(function( data ) {
  });
}

function testsUnits() {
  lanceTestsUnits = new TestsUnits(game);
  lanceTestsUnits.launchTestsUnits()
}

function playGame (game) {
  console.log(game)
  game.playGame()
}

function lanceUnePartieDeRobots() {
  const robotManager = RobotManager.getRobotManager(game)
  robotManager.lanceUnePartieDeRobots()
}

function openParam () {
  $('#dialog').removeClass('d-none')
  $("#dialog").dialog({
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    buttons: {
      "Valider": function() {
        $ ( "#parametersValues" ).submit()
        $( this ).dialog( "close" )
      },
      "Fermer": function() {
        $( this ).dialog( "close" )
      }
    }
  })
}

function loadParam () {
  window.location.replace(
    '?x=' + $('#nbCaseX').val() + '&y=' + $('#nbCaseY').val()
  )
}


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


jQuery(document).ready(function ($) {
  const game = _Game__WEBPACK_IMPORTED_MODULE_0__.Game.getGame()
    $("html").on("keydown", "body", function (e) {
      if (game.monTour.get()) {
        const key = event.keyCode;
        if ($("#game .row .icon[surbrillance='red']").length >= 1 && !game.isDraw()) {
          const pionEnSurbrillance = $("#game .row .icon[surbrillance='red']");
          let indexHorizontaleDuPion = parseInt(pionEnSurbrillance.attr("case"));
          if (indexHorizontaleDuPion) {
            $("#game .row .icon").mouseout();
            if (key == 39) {
              // flèche droite : simulation à droite
              indexHorizontaleDuPion++;
              if (indexHorizontaleDuPion >= game.getTailleHorizontale() + 1) {
                indexHorizontaleDuPion = 1;
              }
              while (!game.getLesColonnesNonCompletes().includes(indexHorizontaleDuPion) && !game.isDraw() && indexHorizontaleDuPion <= game.getTailleHorizontale()) {
                indexHorizontaleDuPion++;
                if (indexHorizontaleDuPion >= game.getTailleHorizontale() + 1) {
                  indexHorizontaleDuPion = 1;
                }
              }
              
              $("#game .row[val='1'] .icon[case='" + indexHorizontaleDuPion + "']").mouseover();
            } else if (key == 37) {
              // flèche gauche : simulation à gauche
              indexHorizontaleDuPion--;
              if (indexHorizontaleDuPion <= 0) {
                indexHorizontaleDuPion = game.getTailleHorizontale();
              }
              console.log(indexHorizontaleDuPion)
              while (!game.getLesColonnesNonCompletes().includes(indexHorizontaleDuPion) && !game.isDraw() && indexHorizontaleDuPion >= 0) {
                indexHorizontaleDuPion--;
                if (indexHorizontaleDuPion <= 0) {
                  indexHorizontaleDuPion = game.getTailleHorizontale();
                }
              }
              console.log(indexHorizontaleDuPion)
              $( "#game .row[val='1'] .icon[case='" + indexHorizontaleDuPion + "']").mouseover();
            } else if (key == 13 || key == 38) {
              // touche entré ou flèche haut : simulation d'un click
              $(pionEnSurbrillance).click();
              if (!game.getLesColonnesNonCompletes().includes(indexHorizontaleDuPion)) {
                indexHorizontaleDuPion++
                if (indexHorizontaleDuPion >= game.getTailleHorizontale() + 1) {
                  indexHorizontaleDuPion = 1;
                }
                while (!game.getLesColonnesNonCompletes().includes(indexHorizontaleDuPion) && !game.isDraw() && indexHorizontaleDuPion <= game.getTailleHorizontale()) {
                  indexHorizontaleDuPion++;
                }
                $("#game .row[val='1'] .icon[case='" + indexHorizontaleDuPion + "']").mouseover();
              }
            }
          }
        } else {
          $("#game .row .icon").mouseout();
          indexHorizontaleDuPion = 1;
          while (!game.getLesColonnesNonCompletes().includes(indexHorizontaleDuPion) && !game.isDraw() && indexHorizontaleDuPion <= game.getTailleHorizontale()) {
            indexHorizontaleDuPion++;
          }
          $("#game .row[val='1'] .icon[case='" + indexHorizontaleDuPion + "']").mouseover();
        }
      }
    });
    $("#box").on('click', '#game .icon', function() {
      if (game.monTour.get()) {
        const positionHorizontale = game.getPositionHorizontale($(this))
        game.addPion(positionHorizontale);
        game.select(positionHorizontale);
      }
    })
    $("#box").on('mouseover', '#game .icon', function() {
      if (game.monTour.get()) {
        game.select(game.getPositionHorizontale($(this)));
      }
    })
    $("#box").on('mouseout', '#game .icon', function() {
      if (game.monTour.get()) {
        game.unSelect();
      }
    })
  });

/***/ }),
/* 12 */
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 12;
module.exports = webpackEmptyContext;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


$(document).ready(function() {
    console.log(getGame(_modules_Game__WEBPACK_IMPORTED_MODULE_0__.Game))
})


function requireAll(r) { r.keys().forEach(r); }
requireAll(__webpack_require__(3));
requireAll(__webpack_require__(12));
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7O0FDTnFDO0FBQ3JDO0FBQ0E7QUFDQSx3QkFBd0IsK0NBQUk7QUFDNUIsQ0FBQztBQUNEO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIsV0FBVyxzQkFBNEM7QUFDdkQsV0FBVyx1QkFBNEMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9HYW1lLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9Nb25Ub3VyLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlc3xzeW5jfC8uanMkIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9DaGVja0lmV2lubmVyLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9KZXRvbi5qcyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvUm9ib3RNYW5hZ2VyLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9UZXN0c1VuaXRzLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9VdGlscy5qcyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvV2lubmVyTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvZ2FtZV9tYW5hZ2VyLmluYy5qcyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvbWFpbi5pbmMuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzfHN5bmN8Ly50cyQiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbG9hZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb25Ub3VyIH0gZnJvbSBcIi4vTW9uVG91clwiXHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZSB7XHJcbiAgY29uc3RydWN0b3IodGFpbGxlSG9yaXpvbnRhbGUsIHRhaWxsZVZlcnRpY2FsZSkge1xyXG4gICAgdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1ID0gdGFpbGxlSG9yaXpvbnRhbGU7XHJcbiAgICB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1ID0gdGFpbGxlVmVydGljYWxlO1xyXG4gICAgdGhpcy5saXN0ZVBpb25zUm91Z2UgPSBuZXcgQXJyYXkoKTtcclxuICAgIHRoaXMubGlzdGVQaW9uc0phdW5lID0gbmV3IEFycmF5KCk7XHJcbiAgICB0aGlzLm1vblRvdXIgPSBuZXcgTW9uVG91cigpXHJcbiAgICB0aGlzLmRpc2FibGVHYW1lKClcclxuICAgIHRoaXMubG9nKFxyXG4gICAgICBcIlB1aXNzYW5jZSA0XCIsXHJcbiAgICAgIFwiSW5pdGlhbGlzYXRpb24gZHUgamV1IGVuIFwiICsgdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1ICsgXCJ4XCIgKyB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1XHJcbiAgICApO1xyXG4gICAgR2FtZS5nYW1lID0gdGhpcztcclxuICB9XHJcbiAgc3RhdGljIGdldEdhbWUodGFpbGxlSG9yaXpvbnRhbGUsIHRhaWxsZVZlcnRpY2FsZSkge1xyXG4gICAgaWYgKEdhbWUuZ2FtZSkge1xyXG4gICAgICByZXR1cm4gR2FtZS5nYW1lXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbmV3IEdhbWUodGFpbGxlSG9yaXpvbnRhbGUsIHRhaWxsZVZlcnRpY2FsZSlcclxuICAgIH1cclxuICB9XHJcbiAgc2VhcmNoUGllY2UoY291bGV1ciwgaW5pdENhc2UpIHtcclxuICAgIGNvbnN0IHJlZENpcmNsZSA9ICQoJyNwcmV2aWV3ICNyZWRfY2lyY2xlJylcclxuICAgIGNvbnN0IHllbGxvd0NpcmNsZSA9ICQoJyNwcmV2aWV3ICN5ZWxsb3dfY2lyY2xlJylcclxuICAgIGNvbnN0IGRlZmF1bHRDaXJjbGUgPSAkKCcjcHJldmlldyAjYmFzaWNfY2lyY2xlJylcclxuICAgIGlmIChpbml0Q2FzZSkge1xyXG4gICAgICBpZiAoY291bGV1ciA9PT0gJ3JlZCcpIHtcclxuICAgICAgICAkKHJlZENpcmNsZSkuY2hpbGRyZW4oKS5jaGlsZHJlbigpLmF0dHIoJ2Nhc2UnLCBpbml0Q2FzZSlcclxuICAgICAgICByZXR1cm4gJChyZWRDaXJjbGUpLmh0bWwoKVxyXG4gICAgICB9IGVsc2UgaWYgKGNvdWxldXIgPT09ICd5ZWxsb3cnKSB7XHJcbiAgICAgICAgJCh5ZWxsb3dDaXJjbGUpLmNoaWxkcmVuKCkuY2hpbGRyZW4oKS5hdHRyKCdjYXNlJywgaW5pdENhc2UpXHJcbiAgICAgICAgcmV0dXJuICQoeWVsbG93Q2lyY2xlKS5odG1sKClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKGRlZmF1bHRDaXJjbGUpLmNoaWxkcmVuKCkuY2hpbGRyZW4oKS5hdHRyKCdjYXNlJywgaW5pdENhc2UpXHJcbiAgICAgICAgcmV0dXJuICQoZGVmYXVsdENpcmNsZSkuaHRtbCgpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChjb3VsZXVyID09PSAncmVkJykge1xyXG4gICAgICAgIHJldHVybiAkKHJlZENpcmNsZSkuaHRtbCgpXHJcbiAgICAgIH0gZWxzZSBpZiAoY291bGV1ciA9PT0gJ3llbGxvdycpIHtcclxuICAgICAgICByZXR1cm4gJCh5ZWxsb3dDaXJjbGUpLmh0bWwoKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAkKGRlZmF1bHRDaXJjbGUpLmh0bWwoKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlKSB7XHJcbiAgICBjb25zdCBsaXN0ZVBpb25zUm91Z2UgID0gdGhpcy5nZXRQaW9ucygxKVxyXG4gICAgY29uc3QgbGlzdGVQaW9uc0phdW5lICA9IHRoaXMuZ2V0UGlvbnMoMilcclxuICBcclxuICAgIGlmIChVdGlscy5hcnJheTJEQ29udGFpbnNBcnJheShsaXN0ZVBpb25zUm91Z2UsIFtpbmRleEhvcml6b250YWxlLCBpbmRleFZlcnRpY2FsZV0pKSB7XHJcbiAgICAgIHJldHVybiAncmVkJztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKFV0aWxzLmFycmF5MkRDb250YWluc0FycmF5KGxpc3RlUGlvbnNKYXVuZSwgW2luZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlXSkpIHtcclxuICAgICAgcmV0dXJuICd5ZWxsb3cnO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbiAgY2xlYXJHYW1lKCkge1xyXG4gICAgJCgnLnJvdycpLnJlbW92ZSgpXHJcbiAgfVxyXG4gIHJlc2V0R2FtZSgpIHtcclxuICAgIHRoaXMuY2xlYXJHYW1lKClcclxuICAgIHRoaXMuY2xlYXJQaW9ucygpXHJcbiAgICB0aGlzLmNyZWF0ZUJhY2tncm91bmQoKVxyXG4gICAgdGhpcy5kaXNhYmxlR2FtZSgpXHJcbiAgfVxyXG4gIHBsYXlHYW1lKCkgIHtcclxuICAgIGxldCBhdWRpbyA9IG5ldyBBdWRpbygnLi4vcHVibGljL2F1ZGlvL3N0YXJ0R2FtZS5tcDQnKTtcclxuICAgIGF1ZGlvLnBsYXkoKTtcclxuICAgIGF1ZGlvID0gbnVsbDtcclxuICAgIHRoaXMucmVzZXRHYW1lKClcclxuICAgIHRoaXMuc2V0TWVzc2FnZShcIkEgdG9pIGRlIGpvdWVyICFcIilcclxuICAgIHRoaXMuZW5hYmxlR2FtZSgpXHJcbiAgfVxyXG4gIHNlbGVjdChpbmRleEhvcml6b250YWxlKSB7XHJcbiAgICBpbmRleEhvcml6b250YWxlID0gcGFyc2VJbnQoaW5kZXhIb3Jpem9udGFsZSlcclxuICAgIGxldCBpbmRleFZlcnRpY2FsZSA9IHRoaXMuZ2V0VGFpbGxlVmVydGljYWxlKCk7XHJcbiAgICB3aGlsZSAoaW5kZXhWZXJ0aWNhbGUgPiAwKSB7XHJcbiAgICAgIGxldCB0ZWFtQ29sb3IgPSB0aGlzLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlKVxyXG4gICAgICBpZiAoIXRlYW1Db2xvcikge1xyXG4gICAgICAgIGxldCBjb3VsZXVyID0gJChcIiNnYW1lIC5yb3dcIikuZXEoKGluZGV4VmVydGljYWxlIC0gMSkpLmZpbmQoXCIuaWNvblwiKS5lcSgoaW5kZXhIb3Jpem9udGFsZSAtIDEpKVxyXG4gICAgICAgIGNvdWxldXIuYXR0cihcInN1cmJyaWxsYW5jZVwiLCBcInJlZFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaW5kZXhWZXJ0aWNhbGUtLTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0TGVzQ29sb25uZXNOb25Db21wbGV0ZXMoKSB7XHJcbiAgICBsZXQgbGlzdGVDb2xvbm5lc05vbkNvbXBsZXRlcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaW5kZXhIb3Jpem9udGFsZSA9IDE7IGluZGV4SG9yaXpvbnRhbGUgPD0gdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1OyBpbmRleEhvcml6b250YWxlKyspIHtcclxuICAgICAgaWYgKCF0aGlzLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGUsIDEpKSB7XHJcbiAgICAgICAgbGlzdGVDb2xvbm5lc05vbkNvbXBsZXRlcy5wdXNoKGluZGV4SG9yaXpvbnRhbGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGlzdGVDb2xvbm5lc05vbkNvbXBsZXRlcztcclxuICB9XHJcbiAgaXNEcmF3KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGlzdGVQaW9uc0phdW5lLmxlbmd0aCArIHRoaXMubGlzdGVQaW9uc1JvdWdlLmxlbmd0aCA+PSB0aGlzLmdldFRhaWxsZUhvcml6b250YWxlKCkgKiB0aGlzLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgfVxyXG4gIGdldFRhaWxsZUhvcml6b250YWxlKCkge1xyXG4gICAgcmV0dXJuIHBhcnNlSW50KHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldSk7XHJcbiAgfVxyXG4gIGdldFRhaWxsZVZlcnRpY2FsZSgpIHtcclxuICAgIHJldHVybiBwYXJzZUludCh0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1KTtcclxuICB9XHJcbiAgZ2V0TGVzQ2FzZXNQb3V2YW50RXRyZUpvdWVyKCkge1xyXG4gICAgbGV0IGxpc3RlRGVzQ2FzZXNQb3V2YW50RXRyZUpvdWVyID0gW107XHJcbiAgICBsZXQgbGlzdGVDb2xvbm5lc05vbkNvbXBsZXRlcyA9IHRoaXMuZ2V0TGVzQ29sb25uZXNOb25Db21wbGV0ZXMoKTtcclxuICAgIGxldCBhVHJvdXZlckxlUGlvbjtcclxuICAgIGxpc3RlQ29sb25uZXNOb25Db21wbGV0ZXMuZm9yRWFjaChudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUgPT4ge1xyXG4gICAgICBsZXQgbnVtZXJvQ29sb25uZVZlcnRpY2FsZSA9IHRoaXMuZ2V0VGFpbGxlVmVydGljYWxlKCk7XHJcbiAgICAgIGFUcm91dmVyTGVQaW9uID0gZmFsc2U7XHJcbiAgICAgIHdoaWxlIChudW1lcm9Db2xvbm5lVmVydGljYWxlID4gMCAmJiAhYVRyb3V2ZXJMZVBpb24pIHtcclxuICAgICAgICBpZiAoIVV0aWxzLmFycmF5MkRDb250YWluc0FycmF5KHRoaXMuZ2V0UGlvbnMoMSksIFtudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGVdKVxyXG4gICAgICAgICAgJiYgIVV0aWxzLmFycmF5MkRDb250YWluc0FycmF5KHRoaXMuZ2V0UGlvbnMoMiksIFtudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGVdKSkge1xyXG4gICAgICAgICAgICBsaXN0ZURlc0Nhc2VzUG91dmFudEV0cmVKb3Vlci5wdXNoKFtudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGVdKVxyXG4gICAgICAgICAgICBhVHJvdXZlckxlUGlvbiA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGUtLTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbGlzdGVEZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXI7XHJcbiAgfVxyXG4gIGV4cG9ydCgpIHtcclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJBZmZpY2hhZ2UgZGUgbCdleHBvcnQuLi5cIik7XHJcbiAgICBsZXQgcGFyYW1zID0gW107XHJcbiAgICBwYXJhbXNbJ3JlZCddICAgID0gdGhpcy5nZXRQaW9ucygncmVkJylcclxuICAgIHBhcmFtc1sneWVsbG93J10gPSB0aGlzLmdldFBpb25zKCd5ZWxsb3cnKVxyXG4gICAgY29uc3QgcmVkID0gcGFyYW1zWydyZWQnXTtcclxuICAgIGNvbnN0IHllbGxvdyA9IHBhcmFtc1sneWVsbG93J107XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gJC5hamF4KHtcclxuICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICB1cmw6IFwiYXBpL2V4cG9ydD94PVwiICsgdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1ICsgXCImeT1cIiArIHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXUsXHJcbiAgICAgIGRhdGE6IHtyZWQ6cmVkLCB5ZWxsb3c6eWVsbG93fSxcclxuICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICB0aW1lb3V0OiAxMjAwMDBcclxuICAgIH0pXHJcbiAgICByZXF1ZXN0LmRvbmUoZnVuY3Rpb24gKG91dHB1dF9zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG91dHB1dF9zdWNjZXNzKVxyXG4gICAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiTCdleHBvcnQgcydlc3QgY29ycmVjdGVtZW50IHRlcm1pbsOpXCIpO1xyXG4gICAgfSlcclxuICAgIHJlcXVlc3QuZmFpbChmdW5jdGlvbiAoaHR0cF9lcnJvcikge1xyXG4gICAgICBsZXQgc2VydmVyX21zZyA9IGh0dHBfZXJyb3IucmVzcG9uc2VUZXh0O1xyXG4gICAgICBsZXQgY29kZSA9IGh0dHBfZXJyb3Iuc3RhdHVzO1xyXG4gICAgICBsZXQgY29kZV9sYWJlbCA9IGh0dHBfZXJyb3Iuc3RhdHVzVGV4dDtcclxuICAgICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkVjaGVjIGxvcnMgZGUgbCdleHBvcnQgKFwiK2NvZGUrXCIpXCIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHVuU2VsZWN0KCkge1xyXG4gICAgJChcIi5yb3cgLmljb25cIikuYXR0cihcInN1cmJyaWxsYW5jZVwiLCBcIlwiKTtcclxuICB9XHJcbiAgc2V0TWVzc2FnZShtZXNzYWdlKSB7XHJcbiAgICAkKFwiI2dhbWUgcCN0b3VyXCIpLnRleHQobWVzc2FnZSk7XHJcbiAgfVxyXG4gIGltcG9ydCAoZ2FtZU9iamVjdCwgcGFyYW1ldGVycykge1xyXG4gICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkTDqWJ1dCBkZSBsJ2ltcG9ydCAuLi5cIik7XHJcbiAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiSW5pdGlhbGlzYXRpb24gZGVzIHBhcmFtw6h0cmVzIC4uLlwiKTtcclxuICAgIHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldSA9IGdhbWVPYmplY3QucGFyYW1ldHJlcy54XHJcbiAgICB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1ID0gZ2FtZU9iamVjdC5wYXJhbWV0cmVzLnlcclxuICAgIHRoaXMucmVzZXRHYW1lKClcclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJJbXBvcnQgZGVzIHBpb25zIC4uLlwiKTtcclxuICAgIGdhbWVPYmplY3QuZGF0YXMucGlvbnMucmVkLmZvckVhY2gocGlvblJvdWdlID0+IHtcclxuICAgICAgdGhpcy5mb3JjZUFkZFBpb24ocGlvblJvdWdlWzBdLCBwaW9uUm91Z2VbMV0sICdyZWQnKVxyXG4gICAgfSk7XHJcbiAgICBnYW1lT2JqZWN0LmRhdGFzLnBpb25zLnllbGxvdy5mb3JFYWNoKHBpb25ZZWxsb3cgPT4ge1xyXG4gICAgICB0aGlzLmZvcmNlQWRkUGlvbihwaW9uWWVsbG93WzBdLCBwaW9uWWVsbG93WzFdLCAneWVsbG93JylcclxuICAgIH0pO1xyXG4gICAgaWYgKHBhcmFtZXRlcnMpIHtcclxuICAgICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIlbDqXJpZmljYXRpb24gZCd1biBwb3RlbnRpZWwgZ2FnbmFudCAuLi5cIik7XHJcbiAgICAgIGxldCBnYWduYW50Um91Z2UgPSBXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMsIFwicmVkXCIpO1xyXG4gICAgICBsZXQgZ2FnbmFudEphdW5lID0gV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLCBcInllbGxvd1wiKTtcclxuICAgICAgaWYgKGdhZ25hbnRSb3VnZSkge1xyXG4gICAgICAgIHRoaXMuc2V0V2lubmVyKGdhZ25hbnRSb3VnZSk7XHJcbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlKFwiVHUgYXMgZ2FnbsOpICFcIik7XHJcbiAgICAgICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkdhZ27DqSAhIEJpZW4gam91w6lcIik7XHJcbiAgICAgICAgdGhpcy51blNlbGVjdCgpO1xyXG4gICAgICB9IGVsc2UgaWYgKGdhZ25hbnRKYXVuZSkge1xyXG4gICAgICAgIHRoaXMuc2V0V2lubmVyKGdhZ25hbnRKYXVuZSk7XHJcbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlKFwiVHUgYXMgcGVyZHUgbGEgcGFydGllICFcIik7XHJcbiAgICAgICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIlBlcmR1ICEgOihcIik7XHJcbiAgICAgICAgdGhpcy5tb25Ub3VyLnNldChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy51blNlbGVjdCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiRmluIGRlIGwnaW1wb3J0XCIpO1xyXG4gIH1cclxuICBzZXRXaW5uZXIoY291bGV1ciwgcGlvbnNHYWduYW50cykge1xyXG4gICAgdGhpcy5kaXNhYmxlR2FtZSgpXHJcbiAgICBpZiAocGlvbnNHYWduYW50cykgeyAgICAgICBcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwaW9uc0dhZ25hbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGluZGV4VmVydGljYWxlID0gcGlvbnNHYWduYW50c1tpXVswXVxyXG4gICAgICAgIGxldCBpbmRleEhvcml6b250YWxlICAgPSBwaW9uc0dhZ25hbnRzW2ldWzFdXHJcbiAgICAgICAgbGV0IGNvdWxldXIgPSAkKFwiI2dhbWUgLnJvd1wiKS5lcSgoaW5kZXhWZXJ0aWNhbGUgLSAxKSkuZmluZChcIi5pY29uXCIpLmVxKChpbmRleEhvcml6b250YWxlIC0gMSkpXHJcbiAgICAgICAgJChjb3VsZXVyKS5jc3MoXCJvcGFjaXR5XCIsIDEpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChjb3VsZXVyID09ICdyZWQnKSB7XHJcbiAgICAgIHRoaXMuc2V0TWVzc2FnZShcIkxlcyByb3VnZXMgb250IGdhZ27DqXNcIik7XHJcbiAgICB9IGVsc2UgaWYgKGNvdWxldXIgPT0gJ3llbGxvdycpIHtcclxuICAgICAgdGhpcy5zZXRNZXNzYWdlKFwiTGVzIGphdW5lcyBvbnQgZ2FnbsOpc1wiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2V0TWVzc2FnZShcIk1hdGNoIG51bCAhXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuICBsb2cgKHByZWZpeCwgbWVzc2FnZSwgY29sb3JUZXh0KSB7XHJcbiAgICBpZiAoIWNvbG9yVGV4dCkge1xyXG4gICAgICBjb2xvclRleHQgPSBcImZhbHNlXCJcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICBcIiVjW1wiICsgcHJlZml4ICsgXCJdICVjXCIgKyBtZXNzYWdlLFxyXG4gICAgICBcImNvbG9yOiBwdXJwbGU7IGZvbnQtc2l6ZTogMTNweDsgZm9udC13ZWlnaHQ6IGJvbGQ7XCIsXHJcbiAgICAgIFwiZm9udC1zaXplOiAxM3B4OyBjb2xvcjogXCIgKyBjb2xvclRleHRcclxuICAgICk7XHJcbiAgfVxyXG4gIGRpc2FibGVHYW1lKCkge1xyXG4gICAgJChcIiNnYW1lIC5pY29uXCIpLmNzcyhcIm9wYWNpdHlcIiwgMC4zKVxyXG4gICAgdGhpcy5tb25Ub3VyLnNldChmYWxzZSlcclxuICB9XHJcbiAgZW5hYmxlR2FtZSgpIHtcclxuICAgICQoXCIjZ2FtZSAuaWNvblwiKS5jc3MoXCJvcGFjaXR5XCIsIDEpXHJcbiAgICB0aGlzLm1vblRvdXIuc2V0KHRydWUpXHJcbiAgfVxyXG4gIGNyZWF0ZUJhY2tncm91bmQoKSB7XHJcbiAgICBjb25zb2xlLmxvZygkKCcucm93JykucmVtb3ZlKCkpXHJcbiAgICBsZXQgUHggPSB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXU7XHJcbiAgICBsZXQgUHkgPSB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1O1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldTsgaSsrKSB7XHJcbiAgICAgIGxldCByb3dZID0gJzxkaXYgY2xhc3M9XCJyb3dcIiB2YWw9XCInICsgaSArICdcIj48L2Rpdj4nO1xyXG4gICAgICAkKFwiI2dhbWVcIikuYXBwZW5kKHJvd1kpO1xyXG4gICAgICBmb3IgKGxldCBqID0gMTsgaiA8PSB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXU7IGorKykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib2tcIilcclxuICAgICAgICAkKCcucm93W3ZhbD1cIicgKyBpICsgJ1wiXScpLmFwcGVuZCh0aGlzLnNlYXJjaFBpZWNlKG51bGwsIGopKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coJCgnLnJvdycpLnJlbW92ZSgpKVxyXG4gIH1cclxuICBmb3JjZUFkZFBpb24ocG9zaXRpb25Ib3Jpem9udGFsZSwgcG9zaXRpb25WZXJ0aWNhbGUsIGNvdWxldXIpIHtcclxuICAgICQoXCIucm93W3ZhbD0nXCIgKyBwb3NpdGlvblZlcnRpY2FsZSArIFwiJ10gLmljb25bY2FzZT0nXCIgKyBwb3NpdGlvbkhvcml6b250YWxlICsgXCInXVwiKS5yZXBsYWNlV2l0aCh0aGlzLnNlYXJjaFBpZWNlKGNvdWxldXIsIHBvc2l0aW9uSG9yaXpvbnRhbGUpKTtcclxuICAgICQoXCIucm93W3ZhbD0nXCIgKyBwb3NpdGlvblZlcnRpY2FsZSArIFwiJ10gLmljb25bY2FzZT0nXCIgKyBwb3NpdGlvbkhvcml6b250YWxlICsgXCInXVwiKS5hdHRyKFwidGVhbVwiLGNvdWxldXIpO1xyXG4gICAgaWYgKGNvdWxldXIgPT0gJ3llbGxvdycpIHtcclxuICAgICAgdGhpcy5zZXRQaW9uKDIsIFtwb3NpdGlvbkhvcml6b250YWxlLCBwb3NpdGlvblZlcnRpY2FsZV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZXRQaW9uKDEsIFtwb3NpdGlvbkhvcml6b250YWxlLCBwb3NpdGlvblZlcnRpY2FsZV0pO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRQb3NpdGlvbkhvcml6b250YWxlKGV2ZW50KSB7XHJcbiAgICByZXR1cm4gJChldmVudCkucGFyZW50KCkuaW5kZXgoKSArIDE7XHJcbiAgfVxyXG4gIGFkZFBpb24oaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQpIHtcclxuICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSA9IHRoaXMuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlID0gdGhpcy5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcbiAgICBsZXQgcGxhY2VJc05vdFRha2VuID0gdHJ1ZTtcclxuICAgIGxldCBpbmRleFZlcnRpY2FsZSA9IHRhaWxsZVZlcnRpY2FsZTtcclxuICAgIGlmICh0aGlzLm1vblRvdXIuZ2V0KCkpIHtcclxuICAgICAgd2hpbGUgKGluZGV4VmVydGljYWxlID4gMCAmJiBwbGFjZUlzTm90VGFrZW4pIHtcclxuICAgICAgICBsZXQgY291bGV1ckR1UGlvbiA9IHRoaXMuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQsIGluZGV4VmVydGljYWxlKTtcclxuICAgICAgICBpZiAoIWNvdWxldXJEdVBpb24pIHtcclxuICAgICAgICAgIHBsYWNlSXNOb3RUYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5tb25Ub3VyLnNldChmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLnVuU2VsZWN0KCk7XHJcbiAgICAgICAgICB0aGlzLmZvcmNlQWRkUGlvbihpbmRleEhvcml6b250YWxlQ2xpY2tlZCwgaW5kZXhWZXJ0aWNhbGUsIFwicmVkXCIpXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGxldCBsZXNQaW9uc0dhZ25hbnRzID0gV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLCBcInJlZFwiKTtcclxuICAgICAgICAgIGlmIChsZXNQaW9uc0dhZ25hbnRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0V2lubmVyKCdyZWQnLCBsZXNQaW9uc0dhZ25hbnRzKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0RyYXcoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFdpbm5lcihudWxsLCBudWxsKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3QoaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1lc3NhZ2UoXCJBdSB0b3VyIGRlIGwnYWR2ZXJzYWlyZSFcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGdhbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICBjb25zdCBhdWRpbyA9IG5ldyBBdWRpbygnLi4vLi4vcHVibGljL2F1ZGlvL3BvcC5tcDQnKTtcclxuICAgICAgICAgICAgICBhdWRpby5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgY29uc3Qgcm9ib3RNYW5hZ2VyID0gUm9ib3RNYW5hZ2VyLmdldFJvYm90TWFuYWdlcihnYW1lKVxyXG4gICAgICAgICAgICAgIGlmIChyb2JvdE1hbmFnZXIucm9ib3RQbGFjZVVuUGlvbihcInllbGxvd1wiKSkge1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5zZXRNZXNzYWdlKFwiVHUgYXMgcGVyZHUgbGEgcGFydGllICFcIik7XHJcbiAgICAgICAgICAgICAgICBnYW1lLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiUGVyZHUgIVwiKTtcclxuICAgICAgICAgICAgICAgIGdhbWUubW9uVG91ci5zZXQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS51blNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleEhvcml6b250YWxlQ2xpY2tlZCwgaW5kZXhWZXJ0aWNhbGUrMSkpIHtcclxuICAgICAgICAgICAgICAgICAgLy8gU2kgbGUgcm9ib3QgYSBqb3XDqSBzdXIgbGEgbcOqbWUgY29sb25uZSwgb24gYWN0dWFsaXNlIGxhIHPDqWxlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgZ2FtZS5zZWxlY3QoaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ2FtZS5tb25Ub3VyLnNldCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGdhbWUuc2V0TWVzc2FnZShcIkEgdG9uIHRvdXIgIVwiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kZXhWZXJ0aWNhbGUtLTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmxvZyhcclxuICAgICAgICBcIlB1aXNzYW5jZSA0XCIsXHJcbiAgICAgICAgXCJKZXRvbiBlbiBYOlwiICsgaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQgKyBcIiBZOlwiICsgKGluZGV4VmVydGljYWxlICsgMSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbiAgc2V0UGlvbih0ZWFtLCB2YWx1ZSkge1xyXG4gICAgaWYgKHRlYW0gPT0gMSB8fCB0ZWFtID09ICdyZWQnKSB7XHJcbiAgICAgIHRoaXMubGlzdGVQaW9uc1JvdWdlLnB1c2godmFsdWUpO1xyXG4gICAgfSBlbHNlIGlmICh0ZWFtID09IDIgfHwgdGVhbSA9PSAneWVsbG93Jykge1xyXG4gICAgICB0aGlzLmxpc3RlUGlvbnNKYXVuZS5wdXNoKHZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkxlIGpvdWV1ciBlc3QgaW50cm91dmFibGVcIik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlbW92ZVBpb24gKHRlYW0sIHZhbHVlKSB7XHJcbiAgICBsZXQgaW5kZXg7XHJcbiAgICBpZiAodGVhbSA9PSAxIHx8IHRlYW0gPT0gJ3JlZCcpIHtcclxuICAgICAgaW5kZXggPSBVdGlscy5nZXRJbmRleE9mMkRBcnJheSh0aGlzLmxpc3RlUGlvbnNSb3VnZSwgdmFsdWUpXHJcbiAgICAgIHRoaXMubGlzdGVQaW9uc1JvdWdlLnNwbGljZShpbmRleCwgMSlcclxuICAgIH0gZWxzZSBpZiAodGVhbSA9PSAyIHx8IHRlYW0gPT0gJ3llbGxvdycpIHtcclxuICAgICAgaW5kZXggPSBVdGlscy5nZXRJbmRleE9mMkRBcnJheSh0aGlzLmxpc3RlUGlvbnNKYXVuZSwgdmFsdWUpXHJcbiAgICAgIHRoaXMubGlzdGVQaW9uc0phdW5lLnNwbGljZShpbmRleCwgMSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IFwiTGUgam91ZXVyIGVzdCBpbnRyb3V2YWJsZVwiO1xyXG4gICAgfVxyXG4gIH1cclxuICBjbGVhclBpb25zICgpIHtcclxuICAgIHRoaXMubGlzdGVQaW9uc1JvdWdlID0gW107XHJcbiAgICB0aGlzLmxpc3RlUGlvbnNKYXVuZSA9IFtdO1xyXG4gICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkxlcyBkb25uw6llcyBkZXMgcGlvbnMgb250IMOpdMOpIGVmZmFjw6lzXCIpO1xyXG4gIH1cclxuICBnZXRQaW9ucyAodGVhbSkge1xyXG4gICAgaWYgKHRlYW0gPT0gMSB8fCB0ZWFtID09ICdyZWQnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlUGlvbnNSb3VnZTtcclxuICAgIH0gZWxzZSBpZiAodGVhbSA9PSAyIHx8IHRlYW0gPT0gJ3llbGxvdycpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVQaW9uc0phdW5lO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgXCJMZSBqb3VldXIgZXN0IGludHJvdXZhYmxlXCI7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIE1vblRvdXIge1xyXG4gIHNldChtb25Ub3VyKSB7XHJcbiAgICB0aGlzLm1vblRvdXIgPSBtb25Ub3VyXHJcbiAgfVxyXG4gIGdldCgpIHtcclxuICAgIHJldHVybiB0aGlzLm1vblRvdXJcclxuICB9XHJcbn0iLCJ2YXIgbWFwID0ge1xuXHRcIi4vQ2hlY2tJZldpbm5lci5qc1wiOiA0LFxuXHRcIi4vR2FtZS5qc1wiOiAxLFxuXHRcIi4vSmV0b24uanNcIjogNSxcblx0XCIuL01vblRvdXIuanNcIjogMixcblx0XCIuL1JvYm90TWFuYWdlci5qc1wiOiA2LFxuXHRcIi4vVGVzdHNVbml0cy5qc1wiOiA3LFxuXHRcIi4vVXRpbHMuanNcIjogOCxcblx0XCIuL1dpbm5lck1hbmFnZXIuanNcIjogOSxcblx0XCIuL2dhbWVfbWFuYWdlci5pbmMuanNcIjogMTAsXG5cdFwiLi9tYWluLmluYy5qc1wiOiAxMVxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDM7IiwiZXhwb3J0IGNsYXNzIENoZWNrSWZXaW5uZXIge1xyXG4gIHN0YXRpYyBob3Jpem9udGFsKGdhbWUsIGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSAgID0gZ2FtZS5nZXRUYWlsbGVWZXJ0aWNhbGUoKVxyXG4gICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGUgPSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKClcclxuICAgIC8vIFbDqXJpZmljYXRpb24gZW4gaG9yaXpvbnRhbFxyXG4gICAgbGV0IGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgbGV0IGNvdWxldXJEdVBpb247XHJcbiAgICBsZXQgbmJQaW9uc0dhZ25hbnRzO1xyXG4gICAgZm9yIChsZXQgaW5kZXhWZXJ0aWNhbGUgPSAxOyBpbmRleFZlcnRpY2FsZSA8PSB0YWlsbGVWZXJ0aWNhbGU7IGluZGV4VmVydGljYWxlKyspIHtcclxuICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgIGZvciAobGV0IGluZGV4SG9yaXpvbnRhbGUgPSAxOyBpbmRleEhvcml6b250YWxlIDw9IHRhaWxsZUhvcml6b250YWxlOyBpbmRleEhvcml6b250YWxlKyspIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleEhvcml6b250YWxlLCBpbmRleFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleFZlcnRpY2FsZSwgaW5kZXhIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBzdGF0aWMgdmVydGljYWwgKGdhbWUsIGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSAgID0gZ2FtZS5nZXRUYWlsbGVWZXJ0aWNhbGUoKVxyXG4gICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGUgPSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKClcclxuICAgIC8vIFBhcmNvdXJzIGRlIGNoYXF1ZSBjYXNlIGhvcml6b250YWxlIGR1IGpldVxyXG4gICAgbGV0IGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgbGV0IGNvdWxldXJEdVBpb247XHJcbiAgICBsZXQgbmJQaW9uc0dhZ25hbnRzO1xyXG4gICAgZm9yIChsZXQgaW5kZXhIb3Jpem9udGFsZSA9IDE7IGluZGV4SG9yaXpvbnRhbGUgPD0gdGFpbGxlSG9yaXpvbnRhbGU7IGluZGV4SG9yaXpvbnRhbGUrKykge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgLy8gUGFyY291cnMgY2hhcXVlIGNhc2UgdmVydGljYWxlIGRlIGxhIGNvbG9ubmVcclxuICAgICAgZm9yIChsZXQgaW5kZXhWZXJ0aWNhbGUgPSAxOyBpbmRleFZlcnRpY2FsZSA8PSB0YWlsbGVWZXJ0aWNhbGU7IGluZGV4VmVydGljYWxlKyspIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleEhvcml6b250YWxlLCBpbmRleFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhWZXJ0aWNhbGUsIGluZGV4SG9yaXpvbnRhbGVdKTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cysrO1xyXG4gICAgICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRpYWdvbmFsVG9wTGVmdCAoZ2FtZSwgY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgY29uc3QgdGFpbGxlVmVydGljYWxlICAgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKVxyXG5cclxuICAgIGxldCBjb3VsZXVyRHVQaW9uLCBuYlBpb25zR2FnbmFudHM7XHJcbiAgICBsZXQgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGU7XHJcbiAgICBsZXQgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICBsZXQgaW5kZXhDb3VyYW50VmVydGljYWxlID0gNDtcclxuXHJcbiAgICAvLyBQYXJjb3VycyB0b3V0ZXMgbGVzIGRpYWdvbmFsZXMgw6AgZ2F1Y2hlcyDDoCBwYXJ0aXIgZGUgNC5cclxuICAgIGZvciAobGV0IGluZGV4VmVydGljYWxlID0gNDsgaW5kZXhWZXJ0aWNhbGUgPD0gdGFpbGxlVmVydGljYWxlOyBpbmRleFZlcnRpY2FsZSsrKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSA9IDE7XHJcbiAgICAgIFxyXG4gICAgICAvLyBWw6lyaWZpZXIgbGEgbGlnbmUgZW4gZGlhZ29uYWxlXHJcbiAgICAgIHdoaWxlIChpbmRleENvdXJhbnRIb3Jpem9udGFsZSA8PSB0YWlsbGVIb3Jpem9udGFsZSAmJiBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPj0gMSkge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4Q291cmFudEhvcml6b250YWxlLCBpbmRleENvdXJhbnRWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKGNvdWxldXJEdVBpb24gPT0gY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzLnB1c2goW2luZGV4Q291cmFudFZlcnRpY2FsZSwgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGVdKTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cysrO1xyXG4gICAgICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kZXhDb3VyYW50VmVydGljYWxlLS07XHJcbiAgICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUrKztcclxuICAgICAgfVxyXG4gICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPSBpbmRleFZlcnRpY2FsZSArIDE7XHJcbiAgICB9XHJcblxyXG4gICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXhIb3Jpem9udGFsZSA9IDI7IGluZGV4SG9yaXpvbnRhbGUgPD0gKHRhaWxsZUhvcml6b250YWxlLTQpOyBpbmRleEhvcml6b250YWxlKyspIHtcclxuICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlID0gaW5kZXhIb3Jpem9udGFsZTtcclxuICAgICAgaW5kZXhDb3VyYW50VmVydGljYWxlID0gdGFpbGxlVmVydGljYWxlO1xyXG4gICAgICAvLyBWw6lyaWZpZXIgbGEgbGlnbmUgZW4gZGlhZ29uYWxlXHJcbiAgICAgIHdoaWxlIChpbmRleENvdXJhbnRIb3Jpem9udGFsZSA8PSB0YWlsbGVIb3Jpem9udGFsZSAmJiBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPj0gMSkge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4Q291cmFudEhvcml6b250YWxlLCBpbmRleENvdXJhbnRWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKGNvdWxldXJEdVBpb24gPT0gY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzLnB1c2goW2luZGV4Q291cmFudFZlcnRpY2FsZSwgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGVdKTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cysrO1xyXG4gICAgICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kZXhDb3VyYW50VmVydGljYWxlLS07XHJcbiAgICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUrKztcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBkaWFnb25hbFRvcFJpZ2h0KGdhbWUsIGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSAgID0gZ2FtZS5nZXRUYWlsbGVWZXJ0aWNhbGUoKVxyXG4gICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGUgPSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKClcclxuXHJcbiAgICBsZXQgY291bGV1ckR1UGlvbiwgbmJQaW9uc0dhZ25hbnRzO1xyXG4gICAgbGV0IGluZGV4Q291cmFudEhvcml6b250YWxlO1xyXG4gICAgbGV0IGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG5cclxuICAgIC8vIFBhcmNvdXJzIHRvdXRlcyBsZXMgZGlhZ29uYWxlcyDDoCBnYXVjaGVzIMOgIHBhcnRpciBkZSA0LlxyXG4gICAgZm9yIChsZXQgaW5kZXhWZXJ0aWNhbGUgPSA0OyBpbmRleFZlcnRpY2FsZSA8PSB0YWlsbGVWZXJ0aWNhbGU7IGluZGV4VmVydGljYWxlKyspIHtcclxuICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlID0gdGFpbGxlSG9yaXpvbnRhbGU7XHJcbiAgICAgIGxldCBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPSBpbmRleFZlcnRpY2FsZTtcclxuICAgICAgLy8gVsOpcmlmaWVyIGxhIGxpZ25lIGVuIGRpYWdvbmFsZVxyXG4gICAgICB3aGlsZSAoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPj0gMSAmJiBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPj0gMSkge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4Q291cmFudEhvcml6b250YWxlLCBpbmRleENvdXJhbnRWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKGNvdWxldXJEdVBpb24gPT0gY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzLnB1c2goW2luZGV4Q291cmFudFZlcnRpY2FsZSwgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGVdKTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cysrO1xyXG4gICAgICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUtLTtcclxuICAgICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUtLTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgIGZvciAobGV0IGluZGV4SG9yaXpvbnRhbGUgPSAodGFpbGxlSG9yaXpvbnRhbGUgLSAxKTsgaW5kZXhIb3Jpem9udGFsZSA+PSA0OyBpbmRleEhvcml6b250YWxlLS0pIHtcclxuICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlID0gaW5kZXhIb3Jpem9udGFsZTtcclxuICAgICAgbGV0IGluZGV4Q291cmFudFZlcnRpY2FsZSA9IHRhaWxsZVZlcnRpY2FsZTtcclxuICAgICAgLy8gVsOpcmlmaWVyIGxhIGxpZ25lIGVuIGRpYWdvbmFsZVxyXG4gICAgICB3aGlsZSAoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPj0gMSAmJiBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPj0gMSkge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4Q291cmFudEhvcml6b250YWxlLCBpbmRleENvdXJhbnRWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKGNvdWxldXJEdVBpb24gPT0gY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzLnB1c2goW2luZGV4Q291cmFudFZlcnRpY2FsZSwgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGVdKTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cysrO1xyXG4gICAgICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kZXhDb3VyYW50VmVydGljYWxlLS07XHJcbiAgICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUtLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufSIsImV4cG9ydCBjbGFzcyBKZXRvbiB7XHJcbiAgY29uc3RydWN0b3IocG9zaXRpb25Ib3Jpem9udGFsZSwgcG9zaXRpb25WZXJ0aWNhbGUpIHtcclxuICAgIHRoaXMucG9zaXRpb25Ib3Jpem9udGFsZSA9IHBvc2l0aW9uSG9yaXpvbnRhbGU7XHJcbiAgICB0aGlzLnBvc2l0aW9uVmVydGljYWxlICAgPSBwb3NpdGlvblZlcnRpY2FsZTtcclxuICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgUm9ib3RNYW5hZ2VyIHtcclxuICBjb25zdHJ1Y3RvcihnYW1lKSB7XHJcbiAgICBpZiAoZ2FtZSkge1xyXG4gICAgICB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXUgPSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKCk7XHJcbiAgICAgIHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXUgICA9IGdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKCk7XHJcbiAgICAgIHRoaXMuZ2FtZSA9IGdhbWVcclxuICAgICAgUm9ib3RNYW5hZ2VyLnJvYm90TWFuYWdlciA9IHRoaXNcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkF1Y3VuZSBwYXJ0aWUgZMOpZmluaXRcIilcclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldFJvYm90TWFuYWdlcihnYW1lKSB7XHJcbiAgICBpZiAoUm9ib3RNYW5hZ2VyLnJvYm90TWFuYWdlcikge1xyXG4gICAgICByZXR1cm4gUm9ib3RNYW5hZ2VyLnJvYm90TWFuYWdlclxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG5ldyBSb2JvdE1hbmFnZXIoZ2FtZSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxhbmNlVW5lUGFydGllRGVSb2JvdHMoKSB7XHJcbiAgICB0aGlzLmdhbWUuc2V0TWVzc2FnZShcIlJvYm90IFZzLiBSb2JvdFwiKTtcclxuICAgIHRoaXMuZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgdGhpcy5nYW1lLmVuYWJsZUdhbWUoKVxyXG4gICAgdGhpcy5nYW1lLm1vblRvdXIuc2V0KGZhbHNlKVxyXG4gICAgLy8gT24gY2hvaXNpcyB1bmUgw6lxdWlwZSBxdWkgY29tbWVuY2UgYWzDqWF0b2lyZW1lbnRcclxuICAgIGNvbnN0IGNvbG9yID0gVXRpbHMuZ2V0Q291bGV1ckVxdWlwZUFsZWF0b2lyZSgpO1xyXG4gICAgLy8gT24gbGFuY2UgbGEgcGFydGllXHJcbiAgICB0aGlzLnJvYm90VnNSb2JvdChjb2xvcik7XHJcbiAgfVxyXG5cclxuICByb2JvdFZzUm9ib3QoY29sb3IpIHtcclxuICAgIC8vIFNpIGxhIHBhcnRpZSBuJ2VzdCBwYXMgdGVybWluw6lcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgaWYgKCF0aGlzLnJvYm90UGxhY2VVblBpb24oY29sb3IpKVxyXG4gICAge1xyXG4gICAgICAvLyBPbiBmYWlzIGpvdWVyIGwnw6lxdWlwZSBhZHZlcnNlXHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoYXQucm9ib3RWc1JvYm90KFV0aWxzLmdldENvdWxldXJFcXVpcGVBZHZlcnNlKGNvbG9yKSlcclxuICAgICAgfSwgNSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJvYm90UGxhY2VVblBpb24oY29sb3IpIHtcclxuICAgIGNvbnN0IGdhbWUgPSB0aGlzLmdhbWU7XHJcbiAgICAvLyBPbiByw6ljdXDDqHJlIGxhIGxpc3RlIGRlcyBjb2xvbm5lcyBxdWkgbidvbnQgcGFzIGxldXJzXHJcbiAgICAvLyBjb2xvbm5lcyBjb21wbMOpdMOpcy5cclxuICAgIGNvbnN0IGxpc3RlQ29sb25uZXNOb25Db21wbGV0ZXMgPSBnYW1lLmdldExlc0NvbG9ubmVzTm9uQ29tcGxldGVzKCk7XHJcbiAgICBsZXQgY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50ID0gVXRpbHMuZ2V0RWxlbWVudEFsZWF0b2lyZShsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzKTtcclxuICAgIGNvbnN0IGxlc0Nhc2VzUG91dmFudEV0cmVKb3VlciAgPSBnYW1lLmdldExlc0Nhc2VzUG91dmFudEV0cmVKb3VlcigpO1xyXG4gICAgbGVzQ2FzZXNQb3V2YW50RXRyZUpvdWVyLmZvckVhY2goY2FzZVBvdXZhbnRFdHJlSm91ZXIgPT4ge1xyXG4gICAgICBsZXQgaW5kaWNlSG9yaXpvbnRhbGUgPSBjYXNlUG91dmFudEV0cmVKb3VlclswXTtcclxuICAgICAgbGV0IGluZGljZVZlcnRpY2FsZSAgID0gY2FzZVBvdXZhbnRFdHJlSm91ZXJbMV07XHJcbiAgICAgIGlmIChXaW5uZXJNYW5hZ2VyLnZlcmlmSWZQaW9uUGxhY2VkR2l2ZVdpbihnYW1lLCBpbmRpY2VIb3Jpem9udGFsZSwgaW5kaWNlVmVydGljYWxlLCBjb2xvcikpIHtcclxuICAgICAgICBjb2xvbm5lQ2hvaXNpdEFsZWF0b2lyZW1lbnQgPSBpbmRpY2VIb3Jpem9udGFsZTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChXaW5uZXJNYW5hZ2VyLnZlcmlmSWZQaW9uUGxhY2VkR2l2ZVdpbihnYW1lLCBpbmRpY2VIb3Jpem9udGFsZSwgaW5kaWNlVmVydGljYWxlLCBVdGlscy5nZXRDb3VsZXVyRXF1aXBlQWR2ZXJzZShjb2xvcikpKSB7XHJcbiAgICAgICAgY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50ID0gaW5kaWNlSG9yaXpvbnRhbGU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgICBcclxuICAgIGlmICghbGVzQ2FzZXNQb3V2YW50RXRyZUpvdWVyIHx8IGxlc0Nhc2VzUG91dmFudEV0cmVKb3Vlci5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy5nYW1lLnNldFdpbm5lcihudWxsLCBudWxsKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgYm91Y2xlQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgbGV0IGluZGljZVRhaWxsZVZlcnRpY2FsZSA9IHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXU7XHJcbiAgICAgIHdoaWxlIChpbmRpY2VUYWlsbGVWZXJ0aWNhbGUgPiAwICYmIGJvdWNsZUFjdGl2ZSkge1xyXG4gICAgICAgIGxldCBjb3VsZXVyRHVQaW9uUGxhY2UgPSB0aGlzLmdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50LCBpbmRpY2VUYWlsbGVWZXJ0aWNhbGUpO1xyXG4gICAgICAgIGlmICghY291bGV1ckR1UGlvblBsYWNlKSB7XHJcbiAgICAgICAgICBib3VjbGVBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuZ2FtZS5mb3JjZUFkZFBpb24oY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50LCBpbmRpY2VUYWlsbGVWZXJ0aWNhbGUsIGNvbG9yKVxyXG4gICAgICAgICAgLy9ham91dGVVblBpb25EYW5zQmRkKGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCwgaW5kaWNlVGFpbGxlVmVydGljYWxlLCBjb2xvcik7XHJcbiAgICAgICAgICBjb25zdCBpc1dpbm5lciA9IFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCBjb2xvcik7XHJcbiAgICAgICAgICBpZiAoaXNXaW5uZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLnNldFdpbm5lcihjb2xvciwgaXNXaW5uZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kaWNlVGFpbGxlVmVydGljYWxlLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG59IiwiZXhwb3J0IGNsYXNzIFRlc3RzVW5pdHMge1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUpIHtcclxuICAgIGlmIChnYW1lKSB7XHJcbiAgICAgIHRoaXMuZ2FtZSA9IGdhbWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkF1Y3VuZSBwYXJ0aWUgZm91cm5pdFwiKVxyXG4gICAgfVxyXG4gIH1cclxuICBsYXVuY2hUZXN0c1VuaXRzICgpIHtcclxuICAgIHRoaXMuZGVmYXVsdFRhaWxsZUhvcml6b250YWxlID0gdGhpcy5nYW1lLmdldFRhaWxsZUhvcml6b250YWxlKClcclxuICAgIHRoaXMuZGVmYXVsdFRhaWxsZVZlcnRpY2FsZSAgID0gdGhpcy5nYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcblxyXG4gICAgY29uc3QgbGlzdHNUZXN0c1VuaXRzID0gW11cclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQxKCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0MigpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDMoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQ0KCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0NSgpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDYoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQ3KCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0OCgpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDkoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQxMCgpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDExKCkpXHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxpc3RzVGVzdHNVbml0cy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgbGV0IGNvbG9yO1xyXG4gICAgICBpZiAobGlzdHNUZXN0c1VuaXRzW2luZGV4XSkge1xyXG4gICAgICAgIGNvbG9yID0gXCJncmVlblwiO1xyXG4gICAgICB9ICBlbHNlIHtcclxuICAgICAgICBjb2xvciA9IFwicmVkXCI7XHJcbiAgICAgIH1cclxuICAgICAgbGV0IG1lc3NhZ2UgPSBcIlRlc3QgXCIgKyAoaW5kZXggKyAxKSArIFwiIDogXCIgKyBsaXN0c1Rlc3RzVW5pdHNbaW5kZXhdICsgXCJcXG5cIjtcclxuICAgICAgdGhpcy5nYW1lLmxvZyhcIlRlc3RcIiwgbWVzc2FnZSwgY29sb3IpO1xyXG4gICAgICBcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICB0aGlzLnJlc2V0VGVzdHMoKTtcclxuICAgIFxyXG5cclxuICB9XHJcbiAgcmVzZXRUZXN0cygpIHtcclxuICAgIHRoaXMuZ2FtZS50YWlsbGVIb3Jpem9udGFsZUR1SmV1ID0gdGhpcy5kZWZhdWx0VGFpbGxlSG9yaXpvbnRhbGU7XHJcbiAgICB0aGlzLmdhbWUudGFpbGxlVmVydGljYWxlRHVKZXUgICA9IHRoaXMuZGVmYXVsdFRhaWxsZVZlcnRpY2FsZTtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICB9XHJcbiAgdGVzdFVuaXQxKCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7XCJwYXJhbWV0cmVzXCI6e1wieFwiOlwiN1wiLFwieVwiOlwiNVwifSxcImRhdGFzXCI6e1wicGlvbnNcIjp7XCJyZWRcIjpbWzQsNV0sWzMsNV0sWzIsNV0sWzYsNF0sWzMsNF0sWzQsNF0sWzcsNF0sWzMsM10sWzQsM10sWzcsM10sWzEsNF0sWzEsMl0sWzEsMV0sWzIsMV0sWzcsMl0sWzUsMl1dLFwieWVsbG93XCI6W1sxLDVdLFs2LDVdLFs1LDVdLFs3LDVdLFsyLDRdLFs1LDRdLFsyLDNdLFszLDJdLFs0LDJdLFs0LDFdLFsxLDNdLFs2LDNdLFsyLDJdLFs3LDFdLFs1LDNdXX19fVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuICAgIFxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzUsMl0sWzQsM10sWzMsNF0sWzIsNV1dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwneWVsbG93JykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3JlZCcpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0MigpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0ge1wicGFyYW1ldHJlc1wiOntcInhcIjpcIjdcIixcInlcIjpcIjVcIn0sXCJkYXRhc1wiOntcInBpb25zXCI6e1wicmVkXCI6W1sxLDVdLFszLDVdLFsyLDVdLFsyLDNdLFs1LDVdLFs3LDRdLFsyLDFdLFs1LDRdXSxcInllbGxvd1wiOltbNyw1XSxbNCw1XSxbMiw0XSxbNiw1XSxbMyw0XSxbMiwyXSxbNCw0XSxbMSw0XV19fX1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcbiAgICBcclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s0LDFdLFs0LDJdLFs0LDNdLFs0LDRdXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3JlZCcpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCd5ZWxsb3cnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDMoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHtcInBhcmFtZXRyZXNcIjp7XCJ4XCI6XCI3XCIsXCJ5XCI6XCI1XCJ9LFwiZGF0YXNcIjp7XCJwaW9uc1wiOntcInJlZFwiOltbMyw1XSxbNyw1XSxbMSw1XSxbNyw0XSxbNSw0XSxbNCwyXSxbMiw1XSxbMSw0XSxbMiwzXSxbNywyXSxbMiwyXSxbMywzXSxbMSwzXSxbNiw0XV0sXCJ5ZWxsb3dcIjpbWzQsNV0sWzUsNV0sWzMsNF0sWzQsNF0sWzQsM10sWzcsM10sWzQsMV0sWzIsNF0sWzYsNV0sWzcsMV0sWzUsM10sWzUsMl0sWzIsMV0sWzEsMl0sWzYsM11dfX19XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG4gICAgXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbMyw0XSxbMyw1XSxbMyw2XSxbMyw3XV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCdyZWQnKSAmJiBKU09OLnN0cmluZ2lmeShXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwneWVsbG93JykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbiAgdGVzdFVuaXQ0KCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7XCJwYXJhbWV0cmVzXCI6e1wieFwiOlwiN1wiLFwieVwiOlwiNVwifSxcImRhdGFzXCI6e1wicGlvbnNcIjp7XCJyZWRcIjpbWzUsNV0sWzUsNF0sWzMsNV0sWzQsNV0sWzEsNV0sWzEsNF0sWzQsM10sWzYsMl0sWzQsMl0sWzIsM10sWzUsMl0sWzcsM10sWzUsMV0sWzcsMV0sWzIsMl0sWzIsMV0sWzMsNF0sWzMsM11dLFwieWVsbG93XCI6W1s3LDVdLFs2LDVdLFs2LDRdLFsyLDVdLFs0LDRdLFs3LDRdLFs2LDNdLFs1LDNdLFsyLDRdLFs0LDFdLFs2LDFdLFsxLDNdLFs3LDJdLFsxLDJdLFsxLDFdLFszLDJdLFszLDFdXX19fVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuICAgIFxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3JlZCcpICYmICFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwneWVsbG93JykpXHJcbiAgfVxyXG4gIHRlc3RVbml0NSgpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0ge1wicGFyYW1ldHJlc1wiOntcInhcIjpcIjdcIixcInlcIjpcIjVcIn0sXCJkYXRhc1wiOntcInBpb25zXCI6e1wicmVkXCI6W1szLDVdLFs0LDVdLFsxLDVdLFs3LDVdLFs3LDRdLFs2LDJdLFs1LDVdLFs1LDRdLFs1LDJdLFsyLDJdLFsxLDRdLFs0LDNdLFs3LDNdLFs0LDJdLFszLDFdLFs3LDFdLFsxLDJdLFsxLDFdXSxcInllbGxvd1wiOltbNiw1XSxbNiw0XSxbMiw1XSxbMiw0XSxbNiwzXSxbMyw0XSxbNiwxXSxbNSwzXSxbMiwzXSxbNCw0XSxbMSwzXSxbMywzXSxbNywyXSxbMywyXSxbNCwxXSxbMiwxXSxbNSwxXV19fX1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcbiAgICBcclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCdyZWQnKSAmJiAhV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3llbGxvdycpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDYoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHtcInBhcmFtZXRyZXNcIjp7XCJ4XCI6XCI3XCIsXCJ5XCI6XCI1XCJ9LFwiZGF0YXNcIjp7XCJwaW9uc1wiOntcInJlZFwiOltbMyw1XSxbNyw0XSxbNCw1XSxbNSw0XSxbNCw0XSxbMSw0XSxbMyw0XSxbNCwzXSxbMywzXSxbNSwyXSxbNiw0XV0sXCJ5ZWxsb3dcIjpbWzcsNV0sWzUsNV0sWzcsM10sWzIsNV0sWzEsNV0sWzcsMl0sWzUsM10sWzIsNF0sWzQsMl0sWzMsMl0sWzYsNV1dfX19XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG4gICAgXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbNCwzXSxbNCw0XSxbNCw1XSxbNCw2XV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCd5ZWxsb3cnKSAmJiBKU09OLnN0cmluZ2lmeShXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwncmVkJykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbiAgdGVzdFVuaXQ3KCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7XCJwYXJhbWV0cmVzXCI6e1wieFwiOlwiN1wiLFwieVwiOlwiMTBcIn0sXCJkYXRhc1wiOntcInBpb25zXCI6e1wicmVkXCI6W1s2LDEwXSxbMiwxMF0sWzcsOV0sWzEsMTBdLFs1LDEwXSxbMyw5XSxbNiw4XSxbNiw2XSxbNiw1XSxbNyw3XSxbNSw4XSxbMyw3XSxbMyw2XSxbNCw4XSxbNiwzXSxbNCw3XSxbMSw4XSxbNCw1XSxbMiw2XSxbMiw0XSxbMyw0XSxbMywzXSxbMSw3XV0sXCJ5ZWxsb3dcIjpbWzcsMTBdLFszLDEwXSxbNiw5XSxbMiw5XSxbNCwxMF0sWzEsOV0sWzcsOF0sWzYsN10sWzQsOV0sWzIsOF0sWzUsOV0sWzMsOF0sWzcsNl0sWzUsN10sWzYsNF0sWzUsNl0sWzMsNV0sWzQsNl0sWzIsN10sWzIsNV0sWzQsNF0sWzYsMl0sWzcsNV0sWzEsNl1dfX19XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG4gICAgXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbOSw0XSxbOCwzXSxbNywyXSxbNiwxXV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCdyZWQnKSAmJiBKU09OLnN0cmluZ2lmeShXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwneWVsbG93JykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbiAgdGVzdFVuaXQ4KCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7XCJwYXJhbWV0cmVzXCI6e1wieFwiOlwiMTFcIixcInlcIjpcIjZcIn0sXCJkYXRhc1wiOntcInBpb25zXCI6e1wicmVkXCI6W1sxLDZdLFs1LDZdLFs3LDZdLFsyLDVdLFsxMSw2XSxbOSw2XSxbOSw1XSxbOCwzXSxbMyw0XSxbNCw2XSxbOSw0XV0sXCJ5ZWxsb3dcIjpbWzgsNl0sWzgsNV0sWzIsNl0sWzYsNl0sWzMsNl0sWzMsNV0sWzgsNF0sWzEsNV0sWzIsNF0sWzcsNV0sWzksM11dfX19XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG4gICAgXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbNiw2XSxbNSw3XSxbNCw4XSxbMyw5XV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCdyZWQnKSAmJiBKU09OLnN0cmluZ2lmeShXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwneWVsbG93JykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbiAgdGVzdFVuaXQ5KCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7XCJwYXJhbWV0cmVzXCI6e1wieFwiOlwiNFwiLFwieVwiOlwiNFwifSxcImRhdGFzXCI6e1wicGlvbnNcIjp7XCJyZWRcIjpbWzQsNF0sWzIsNF0sWzQsMl0sWzIsM10sWzQsMV0sWzIsMV0sWzEsMl0sWzMsMV1dLFwieWVsbG93XCI6W1sxLDRdLFs0LDNdLFszLDRdLFszLDNdLFsyLDJdLFsxLDNdLFszLDJdLFsxLDFdXX19fVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuICAgIFxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3JlZCcpICYmICFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwneWVsbG93JykpXHJcbiAgfVxyXG4gIHRlc3RVbml0MTAoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHtcInBhcmFtZXRyZXNcIjp7XCJ4XCI6XCI0XCIsXCJ5XCI6XCI0XCJ9LFwiZGF0YXNcIjp7XCJwaW9uc1wiOntcInJlZFwiOltbMiw0XSxbMyw0XSxbMiwyXSxbMiwxXSxbMSwzXSxbNCwyXV0sXCJ5ZWxsb3dcIjpbWzQsNF0sWzQsM10sWzIsM10sWzEsNF0sWzMsM10sWzMsMl0sWzQsMV1dfX19XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG4gICAgXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbNCwxXSxbMywyXSxbMiwzXSxbMSw0XV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCdyZWQnKSAmJiBKU09OLnN0cmluZ2lmeShXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwneWVsbG93JykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbiAgdGVzdFVuaXQxMSgpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0ge1wicGFyYW1ldHJlc1wiOntcInhcIjpcIjhcIixcInlcIjpcIjdcIn0sXCJkYXRhc1wiOntcInBpb25zXCI6e1wicmVkXCI6W1sxLDddLFs2LDddLFs0LDZdLFs4LDZdLFszLDZdLFs3LDddLFs3LDZdLFs3LDVdLFs1LDddLFsyLDddLFs1LDZdLFs1LDVdLFs1LDNdLFs3LDNdLFs2LDVdXSxcInllbGxvd1wiOltbOCw3XSxbMyw3XSxbNCw3XSxbNCw1XSxbNCw0XSxbMSw2XSxbOCw1XSxbOCw0XSxbNyw0XSxbMyw1XSxbNiw2XSxbMiw2XSxbNSw0XSxbMyw0XSxbNywyXSxbNiw0XV19fX1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcbiAgICBcclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s0LDNdLFs0LDRdLFs0LDVdLFs0LDZdXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3JlZCcpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCd5ZWxsb3cnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxufSIsImV4cG9ydCBjbGFzcyBVdGlscyB7XHJcbiAgc3RhdGljIGdldEVudGllckFsZWF0b2lyZShtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKTtcclxuICB9XHJcbiAgXHJcbiAgc3RhdGljIGdldEVsZW1lbnRBbGVhdG9pcmUobGlzdGUpIHtcclxuICAgIGxldCBsb25ndWV1ckxpc3RlID0gbGlzdGUubGVuZ3RoO1xyXG4gICAgbGV0IGVudGllckFsZWF0b2lyZUluZGV4ZVBhckxpc3RlID0gVXRpbHMuZ2V0RW50aWVyQWxlYXRvaXJlKDAsIGxvbmd1ZXVyTGlzdGUpO1xyXG4gICAgcmV0dXJuIGxpc3RlW2VudGllckFsZWF0b2lyZUluZGV4ZVBhckxpc3RlXTtcclxuICB9XHJcbiAgXHJcbiAgc3RhdGljIGFycmF5MkRDb250YWluc0FycmF5KGFycmF5MkQsIGFycmF5U2VhcmNoKSB7XHJcbiAgICBsZXQgaXRlbVN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGFycmF5U2VhcmNoKTtcclxuICAgIGxldCBjb250YWlucyA9IGFycmF5MkQuc29tZShmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShlbGVtZW50KSA9PT0gaXRlbVN0cmluZztcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNvbnRhaW5zO1xyXG4gIH1cclxuICBcclxuICBzdGF0aWMgZ2V0SW5kZXhPZjJEQXJyYXkoYXJyYXkyRCwgaW5kZXgpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkyRC5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgY3VycmVudEFycmF5ID0gYXJyYXkyRFtpXTtcclxuICAgICAgaWYgKGN1cnJlbnRBcnJheVswXSA9PSBpbmRleFswXSAmJiBjdXJyZW50QXJyYXlbMV0gPT0gaW5kZXhbMV0pIHtcclxuICAgICAgICByZXR1cm4gaTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldENvdWxldXJFcXVpcGVBbGVhdG9pcmUoKSB7XHJcbiAgICBsZXQgbGlzdGVEZUNvdWxldXJzID0gW1wieWVsbG93XCIsIFwicmVkXCJdO1xyXG4gICAgbGV0IG5vbWJyZUFsZWF0b2lyZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxpc3RlRGVDb3VsZXVycy5sZW5ndGgpO1xyXG4gICAgcmV0dXJuIGxpc3RlRGVDb3VsZXVyc1tub21icmVBbGVhdG9pcmVdO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldENvdWxldXJFcXVpcGVBZHZlcnNlKGNvdWxldXJFcXVpcGVBY3R1ZWxsZSkge1xyXG4gICAgaWYgKGNvdWxldXJFcXVpcGVBY3R1ZWxsZSA9PSAncmVkJykge1xyXG4gICAgICByZXR1cm4gJ3llbGxvdyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJ3JlZCc7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBXaW5uZXJNYW5hZ2VyIHtcclxuICBzdGF0aWMgdmVyaWZXaW4oZ2FtZSwgY29sb3IpIHtcclxuICAgIGxldCB2ZXJpZmljYXRpb24gPSBDaGVja0lmV2lubmVyLmhvcml6b250YWwoZ2FtZSwgY29sb3IpO1xyXG4gICAgaWYgKHZlcmlmaWNhdGlvbikge1xyXG4gICAgICByZXR1cm4gdmVyaWZpY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgdmVyaWZpY2F0aW9uID0gQ2hlY2tJZldpbm5lci52ZXJ0aWNhbChnYW1lLCBjb2xvcik7XHJcbiAgICBpZiAodmVyaWZpY2F0aW9uKSB7XHJcbiAgICAgIHJldHVybiB2ZXJpZmljYXRpb247XHJcbiAgICB9XHJcbiAgICB2ZXJpZmljYXRpb24gPSBDaGVja0lmV2lubmVyLmRpYWdvbmFsVG9wTGVmdChnYW1lLCBjb2xvcik7XHJcbiAgICBpZiAodmVyaWZpY2F0aW9uKSB7XHJcbiAgICAgIHJldHVybiB2ZXJpZmljYXRpb247XHJcbiAgICB9XHJcbiAgICB2ZXJpZmljYXRpb24gPSBDaGVja0lmV2lubmVyLmRpYWdvbmFsVG9wUmlnaHQoZ2FtZSwgY29sb3IpO1xyXG4gICAgaWYgKHZlcmlmaWNhdGlvbikge1xyXG4gICAgICByZXR1cm4gdmVyaWZpY2F0aW9uO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHZlcmlmSWZQaW9uUGxhY2VkR2l2ZVdpbihnYW1lLCBudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGUsIGNvdWxldXJQaW9uKSB7XHJcbiAgICBnYW1lLnNldFBpb24oY291bGV1clBpb24sIFtudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGVdKVxyXG4gICAgY29uc3QgaXNXaW5uZXIgPSBXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKGdhbWUsIGNvdWxldXJQaW9uKVxyXG4gICAgZ2FtZS5yZW1vdmVQaW9uKGNvdWxldXJQaW9uLCBbbnVtZXJvQ29sb25uZUhvcml6b250YWxlLCBudW1lcm9Db2xvbm5lVmVydGljYWxlXSlcclxuICAgIHJldHVybiBpc1dpbm5lcjtcclxuICB9XHJcblxyXG59IiwiaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL0dhbWVcIlxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFqb3V0ZVVuUGlvbkRhbnNCZGQocHgsIHB5LCBjb2xvcikge1xyXG4gIGxldCBnYW1lSWQgPSA0O1xyXG4gICQucG9zdChcIi9hcGkvcGlvbnMvc2V0TGlzdC9cIiwge1xyXG4gICAgICBpZDogZ2FtZUlkLFxyXG4gICAgICBQeDpweCxcclxuICAgICAgUHk6cHksXHJcbiAgICAgIENvbG9yOmNvbG9yXHJcbiAgICB9KVxyXG4gICAgLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0ZXN0c1VuaXRzKCkge1xyXG4gIGxhbmNlVGVzdHNVbml0cyA9IG5ldyBUZXN0c1VuaXRzKGdhbWUpO1xyXG4gIGxhbmNlVGVzdHNVbml0cy5sYXVuY2hUZXN0c1VuaXRzKClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBsYXlHYW1lIChnYW1lKSB7XHJcbiAgY29uc29sZS5sb2coZ2FtZSlcclxuICBnYW1lLnBsYXlHYW1lKClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxhbmNlVW5lUGFydGllRGVSb2JvdHMoKSB7XHJcbiAgY29uc3Qgcm9ib3RNYW5hZ2VyID0gUm9ib3RNYW5hZ2VyLmdldFJvYm90TWFuYWdlcihnYW1lKVxyXG4gIHJvYm90TWFuYWdlci5sYW5jZVVuZVBhcnRpZURlUm9ib3RzKClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5QYXJhbSAoKSB7XHJcbiAgJCgnI2RpYWxvZycpLnJlbW92ZUNsYXNzKCdkLW5vbmUnKVxyXG4gICQoXCIjZGlhbG9nXCIpLmRpYWxvZyh7XHJcbiAgICByZXNpemFibGU6IGZhbHNlLFxyXG4gICAgaGVpZ2h0OiBcImF1dG9cIixcclxuICAgIHdpZHRoOiA0MDAsXHJcbiAgICBtb2RhbDogdHJ1ZSxcclxuICAgIGJ1dHRvbnM6IHtcclxuICAgICAgXCJWYWxpZGVyXCI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQgKCBcIiNwYXJhbWV0ZXJzVmFsdWVzXCIgKS5zdWJtaXQoKVxyXG4gICAgICAgICQoIHRoaXMgKS5kaWFsb2coIFwiY2xvc2VcIiApXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiRmVybWVyXCI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoIHRoaXMgKS5kaWFsb2coIFwiY2xvc2VcIiApXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZFBhcmFtICgpIHtcclxuICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShcclxuICAgICc/eD0nICsgJCgnI25iQ2FzZVgnKS52YWwoKSArICcmeT0nICsgJCgnI25iQ2FzZVknKS52YWwoKVxyXG4gIClcclxufVxyXG4iLCJpbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vR2FtZVwiXHJcblxyXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgkKSB7XHJcbiAgY29uc3QgZ2FtZSA9IEdhbWUuZ2V0R2FtZSgpXHJcbiAgICAkKFwiaHRtbFwiKS5vbihcImtleWRvd25cIiwgXCJib2R5XCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGlmIChnYW1lLm1vblRvdXIuZ2V0KCkpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSBldmVudC5rZXlDb2RlO1xyXG4gICAgICAgIGlmICgkKFwiI2dhbWUgLnJvdyAuaWNvbltzdXJicmlsbGFuY2U9J3JlZCddXCIpLmxlbmd0aCA+PSAxICYmICFnYW1lLmlzRHJhdygpKSB7XHJcbiAgICAgICAgICBjb25zdCBwaW9uRW5TdXJicmlsbGFuY2UgPSAkKFwiI2dhbWUgLnJvdyAuaWNvbltzdXJicmlsbGFuY2U9J3JlZCddXCIpO1xyXG4gICAgICAgICAgbGV0IGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPSBwYXJzZUludChwaW9uRW5TdXJicmlsbGFuY2UuYXR0cihcImNhc2VcIikpO1xyXG4gICAgICAgICAgaWYgKGluZGV4SG9yaXpvbnRhbGVEdVBpb24pIHtcclxuICAgICAgICAgICAgJChcIiNnYW1lIC5yb3cgLmljb25cIikubW91c2VvdXQoKTtcclxuICAgICAgICAgICAgaWYgKGtleSA9PSAzOSkge1xyXG4gICAgICAgICAgICAgIC8vIGZsw6hjaGUgZHJvaXRlIDogc2ltdWxhdGlvbiDDoCBkcm9pdGVcclxuICAgICAgICAgICAgICBpbmRleEhvcml6b250YWxlRHVQaW9uKys7XHJcbiAgICAgICAgICAgICAgaWYgKGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPj0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpICsgMSkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA9IDE7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHdoaWxlICghZ2FtZS5nZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpLmluY2x1ZGVzKGluZGV4SG9yaXpvbnRhbGVEdVBpb24pICYmICFnYW1lLmlzRHJhdygpICYmIGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPD0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleEhvcml6b250YWxlRHVQaW9uKys7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA+PSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKCkgKyAxKSB7XHJcbiAgICAgICAgICAgICAgICAgIGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAkKFwiI2dhbWUgLnJvd1t2YWw9JzEnXSAuaWNvbltjYXNlPSdcIiArIGluZGV4SG9yaXpvbnRhbGVEdVBpb24gKyBcIiddXCIpLm1vdXNlb3ZlcigpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PSAzNykge1xyXG4gICAgICAgICAgICAgIC8vIGZsw6hjaGUgZ2F1Y2hlIDogc2ltdWxhdGlvbiDDoCBnYXVjaGVcclxuICAgICAgICAgICAgICBpbmRleEhvcml6b250YWxlRHVQaW9uLS07XHJcbiAgICAgICAgICAgICAgaWYgKGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5kZXhIb3Jpem9udGFsZUR1UGlvbilcclxuICAgICAgICAgICAgICB3aGlsZSAoIWdhbWUuZ2V0TGVzQ29sb25uZXNOb25Db21wbGV0ZXMoKS5pbmNsdWRlcyhpbmRleEhvcml6b250YWxlRHVQaW9uKSAmJiAhZ2FtZS5pc0RyYXcoKSAmJiBpbmRleEhvcml6b250YWxlRHVQaW9uID49IDApIHtcclxuICAgICAgICAgICAgICAgIGluZGV4SG9yaXpvbnRhbGVEdVBpb24tLTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleEhvcml6b250YWxlRHVQaW9uIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5kZXhIb3Jpem9udGFsZUR1UGlvbilcclxuICAgICAgICAgICAgICAkKCBcIiNnYW1lIC5yb3dbdmFsPScxJ10gLmljb25bY2FzZT0nXCIgKyBpbmRleEhvcml6b250YWxlRHVQaW9uICsgXCInXVwiKS5tb3VzZW92ZXIoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT0gMTMgfHwga2V5ID09IDM4KSB7XHJcbiAgICAgICAgICAgICAgLy8gdG91Y2hlIGVudHLDqSBvdSBmbMOoY2hlIGhhdXQgOiBzaW11bGF0aW9uIGQndW4gY2xpY2tcclxuICAgICAgICAgICAgICAkKHBpb25FblN1cmJyaWxsYW5jZSkuY2xpY2soKTtcclxuICAgICAgICAgICAgICBpZiAoIWdhbWUuZ2V0TGVzQ29sb25uZXNOb25Db21wbGV0ZXMoKS5pbmNsdWRlcyhpbmRleEhvcml6b250YWxlRHVQaW9uKSkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXhIb3Jpem9udGFsZUR1UGlvbisrXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA+PSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKCkgKyAxKSB7XHJcbiAgICAgICAgICAgICAgICAgIGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgd2hpbGUgKCFnYW1lLmdldExlc0NvbG9ubmVzTm9uQ29tcGxldGVzKCkuaW5jbHVkZXMoaW5kZXhIb3Jpem9udGFsZUR1UGlvbikgJiYgIWdhbWUuaXNEcmF3KCkgJiYgaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA8PSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgaW5kZXhIb3Jpem9udGFsZUR1UGlvbisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJChcIiNnYW1lIC5yb3dbdmFsPScxJ10gLmljb25bY2FzZT0nXCIgKyBpbmRleEhvcml6b250YWxlRHVQaW9uICsgXCInXVwiKS5tb3VzZW92ZXIoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJChcIiNnYW1lIC5yb3cgLmljb25cIikubW91c2VvdXQoKTtcclxuICAgICAgICAgIGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPSAxO1xyXG4gICAgICAgICAgd2hpbGUgKCFnYW1lLmdldExlc0NvbG9ubmVzTm9uQ29tcGxldGVzKCkuaW5jbHVkZXMoaW5kZXhIb3Jpem9udGFsZUR1UGlvbikgJiYgIWdhbWUuaXNEcmF3KCkgJiYgaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA8PSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKCkpIHtcclxuICAgICAgICAgICAgaW5kZXhIb3Jpem9udGFsZUR1UGlvbisrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgJChcIiNnYW1lIC5yb3dbdmFsPScxJ10gLmljb25bY2FzZT0nXCIgKyBpbmRleEhvcml6b250YWxlRHVQaW9uICsgXCInXVwiKS5tb3VzZW92ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJChcIiNib3hcIikub24oJ2NsaWNrJywgJyNnYW1lIC5pY29uJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmIChnYW1lLm1vblRvdXIuZ2V0KCkpIHtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbkhvcml6b250YWxlID0gZ2FtZS5nZXRQb3NpdGlvbkhvcml6b250YWxlKCQodGhpcykpXHJcbiAgICAgICAgZ2FtZS5hZGRQaW9uKHBvc2l0aW9uSG9yaXpvbnRhbGUpO1xyXG4gICAgICAgIGdhbWUuc2VsZWN0KHBvc2l0aW9uSG9yaXpvbnRhbGUpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgJChcIiNib3hcIikub24oJ21vdXNlb3ZlcicsICcjZ2FtZSAuaWNvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAoZ2FtZS5tb25Ub3VyLmdldCgpKSB7XHJcbiAgICAgICAgZ2FtZS5zZWxlY3QoZ2FtZS5nZXRQb3NpdGlvbkhvcml6b250YWxlKCQodGhpcykpKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgICQoXCIjYm94XCIpLm9uKCdtb3VzZW91dCcsICcjZ2FtZSAuaWNvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAoZ2FtZS5tb25Ub3VyLmdldCgpKSB7XHJcbiAgICAgICAgZ2FtZS51blNlbGVjdCgpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0pOyIsImZ1bmN0aW9uIHdlYnBhY2tFbXB0eUNvbnRleHQocmVxKSB7XG5cdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHR0aHJvdyBlO1xufVxud2VicGFja0VtcHR5Q29udGV4dC5rZXlzID0gKCkgPT4gKFtdKTtcbndlYnBhY2tFbXB0eUNvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG53ZWJwYWNrRW1wdHlDb250ZXh0LmlkID0gMTI7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vbW9kdWxlcy9HYW1lXCJcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc29sZS5sb2coZ2V0R2FtZShHYW1lKSlcclxufSlcclxuXHJcblxyXG5mdW5jdGlvbiByZXF1aXJlQWxsKHIpIHsgci5rZXlzKCkuZm9yRWFjaChyKTsgfVxyXG5yZXF1aXJlQWxsKHJlcXVpcmUuY29udGV4dCgnLi9tb2R1bGVzLycsIHRydWUsIC9cXC5qcyQvKSk7XHJcbnJlcXVpcmVBbGwocmVxdWlyZS5jb250ZXh0KCcuL21vZHVsZXMvJywgdHJ1ZSwgL1xcLnRzJC8pKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=