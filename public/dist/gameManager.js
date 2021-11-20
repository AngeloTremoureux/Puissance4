/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Game": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _MonTour__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _WinnerManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _RobotManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);





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
  static getGame() {
    if (Game.game) {
      return Game.game
    } else {
      const tailleHorizontaleParsed = this.getTailleHorizontaleFromUrl()
      const tailleVerticaleParsed = this.getTailleVerticaleFromUrl()
      return new Game(tailleHorizontaleParsed, tailleVerticaleParsed)

    }
  }
  static getTailleHorizontaleFromUrl() {
    const paramsUrl = _Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.parseURLParams(window.location.href)
    if (typeof paramsUrl !== 'undefined' && paramsUrl.tailleHorizontale !== 'undefined') {
      const tailleHorizontale = paramsUrl.tailleHorizontale[0];
      if (parseInt(tailleHorizontale)) {
        const tailleHorizontaleParsed = parseInt(tailleHorizontale)
        if (tailleHorizontaleParsed >= 4 && tailleHorizontaleParsed <= 20) {
          return tailleHorizontaleParsed
        } else {
          return 7;
        }
      } else {
        return 7;
      }
    } else {
      return 7;
    }
  }
  static getTailleVerticaleFromUrl() {
    const paramsUrl = _Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.parseURLParams(window.location.href)
    if (typeof paramsUrl !== 'undefined' && paramsUrl.tailleVerticale !== 'undefined') {
      const tailleVerticale = paramsUrl.tailleVerticale[0];
      if (parseInt(tailleVerticale)) {
        const tailleVerticaleParsed = parseInt(tailleVerticale)
        if (tailleVerticaleParsed >= 4 && tailleVerticaleParsed <= 20) {
          return tailleVerticaleParsed
        } else {
          return 5;
        }
      } else {
        return 5;
      }
    } else {
      return 5;
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
    const listePionsRouge = this.getPions(1)
    const listePionsJaune = this.getPions(2)

    if (_Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.array2DContainsArray(listePionsRouge, [indexHorizontale, indexVerticale])) {
      return 'red';
    }
    else if (_Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.array2DContainsArray(listePionsJaune, [indexHorizontale, indexVerticale])) {
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
  playGame() {
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
        if (!_Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.array2DContainsArray(this.getPions(1), [numeroColonneHorizontale, numeroColonneVerticale])
          && !_Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.array2DContainsArray(this.getPions(2), [numeroColonneHorizontale, numeroColonneVerticale])) {
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
    params['red'] = this.getPions('red')
    params['yellow'] = this.getPions('yellow')
    const red = params['red'];
    const yellow = params['yellow'];
    const request = $.ajax({
      type: 'POST',
      url: "api/export?x=" + this.tailleHorizontaleDuJeu + "&y=" + this.tailleVerticaleDuJeu,
      data: { red: red, yellow: yellow },
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
      this.log("Puissance 4", "Echec lors de l'export (" + code + ")");
    });
  }
  unSelect() {
    $(".row .icon").attr("surbrillance", "");
  }
  setMessage(message) {
    $("#game p#tour").text(message);
  }
  import(gameObject, parameters) {
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
      let gagnantRouge = _WinnerManager__WEBPACK_IMPORTED_MODULE_2__.WinnerManager.verifWin(this, "red");
      let gagnantJaune = _WinnerManager__WEBPACK_IMPORTED_MODULE_2__.WinnerManager.verifWin(this, "yellow");
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
        let indexHorizontale = pionsGagnants[i][1]
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
  log(prefix, message, colorText) {
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
    let Px = this.tailleHorizontaleDuJeu;
    let Py = this.tailleVerticaleDuJeu;
    for (let i = 1; i <= this.tailleVerticaleDuJeu; i++) {
      let rowY = '<div class="row" val="' + i + '"></div>';
      $("#game").append(rowY);
      for (let j = 1; j <= this.tailleHorizontaleDuJeu; j++) {
        $('.row[val="' + i + '"]').append(this.searchPiece(null, j));
      }
    }
  }
  forceAddPion(positionHorizontale, positionVerticale, couleur) {
    $(".row[val='" + positionVerticale + "'] .icon[case='" + positionHorizontale + "']").replaceWith(this.searchPiece(couleur, positionHorizontale));
    $(".row[val='" + positionVerticale + "'] .icon[case='" + positionHorizontale + "']").attr("team", couleur);
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
          let lesPionsGagnants = _WinnerManager__WEBPACK_IMPORTED_MODULE_2__.WinnerManager.verifWin(this, "red");
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
              const robotManager = _RobotManager__WEBPACK_IMPORTED_MODULE_3__.RobotManager.getRobotManager(game)
              if (robotManager.robotPlaceUnPion("yellow")) {
                game.setMessage("Tu as perdu la partie !");
                game.log("Puissance 4", "Perdu !");
                game.monTour.set(false);
                game.unSelect();
              } else {
                if (game.getColorOfPionPlaced(indexHorizontaleClicked, indexVerticale + 1)) {
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
  removePion(team, value) {
    let index;
    if (team == 1 || team == 'red') {
      index = _Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.getIndexOf2DArray(this.listePionsRouge, value)
      this.listePionsRouge.splice(index, 1)
    } else if (team == 2 || team == 'yellow') {
      index = _Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.getIndexOf2DArray(this.listePionsJaune, value)
      this.listePionsJaune.splice(index, 1)
    } else {
      throw "Le joueur est introuvable";
    }
  }
  clearPions() {
    this.listePionsRouge = [];
    this.listePionsJaune = [];
    this.log("Puissance 4", "Les données des pions ont été effacés");
  }
  getPions(team) {
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

  static parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
  }
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WinnerManager": () => (/* binding */ WinnerManager)
/* harmony export */ });
/* harmony import */ var _CheckIfWinner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


class WinnerManager {
  static verifWin(game, color) {
    let verification = _CheckIfWinner__WEBPACK_IMPORTED_MODULE_0__.CheckIfWinner.horizontal(game, color);
    if (verification) {
      return verification;
    }
    verification = _CheckIfWinner__WEBPACK_IMPORTED_MODULE_0__.CheckIfWinner.vertical(game, color);
    if (verification) {
      return verification;
    }
    verification = _CheckIfWinner__WEBPACK_IMPORTED_MODULE_0__.CheckIfWinner.diagonalTopLeft(game, color);
    if (verification) {
      return verification;
    }
    verification = _CheckIfWinner__WEBPACK_IMPORTED_MODULE_0__.CheckIfWinner.diagonalTopRight(game, color);
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
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RobotManager": () => (/* binding */ RobotManager)
/* harmony export */ });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _WinnerManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);



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
      console.log("g:" + game);
      return new RobotManager(game)
    }
  }

  lanceUnePartieDeRobots() {
    this.game.setMessage("Robot Vs. Robot");
    this.game.resetGame()
    this.game.enableGame()
    this.game.monTour.set(false)
    // On choisis une équipe qui commence aléatoirement
    const color = _Utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getCouleurEquipeAleatoire();
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
        that.robotVsRobot(_Utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getCouleurEquipeAdverse(color))
      }, 5)
    }
  }

  robotPlaceUnPion(color) {
    const game = this.game;
    // On récupère la liste des colonnes qui n'ont pas leurs
    // colonnes complétés.
    const listeColonnesNonCompletes = game.getLesColonnesNonCompletes();
    let colonneChoisitAleatoirement = _Utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getElementAleatoire(listeColonnesNonCompletes);
    const lesCasesPouvantEtreJouer  = game.getLesCasesPouvantEtreJouer();
    lesCasesPouvantEtreJouer.forEach(casePouvantEtreJouer => {
      let indiceHorizontale = casePouvantEtreJouer[0];
      let indiceVerticale   = casePouvantEtreJouer[1];
      if (_WinnerManager__WEBPACK_IMPORTED_MODULE_1__.WinnerManager.verifIfPionPlacedGiveWin(game, indiceHorizontale, indiceVerticale, color)) {
        colonneChoisitAleatoirement = indiceHorizontale;
      }
      else if (_WinnerManager__WEBPACK_IMPORTED_MODULE_1__.WinnerManager.verifIfPionPlacedGiveWin(game, indiceHorizontale, indiceVerticale, _Utils__WEBPACK_IMPORTED_MODULE_0__.Utils.getCouleurEquipeAdverse(color))) {
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
          const isWinner = _WinnerManager__WEBPACK_IMPORTED_MODULE_1__.WinnerManager.verifWin(this.game, color);
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
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
/* harmony import */ var _TestsUnits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _RobotManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);




function ajouteUnPionDansBdd(px, py, color) {
  let gameId = 4;
  $.post("/api/pions/setList/", {
    id: gameId,
    Px: px,
    Py: py,
    Color: color
  })
    .done(function (data) {
    });
}

function testsUnits() {
  lanceTestsUnits = new _TestsUnits__WEBPACK_IMPORTED_MODULE_1__.TestsUnits(_Game__WEBPACK_IMPORTED_MODULE_0__.Game.getGame());
  lanceTestsUnits.launchTestsUnits()
}

function playGame() {
  _Game__WEBPACK_IMPORTED_MODULE_0__.Game.getGame().playGame()
}

function lanceUnePartieDeRobots() {
  const robotManager = _RobotManager__WEBPACK_IMPORTED_MODULE_2__.RobotManager.getRobotManager(_Game__WEBPACK_IMPORTED_MODULE_0__.Game.getGame())
  robotManager.lanceUnePartieDeRobots()
}

function openParam() {
  $('#dialog').removeClass('d-none')
  $("#dialog").dialog({
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    buttons: {
      "Valider": function () {
        $("#parametersValues").submit()
        $(this).dialog("close")
      },
      "Fermer": function () {
        $(this).dialog("close")
      }
    }
  })
}

function loadParam() {
  window.location.replace(
    '?x=' + $('#nbCaseX').val() + '&y=' + $('#nbCaseY').val()
  )
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL0dhbWUuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL01vblRvdXIuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL1V0aWxzLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9XaW5uZXJNYW5hZ2VyLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9DaGVja0lmV2lubmVyLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9Sb2JvdE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL1Rlc3RzVW5pdHMuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9nYW1lX21hbmFnZXIuaW5jLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vblRvdXIgfSBmcm9tIFwiLi9Nb25Ub3VyXCJcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBXaW5uZXJNYW5hZ2VyIH0gZnJvbSBcIi4vV2lubmVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBSb2JvdE1hbmFnZXIgfSBmcm9tIFwiLi9Sb2JvdE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lIHtcclxuICBjb25zdHJ1Y3Rvcih0YWlsbGVIb3Jpem9udGFsZSwgdGFpbGxlVmVydGljYWxlKSB7XHJcbiAgICB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXUgPSB0YWlsbGVIb3Jpem9udGFsZTtcclxuICAgIHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXUgPSB0YWlsbGVWZXJ0aWNhbGU7XHJcbiAgICB0aGlzLmxpc3RlUGlvbnNSb3VnZSA9IG5ldyBBcnJheSgpO1xyXG4gICAgdGhpcy5saXN0ZVBpb25zSmF1bmUgPSBuZXcgQXJyYXkoKTtcclxuICAgIHRoaXMubW9uVG91ciA9IG5ldyBNb25Ub3VyKClcclxuICAgIHRoaXMuZGlzYWJsZUdhbWUoKVxyXG4gICAgdGhpcy5sb2coXHJcbiAgICAgIFwiUHVpc3NhbmNlIDRcIixcclxuICAgICAgXCJJbml0aWFsaXNhdGlvbiBkdSBqZXUgZW4gXCIgKyB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXUgKyBcInhcIiArIHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXVcclxuICAgICk7XHJcbiAgICBHYW1lLmdhbWUgPSB0aGlzO1xyXG4gIH1cclxuICBzdGF0aWMgZ2V0R2FtZSgpIHtcclxuICAgIGlmIChHYW1lLmdhbWUpIHtcclxuICAgICAgcmV0dXJuIEdhbWUuZ2FtZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGVQYXJzZWQgPSB0aGlzLmdldFRhaWxsZUhvcml6b250YWxlRnJvbVVybCgpXHJcbiAgICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZVBhcnNlZCA9IHRoaXMuZ2V0VGFpbGxlVmVydGljYWxlRnJvbVVybCgpXHJcbiAgICAgIHJldHVybiBuZXcgR2FtZSh0YWlsbGVIb3Jpem9udGFsZVBhcnNlZCwgdGFpbGxlVmVydGljYWxlUGFyc2VkKVxyXG5cclxuICAgIH1cclxuICB9XHJcbiAgc3RhdGljIGdldFRhaWxsZUhvcml6b250YWxlRnJvbVVybCgpIHtcclxuICAgIGNvbnN0IHBhcmFtc1VybCA9IFV0aWxzLnBhcnNlVVJMUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXNVcmwgIT09ICd1bmRlZmluZWQnICYmIHBhcmFtc1VybC50YWlsbGVIb3Jpem9udGFsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGUgPSBwYXJhbXNVcmwudGFpbGxlSG9yaXpvbnRhbGVbMF07XHJcbiAgICAgIGlmIChwYXJzZUludCh0YWlsbGVIb3Jpem9udGFsZSkpIHtcclxuICAgICAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZVBhcnNlZCA9IHBhcnNlSW50KHRhaWxsZUhvcml6b250YWxlKVxyXG4gICAgICAgIGlmICh0YWlsbGVIb3Jpem9udGFsZVBhcnNlZCA+PSA0ICYmIHRhaWxsZUhvcml6b250YWxlUGFyc2VkIDw9IDIwKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGFpbGxlSG9yaXpvbnRhbGVQYXJzZWRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIDc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiA3O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gNztcclxuICAgIH1cclxuICB9XHJcbiAgc3RhdGljIGdldFRhaWxsZVZlcnRpY2FsZUZyb21VcmwoKSB7XHJcbiAgICBjb25zdCBwYXJhbXNVcmwgPSBVdGlscy5wYXJzZVVSTFBhcmFtcyh3aW5kb3cubG9jYXRpb24uaHJlZilcclxuICAgIGlmICh0eXBlb2YgcGFyYW1zVXJsICE9PSAndW5kZWZpbmVkJyAmJiBwYXJhbXNVcmwudGFpbGxlVmVydGljYWxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgPSBwYXJhbXNVcmwudGFpbGxlVmVydGljYWxlWzBdO1xyXG4gICAgICBpZiAocGFyc2VJbnQodGFpbGxlVmVydGljYWxlKSkge1xyXG4gICAgICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZVBhcnNlZCA9IHBhcnNlSW50KHRhaWxsZVZlcnRpY2FsZSlcclxuICAgICAgICBpZiAodGFpbGxlVmVydGljYWxlUGFyc2VkID49IDQgJiYgdGFpbGxlVmVydGljYWxlUGFyc2VkIDw9IDIwKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGFpbGxlVmVydGljYWxlUGFyc2VkXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiA1O1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gNTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIDU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNlYXJjaFBpZWNlKGNvdWxldXIsIGluaXRDYXNlKSB7XHJcbiAgICBjb25zdCByZWRDaXJjbGUgPSAkKCcjcHJldmlldyAjcmVkX2NpcmNsZScpXHJcbiAgICBjb25zdCB5ZWxsb3dDaXJjbGUgPSAkKCcjcHJldmlldyAjeWVsbG93X2NpcmNsZScpXHJcbiAgICBjb25zdCBkZWZhdWx0Q2lyY2xlID0gJCgnI3ByZXZpZXcgI2Jhc2ljX2NpcmNsZScpXHJcbiAgICBpZiAoaW5pdENhc2UpIHtcclxuICAgICAgaWYgKGNvdWxldXIgPT09ICdyZWQnKSB7XHJcbiAgICAgICAgJChyZWRDaXJjbGUpLmNoaWxkcmVuKCkuY2hpbGRyZW4oKS5hdHRyKCdjYXNlJywgaW5pdENhc2UpXHJcbiAgICAgICAgcmV0dXJuICQocmVkQ2lyY2xlKS5odG1sKClcclxuICAgICAgfSBlbHNlIGlmIChjb3VsZXVyID09PSAneWVsbG93Jykge1xyXG4gICAgICAgICQoeWVsbG93Q2lyY2xlKS5jaGlsZHJlbigpLmNoaWxkcmVuKCkuYXR0cignY2FzZScsIGluaXRDYXNlKVxyXG4gICAgICAgIHJldHVybiAkKHllbGxvd0NpcmNsZSkuaHRtbCgpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJChkZWZhdWx0Q2lyY2xlKS5jaGlsZHJlbigpLmNoaWxkcmVuKCkuYXR0cignY2FzZScsIGluaXRDYXNlKVxyXG4gICAgICAgIHJldHVybiAkKGRlZmF1bHRDaXJjbGUpLmh0bWwoKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoY291bGV1ciA9PT0gJ3JlZCcpIHtcclxuICAgICAgICByZXR1cm4gJChyZWRDaXJjbGUpLmh0bWwoKVxyXG4gICAgICB9IGVsc2UgaWYgKGNvdWxldXIgPT09ICd5ZWxsb3cnKSB7XHJcbiAgICAgICAgcmV0dXJuICQoeWVsbG93Q2lyY2xlKS5odG1sKClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gJChkZWZhdWx0Q2lyY2xlKS5odG1sKClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRDb2xvck9mUGlvblBsYWNlZChpbmRleEhvcml6b250YWxlLCBpbmRleFZlcnRpY2FsZSkge1xyXG4gICAgY29uc3QgbGlzdGVQaW9uc1JvdWdlID0gdGhpcy5nZXRQaW9ucygxKVxyXG4gICAgY29uc3QgbGlzdGVQaW9uc0phdW5lID0gdGhpcy5nZXRQaW9ucygyKVxyXG5cclxuICAgIGlmIChVdGlscy5hcnJheTJEQ29udGFpbnNBcnJheShsaXN0ZVBpb25zUm91Z2UsIFtpbmRleEhvcml6b250YWxlLCBpbmRleFZlcnRpY2FsZV0pKSB7XHJcbiAgICAgIHJldHVybiAncmVkJztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKFV0aWxzLmFycmF5MkRDb250YWluc0FycmF5KGxpc3RlUGlvbnNKYXVuZSwgW2luZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlXSkpIHtcclxuICAgICAgcmV0dXJuICd5ZWxsb3cnO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbiAgY2xlYXJHYW1lKCkge1xyXG4gICAgJCgnLnJvdycpLnJlbW92ZSgpXHJcbiAgfVxyXG4gIHJlc2V0R2FtZSgpIHtcclxuICAgIHRoaXMuY2xlYXJHYW1lKClcclxuICAgIHRoaXMuY2xlYXJQaW9ucygpXHJcbiAgICB0aGlzLmNyZWF0ZUJhY2tncm91bmQoKVxyXG4gICAgdGhpcy5kaXNhYmxlR2FtZSgpXHJcbiAgfVxyXG4gIHBsYXlHYW1lKCkge1xyXG4gICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCcuLi9wdWJsaWMvYXVkaW8vc3RhcnRHYW1lLm1wNCcpO1xyXG4gICAgYXVkaW8ucGxheSgpO1xyXG4gICAgYXVkaW8gPSBudWxsO1xyXG4gICAgdGhpcy5yZXNldEdhbWUoKVxyXG4gICAgdGhpcy5zZXRNZXNzYWdlKFwiQSB0b2kgZGUgam91ZXIgIVwiKVxyXG4gICAgdGhpcy5lbmFibGVHYW1lKClcclxuICB9XHJcbiAgc2VsZWN0KGluZGV4SG9yaXpvbnRhbGUpIHtcclxuICAgIGluZGV4SG9yaXpvbnRhbGUgPSBwYXJzZUludChpbmRleEhvcml6b250YWxlKVxyXG4gICAgbGV0IGluZGV4VmVydGljYWxlID0gdGhpcy5nZXRUYWlsbGVWZXJ0aWNhbGUoKTtcclxuICAgIHdoaWxlIChpbmRleFZlcnRpY2FsZSA+IDApIHtcclxuICAgICAgbGV0IHRlYW1Db2xvciA9IHRoaXMuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZSwgaW5kZXhWZXJ0aWNhbGUpXHJcbiAgICAgIGlmICghdGVhbUNvbG9yKSB7XHJcbiAgICAgICAgbGV0IGNvdWxldXIgPSAkKFwiI2dhbWUgLnJvd1wiKS5lcSgoaW5kZXhWZXJ0aWNhbGUgLSAxKSkuZmluZChcIi5pY29uXCIpLmVxKChpbmRleEhvcml6b250YWxlIC0gMSkpXHJcbiAgICAgICAgY291bGV1ci5hdHRyKFwic3VyYnJpbGxhbmNlXCIsIFwicmVkXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpbmRleFZlcnRpY2FsZS0tO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpIHtcclxuICAgIGxldCBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzID0gW107XHJcbiAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gMTsgaW5kZXhIb3Jpem9udGFsZSA8PSB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXU7IGluZGV4SG9yaXpvbnRhbGUrKykge1xyXG4gICAgICBpZiAoIXRoaXMuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZSwgMSkpIHtcclxuICAgICAgICBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzLnB1c2goaW5kZXhIb3Jpem9udGFsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzO1xyXG4gIH1cclxuICBpc0RyYXcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5saXN0ZVBpb25zSmF1bmUubGVuZ3RoICsgdGhpcy5saXN0ZVBpb25zUm91Z2UubGVuZ3RoID49IHRoaXMuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKSAqIHRoaXMuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICB9XHJcbiAgZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKSB7XHJcbiAgICByZXR1cm4gcGFyc2VJbnQodGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1KTtcclxuICB9XHJcbiAgZ2V0VGFpbGxlVmVydGljYWxlKCkge1xyXG4gICAgcmV0dXJuIHBhcnNlSW50KHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXUpO1xyXG4gIH1cclxuICBnZXRMZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIoKSB7XHJcbiAgICBsZXQgbGlzdGVEZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIgPSBbXTtcclxuICAgIGxldCBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzID0gdGhpcy5nZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpO1xyXG4gICAgbGV0IGFUcm91dmVyTGVQaW9uO1xyXG4gICAgbGlzdGVDb2xvbm5lc05vbkNvbXBsZXRlcy5mb3JFYWNoKG51bWVyb0NvbG9ubmVIb3Jpem9udGFsZSA9PiB7XHJcbiAgICAgIGxldCBudW1lcm9Db2xvbm5lVmVydGljYWxlID0gdGhpcy5nZXRUYWlsbGVWZXJ0aWNhbGUoKTtcclxuICAgICAgYVRyb3V2ZXJMZVBpb24gPSBmYWxzZTtcclxuICAgICAgd2hpbGUgKG51bWVyb0NvbG9ubmVWZXJ0aWNhbGUgPiAwICYmICFhVHJvdXZlckxlUGlvbikge1xyXG4gICAgICAgIGlmICghVXRpbHMuYXJyYXkyRENvbnRhaW5zQXJyYXkodGhpcy5nZXRQaW9ucygxKSwgW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pXHJcbiAgICAgICAgICAmJiAhVXRpbHMuYXJyYXkyRENvbnRhaW5zQXJyYXkodGhpcy5nZXRQaW9ucygyKSwgW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc0Nhc2VzUG91dmFudEV0cmVKb3Vlci5wdXNoKFtudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGVdKVxyXG4gICAgICAgICAgYVRyb3V2ZXJMZVBpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbnVtZXJvQ29sb25uZVZlcnRpY2FsZS0tO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBsaXN0ZURlc0Nhc2VzUG91dmFudEV0cmVKb3VlcjtcclxuICB9XHJcbiAgZXhwb3J0KCkge1xyXG4gICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkFmZmljaGFnZSBkZSBsJ2V4cG9ydC4uLlwiKTtcclxuICAgIGxldCBwYXJhbXMgPSBbXTtcclxuICAgIHBhcmFtc1sncmVkJ10gPSB0aGlzLmdldFBpb25zKCdyZWQnKVxyXG4gICAgcGFyYW1zWyd5ZWxsb3cnXSA9IHRoaXMuZ2V0UGlvbnMoJ3llbGxvdycpXHJcbiAgICBjb25zdCByZWQgPSBwYXJhbXNbJ3JlZCddO1xyXG4gICAgY29uc3QgeWVsbG93ID0gcGFyYW1zWyd5ZWxsb3cnXTtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSAkLmFqYXgoe1xyXG4gICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgIHVybDogXCJhcGkvZXhwb3J0P3g9XCIgKyB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXUgKyBcIiZ5PVwiICsgdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldSxcclxuICAgICAgZGF0YTogeyByZWQ6IHJlZCwgeWVsbG93OiB5ZWxsb3cgfSxcclxuICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICB0aW1lb3V0OiAxMjAwMDBcclxuICAgIH0pXHJcbiAgICByZXF1ZXN0LmRvbmUoZnVuY3Rpb24gKG91dHB1dF9zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG91dHB1dF9zdWNjZXNzKVxyXG4gICAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiTCdleHBvcnQgcydlc3QgY29ycmVjdGVtZW50IHRlcm1pbsOpXCIpO1xyXG4gICAgfSlcclxuICAgIHJlcXVlc3QuZmFpbChmdW5jdGlvbiAoaHR0cF9lcnJvcikge1xyXG4gICAgICBsZXQgc2VydmVyX21zZyA9IGh0dHBfZXJyb3IucmVzcG9uc2VUZXh0O1xyXG4gICAgICBsZXQgY29kZSA9IGh0dHBfZXJyb3Iuc3RhdHVzO1xyXG4gICAgICBsZXQgY29kZV9sYWJlbCA9IGh0dHBfZXJyb3Iuc3RhdHVzVGV4dDtcclxuICAgICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkVjaGVjIGxvcnMgZGUgbCdleHBvcnQgKFwiICsgY29kZSArIFwiKVwiKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICB1blNlbGVjdCgpIHtcclxuICAgICQoXCIucm93IC5pY29uXCIpLmF0dHIoXCJzdXJicmlsbGFuY2VcIiwgXCJcIik7XHJcbiAgfVxyXG4gIHNldE1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgJChcIiNnYW1lIHAjdG91clwiKS50ZXh0KG1lc3NhZ2UpO1xyXG4gIH1cclxuICBpbXBvcnQoZ2FtZU9iamVjdCwgcGFyYW1ldGVycykge1xyXG4gICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkTDqWJ1dCBkZSBsJ2ltcG9ydCAuLi5cIik7XHJcbiAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiSW5pdGlhbGlzYXRpb24gZGVzIHBhcmFtw6h0cmVzIC4uLlwiKTtcclxuICAgIHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldSA9IGdhbWVPYmplY3QucGFyYW1ldHJlcy54XHJcbiAgICB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1ID0gZ2FtZU9iamVjdC5wYXJhbWV0cmVzLnlcclxuICAgIHRoaXMucmVzZXRHYW1lKClcclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJJbXBvcnQgZGVzIHBpb25zIC4uLlwiKTtcclxuICAgIGdhbWVPYmplY3QuZGF0YXMucGlvbnMucmVkLmZvckVhY2gocGlvblJvdWdlID0+IHtcclxuICAgICAgdGhpcy5mb3JjZUFkZFBpb24ocGlvblJvdWdlWzBdLCBwaW9uUm91Z2VbMV0sICdyZWQnKVxyXG4gICAgfSk7XHJcbiAgICBnYW1lT2JqZWN0LmRhdGFzLnBpb25zLnllbGxvdy5mb3JFYWNoKHBpb25ZZWxsb3cgPT4ge1xyXG4gICAgICB0aGlzLmZvcmNlQWRkUGlvbihwaW9uWWVsbG93WzBdLCBwaW9uWWVsbG93WzFdLCAneWVsbG93JylcclxuICAgIH0pO1xyXG4gICAgaWYgKHBhcmFtZXRlcnMpIHtcclxuICAgICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIlbDqXJpZmljYXRpb24gZCd1biBwb3RlbnRpZWwgZ2FnbmFudCAuLi5cIik7XHJcbiAgICAgIGxldCBnYWduYW50Um91Z2UgPSBXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMsIFwicmVkXCIpO1xyXG4gICAgICBsZXQgZ2FnbmFudEphdW5lID0gV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLCBcInllbGxvd1wiKTtcclxuICAgICAgaWYgKGdhZ25hbnRSb3VnZSkge1xyXG4gICAgICAgIHRoaXMuc2V0V2lubmVyKGdhZ25hbnRSb3VnZSk7XHJcbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlKFwiVHUgYXMgZ2FnbsOpICFcIik7XHJcbiAgICAgICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkdhZ27DqSAhIEJpZW4gam91w6lcIik7XHJcbiAgICAgICAgdGhpcy51blNlbGVjdCgpO1xyXG4gICAgICB9IGVsc2UgaWYgKGdhZ25hbnRKYXVuZSkge1xyXG4gICAgICAgIHRoaXMuc2V0V2lubmVyKGdhZ25hbnRKYXVuZSk7XHJcbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlKFwiVHUgYXMgcGVyZHUgbGEgcGFydGllICFcIik7XHJcbiAgICAgICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIlBlcmR1ICEgOihcIik7XHJcbiAgICAgICAgdGhpcy5tb25Ub3VyLnNldChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy51blNlbGVjdCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiRmluIGRlIGwnaW1wb3J0XCIpO1xyXG4gIH1cclxuICBzZXRXaW5uZXIoY291bGV1ciwgcGlvbnNHYWduYW50cykge1xyXG4gICAgdGhpcy5kaXNhYmxlR2FtZSgpXHJcbiAgICBpZiAocGlvbnNHYWduYW50cykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBpb25zR2FnbmFudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgaW5kZXhWZXJ0aWNhbGUgPSBwaW9uc0dhZ25hbnRzW2ldWzBdXHJcbiAgICAgICAgbGV0IGluZGV4SG9yaXpvbnRhbGUgPSBwaW9uc0dhZ25hbnRzW2ldWzFdXHJcbiAgICAgICAgbGV0IGNvdWxldXIgPSAkKFwiI2dhbWUgLnJvd1wiKS5lcSgoaW5kZXhWZXJ0aWNhbGUgLSAxKSkuZmluZChcIi5pY29uXCIpLmVxKChpbmRleEhvcml6b250YWxlIC0gMSkpXHJcbiAgICAgICAgJChjb3VsZXVyKS5jc3MoXCJvcGFjaXR5XCIsIDEpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChjb3VsZXVyID09ICdyZWQnKSB7XHJcbiAgICAgIHRoaXMuc2V0TWVzc2FnZShcIkxlcyByb3VnZXMgb250IGdhZ27DqXNcIik7XHJcbiAgICB9IGVsc2UgaWYgKGNvdWxldXIgPT0gJ3llbGxvdycpIHtcclxuICAgICAgdGhpcy5zZXRNZXNzYWdlKFwiTGVzIGphdW5lcyBvbnQgZ2FnbsOpc1wiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2V0TWVzc2FnZShcIk1hdGNoIG51bCAhXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuICBsb2cocHJlZml4LCBtZXNzYWdlLCBjb2xvclRleHQpIHtcclxuICAgIGlmICghY29sb3JUZXh0KSB7XHJcbiAgICAgIGNvbG9yVGV4dCA9IFwiZmFsc2VcIlxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coXHJcbiAgICAgIFwiJWNbXCIgKyBwcmVmaXggKyBcIl0gJWNcIiArIG1lc3NhZ2UsXHJcbiAgICAgIFwiY29sb3I6IHB1cnBsZTsgZm9udC1zaXplOiAxM3B4OyBmb250LXdlaWdodDogYm9sZDtcIixcclxuICAgICAgXCJmb250LXNpemU6IDEzcHg7IGNvbG9yOiBcIiArIGNvbG9yVGV4dFxyXG4gICAgKTtcclxuICB9XHJcbiAgZGlzYWJsZUdhbWUoKSB7XHJcbiAgICAkKFwiI2dhbWUgLmljb25cIikuY3NzKFwib3BhY2l0eVwiLCAwLjMpXHJcbiAgICB0aGlzLm1vblRvdXIuc2V0KGZhbHNlKVxyXG4gIH1cclxuICBlbmFibGVHYW1lKCkge1xyXG4gICAgJChcIiNnYW1lIC5pY29uXCIpLmNzcyhcIm9wYWNpdHlcIiwgMSlcclxuICAgIHRoaXMubW9uVG91ci5zZXQodHJ1ZSlcclxuICB9XHJcbiAgY3JlYXRlQmFja2dyb3VuZCgpIHtcclxuICAgIGxldCBQeCA9IHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldTtcclxuICAgIGxldCBQeSA9IHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXU7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1OyBpKyspIHtcclxuICAgICAgbGV0IHJvd1kgPSAnPGRpdiBjbGFzcz1cInJvd1wiIHZhbD1cIicgKyBpICsgJ1wiPjwvZGl2Pic7XHJcbiAgICAgICQoXCIjZ2FtZVwiKS5hcHBlbmQocm93WSk7XHJcbiAgICAgIGZvciAobGV0IGogPSAxOyBqIDw9IHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldTsgaisrKSB7XHJcbiAgICAgICAgJCgnLnJvd1t2YWw9XCInICsgaSArICdcIl0nKS5hcHBlbmQodGhpcy5zZWFyY2hQaWVjZShudWxsLCBqKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZm9yY2VBZGRQaW9uKHBvc2l0aW9uSG9yaXpvbnRhbGUsIHBvc2l0aW9uVmVydGljYWxlLCBjb3VsZXVyKSB7XHJcbiAgICAkKFwiLnJvd1t2YWw9J1wiICsgcG9zaXRpb25WZXJ0aWNhbGUgKyBcIiddIC5pY29uW2Nhc2U9J1wiICsgcG9zaXRpb25Ib3Jpem9udGFsZSArIFwiJ11cIikucmVwbGFjZVdpdGgodGhpcy5zZWFyY2hQaWVjZShjb3VsZXVyLCBwb3NpdGlvbkhvcml6b250YWxlKSk7XHJcbiAgICAkKFwiLnJvd1t2YWw9J1wiICsgcG9zaXRpb25WZXJ0aWNhbGUgKyBcIiddIC5pY29uW2Nhc2U9J1wiICsgcG9zaXRpb25Ib3Jpem9udGFsZSArIFwiJ11cIikuYXR0cihcInRlYW1cIiwgY291bGV1cik7XHJcbiAgICBpZiAoY291bGV1ciA9PSAneWVsbG93Jykge1xyXG4gICAgICB0aGlzLnNldFBpb24oMiwgW3Bvc2l0aW9uSG9yaXpvbnRhbGUsIHBvc2l0aW9uVmVydGljYWxlXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNldFBpb24oMSwgW3Bvc2l0aW9uSG9yaXpvbnRhbGUsIHBvc2l0aW9uVmVydGljYWxlXSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldFBvc2l0aW9uSG9yaXpvbnRhbGUoZXZlbnQpIHtcclxuICAgIHJldHVybiAkKGV2ZW50KS5wYXJlbnQoKS5pbmRleCgpICsgMTtcclxuICB9XHJcbiAgYWRkUGlvbihpbmRleEhvcml6b250YWxlQ2xpY2tlZCkge1xyXG4gICAgY29uc3QgdGFpbGxlVmVydGljYWxlID0gdGhpcy5nZXRUYWlsbGVWZXJ0aWNhbGUoKVxyXG4gICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGUgPSB0aGlzLmdldFRhaWxsZUhvcml6b250YWxlKClcclxuICAgIGxldCBwbGFjZUlzTm90VGFrZW4gPSB0cnVlO1xyXG4gICAgbGV0IGluZGV4VmVydGljYWxlID0gdGFpbGxlVmVydGljYWxlO1xyXG4gICAgaWYgKHRoaXMubW9uVG91ci5nZXQoKSkge1xyXG4gICAgICB3aGlsZSAoaW5kZXhWZXJ0aWNhbGUgPiAwICYmIHBsYWNlSXNOb3RUYWtlbikge1xyXG4gICAgICAgIGxldCBjb3VsZXVyRHVQaW9uID0gdGhpcy5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleEhvcml6b250YWxlQ2xpY2tlZCwgaW5kZXhWZXJ0aWNhbGUpO1xyXG4gICAgICAgIGlmICghY291bGV1ckR1UGlvbikge1xyXG4gICAgICAgICAgcGxhY2VJc05vdFRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLm1vblRvdXIuc2V0KGZhbHNlKTtcclxuICAgICAgICAgIHRoaXMudW5TZWxlY3QoKTtcclxuICAgICAgICAgIHRoaXMuZm9yY2VBZGRQaW9uKGluZGV4SG9yaXpvbnRhbGVDbGlja2VkLCBpbmRleFZlcnRpY2FsZSwgXCJyZWRcIilcclxuICAgICAgICAgIGxldCBsZXNQaW9uc0dhZ25hbnRzID0gV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLCBcInJlZFwiKTtcclxuICAgICAgICAgIGlmIChsZXNQaW9uc0dhZ25hbnRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0V2lubmVyKCdyZWQnLCBsZXNQaW9uc0dhZ25hbnRzKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0RyYXcoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFdpbm5lcihudWxsLCBudWxsKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3QoaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1lc3NhZ2UoXCJBdSB0b3VyIGRlIGwnYWR2ZXJzYWlyZSFcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGdhbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICBjb25zdCBhdWRpbyA9IG5ldyBBdWRpbygnLi4vLi4vcHVibGljL2F1ZGlvL3BvcC5tcDQnKTtcclxuICAgICAgICAgICAgICBhdWRpby5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgY29uc3Qgcm9ib3RNYW5hZ2VyID0gUm9ib3RNYW5hZ2VyLmdldFJvYm90TWFuYWdlcihnYW1lKVxyXG4gICAgICAgICAgICAgIGlmIChyb2JvdE1hbmFnZXIucm9ib3RQbGFjZVVuUGlvbihcInllbGxvd1wiKSkge1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5zZXRNZXNzYWdlKFwiVHUgYXMgcGVyZHUgbGEgcGFydGllICFcIik7XHJcbiAgICAgICAgICAgICAgICBnYW1lLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiUGVyZHUgIVwiKTtcclxuICAgICAgICAgICAgICAgIGdhbWUubW9uVG91ci5zZXQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS51blNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleEhvcml6b250YWxlQ2xpY2tlZCwgaW5kZXhWZXJ0aWNhbGUgKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAvLyBTaSBsZSByb2JvdCBhIGpvdcOpIHN1ciBsYSBtw6ptZSBjb2xvbm5lLCBvbiBhY3R1YWxpc2UgbGEgc8OpbGVjdGlvblxyXG4gICAgICAgICAgICAgICAgICBnYW1lLnNlbGVjdChpbmRleEhvcml6b250YWxlQ2xpY2tlZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnYW1lLm1vblRvdXIuc2V0KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5zZXRNZXNzYWdlKFwiQSB0b24gdG91ciAhXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleFZlcnRpY2FsZS0tO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubG9nKFxyXG4gICAgICAgIFwiUHVpc3NhbmNlIDRcIixcclxuICAgICAgICBcIkpldG9uIGVuIFg6XCIgKyBpbmRleEhvcml6b250YWxlQ2xpY2tlZCArIFwiIFk6XCIgKyAoaW5kZXhWZXJ0aWNhbGUgKyAxKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuICBzZXRQaW9uKHRlYW0sIHZhbHVlKSB7XHJcbiAgICBpZiAodGVhbSA9PSAxIHx8IHRlYW0gPT0gJ3JlZCcpIHtcclxuICAgICAgdGhpcy5saXN0ZVBpb25zUm91Z2UucHVzaCh2YWx1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKHRlYW0gPT0gMiB8fCB0ZWFtID09ICd5ZWxsb3cnKSB7XHJcbiAgICAgIHRoaXMubGlzdGVQaW9uc0phdW5lLnB1c2godmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTGUgam91ZXVyIGVzdCBpbnRyb3V2YWJsZVwiKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmVtb3ZlUGlvbih0ZWFtLCB2YWx1ZSkge1xyXG4gICAgbGV0IGluZGV4O1xyXG4gICAgaWYgKHRlYW0gPT0gMSB8fCB0ZWFtID09ICdyZWQnKSB7XHJcbiAgICAgIGluZGV4ID0gVXRpbHMuZ2V0SW5kZXhPZjJEQXJyYXkodGhpcy5saXN0ZVBpb25zUm91Z2UsIHZhbHVlKVxyXG4gICAgICB0aGlzLmxpc3RlUGlvbnNSb3VnZS5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICB9IGVsc2UgaWYgKHRlYW0gPT0gMiB8fCB0ZWFtID09ICd5ZWxsb3cnKSB7XHJcbiAgICAgIGluZGV4ID0gVXRpbHMuZ2V0SW5kZXhPZjJEQXJyYXkodGhpcy5saXN0ZVBpb25zSmF1bmUsIHZhbHVlKVxyXG4gICAgICB0aGlzLmxpc3RlUGlvbnNKYXVuZS5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBcIkxlIGpvdWV1ciBlc3QgaW50cm91dmFibGVcIjtcclxuICAgIH1cclxuICB9XHJcbiAgY2xlYXJQaW9ucygpIHtcclxuICAgIHRoaXMubGlzdGVQaW9uc1JvdWdlID0gW107XHJcbiAgICB0aGlzLmxpc3RlUGlvbnNKYXVuZSA9IFtdO1xyXG4gICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkxlcyBkb25uw6llcyBkZXMgcGlvbnMgb250IMOpdMOpIGVmZmFjw6lzXCIpO1xyXG4gIH1cclxuICBnZXRQaW9ucyh0ZWFtKSB7XHJcbiAgICBpZiAodGVhbSA9PSAxIHx8IHRlYW0gPT0gJ3JlZCcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVQaW9uc1JvdWdlO1xyXG4gICAgfSBlbHNlIGlmICh0ZWFtID09IDIgfHwgdGVhbSA9PSAneWVsbG93Jykge1xyXG4gICAgICByZXR1cm4gdGhpcy5saXN0ZVBpb25zSmF1bmU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBcIkxlIGpvdWV1ciBlc3QgaW50cm91dmFibGVcIjtcclxuICAgIH1cclxuICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgTW9uVG91ciB7XHJcbiAgc2V0KG1vblRvdXIpIHtcclxuICAgIHRoaXMubW9uVG91ciA9IG1vblRvdXJcclxuICB9XHJcbiAgZ2V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubW9uVG91clxyXG4gIH1cclxufSIsImV4cG9ydCBjbGFzcyBVdGlscyB7XHJcbiAgc3RhdGljIGdldEVudGllckFsZWF0b2lyZShtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKTtcclxuICB9XHJcbiAgXHJcbiAgc3RhdGljIGdldEVsZW1lbnRBbGVhdG9pcmUobGlzdGUpIHtcclxuICAgIGxldCBsb25ndWV1ckxpc3RlID0gbGlzdGUubGVuZ3RoO1xyXG4gICAgbGV0IGVudGllckFsZWF0b2lyZUluZGV4ZVBhckxpc3RlID0gVXRpbHMuZ2V0RW50aWVyQWxlYXRvaXJlKDAsIGxvbmd1ZXVyTGlzdGUpO1xyXG4gICAgcmV0dXJuIGxpc3RlW2VudGllckFsZWF0b2lyZUluZGV4ZVBhckxpc3RlXTtcclxuICB9XHJcbiAgXHJcbiAgc3RhdGljIGFycmF5MkRDb250YWluc0FycmF5KGFycmF5MkQsIGFycmF5U2VhcmNoKSB7XHJcbiAgICBsZXQgaXRlbVN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGFycmF5U2VhcmNoKTtcclxuICAgIGxldCBjb250YWlucyA9IGFycmF5MkQuc29tZShmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShlbGVtZW50KSA9PT0gaXRlbVN0cmluZztcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNvbnRhaW5zO1xyXG4gIH1cclxuICBcclxuICBzdGF0aWMgZ2V0SW5kZXhPZjJEQXJyYXkoYXJyYXkyRCwgaW5kZXgpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkyRC5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgY3VycmVudEFycmF5ID0gYXJyYXkyRFtpXTtcclxuICAgICAgaWYgKGN1cnJlbnRBcnJheVswXSA9PSBpbmRleFswXSAmJiBjdXJyZW50QXJyYXlbMV0gPT0gaW5kZXhbMV0pIHtcclxuICAgICAgICByZXR1cm4gaTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldENvdWxldXJFcXVpcGVBbGVhdG9pcmUoKSB7XHJcbiAgICBsZXQgbGlzdGVEZUNvdWxldXJzID0gW1wieWVsbG93XCIsIFwicmVkXCJdO1xyXG4gICAgbGV0IG5vbWJyZUFsZWF0b2lyZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxpc3RlRGVDb3VsZXVycy5sZW5ndGgpO1xyXG4gICAgcmV0dXJuIGxpc3RlRGVDb3VsZXVyc1tub21icmVBbGVhdG9pcmVdO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldENvdWxldXJFcXVpcGVBZHZlcnNlKGNvdWxldXJFcXVpcGVBY3R1ZWxsZSkge1xyXG4gICAgaWYgKGNvdWxldXJFcXVpcGVBY3R1ZWxsZSA9PSAncmVkJykge1xyXG4gICAgICByZXR1cm4gJ3llbGxvdyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJ3JlZCc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGFyc2VVUkxQYXJhbXModXJsKSB7XHJcbiAgICB2YXIgcXVlcnlTdGFydCA9IHVybC5pbmRleE9mKFwiP1wiKSArIDEsXHJcbiAgICAgICAgcXVlcnlFbmQgICA9IHVybC5pbmRleE9mKFwiI1wiKSArIDEgfHwgdXJsLmxlbmd0aCArIDEsXHJcbiAgICAgICAgcXVlcnkgPSB1cmwuc2xpY2UocXVlcnlTdGFydCwgcXVlcnlFbmQgLSAxKSxcclxuICAgICAgICBwYWlycyA9IHF1ZXJ5LnJlcGxhY2UoL1xcKy9nLCBcIiBcIikuc3BsaXQoXCImXCIpLFxyXG4gICAgICAgIHBhcm1zID0ge30sIGksIG4sIHYsIG52O1xyXG5cclxuICAgIGlmIChxdWVyeSA9PT0gdXJsIHx8IHF1ZXJ5ID09PSBcIlwiKSByZXR1cm47XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbnYgPSBwYWlyc1tpXS5zcGxpdChcIj1cIiwgMik7XHJcbiAgICAgICAgbiA9IGRlY29kZVVSSUNvbXBvbmVudChudlswXSk7XHJcbiAgICAgICAgdiA9IGRlY29kZVVSSUNvbXBvbmVudChudlsxXSk7XHJcblxyXG4gICAgICAgIGlmICghcGFybXMuaGFzT3duUHJvcGVydHkobikpIHBhcm1zW25dID0gW107XHJcbiAgICAgICAgcGFybXNbbl0ucHVzaChudi5sZW5ndGggPT09IDIgPyB2IDogbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFybXM7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENoZWNrSWZXaW5uZXIgfSBmcm9tIFwiLi9DaGVja0lmV2lubmVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgV2lubmVyTWFuYWdlciB7XHJcbiAgc3RhdGljIHZlcmlmV2luKGdhbWUsIGNvbG9yKSB7XHJcbiAgICBsZXQgdmVyaWZpY2F0aW9uID0gQ2hlY2tJZldpbm5lci5ob3Jpem9udGFsKGdhbWUsIGNvbG9yKTtcclxuICAgIGlmICh2ZXJpZmljYXRpb24pIHtcclxuICAgICAgcmV0dXJuIHZlcmlmaWNhdGlvbjtcclxuICAgIH1cclxuICAgIHZlcmlmaWNhdGlvbiA9IENoZWNrSWZXaW5uZXIudmVydGljYWwoZ2FtZSwgY29sb3IpO1xyXG4gICAgaWYgKHZlcmlmaWNhdGlvbikge1xyXG4gICAgICByZXR1cm4gdmVyaWZpY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgdmVyaWZpY2F0aW9uID0gQ2hlY2tJZldpbm5lci5kaWFnb25hbFRvcExlZnQoZ2FtZSwgY29sb3IpO1xyXG4gICAgaWYgKHZlcmlmaWNhdGlvbikge1xyXG4gICAgICByZXR1cm4gdmVyaWZpY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgdmVyaWZpY2F0aW9uID0gQ2hlY2tJZldpbm5lci5kaWFnb25hbFRvcFJpZ2h0KGdhbWUsIGNvbG9yKTtcclxuICAgIGlmICh2ZXJpZmljYXRpb24pIHtcclxuICAgICAgcmV0dXJuIHZlcmlmaWNhdGlvbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyB2ZXJpZklmUGlvblBsYWNlZEdpdmVXaW4oZ2FtZSwgbnVtZXJvQ29sb25uZUhvcml6b250YWxlLCBudW1lcm9Db2xvbm5lVmVydGljYWxlLCBjb3VsZXVyUGlvbikge1xyXG4gICAgZ2FtZS5zZXRQaW9uKGNvdWxldXJQaW9uLCBbbnVtZXJvQ29sb25uZUhvcml6b250YWxlLCBudW1lcm9Db2xvbm5lVmVydGljYWxlXSlcclxuICAgIGNvbnN0IGlzV2lubmVyID0gV2lubmVyTWFuYWdlci52ZXJpZldpbihnYW1lLCBjb3VsZXVyUGlvbilcclxuICAgIGdhbWUucmVtb3ZlUGlvbihjb3VsZXVyUGlvbiwgW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pXHJcbiAgICByZXR1cm4gaXNXaW5uZXI7XHJcbiAgfVxyXG5cclxufSIsImV4cG9ydCBjbGFzcyBDaGVja0lmV2lubmVyIHtcclxuICBzdGF0aWMgaG9yaXpvbnRhbChnYW1lLCBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgICA9IGdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcbiAgICAvLyBWw6lyaWZpY2F0aW9uIGVuIGhvcml6b250YWxcclxuICAgIGxldCBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgIGxldCBjb3VsZXVyRHVQaW9uO1xyXG4gICAgbGV0IG5iUGlvbnNHYWduYW50cztcclxuICAgIGZvciAobGV0IGluZGV4VmVydGljYWxlID0gMTsgaW5kZXhWZXJ0aWNhbGUgPD0gdGFpbGxlVmVydGljYWxlOyBpbmRleFZlcnRpY2FsZSsrKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gMTsgaW5kZXhIb3Jpem9udGFsZSA8PSB0YWlsbGVIb3Jpem9udGFsZTsgaW5kZXhIb3Jpem9udGFsZSsrKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZSwgaW5kZXhWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKGNvdWxldXJEdVBpb24gPT0gY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhWZXJ0aWNhbGUsIGluZGV4SG9yaXpvbnRhbGVdKTtcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgc3RhdGljIHZlcnRpY2FsIChnYW1lLCBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgICA9IGdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcbiAgICAvLyBQYXJjb3VycyBkZSBjaGFxdWUgY2FzZSBob3Jpem9udGFsZSBkdSBqZXVcclxuICAgIGxldCBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgIGxldCBjb3VsZXVyRHVQaW9uO1xyXG4gICAgbGV0IG5iUGlvbnNHYWduYW50cztcclxuICAgIGZvciAobGV0IGluZGV4SG9yaXpvbnRhbGUgPSAxOyBpbmRleEhvcml6b250YWxlIDw9IHRhaWxsZUhvcml6b250YWxlOyBpbmRleEhvcml6b250YWxlKyspIHtcclxuICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgIC8vIFBhcmNvdXJzIGNoYXF1ZSBjYXNlIHZlcnRpY2FsZSBkZSBsYSBjb2xvbm5lXHJcbiAgICAgIGZvciAobGV0IGluZGV4VmVydGljYWxlID0gMTsgaW5kZXhWZXJ0aWNhbGUgPD0gdGFpbGxlVmVydGljYWxlOyBpbmRleFZlcnRpY2FsZSsrKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZSwgaW5kZXhWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKGNvdWxldXJEdVBpb24gPT0gY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzLnB1c2goW2luZGV4VmVydGljYWxlLCBpbmRleEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBkaWFnb25hbFRvcExlZnQgKGdhbWUsIGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSAgID0gZ2FtZS5nZXRUYWlsbGVWZXJ0aWNhbGUoKVxyXG4gICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGUgPSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKClcclxuXHJcbiAgICBsZXQgY291bGV1ckR1UGlvbiwgbmJQaW9uc0dhZ25hbnRzO1xyXG4gICAgbGV0IGluZGV4Q291cmFudEhvcml6b250YWxlO1xyXG4gICAgbGV0IGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgbGV0IGluZGV4Q291cmFudFZlcnRpY2FsZSA9IDQ7XHJcblxyXG4gICAgLy8gUGFyY291cnMgdG91dGVzIGxlcyBkaWFnb25hbGVzIMOgIGdhdWNoZXMgw6AgcGFydGlyIGRlIDQuXHJcbiAgICBmb3IgKGxldCBpbmRleFZlcnRpY2FsZSA9IDQ7IGluZGV4VmVydGljYWxlIDw9IHRhaWxsZVZlcnRpY2FsZTsgaW5kZXhWZXJ0aWNhbGUrKykge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPSAxO1xyXG4gICAgICBcclxuICAgICAgLy8gVsOpcmlmaWVyIGxhIGxpZ25lIGVuIGRpYWdvbmFsZVxyXG4gICAgICB3aGlsZSAoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPD0gdGFpbGxlSG9yaXpvbnRhbGUgJiYgaW5kZXhDb3VyYW50VmVydGljYWxlID49IDEpIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleENvdXJhbnRIb3Jpem9udGFsZSwgaW5kZXhDb3VyYW50VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleENvdXJhbnRWZXJ0aWNhbGUsIGluZGV4Q291cmFudEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZS0tO1xyXG4gICAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlKys7XHJcbiAgICAgIH1cclxuICAgICAgaW5kZXhDb3VyYW50VmVydGljYWxlID0gaW5kZXhWZXJ0aWNhbGUgKyAxO1xyXG4gICAgfVxyXG5cclxuICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4SG9yaXpvbnRhbGUgPSAyOyBpbmRleEhvcml6b250YWxlIDw9ICh0YWlsbGVIb3Jpem9udGFsZS00KTsgaW5kZXhIb3Jpem9udGFsZSsrKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSA9IGluZGV4SG9yaXpvbnRhbGU7XHJcbiAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZSA9IHRhaWxsZVZlcnRpY2FsZTtcclxuICAgICAgLy8gVsOpcmlmaWVyIGxhIGxpZ25lIGVuIGRpYWdvbmFsZVxyXG4gICAgICB3aGlsZSAoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPD0gdGFpbGxlSG9yaXpvbnRhbGUgJiYgaW5kZXhDb3VyYW50VmVydGljYWxlID49IDEpIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleENvdXJhbnRIb3Jpem9udGFsZSwgaW5kZXhDb3VyYW50VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleENvdXJhbnRWZXJ0aWNhbGUsIGluZGV4Q291cmFudEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZS0tO1xyXG4gICAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlKys7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZGlhZ29uYWxUb3BSaWdodChnYW1lLCBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgICA9IGdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcblxyXG4gICAgbGV0IGNvdWxldXJEdVBpb24sIG5iUGlvbnNHYWduYW50cztcclxuICAgIGxldCBpbmRleENvdXJhbnRIb3Jpem9udGFsZTtcclxuICAgIGxldCBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuXHJcbiAgICAvLyBQYXJjb3VycyB0b3V0ZXMgbGVzIGRpYWdvbmFsZXMgw6AgZ2F1Y2hlcyDDoCBwYXJ0aXIgZGUgNC5cclxuICAgIGZvciAobGV0IGluZGV4VmVydGljYWxlID0gNDsgaW5kZXhWZXJ0aWNhbGUgPD0gdGFpbGxlVmVydGljYWxlOyBpbmRleFZlcnRpY2FsZSsrKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSA9IHRhaWxsZUhvcml6b250YWxlO1xyXG4gICAgICBsZXQgaW5kZXhDb3VyYW50VmVydGljYWxlID0gaW5kZXhWZXJ0aWNhbGU7XHJcbiAgICAgIC8vIFbDqXJpZmllciBsYSBsaWduZSBlbiBkaWFnb25hbGVcclxuICAgICAgd2hpbGUgKGluZGV4Q291cmFudEhvcml6b250YWxlID49IDEgJiYgaW5kZXhDb3VyYW50VmVydGljYWxlID49IDEpIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleENvdXJhbnRIb3Jpem9udGFsZSwgaW5kZXhDb3VyYW50VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleENvdXJhbnRWZXJ0aWNhbGUsIGluZGV4Q291cmFudEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlLS07XHJcbiAgICAgICAgaW5kZXhDb3VyYW50VmVydGljYWxlLS07XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gKHRhaWxsZUhvcml6b250YWxlIC0gMSk7IGluZGV4SG9yaXpvbnRhbGUgPj0gNDsgaW5kZXhIb3Jpem9udGFsZS0tKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSA9IGluZGV4SG9yaXpvbnRhbGU7XHJcbiAgICAgIGxldCBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPSB0YWlsbGVWZXJ0aWNhbGU7XHJcbiAgICAgIC8vIFbDqXJpZmllciBsYSBsaWduZSBlbiBkaWFnb25hbGVcclxuICAgICAgd2hpbGUgKGluZGV4Q291cmFudEhvcml6b250YWxlID49IDEgJiYgaW5kZXhDb3VyYW50VmVydGljYWxlID49IDEpIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleENvdXJhbnRIb3Jpem9udGFsZSwgaW5kZXhDb3VyYW50VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleENvdXJhbnRWZXJ0aWNhbGUsIGluZGV4Q291cmFudEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZS0tO1xyXG4gICAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCB7IFdpbm5lck1hbmFnZXIgfSBmcm9tIFwiLi9XaW5uZXJNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUm9ib3RNYW5hZ2VyIHtcclxuICBjb25zdHJ1Y3RvcihnYW1lKSB7XHJcbiAgICBpZiAoZ2FtZSkge1xyXG4gICAgICB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXUgPSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKCk7XHJcbiAgICAgIHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXUgICA9IGdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKCk7XHJcbiAgICAgIHRoaXMuZ2FtZSA9IGdhbWVcclxuICAgICAgUm9ib3RNYW5hZ2VyLnJvYm90TWFuYWdlciA9IHRoaXNcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkF1Y3VuZSBwYXJ0aWUgZMOpZmluaXRcIilcclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldFJvYm90TWFuYWdlcihnYW1lKSB7XHJcbiAgICBpZiAoUm9ib3RNYW5hZ2VyLnJvYm90TWFuYWdlcikge1xyXG4gICAgICByZXR1cm4gUm9ib3RNYW5hZ2VyLnJvYm90TWFuYWdlclxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJnOlwiICsgZ2FtZSk7XHJcbiAgICAgIHJldHVybiBuZXcgUm9ib3RNYW5hZ2VyKGdhbWUpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsYW5jZVVuZVBhcnRpZURlUm9ib3RzKCkge1xyXG4gICAgdGhpcy5nYW1lLnNldE1lc3NhZ2UoXCJSb2JvdCBWcy4gUm9ib3RcIik7XHJcbiAgICB0aGlzLmdhbWUucmVzZXRHYW1lKClcclxuICAgIHRoaXMuZ2FtZS5lbmFibGVHYW1lKClcclxuICAgIHRoaXMuZ2FtZS5tb25Ub3VyLnNldChmYWxzZSlcclxuICAgIC8vIE9uIGNob2lzaXMgdW5lIMOpcXVpcGUgcXVpIGNvbW1lbmNlIGFsw6lhdG9pcmVtZW50XHJcbiAgICBjb25zdCBjb2xvciA9IFV0aWxzLmdldENvdWxldXJFcXVpcGVBbGVhdG9pcmUoKTtcclxuICAgIC8vIE9uIGxhbmNlIGxhIHBhcnRpZVxyXG4gICAgdGhpcy5yb2JvdFZzUm9ib3QoY29sb3IpO1xyXG4gIH1cclxuXHJcbiAgcm9ib3RWc1JvYm90KGNvbG9yKSB7XHJcbiAgICAvLyBTaSBsYSBwYXJ0aWUgbidlc3QgcGFzIHRlcm1pbsOpXHJcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgIGlmICghdGhpcy5yb2JvdFBsYWNlVW5QaW9uKGNvbG9yKSlcclxuICAgIHtcclxuICAgICAgLy8gT24gZmFpcyBqb3VlciBsJ8OpcXVpcGUgYWR2ZXJzZVxyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGF0LnJvYm90VnNSb2JvdChVdGlscy5nZXRDb3VsZXVyRXF1aXBlQWR2ZXJzZShjb2xvcikpXHJcbiAgICAgIH0sIDUpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByb2JvdFBsYWNlVW5QaW9uKGNvbG9yKSB7XHJcbiAgICBjb25zdCBnYW1lID0gdGhpcy5nYW1lO1xyXG4gICAgLy8gT24gcsOpY3Vww6hyZSBsYSBsaXN0ZSBkZXMgY29sb25uZXMgcXVpIG4nb250IHBhcyBsZXVyc1xyXG4gICAgLy8gY29sb25uZXMgY29tcGzDqXTDqXMuXHJcbiAgICBjb25zdCBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzID0gZ2FtZS5nZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpO1xyXG4gICAgbGV0IGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCA9IFV0aWxzLmdldEVsZW1lbnRBbGVhdG9pcmUobGlzdGVDb2xvbm5lc05vbkNvbXBsZXRlcyk7XHJcbiAgICBjb25zdCBsZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIgID0gZ2FtZS5nZXRMZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIoKTtcclxuICAgIGxlc0Nhc2VzUG91dmFudEV0cmVKb3Vlci5mb3JFYWNoKGNhc2VQb3V2YW50RXRyZUpvdWVyID0+IHtcclxuICAgICAgbGV0IGluZGljZUhvcml6b250YWxlID0gY2FzZVBvdXZhbnRFdHJlSm91ZXJbMF07XHJcbiAgICAgIGxldCBpbmRpY2VWZXJ0aWNhbGUgICA9IGNhc2VQb3V2YW50RXRyZUpvdWVyWzFdO1xyXG4gICAgICBpZiAoV2lubmVyTWFuYWdlci52ZXJpZklmUGlvblBsYWNlZEdpdmVXaW4oZ2FtZSwgaW5kaWNlSG9yaXpvbnRhbGUsIGluZGljZVZlcnRpY2FsZSwgY29sb3IpKSB7XHJcbiAgICAgICAgY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50ID0gaW5kaWNlSG9yaXpvbnRhbGU7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoV2lubmVyTWFuYWdlci52ZXJpZklmUGlvblBsYWNlZEdpdmVXaW4oZ2FtZSwgaW5kaWNlSG9yaXpvbnRhbGUsIGluZGljZVZlcnRpY2FsZSwgVXRpbHMuZ2V0Q291bGV1ckVxdWlwZUFkdmVyc2UoY29sb3IpKSkge1xyXG4gICAgICAgIGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCA9IGluZGljZUhvcml6b250YWxlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgICAgXHJcbiAgICBpZiAoIWxlc0Nhc2VzUG91dmFudEV0cmVKb3VlciB8fCBsZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMuZ2FtZS5zZXRXaW5uZXIobnVsbCwgbnVsbCk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGJvdWNsZUFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIGxldCBpbmRpY2VUYWlsbGVWZXJ0aWNhbGUgPSB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1O1xyXG4gICAgICB3aGlsZSAoaW5kaWNlVGFpbGxlVmVydGljYWxlID4gMCAmJiBib3VjbGVBY3RpdmUpIHtcclxuICAgICAgICBsZXQgY291bGV1ckR1UGlvblBsYWNlID0gdGhpcy5nYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCwgaW5kaWNlVGFpbGxlVmVydGljYWxlKTtcclxuICAgICAgICBpZiAoIWNvdWxldXJEdVBpb25QbGFjZSkge1xyXG4gICAgICAgICAgYm91Y2xlQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmdhbWUuZm9yY2VBZGRQaW9uKGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCwgaW5kaWNlVGFpbGxlVmVydGljYWxlLCBjb2xvcilcclxuICAgICAgICAgIC8vYWpvdXRlVW5QaW9uRGFuc0JkZChjb2xvbm5lQ2hvaXNpdEFsZWF0b2lyZW1lbnQsIGluZGljZVRhaWxsZVZlcnRpY2FsZSwgY29sb3IpO1xyXG4gICAgICAgICAgY29uc3QgaXNXaW5uZXIgPSBXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgY29sb3IpO1xyXG4gICAgICAgICAgaWYgKGlzV2lubmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zZXRXaW5uZXIoY29sb3IsIGlzV2lubmVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGljZVRhaWxsZVZlcnRpY2FsZS0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSIsImV4cG9ydCBjbGFzcyBUZXN0c1VuaXRzIHtcclxuICBjb25zdHJ1Y3RvcihnYW1lKSB7XHJcbiAgICBpZiAoZ2FtZSkge1xyXG4gICAgICB0aGlzLmdhbWUgPSBnYW1lXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBdWN1bmUgcGFydGllIGZvdXJuaXRcIilcclxuICAgIH1cclxuICB9XHJcbiAgbGF1bmNoVGVzdHNVbml0cyAoKSB7XHJcbiAgICB0aGlzLmRlZmF1bHRUYWlsbGVIb3Jpem9udGFsZSA9IHRoaXMuZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcbiAgICB0aGlzLmRlZmF1bHRUYWlsbGVWZXJ0aWNhbGUgICA9IHRoaXMuZ2FtZS5nZXRUYWlsbGVWZXJ0aWNhbGUoKVxyXG5cclxuICAgIGNvbnN0IGxpc3RzVGVzdHNVbml0cyA9IFtdXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0MSgpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDIoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQzKCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0NCgpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDUoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQ2KCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0NygpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDgoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQ5KCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0MTAoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQxMSgpKVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsaXN0c1Rlc3RzVW5pdHMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGxldCBjb2xvcjtcclxuICAgICAgaWYgKGxpc3RzVGVzdHNVbml0c1tpbmRleF0pIHtcclxuICAgICAgICBjb2xvciA9IFwiZ3JlZW5cIjtcclxuICAgICAgfSAgZWxzZSB7XHJcbiAgICAgICAgY29sb3IgPSBcInJlZFwiO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBtZXNzYWdlID0gXCJUZXN0IFwiICsgKGluZGV4ICsgMSkgKyBcIiA6IFwiICsgbGlzdHNUZXN0c1VuaXRzW2luZGV4XSArIFwiXFxuXCI7XHJcbiAgICAgIHRoaXMuZ2FtZS5sb2coXCJUZXN0XCIsIG1lc3NhZ2UsIGNvbG9yKTtcclxuICAgICAgXHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgdGhpcy5yZXNldFRlc3RzKCk7XHJcbiAgICBcclxuXHJcbiAgfVxyXG4gIHJlc2V0VGVzdHMoKSB7XHJcbiAgICB0aGlzLmdhbWUudGFpbGxlSG9yaXpvbnRhbGVEdUpldSA9IHRoaXMuZGVmYXVsdFRhaWxsZUhvcml6b250YWxlO1xyXG4gICAgdGhpcy5nYW1lLnRhaWxsZVZlcnRpY2FsZUR1SmV1ICAgPSB0aGlzLmRlZmF1bHRUYWlsbGVWZXJ0aWNhbGU7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgfVxyXG4gIHRlc3RVbml0MSgpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0ge1wicGFyYW1ldHJlc1wiOntcInhcIjpcIjdcIixcInlcIjpcIjVcIn0sXCJkYXRhc1wiOntcInBpb25zXCI6e1wicmVkXCI6W1s0LDVdLFszLDVdLFsyLDVdLFs2LDRdLFszLDRdLFs0LDRdLFs3LDRdLFszLDNdLFs0LDNdLFs3LDNdLFsxLDRdLFsxLDJdLFsxLDFdLFsyLDFdLFs3LDJdLFs1LDJdXSxcInllbGxvd1wiOltbMSw1XSxbNiw1XSxbNSw1XSxbNyw1XSxbMiw0XSxbNSw0XSxbMiwzXSxbMywyXSxbNCwyXSxbNCwxXSxbMSwzXSxbNiwzXSxbMiwyXSxbNywxXSxbNSwzXV19fX1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcbiAgICBcclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s1LDJdLFs0LDNdLFszLDRdLFsyLDVdXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3llbGxvdycpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCdyZWQnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDIoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHtcInBhcmFtZXRyZXNcIjp7XCJ4XCI6XCI3XCIsXCJ5XCI6XCI1XCJ9LFwiZGF0YXNcIjp7XCJwaW9uc1wiOntcInJlZFwiOltbMSw1XSxbMyw1XSxbMiw1XSxbMiwzXSxbNSw1XSxbNyw0XSxbMiwxXSxbNSw0XV0sXCJ5ZWxsb3dcIjpbWzcsNV0sWzQsNV0sWzIsNF0sWzYsNV0sWzMsNF0sWzIsMl0sWzQsNF0sWzEsNF1dfX19XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG4gICAgXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbNCwxXSxbNCwyXSxbNCwzXSxbNCw0XV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCdyZWQnKSAmJiBKU09OLnN0cmluZ2lmeShXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwneWVsbG93JykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbiAgdGVzdFVuaXQzKCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7XCJwYXJhbWV0cmVzXCI6e1wieFwiOlwiN1wiLFwieVwiOlwiNVwifSxcImRhdGFzXCI6e1wicGlvbnNcIjp7XCJyZWRcIjpbWzMsNV0sWzcsNV0sWzEsNV0sWzcsNF0sWzUsNF0sWzQsMl0sWzIsNV0sWzEsNF0sWzIsM10sWzcsMl0sWzIsMl0sWzMsM10sWzEsM10sWzYsNF1dLFwieWVsbG93XCI6W1s0LDVdLFs1LDVdLFszLDRdLFs0LDRdLFs0LDNdLFs3LDNdLFs0LDFdLFsyLDRdLFs2LDVdLFs3LDFdLFs1LDNdLFs1LDJdLFsyLDFdLFsxLDJdLFs2LDNdXX19fVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuICAgIFxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzMsNF0sWzMsNV0sWzMsNl0sWzMsN11dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwncmVkJykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3llbGxvdycpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0NCgpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0ge1wicGFyYW1ldHJlc1wiOntcInhcIjpcIjdcIixcInlcIjpcIjVcIn0sXCJkYXRhc1wiOntcInBpb25zXCI6e1wicmVkXCI6W1s1LDVdLFs1LDRdLFszLDVdLFs0LDVdLFsxLDVdLFsxLDRdLFs0LDNdLFs2LDJdLFs0LDJdLFsyLDNdLFs1LDJdLFs3LDNdLFs1LDFdLFs3LDFdLFsyLDJdLFsyLDFdLFszLDRdLFszLDNdXSxcInllbGxvd1wiOltbNyw1XSxbNiw1XSxbNiw0XSxbMiw1XSxbNCw0XSxbNyw0XSxbNiwzXSxbNSwzXSxbMiw0XSxbNCwxXSxbNiwxXSxbMSwzXSxbNywyXSxbMSwyXSxbMSwxXSxbMywyXSxbMywxXV19fX1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcbiAgICBcclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCdyZWQnKSAmJiAhV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3llbGxvdycpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDUoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHtcInBhcmFtZXRyZXNcIjp7XCJ4XCI6XCI3XCIsXCJ5XCI6XCI1XCJ9LFwiZGF0YXNcIjp7XCJwaW9uc1wiOntcInJlZFwiOltbMyw1XSxbNCw1XSxbMSw1XSxbNyw1XSxbNyw0XSxbNiwyXSxbNSw1XSxbNSw0XSxbNSwyXSxbMiwyXSxbMSw0XSxbNCwzXSxbNywzXSxbNCwyXSxbMywxXSxbNywxXSxbMSwyXSxbMSwxXV0sXCJ5ZWxsb3dcIjpbWzYsNV0sWzYsNF0sWzIsNV0sWzIsNF0sWzYsM10sWzMsNF0sWzYsMV0sWzUsM10sWzIsM10sWzQsNF0sWzEsM10sWzMsM10sWzcsMl0sWzMsMl0sWzQsMV0sWzIsMV0sWzUsMV1dfX19XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG4gICAgXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwncmVkJykgJiYgIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCd5ZWxsb3cnKSlcclxuICB9XHJcbiAgdGVzdFVuaXQ2KCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7XCJwYXJhbWV0cmVzXCI6e1wieFwiOlwiN1wiLFwieVwiOlwiNVwifSxcImRhdGFzXCI6e1wicGlvbnNcIjp7XCJyZWRcIjpbWzMsNV0sWzcsNF0sWzQsNV0sWzUsNF0sWzQsNF0sWzEsNF0sWzMsNF0sWzQsM10sWzMsM10sWzUsMl0sWzYsNF1dLFwieWVsbG93XCI6W1s3LDVdLFs1LDVdLFs3LDNdLFsyLDVdLFsxLDVdLFs3LDJdLFs1LDNdLFsyLDRdLFs0LDJdLFszLDJdLFs2LDVdXX19fVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuICAgIFxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzQsM10sWzQsNF0sWzQsNV0sWzQsNl1dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwneWVsbG93JykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3JlZCcpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0NygpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0ge1wicGFyYW1ldHJlc1wiOntcInhcIjpcIjdcIixcInlcIjpcIjEwXCJ9LFwiZGF0YXNcIjp7XCJwaW9uc1wiOntcInJlZFwiOltbNiwxMF0sWzIsMTBdLFs3LDldLFsxLDEwXSxbNSwxMF0sWzMsOV0sWzYsOF0sWzYsNl0sWzYsNV0sWzcsN10sWzUsOF0sWzMsN10sWzMsNl0sWzQsOF0sWzYsM10sWzQsN10sWzEsOF0sWzQsNV0sWzIsNl0sWzIsNF0sWzMsNF0sWzMsM10sWzEsN11dLFwieWVsbG93XCI6W1s3LDEwXSxbMywxMF0sWzYsOV0sWzIsOV0sWzQsMTBdLFsxLDldLFs3LDhdLFs2LDddLFs0LDldLFsyLDhdLFs1LDldLFszLDhdLFs3LDZdLFs1LDddLFs2LDRdLFs1LDZdLFszLDVdLFs0LDZdLFsyLDddLFsyLDVdLFs0LDRdLFs2LDJdLFs3LDVdLFsxLDZdXX19fVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuICAgIFxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzksNF0sWzgsM10sWzcsMl0sWzYsMV1dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwncmVkJykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3llbGxvdycpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0OCgpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0ge1wicGFyYW1ldHJlc1wiOntcInhcIjpcIjExXCIsXCJ5XCI6XCI2XCJ9LFwiZGF0YXNcIjp7XCJwaW9uc1wiOntcInJlZFwiOltbMSw2XSxbNSw2XSxbNyw2XSxbMiw1XSxbMTEsNl0sWzksNl0sWzksNV0sWzgsM10sWzMsNF0sWzQsNl0sWzksNF1dLFwieWVsbG93XCI6W1s4LDZdLFs4LDVdLFsyLDZdLFs2LDZdLFszLDZdLFszLDVdLFs4LDRdLFsxLDVdLFsyLDRdLFs3LDVdLFs5LDNdXX19fVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuICAgIFxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzYsNl0sWzUsN10sWzQsOF0sWzMsOV1dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwncmVkJykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3llbGxvdycpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0OSgpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0ge1wicGFyYW1ldHJlc1wiOntcInhcIjpcIjRcIixcInlcIjpcIjRcIn0sXCJkYXRhc1wiOntcInBpb25zXCI6e1wicmVkXCI6W1s0LDRdLFsyLDRdLFs0LDJdLFsyLDNdLFs0LDFdLFsyLDFdLFsxLDJdLFszLDFdXSxcInllbGxvd1wiOltbMSw0XSxbNCwzXSxbMyw0XSxbMywzXSxbMiwyXSxbMSwzXSxbMywyXSxbMSwxXV19fX1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcbiAgICBcclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCdyZWQnKSAmJiAhV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3llbGxvdycpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDEwKCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7XCJwYXJhbWV0cmVzXCI6e1wieFwiOlwiNFwiLFwieVwiOlwiNFwifSxcImRhdGFzXCI6e1wicGlvbnNcIjp7XCJyZWRcIjpbWzIsNF0sWzMsNF0sWzIsMl0sWzIsMV0sWzEsM10sWzQsMl1dLFwieWVsbG93XCI6W1s0LDRdLFs0LDNdLFsyLDNdLFsxLDRdLFszLDNdLFszLDJdLFs0LDFdXX19fVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuICAgIFxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzQsMV0sWzMsMl0sWzIsM10sWzEsNF1dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwncmVkJykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3llbGxvdycpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0MTEoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHtcInBhcmFtZXRyZXNcIjp7XCJ4XCI6XCI4XCIsXCJ5XCI6XCI3XCJ9LFwiZGF0YXNcIjp7XCJwaW9uc1wiOntcInJlZFwiOltbMSw3XSxbNiw3XSxbNCw2XSxbOCw2XSxbMyw2XSxbNyw3XSxbNyw2XSxbNyw1XSxbNSw3XSxbMiw3XSxbNSw2XSxbNSw1XSxbNSwzXSxbNywzXSxbNiw1XV0sXCJ5ZWxsb3dcIjpbWzgsN10sWzMsN10sWzQsN10sWzQsNV0sWzQsNF0sWzEsNl0sWzgsNV0sWzgsNF0sWzcsNF0sWzMsNV0sWzYsNl0sWzIsNl0sWzUsNF0sWzMsNF0sWzcsMl0sWzYsNF1dfX19XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG4gICAgXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbNCwzXSxbNCw0XSxbNCw1XSxbNCw2XV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCdyZWQnKSAmJiBKU09OLnN0cmluZ2lmeShXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwneWVsbG93JykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9HYW1lXCJcclxuaW1wb3J0IHsgVGVzdHNVbml0cyB9IGZyb20gXCIuL1Rlc3RzVW5pdHNcIlxyXG5pbXBvcnQgeyBSb2JvdE1hbmFnZXIgfSBmcm9tIFwiLi9Sb2JvdE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBham91dGVVblBpb25EYW5zQmRkKHB4LCBweSwgY29sb3IpIHtcclxuICBsZXQgZ2FtZUlkID0gNDtcclxuICAkLnBvc3QoXCIvYXBpL3Bpb25zL3NldExpc3QvXCIsIHtcclxuICAgIGlkOiBnYW1lSWQsXHJcbiAgICBQeDogcHgsXHJcbiAgICBQeTogcHksXHJcbiAgICBDb2xvcjogY29sb3JcclxuICB9KVxyXG4gICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGVzdHNVbml0cygpIHtcclxuICBsYW5jZVRlc3RzVW5pdHMgPSBuZXcgVGVzdHNVbml0cyhHYW1lLmdldEdhbWUoKSk7XHJcbiAgbGFuY2VUZXN0c1VuaXRzLmxhdW5jaFRlc3RzVW5pdHMoKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGxheUdhbWUoKSB7XHJcbiAgR2FtZS5nZXRHYW1lKCkucGxheUdhbWUoKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbGFuY2VVbmVQYXJ0aWVEZVJvYm90cygpIHtcclxuICBjb25zdCByb2JvdE1hbmFnZXIgPSBSb2JvdE1hbmFnZXIuZ2V0Um9ib3RNYW5hZ2VyKEdhbWUuZ2V0R2FtZSgpKVxyXG4gIHJvYm90TWFuYWdlci5sYW5jZVVuZVBhcnRpZURlUm9ib3RzKClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5QYXJhbSgpIHtcclxuICAkKCcjZGlhbG9nJykucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpXHJcbiAgJChcIiNkaWFsb2dcIikuZGlhbG9nKHtcclxuICAgIHJlc2l6YWJsZTogZmFsc2UsXHJcbiAgICBoZWlnaHQ6IFwiYXV0b1wiLFxyXG4gICAgd2lkdGg6IDQwMCxcclxuICAgIG1vZGFsOiB0cnVlLFxyXG4gICAgYnV0dG9uczoge1xyXG4gICAgICBcIlZhbGlkZXJcIjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIjcGFyYW1ldGVyc1ZhbHVlc1wiKS5zdWJtaXQoKVxyXG4gICAgICAgICQodGhpcykuZGlhbG9nKFwiY2xvc2VcIilcclxuICAgICAgfSxcclxuICAgICAgXCJGZXJtZXJcIjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuZGlhbG9nKFwiY2xvc2VcIilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkUGFyYW0oKSB7XHJcbiAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoXHJcbiAgICAnP3g9JyArICQoJyNuYkNhc2VYJykudmFsKCkgKyAnJnk9JyArICQoJyNuYkNhc2VZJykudmFsKClcclxuICApXHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9