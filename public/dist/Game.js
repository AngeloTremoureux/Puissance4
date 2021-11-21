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
    let contains = array2D.some(function (element) {
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
      queryEnd = url.indexOf("#") + 1 || url.length + 1,
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
    const tailleVerticale = game.getTailleVerticale()
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
  static vertical(game, couleurAVerifier) {
    const tailleVerticale = game.getTailleVerticale()
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

  static diagonalTopLeft(game, couleurAVerifier) {
    const tailleVerticale = game.getTailleVerticale()
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

    for (let indexHorizontale = 2; indexHorizontale <= (tailleHorizontale - 4); indexHorizontale++) {
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
    const tailleVerticale = game.getTailleVerticale()
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
      this.tailleVerticaleDuJeu = game.getTailleVerticale();
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
    if (!this.robotPlaceUnPion(color)) {
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
    const lesCasesPouvantEtreJouer = game.getLesCasesPouvantEtreJouer();
    lesCasesPouvantEtreJouer.forEach(casePouvantEtreJouer => {
      let indiceHorizontale = casePouvantEtreJouer[0];
      let indiceVerticale = casePouvantEtreJouer[1];
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
var Jeton = /** @class */ (function () {
    function Jeton(positionHorizontale, positionVerticale) {
        this.positionHorizontale = positionHorizontale;
        this.positionVerticale = positionVerticale;
    }
    Jeton.prototype.getPosition = function () {
        return [this.positionHorizontale, this.positionVerticale];
    };
    Jeton.prototype.getPositionHorizontale = function () {
        return this.positionHorizontale;
    };
    Jeton.prototype.getPositionVerticale = function () {
        return this.positionVerticale;
    };
    return Jeton;
}());



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
        this.getPions(1).forEach(function (jeton) {
            if (jeton.getPosition() == [indexHorizontale, indexVerticale]) {
                return 'red';
            }
        });
        this.getPions(2).forEach(function (jeton) {
            if (jeton.getPosition() == [indexHorizontale, indexVerticale]) {
                return 'yellow';
            }
        });
        return false;
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
            console.log("ajout : " + positionHorizontale + ", " + positionVerticale);
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
            console.log(this.listePionsRouge);
        }
        else if (team == 2 || team == 'yellow') {
            console.log("NEW PION:");
            console.log(value);
            console.log(this.listePionsJaune);
            this.listePionsJaune.push(value);
        }
        else {
            throw new Error("Le joueur est introuvable");
        }
    };
    Game.prototype.getIndexOfPion = function (team, pion) {
        var _this = this;
        this.getPions(team).forEach(function (unPion) {
            if (unPion.getPosition() == pion.getPosition()) {
                return _this.getPions(team).indexOf(unPion);
            }
        });
        return null;
    };
    Game.prototype.removePion = function (team, value) {
        if (team == 1 || team == 'red') {
            var indexOfPion = this.getIndexOfPion('red', value);
            this.listePionsRouge.splice(indexOfPion, 1);
        }
        else if (team == 2 || team == 'yellow') {
            var indexOfPion = this.getIndexOfPion('yellow', value);
            this.listePionsJaune.splice(indexOfPion, 1);
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
            console.log(this.listePionsRouge);
            return this.listePionsRouge;
        }
        else if (team == 2 || team == 'yellow') {
            console.log(this.listePionsJaune);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZUFBZSxDQUFDO1NBQzdCO2FBQU07WUFDTCxNQUFNLDJCQUEyQixDQUFDO1NBQ25DO0lBQ0gsQ0FBQztJQUNILFdBQUM7QUFBRCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL01vblRvdXIuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL1V0aWxzLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9XaW5uZXJNYW5hZ2VyLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9DaGVja0lmV2lubmVyLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9Sb2JvdE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL0pldG9uLnRzIiwid2VicGFjazovL3B1aXNzYW5jZTQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3B1aXNzYW5jZTQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvR2FtZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTW9uVG91ciB7XHJcbiAgc2V0KG1vblRvdXIpIHtcclxuICAgIHRoaXMubW9uVG91ciA9IG1vblRvdXJcclxuICB9XHJcbiAgZ2V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubW9uVG91clxyXG4gIH1cclxufSIsImV4cG9ydCBjbGFzcyBVdGlscyB7XHJcbiAgc3RhdGljIGdldEVudGllckFsZWF0b2lyZShtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRFbGVtZW50QWxlYXRvaXJlKGxpc3RlKSB7XHJcbiAgICBsZXQgbG9uZ3VldXJMaXN0ZSA9IGxpc3RlLmxlbmd0aDtcclxuICAgIGxldCBlbnRpZXJBbGVhdG9pcmVJbmRleGVQYXJMaXN0ZSA9IFV0aWxzLmdldEVudGllckFsZWF0b2lyZSgwLCBsb25ndWV1ckxpc3RlKTtcclxuICAgIHJldHVybiBsaXN0ZVtlbnRpZXJBbGVhdG9pcmVJbmRleGVQYXJMaXN0ZV07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYXJyYXkyRENvbnRhaW5zQXJyYXkoYXJyYXkyRCwgYXJyYXlTZWFyY2gpIHtcclxuICAgIGxldCBpdGVtU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoYXJyYXlTZWFyY2gpO1xyXG4gICAgbGV0IGNvbnRhaW5zID0gYXJyYXkyRC5zb21lKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShlbGVtZW50KSA9PT0gaXRlbVN0cmluZztcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNvbnRhaW5zO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldEluZGV4T2YyREFycmF5KGFycmF5MkQsIGluZGV4KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5MkQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIGN1cnJlbnRBcnJheSA9IGFycmF5MkRbaV07XHJcbiAgICAgIGlmIChjdXJyZW50QXJyYXlbMF0gPT0gaW5kZXhbMF0gJiYgY3VycmVudEFycmF5WzFdID09IGluZGV4WzFdKSB7XHJcbiAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRDb3VsZXVyRXF1aXBlQWxlYXRvaXJlKCkge1xyXG4gICAgbGV0IGxpc3RlRGVDb3VsZXVycyA9IFtcInllbGxvd1wiLCBcInJlZFwiXTtcclxuICAgIGxldCBub21icmVBbGVhdG9pcmUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsaXN0ZURlQ291bGV1cnMubGVuZ3RoKTtcclxuICAgIHJldHVybiBsaXN0ZURlQ291bGV1cnNbbm9tYnJlQWxlYXRvaXJlXTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRDb3VsZXVyRXF1aXBlQWR2ZXJzZShjb3VsZXVyRXF1aXBlQWN0dWVsbGUpIHtcclxuICAgIGlmIChjb3VsZXVyRXF1aXBlQWN0dWVsbGUgPT0gJ3JlZCcpIHtcclxuICAgICAgcmV0dXJuICd5ZWxsb3cnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICdyZWQnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBhcnNlVVJMUGFyYW1zKHVybCkge1xyXG4gICAgdmFyIHF1ZXJ5U3RhcnQgPSB1cmwuaW5kZXhPZihcIj9cIikgKyAxLFxyXG4gICAgICBxdWVyeUVuZCA9IHVybC5pbmRleE9mKFwiI1wiKSArIDEgfHwgdXJsLmxlbmd0aCArIDEsXHJcbiAgICAgIHF1ZXJ5ID0gdXJsLnNsaWNlKHF1ZXJ5U3RhcnQsIHF1ZXJ5RW5kIC0gMSksXHJcbiAgICAgIHBhaXJzID0gcXVlcnkucmVwbGFjZSgvXFwrL2csIFwiIFwiKS5zcGxpdChcIiZcIiksXHJcbiAgICAgIHBhcm1zID0ge30sIGksIG4sIHYsIG52O1xyXG5cclxuICAgIGlmIChxdWVyeSA9PT0gdXJsIHx8IHF1ZXJ5ID09PSBcIlwiKSByZXR1cm47XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIG52ID0gcGFpcnNbaV0uc3BsaXQoXCI9XCIsIDIpO1xyXG4gICAgICBuID0gZGVjb2RlVVJJQ29tcG9uZW50KG52WzBdKTtcclxuICAgICAgdiA9IGRlY29kZVVSSUNvbXBvbmVudChudlsxXSk7XHJcblxyXG4gICAgICBpZiAoIXBhcm1zLmhhc093blByb3BlcnR5KG4pKSBwYXJtc1tuXSA9IFtdO1xyXG4gICAgICBwYXJtc1tuXS5wdXNoKG52Lmxlbmd0aCA9PT0gMiA/IHYgOiBudWxsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJtcztcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ2hlY2tJZldpbm5lciB9IGZyb20gXCIuL0NoZWNrSWZXaW5uZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBXaW5uZXJNYW5hZ2VyIHtcclxuICBzdGF0aWMgdmVyaWZXaW4oZ2FtZSwgY29sb3IpIHtcclxuICAgIGxldCB2ZXJpZmljYXRpb24gPSBDaGVja0lmV2lubmVyLmhvcml6b250YWwoZ2FtZSwgY29sb3IpO1xyXG4gICAgaWYgKHZlcmlmaWNhdGlvbikge1xyXG4gICAgICByZXR1cm4gdmVyaWZpY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgdmVyaWZpY2F0aW9uID0gQ2hlY2tJZldpbm5lci52ZXJ0aWNhbChnYW1lLCBjb2xvcik7XHJcbiAgICBpZiAodmVyaWZpY2F0aW9uKSB7XHJcbiAgICAgIHJldHVybiB2ZXJpZmljYXRpb247XHJcbiAgICB9XHJcbiAgICB2ZXJpZmljYXRpb24gPSBDaGVja0lmV2lubmVyLmRpYWdvbmFsVG9wTGVmdChnYW1lLCBjb2xvcik7XHJcbiAgICBpZiAodmVyaWZpY2F0aW9uKSB7XHJcbiAgICAgIHJldHVybiB2ZXJpZmljYXRpb247XHJcbiAgICB9XHJcbiAgICB2ZXJpZmljYXRpb24gPSBDaGVja0lmV2lubmVyLmRpYWdvbmFsVG9wUmlnaHQoZ2FtZSwgY29sb3IpO1xyXG4gICAgaWYgKHZlcmlmaWNhdGlvbikge1xyXG4gICAgICByZXR1cm4gdmVyaWZpY2F0aW9uO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHZlcmlmSWZQaW9uUGxhY2VkR2l2ZVdpbihnYW1lLCBudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGUsIGNvdWxldXJQaW9uKSB7XHJcbiAgICBnYW1lLnNldFBpb24oY291bGV1clBpb24sIFtudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGVdKVxyXG4gICAgY29uc3QgaXNXaW5uZXIgPSBXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKGdhbWUsIGNvdWxldXJQaW9uKVxyXG4gICAgZ2FtZS5yZW1vdmVQaW9uKGNvdWxldXJQaW9uLCBbbnVtZXJvQ29sb25uZUhvcml6b250YWxlLCBudW1lcm9Db2xvbm5lVmVydGljYWxlXSlcclxuICAgIHJldHVybiBpc1dpbm5lcjtcclxuICB9XHJcblxyXG59IiwiZXhwb3J0IGNsYXNzIENoZWNrSWZXaW5uZXIge1xyXG4gIHN0YXRpYyBob3Jpem9udGFsKGdhbWUsIGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSA9IGdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcbiAgICAvLyBWw6lyaWZpY2F0aW9uIGVuIGhvcml6b250YWxcclxuICAgIGxldCBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgIGxldCBjb3VsZXVyRHVQaW9uO1xyXG4gICAgbGV0IG5iUGlvbnNHYWduYW50cztcclxuICAgIGZvciAobGV0IGluZGV4VmVydGljYWxlID0gMTsgaW5kZXhWZXJ0aWNhbGUgPD0gdGFpbGxlVmVydGljYWxlOyBpbmRleFZlcnRpY2FsZSsrKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gMTsgaW5kZXhIb3Jpem9udGFsZSA8PSB0YWlsbGVIb3Jpem9udGFsZTsgaW5kZXhIb3Jpem9udGFsZSsrKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZSwgaW5kZXhWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKGNvdWxldXJEdVBpb24gPT0gY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhWZXJ0aWNhbGUsIGluZGV4SG9yaXpvbnRhbGVdKTtcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgc3RhdGljIHZlcnRpY2FsKGdhbWUsIGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSA9IGdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcbiAgICAvLyBQYXJjb3VycyBkZSBjaGFxdWUgY2FzZSBob3Jpem9udGFsZSBkdSBqZXVcclxuICAgIGxldCBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgIGxldCBjb3VsZXVyRHVQaW9uO1xyXG4gICAgbGV0IG5iUGlvbnNHYWduYW50cztcclxuICAgIGZvciAobGV0IGluZGV4SG9yaXpvbnRhbGUgPSAxOyBpbmRleEhvcml6b250YWxlIDw9IHRhaWxsZUhvcml6b250YWxlOyBpbmRleEhvcml6b250YWxlKyspIHtcclxuICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgIC8vIFBhcmNvdXJzIGNoYXF1ZSBjYXNlIHZlcnRpY2FsZSBkZSBsYSBjb2xvbm5lXHJcbiAgICAgIGZvciAobGV0IGluZGV4VmVydGljYWxlID0gMTsgaW5kZXhWZXJ0aWNhbGUgPD0gdGFpbGxlVmVydGljYWxlOyBpbmRleFZlcnRpY2FsZSsrKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZSwgaW5kZXhWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKGNvdWxldXJEdVBpb24gPT0gY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzLnB1c2goW2luZGV4VmVydGljYWxlLCBpbmRleEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBkaWFnb25hbFRvcExlZnQoZ2FtZSwgY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgY29uc3QgdGFpbGxlVmVydGljYWxlID0gZ2FtZS5nZXRUYWlsbGVWZXJ0aWNhbGUoKVxyXG4gICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGUgPSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKClcclxuXHJcbiAgICBsZXQgY291bGV1ckR1UGlvbiwgbmJQaW9uc0dhZ25hbnRzO1xyXG4gICAgbGV0IGluZGV4Q291cmFudEhvcml6b250YWxlO1xyXG4gICAgbGV0IGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgbGV0IGluZGV4Q291cmFudFZlcnRpY2FsZSA9IDQ7XHJcblxyXG4gICAgLy8gUGFyY291cnMgdG91dGVzIGxlcyBkaWFnb25hbGVzIMOgIGdhdWNoZXMgw6AgcGFydGlyIGRlIDQuXHJcbiAgICBmb3IgKGxldCBpbmRleFZlcnRpY2FsZSA9IDQ7IGluZGV4VmVydGljYWxlIDw9IHRhaWxsZVZlcnRpY2FsZTsgaW5kZXhWZXJ0aWNhbGUrKykge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPSAxO1xyXG5cclxuICAgICAgLy8gVsOpcmlmaWVyIGxhIGxpZ25lIGVuIGRpYWdvbmFsZVxyXG4gICAgICB3aGlsZSAoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPD0gdGFpbGxlSG9yaXpvbnRhbGUgJiYgaW5kZXhDb3VyYW50VmVydGljYWxlID49IDEpIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleENvdXJhbnRIb3Jpem9udGFsZSwgaW5kZXhDb3VyYW50VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleENvdXJhbnRWZXJ0aWNhbGUsIGluZGV4Q291cmFudEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZS0tO1xyXG4gICAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlKys7XHJcbiAgICAgIH1cclxuICAgICAgaW5kZXhDb3VyYW50VmVydGljYWxlID0gaW5kZXhWZXJ0aWNhbGUgKyAxO1xyXG4gICAgfVxyXG5cclxuICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4SG9yaXpvbnRhbGUgPSAyOyBpbmRleEhvcml6b250YWxlIDw9ICh0YWlsbGVIb3Jpem9udGFsZSAtIDQpOyBpbmRleEhvcml6b250YWxlKyspIHtcclxuICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlID0gaW5kZXhIb3Jpem9udGFsZTtcclxuICAgICAgaW5kZXhDb3VyYW50VmVydGljYWxlID0gdGFpbGxlVmVydGljYWxlO1xyXG4gICAgICAvLyBWw6lyaWZpZXIgbGEgbGlnbmUgZW4gZGlhZ29uYWxlXHJcbiAgICAgIHdoaWxlIChpbmRleENvdXJhbnRIb3Jpem9udGFsZSA8PSB0YWlsbGVIb3Jpem9udGFsZSAmJiBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPj0gMSkge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4Q291cmFudEhvcml6b250YWxlLCBpbmRleENvdXJhbnRWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKGNvdWxldXJEdVBpb24gPT0gY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzLnB1c2goW2luZGV4Q291cmFudFZlcnRpY2FsZSwgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGVdKTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cysrO1xyXG4gICAgICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kZXhDb3VyYW50VmVydGljYWxlLS07XHJcbiAgICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUrKztcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBkaWFnb25hbFRvcFJpZ2h0KGdhbWUsIGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSA9IGdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcblxyXG4gICAgbGV0IGNvdWxldXJEdVBpb24sIG5iUGlvbnNHYWduYW50cztcclxuICAgIGxldCBpbmRleENvdXJhbnRIb3Jpem9udGFsZTtcclxuICAgIGxldCBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuXHJcbiAgICAvLyBQYXJjb3VycyB0b3V0ZXMgbGVzIGRpYWdvbmFsZXMgw6AgZ2F1Y2hlcyDDoCBwYXJ0aXIgZGUgNC5cclxuICAgIGZvciAobGV0IGluZGV4VmVydGljYWxlID0gNDsgaW5kZXhWZXJ0aWNhbGUgPD0gdGFpbGxlVmVydGljYWxlOyBpbmRleFZlcnRpY2FsZSsrKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSA9IHRhaWxsZUhvcml6b250YWxlO1xyXG4gICAgICBsZXQgaW5kZXhDb3VyYW50VmVydGljYWxlID0gaW5kZXhWZXJ0aWNhbGU7XHJcbiAgICAgIC8vIFbDqXJpZmllciBsYSBsaWduZSBlbiBkaWFnb25hbGVcclxuICAgICAgd2hpbGUgKGluZGV4Q291cmFudEhvcml6b250YWxlID49IDEgJiYgaW5kZXhDb3VyYW50VmVydGljYWxlID49IDEpIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleENvdXJhbnRIb3Jpem9udGFsZSwgaW5kZXhDb3VyYW50VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleENvdXJhbnRWZXJ0aWNhbGUsIGluZGV4Q291cmFudEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlLS07XHJcbiAgICAgICAgaW5kZXhDb3VyYW50VmVydGljYWxlLS07XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gKHRhaWxsZUhvcml6b250YWxlIC0gMSk7IGluZGV4SG9yaXpvbnRhbGUgPj0gNDsgaW5kZXhIb3Jpem9udGFsZS0tKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSA9IGluZGV4SG9yaXpvbnRhbGU7XHJcbiAgICAgIGxldCBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPSB0YWlsbGVWZXJ0aWNhbGU7XHJcbiAgICAgIC8vIFbDqXJpZmllciBsYSBsaWduZSBlbiBkaWFnb25hbGVcclxuICAgICAgd2hpbGUgKGluZGV4Q291cmFudEhvcml6b250YWxlID49IDEgJiYgaW5kZXhDb3VyYW50VmVydGljYWxlID49IDEpIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleENvdXJhbnRIb3Jpem9udGFsZSwgaW5kZXhDb3VyYW50VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleENvdXJhbnRWZXJ0aWNhbGUsIGluZGV4Q291cmFudEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZS0tO1xyXG4gICAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCB7IFdpbm5lck1hbmFnZXIgfSBmcm9tIFwiLi9XaW5uZXJNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUm9ib3RNYW5hZ2VyIHtcclxuICBjb25zdHJ1Y3RvcihnYW1lKSB7XHJcbiAgICBpZiAoZ2FtZSkge1xyXG4gICAgICB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXUgPSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKCk7XHJcbiAgICAgIHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXUgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpO1xyXG4gICAgICB0aGlzLmdhbWUgPSBnYW1lXHJcbiAgICAgIFJvYm90TWFuYWdlci5yb2JvdE1hbmFnZXIgPSB0aGlzXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBdWN1bmUgcGFydGllIGTDqWZpbml0XCIpXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldFJvYm90TWFuYWdlcihnYW1lKSB7XHJcbiAgICBpZiAoUm9ib3RNYW5hZ2VyLnJvYm90TWFuYWdlcikge1xyXG4gICAgICByZXR1cm4gUm9ib3RNYW5hZ2VyLnJvYm90TWFuYWdlclxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG5ldyBSb2JvdE1hbmFnZXIoZ2FtZSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxhbmNlVW5lUGFydGllRGVSb2JvdHMoKSB7XHJcbiAgICB0aGlzLmdhbWUuc2V0TWVzc2FnZShcIlJvYm90IFZzLiBSb2JvdFwiKTtcclxuICAgIHRoaXMuZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgdGhpcy5nYW1lLmVuYWJsZUdhbWUoKVxyXG4gICAgdGhpcy5nYW1lLm1vblRvdXIuc2V0KGZhbHNlKVxyXG4gICAgLy8gT24gY2hvaXNpcyB1bmUgw6lxdWlwZSBxdWkgY29tbWVuY2UgYWzDqWF0b2lyZW1lbnRcclxuICAgIGNvbnN0IGNvbG9yID0gVXRpbHMuZ2V0Q291bGV1ckVxdWlwZUFsZWF0b2lyZSgpO1xyXG4gICAgLy8gT24gbGFuY2UgbGEgcGFydGllXHJcbiAgICB0aGlzLnJvYm90VnNSb2JvdChjb2xvcik7XHJcbiAgfVxyXG5cclxuICByb2JvdFZzUm9ib3QoY29sb3IpIHtcclxuICAgIC8vIFNpIGxhIHBhcnRpZSBuJ2VzdCBwYXMgdGVybWluw6lcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgaWYgKCF0aGlzLnJvYm90UGxhY2VVblBpb24oY29sb3IpKSB7XHJcbiAgICAgIC8vIE9uIGZhaXMgam91ZXIgbCfDqXF1aXBlIGFkdmVyc2VcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhhdC5yb2JvdFZzUm9ib3QoVXRpbHMuZ2V0Q291bGV1ckVxdWlwZUFkdmVyc2UoY29sb3IpKVxyXG4gICAgICB9LCA1KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcm9ib3RQbGFjZVVuUGlvbihjb2xvcikge1xyXG4gICAgY29uc3QgZ2FtZSA9IHRoaXMuZ2FtZTtcclxuICAgIC8vIE9uIHLDqWN1cMOocmUgbGEgbGlzdGUgZGVzIGNvbG9ubmVzIHF1aSBuJ29udCBwYXMgbGV1cnNcclxuICAgIC8vIGNvbG9ubmVzIGNvbXBsw6l0w6lzLlxyXG4gICAgY29uc3QgbGlzdGVDb2xvbm5lc05vbkNvbXBsZXRlcyA9IGdhbWUuZ2V0TGVzQ29sb25uZXNOb25Db21wbGV0ZXMoKTtcclxuICAgIGxldCBjb2xvbm5lQ2hvaXNpdEFsZWF0b2lyZW1lbnQgPSBVdGlscy5nZXRFbGVtZW50QWxlYXRvaXJlKGxpc3RlQ29sb25uZXNOb25Db21wbGV0ZXMpO1xyXG4gICAgY29uc3QgbGVzQ2FzZXNQb3V2YW50RXRyZUpvdWVyID0gZ2FtZS5nZXRMZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIoKTtcclxuICAgIGxlc0Nhc2VzUG91dmFudEV0cmVKb3Vlci5mb3JFYWNoKGNhc2VQb3V2YW50RXRyZUpvdWVyID0+IHtcclxuICAgICAgbGV0IGluZGljZUhvcml6b250YWxlID0gY2FzZVBvdXZhbnRFdHJlSm91ZXJbMF07XHJcbiAgICAgIGxldCBpbmRpY2VWZXJ0aWNhbGUgPSBjYXNlUG91dmFudEV0cmVKb3VlclsxXTtcclxuICAgICAgaWYgKFdpbm5lck1hbmFnZXIudmVyaWZJZlBpb25QbGFjZWRHaXZlV2luKGdhbWUsIGluZGljZUhvcml6b250YWxlLCBpbmRpY2VWZXJ0aWNhbGUsIGNvbG9yKSkge1xyXG4gICAgICAgIGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCA9IGluZGljZUhvcml6b250YWxlO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKFdpbm5lck1hbmFnZXIudmVyaWZJZlBpb25QbGFjZWRHaXZlV2luKGdhbWUsIGluZGljZUhvcml6b250YWxlLCBpbmRpY2VWZXJ0aWNhbGUsIFV0aWxzLmdldENvdWxldXJFcXVpcGVBZHZlcnNlKGNvbG9yKSkpIHtcclxuICAgICAgICBjb2xvbm5lQ2hvaXNpdEFsZWF0b2lyZW1lbnQgPSBpbmRpY2VIb3Jpem9udGFsZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFsZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIgfHwgbGVzQ2FzZXNQb3V2YW50RXRyZUpvdWVyLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLmdhbWUuc2V0V2lubmVyKG51bGwsIG51bGwpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBib3VjbGVBY3RpdmUgPSB0cnVlO1xyXG4gICAgICBsZXQgaW5kaWNlVGFpbGxlVmVydGljYWxlID0gdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldTtcclxuICAgICAgd2hpbGUgKGluZGljZVRhaWxsZVZlcnRpY2FsZSA+IDAgJiYgYm91Y2xlQWN0aXZlKSB7XHJcbiAgICAgICAgbGV0IGNvdWxldXJEdVBpb25QbGFjZSA9IHRoaXMuZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChjb2xvbm5lQ2hvaXNpdEFsZWF0b2lyZW1lbnQsIGluZGljZVRhaWxsZVZlcnRpY2FsZSk7XHJcbiAgICAgICAgaWYgKCFjb3VsZXVyRHVQaW9uUGxhY2UpIHtcclxuICAgICAgICAgIGJvdWNsZUFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5nYW1lLmZvcmNlQWRkUGlvbihjb2xvbm5lQ2hvaXNpdEFsZWF0b2lyZW1lbnQsIGluZGljZVRhaWxsZVZlcnRpY2FsZSwgY29sb3IpXHJcbiAgICAgICAgICAvL2Fqb3V0ZVVuUGlvbkRhbnNCZGQoY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50LCBpbmRpY2VUYWlsbGVWZXJ0aWNhbGUsIGNvbG9yKTtcclxuICAgICAgICAgIGNvbnN0IGlzV2lubmVyID0gV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsIGNvbG9yKTtcclxuICAgICAgICAgIGlmIChpc1dpbm5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuc2V0V2lubmVyKGNvbG9yLCBpc1dpbm5lcik7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRpY2VUYWlsbGVWZXJ0aWNhbGUtLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgSmV0b24ge1xyXG5cclxuICBwcml2YXRlIHBvc2l0aW9uSG9yaXpvbnRhbGU6IG51bWJlcjtcclxuICBwcml2YXRlIHBvc2l0aW9uVmVydGljYWxlOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uSG9yaXpvbnRhbGU6IG51bWJlciwgcG9zaXRpb25WZXJ0aWNhbGU6IG51bWJlcikge1xyXG4gICAgdGhpcy5wb3NpdGlvbkhvcml6b250YWxlID0gcG9zaXRpb25Ib3Jpem9udGFsZTtcclxuICAgIHRoaXMucG9zaXRpb25WZXJ0aWNhbGUgICA9IHBvc2l0aW9uVmVydGljYWxlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFBvc2l0aW9uKCk6IG51bWJlcltdIHtcclxuICAgIHJldHVybiBbdGhpcy5wb3NpdGlvbkhvcml6b250YWxlLCB0aGlzLnBvc2l0aW9uVmVydGljYWxlXVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFBvc2l0aW9uSG9yaXpvbnRhbGUoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uSG9yaXpvbnRhbGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0UG9zaXRpb25WZXJ0aWNhbGUoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uVmVydGljYWxlO1xyXG4gIH1cclxuICBcclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgTW9uVG91ciB9IGZyb20gXCIuL01vblRvdXJcIlxyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCB7IFdpbm5lck1hbmFnZXIgfSBmcm9tIFwiLi9XaW5uZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFJvYm90TWFuYWdlciB9IGZyb20gXCIuL1JvYm90TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBKZXRvbiB9IGZyb20gXCIuL0pldG9uXCI7XHJcbmltcG9ydCAqIGFzIEludGVyZmFjZSBmcm9tIFwiLi9JbnRlcmZhY2VzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZSB7XHJcblxyXG4gIHByaXZhdGUgdGFpbGxlSG9yaXpvbnRhbGVEdUpldTogbnVtYmVyO1xyXG4gIHByaXZhdGUgdGFpbGxlVmVydGljYWxlRHVKZXU6IG51bWJlcjtcclxuICBwcml2YXRlIGxpc3RlUGlvbnNSb3VnZTogQXJyYXk8SmV0b24+O1xyXG4gIHByaXZhdGUgbGlzdGVQaW9uc0phdW5lOiBBcnJheTxKZXRvbj47XHJcbiAgcHVibGljIG1vblRvdXI6IE1vblRvdXI7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgZ2FtZTogR2FtZTtcclxuXHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcih0YWlsbGVIb3Jpem9udGFsZTogbnVtYmVyLCB0YWlsbGVWZXJ0aWNhbGU6IG51bWJlcikge1xyXG4gICAgdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1ID0gdGFpbGxlSG9yaXpvbnRhbGU7XHJcbiAgICB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1ID0gdGFpbGxlVmVydGljYWxlO1xyXG4gICAgdGhpcy5saXN0ZVBpb25zUm91Z2UgPSBuZXcgQXJyYXkoKTtcclxuICAgIHRoaXMubGlzdGVQaW9uc0phdW5lID0gbmV3IEFycmF5KCk7XHJcbiAgICB0aGlzLm1vblRvdXIgPSBuZXcgTW9uVG91cigpXHJcbiAgICB0aGlzLmRpc2FibGVHYW1lKClcclxuICAgIHRoaXMubG9nKFxyXG4gICAgICBcIlB1aXNzYW5jZSA0XCIsXHJcbiAgICAgIFwiSW5pdGlhbGlzYXRpb24gZHUgamV1IGVuIFwiICsgdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1ICsgXCJ4XCIgKyB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1XHJcbiAgICApO1xyXG4gICAgR2FtZS5nYW1lID0gdGhpcztcclxuICB9XHJcbiAgcHVibGljIHN0YXRpYyBnZXRHYW1lKCk6IEdhbWUge1xyXG4gICAgaWYgKEdhbWUuZ2FtZSkge1xyXG4gICAgICByZXR1cm4gR2FtZS5nYW1lXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgdGFpbGxlSG9yaXpvbnRhbGVQYXJzZWQgPSB0aGlzLmdldFRhaWxsZUhvcml6b250YWxlRnJvbVVybCgpXHJcbiAgICAgIGxldCB0YWlsbGVWZXJ0aWNhbGVQYXJzZWQgPSB0aGlzLmdldFRhaWxsZVZlcnRpY2FsZUZyb21VcmwoKVxyXG4gICAgICByZXR1cm4gbmV3IEdhbWUodGFpbGxlSG9yaXpvbnRhbGVQYXJzZWQsIHRhaWxsZVZlcnRpY2FsZVBhcnNlZClcclxuXHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0VGFpbGxlSG9yaXpvbnRhbGVGcm9tVXJsKCk6IG51bWJlciB7XHJcbiAgICBjb25zdCBwYXJhbXNVcmw6IGFueSA9IFV0aWxzLnBhcnNlVVJMUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXNVcmwgIT09ICd1bmRlZmluZWQnICYmIHBhcmFtc1VybC50YWlsbGVIb3Jpem9udGFsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGUgPSBwYXJhbXNVcmwudGFpbGxlSG9yaXpvbnRhbGVbMF07XHJcbiAgICAgIGlmIChwYXJzZUludCh0YWlsbGVIb3Jpem9udGFsZSkpIHtcclxuICAgICAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZVBhcnNlZCA9IHBhcnNlSW50KHRhaWxsZUhvcml6b250YWxlKVxyXG4gICAgICAgIGlmICh0YWlsbGVIb3Jpem9udGFsZVBhcnNlZCA+PSA0ICYmIHRhaWxsZUhvcml6b250YWxlUGFyc2VkIDw9IDIwKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGFpbGxlSG9yaXpvbnRhbGVQYXJzZWRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIDc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiA3O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gNztcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIHN0YXRpYyBnZXRUYWlsbGVWZXJ0aWNhbGVGcm9tVXJsKCk6IG51bWJlciB7XHJcbiAgICBjb25zdCBwYXJhbXNVcmw6IGFueSA9IFV0aWxzLnBhcnNlVVJMUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXNVcmwgIT09ICd1bmRlZmluZWQnICYmIHBhcmFtc1VybC50YWlsbGVWZXJ0aWNhbGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSA9IHBhcmFtc1VybC50YWlsbGVWZXJ0aWNhbGVbMF07XHJcbiAgICAgIGlmIChwYXJzZUludCh0YWlsbGVWZXJ0aWNhbGUpKSB7XHJcbiAgICAgICAgY29uc3QgdGFpbGxlVmVydGljYWxlUGFyc2VkID0gcGFyc2VJbnQodGFpbGxlVmVydGljYWxlKVxyXG4gICAgICAgIGlmICh0YWlsbGVWZXJ0aWNhbGVQYXJzZWQgPj0gNCAmJiB0YWlsbGVWZXJ0aWNhbGVQYXJzZWQgPD0gMjApIHtcclxuICAgICAgICAgIHJldHVybiB0YWlsbGVWZXJ0aWNhbGVQYXJzZWRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIDU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiA1O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gNTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIHNlYXJjaFBpZWNlKGNvdWxldXI6IHN0cmluZywgaW5pdENhc2U6IG51bWJlcikge1xyXG4gICAgY29uc3QgcmVkQ2lyY2xlID0gJCgnI3ByZXZpZXcgI3JlZF9jaXJjbGUnKVxyXG4gICAgY29uc3QgeWVsbG93Q2lyY2xlID0gJCgnI3ByZXZpZXcgI3llbGxvd19jaXJjbGUnKVxyXG4gICAgY29uc3QgZGVmYXVsdENpcmNsZSA9ICQoJyNwcmV2aWV3ICNiYXNpY19jaXJjbGUnKVxyXG4gICAgaWYgKGluaXRDYXNlKSB7XHJcbiAgICAgIGlmIChjb3VsZXVyID09PSAncmVkJykge1xyXG4gICAgICAgICQocmVkQ2lyY2xlKS5jaGlsZHJlbigpLmNoaWxkcmVuKCkuYXR0cignY2FzZScsIGluaXRDYXNlKVxyXG4gICAgICAgIHJldHVybiAkKHJlZENpcmNsZSkuaHRtbCgpXHJcbiAgICAgIH0gZWxzZSBpZiAoY291bGV1ciA9PT0gJ3llbGxvdycpIHtcclxuICAgICAgICAkKHllbGxvd0NpcmNsZSkuY2hpbGRyZW4oKS5jaGlsZHJlbigpLmF0dHIoJ2Nhc2UnLCBpbml0Q2FzZSlcclxuICAgICAgICByZXR1cm4gJCh5ZWxsb3dDaXJjbGUpLmh0bWwoKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoZGVmYXVsdENpcmNsZSkuY2hpbGRyZW4oKS5jaGlsZHJlbigpLmF0dHIoJ2Nhc2UnLCBpbml0Q2FzZSlcclxuICAgICAgICByZXR1cm4gJChkZWZhdWx0Q2lyY2xlKS5odG1sKClcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNvdWxldXIgPT09ICdyZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuICQocmVkQ2lyY2xlKS5odG1sKClcclxuICAgICAgfSBlbHNlIGlmIChjb3VsZXVyID09PSAneWVsbG93Jykge1xyXG4gICAgICAgIHJldHVybiAkKHllbGxvd0NpcmNsZSkuaHRtbCgpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuICQoZGVmYXVsdENpcmNsZSkuaHRtbCgpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGU6IG51bWJlciwgaW5kZXhWZXJ0aWNhbGU6IG51bWJlcik6IHN0cmluZ3xib29sZWFuIHtcclxuICAgIHRoaXMuZ2V0UGlvbnMoMSkuZm9yRWFjaChqZXRvbiA9PiB7XHJcbiAgICAgIGlmIChqZXRvbi5nZXRQb3NpdGlvbigpID09IFtpbmRleEhvcml6b250YWxlLCBpbmRleFZlcnRpY2FsZV0pIHtcclxuICAgICAgICByZXR1cm4gJ3JlZCc7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5nZXRQaW9ucygyKS5mb3JFYWNoKGpldG9uID0+IHtcclxuICAgICAgaWYgKGpldG9uLmdldFBvc2l0aW9uKCkgPT0gW2luZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlXSkge1xyXG4gICAgICAgIHJldHVybiAneWVsbG93JztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBwdWJsaWMgY2xlYXJHYW1lKCk6IHZvaWQge1xyXG4gICAgJCgnLnJvdycpLnJlbW92ZSgpXHJcbiAgfVxyXG4gIHB1YmxpYyByZXNldEdhbWUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNsZWFyR2FtZSgpXHJcbiAgICB0aGlzLmNsZWFyUGlvbnMoKVxyXG4gICAgdGhpcy5jcmVhdGVCYWNrZ3JvdW5kKClcclxuICAgIHRoaXMuZGlzYWJsZUdhbWUoKVxyXG4gIH1cclxuICBwdWJsaWMgcGxheUdhbWUoKTogdm9pZCB7XHJcbiAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJy4uL3B1YmxpYy9hdWRpby9zdGFydEdhbWUubXA0Jyk7XHJcbiAgICBhdWRpby5wbGF5KCk7XHJcbiAgICBhdWRpbyA9IG51bGw7XHJcbiAgICB0aGlzLnJlc2V0R2FtZSgpXHJcbiAgICB0aGlzLnNldE1lc3NhZ2UoXCJBIHRvaSBkZSBqb3VlciAhXCIpXHJcbiAgICB0aGlzLmVuYWJsZUdhbWUoKVxyXG4gIH1cclxuICBwdWJsaWMgc2VsZWN0KGluZGV4SG9yaXpvbnRhbGU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgbGV0IGluZGV4VmVydGljYWxlID0gdGhpcy5nZXRUYWlsbGVWZXJ0aWNhbGUoKTtcclxuICAgIHdoaWxlIChpbmRleFZlcnRpY2FsZSA+IDApIHtcclxuICAgICAgbGV0IHRlYW1Db2xvciA9IHRoaXMuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZSwgaW5kZXhWZXJ0aWNhbGUpXHJcbiAgICAgIGlmICghdGVhbUNvbG9yKSB7XHJcbiAgICAgICAgbGV0IGNvdWxldXIgPSAkKFwiI2dhbWUgLnJvd1wiKS5lcSgoaW5kZXhWZXJ0aWNhbGUgLSAxKSkuZmluZChcIi5pY29uXCIpLmVxKGluZGV4SG9yaXpvbnRhbGUgLSAxKVxyXG4gICAgICAgIGNvdWxldXIuYXR0cihcInN1cmJyaWxsYW5jZVwiLCBcInJlZFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaW5kZXhWZXJ0aWNhbGUtLTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGdldExlc0NvbG9ubmVzTm9uQ29tcGxldGVzKCk6IG51bWJlcltdIHtcclxuICAgIGxldCBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzID0gW107XHJcbiAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gMTsgaW5kZXhIb3Jpem9udGFsZSA8PSB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXU7IGluZGV4SG9yaXpvbnRhbGUrKykge1xyXG4gICAgICBpZiAoIXRoaXMuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZSwgMSkpIHtcclxuICAgICAgICBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzLnB1c2goaW5kZXhIb3Jpem9udGFsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzO1xyXG4gIH1cclxuICBwdWJsaWMgaXNEcmF3KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubGlzdGVQaW9uc0phdW5lLmxlbmd0aCArIHRoaXMubGlzdGVQaW9uc1JvdWdlLmxlbmd0aCA+PSB0aGlzLmdldFRhaWxsZUhvcml6b250YWxlKCkgKiB0aGlzLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRUYWlsbGVIb3Jpem9udGFsZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldTtcclxuICB9XHJcbiAgcHVibGljIGdldFRhaWxsZVZlcnRpY2FsZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXU7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRMZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIoKTogbnVtYmVyW11bXSB7XHJcbiAgICBsZXQgbGlzdGVEZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXI6IEFycmF5PEFycmF5PG51bWJlcj4+ID0gW107XHJcbiAgICBsZXQgbGlzdGVDb2xvbm5lc05vbkNvbXBsZXRlcyA9IHRoaXMuZ2V0TGVzQ29sb25uZXNOb25Db21wbGV0ZXMoKTtcclxuICAgIGxldCBhVHJvdXZlckxlUGlvbjtcclxuICAgIGxpc3RlQ29sb25uZXNOb25Db21wbGV0ZXMuZm9yRWFjaChudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUgPT4ge1xyXG4gICAgICBsZXQgbnVtZXJvQ29sb25uZVZlcnRpY2FsZSA9IHRoaXMuZ2V0VGFpbGxlVmVydGljYWxlKCk7XHJcbiAgICAgIGFUcm91dmVyTGVQaW9uID0gZmFsc2U7XHJcbiAgICAgIHdoaWxlIChudW1lcm9Db2xvbm5lVmVydGljYWxlID4gMCAmJiAhYVRyb3V2ZXJMZVBpb24pIHtcclxuICAgICAgICBpZiAoIVV0aWxzLmFycmF5MkRDb250YWluc0FycmF5KHRoaXMuZ2V0UGlvbnMoMSksIFtudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGVdKVxyXG4gICAgICAgICAgJiYgIVV0aWxzLmFycmF5MkRDb250YWluc0FycmF5KHRoaXMuZ2V0UGlvbnMoMiksIFtudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGVdKSkge1xyXG4gICAgICAgICAgbGlzdGVEZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIucHVzaChbbnVtZXJvQ29sb25uZUhvcml6b250YWxlLCBudW1lcm9Db2xvbm5lVmVydGljYWxlXSlcclxuICAgICAgICAgIGFUcm91dmVyTGVQaW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGUtLTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbGlzdGVEZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXI7XHJcbiAgfVxyXG4gIHB1YmxpYyBleHBvcnQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiQWZmaWNoYWdlIGRlIGwnZXhwb3J0Li4uXCIpO1xyXG4gICAgbGV0IHBhcmFtczogeyBba2V5OiBzdHJpbmddOiBKZXRvbltdIH0gPSB7fTtcclxuICAgIHBhcmFtc1sncmVkJ10gPSB0aGlzLmdldFBpb25zKCdyZWQnKVxyXG4gICAgcGFyYW1zWyd5ZWxsb3cnXSA9IHRoaXMuZ2V0UGlvbnMoJ3llbGxvdycpXHJcbiAgICBjb25zdCByZWQgPSBwYXJhbXNbJ3JlZCddO1xyXG4gICAgY29uc3QgeWVsbG93ID0gcGFyYW1zWyd5ZWxsb3cnXTtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSAkLmFqYXgoe1xyXG4gICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgIHVybDogXCJhcGkvZXhwb3J0P3g9XCIgKyB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXUgKyBcIiZ5PVwiICsgdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldSxcclxuICAgICAgZGF0YTogeyByZWQ6IHJlZCwgeWVsbG93OiB5ZWxsb3cgfSxcclxuICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICB0aW1lb3V0OiAxMjAwMDBcclxuICAgIH0pXHJcbiAgICByZXF1ZXN0LmRvbmUoZnVuY3Rpb24gKG91dHB1dF9zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG91dHB1dF9zdWNjZXNzKVxyXG4gICAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiTCdleHBvcnQgcydlc3QgY29ycmVjdGVtZW50IHRlcm1pbsOpXCIpO1xyXG4gICAgfSlcclxuICAgIHJlcXVlc3QuZmFpbChmdW5jdGlvbiAoaHR0cF9lcnJvcikge1xyXG4gICAgICBsZXQgc2VydmVyX21zZyA9IGh0dHBfZXJyb3IucmVzcG9uc2VUZXh0O1xyXG4gICAgICBsZXQgY29kZSA9IGh0dHBfZXJyb3Iuc3RhdHVzO1xyXG4gICAgICBsZXQgY29kZV9sYWJlbCA9IGh0dHBfZXJyb3Iuc3RhdHVzVGV4dDtcclxuICAgICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkVjaGVjIGxvcnMgZGUgbCdleHBvcnQgKFwiICsgY29kZSArIFwiKVwiKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBwdWJsaWMgdW5TZWxlY3QoKTogdm9pZCB7XHJcbiAgICAkKFwiLnJvdyAuaWNvblwiKS5hdHRyKFwic3VyYnJpbGxhbmNlXCIsIFwiXCIpO1xyXG4gIH1cclxuICBwdWJsaWMgc2V0TWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICQoXCIjZ2FtZSBwI3RvdXJcIikudGV4dChtZXNzYWdlKTtcclxuICB9XHJcbiAgcHVibGljIGltcG9ydChnYW1lT2JqZWN0OiBJbnRlcmZhY2UuR2FtZU9iamVjdCwgcGFyYW1ldGVyczogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiRMOpYnV0IGRlIGwnaW1wb3J0IC4uLlwiKTtcclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJJbml0aWFsaXNhdGlvbiBkZXMgcGFyYW3DqHRyZXMgLi4uXCIpO1xyXG4gICAgdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1ID0gcGFyc2VJbnQoZ2FtZU9iamVjdC5wYXJhbWV0cmVzLngpXHJcbiAgICB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1ID0gcGFyc2VJbnQoZ2FtZU9iamVjdC5wYXJhbWV0cmVzLnkpXHJcbiAgICB0aGlzLnJlc2V0R2FtZSgpXHJcbiAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiSW1wb3J0IGRlcyBwaW9ucyAuLi5cIik7XHJcbiAgICBnYW1lT2JqZWN0LmRhdGFzLnBpb25zLnJlZC5mb3JFYWNoKHBpb25Sb3VnZSA9PiB7XHJcbiAgICAgIHRoaXMuZm9yY2VBZGRQaW9uKHBpb25Sb3VnZVswXSwgcGlvblJvdWdlWzFdLCAncmVkJylcclxuICAgIH0pO1xyXG4gICAgZ2FtZU9iamVjdC5kYXRhcy5waW9ucy55ZWxsb3cuZm9yRWFjaChwaW9uWWVsbG93ID0+IHtcclxuICAgICAgdGhpcy5mb3JjZUFkZFBpb24ocGlvblllbGxvd1swXSwgcGlvblllbGxvd1sxXSwgJ3llbGxvdycpXHJcbiAgICB9KTtcclxuICAgIGlmIChwYXJhbWV0ZXJzKSB7XHJcbiAgICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJWw6lyaWZpY2F0aW9uIGQndW4gcG90ZW50aWVsIGdhZ25hbnQgLi4uXCIpO1xyXG4gICAgICBsZXQgZ2FnbmFudFJvdWdlID0gV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLCBcInJlZFwiKTtcclxuICAgICAgbGV0IGdhZ25hbnRKYXVuZSA9IFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcywgXCJ5ZWxsb3dcIik7XHJcbiAgICAgIGlmIChnYWduYW50Um91Z2UpIHtcclxuICAgICAgICB0aGlzLnNldFdpbm5lcigncmVkJywgZ2FnbmFudFJvdWdlKTtcclxuICAgICAgICB0aGlzLnVuU2VsZWN0KCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZ2FnbmFudEphdW5lKSB7XHJcbiAgICAgICAgdGhpcy5zZXRXaW5uZXIoJ3llbGxvdycsIGdhZ25hbnRKYXVuZSk7XHJcbiAgICAgICAgdGhpcy5tb25Ub3VyLnNldChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy51blNlbGVjdCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiRmluIGRlIGwnaW1wb3J0XCIpO1xyXG4gIH1cclxuICBwdWJsaWMgc2V0V2lubmVyKGNvdWxldXI6IHN0cmluZywgcGlvbnNHYWduYW50czogbnVtYmVyW11bXSA9IG51bGwpOiB2b2lkIHtcclxuICAgIHRoaXMuZGlzYWJsZUdhbWUoKVxyXG4gICAgaWYgKHBpb25zR2FnbmFudHMpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwaW9uc0dhZ25hbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGluZGV4VmVydGljYWxlID0gcGlvbnNHYWduYW50c1tpXVswXVxyXG4gICAgICAgIGxldCBpbmRleEhvcml6b250YWxlID0gcGlvbnNHYWduYW50c1tpXVsxXVxyXG4gICAgICAgIGxldCBzdXJicmlsbGFuY2VSZWNoZXJjaGUgPSAkKFwiI2dhbWUgLnJvd1wiKS5lcSgoaW5kZXhWZXJ0aWNhbGUgLSAxKSkuZmluZChcIi5pY29uXCIpLmVxKChpbmRleEhvcml6b250YWxlIC0gMSkpXHJcbiAgICAgICAgJChzdXJicmlsbGFuY2VSZWNoZXJjaGUpLmNzcyhcIm9wYWNpdHlcIiwgMSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGNvdWxldXIgPT0gJ3JlZCcpIHtcclxuICAgICAgdGhpcy5zZXRNZXNzYWdlKFwiTGVzIHJvdWdlcyBvbnQgZ2FnbsOpc1wiKTtcclxuICAgIH0gZWxzZSBpZiAoY291bGV1ciA9PSAneWVsbG93Jykge1xyXG4gICAgICB0aGlzLnNldE1lc3NhZ2UoXCJMZXMgamF1bmVzIG9udCBnYWduw6lzXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZXRNZXNzYWdlKFwiTWF0Y2ggbnVsICFcIik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBsb2cocHJlZml4OiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgY29sb3JUZXh0OiBzdHJpbmcgPSAnZmFsc2UnKTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZyhcclxuICAgICAgXCIlY1tcIiArIHByZWZpeCArIFwiXSAlY1wiICsgbWVzc2FnZSxcclxuICAgICAgXCJjb2xvcjogcHVycGxlOyBmb250LXNpemU6IDEzcHg7IGZvbnQtd2VpZ2h0OiBib2xkO1wiLFxyXG4gICAgICBcImZvbnQtc2l6ZTogMTNweDsgY29sb3I6IFwiICsgY29sb3JUZXh0XHJcbiAgICApO1xyXG4gIH1cclxuICBwdWJsaWMgZGlzYWJsZUdhbWUoKTogdm9pZCB7XHJcbiAgICAkKFwiI2dhbWUgLmljb25cIikuY3NzKFwib3BhY2l0eVwiLCAwLjMpXHJcbiAgICB0aGlzLm1vblRvdXIuc2V0KGZhbHNlKVxyXG4gIH1cclxuICBwdWJsaWMgZW5hYmxlR2FtZSgpOiB2b2lkIHtcclxuICAgICQoXCIjZ2FtZSAuaWNvblwiKS5jc3MoXCJvcGFjaXR5XCIsIDEpXHJcbiAgICB0aGlzLm1vblRvdXIuc2V0KHRydWUpXHJcbiAgfVxyXG4gIHB1YmxpYyBjcmVhdGVCYWNrZ3JvdW5kKCk6IHZvaWQge1xyXG4gICAgbGV0IFB4ID0gdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1O1xyXG4gICAgbGV0IFB5ID0gdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldTtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXU7IGkrKykge1xyXG4gICAgICBsZXQgcm93WSA9ICc8ZGl2IGNsYXNzPVwicm93XCIgdmFsPVwiJyArIGkgKyAnXCI+PC9kaXY+JztcclxuICAgICAgJChcIiNnYW1lXCIpLmFwcGVuZChyb3dZKTtcclxuICAgICAgZm9yIChsZXQgaiA9IDE7IGogPD0gdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1OyBqKyspIHtcclxuICAgICAgICAkKCcucm93W3ZhbD1cIicgKyBpICsgJ1wiXScpLmFwcGVuZCh0aGlzLnNlYXJjaFBpZWNlKG51bGwsIGopKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgZm9yY2VBZGRQaW9uKHBvc2l0aW9uSG9yaXpvbnRhbGU6IG51bWJlciwgcG9zaXRpb25WZXJ0aWNhbGU6IG51bWJlciwgY291bGV1cjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAkKFwiLnJvd1t2YWw9J1wiICsgcG9zaXRpb25WZXJ0aWNhbGUgKyBcIiddIC5pY29uW2Nhc2U9J1wiICsgcG9zaXRpb25Ib3Jpem9udGFsZSArIFwiJ11cIikucmVwbGFjZVdpdGgodGhpcy5zZWFyY2hQaWVjZShjb3VsZXVyLCBwb3NpdGlvbkhvcml6b250YWxlKSk7XHJcbiAgICAkKFwiLnJvd1t2YWw9J1wiICsgcG9zaXRpb25WZXJ0aWNhbGUgKyBcIiddIC5pY29uW2Nhc2U9J1wiICsgcG9zaXRpb25Ib3Jpem9udGFsZSArIFwiJ11cIikuYXR0cihcInRlYW1cIiwgY291bGV1cik7XHJcbiAgICBpZiAoY291bGV1ciA9PSAneWVsbG93Jykge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImFqb3V0IDogXCIgKyBwb3NpdGlvbkhvcml6b250YWxlICsgXCIsIFwiKyBwb3NpdGlvblZlcnRpY2FsZSlcclxuICAgICAgdGhpcy5zZXRQaW9uKDIsIG5ldyBKZXRvbihwb3NpdGlvbkhvcml6b250YWxlLCBwb3NpdGlvblZlcnRpY2FsZSkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZXRQaW9uKDEsIG5ldyBKZXRvbihwb3NpdGlvbkhvcml6b250YWxlLCBwb3NpdGlvblZlcnRpY2FsZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgZ2V0UG9zaXRpb25Ib3Jpem9udGFsZShldmVudDogc3RyaW5nIHwgSlF1ZXJ5PGFueT4pIHtcclxuICAgIHJldHVybiAkKGV2ZW50KS5wYXJlbnQoKS5pbmRleCgpICsgMTtcclxuICB9XHJcbiAgcHVibGljIGFkZFBpb24oaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3QgdGFpbGxlVmVydGljYWxlID0gdGhpcy5nZXRUYWlsbGVWZXJ0aWNhbGUoKVxyXG4gICAgbGV0IHBsYWNlSXNOb3RUYWtlbiA9IHRydWU7XHJcbiAgICBsZXQgaW5kZXhWZXJ0aWNhbGUgPSB0YWlsbGVWZXJ0aWNhbGU7XHJcbiAgICBpZiAodGhpcy5tb25Ub3VyLmdldCgpKSB7XHJcbiAgICAgIHdoaWxlIChpbmRleFZlcnRpY2FsZSA+IDAgJiYgcGxhY2VJc05vdFRha2VuKSB7XHJcbiAgICAgICAgbGV0IGNvdWxldXJEdVBpb24gPSB0aGlzLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGVDbGlja2VkLCBpbmRleFZlcnRpY2FsZSk7XHJcbiAgICAgICAgaWYgKCFjb3VsZXVyRHVQaW9uKSB7XHJcbiAgICAgICAgICBwbGFjZUlzTm90VGFrZW4gPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMubW9uVG91ci5zZXQoZmFsc2UpO1xyXG4gICAgICAgICAgdGhpcy51blNlbGVjdCgpO1xyXG4gICAgICAgICAgdGhpcy5mb3JjZUFkZFBpb24oaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQsIGluZGV4VmVydGljYWxlLCBcInJlZFwiKVxyXG4gICAgICAgICAgbGV0IGxlc1Bpb25zR2FnbmFudHMgPSBXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMsIFwicmVkXCIpO1xyXG4gICAgICAgICAgaWYgKGxlc1Bpb25zR2FnbmFudHMpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRXaW5uZXIoJ3JlZCcsIGxlc1Bpb25zR2FnbmFudHMpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRHJhdygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0V2lubmVyKG51bGwsIG51bGwpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdChpbmRleEhvcml6b250YWxlQ2xpY2tlZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TWVzc2FnZShcIkF1IHRvdXIgZGUgbCdhZHZlcnNhaXJlIVwiKTtcclxuICAgICAgICAgICAgY29uc3QgZ2FtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGF1ZGlvID0gbmV3IEF1ZGlvKCcuLi8uLi9wdWJsaWMvYXVkaW8vcG9wLm1wNCcpO1xyXG4gICAgICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcclxuICAgICAgICAgICAgICBjb25zdCByb2JvdE1hbmFnZXIgPSBSb2JvdE1hbmFnZXIuZ2V0Um9ib3RNYW5hZ2VyKGdhbWUpXHJcbiAgICAgICAgICAgICAgaWYgKHJvYm90TWFuYWdlci5yb2JvdFBsYWNlVW5QaW9uKFwieWVsbG93XCIpKSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLnNldE1lc3NhZ2UoXCJUdSBhcyBwZXJkdSBsYSBwYXJ0aWUgIVwiKTtcclxuICAgICAgICAgICAgICAgIGdhbWUubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJQZXJkdSAhXCIpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5tb25Ub3VyLnNldChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLnVuU2VsZWN0KCk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGVDbGlja2VkLCBpbmRleFZlcnRpY2FsZSArIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIFNpIGxlIHJvYm90IGEgam91w6kgc3VyIGxhIG3Dqm1lIGNvbG9ubmUsIG9uIGFjdHVhbGlzZSBsYSBzw6lsZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgIGdhbWUuc2VsZWN0KGluZGV4SG9yaXpvbnRhbGVDbGlja2VkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdhbWUubW9uVG91ci5zZXQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLnNldE1lc3NhZ2UoXCJBIHRvbiB0b3VyICFcIik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4VmVydGljYWxlLS07XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5sb2coXHJcbiAgICAgICAgXCJQdWlzc2FuY2UgNFwiLFxyXG4gICAgICAgIFwiSmV0b24gZW4gWDpcIiArIGluZGV4SG9yaXpvbnRhbGVDbGlja2VkICsgXCIgWTpcIiArIChpbmRleFZlcnRpY2FsZSArIDEpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXRQaW9uKHRlYW06IHN0cmluZyB8IG51bWJlciwgdmFsdWU6IEpldG9uKTogdm9pZCB7XHJcbiAgICBpZiAodGVhbSA9PSAxIHx8IHRlYW0gPT0gJ3JlZCcpIHtcclxuICAgICAgdGhpcy5saXN0ZVBpb25zUm91Z2UucHVzaCh2YWx1ZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMubGlzdGVQaW9uc1JvdWdlKTtcclxuICAgIH0gZWxzZSBpZiAodGVhbSA9PSAyIHx8IHRlYW0gPT0gJ3llbGxvdycpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJORVcgUElPTjpcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcclxuICAgICAgY29uc29sZS5sb2codGhpcy5saXN0ZVBpb25zSmF1bmUpO1xyXG4gICAgICB0aGlzLmxpc3RlUGlvbnNKYXVuZS5wdXNoKHZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkxlIGpvdWV1ciBlc3QgaW50cm91dmFibGVcIik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0SW5kZXhPZlBpb24odGVhbTogc3RyaW5nLCBwaW9uOiBKZXRvbik6IG51bWJlciB7XHJcbiAgICB0aGlzLmdldFBpb25zKHRlYW0pLmZvckVhY2godW5QaW9uID0+IHtcclxuICAgICAgaWYgKHVuUGlvbi5nZXRQb3NpdGlvbigpID09IHBpb24uZ2V0UG9zaXRpb24oKSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFBpb25zKHRlYW0pLmluZGV4T2YodW5QaW9uKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgcHVibGljIHJlbW92ZVBpb24odGVhbTogc3RyaW5nIHwgbnVtYmVyLCB2YWx1ZTogSmV0b24pOiB2b2lkIHtcclxuICAgIGlmICh0ZWFtID09IDEgfHwgdGVhbSA9PSAncmVkJykge1xyXG4gICAgICBsZXQgaW5kZXhPZlBpb24gPSB0aGlzLmdldEluZGV4T2ZQaW9uKCdyZWQnLCB2YWx1ZSk7XHJcbiAgICAgIHRoaXMubGlzdGVQaW9uc1JvdWdlLnNwbGljZShpbmRleE9mUGlvbiwgMSlcclxuICAgIH0gZWxzZSBpZiAodGVhbSA9PSAyIHx8IHRlYW0gPT0gJ3llbGxvdycpIHtcclxuICAgICAgbGV0IGluZGV4T2ZQaW9uID0gdGhpcy5nZXRJbmRleE9mUGlvbigneWVsbG93JywgdmFsdWUpO1xyXG4gICAgICB0aGlzLmxpc3RlUGlvbnNKYXVuZS5zcGxpY2UoaW5kZXhPZlBpb24sIDEpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBcIkxlIGpvdWV1ciBlc3QgaW50cm91dmFibGVcIjtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGNsZWFyUGlvbnMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmxpc3RlUGlvbnNSb3VnZSA9IFtdO1xyXG4gICAgdGhpcy5saXN0ZVBpb25zSmF1bmUgPSBbXTtcclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJMZXMgZG9ubsOpZXMgZGVzIHBpb25zIG9udCDDqXTDqSBlZmZhY8Opc1wiKTtcclxuICB9XHJcbiAgcHVibGljIGdldFBpb25zKHRlYW06IHN0cmluZyB8IG51bWJlcik6IEpldG9uW10ge1xyXG4gICAgaWYgKHRlYW0gPT0gMSB8fCB0ZWFtID09ICdyZWQnKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMubGlzdGVQaW9uc1JvdWdlKTtcclxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVQaW9uc1JvdWdlO1xyXG4gICAgfSBlbHNlIGlmICh0ZWFtID09IDIgfHwgdGVhbSA9PSAneWVsbG93Jykge1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmxpc3RlUGlvbnNKYXVuZSk7XHJcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlUGlvbnNKYXVuZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IFwiTGUgam91ZXVyIGVzdCBpbnRyb3V2YWJsZVwiO1xyXG4gICAgfVxyXG4gIH1cclxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==