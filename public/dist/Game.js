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
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _Jeton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);





var Game = /** @class */ (function () {
    function Game(tailleHorizontale, tailleVerticale) {
        this.tailleHorizontaleDuJeu = tailleHorizontale;
        this.tailleVerticaleDuJeu = tailleVerticale;
        this.listePionsRouge = new Array();
        this.listePionsJaune = new Array();
        this.monTour = new _MonTour__WEBPACK_IMPORTED_MODULE_0__.MonTour();
        this.disableGame();
        this.log("Puissance 4", "Initialisation du jeu en " + this.tailleHorizontaleDuJeu + "x" + this.tailleVerticaleDuJeu);
        Game.game = this;
    }
    Game.getGame = function () {
        if (Game.game) {
            return Game.game;
        }
        else {
            var tailleHorizontaleParsed = this.getTailleHorizontaleFromUrl();
            var tailleVerticaleParsed = this.getTailleVerticaleFromUrl();
            return new Game(tailleHorizontaleParsed, tailleVerticaleParsed);
        }
    };
    Game.getTailleHorizontaleFromUrl = function () {
        var paramsUrl = _Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.parseURLParams(window.location.href);
        if (typeof paramsUrl !== 'undefined' && paramsUrl.tailleHorizontale !== 'undefined') {
            var tailleHorizontale = paramsUrl.tailleHorizontale[0];
            if (parseInt(tailleHorizontale)) {
                var tailleHorizontaleParsed = parseInt(tailleHorizontale);
                if (tailleHorizontaleParsed >= 4 && tailleHorizontaleParsed <= 20) {
                    return tailleHorizontaleParsed;
                }
                else {
                    return 7;
                }
            }
            else {
                return 7;
            }
        }
        else {
            return 7;
        }
    };
    Game.getTailleVerticaleFromUrl = function () {
        var paramsUrl = _Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.parseURLParams(window.location.href);
        if (typeof paramsUrl !== 'undefined' && paramsUrl.tailleVerticale !== 'undefined') {
            var tailleVerticale = paramsUrl.tailleVerticale[0];
            if (parseInt(tailleVerticale)) {
                var tailleVerticaleParsed = parseInt(tailleVerticale);
                if (tailleVerticaleParsed >= 4 && tailleVerticaleParsed <= 20) {
                    return tailleVerticaleParsed;
                }
                else {
                    return 5;
                }
            }
            else {
                return 5;
            }
        }
        else {
            return 5;
        }
    };
    Game.prototype.searchPiece = function (couleur, initCase) {
        var redCircle = $('#preview #red_circle');
        var yellowCircle = $('#preview #yellow_circle');
        var defaultCircle = $('#preview #basic_circle');
        if (initCase) {
            if (couleur === 'red') {
                $(redCircle).children().children().attr('case', initCase);
                return $(redCircle).html();
            }
            else if (couleur === 'yellow') {
                $(yellowCircle).children().children().attr('case', initCase);
                return $(yellowCircle).html();
            }
            else {
                $(defaultCircle).children().children().attr('case', initCase);
                return $(defaultCircle).html();
            }
        }
        else {
            if (couleur === 'red') {
                return $(redCircle).html();
            }
            else if (couleur === 'yellow') {
                return $(yellowCircle).html();
            }
            else {
                return $(defaultCircle).html();
            }
        }
    };
    Game.prototype.getColorOfPionPlaced = function (indexHorizontale, indexVerticale) {
        var listePionsRouge = this.getPions(1);
        var listePionsJaune = this.getPions(2);
        if (_Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.array2DContainsArray(listePionsRouge, [indexHorizontale, indexVerticale])) {
            return 'red';
        }
        else if (_Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.array2DContainsArray(listePionsJaune, [indexHorizontale, indexVerticale])) {
            return 'yellow';
        }
        else {
            return false;
        }
    };
    Game.prototype.clearGame = function () {
        $('.row').remove();
    };
    Game.prototype.resetGame = function () {
        this.clearGame();
        this.clearPions();
        this.createBackground();
        this.disableGame();
    };
    Game.prototype.playGame = function () {
        var audio = new Audio('../public/audio/startGame.mp4');
        audio.play();
        audio = null;
        this.resetGame();
        this.setMessage("A toi de jouer !");
        this.enableGame();
    };
    Game.prototype.select = function (indexHorizontale) {
        var indexVerticale = this.getTailleVerticale();
        while (indexVerticale > 0) {
            var teamColor = this.getColorOfPionPlaced(indexHorizontale, indexVerticale);
            if (!teamColor) {
                var couleur = $("#game .row").eq((indexVerticale - 1)).find(".icon").eq(indexHorizontale - 1);
                couleur.attr("surbrillance", "red");
                return;
            }
            indexVerticale--;
        }
    };
    Game.prototype.getLesColonnesNonCompletes = function () {
        var listeColonnesNonCompletes = [];
        for (var indexHorizontale = 1; indexHorizontale <= this.tailleHorizontaleDuJeu; indexHorizontale++) {
            if (!this.getColorOfPionPlaced(indexHorizontale, 1)) {
                listeColonnesNonCompletes.push(indexHorizontale);
            }
        }
        return listeColonnesNonCompletes;
    };
    Game.prototype.isDraw = function () {
        return this.listePionsJaune.length + this.listePionsRouge.length >= this.getTailleHorizontale() * this.getTailleVerticale();
    };
    Game.prototype.getTailleHorizontale = function () {
        return this.tailleHorizontaleDuJeu;
    };
    Game.prototype.getTailleVerticale = function () {
        return this.tailleVerticaleDuJeu;
    };
    Game.prototype.getLesCasesPouvantEtreJouer = function () {
        var _this = this;
        var listeDesCasesPouvantEtreJouer = [];
        var listeColonnesNonCompletes = this.getLesColonnesNonCompletes();
        var aTrouverLePion;
        listeColonnesNonCompletes.forEach(function (numeroColonneHorizontale) {
            var numeroColonneVerticale = _this.getTailleVerticale();
            aTrouverLePion = false;
            while (numeroColonneVerticale > 0 && !aTrouverLePion) {
                if (!_Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.array2DContainsArray(_this.getPions(1), [numeroColonneHorizontale, numeroColonneVerticale])
                    && !_Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.array2DContainsArray(_this.getPions(2), [numeroColonneHorizontale, numeroColonneVerticale])) {
                    listeDesCasesPouvantEtreJouer.push([numeroColonneHorizontale, numeroColonneVerticale]);
                    aTrouverLePion = true;
                }
                numeroColonneVerticale--;
            }
        });
        return listeDesCasesPouvantEtreJouer;
    };
    Game.prototype.export = function () {
        this.log("Puissance 4", "Affichage de l'export...");
        var params = {};
        params['red'] = this.getPions('red');
        params['yellow'] = this.getPions('yellow');
        var red = params['red'];
        var yellow = params['yellow'];
        var request = $.ajax({
            type: 'POST',
            url: "api/export?x=" + this.tailleHorizontaleDuJeu + "&y=" + this.tailleVerticaleDuJeu,
            data: { red: red, yellow: yellow },
            cache: false,
            timeout: 120000
        });
        request.done(function (output_success) {
            console.log(output_success);
            this.log("Puissance 4", "L'export s'est correctement terminé");
        });
        request.fail(function (http_error) {
            var server_msg = http_error.responseText;
            var code = http_error.status;
            var code_label = http_error.statusText;
            this.log("Puissance 4", "Echec lors de l'export (" + code + ")");
        });
    };
    Game.prototype.unSelect = function () {
        $(".row .icon").attr("surbrillance", "");
    };
    Game.prototype.setMessage = function (message) {
        $("#game p#tour").text(message);
    };
    Game.prototype.import = function (gameObject, parameters) {
        var _this = this;
        if (parameters === void 0) { parameters = false; }
        this.log("Puissance 4", "Début de l'import ...");
        this.log("Puissance 4", "Initialisation des paramètres ...");
        this.tailleHorizontaleDuJeu = parseInt(gameObject.parametres.x);
        this.tailleVerticaleDuJeu = parseInt(gameObject.parametres.y);
        this.resetGame();
        this.log("Puissance 4", "Import des pions ...");
        gameObject.datas.pions.red.forEach(function (pionRouge) {
            _this.forceAddPion(pionRouge[0], pionRouge[1], 'red');
        });
        gameObject.datas.pions.yellow.forEach(function (pionYellow) {
            _this.forceAddPion(pionYellow[0], pionYellow[1], 'yellow');
        });
        if (parameters) {
            this.log("Puissance 4", "Vérification d'un potentiel gagnant ...");
            var gagnantRouge = _WinnerManager__WEBPACK_IMPORTED_MODULE_2__.WinnerManager.verifWin(this, "red");
            var gagnantJaune = _WinnerManager__WEBPACK_IMPORTED_MODULE_2__.WinnerManager.verifWin(this, "yellow");
            if (gagnantRouge) {
                this.setWinner('red', gagnantRouge);
                this.unSelect();
            }
            else if (gagnantJaune) {
                this.setWinner('yellow', gagnantJaune);
                this.monTour.set(false);
                this.unSelect();
            }
        }
        this.log("Puissance 4", "Fin de l'import");
    };
    Game.prototype.setWinner = function (couleur, pionsGagnants) {
        if (pionsGagnants === void 0) { pionsGagnants = null; }
        this.disableGame();
        if (pionsGagnants) {
            for (var i = 0; i < pionsGagnants.length; i++) {
                var indexVerticale = pionsGagnants[i][0];
                var indexHorizontale = pionsGagnants[i][1];
                var surbrillanceRecherche = $("#game .row").eq((indexVerticale - 1)).find(".icon").eq((indexHorizontale - 1));
                $(surbrillanceRecherche).css("opacity", 1);
            }
        }
        if (couleur == 'red') {
            this.setMessage("Les rouges ont gagnés");
        }
        else if (couleur == 'yellow') {
            this.setMessage("Les jaunes ont gagnés");
        }
        else {
            this.setMessage("Match nul !");
        }
    };
    Game.prototype.log = function (prefix, message, colorText) {
        if (colorText === void 0) { colorText = 'false'; }
        console.log("%c[" + prefix + "] %c" + message, "color: purple; font-size: 13px; font-weight: bold;", "font-size: 13px; color: " + colorText);
    };
    Game.prototype.disableGame = function () {
        $("#game .icon").css("opacity", 0.3);
        this.monTour.set(false);
    };
    Game.prototype.enableGame = function () {
        $("#game .icon").css("opacity", 1);
        this.monTour.set(true);
    };
    Game.prototype.createBackground = function () {
        var Px = this.tailleHorizontaleDuJeu;
        var Py = this.tailleVerticaleDuJeu;
        for (var i = 1; i <= this.tailleVerticaleDuJeu; i++) {
            var rowY = '<div class="row" val="' + i + '"></div>';
            $("#game").append(rowY);
            for (var j = 1; j <= this.tailleHorizontaleDuJeu; j++) {
                $('.row[val="' + i + '"]').append(this.searchPiece(null, j));
            }
        }
    };
    Game.prototype.forceAddPion = function (positionHorizontale, positionVerticale, couleur) {
        $(".row[val='" + positionVerticale + "'] .icon[case='" + positionHorizontale + "']").replaceWith(this.searchPiece(couleur, positionHorizontale));
        $(".row[val='" + positionVerticale + "'] .icon[case='" + positionHorizontale + "']").attr("team", couleur);
        if (couleur == 'yellow') {
            this.setPion(2, new _Jeton__WEBPACK_IMPORTED_MODULE_4__.Jeton(positionHorizontale, positionVerticale));
        }
        else {
            this.setPion(1, new _Jeton__WEBPACK_IMPORTED_MODULE_4__.Jeton(positionHorizontale, positionVerticale));
        }
    };
    Game.prototype.getPositionHorizontale = function (event) {
        return $(event).parent().index() + 1;
    };
    Game.prototype.addPion = function (indexHorizontaleClicked) {
        var tailleVerticale = this.getTailleVerticale();
        var placeIsNotTaken = true;
        var indexVerticale = tailleVerticale;
        if (this.monTour.get()) {
            var _loop_1 = function () {
                var couleurDuPion = this_1.getColorOfPionPlaced(indexHorizontaleClicked, indexVerticale);
                if (!couleurDuPion) {
                    placeIsNotTaken = false;
                    this_1.monTour.set(false);
                    this_1.unSelect();
                    this_1.forceAddPion(indexHorizontaleClicked, indexVerticale, "red");
                    var lesPionsGagnants = _WinnerManager__WEBPACK_IMPORTED_MODULE_2__.WinnerManager.verifWin(this_1, "red");
                    if (lesPionsGagnants) {
                        this_1.setWinner('red', lesPionsGagnants);
                    }
                    else if (this_1.isDraw()) {
                        this_1.setWinner(null, null);
                    }
                    else {
                        this_1.select(indexHorizontaleClicked);
                        this_1.setMessage("Au tour de l'adversaire!");
                        var game_1 = this_1;
                        setTimeout(function () {
                            var audio = new Audio('../../public/audio/pop.mp4');
                            audio.play();
                            var robotManager = _RobotManager__WEBPACK_IMPORTED_MODULE_3__.RobotManager.getRobotManager(game_1);
                            if (robotManager.robotPlaceUnPion("yellow")) {
                                game_1.setMessage("Tu as perdu la partie !");
                                game_1.log("Puissance 4", "Perdu !");
                                game_1.monTour.set(false);
                                game_1.unSelect();
                            }
                            else {
                                if (game_1.getColorOfPionPlaced(indexHorizontaleClicked, indexVerticale + 1)) {
                                    // Si le robot a joué sur la même colonne, on actualise la sélection
                                    game_1.select(indexHorizontaleClicked);
                                }
                                game_1.monTour.set(true);
                                game_1.setMessage("A ton tour !");
                            }
                        }, 50);
                    }
                }
                indexVerticale--;
            };
            var this_1 = this;
            while (indexVerticale > 0 && placeIsNotTaken) {
                _loop_1();
            }
            this.log("Puissance 4", "Jeton en X:" + indexHorizontaleClicked + " Y:" + (indexVerticale + 1));
        }
    };
    Game.prototype.setPion = function (team, value) {
        if (team == 1 || team == 'red') {
            this.listePionsRouge.push(value);
        }
        else if (team == 2 || team == 'yellow') {
            this.listePionsJaune.push(value);
        }
        else {
            throw new Error("Le joueur est introuvable");
        }
    };
    Game.prototype.removePion = function (team, value) {
        var index;
        if (team == 1 || team == 'red') {
            index = _Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.getIndexOf2DArray(this.listePionsRouge, value);
            this.listePionsRouge.splice(index, 1);
        }
        else if (team == 2 || team == 'yellow') {
            index = _Utils__WEBPACK_IMPORTED_MODULE_1__.Utils.getIndexOf2DArray(this.listePionsJaune, value);
            this.listePionsJaune.splice(index, 1);
        }
        else {
            throw "Le joueur est introuvable";
        }
    };
    Game.prototype.clearPions = function () {
        this.listePionsRouge = [];
        this.listePionsJaune = [];
        this.log("Puissance 4", "Les données des pions ont été effacés");
    };
    Game.prototype.getPions = function (team) {
        if (team == 1 || team == 'red') {
            return this.listePionsRouge;
        }
        else if (team == 2 || team == 'yellow') {
            return this.listePionsJaune;
        }
        else {
            throw "Le joueur est introuvable";
        }
    };
    return Game;
}());


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YW5jZTQvLi9zcmMvbW9kdWxlcy9Nb25Ub3VyLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9VdGlscy5qcyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvV2lubmVyTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvQ2hlY2tJZldpbm5lci5qcyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvUm9ib3RNYW5hZ2VyLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9KZXRvbi5qcyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3B1aXNzYW5jZTQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3B1aXNzYW5jZTQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL0dhbWUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE1vblRvdXIge1xyXG4gIHNldChtb25Ub3VyKSB7XHJcbiAgICB0aGlzLm1vblRvdXIgPSBtb25Ub3VyXHJcbiAgfVxyXG4gIGdldCgpIHtcclxuICAgIHJldHVybiB0aGlzLm1vblRvdXJcclxuICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgVXRpbHMge1xyXG4gIHN0YXRpYyBnZXRFbnRpZXJBbGVhdG9pcmUobWluLCBtYXgpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbik7XHJcbiAgfVxyXG4gIFxyXG4gIHN0YXRpYyBnZXRFbGVtZW50QWxlYXRvaXJlKGxpc3RlKSB7XHJcbiAgICBsZXQgbG9uZ3VldXJMaXN0ZSA9IGxpc3RlLmxlbmd0aDtcclxuICAgIGxldCBlbnRpZXJBbGVhdG9pcmVJbmRleGVQYXJMaXN0ZSA9IFV0aWxzLmdldEVudGllckFsZWF0b2lyZSgwLCBsb25ndWV1ckxpc3RlKTtcclxuICAgIHJldHVybiBsaXN0ZVtlbnRpZXJBbGVhdG9pcmVJbmRleGVQYXJMaXN0ZV07XHJcbiAgfVxyXG4gIFxyXG4gIHN0YXRpYyBhcnJheTJEQ29udGFpbnNBcnJheShhcnJheTJELCBhcnJheVNlYXJjaCkge1xyXG4gICAgbGV0IGl0ZW1TdHJpbmcgPSBKU09OLnN0cmluZ2lmeShhcnJheVNlYXJjaCk7XHJcbiAgICBsZXQgY29udGFpbnMgPSBhcnJheTJELnNvbWUoZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZWxlbWVudCkgPT09IGl0ZW1TdHJpbmc7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBjb250YWlucztcclxuICB9XHJcbiAgXHJcbiAgc3RhdGljIGdldEluZGV4T2YyREFycmF5KGFycmF5MkQsIGluZGV4KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5MkQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIGN1cnJlbnRBcnJheSA9IGFycmF5MkRbaV07XHJcbiAgICAgIGlmIChjdXJyZW50QXJyYXlbMF0gPT0gaW5kZXhbMF0gJiYgY3VycmVudEFycmF5WzFdID09IGluZGV4WzFdKSB7XHJcbiAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRDb3VsZXVyRXF1aXBlQWxlYXRvaXJlKCkge1xyXG4gICAgbGV0IGxpc3RlRGVDb3VsZXVycyA9IFtcInllbGxvd1wiLCBcInJlZFwiXTtcclxuICAgIGxldCBub21icmVBbGVhdG9pcmUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsaXN0ZURlQ291bGV1cnMubGVuZ3RoKTtcclxuICAgIHJldHVybiBsaXN0ZURlQ291bGV1cnNbbm9tYnJlQWxlYXRvaXJlXTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRDb3VsZXVyRXF1aXBlQWR2ZXJzZShjb3VsZXVyRXF1aXBlQWN0dWVsbGUpIHtcclxuICAgIGlmIChjb3VsZXVyRXF1aXBlQWN0dWVsbGUgPT0gJ3JlZCcpIHtcclxuICAgICAgcmV0dXJuICd5ZWxsb3cnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICdyZWQnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBhcnNlVVJMUGFyYW1zKHVybCkge1xyXG4gICAgdmFyIHF1ZXJ5U3RhcnQgPSB1cmwuaW5kZXhPZihcIj9cIikgKyAxLFxyXG4gICAgICAgIHF1ZXJ5RW5kICAgPSB1cmwuaW5kZXhPZihcIiNcIikgKyAxIHx8IHVybC5sZW5ndGggKyAxLFxyXG4gICAgICAgIHF1ZXJ5ID0gdXJsLnNsaWNlKHF1ZXJ5U3RhcnQsIHF1ZXJ5RW5kIC0gMSksXHJcbiAgICAgICAgcGFpcnMgPSBxdWVyeS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpLnNwbGl0KFwiJlwiKSxcclxuICAgICAgICBwYXJtcyA9IHt9LCBpLCBuLCB2LCBudjtcclxuXHJcbiAgICBpZiAocXVlcnkgPT09IHVybCB8fCBxdWVyeSA9PT0gXCJcIikgcmV0dXJuO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG52ID0gcGFpcnNbaV0uc3BsaXQoXCI9XCIsIDIpO1xyXG4gICAgICAgIG4gPSBkZWNvZGVVUklDb21wb25lbnQobnZbMF0pO1xyXG4gICAgICAgIHYgPSBkZWNvZGVVUklDb21wb25lbnQobnZbMV0pO1xyXG5cclxuICAgICAgICBpZiAoIXBhcm1zLmhhc093blByb3BlcnR5KG4pKSBwYXJtc1tuXSA9IFtdO1xyXG4gICAgICAgIHBhcm1zW25dLnB1c2gobnYubGVuZ3RoID09PSAyID8gdiA6IG51bGwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcm1zO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDaGVja0lmV2lubmVyIH0gZnJvbSBcIi4vQ2hlY2tJZldpbm5lclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdpbm5lck1hbmFnZXIge1xyXG4gIHN0YXRpYyB2ZXJpZldpbihnYW1lLCBjb2xvcikge1xyXG4gICAgbGV0IHZlcmlmaWNhdGlvbiA9IENoZWNrSWZXaW5uZXIuaG9yaXpvbnRhbChnYW1lLCBjb2xvcik7XHJcbiAgICBpZiAodmVyaWZpY2F0aW9uKSB7XHJcbiAgICAgIHJldHVybiB2ZXJpZmljYXRpb247XHJcbiAgICB9XHJcbiAgICB2ZXJpZmljYXRpb24gPSBDaGVja0lmV2lubmVyLnZlcnRpY2FsKGdhbWUsIGNvbG9yKTtcclxuICAgIGlmICh2ZXJpZmljYXRpb24pIHtcclxuICAgICAgcmV0dXJuIHZlcmlmaWNhdGlvbjtcclxuICAgIH1cclxuICAgIHZlcmlmaWNhdGlvbiA9IENoZWNrSWZXaW5uZXIuZGlhZ29uYWxUb3BMZWZ0KGdhbWUsIGNvbG9yKTtcclxuICAgIGlmICh2ZXJpZmljYXRpb24pIHtcclxuICAgICAgcmV0dXJuIHZlcmlmaWNhdGlvbjtcclxuICAgIH1cclxuICAgIHZlcmlmaWNhdGlvbiA9IENoZWNrSWZXaW5uZXIuZGlhZ29uYWxUb3BSaWdodChnYW1lLCBjb2xvcik7XHJcbiAgICBpZiAodmVyaWZpY2F0aW9uKSB7XHJcbiAgICAgIHJldHVybiB2ZXJpZmljYXRpb247XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgdmVyaWZJZlBpb25QbGFjZWRHaXZlV2luKGdhbWUsIG51bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZSwgY291bGV1clBpb24pIHtcclxuICAgIGdhbWUuc2V0UGlvbihjb3VsZXVyUGlvbiwgW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pXHJcbiAgICBjb25zdCBpc1dpbm5lciA9IFdpbm5lck1hbmFnZXIudmVyaWZXaW4oZ2FtZSwgY291bGV1clBpb24pXHJcbiAgICBnYW1lLnJlbW92ZVBpb24oY291bGV1clBpb24sIFtudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGVdKVxyXG4gICAgcmV0dXJuIGlzV2lubmVyO1xyXG4gIH1cclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgQ2hlY2tJZldpbm5lciB7XHJcbiAgc3RhdGljIGhvcml6b250YWwoZ2FtZSwgY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgY29uc3QgdGFpbGxlVmVydGljYWxlICAgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKVxyXG4gICAgLy8gVsOpcmlmaWNhdGlvbiBlbiBob3Jpem9udGFsXHJcbiAgICBsZXQgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICBsZXQgY291bGV1ckR1UGlvbjtcclxuICAgIGxldCBuYlBpb25zR2FnbmFudHM7XHJcbiAgICBmb3IgKGxldCBpbmRleFZlcnRpY2FsZSA9IDE7IGluZGV4VmVydGljYWxlIDw9IHRhaWxsZVZlcnRpY2FsZTsgaW5kZXhWZXJ0aWNhbGUrKykge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgZm9yIChsZXQgaW5kZXhIb3Jpem9udGFsZSA9IDE7IGluZGV4SG9yaXpvbnRhbGUgPD0gdGFpbGxlSG9yaXpvbnRhbGU7IGluZGV4SG9yaXpvbnRhbGUrKykge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cysrO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzLnB1c2goW2luZGV4VmVydGljYWxlLCBpbmRleEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHN0YXRpYyB2ZXJ0aWNhbCAoZ2FtZSwgY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgY29uc3QgdGFpbGxlVmVydGljYWxlICAgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKVxyXG4gICAgLy8gUGFyY291cnMgZGUgY2hhcXVlIGNhc2UgaG9yaXpvbnRhbGUgZHUgamV1XHJcbiAgICBsZXQgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICBsZXQgY291bGV1ckR1UGlvbjtcclxuICAgIGxldCBuYlBpb25zR2FnbmFudHM7XHJcbiAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gMTsgaW5kZXhIb3Jpem9udGFsZSA8PSB0YWlsbGVIb3Jpem9udGFsZTsgaW5kZXhIb3Jpem9udGFsZSsrKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAvLyBQYXJjb3VycyBjaGFxdWUgY2FzZSB2ZXJ0aWNhbGUgZGUgbGEgY29sb25uZVxyXG4gICAgICBmb3IgKGxldCBpbmRleFZlcnRpY2FsZSA9IDE7IGluZGV4VmVydGljYWxlIDw9IHRhaWxsZVZlcnRpY2FsZTsgaW5kZXhWZXJ0aWNhbGUrKykge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleFZlcnRpY2FsZSwgaW5kZXhIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZGlhZ29uYWxUb3BMZWZ0IChnYW1lLCBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgICA9IGdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcblxyXG4gICAgbGV0IGNvdWxldXJEdVBpb24sIG5iUGlvbnNHYWduYW50cztcclxuICAgIGxldCBpbmRleENvdXJhbnRIb3Jpem9udGFsZTtcclxuICAgIGxldCBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgIGxldCBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPSA0O1xyXG5cclxuICAgIC8vIFBhcmNvdXJzIHRvdXRlcyBsZXMgZGlhZ29uYWxlcyDDoCBnYXVjaGVzIMOgIHBhcnRpciBkZSA0LlxyXG4gICAgZm9yIChsZXQgaW5kZXhWZXJ0aWNhbGUgPSA0OyBpbmRleFZlcnRpY2FsZSA8PSB0YWlsbGVWZXJ0aWNhbGU7IGluZGV4VmVydGljYWxlKyspIHtcclxuICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlID0gMTtcclxuICAgICAgXHJcbiAgICAgIC8vIFbDqXJpZmllciBsYSBsaWduZSBlbiBkaWFnb25hbGVcclxuICAgICAgd2hpbGUgKGluZGV4Q291cmFudEhvcml6b250YWxlIDw9IHRhaWxsZUhvcml6b250YWxlICYmIGluZGV4Q291cmFudFZlcnRpY2FsZSA+PSAxKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUsIGluZGV4Q291cmFudFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhDb3VyYW50VmVydGljYWxlLCBpbmRleENvdXJhbnRIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUtLTtcclxuICAgICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSsrO1xyXG4gICAgICB9XHJcbiAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZSA9IGluZGV4VmVydGljYWxlICsgMTtcclxuICAgIH1cclxuXHJcbiAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gMjsgaW5kZXhIb3Jpem9udGFsZSA8PSAodGFpbGxlSG9yaXpvbnRhbGUtNCk7IGluZGV4SG9yaXpvbnRhbGUrKykge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPSBpbmRleEhvcml6b250YWxlO1xyXG4gICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPSB0YWlsbGVWZXJ0aWNhbGU7XHJcbiAgICAgIC8vIFbDqXJpZmllciBsYSBsaWduZSBlbiBkaWFnb25hbGVcclxuICAgICAgd2hpbGUgKGluZGV4Q291cmFudEhvcml6b250YWxlIDw9IHRhaWxsZUhvcml6b250YWxlICYmIGluZGV4Q291cmFudFZlcnRpY2FsZSA+PSAxKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUsIGluZGV4Q291cmFudFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhDb3VyYW50VmVydGljYWxlLCBpbmRleENvdXJhbnRIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUtLTtcclxuICAgICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSsrO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRpYWdvbmFsVG9wUmlnaHQoZ2FtZSwgY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgY29uc3QgdGFpbGxlVmVydGljYWxlICAgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKVxyXG5cclxuICAgIGxldCBjb3VsZXVyRHVQaW9uLCBuYlBpb25zR2FnbmFudHM7XHJcbiAgICBsZXQgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGU7XHJcbiAgICBsZXQgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcblxyXG4gICAgLy8gUGFyY291cnMgdG91dGVzIGxlcyBkaWFnb25hbGVzIMOgIGdhdWNoZXMgw6AgcGFydGlyIGRlIDQuXHJcbiAgICBmb3IgKGxldCBpbmRleFZlcnRpY2FsZSA9IDQ7IGluZGV4VmVydGljYWxlIDw9IHRhaWxsZVZlcnRpY2FsZTsgaW5kZXhWZXJ0aWNhbGUrKykge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPSB0YWlsbGVIb3Jpem9udGFsZTtcclxuICAgICAgbGV0IGluZGV4Q291cmFudFZlcnRpY2FsZSA9IGluZGV4VmVydGljYWxlO1xyXG4gICAgICAvLyBWw6lyaWZpZXIgbGEgbGlnbmUgZW4gZGlhZ29uYWxlXHJcbiAgICAgIHdoaWxlIChpbmRleENvdXJhbnRIb3Jpem9udGFsZSA+PSAxICYmIGluZGV4Q291cmFudFZlcnRpY2FsZSA+PSAxKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUsIGluZGV4Q291cmFudFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhDb3VyYW50VmVydGljYWxlLCBpbmRleENvdXJhbnRIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZS0tO1xyXG4gICAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZS0tO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaW5kZXhIb3Jpem9udGFsZSA9ICh0YWlsbGVIb3Jpem9udGFsZSAtIDEpOyBpbmRleEhvcml6b250YWxlID49IDQ7IGluZGV4SG9yaXpvbnRhbGUtLSkge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPSBpbmRleEhvcml6b250YWxlO1xyXG4gICAgICBsZXQgaW5kZXhDb3VyYW50VmVydGljYWxlID0gdGFpbGxlVmVydGljYWxlO1xyXG4gICAgICAvLyBWw6lyaWZpZXIgbGEgbGlnbmUgZW4gZGlhZ29uYWxlXHJcbiAgICAgIHdoaWxlIChpbmRleENvdXJhbnRIb3Jpem9udGFsZSA+PSAxICYmIGluZGV4Q291cmFudFZlcnRpY2FsZSA+PSAxKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUsIGluZGV4Q291cmFudFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhDb3VyYW50VmVydGljYWxlLCBpbmRleENvdXJhbnRIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUtLTtcclxuICAgICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZS0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBXaW5uZXJNYW5hZ2VyIH0gZnJvbSBcIi4vV2lubmVyTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJvYm90TWFuYWdlciB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xyXG4gICAgaWYgKGdhbWUpIHtcclxuICAgICAgdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1ID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpO1xyXG4gICAgICB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1ICAgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpO1xyXG4gICAgICB0aGlzLmdhbWUgPSBnYW1lXHJcbiAgICAgIFJvYm90TWFuYWdlci5yb2JvdE1hbmFnZXIgPSB0aGlzXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBdWN1bmUgcGFydGllIGTDqWZpbml0XCIpXHJcbiAgICB9XHJcbiAgICBcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRSb2JvdE1hbmFnZXIoZ2FtZSkge1xyXG4gICAgaWYgKFJvYm90TWFuYWdlci5yb2JvdE1hbmFnZXIpIHtcclxuICAgICAgcmV0dXJuIFJvYm90TWFuYWdlci5yb2JvdE1hbmFnZXJcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBuZXcgUm9ib3RNYW5hZ2VyKGdhbWUpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsYW5jZVVuZVBhcnRpZURlUm9ib3RzKCkge1xyXG4gICAgdGhpcy5nYW1lLnNldE1lc3NhZ2UoXCJSb2JvdCBWcy4gUm9ib3RcIik7XHJcbiAgICB0aGlzLmdhbWUucmVzZXRHYW1lKClcclxuICAgIHRoaXMuZ2FtZS5lbmFibGVHYW1lKClcclxuICAgIHRoaXMuZ2FtZS5tb25Ub3VyLnNldChmYWxzZSlcclxuICAgIC8vIE9uIGNob2lzaXMgdW5lIMOpcXVpcGUgcXVpIGNvbW1lbmNlIGFsw6lhdG9pcmVtZW50XHJcbiAgICBjb25zdCBjb2xvciA9IFV0aWxzLmdldENvdWxldXJFcXVpcGVBbGVhdG9pcmUoKTtcclxuICAgIC8vIE9uIGxhbmNlIGxhIHBhcnRpZVxyXG4gICAgdGhpcy5yb2JvdFZzUm9ib3QoY29sb3IpO1xyXG4gIH1cclxuXHJcbiAgcm9ib3RWc1JvYm90KGNvbG9yKSB7XHJcbiAgICAvLyBTaSBsYSBwYXJ0aWUgbidlc3QgcGFzIHRlcm1pbsOpXHJcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgIGlmICghdGhpcy5yb2JvdFBsYWNlVW5QaW9uKGNvbG9yKSlcclxuICAgIHtcclxuICAgICAgLy8gT24gZmFpcyBqb3VlciBsJ8OpcXVpcGUgYWR2ZXJzZVxyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGF0LnJvYm90VnNSb2JvdChVdGlscy5nZXRDb3VsZXVyRXF1aXBlQWR2ZXJzZShjb2xvcikpXHJcbiAgICAgIH0sIDUpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByb2JvdFBsYWNlVW5QaW9uKGNvbG9yKSB7XHJcbiAgICBjb25zdCBnYW1lID0gdGhpcy5nYW1lO1xyXG4gICAgLy8gT24gcsOpY3Vww6hyZSBsYSBsaXN0ZSBkZXMgY29sb25uZXMgcXVpIG4nb250IHBhcyBsZXVyc1xyXG4gICAgLy8gY29sb25uZXMgY29tcGzDqXTDqXMuXHJcbiAgICBjb25zdCBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzID0gZ2FtZS5nZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpO1xyXG4gICAgbGV0IGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCA9IFV0aWxzLmdldEVsZW1lbnRBbGVhdG9pcmUobGlzdGVDb2xvbm5lc05vbkNvbXBsZXRlcyk7XHJcbiAgICBjb25zdCBsZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIgID0gZ2FtZS5nZXRMZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIoKTtcclxuICAgIGxlc0Nhc2VzUG91dmFudEV0cmVKb3Vlci5mb3JFYWNoKGNhc2VQb3V2YW50RXRyZUpvdWVyID0+IHtcclxuICAgICAgbGV0IGluZGljZUhvcml6b250YWxlID0gY2FzZVBvdXZhbnRFdHJlSm91ZXJbMF07XHJcbiAgICAgIGxldCBpbmRpY2VWZXJ0aWNhbGUgICA9IGNhc2VQb3V2YW50RXRyZUpvdWVyWzFdO1xyXG4gICAgICBpZiAoV2lubmVyTWFuYWdlci52ZXJpZklmUGlvblBsYWNlZEdpdmVXaW4oZ2FtZSwgaW5kaWNlSG9yaXpvbnRhbGUsIGluZGljZVZlcnRpY2FsZSwgY29sb3IpKSB7XHJcbiAgICAgICAgY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50ID0gaW5kaWNlSG9yaXpvbnRhbGU7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoV2lubmVyTWFuYWdlci52ZXJpZklmUGlvblBsYWNlZEdpdmVXaW4oZ2FtZSwgaW5kaWNlSG9yaXpvbnRhbGUsIGluZGljZVZlcnRpY2FsZSwgVXRpbHMuZ2V0Q291bGV1ckVxdWlwZUFkdmVyc2UoY29sb3IpKSkge1xyXG4gICAgICAgIGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCA9IGluZGljZUhvcml6b250YWxlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgICAgXHJcbiAgICBpZiAoIWxlc0Nhc2VzUG91dmFudEV0cmVKb3VlciB8fCBsZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMuZ2FtZS5zZXRXaW5uZXIobnVsbCwgbnVsbCk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGJvdWNsZUFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIGxldCBpbmRpY2VUYWlsbGVWZXJ0aWNhbGUgPSB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1O1xyXG4gICAgICB3aGlsZSAoaW5kaWNlVGFpbGxlVmVydGljYWxlID4gMCAmJiBib3VjbGVBY3RpdmUpIHtcclxuICAgICAgICBsZXQgY291bGV1ckR1UGlvblBsYWNlID0gdGhpcy5nYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCwgaW5kaWNlVGFpbGxlVmVydGljYWxlKTtcclxuICAgICAgICBpZiAoIWNvdWxldXJEdVBpb25QbGFjZSkge1xyXG4gICAgICAgICAgYm91Y2xlQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmdhbWUuZm9yY2VBZGRQaW9uKGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCwgaW5kaWNlVGFpbGxlVmVydGljYWxlLCBjb2xvcilcclxuICAgICAgICAgIC8vYWpvdXRlVW5QaW9uRGFuc0JkZChjb2xvbm5lQ2hvaXNpdEFsZWF0b2lyZW1lbnQsIGluZGljZVRhaWxsZVZlcnRpY2FsZSwgY29sb3IpO1xyXG4gICAgICAgICAgY29uc3QgaXNXaW5uZXIgPSBXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgY29sb3IpO1xyXG4gICAgICAgICAgaWYgKGlzV2lubmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zZXRXaW5uZXIoY29sb3IsIGlzV2lubmVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGljZVRhaWxsZVZlcnRpY2FsZS0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSIsImV4cG9ydCBjbGFzcyBKZXRvbiB7XHJcbiAgY29uc3RydWN0b3IocG9zaXRpb25Ib3Jpem9udGFsZSwgcG9zaXRpb25WZXJ0aWNhbGUpIHtcclxuICAgIHRoaXMucG9zaXRpb25Ib3Jpem9udGFsZSA9IHBvc2l0aW9uSG9yaXpvbnRhbGU7XHJcbiAgICB0aGlzLnBvc2l0aW9uVmVydGljYWxlICAgPSBwb3NpdGlvblZlcnRpY2FsZTtcclxuICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IE1vblRvdXIgfSBmcm9tIFwiLi9Nb25Ub3VyXCJcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBXaW5uZXJNYW5hZ2VyIH0gZnJvbSBcIi4vV2lubmVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBSb2JvdE1hbmFnZXIgfSBmcm9tIFwiLi9Sb2JvdE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSmV0b24gfSBmcm9tIFwiLi9KZXRvblwiO1xyXG5pbXBvcnQgKiBhcyBJbnRlcmZhY2UgZnJvbSBcIi4vSW50ZXJmYWNlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWUge1xyXG5cclxuICBwcml2YXRlIHRhaWxsZUhvcml6b250YWxlRHVKZXU6IG51bWJlcjtcclxuICBwcml2YXRlIHRhaWxsZVZlcnRpY2FsZUR1SmV1OiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBsaXN0ZVBpb25zUm91Z2U6IEFycmF5PEpldG9uPjtcclxuICBwcml2YXRlIGxpc3RlUGlvbnNKYXVuZTogQXJyYXk8SmV0b24+O1xyXG4gIHB1YmxpYyBtb25Ub3VyOiBNb25Ub3VyO1xyXG4gIHByaXZhdGUgc3RhdGljIGdhbWU6IEdhbWU7XHJcblxyXG4gIHByaXZhdGUgY29uc3RydWN0b3IodGFpbGxlSG9yaXpvbnRhbGU6IG51bWJlciwgdGFpbGxlVmVydGljYWxlOiBudW1iZXIpIHtcclxuICAgIHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldSA9IHRhaWxsZUhvcml6b250YWxlO1xyXG4gICAgdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldSA9IHRhaWxsZVZlcnRpY2FsZTtcclxuICAgIHRoaXMubGlzdGVQaW9uc1JvdWdlID0gbmV3IEFycmF5KCk7XHJcbiAgICB0aGlzLmxpc3RlUGlvbnNKYXVuZSA9IG5ldyBBcnJheSgpO1xyXG4gICAgdGhpcy5tb25Ub3VyID0gbmV3IE1vblRvdXIoKVxyXG4gICAgdGhpcy5kaXNhYmxlR2FtZSgpXHJcbiAgICB0aGlzLmxvZyhcclxuICAgICAgXCJQdWlzc2FuY2UgNFwiLFxyXG4gICAgICBcIkluaXRpYWxpc2F0aW9uIGR1IGpldSBlbiBcIiArIHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldSArIFwieFwiICsgdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldVxyXG4gICAgKTtcclxuICAgIEdhbWUuZ2FtZSA9IHRoaXM7XHJcbiAgfVxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0R2FtZSgpIHtcclxuICAgIGlmIChHYW1lLmdhbWUpIHtcclxuICAgICAgcmV0dXJuIEdhbWUuZ2FtZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHRhaWxsZUhvcml6b250YWxlUGFyc2VkID0gdGhpcy5nZXRUYWlsbGVIb3Jpem9udGFsZUZyb21VcmwoKVxyXG4gICAgICBsZXQgdGFpbGxlVmVydGljYWxlUGFyc2VkID0gdGhpcy5nZXRUYWlsbGVWZXJ0aWNhbGVGcm9tVXJsKClcclxuICAgICAgcmV0dXJuIG5ldyBHYW1lKHRhaWxsZUhvcml6b250YWxlUGFyc2VkLCB0YWlsbGVWZXJ0aWNhbGVQYXJzZWQpXHJcblxyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgc3RhdGljIGdldFRhaWxsZUhvcml6b250YWxlRnJvbVVybCgpIHtcclxuICAgIGNvbnN0IHBhcmFtc1VybDogYW55ID0gVXRpbHMucGFyc2VVUkxQYXJhbXMod2luZG93LmxvY2F0aW9uLmhyZWYpXHJcbiAgICBpZiAodHlwZW9mIHBhcmFtc1VybCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGFyYW1zVXJsLnRhaWxsZUhvcml6b250YWxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IHBhcmFtc1VybC50YWlsbGVIb3Jpem9udGFsZVswXTtcclxuICAgICAgaWYgKHBhcnNlSW50KHRhaWxsZUhvcml6b250YWxlKSkge1xyXG4gICAgICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlUGFyc2VkID0gcGFyc2VJbnQodGFpbGxlSG9yaXpvbnRhbGUpXHJcbiAgICAgICAgaWYgKHRhaWxsZUhvcml6b250YWxlUGFyc2VkID49IDQgJiYgdGFpbGxlSG9yaXpvbnRhbGVQYXJzZWQgPD0gMjApIHtcclxuICAgICAgICAgIHJldHVybiB0YWlsbGVIb3Jpem9udGFsZVBhcnNlZFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gNztcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIDc7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiA3O1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgc3RhdGljIGdldFRhaWxsZVZlcnRpY2FsZUZyb21VcmwoKSB7XHJcbiAgICBjb25zdCBwYXJhbXNVcmw6IGFueSA9IFV0aWxzLnBhcnNlVVJMUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXNVcmwgIT09ICd1bmRlZmluZWQnICYmIHBhcmFtc1VybC50YWlsbGVWZXJ0aWNhbGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSA9IHBhcmFtc1VybC50YWlsbGVWZXJ0aWNhbGVbMF07XHJcbiAgICAgIGlmIChwYXJzZUludCh0YWlsbGVWZXJ0aWNhbGUpKSB7XHJcbiAgICAgICAgY29uc3QgdGFpbGxlVmVydGljYWxlUGFyc2VkID0gcGFyc2VJbnQodGFpbGxlVmVydGljYWxlKVxyXG4gICAgICAgIGlmICh0YWlsbGVWZXJ0aWNhbGVQYXJzZWQgPj0gNCAmJiB0YWlsbGVWZXJ0aWNhbGVQYXJzZWQgPD0gMjApIHtcclxuICAgICAgICAgIHJldHVybiB0YWlsbGVWZXJ0aWNhbGVQYXJzZWRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIDU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiA1O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gNTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIHNlYXJjaFBpZWNlKGNvdWxldXI6IHN0cmluZywgaW5pdENhc2U6IG51bWJlcikge1xyXG4gICAgY29uc3QgcmVkQ2lyY2xlID0gJCgnI3ByZXZpZXcgI3JlZF9jaXJjbGUnKVxyXG4gICAgY29uc3QgeWVsbG93Q2lyY2xlID0gJCgnI3ByZXZpZXcgI3llbGxvd19jaXJjbGUnKVxyXG4gICAgY29uc3QgZGVmYXVsdENpcmNsZSA9ICQoJyNwcmV2aWV3ICNiYXNpY19jaXJjbGUnKVxyXG4gICAgaWYgKGluaXRDYXNlKSB7XHJcbiAgICAgIGlmIChjb3VsZXVyID09PSAncmVkJykge1xyXG4gICAgICAgICQocmVkQ2lyY2xlKS5jaGlsZHJlbigpLmNoaWxkcmVuKCkuYXR0cignY2FzZScsIGluaXRDYXNlKVxyXG4gICAgICAgIHJldHVybiAkKHJlZENpcmNsZSkuaHRtbCgpXHJcbiAgICAgIH0gZWxzZSBpZiAoY291bGV1ciA9PT0gJ3llbGxvdycpIHtcclxuICAgICAgICAkKHllbGxvd0NpcmNsZSkuY2hpbGRyZW4oKS5jaGlsZHJlbigpLmF0dHIoJ2Nhc2UnLCBpbml0Q2FzZSlcclxuICAgICAgICByZXR1cm4gJCh5ZWxsb3dDaXJjbGUpLmh0bWwoKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoZGVmYXVsdENpcmNsZSkuY2hpbGRyZW4oKS5jaGlsZHJlbigpLmF0dHIoJ2Nhc2UnLCBpbml0Q2FzZSlcclxuICAgICAgICByZXR1cm4gJChkZWZhdWx0Q2lyY2xlKS5odG1sKClcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNvdWxldXIgPT09ICdyZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuICQocmVkQ2lyY2xlKS5odG1sKClcclxuICAgICAgfSBlbHNlIGlmIChjb3VsZXVyID09PSAneWVsbG93Jykge1xyXG4gICAgICAgIHJldHVybiAkKHllbGxvd0NpcmNsZSkuaHRtbCgpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuICQoZGVmYXVsdENpcmNsZSkuaHRtbCgpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGU6IG51bWJlciwgaW5kZXhWZXJ0aWNhbGU6IG51bWJlcikge1xyXG4gICAgY29uc3QgbGlzdGVQaW9uc1JvdWdlID0gdGhpcy5nZXRQaW9ucygxKVxyXG4gICAgY29uc3QgbGlzdGVQaW9uc0phdW5lID0gdGhpcy5nZXRQaW9ucygyKVxyXG5cclxuICAgIGlmIChVdGlscy5hcnJheTJEQ29udGFpbnNBcnJheShsaXN0ZVBpb25zUm91Z2UsIFtpbmRleEhvcml6b250YWxlLCBpbmRleFZlcnRpY2FsZV0pKSB7XHJcbiAgICAgIHJldHVybiAncmVkJztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKFV0aWxzLmFycmF5MkRDb250YWluc0FycmF5KGxpc3RlUGlvbnNKYXVuZSwgW2luZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlXSkpIHtcclxuICAgICAgcmV0dXJuICd5ZWxsb3cnO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGNsZWFyR2FtZSgpIHtcclxuICAgICQoJy5yb3cnKS5yZW1vdmUoKVxyXG4gIH1cclxuICBwdWJsaWMgcmVzZXRHYW1lKCkge1xyXG4gICAgdGhpcy5jbGVhckdhbWUoKVxyXG4gICAgdGhpcy5jbGVhclBpb25zKClcclxuICAgIHRoaXMuY3JlYXRlQmFja2dyb3VuZCgpXHJcbiAgICB0aGlzLmRpc2FibGVHYW1lKClcclxuICB9XHJcbiAgcHVibGljIHBsYXlHYW1lKCkge1xyXG4gICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCcuLi9wdWJsaWMvYXVkaW8vc3RhcnRHYW1lLm1wNCcpO1xyXG4gICAgYXVkaW8ucGxheSgpO1xyXG4gICAgYXVkaW8gPSBudWxsO1xyXG4gICAgdGhpcy5yZXNldEdhbWUoKVxyXG4gICAgdGhpcy5zZXRNZXNzYWdlKFwiQSB0b2kgZGUgam91ZXIgIVwiKVxyXG4gICAgdGhpcy5lbmFibGVHYW1lKClcclxuICB9XHJcbiAgcHVibGljIHNlbGVjdChpbmRleEhvcml6b250YWxlOiBudW1iZXIpIHtcclxuICAgIGxldCBpbmRleFZlcnRpY2FsZSA9IHRoaXMuZ2V0VGFpbGxlVmVydGljYWxlKCk7XHJcbiAgICB3aGlsZSAoaW5kZXhWZXJ0aWNhbGUgPiAwKSB7XHJcbiAgICAgIGxldCB0ZWFtQ29sb3IgPSB0aGlzLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlKVxyXG4gICAgICBpZiAoIXRlYW1Db2xvcikge1xyXG4gICAgICAgIGxldCBjb3VsZXVyID0gJChcIiNnYW1lIC5yb3dcIikuZXEoKGluZGV4VmVydGljYWxlIC0gMSkpLmZpbmQoXCIuaWNvblwiKS5lcShpbmRleEhvcml6b250YWxlIC0gMSlcclxuICAgICAgICBjb3VsZXVyLmF0dHIoXCJzdXJicmlsbGFuY2VcIiwgXCJyZWRcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGluZGV4VmVydGljYWxlLS07XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpIHtcclxuICAgIGxldCBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzID0gW107XHJcbiAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gMTsgaW5kZXhIb3Jpem9udGFsZSA8PSB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXU7IGluZGV4SG9yaXpvbnRhbGUrKykge1xyXG4gICAgICBpZiAoIXRoaXMuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZSwgMSkpIHtcclxuICAgICAgICBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzLnB1c2goaW5kZXhIb3Jpem9udGFsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzO1xyXG4gIH1cclxuICBwdWJsaWMgaXNEcmF3KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGlzdGVQaW9uc0phdW5lLmxlbmd0aCArIHRoaXMubGlzdGVQaW9uc1JvdWdlLmxlbmd0aCA+PSB0aGlzLmdldFRhaWxsZUhvcml6b250YWxlKCkgKiB0aGlzLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRUYWlsbGVIb3Jpem9udGFsZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXU7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRUYWlsbGVWZXJ0aWNhbGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldTtcclxuICB9XHJcbiAgcHVibGljIGdldExlc0Nhc2VzUG91dmFudEV0cmVKb3VlcigpIHtcclxuICAgIGxldCBsaXN0ZURlc0Nhc2VzUG91dmFudEV0cmVKb3VlcjogQXJyYXk8QXJyYXk8TnVtYmVyPj4gPSBbXTtcclxuICAgIGxldCBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzID0gdGhpcy5nZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpO1xyXG4gICAgbGV0IGFUcm91dmVyTGVQaW9uO1xyXG4gICAgbGlzdGVDb2xvbm5lc05vbkNvbXBsZXRlcy5mb3JFYWNoKG51bWVyb0NvbG9ubmVIb3Jpem9udGFsZSA9PiB7XHJcbiAgICAgIGxldCBudW1lcm9Db2xvbm5lVmVydGljYWxlID0gdGhpcy5nZXRUYWlsbGVWZXJ0aWNhbGUoKTtcclxuICAgICAgYVRyb3V2ZXJMZVBpb24gPSBmYWxzZTtcclxuICAgICAgd2hpbGUgKG51bWVyb0NvbG9ubmVWZXJ0aWNhbGUgPiAwICYmICFhVHJvdXZlckxlUGlvbikge1xyXG4gICAgICAgIGlmICghVXRpbHMuYXJyYXkyRENvbnRhaW5zQXJyYXkodGhpcy5nZXRQaW9ucygxKSwgW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pXHJcbiAgICAgICAgICAmJiAhVXRpbHMuYXJyYXkyRENvbnRhaW5zQXJyYXkodGhpcy5nZXRQaW9ucygyKSwgW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc0Nhc2VzUG91dmFudEV0cmVKb3Vlci5wdXNoKFtudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGVdKVxyXG4gICAgICAgICAgYVRyb3V2ZXJMZVBpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbnVtZXJvQ29sb25uZVZlcnRpY2FsZS0tO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBsaXN0ZURlc0Nhc2VzUG91dmFudEV0cmVKb3VlcjtcclxuICB9XHJcbiAgcHVibGljIGV4cG9ydCgpIHtcclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJBZmZpY2hhZ2UgZGUgbCdleHBvcnQuLi5cIik7XHJcbiAgICBsZXQgcGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IEpldG9uW10gfSA9IHt9O1xyXG4gICAgcGFyYW1zWydyZWQnXSA9IHRoaXMuZ2V0UGlvbnMoJ3JlZCcpXHJcbiAgICBwYXJhbXNbJ3llbGxvdyddID0gdGhpcy5nZXRQaW9ucygneWVsbG93JylcclxuICAgIGNvbnN0IHJlZCA9IHBhcmFtc1sncmVkJ107XHJcbiAgICBjb25zdCB5ZWxsb3cgPSBwYXJhbXNbJ3llbGxvdyddO1xyXG4gICAgY29uc3QgcmVxdWVzdCA9ICQuYWpheCh7XHJcbiAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgdXJsOiBcImFwaS9leHBvcnQ/eD1cIiArIHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldSArIFwiJnk9XCIgKyB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1LFxyXG4gICAgICBkYXRhOiB7IHJlZDogcmVkLCB5ZWxsb3c6IHllbGxvdyB9LFxyXG4gICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgIHRpbWVvdXQ6IDEyMDAwMFxyXG4gICAgfSlcclxuICAgIHJlcXVlc3QuZG9uZShmdW5jdGlvbiAob3V0cHV0X3N1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2cob3V0cHV0X3N1Y2Nlc3MpXHJcbiAgICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJMJ2V4cG9ydCBzJ2VzdCBjb3JyZWN0ZW1lbnQgdGVybWluw6lcIik7XHJcbiAgICB9KVxyXG4gICAgcmVxdWVzdC5mYWlsKGZ1bmN0aW9uIChodHRwX2Vycm9yKSB7XHJcbiAgICAgIGxldCBzZXJ2ZXJfbXNnID0gaHR0cF9lcnJvci5yZXNwb25zZVRleHQ7XHJcbiAgICAgIGxldCBjb2RlID0gaHR0cF9lcnJvci5zdGF0dXM7XHJcbiAgICAgIGxldCBjb2RlX2xhYmVsID0gaHR0cF9lcnJvci5zdGF0dXNUZXh0O1xyXG4gICAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiRWNoZWMgbG9ycyBkZSBsJ2V4cG9ydCAoXCIgKyBjb2RlICsgXCIpXCIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHB1YmxpYyB1blNlbGVjdCgpIHtcclxuICAgICQoXCIucm93IC5pY29uXCIpLmF0dHIoXCJzdXJicmlsbGFuY2VcIiwgXCJcIik7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXRNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgJChcIiNnYW1lIHAjdG91clwiKS50ZXh0KG1lc3NhZ2UpO1xyXG4gIH1cclxuICBwdWJsaWMgaW1wb3J0KGdhbWVPYmplY3Q6IEludGVyZmFjZS5HYW1lT2JqZWN0LCBwYXJhbWV0ZXJzOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJEw6lidXQgZGUgbCdpbXBvcnQgLi4uXCIpO1xyXG4gICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkluaXRpYWxpc2F0aW9uIGRlcyBwYXJhbcOodHJlcyAuLi5cIik7XHJcbiAgICB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXUgPSBwYXJzZUludChnYW1lT2JqZWN0LnBhcmFtZXRyZXMueClcclxuICAgIHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXUgPSBwYXJzZUludChnYW1lT2JqZWN0LnBhcmFtZXRyZXMueSlcclxuICAgIHRoaXMucmVzZXRHYW1lKClcclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJJbXBvcnQgZGVzIHBpb25zIC4uLlwiKTtcclxuICAgIGdhbWVPYmplY3QuZGF0YXMucGlvbnMucmVkLmZvckVhY2gocGlvblJvdWdlID0+IHtcclxuICAgICAgdGhpcy5mb3JjZUFkZFBpb24ocGlvblJvdWdlWzBdLCBwaW9uUm91Z2VbMV0sICdyZWQnKVxyXG4gICAgfSk7XHJcbiAgICBnYW1lT2JqZWN0LmRhdGFzLnBpb25zLnllbGxvdy5mb3JFYWNoKHBpb25ZZWxsb3cgPT4ge1xyXG4gICAgICB0aGlzLmZvcmNlQWRkUGlvbihwaW9uWWVsbG93WzBdLCBwaW9uWWVsbG93WzFdLCAneWVsbG93JylcclxuICAgIH0pO1xyXG4gICAgaWYgKHBhcmFtZXRlcnMpIHtcclxuICAgICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIlbDqXJpZmljYXRpb24gZCd1biBwb3RlbnRpZWwgZ2FnbmFudCAuLi5cIik7XHJcbiAgICAgIGxldCBnYWduYW50Um91Z2UgPSBXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMsIFwicmVkXCIpO1xyXG4gICAgICBsZXQgZ2FnbmFudEphdW5lID0gV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLCBcInllbGxvd1wiKTtcclxuICAgICAgaWYgKGdhZ25hbnRSb3VnZSkge1xyXG4gICAgICAgIHRoaXMuc2V0V2lubmVyKCdyZWQnLCBnYWduYW50Um91Z2UpO1xyXG4gICAgICAgIHRoaXMudW5TZWxlY3QoKTtcclxuICAgICAgfSBlbHNlIGlmIChnYWduYW50SmF1bmUpIHtcclxuICAgICAgICB0aGlzLnNldFdpbm5lcigneWVsbG93JywgZ2FnbmFudEphdW5lKTtcclxuICAgICAgICB0aGlzLm1vblRvdXIuc2V0KGZhbHNlKTtcclxuICAgICAgICB0aGlzLnVuU2VsZWN0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJGaW4gZGUgbCdpbXBvcnRcIik7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXRXaW5uZXIoY291bGV1cjogc3RyaW5nLCBwaW9uc0dhZ25hbnRzOiBudW1iZXJbXVtdID0gbnVsbCkge1xyXG4gICAgdGhpcy5kaXNhYmxlR2FtZSgpXHJcbiAgICBpZiAocGlvbnNHYWduYW50cykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBpb25zR2FnbmFudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgaW5kZXhWZXJ0aWNhbGUgPSBwaW9uc0dhZ25hbnRzW2ldWzBdXHJcbiAgICAgICAgbGV0IGluZGV4SG9yaXpvbnRhbGUgPSBwaW9uc0dhZ25hbnRzW2ldWzFdXHJcbiAgICAgICAgbGV0IHN1cmJyaWxsYW5jZVJlY2hlcmNoZSA9ICQoXCIjZ2FtZSAucm93XCIpLmVxKChpbmRleFZlcnRpY2FsZSAtIDEpKS5maW5kKFwiLmljb25cIikuZXEoKGluZGV4SG9yaXpvbnRhbGUgLSAxKSlcclxuICAgICAgICAkKHN1cmJyaWxsYW5jZVJlY2hlcmNoZSkuY3NzKFwib3BhY2l0eVwiLCAxKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoY291bGV1ciA9PSAncmVkJykge1xyXG4gICAgICB0aGlzLnNldE1lc3NhZ2UoXCJMZXMgcm91Z2VzIG9udCBnYWduw6lzXCIpO1xyXG4gICAgfSBlbHNlIGlmIChjb3VsZXVyID09ICd5ZWxsb3cnKSB7XHJcbiAgICAgIHRoaXMuc2V0TWVzc2FnZShcIkxlcyBqYXVuZXMgb250IGdhZ27DqXNcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNldE1lc3NhZ2UoXCJNYXRjaCBudWwgIVwiKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGxvZyhwcmVmaXg6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBjb2xvclRleHQ6IHN0cmluZyA9ICdmYWxzZScpIHtcclxuICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICBcIiVjW1wiICsgcHJlZml4ICsgXCJdICVjXCIgKyBtZXNzYWdlLFxyXG4gICAgICBcImNvbG9yOiBwdXJwbGU7IGZvbnQtc2l6ZTogMTNweDsgZm9udC13ZWlnaHQ6IGJvbGQ7XCIsXHJcbiAgICAgIFwiZm9udC1zaXplOiAxM3B4OyBjb2xvcjogXCIgKyBjb2xvclRleHRcclxuICAgICk7XHJcbiAgfVxyXG4gIHB1YmxpYyBkaXNhYmxlR2FtZSgpIHtcclxuICAgICQoXCIjZ2FtZSAuaWNvblwiKS5jc3MoXCJvcGFjaXR5XCIsIDAuMylcclxuICAgIHRoaXMubW9uVG91ci5zZXQoZmFsc2UpXHJcbiAgfVxyXG4gIHB1YmxpYyBlbmFibGVHYW1lKCkge1xyXG4gICAgJChcIiNnYW1lIC5pY29uXCIpLmNzcyhcIm9wYWNpdHlcIiwgMSlcclxuICAgIHRoaXMubW9uVG91ci5zZXQodHJ1ZSlcclxuICB9XHJcbiAgcHVibGljIGNyZWF0ZUJhY2tncm91bmQoKSB7XHJcbiAgICBsZXQgUHggPSB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXU7XHJcbiAgICBsZXQgUHkgPSB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1O1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldTsgaSsrKSB7XHJcbiAgICAgIGxldCByb3dZID0gJzxkaXYgY2xhc3M9XCJyb3dcIiB2YWw9XCInICsgaSArICdcIj48L2Rpdj4nO1xyXG4gICAgICAkKFwiI2dhbWVcIikuYXBwZW5kKHJvd1kpO1xyXG4gICAgICBmb3IgKGxldCBqID0gMTsgaiA8PSB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXU7IGorKykge1xyXG4gICAgICAgICQoJy5yb3dbdmFsPVwiJyArIGkgKyAnXCJdJykuYXBwZW5kKHRoaXMuc2VhcmNoUGllY2UobnVsbCwgaikpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBmb3JjZUFkZFBpb24ocG9zaXRpb25Ib3Jpem9udGFsZTogbnVtYmVyLCBwb3NpdGlvblZlcnRpY2FsZTogbnVtYmVyLCBjb3VsZXVyOiBzdHJpbmcpIHtcclxuICAgICQoXCIucm93W3ZhbD0nXCIgKyBwb3NpdGlvblZlcnRpY2FsZSArIFwiJ10gLmljb25bY2FzZT0nXCIgKyBwb3NpdGlvbkhvcml6b250YWxlICsgXCInXVwiKS5yZXBsYWNlV2l0aCh0aGlzLnNlYXJjaFBpZWNlKGNvdWxldXIsIHBvc2l0aW9uSG9yaXpvbnRhbGUpKTtcclxuICAgICQoXCIucm93W3ZhbD0nXCIgKyBwb3NpdGlvblZlcnRpY2FsZSArIFwiJ10gLmljb25bY2FzZT0nXCIgKyBwb3NpdGlvbkhvcml6b250YWxlICsgXCInXVwiKS5hdHRyKFwidGVhbVwiLCBjb3VsZXVyKTtcclxuICAgIGlmIChjb3VsZXVyID09ICd5ZWxsb3cnKSB7XHJcbiAgICAgIHRoaXMuc2V0UGlvbigyLCBuZXcgSmV0b24ocG9zaXRpb25Ib3Jpem9udGFsZSwgcG9zaXRpb25WZXJ0aWNhbGUpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2V0UGlvbigxLCBuZXcgSmV0b24ocG9zaXRpb25Ib3Jpem9udGFsZSwgcG9zaXRpb25WZXJ0aWNhbGUpKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGdldFBvc2l0aW9uSG9yaXpvbnRhbGUoZXZlbnQ6IHN0cmluZ3xKUXVlcnk8YW55Pikge1xyXG4gICAgcmV0dXJuICQoZXZlbnQpLnBhcmVudCgpLmluZGV4KCkgKyAxO1xyXG4gIH1cclxuICBwdWJsaWMgYWRkUGlvbihpbmRleEhvcml6b250YWxlQ2xpY2tlZDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgPSB0aGlzLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgICBsZXQgcGxhY2VJc05vdFRha2VuID0gdHJ1ZTtcclxuICAgIGxldCBpbmRleFZlcnRpY2FsZSA9IHRhaWxsZVZlcnRpY2FsZTtcclxuICAgIGlmICh0aGlzLm1vblRvdXIuZ2V0KCkpIHtcclxuICAgICAgd2hpbGUgKGluZGV4VmVydGljYWxlID4gMCAmJiBwbGFjZUlzTm90VGFrZW4pIHtcclxuICAgICAgICBsZXQgY291bGV1ckR1UGlvbiA9IHRoaXMuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQsIGluZGV4VmVydGljYWxlKTtcclxuICAgICAgICBpZiAoIWNvdWxldXJEdVBpb24pIHtcclxuICAgICAgICAgIHBsYWNlSXNOb3RUYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5tb25Ub3VyLnNldChmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLnVuU2VsZWN0KCk7XHJcbiAgICAgICAgICB0aGlzLmZvcmNlQWRkUGlvbihpbmRleEhvcml6b250YWxlQ2xpY2tlZCwgaW5kZXhWZXJ0aWNhbGUsIFwicmVkXCIpXHJcbiAgICAgICAgICBsZXQgbGVzUGlvbnNHYWduYW50cyA9IFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcywgXCJyZWRcIik7XHJcbiAgICAgICAgICBpZiAobGVzUGlvbnNHYWduYW50cykge1xyXG4gICAgICAgICAgICB0aGlzLnNldFdpbm5lcigncmVkJywgbGVzUGlvbnNHYWduYW50cyk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNEcmF3KCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRXaW5uZXIobnVsbCwgbnVsbClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KGluZGV4SG9yaXpvbnRhbGVDbGlja2VkKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRNZXNzYWdlKFwiQXUgdG91ciBkZSBsJ2FkdmVyc2FpcmUhXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBnYW1lID0gdGhpcztcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgYXVkaW8gPSBuZXcgQXVkaW8oJy4uLy4uL3B1YmxpYy9hdWRpby9wb3AubXA0Jyk7XHJcbiAgICAgICAgICAgICAgYXVkaW8ucGxheSgpO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHJvYm90TWFuYWdlciA9IFJvYm90TWFuYWdlci5nZXRSb2JvdE1hbmFnZXIoZ2FtZSlcclxuICAgICAgICAgICAgICBpZiAocm9ib3RNYW5hZ2VyLnJvYm90UGxhY2VVblBpb24oXCJ5ZWxsb3dcIikpIHtcclxuICAgICAgICAgICAgICAgIGdhbWUuc2V0TWVzc2FnZShcIlR1IGFzIHBlcmR1IGxhIHBhcnRpZSAhXCIpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIlBlcmR1ICFcIik7XHJcbiAgICAgICAgICAgICAgICBnYW1lLm1vblRvdXIuc2V0KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGdhbWUudW5TZWxlY3QoKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQsIGluZGV4VmVydGljYWxlICsgMSkpIHtcclxuICAgICAgICAgICAgICAgICAgLy8gU2kgbGUgcm9ib3QgYSBqb3XDqSBzdXIgbGEgbcOqbWUgY29sb25uZSwgb24gYWN0dWFsaXNlIGxhIHPDqWxlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgZ2FtZS5zZWxlY3QoaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ2FtZS5tb25Ub3VyLnNldCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGdhbWUuc2V0TWVzc2FnZShcIkEgdG9uIHRvdXIgIVwiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kZXhWZXJ0aWNhbGUtLTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmxvZyhcclxuICAgICAgICBcIlB1aXNzYW5jZSA0XCIsXHJcbiAgICAgICAgXCJKZXRvbiBlbiBYOlwiICsgaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQgKyBcIiBZOlwiICsgKGluZGV4VmVydGljYWxlICsgMSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIHNldFBpb24odGVhbTogc3RyaW5nfG51bWJlciwgdmFsdWU6IEpldG9uKSB7XHJcbiAgICBpZiAodGVhbSA9PSAxIHx8IHRlYW0gPT0gJ3JlZCcpIHtcclxuICAgICAgdGhpcy5saXN0ZVBpb25zUm91Z2UucHVzaCh2YWx1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKHRlYW0gPT0gMiB8fCB0ZWFtID09ICd5ZWxsb3cnKSB7XHJcbiAgICAgIHRoaXMubGlzdGVQaW9uc0phdW5lLnB1c2godmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTGUgam91ZXVyIGVzdCBpbnRyb3V2YWJsZVwiKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIHJlbW92ZVBpb24odGVhbTogc3RyaW5nfG51bWJlciwgdmFsdWU6IEpldG9uKSB7XHJcbiAgICBsZXQgaW5kZXg7XHJcbiAgICBpZiAodGVhbSA9PSAxIHx8IHRlYW0gPT0gJ3JlZCcpIHtcclxuICAgICAgaW5kZXggPSBVdGlscy5nZXRJbmRleE9mMkRBcnJheSh0aGlzLmxpc3RlUGlvbnNSb3VnZSwgdmFsdWUpXHJcbiAgICAgIHRoaXMubGlzdGVQaW9uc1JvdWdlLnNwbGljZShpbmRleCwgMSlcclxuICAgIH0gZWxzZSBpZiAodGVhbSA9PSAyIHx8IHRlYW0gPT0gJ3llbGxvdycpIHtcclxuICAgICAgaW5kZXggPSBVdGlscy5nZXRJbmRleE9mMkRBcnJheSh0aGlzLmxpc3RlUGlvbnNKYXVuZSwgdmFsdWUpXHJcbiAgICAgIHRoaXMubGlzdGVQaW9uc0phdW5lLnNwbGljZShpbmRleCwgMSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IFwiTGUgam91ZXVyIGVzdCBpbnRyb3V2YWJsZVwiO1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgY2xlYXJQaW9ucygpIHtcclxuICAgIHRoaXMubGlzdGVQaW9uc1JvdWdlID0gW107XHJcbiAgICB0aGlzLmxpc3RlUGlvbnNKYXVuZSA9IFtdO1xyXG4gICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkxlcyBkb25uw6llcyBkZXMgcGlvbnMgb250IMOpdMOpIGVmZmFjw6lzXCIpO1xyXG4gIH1cclxuICBwdWJsaWMgZ2V0UGlvbnModGVhbTogc3RyaW5nfG51bWJlcikge1xyXG4gICAgaWYgKHRlYW0gPT0gMSB8fCB0ZWFtID09ICdyZWQnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlUGlvbnNSb3VnZTtcclxuICAgIH0gZWxzZSBpZiAodGVhbSA9PSAyIHx8IHRlYW0gPT0gJ3llbGxvdycpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVQaW9uc0phdW5lO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgXCJMZSBqb3VldXIgZXN0IGludHJvdXZhYmxlXCI7XHJcbiAgICB9XHJcbiAgfVxyXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9