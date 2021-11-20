/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
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
/* 2 */
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
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WinnerManager": () => (/* binding */ WinnerManager)
/* harmony export */ });
/* harmony import */ var _CheckIfWinner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);


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
/* 4 */
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
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RobotManager": () => (/* binding */ RobotManager)
/* harmony export */ });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _WinnerManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



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
/* harmony export */   "Game": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _MonTour__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _WinnerManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _RobotManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);





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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGtFQUFzQjtBQUN2RDtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx1RUFBNEI7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDJEQUF1QjtBQUNyQztBQUNBLE1BQU07QUFDTixjQUFjLDJEQUF1QjtBQUNyQztBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvTW9uVG91ci5qcyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvVXRpbHMuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL1dpbm5lck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL0NoZWNrSWZXaW5uZXIuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL1JvYm90TWFuYWdlci5qcyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3B1aXNzYW5jZTQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3B1aXNzYW5jZTQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL0dhbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE1vblRvdXIge1xyXG4gIHNldChtb25Ub3VyKSB7XHJcbiAgICB0aGlzLm1vblRvdXIgPSBtb25Ub3VyXHJcbiAgfVxyXG4gIGdldCgpIHtcclxuICAgIHJldHVybiB0aGlzLm1vblRvdXJcclxuICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgVXRpbHMge1xyXG4gIHN0YXRpYyBnZXRFbnRpZXJBbGVhdG9pcmUobWluLCBtYXgpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbik7XHJcbiAgfVxyXG4gIFxyXG4gIHN0YXRpYyBnZXRFbGVtZW50QWxlYXRvaXJlKGxpc3RlKSB7XHJcbiAgICBsZXQgbG9uZ3VldXJMaXN0ZSA9IGxpc3RlLmxlbmd0aDtcclxuICAgIGxldCBlbnRpZXJBbGVhdG9pcmVJbmRleGVQYXJMaXN0ZSA9IFV0aWxzLmdldEVudGllckFsZWF0b2lyZSgwLCBsb25ndWV1ckxpc3RlKTtcclxuICAgIHJldHVybiBsaXN0ZVtlbnRpZXJBbGVhdG9pcmVJbmRleGVQYXJMaXN0ZV07XHJcbiAgfVxyXG4gIFxyXG4gIHN0YXRpYyBhcnJheTJEQ29udGFpbnNBcnJheShhcnJheTJELCBhcnJheVNlYXJjaCkge1xyXG4gICAgbGV0IGl0ZW1TdHJpbmcgPSBKU09OLnN0cmluZ2lmeShhcnJheVNlYXJjaCk7XHJcbiAgICBsZXQgY29udGFpbnMgPSBhcnJheTJELnNvbWUoZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZWxlbWVudCkgPT09IGl0ZW1TdHJpbmc7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBjb250YWlucztcclxuICB9XHJcbiAgXHJcbiAgc3RhdGljIGdldEluZGV4T2YyREFycmF5KGFycmF5MkQsIGluZGV4KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5MkQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIGN1cnJlbnRBcnJheSA9IGFycmF5MkRbaV07XHJcbiAgICAgIGlmIChjdXJyZW50QXJyYXlbMF0gPT0gaW5kZXhbMF0gJiYgY3VycmVudEFycmF5WzFdID09IGluZGV4WzFdKSB7XHJcbiAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRDb3VsZXVyRXF1aXBlQWxlYXRvaXJlKCkge1xyXG4gICAgbGV0IGxpc3RlRGVDb3VsZXVycyA9IFtcInllbGxvd1wiLCBcInJlZFwiXTtcclxuICAgIGxldCBub21icmVBbGVhdG9pcmUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsaXN0ZURlQ291bGV1cnMubGVuZ3RoKTtcclxuICAgIHJldHVybiBsaXN0ZURlQ291bGV1cnNbbm9tYnJlQWxlYXRvaXJlXTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRDb3VsZXVyRXF1aXBlQWR2ZXJzZShjb3VsZXVyRXF1aXBlQWN0dWVsbGUpIHtcclxuICAgIGlmIChjb3VsZXVyRXF1aXBlQWN0dWVsbGUgPT0gJ3JlZCcpIHtcclxuICAgICAgcmV0dXJuICd5ZWxsb3cnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICdyZWQnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBhcnNlVVJMUGFyYW1zKHVybCkge1xyXG4gICAgdmFyIHF1ZXJ5U3RhcnQgPSB1cmwuaW5kZXhPZihcIj9cIikgKyAxLFxyXG4gICAgICAgIHF1ZXJ5RW5kICAgPSB1cmwuaW5kZXhPZihcIiNcIikgKyAxIHx8IHVybC5sZW5ndGggKyAxLFxyXG4gICAgICAgIHF1ZXJ5ID0gdXJsLnNsaWNlKHF1ZXJ5U3RhcnQsIHF1ZXJ5RW5kIC0gMSksXHJcbiAgICAgICAgcGFpcnMgPSBxdWVyeS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpLnNwbGl0KFwiJlwiKSxcclxuICAgICAgICBwYXJtcyA9IHt9LCBpLCBuLCB2LCBudjtcclxuXHJcbiAgICBpZiAocXVlcnkgPT09IHVybCB8fCBxdWVyeSA9PT0gXCJcIikgcmV0dXJuO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG52ID0gcGFpcnNbaV0uc3BsaXQoXCI9XCIsIDIpO1xyXG4gICAgICAgIG4gPSBkZWNvZGVVUklDb21wb25lbnQobnZbMF0pO1xyXG4gICAgICAgIHYgPSBkZWNvZGVVUklDb21wb25lbnQobnZbMV0pO1xyXG5cclxuICAgICAgICBpZiAoIXBhcm1zLmhhc093blByb3BlcnR5KG4pKSBwYXJtc1tuXSA9IFtdO1xyXG4gICAgICAgIHBhcm1zW25dLnB1c2gobnYubGVuZ3RoID09PSAyID8gdiA6IG51bGwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcm1zO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDaGVja0lmV2lubmVyIH0gZnJvbSBcIi4vQ2hlY2tJZldpbm5lclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdpbm5lck1hbmFnZXIge1xyXG4gIHN0YXRpYyB2ZXJpZldpbihnYW1lLCBjb2xvcikge1xyXG4gICAgbGV0IHZlcmlmaWNhdGlvbiA9IENoZWNrSWZXaW5uZXIuaG9yaXpvbnRhbChnYW1lLCBjb2xvcik7XHJcbiAgICBpZiAodmVyaWZpY2F0aW9uKSB7XHJcbiAgICAgIHJldHVybiB2ZXJpZmljYXRpb247XHJcbiAgICB9XHJcbiAgICB2ZXJpZmljYXRpb24gPSBDaGVja0lmV2lubmVyLnZlcnRpY2FsKGdhbWUsIGNvbG9yKTtcclxuICAgIGlmICh2ZXJpZmljYXRpb24pIHtcclxuICAgICAgcmV0dXJuIHZlcmlmaWNhdGlvbjtcclxuICAgIH1cclxuICAgIHZlcmlmaWNhdGlvbiA9IENoZWNrSWZXaW5uZXIuZGlhZ29uYWxUb3BMZWZ0KGdhbWUsIGNvbG9yKTtcclxuICAgIGlmICh2ZXJpZmljYXRpb24pIHtcclxuICAgICAgcmV0dXJuIHZlcmlmaWNhdGlvbjtcclxuICAgIH1cclxuICAgIHZlcmlmaWNhdGlvbiA9IENoZWNrSWZXaW5uZXIuZGlhZ29uYWxUb3BSaWdodChnYW1lLCBjb2xvcik7XHJcbiAgICBpZiAodmVyaWZpY2F0aW9uKSB7XHJcbiAgICAgIHJldHVybiB2ZXJpZmljYXRpb247XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgdmVyaWZJZlBpb25QbGFjZWRHaXZlV2luKGdhbWUsIG51bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZSwgY291bGV1clBpb24pIHtcclxuICAgIGdhbWUuc2V0UGlvbihjb3VsZXVyUGlvbiwgW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pXHJcbiAgICBjb25zdCBpc1dpbm5lciA9IFdpbm5lck1hbmFnZXIudmVyaWZXaW4oZ2FtZSwgY291bGV1clBpb24pXHJcbiAgICBnYW1lLnJlbW92ZVBpb24oY291bGV1clBpb24sIFtudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGVdKVxyXG4gICAgcmV0dXJuIGlzV2lubmVyO1xyXG4gIH1cclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgQ2hlY2tJZldpbm5lciB7XHJcbiAgc3RhdGljIGhvcml6b250YWwoZ2FtZSwgY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgY29uc3QgdGFpbGxlVmVydGljYWxlICAgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKVxyXG4gICAgLy8gVsOpcmlmaWNhdGlvbiBlbiBob3Jpem9udGFsXHJcbiAgICBsZXQgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICBsZXQgY291bGV1ckR1UGlvbjtcclxuICAgIGxldCBuYlBpb25zR2FnbmFudHM7XHJcbiAgICBmb3IgKGxldCBpbmRleFZlcnRpY2FsZSA9IDE7IGluZGV4VmVydGljYWxlIDw9IHRhaWxsZVZlcnRpY2FsZTsgaW5kZXhWZXJ0aWNhbGUrKykge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgZm9yIChsZXQgaW5kZXhIb3Jpem9udGFsZSA9IDE7IGluZGV4SG9yaXpvbnRhbGUgPD0gdGFpbGxlSG9yaXpvbnRhbGU7IGluZGV4SG9yaXpvbnRhbGUrKykge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cysrO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzLnB1c2goW2luZGV4VmVydGljYWxlLCBpbmRleEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHN0YXRpYyB2ZXJ0aWNhbCAoZ2FtZSwgY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgY29uc3QgdGFpbGxlVmVydGljYWxlICAgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKVxyXG4gICAgLy8gUGFyY291cnMgZGUgY2hhcXVlIGNhc2UgaG9yaXpvbnRhbGUgZHUgamV1XHJcbiAgICBsZXQgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICBsZXQgY291bGV1ckR1UGlvbjtcclxuICAgIGxldCBuYlBpb25zR2FnbmFudHM7XHJcbiAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gMTsgaW5kZXhIb3Jpem9udGFsZSA8PSB0YWlsbGVIb3Jpem9udGFsZTsgaW5kZXhIb3Jpem9udGFsZSsrKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAvLyBQYXJjb3VycyBjaGFxdWUgY2FzZSB2ZXJ0aWNhbGUgZGUgbGEgY29sb25uZVxyXG4gICAgICBmb3IgKGxldCBpbmRleFZlcnRpY2FsZSA9IDE7IGluZGV4VmVydGljYWxlIDw9IHRhaWxsZVZlcnRpY2FsZTsgaW5kZXhWZXJ0aWNhbGUrKykge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleFZlcnRpY2FsZSwgaW5kZXhIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZGlhZ29uYWxUb3BMZWZ0IChnYW1lLCBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgICA9IGdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcblxyXG4gICAgbGV0IGNvdWxldXJEdVBpb24sIG5iUGlvbnNHYWduYW50cztcclxuICAgIGxldCBpbmRleENvdXJhbnRIb3Jpem9udGFsZTtcclxuICAgIGxldCBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgIGxldCBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPSA0O1xyXG5cclxuICAgIC8vIFBhcmNvdXJzIHRvdXRlcyBsZXMgZGlhZ29uYWxlcyDDoCBnYXVjaGVzIMOgIHBhcnRpciBkZSA0LlxyXG4gICAgZm9yIChsZXQgaW5kZXhWZXJ0aWNhbGUgPSA0OyBpbmRleFZlcnRpY2FsZSA8PSB0YWlsbGVWZXJ0aWNhbGU7IGluZGV4VmVydGljYWxlKyspIHtcclxuICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlID0gMTtcclxuICAgICAgXHJcbiAgICAgIC8vIFbDqXJpZmllciBsYSBsaWduZSBlbiBkaWFnb25hbGVcclxuICAgICAgd2hpbGUgKGluZGV4Q291cmFudEhvcml6b250YWxlIDw9IHRhaWxsZUhvcml6b250YWxlICYmIGluZGV4Q291cmFudFZlcnRpY2FsZSA+PSAxKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUsIGluZGV4Q291cmFudFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhDb3VyYW50VmVydGljYWxlLCBpbmRleENvdXJhbnRIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUtLTtcclxuICAgICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSsrO1xyXG4gICAgICB9XHJcbiAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZSA9IGluZGV4VmVydGljYWxlICsgMTtcclxuICAgIH1cclxuXHJcbiAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gMjsgaW5kZXhIb3Jpem9udGFsZSA8PSAodGFpbGxlSG9yaXpvbnRhbGUtNCk7IGluZGV4SG9yaXpvbnRhbGUrKykge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPSBpbmRleEhvcml6b250YWxlO1xyXG4gICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPSB0YWlsbGVWZXJ0aWNhbGU7XHJcbiAgICAgIC8vIFbDqXJpZmllciBsYSBsaWduZSBlbiBkaWFnb25hbGVcclxuICAgICAgd2hpbGUgKGluZGV4Q291cmFudEhvcml6b250YWxlIDw9IHRhaWxsZUhvcml6b250YWxlICYmIGluZGV4Q291cmFudFZlcnRpY2FsZSA+PSAxKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUsIGluZGV4Q291cmFudFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhDb3VyYW50VmVydGljYWxlLCBpbmRleENvdXJhbnRIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUtLTtcclxuICAgICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSsrO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRpYWdvbmFsVG9wUmlnaHQoZ2FtZSwgY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgY29uc3QgdGFpbGxlVmVydGljYWxlICAgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKVxyXG5cclxuICAgIGxldCBjb3VsZXVyRHVQaW9uLCBuYlBpb25zR2FnbmFudHM7XHJcbiAgICBsZXQgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGU7XHJcbiAgICBsZXQgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcblxyXG4gICAgLy8gUGFyY291cnMgdG91dGVzIGxlcyBkaWFnb25hbGVzIMOgIGdhdWNoZXMgw6AgcGFydGlyIGRlIDQuXHJcbiAgICBmb3IgKGxldCBpbmRleFZlcnRpY2FsZSA9IDQ7IGluZGV4VmVydGljYWxlIDw9IHRhaWxsZVZlcnRpY2FsZTsgaW5kZXhWZXJ0aWNhbGUrKykge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPSB0YWlsbGVIb3Jpem9udGFsZTtcclxuICAgICAgbGV0IGluZGV4Q291cmFudFZlcnRpY2FsZSA9IGluZGV4VmVydGljYWxlO1xyXG4gICAgICAvLyBWw6lyaWZpZXIgbGEgbGlnbmUgZW4gZGlhZ29uYWxlXHJcbiAgICAgIHdoaWxlIChpbmRleENvdXJhbnRIb3Jpem9udGFsZSA+PSAxICYmIGluZGV4Q291cmFudFZlcnRpY2FsZSA+PSAxKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUsIGluZGV4Q291cmFudFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhDb3VyYW50VmVydGljYWxlLCBpbmRleENvdXJhbnRIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZS0tO1xyXG4gICAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZS0tO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaW5kZXhIb3Jpem9udGFsZSA9ICh0YWlsbGVIb3Jpem9udGFsZSAtIDEpOyBpbmRleEhvcml6b250YWxlID49IDQ7IGluZGV4SG9yaXpvbnRhbGUtLSkge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPSBpbmRleEhvcml6b250YWxlO1xyXG4gICAgICBsZXQgaW5kZXhDb3VyYW50VmVydGljYWxlID0gdGFpbGxlVmVydGljYWxlO1xyXG4gICAgICAvLyBWw6lyaWZpZXIgbGEgbGlnbmUgZW4gZGlhZ29uYWxlXHJcbiAgICAgIHdoaWxlIChpbmRleENvdXJhbnRIb3Jpem9udGFsZSA+PSAxICYmIGluZGV4Q291cmFudFZlcnRpY2FsZSA+PSAxKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUsIGluZGV4Q291cmFudFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhDb3VyYW50VmVydGljYWxlLCBpbmRleENvdXJhbnRIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUtLTtcclxuICAgICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZS0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBXaW5uZXJNYW5hZ2VyIH0gZnJvbSBcIi4vV2lubmVyTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJvYm90TWFuYWdlciB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xyXG4gICAgaWYgKGdhbWUpIHtcclxuICAgICAgdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1ID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpO1xyXG4gICAgICB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1ICAgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpO1xyXG4gICAgICB0aGlzLmdhbWUgPSBnYW1lXHJcbiAgICAgIFJvYm90TWFuYWdlci5yb2JvdE1hbmFnZXIgPSB0aGlzXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBdWN1bmUgcGFydGllIGTDqWZpbml0XCIpXHJcbiAgICB9XHJcbiAgICBcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRSb2JvdE1hbmFnZXIoZ2FtZSkge1xyXG4gICAgaWYgKFJvYm90TWFuYWdlci5yb2JvdE1hbmFnZXIpIHtcclxuICAgICAgcmV0dXJuIFJvYm90TWFuYWdlci5yb2JvdE1hbmFnZXJcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZzpcIiArIGdhbWUpO1xyXG4gICAgICByZXR1cm4gbmV3IFJvYm90TWFuYWdlcihnYW1lKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbGFuY2VVbmVQYXJ0aWVEZVJvYm90cygpIHtcclxuICAgIHRoaXMuZ2FtZS5zZXRNZXNzYWdlKFwiUm9ib3QgVnMuIFJvYm90XCIpO1xyXG4gICAgdGhpcy5nYW1lLnJlc2V0R2FtZSgpXHJcbiAgICB0aGlzLmdhbWUuZW5hYmxlR2FtZSgpXHJcbiAgICB0aGlzLmdhbWUubW9uVG91ci5zZXQoZmFsc2UpXHJcbiAgICAvLyBPbiBjaG9pc2lzIHVuZSDDqXF1aXBlIHF1aSBjb21tZW5jZSBhbMOpYXRvaXJlbWVudFxyXG4gICAgY29uc3QgY29sb3IgPSBVdGlscy5nZXRDb3VsZXVyRXF1aXBlQWxlYXRvaXJlKCk7XHJcbiAgICAvLyBPbiBsYW5jZSBsYSBwYXJ0aWVcclxuICAgIHRoaXMucm9ib3RWc1JvYm90KGNvbG9yKTtcclxuICB9XHJcblxyXG4gIHJvYm90VnNSb2JvdChjb2xvcikge1xyXG4gICAgLy8gU2kgbGEgcGFydGllIG4nZXN0IHBhcyB0ZXJtaW7DqVxyXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICBpZiAoIXRoaXMucm9ib3RQbGFjZVVuUGlvbihjb2xvcikpXHJcbiAgICB7XHJcbiAgICAgIC8vIE9uIGZhaXMgam91ZXIgbCfDqXF1aXBlIGFkdmVyc2VcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhhdC5yb2JvdFZzUm9ib3QoVXRpbHMuZ2V0Q291bGV1ckVxdWlwZUFkdmVyc2UoY29sb3IpKVxyXG4gICAgICB9LCA1KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcm9ib3RQbGFjZVVuUGlvbihjb2xvcikge1xyXG4gICAgY29uc3QgZ2FtZSA9IHRoaXMuZ2FtZTtcclxuICAgIC8vIE9uIHLDqWN1cMOocmUgbGEgbGlzdGUgZGVzIGNvbG9ubmVzIHF1aSBuJ29udCBwYXMgbGV1cnNcclxuICAgIC8vIGNvbG9ubmVzIGNvbXBsw6l0w6lzLlxyXG4gICAgY29uc3QgbGlzdGVDb2xvbm5lc05vbkNvbXBsZXRlcyA9IGdhbWUuZ2V0TGVzQ29sb25uZXNOb25Db21wbGV0ZXMoKTtcclxuICAgIGxldCBjb2xvbm5lQ2hvaXNpdEFsZWF0b2lyZW1lbnQgPSBVdGlscy5nZXRFbGVtZW50QWxlYXRvaXJlKGxpc3RlQ29sb25uZXNOb25Db21wbGV0ZXMpO1xyXG4gICAgY29uc3QgbGVzQ2FzZXNQb3V2YW50RXRyZUpvdWVyICA9IGdhbWUuZ2V0TGVzQ2FzZXNQb3V2YW50RXRyZUpvdWVyKCk7XHJcbiAgICBsZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIuZm9yRWFjaChjYXNlUG91dmFudEV0cmVKb3VlciA9PiB7XHJcbiAgICAgIGxldCBpbmRpY2VIb3Jpem9udGFsZSA9IGNhc2VQb3V2YW50RXRyZUpvdWVyWzBdO1xyXG4gICAgICBsZXQgaW5kaWNlVmVydGljYWxlICAgPSBjYXNlUG91dmFudEV0cmVKb3VlclsxXTtcclxuICAgICAgaWYgKFdpbm5lck1hbmFnZXIudmVyaWZJZlBpb25QbGFjZWRHaXZlV2luKGdhbWUsIGluZGljZUhvcml6b250YWxlLCBpbmRpY2VWZXJ0aWNhbGUsIGNvbG9yKSkge1xyXG4gICAgICAgIGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCA9IGluZGljZUhvcml6b250YWxlO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKFdpbm5lck1hbmFnZXIudmVyaWZJZlBpb25QbGFjZWRHaXZlV2luKGdhbWUsIGluZGljZUhvcml6b250YWxlLCBpbmRpY2VWZXJ0aWNhbGUsIFV0aWxzLmdldENvdWxldXJFcXVpcGVBZHZlcnNlKGNvbG9yKSkpIHtcclxuICAgICAgICBjb2xvbm5lQ2hvaXNpdEFsZWF0b2lyZW1lbnQgPSBpbmRpY2VIb3Jpem9udGFsZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAgIFxyXG4gICAgaWYgKCFsZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIgfHwgbGVzQ2FzZXNQb3V2YW50RXRyZUpvdWVyLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLmdhbWUuc2V0V2lubmVyKG51bGwsIG51bGwpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBib3VjbGVBY3RpdmUgPSB0cnVlO1xyXG4gICAgICBsZXQgaW5kaWNlVGFpbGxlVmVydGljYWxlID0gdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldTtcclxuICAgICAgd2hpbGUgKGluZGljZVRhaWxsZVZlcnRpY2FsZSA+IDAgJiYgYm91Y2xlQWN0aXZlKSB7XHJcbiAgICAgICAgbGV0IGNvdWxldXJEdVBpb25QbGFjZSA9IHRoaXMuZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChjb2xvbm5lQ2hvaXNpdEFsZWF0b2lyZW1lbnQsIGluZGljZVRhaWxsZVZlcnRpY2FsZSk7XHJcbiAgICAgICAgaWYgKCFjb3VsZXVyRHVQaW9uUGxhY2UpIHtcclxuICAgICAgICAgIGJvdWNsZUFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5nYW1lLmZvcmNlQWRkUGlvbihjb2xvbm5lQ2hvaXNpdEFsZWF0b2lyZW1lbnQsIGluZGljZVRhaWxsZVZlcnRpY2FsZSwgY29sb3IpXHJcbiAgICAgICAgICAvL2Fqb3V0ZVVuUGlvbkRhbnNCZGQoY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50LCBpbmRpY2VUYWlsbGVWZXJ0aWNhbGUsIGNvbG9yKTtcclxuICAgICAgICAgIGNvbnN0IGlzV2lubmVyID0gV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsIGNvbG9yKTtcclxuICAgICAgICAgIGlmIChpc1dpbm5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuc2V0V2lubmVyKGNvbG9yLCBpc1dpbm5lcik7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRpY2VUYWlsbGVWZXJ0aWNhbGUtLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IE1vblRvdXIgfSBmcm9tIFwiLi9Nb25Ub3VyXCJcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBXaW5uZXJNYW5hZ2VyIH0gZnJvbSBcIi4vV2lubmVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBSb2JvdE1hbmFnZXIgfSBmcm9tIFwiLi9Sb2JvdE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lIHtcclxuICBjb25zdHJ1Y3Rvcih0YWlsbGVIb3Jpem9udGFsZSwgdGFpbGxlVmVydGljYWxlKSB7XHJcbiAgICB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXUgPSB0YWlsbGVIb3Jpem9udGFsZTtcclxuICAgIHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXUgPSB0YWlsbGVWZXJ0aWNhbGU7XHJcbiAgICB0aGlzLmxpc3RlUGlvbnNSb3VnZSA9IG5ldyBBcnJheSgpO1xyXG4gICAgdGhpcy5saXN0ZVBpb25zSmF1bmUgPSBuZXcgQXJyYXkoKTtcclxuICAgIHRoaXMubW9uVG91ciA9IG5ldyBNb25Ub3VyKClcclxuICAgIHRoaXMuZGlzYWJsZUdhbWUoKVxyXG4gICAgdGhpcy5sb2coXHJcbiAgICAgIFwiUHVpc3NhbmNlIDRcIixcclxuICAgICAgXCJJbml0aWFsaXNhdGlvbiBkdSBqZXUgZW4gXCIgKyB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXUgKyBcInhcIiArIHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXVcclxuICAgICk7XHJcbiAgICBHYW1lLmdhbWUgPSB0aGlzO1xyXG4gIH1cclxuICBzdGF0aWMgZ2V0R2FtZSgpIHtcclxuICAgIGlmIChHYW1lLmdhbWUpIHtcclxuICAgICAgcmV0dXJuIEdhbWUuZ2FtZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGVQYXJzZWQgPSB0aGlzLmdldFRhaWxsZUhvcml6b250YWxlRnJvbVVybCgpXHJcbiAgICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZVBhcnNlZCA9IHRoaXMuZ2V0VGFpbGxlVmVydGljYWxlRnJvbVVybCgpXHJcbiAgICAgIHJldHVybiBuZXcgR2FtZSh0YWlsbGVIb3Jpem9udGFsZVBhcnNlZCwgdGFpbGxlVmVydGljYWxlUGFyc2VkKVxyXG5cclxuICAgIH1cclxuICB9XHJcbiAgc3RhdGljIGdldFRhaWxsZUhvcml6b250YWxlRnJvbVVybCgpIHtcclxuICAgIGNvbnN0IHBhcmFtc1VybCA9IFV0aWxzLnBhcnNlVVJMUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXNVcmwgIT09ICd1bmRlZmluZWQnICYmIHBhcmFtc1VybC50YWlsbGVIb3Jpem9udGFsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGUgPSBwYXJhbXNVcmwudGFpbGxlSG9yaXpvbnRhbGVbMF07XHJcbiAgICAgIGlmIChwYXJzZUludCh0YWlsbGVIb3Jpem9udGFsZSkpIHtcclxuICAgICAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZVBhcnNlZCA9IHBhcnNlSW50KHRhaWxsZUhvcml6b250YWxlKVxyXG4gICAgICAgIGlmICh0YWlsbGVIb3Jpem9udGFsZVBhcnNlZCA+PSA0ICYmIHRhaWxsZUhvcml6b250YWxlUGFyc2VkIDw9IDIwKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGFpbGxlSG9yaXpvbnRhbGVQYXJzZWRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIDc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiA3O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gNztcclxuICAgIH1cclxuICB9XHJcbiAgc3RhdGljIGdldFRhaWxsZVZlcnRpY2FsZUZyb21VcmwoKSB7XHJcbiAgICBjb25zdCBwYXJhbXNVcmwgPSBVdGlscy5wYXJzZVVSTFBhcmFtcyh3aW5kb3cubG9jYXRpb24uaHJlZilcclxuICAgIGlmICh0eXBlb2YgcGFyYW1zVXJsICE9PSAndW5kZWZpbmVkJyAmJiBwYXJhbXNVcmwudGFpbGxlVmVydGljYWxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgPSBwYXJhbXNVcmwudGFpbGxlVmVydGljYWxlWzBdO1xyXG4gICAgICBpZiAocGFyc2VJbnQodGFpbGxlVmVydGljYWxlKSkge1xyXG4gICAgICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZVBhcnNlZCA9IHBhcnNlSW50KHRhaWxsZVZlcnRpY2FsZSlcclxuICAgICAgICBpZiAodGFpbGxlVmVydGljYWxlUGFyc2VkID49IDQgJiYgdGFpbGxlVmVydGljYWxlUGFyc2VkIDw9IDIwKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGFpbGxlVmVydGljYWxlUGFyc2VkXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiA1O1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gNTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIDU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNlYXJjaFBpZWNlKGNvdWxldXIsIGluaXRDYXNlKSB7XHJcbiAgICBjb25zdCByZWRDaXJjbGUgPSAkKCcjcHJldmlldyAjcmVkX2NpcmNsZScpXHJcbiAgICBjb25zdCB5ZWxsb3dDaXJjbGUgPSAkKCcjcHJldmlldyAjeWVsbG93X2NpcmNsZScpXHJcbiAgICBjb25zdCBkZWZhdWx0Q2lyY2xlID0gJCgnI3ByZXZpZXcgI2Jhc2ljX2NpcmNsZScpXHJcbiAgICBpZiAoaW5pdENhc2UpIHtcclxuICAgICAgaWYgKGNvdWxldXIgPT09ICdyZWQnKSB7XHJcbiAgICAgICAgJChyZWRDaXJjbGUpLmNoaWxkcmVuKCkuY2hpbGRyZW4oKS5hdHRyKCdjYXNlJywgaW5pdENhc2UpXHJcbiAgICAgICAgcmV0dXJuICQocmVkQ2lyY2xlKS5odG1sKClcclxuICAgICAgfSBlbHNlIGlmIChjb3VsZXVyID09PSAneWVsbG93Jykge1xyXG4gICAgICAgICQoeWVsbG93Q2lyY2xlKS5jaGlsZHJlbigpLmNoaWxkcmVuKCkuYXR0cignY2FzZScsIGluaXRDYXNlKVxyXG4gICAgICAgIHJldHVybiAkKHllbGxvd0NpcmNsZSkuaHRtbCgpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJChkZWZhdWx0Q2lyY2xlKS5jaGlsZHJlbigpLmNoaWxkcmVuKCkuYXR0cignY2FzZScsIGluaXRDYXNlKVxyXG4gICAgICAgIHJldHVybiAkKGRlZmF1bHRDaXJjbGUpLmh0bWwoKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoY291bGV1ciA9PT0gJ3JlZCcpIHtcclxuICAgICAgICByZXR1cm4gJChyZWRDaXJjbGUpLmh0bWwoKVxyXG4gICAgICB9IGVsc2UgaWYgKGNvdWxldXIgPT09ICd5ZWxsb3cnKSB7XHJcbiAgICAgICAgcmV0dXJuICQoeWVsbG93Q2lyY2xlKS5odG1sKClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gJChkZWZhdWx0Q2lyY2xlKS5odG1sKClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRDb2xvck9mUGlvblBsYWNlZChpbmRleEhvcml6b250YWxlLCBpbmRleFZlcnRpY2FsZSkge1xyXG4gICAgY29uc3QgbGlzdGVQaW9uc1JvdWdlID0gdGhpcy5nZXRQaW9ucygxKVxyXG4gICAgY29uc3QgbGlzdGVQaW9uc0phdW5lID0gdGhpcy5nZXRQaW9ucygyKVxyXG5cclxuICAgIGlmIChVdGlscy5hcnJheTJEQ29udGFpbnNBcnJheShsaXN0ZVBpb25zUm91Z2UsIFtpbmRleEhvcml6b250YWxlLCBpbmRleFZlcnRpY2FsZV0pKSB7XHJcbiAgICAgIHJldHVybiAncmVkJztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKFV0aWxzLmFycmF5MkRDb250YWluc0FycmF5KGxpc3RlUGlvbnNKYXVuZSwgW2luZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlXSkpIHtcclxuICAgICAgcmV0dXJuICd5ZWxsb3cnO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbiAgY2xlYXJHYW1lKCkge1xyXG4gICAgJCgnLnJvdycpLnJlbW92ZSgpXHJcbiAgfVxyXG4gIHJlc2V0R2FtZSgpIHtcclxuICAgIHRoaXMuY2xlYXJHYW1lKClcclxuICAgIHRoaXMuY2xlYXJQaW9ucygpXHJcbiAgICB0aGlzLmNyZWF0ZUJhY2tncm91bmQoKVxyXG4gICAgdGhpcy5kaXNhYmxlR2FtZSgpXHJcbiAgfVxyXG4gIHBsYXlHYW1lKCkge1xyXG4gICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCcuLi9wdWJsaWMvYXVkaW8vc3RhcnRHYW1lLm1wNCcpO1xyXG4gICAgYXVkaW8ucGxheSgpO1xyXG4gICAgYXVkaW8gPSBudWxsO1xyXG4gICAgdGhpcy5yZXNldEdhbWUoKVxyXG4gICAgdGhpcy5zZXRNZXNzYWdlKFwiQSB0b2kgZGUgam91ZXIgIVwiKVxyXG4gICAgdGhpcy5lbmFibGVHYW1lKClcclxuICB9XHJcbiAgc2VsZWN0KGluZGV4SG9yaXpvbnRhbGUpIHtcclxuICAgIGluZGV4SG9yaXpvbnRhbGUgPSBwYXJzZUludChpbmRleEhvcml6b250YWxlKVxyXG4gICAgbGV0IGluZGV4VmVydGljYWxlID0gdGhpcy5nZXRUYWlsbGVWZXJ0aWNhbGUoKTtcclxuICAgIHdoaWxlIChpbmRleFZlcnRpY2FsZSA+IDApIHtcclxuICAgICAgbGV0IHRlYW1Db2xvciA9IHRoaXMuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZSwgaW5kZXhWZXJ0aWNhbGUpXHJcbiAgICAgIGlmICghdGVhbUNvbG9yKSB7XHJcbiAgICAgICAgbGV0IGNvdWxldXIgPSAkKFwiI2dhbWUgLnJvd1wiKS5lcSgoaW5kZXhWZXJ0aWNhbGUgLSAxKSkuZmluZChcIi5pY29uXCIpLmVxKChpbmRleEhvcml6b250YWxlIC0gMSkpXHJcbiAgICAgICAgY291bGV1ci5hdHRyKFwic3VyYnJpbGxhbmNlXCIsIFwicmVkXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpbmRleFZlcnRpY2FsZS0tO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpIHtcclxuICAgIGxldCBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzID0gW107XHJcbiAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gMTsgaW5kZXhIb3Jpem9udGFsZSA8PSB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXU7IGluZGV4SG9yaXpvbnRhbGUrKykge1xyXG4gICAgICBpZiAoIXRoaXMuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZSwgMSkpIHtcclxuICAgICAgICBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzLnB1c2goaW5kZXhIb3Jpem9udGFsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzO1xyXG4gIH1cclxuICBpc0RyYXcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5saXN0ZVBpb25zSmF1bmUubGVuZ3RoICsgdGhpcy5saXN0ZVBpb25zUm91Z2UubGVuZ3RoID49IHRoaXMuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKSAqIHRoaXMuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICB9XHJcbiAgZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKSB7XHJcbiAgICByZXR1cm4gcGFyc2VJbnQodGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1KTtcclxuICB9XHJcbiAgZ2V0VGFpbGxlVmVydGljYWxlKCkge1xyXG4gICAgcmV0dXJuIHBhcnNlSW50KHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXUpO1xyXG4gIH1cclxuICBnZXRMZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIoKSB7XHJcbiAgICBsZXQgbGlzdGVEZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIgPSBbXTtcclxuICAgIGxldCBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzID0gdGhpcy5nZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpO1xyXG4gICAgbGV0IGFUcm91dmVyTGVQaW9uO1xyXG4gICAgbGlzdGVDb2xvbm5lc05vbkNvbXBsZXRlcy5mb3JFYWNoKG51bWVyb0NvbG9ubmVIb3Jpem9udGFsZSA9PiB7XHJcbiAgICAgIGxldCBudW1lcm9Db2xvbm5lVmVydGljYWxlID0gdGhpcy5nZXRUYWlsbGVWZXJ0aWNhbGUoKTtcclxuICAgICAgYVRyb3V2ZXJMZVBpb24gPSBmYWxzZTtcclxuICAgICAgd2hpbGUgKG51bWVyb0NvbG9ubmVWZXJ0aWNhbGUgPiAwICYmICFhVHJvdXZlckxlUGlvbikge1xyXG4gICAgICAgIGlmICghVXRpbHMuYXJyYXkyRENvbnRhaW5zQXJyYXkodGhpcy5nZXRQaW9ucygxKSwgW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pXHJcbiAgICAgICAgICAmJiAhVXRpbHMuYXJyYXkyRENvbnRhaW5zQXJyYXkodGhpcy5nZXRQaW9ucygyKSwgW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc0Nhc2VzUG91dmFudEV0cmVKb3Vlci5wdXNoKFtudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGVdKVxyXG4gICAgICAgICAgYVRyb3V2ZXJMZVBpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbnVtZXJvQ29sb25uZVZlcnRpY2FsZS0tO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBsaXN0ZURlc0Nhc2VzUG91dmFudEV0cmVKb3VlcjtcclxuICB9XHJcbiAgZXhwb3J0KCkge1xyXG4gICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkFmZmljaGFnZSBkZSBsJ2V4cG9ydC4uLlwiKTtcclxuICAgIGxldCBwYXJhbXMgPSBbXTtcclxuICAgIHBhcmFtc1sncmVkJ10gPSB0aGlzLmdldFBpb25zKCdyZWQnKVxyXG4gICAgcGFyYW1zWyd5ZWxsb3cnXSA9IHRoaXMuZ2V0UGlvbnMoJ3llbGxvdycpXHJcbiAgICBjb25zdCByZWQgPSBwYXJhbXNbJ3JlZCddO1xyXG4gICAgY29uc3QgeWVsbG93ID0gcGFyYW1zWyd5ZWxsb3cnXTtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSAkLmFqYXgoe1xyXG4gICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgIHVybDogXCJhcGkvZXhwb3J0P3g9XCIgKyB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXUgKyBcIiZ5PVwiICsgdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldSxcclxuICAgICAgZGF0YTogeyByZWQ6IHJlZCwgeWVsbG93OiB5ZWxsb3cgfSxcclxuICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICB0aW1lb3V0OiAxMjAwMDBcclxuICAgIH0pXHJcbiAgICByZXF1ZXN0LmRvbmUoZnVuY3Rpb24gKG91dHB1dF9zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG91dHB1dF9zdWNjZXNzKVxyXG4gICAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiTCdleHBvcnQgcydlc3QgY29ycmVjdGVtZW50IHRlcm1pbsOpXCIpO1xyXG4gICAgfSlcclxuICAgIHJlcXVlc3QuZmFpbChmdW5jdGlvbiAoaHR0cF9lcnJvcikge1xyXG4gICAgICBsZXQgc2VydmVyX21zZyA9IGh0dHBfZXJyb3IucmVzcG9uc2VUZXh0O1xyXG4gICAgICBsZXQgY29kZSA9IGh0dHBfZXJyb3Iuc3RhdHVzO1xyXG4gICAgICBsZXQgY29kZV9sYWJlbCA9IGh0dHBfZXJyb3Iuc3RhdHVzVGV4dDtcclxuICAgICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkVjaGVjIGxvcnMgZGUgbCdleHBvcnQgKFwiICsgY29kZSArIFwiKVwiKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICB1blNlbGVjdCgpIHtcclxuICAgICQoXCIucm93IC5pY29uXCIpLmF0dHIoXCJzdXJicmlsbGFuY2VcIiwgXCJcIik7XHJcbiAgfVxyXG4gIHNldE1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgJChcIiNnYW1lIHAjdG91clwiKS50ZXh0KG1lc3NhZ2UpO1xyXG4gIH1cclxuICBpbXBvcnQoZ2FtZU9iamVjdCwgcGFyYW1ldGVycykge1xyXG4gICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkTDqWJ1dCBkZSBsJ2ltcG9ydCAuLi5cIik7XHJcbiAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiSW5pdGlhbGlzYXRpb24gZGVzIHBhcmFtw6h0cmVzIC4uLlwiKTtcclxuICAgIHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldSA9IGdhbWVPYmplY3QucGFyYW1ldHJlcy54XHJcbiAgICB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1ID0gZ2FtZU9iamVjdC5wYXJhbWV0cmVzLnlcclxuICAgIHRoaXMucmVzZXRHYW1lKClcclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJJbXBvcnQgZGVzIHBpb25zIC4uLlwiKTtcclxuICAgIGdhbWVPYmplY3QuZGF0YXMucGlvbnMucmVkLmZvckVhY2gocGlvblJvdWdlID0+IHtcclxuICAgICAgdGhpcy5mb3JjZUFkZFBpb24ocGlvblJvdWdlWzBdLCBwaW9uUm91Z2VbMV0sICdyZWQnKVxyXG4gICAgfSk7XHJcbiAgICBnYW1lT2JqZWN0LmRhdGFzLnBpb25zLnllbGxvdy5mb3JFYWNoKHBpb25ZZWxsb3cgPT4ge1xyXG4gICAgICB0aGlzLmZvcmNlQWRkUGlvbihwaW9uWWVsbG93WzBdLCBwaW9uWWVsbG93WzFdLCAneWVsbG93JylcclxuICAgIH0pO1xyXG4gICAgaWYgKHBhcmFtZXRlcnMpIHtcclxuICAgICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIlbDqXJpZmljYXRpb24gZCd1biBwb3RlbnRpZWwgZ2FnbmFudCAuLi5cIik7XHJcbiAgICAgIGxldCBnYWduYW50Um91Z2UgPSBXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMsIFwicmVkXCIpO1xyXG4gICAgICBsZXQgZ2FnbmFudEphdW5lID0gV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLCBcInllbGxvd1wiKTtcclxuICAgICAgaWYgKGdhZ25hbnRSb3VnZSkge1xyXG4gICAgICAgIHRoaXMuc2V0V2lubmVyKGdhZ25hbnRSb3VnZSk7XHJcbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlKFwiVHUgYXMgZ2FnbsOpICFcIik7XHJcbiAgICAgICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkdhZ27DqSAhIEJpZW4gam91w6lcIik7XHJcbiAgICAgICAgdGhpcy51blNlbGVjdCgpO1xyXG4gICAgICB9IGVsc2UgaWYgKGdhZ25hbnRKYXVuZSkge1xyXG4gICAgICAgIHRoaXMuc2V0V2lubmVyKGdhZ25hbnRKYXVuZSk7XHJcbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlKFwiVHUgYXMgcGVyZHUgbGEgcGFydGllICFcIik7XHJcbiAgICAgICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIlBlcmR1ICEgOihcIik7XHJcbiAgICAgICAgdGhpcy5tb25Ub3VyLnNldChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy51blNlbGVjdCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiRmluIGRlIGwnaW1wb3J0XCIpO1xyXG4gIH1cclxuICBzZXRXaW5uZXIoY291bGV1ciwgcGlvbnNHYWduYW50cykge1xyXG4gICAgdGhpcy5kaXNhYmxlR2FtZSgpXHJcbiAgICBpZiAocGlvbnNHYWduYW50cykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBpb25zR2FnbmFudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgaW5kZXhWZXJ0aWNhbGUgPSBwaW9uc0dhZ25hbnRzW2ldWzBdXHJcbiAgICAgICAgbGV0IGluZGV4SG9yaXpvbnRhbGUgPSBwaW9uc0dhZ25hbnRzW2ldWzFdXHJcbiAgICAgICAgbGV0IGNvdWxldXIgPSAkKFwiI2dhbWUgLnJvd1wiKS5lcSgoaW5kZXhWZXJ0aWNhbGUgLSAxKSkuZmluZChcIi5pY29uXCIpLmVxKChpbmRleEhvcml6b250YWxlIC0gMSkpXHJcbiAgICAgICAgJChjb3VsZXVyKS5jc3MoXCJvcGFjaXR5XCIsIDEpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChjb3VsZXVyID09ICdyZWQnKSB7XHJcbiAgICAgIHRoaXMuc2V0TWVzc2FnZShcIkxlcyByb3VnZXMgb250IGdhZ27DqXNcIik7XHJcbiAgICB9IGVsc2UgaWYgKGNvdWxldXIgPT0gJ3llbGxvdycpIHtcclxuICAgICAgdGhpcy5zZXRNZXNzYWdlKFwiTGVzIGphdW5lcyBvbnQgZ2FnbsOpc1wiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2V0TWVzc2FnZShcIk1hdGNoIG51bCAhXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuICBsb2cocHJlZml4LCBtZXNzYWdlLCBjb2xvclRleHQpIHtcclxuICAgIGlmICghY29sb3JUZXh0KSB7XHJcbiAgICAgIGNvbG9yVGV4dCA9IFwiZmFsc2VcIlxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coXHJcbiAgICAgIFwiJWNbXCIgKyBwcmVmaXggKyBcIl0gJWNcIiArIG1lc3NhZ2UsXHJcbiAgICAgIFwiY29sb3I6IHB1cnBsZTsgZm9udC1zaXplOiAxM3B4OyBmb250LXdlaWdodDogYm9sZDtcIixcclxuICAgICAgXCJmb250LXNpemU6IDEzcHg7IGNvbG9yOiBcIiArIGNvbG9yVGV4dFxyXG4gICAgKTtcclxuICB9XHJcbiAgZGlzYWJsZUdhbWUoKSB7XHJcbiAgICAkKFwiI2dhbWUgLmljb25cIikuY3NzKFwib3BhY2l0eVwiLCAwLjMpXHJcbiAgICB0aGlzLm1vblRvdXIuc2V0KGZhbHNlKVxyXG4gIH1cclxuICBlbmFibGVHYW1lKCkge1xyXG4gICAgJChcIiNnYW1lIC5pY29uXCIpLmNzcyhcIm9wYWNpdHlcIiwgMSlcclxuICAgIHRoaXMubW9uVG91ci5zZXQodHJ1ZSlcclxuICB9XHJcbiAgY3JlYXRlQmFja2dyb3VuZCgpIHtcclxuICAgIGxldCBQeCA9IHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldTtcclxuICAgIGxldCBQeSA9IHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXU7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1OyBpKyspIHtcclxuICAgICAgbGV0IHJvd1kgPSAnPGRpdiBjbGFzcz1cInJvd1wiIHZhbD1cIicgKyBpICsgJ1wiPjwvZGl2Pic7XHJcbiAgICAgICQoXCIjZ2FtZVwiKS5hcHBlbmQocm93WSk7XHJcbiAgICAgIGZvciAobGV0IGogPSAxOyBqIDw9IHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldTsgaisrKSB7XHJcbiAgICAgICAgJCgnLnJvd1t2YWw9XCInICsgaSArICdcIl0nKS5hcHBlbmQodGhpcy5zZWFyY2hQaWVjZShudWxsLCBqKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZm9yY2VBZGRQaW9uKHBvc2l0aW9uSG9yaXpvbnRhbGUsIHBvc2l0aW9uVmVydGljYWxlLCBjb3VsZXVyKSB7XHJcbiAgICAkKFwiLnJvd1t2YWw9J1wiICsgcG9zaXRpb25WZXJ0aWNhbGUgKyBcIiddIC5pY29uW2Nhc2U9J1wiICsgcG9zaXRpb25Ib3Jpem9udGFsZSArIFwiJ11cIikucmVwbGFjZVdpdGgodGhpcy5zZWFyY2hQaWVjZShjb3VsZXVyLCBwb3NpdGlvbkhvcml6b250YWxlKSk7XHJcbiAgICAkKFwiLnJvd1t2YWw9J1wiICsgcG9zaXRpb25WZXJ0aWNhbGUgKyBcIiddIC5pY29uW2Nhc2U9J1wiICsgcG9zaXRpb25Ib3Jpem9udGFsZSArIFwiJ11cIikuYXR0cihcInRlYW1cIiwgY291bGV1cik7XHJcbiAgICBpZiAoY291bGV1ciA9PSAneWVsbG93Jykge1xyXG4gICAgICB0aGlzLnNldFBpb24oMiwgW3Bvc2l0aW9uSG9yaXpvbnRhbGUsIHBvc2l0aW9uVmVydGljYWxlXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNldFBpb24oMSwgW3Bvc2l0aW9uSG9yaXpvbnRhbGUsIHBvc2l0aW9uVmVydGljYWxlXSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldFBvc2l0aW9uSG9yaXpvbnRhbGUoZXZlbnQpIHtcclxuICAgIHJldHVybiAkKGV2ZW50KS5wYXJlbnQoKS5pbmRleCgpICsgMTtcclxuICB9XHJcbiAgYWRkUGlvbihpbmRleEhvcml6b250YWxlQ2xpY2tlZCkge1xyXG4gICAgY29uc3QgdGFpbGxlVmVydGljYWxlID0gdGhpcy5nZXRUYWlsbGVWZXJ0aWNhbGUoKVxyXG4gICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGUgPSB0aGlzLmdldFRhaWxsZUhvcml6b250YWxlKClcclxuICAgIGxldCBwbGFjZUlzTm90VGFrZW4gPSB0cnVlO1xyXG4gICAgbGV0IGluZGV4VmVydGljYWxlID0gdGFpbGxlVmVydGljYWxlO1xyXG4gICAgaWYgKHRoaXMubW9uVG91ci5nZXQoKSkge1xyXG4gICAgICB3aGlsZSAoaW5kZXhWZXJ0aWNhbGUgPiAwICYmIHBsYWNlSXNOb3RUYWtlbikge1xyXG4gICAgICAgIGxldCBjb3VsZXVyRHVQaW9uID0gdGhpcy5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleEhvcml6b250YWxlQ2xpY2tlZCwgaW5kZXhWZXJ0aWNhbGUpO1xyXG4gICAgICAgIGlmICghY291bGV1ckR1UGlvbikge1xyXG4gICAgICAgICAgcGxhY2VJc05vdFRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLm1vblRvdXIuc2V0KGZhbHNlKTtcclxuICAgICAgICAgIHRoaXMudW5TZWxlY3QoKTtcclxuICAgICAgICAgIHRoaXMuZm9yY2VBZGRQaW9uKGluZGV4SG9yaXpvbnRhbGVDbGlja2VkLCBpbmRleFZlcnRpY2FsZSwgXCJyZWRcIilcclxuICAgICAgICAgIGxldCBsZXNQaW9uc0dhZ25hbnRzID0gV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLCBcInJlZFwiKTtcclxuICAgICAgICAgIGlmIChsZXNQaW9uc0dhZ25hbnRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0V2lubmVyKCdyZWQnLCBsZXNQaW9uc0dhZ25hbnRzKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0RyYXcoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFdpbm5lcihudWxsLCBudWxsKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3QoaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1lc3NhZ2UoXCJBdSB0b3VyIGRlIGwnYWR2ZXJzYWlyZSFcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGdhbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICBjb25zdCBhdWRpbyA9IG5ldyBBdWRpbygnLi4vLi4vcHVibGljL2F1ZGlvL3BvcC5tcDQnKTtcclxuICAgICAgICAgICAgICBhdWRpby5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgY29uc3Qgcm9ib3RNYW5hZ2VyID0gUm9ib3RNYW5hZ2VyLmdldFJvYm90TWFuYWdlcihnYW1lKVxyXG4gICAgICAgICAgICAgIGlmIChyb2JvdE1hbmFnZXIucm9ib3RQbGFjZVVuUGlvbihcInllbGxvd1wiKSkge1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5zZXRNZXNzYWdlKFwiVHUgYXMgcGVyZHUgbGEgcGFydGllICFcIik7XHJcbiAgICAgICAgICAgICAgICBnYW1lLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiUGVyZHUgIVwiKTtcclxuICAgICAgICAgICAgICAgIGdhbWUubW9uVG91ci5zZXQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS51blNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleEhvcml6b250YWxlQ2xpY2tlZCwgaW5kZXhWZXJ0aWNhbGUgKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAvLyBTaSBsZSByb2JvdCBhIGpvdcOpIHN1ciBsYSBtw6ptZSBjb2xvbm5lLCBvbiBhY3R1YWxpc2UgbGEgc8OpbGVjdGlvblxyXG4gICAgICAgICAgICAgICAgICBnYW1lLnNlbGVjdChpbmRleEhvcml6b250YWxlQ2xpY2tlZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnYW1lLm1vblRvdXIuc2V0KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5zZXRNZXNzYWdlKFwiQSB0b24gdG91ciAhXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleFZlcnRpY2FsZS0tO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubG9nKFxyXG4gICAgICAgIFwiUHVpc3NhbmNlIDRcIixcclxuICAgICAgICBcIkpldG9uIGVuIFg6XCIgKyBpbmRleEhvcml6b250YWxlQ2xpY2tlZCArIFwiIFk6XCIgKyAoaW5kZXhWZXJ0aWNhbGUgKyAxKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuICBzZXRQaW9uKHRlYW0sIHZhbHVlKSB7XHJcbiAgICBpZiAodGVhbSA9PSAxIHx8IHRlYW0gPT0gJ3JlZCcpIHtcclxuICAgICAgdGhpcy5saXN0ZVBpb25zUm91Z2UucHVzaCh2YWx1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKHRlYW0gPT0gMiB8fCB0ZWFtID09ICd5ZWxsb3cnKSB7XHJcbiAgICAgIHRoaXMubGlzdGVQaW9uc0phdW5lLnB1c2godmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTGUgam91ZXVyIGVzdCBpbnRyb3V2YWJsZVwiKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmVtb3ZlUGlvbih0ZWFtLCB2YWx1ZSkge1xyXG4gICAgbGV0IGluZGV4O1xyXG4gICAgaWYgKHRlYW0gPT0gMSB8fCB0ZWFtID09ICdyZWQnKSB7XHJcbiAgICAgIGluZGV4ID0gVXRpbHMuZ2V0SW5kZXhPZjJEQXJyYXkodGhpcy5saXN0ZVBpb25zUm91Z2UsIHZhbHVlKVxyXG4gICAgICB0aGlzLmxpc3RlUGlvbnNSb3VnZS5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICB9IGVsc2UgaWYgKHRlYW0gPT0gMiB8fCB0ZWFtID09ICd5ZWxsb3cnKSB7XHJcbiAgICAgIGluZGV4ID0gVXRpbHMuZ2V0SW5kZXhPZjJEQXJyYXkodGhpcy5saXN0ZVBpb25zSmF1bmUsIHZhbHVlKVxyXG4gICAgICB0aGlzLmxpc3RlUGlvbnNKYXVuZS5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBcIkxlIGpvdWV1ciBlc3QgaW50cm91dmFibGVcIjtcclxuICAgIH1cclxuICB9XHJcbiAgY2xlYXJQaW9ucygpIHtcclxuICAgIHRoaXMubGlzdGVQaW9uc1JvdWdlID0gW107XHJcbiAgICB0aGlzLmxpc3RlUGlvbnNKYXVuZSA9IFtdO1xyXG4gICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkxlcyBkb25uw6llcyBkZXMgcGlvbnMgb250IMOpdMOpIGVmZmFjw6lzXCIpO1xyXG4gIH1cclxuICBnZXRQaW9ucyh0ZWFtKSB7XHJcbiAgICBpZiAodGVhbSA9PSAxIHx8IHRlYW0gPT0gJ3JlZCcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVQaW9uc1JvdWdlO1xyXG4gICAgfSBlbHNlIGlmICh0ZWFtID09IDIgfHwgdGVhbSA9PSAneWVsbG93Jykge1xyXG4gICAgICByZXR1cm4gdGhpcy5saXN0ZVBpb25zSmF1bmU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBcIkxlIGpvdWV1ciBlc3QgaW50cm91dmFibGVcIjtcclxuICAgIH1cclxuICB9XHJcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=