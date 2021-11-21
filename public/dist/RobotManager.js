/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
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
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WinnerManager": () => (/* binding */ WinnerManager)
/* harmony export */ });
/* harmony import */ var _CheckIfWinner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


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
/* 3 */
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
/* harmony export */   "RobotManager": () => (/* binding */ RobotManager)
/* harmony export */ });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _WinnerManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9ib3RNYW5hZ2VyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG9CQUFvQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGtCQUFrQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0RnRDtBQUNoRDtBQUNPO0FBQ1A7QUFDQSx1QkFBdUIsb0VBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrRUFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHlFQUE2QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMEVBQThCO0FBQ2pEO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDL0JPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsbUNBQW1DO0FBQ3BFO0FBQ0E7QUFDQSxxQ0FBcUMsdUNBQXVDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsdUNBQXVDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxtQ0FBbUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG1DQUFtQztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLDJDQUEyQztBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG1DQUFtQztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCx1QkFBdUI7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O1VDckxBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTmdDO0FBQ2dCO0FBQ2hEO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixtRUFBK0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixpRUFBNkI7QUFDdkQsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsNkRBQXlCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxrRkFBc0M7QUFDaEQ7QUFDQTtBQUNBLGVBQWUsa0ZBQXNDLDJDQUEyQyxpRUFBNkI7QUFDN0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGtFQUFzQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvVXRpbHMuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL1dpbm5lck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL0NoZWNrSWZXaW5uZXIuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9Sb2JvdE1hbmFnZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFV0aWxzIHtcclxuICBzdGF0aWMgZ2V0RW50aWVyQWxlYXRvaXJlKG1pbiwgbWF4KSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pO1xyXG4gIH1cclxuICBcclxuICBzdGF0aWMgZ2V0RWxlbWVudEFsZWF0b2lyZShsaXN0ZSkge1xyXG4gICAgbGV0IGxvbmd1ZXVyTGlzdGUgPSBsaXN0ZS5sZW5ndGg7XHJcbiAgICBsZXQgZW50aWVyQWxlYXRvaXJlSW5kZXhlUGFyTGlzdGUgPSBVdGlscy5nZXRFbnRpZXJBbGVhdG9pcmUoMCwgbG9uZ3VldXJMaXN0ZSk7XHJcbiAgICByZXR1cm4gbGlzdGVbZW50aWVyQWxlYXRvaXJlSW5kZXhlUGFyTGlzdGVdO1xyXG4gIH1cclxuICBcclxuICBzdGF0aWMgYXJyYXkyRENvbnRhaW5zQXJyYXkoYXJyYXkyRCwgYXJyYXlTZWFyY2gpIHtcclxuICAgIGxldCBpdGVtU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoYXJyYXlTZWFyY2gpO1xyXG4gICAgbGV0IGNvbnRhaW5zID0gYXJyYXkyRC5zb21lKGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGVsZW1lbnQpID09PSBpdGVtU3RyaW5nO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gY29udGFpbnM7XHJcbiAgfVxyXG4gIFxyXG4gIHN0YXRpYyBnZXRJbmRleE9mMkRBcnJheShhcnJheTJELCBpbmRleCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheTJELmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBjdXJyZW50QXJyYXkgPSBhcnJheTJEW2ldO1xyXG4gICAgICBpZiAoY3VycmVudEFycmF5WzBdID09IGluZGV4WzBdICYmIGN1cnJlbnRBcnJheVsxXSA9PSBpbmRleFsxXSkge1xyXG4gICAgICAgIHJldHVybiBpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0Q291bGV1ckVxdWlwZUFsZWF0b2lyZSgpIHtcclxuICAgIGxldCBsaXN0ZURlQ291bGV1cnMgPSBbXCJ5ZWxsb3dcIiwgXCJyZWRcIl07XHJcbiAgICBsZXQgbm9tYnJlQWxlYXRvaXJlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGlzdGVEZUNvdWxldXJzLmxlbmd0aCk7XHJcbiAgICByZXR1cm4gbGlzdGVEZUNvdWxldXJzW25vbWJyZUFsZWF0b2lyZV07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0Q291bGV1ckVxdWlwZUFkdmVyc2UoY291bGV1ckVxdWlwZUFjdHVlbGxlKSB7XHJcbiAgICBpZiAoY291bGV1ckVxdWlwZUFjdHVlbGxlID09ICdyZWQnKSB7XHJcbiAgICAgIHJldHVybiAneWVsbG93JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAncmVkJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBwYXJzZVVSTFBhcmFtcyh1cmwpIHtcclxuICAgIHZhciBxdWVyeVN0YXJ0ID0gdXJsLmluZGV4T2YoXCI/XCIpICsgMSxcclxuICAgICAgICBxdWVyeUVuZCAgID0gdXJsLmluZGV4T2YoXCIjXCIpICsgMSB8fCB1cmwubGVuZ3RoICsgMSxcclxuICAgICAgICBxdWVyeSA9IHVybC5zbGljZShxdWVyeVN0YXJ0LCBxdWVyeUVuZCAtIDEpLFxyXG4gICAgICAgIHBhaXJzID0gcXVlcnkucmVwbGFjZSgvXFwrL2csIFwiIFwiKS5zcGxpdChcIiZcIiksXHJcbiAgICAgICAgcGFybXMgPSB7fSwgaSwgbiwgdiwgbnY7XHJcblxyXG4gICAgaWYgKHF1ZXJ5ID09PSB1cmwgfHwgcXVlcnkgPT09IFwiXCIpIHJldHVybjtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBudiA9IHBhaXJzW2ldLnNwbGl0KFwiPVwiLCAyKTtcclxuICAgICAgICBuID0gZGVjb2RlVVJJQ29tcG9uZW50KG52WzBdKTtcclxuICAgICAgICB2ID0gZGVjb2RlVVJJQ29tcG9uZW50KG52WzFdKTtcclxuXHJcbiAgICAgICAgaWYgKCFwYXJtcy5oYXNPd25Qcm9wZXJ0eShuKSkgcGFybXNbbl0gPSBbXTtcclxuICAgICAgICBwYXJtc1tuXS5wdXNoKG52Lmxlbmd0aCA9PT0gMiA/IHYgOiBudWxsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJtcztcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ2hlY2tJZldpbm5lciB9IGZyb20gXCIuL0NoZWNrSWZXaW5uZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBXaW5uZXJNYW5hZ2VyIHtcclxuICBzdGF0aWMgdmVyaWZXaW4oZ2FtZSwgY29sb3IpIHtcclxuICAgIGxldCB2ZXJpZmljYXRpb24gPSBDaGVja0lmV2lubmVyLmhvcml6b250YWwoZ2FtZSwgY29sb3IpO1xyXG4gICAgaWYgKHZlcmlmaWNhdGlvbikge1xyXG4gICAgICByZXR1cm4gdmVyaWZpY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgdmVyaWZpY2F0aW9uID0gQ2hlY2tJZldpbm5lci52ZXJ0aWNhbChnYW1lLCBjb2xvcik7XHJcbiAgICBpZiAodmVyaWZpY2F0aW9uKSB7XHJcbiAgICAgIHJldHVybiB2ZXJpZmljYXRpb247XHJcbiAgICB9XHJcbiAgICB2ZXJpZmljYXRpb24gPSBDaGVja0lmV2lubmVyLmRpYWdvbmFsVG9wTGVmdChnYW1lLCBjb2xvcik7XHJcbiAgICBpZiAodmVyaWZpY2F0aW9uKSB7XHJcbiAgICAgIHJldHVybiB2ZXJpZmljYXRpb247XHJcbiAgICB9XHJcbiAgICB2ZXJpZmljYXRpb24gPSBDaGVja0lmV2lubmVyLmRpYWdvbmFsVG9wUmlnaHQoZ2FtZSwgY29sb3IpO1xyXG4gICAgaWYgKHZlcmlmaWNhdGlvbikge1xyXG4gICAgICByZXR1cm4gdmVyaWZpY2F0aW9uO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHZlcmlmSWZQaW9uUGxhY2VkR2l2ZVdpbihnYW1lLCBudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGUsIGNvdWxldXJQaW9uKSB7XHJcbiAgICBnYW1lLnNldFBpb24oY291bGV1clBpb24sIFtudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGVdKVxyXG4gICAgY29uc3QgaXNXaW5uZXIgPSBXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKGdhbWUsIGNvdWxldXJQaW9uKVxyXG4gICAgZ2FtZS5yZW1vdmVQaW9uKGNvdWxldXJQaW9uLCBbbnVtZXJvQ29sb25uZUhvcml6b250YWxlLCBudW1lcm9Db2xvbm5lVmVydGljYWxlXSlcclxuICAgIHJldHVybiBpc1dpbm5lcjtcclxuICB9XHJcblxyXG59IiwiZXhwb3J0IGNsYXNzIENoZWNrSWZXaW5uZXIge1xyXG4gIHN0YXRpYyBob3Jpem9udGFsKGdhbWUsIGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSAgID0gZ2FtZS5nZXRUYWlsbGVWZXJ0aWNhbGUoKVxyXG4gICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGUgPSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKClcclxuICAgIC8vIFbDqXJpZmljYXRpb24gZW4gaG9yaXpvbnRhbFxyXG4gICAgbGV0IGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgbGV0IGNvdWxldXJEdVBpb247XHJcbiAgICBsZXQgbmJQaW9uc0dhZ25hbnRzO1xyXG4gICAgZm9yIChsZXQgaW5kZXhWZXJ0aWNhbGUgPSAxOyBpbmRleFZlcnRpY2FsZSA8PSB0YWlsbGVWZXJ0aWNhbGU7IGluZGV4VmVydGljYWxlKyspIHtcclxuICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgIGZvciAobGV0IGluZGV4SG9yaXpvbnRhbGUgPSAxOyBpbmRleEhvcml6b250YWxlIDw9IHRhaWxsZUhvcml6b250YWxlOyBpbmRleEhvcml6b250YWxlKyspIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleEhvcml6b250YWxlLCBpbmRleFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleFZlcnRpY2FsZSwgaW5kZXhIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBzdGF0aWMgdmVydGljYWwgKGdhbWUsIGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSAgID0gZ2FtZS5nZXRUYWlsbGVWZXJ0aWNhbGUoKVxyXG4gICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGUgPSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKClcclxuICAgIC8vIFBhcmNvdXJzIGRlIGNoYXF1ZSBjYXNlIGhvcml6b250YWxlIGR1IGpldVxyXG4gICAgbGV0IGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgbGV0IGNvdWxldXJEdVBpb247XHJcbiAgICBsZXQgbmJQaW9uc0dhZ25hbnRzO1xyXG4gICAgZm9yIChsZXQgaW5kZXhIb3Jpem9udGFsZSA9IDE7IGluZGV4SG9yaXpvbnRhbGUgPD0gdGFpbGxlSG9yaXpvbnRhbGU7IGluZGV4SG9yaXpvbnRhbGUrKykge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgLy8gUGFyY291cnMgY2hhcXVlIGNhc2UgdmVydGljYWxlIGRlIGxhIGNvbG9ubmVcclxuICAgICAgZm9yIChsZXQgaW5kZXhWZXJ0aWNhbGUgPSAxOyBpbmRleFZlcnRpY2FsZSA8PSB0YWlsbGVWZXJ0aWNhbGU7IGluZGV4VmVydGljYWxlKyspIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleEhvcml6b250YWxlLCBpbmRleFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhWZXJ0aWNhbGUsIGluZGV4SG9yaXpvbnRhbGVdKTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cysrO1xyXG4gICAgICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRpYWdvbmFsVG9wTGVmdCAoZ2FtZSwgY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgY29uc3QgdGFpbGxlVmVydGljYWxlICAgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKVxyXG5cclxuICAgIGxldCBjb3VsZXVyRHVQaW9uLCBuYlBpb25zR2FnbmFudHM7XHJcbiAgICBsZXQgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGU7XHJcbiAgICBsZXQgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICBsZXQgaW5kZXhDb3VyYW50VmVydGljYWxlID0gNDtcclxuXHJcbiAgICAvLyBQYXJjb3VycyB0b3V0ZXMgbGVzIGRpYWdvbmFsZXMgw6AgZ2F1Y2hlcyDDoCBwYXJ0aXIgZGUgNC5cclxuICAgIGZvciAobGV0IGluZGV4VmVydGljYWxlID0gNDsgaW5kZXhWZXJ0aWNhbGUgPD0gdGFpbGxlVmVydGljYWxlOyBpbmRleFZlcnRpY2FsZSsrKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSA9IDE7XHJcbiAgICAgIFxyXG4gICAgICAvLyBWw6lyaWZpZXIgbGEgbGlnbmUgZW4gZGlhZ29uYWxlXHJcbiAgICAgIHdoaWxlIChpbmRleENvdXJhbnRIb3Jpem9udGFsZSA8PSB0YWlsbGVIb3Jpem9udGFsZSAmJiBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPj0gMSkge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4Q291cmFudEhvcml6b250YWxlLCBpbmRleENvdXJhbnRWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKGNvdWxldXJEdVBpb24gPT0gY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzLnB1c2goW2luZGV4Q291cmFudFZlcnRpY2FsZSwgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGVdKTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cysrO1xyXG4gICAgICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kZXhDb3VyYW50VmVydGljYWxlLS07XHJcbiAgICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUrKztcclxuICAgICAgfVxyXG4gICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPSBpbmRleFZlcnRpY2FsZSArIDE7XHJcbiAgICB9XHJcblxyXG4gICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXhIb3Jpem9udGFsZSA9IDI7IGluZGV4SG9yaXpvbnRhbGUgPD0gKHRhaWxsZUhvcml6b250YWxlLTQpOyBpbmRleEhvcml6b250YWxlKyspIHtcclxuICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlID0gaW5kZXhIb3Jpem9udGFsZTtcclxuICAgICAgaW5kZXhDb3VyYW50VmVydGljYWxlID0gdGFpbGxlVmVydGljYWxlO1xyXG4gICAgICAvLyBWw6lyaWZpZXIgbGEgbGlnbmUgZW4gZGlhZ29uYWxlXHJcbiAgICAgIHdoaWxlIChpbmRleENvdXJhbnRIb3Jpem9udGFsZSA8PSB0YWlsbGVIb3Jpem9udGFsZSAmJiBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPj0gMSkge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4Q291cmFudEhvcml6b250YWxlLCBpbmRleENvdXJhbnRWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKGNvdWxldXJEdVBpb24gPT0gY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzLnB1c2goW2luZGV4Q291cmFudFZlcnRpY2FsZSwgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGVdKTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cysrO1xyXG4gICAgICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kZXhDb3VyYW50VmVydGljYWxlLS07XHJcbiAgICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUrKztcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBkaWFnb25hbFRvcFJpZ2h0KGdhbWUsIGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSAgID0gZ2FtZS5nZXRUYWlsbGVWZXJ0aWNhbGUoKVxyXG4gICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGUgPSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKClcclxuXHJcbiAgICBsZXQgY291bGV1ckR1UGlvbiwgbmJQaW9uc0dhZ25hbnRzO1xyXG4gICAgbGV0IGluZGV4Q291cmFudEhvcml6b250YWxlO1xyXG4gICAgbGV0IGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG5cclxuICAgIC8vIFBhcmNvdXJzIHRvdXRlcyBsZXMgZGlhZ29uYWxlcyDDoCBnYXVjaGVzIMOgIHBhcnRpciBkZSA0LlxyXG4gICAgZm9yIChsZXQgaW5kZXhWZXJ0aWNhbGUgPSA0OyBpbmRleFZlcnRpY2FsZSA8PSB0YWlsbGVWZXJ0aWNhbGU7IGluZGV4VmVydGljYWxlKyspIHtcclxuICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlID0gdGFpbGxlSG9yaXpvbnRhbGU7XHJcbiAgICAgIGxldCBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPSBpbmRleFZlcnRpY2FsZTtcclxuICAgICAgLy8gVsOpcmlmaWVyIGxhIGxpZ25lIGVuIGRpYWdvbmFsZVxyXG4gICAgICB3aGlsZSAoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPj0gMSAmJiBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPj0gMSkge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4Q291cmFudEhvcml6b250YWxlLCBpbmRleENvdXJhbnRWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKGNvdWxldXJEdVBpb24gPT0gY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzLnB1c2goW2luZGV4Q291cmFudFZlcnRpY2FsZSwgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGVdKTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cysrO1xyXG4gICAgICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUtLTtcclxuICAgICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUtLTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgIGZvciAobGV0IGluZGV4SG9yaXpvbnRhbGUgPSAodGFpbGxlSG9yaXpvbnRhbGUgLSAxKTsgaW5kZXhIb3Jpem9udGFsZSA+PSA0OyBpbmRleEhvcml6b250YWxlLS0pIHtcclxuICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlID0gaW5kZXhIb3Jpem9udGFsZTtcclxuICAgICAgbGV0IGluZGV4Q291cmFudFZlcnRpY2FsZSA9IHRhaWxsZVZlcnRpY2FsZTtcclxuICAgICAgLy8gVsOpcmlmaWVyIGxhIGxpZ25lIGVuIGRpYWdvbmFsZVxyXG4gICAgICB3aGlsZSAoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPj0gMSAmJiBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPj0gMSkge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4Q291cmFudEhvcml6b250YWxlLCBpbmRleENvdXJhbnRWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKGNvdWxldXJEdVBpb24gPT0gY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzLnB1c2goW2luZGV4Q291cmFudFZlcnRpY2FsZSwgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGVdKTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cysrO1xyXG4gICAgICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kZXhDb3VyYW50VmVydGljYWxlLS07XHJcbiAgICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUtLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBXaW5uZXJNYW5hZ2VyIH0gZnJvbSBcIi4vV2lubmVyTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJvYm90TWFuYWdlciB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xyXG4gICAgaWYgKGdhbWUpIHtcclxuICAgICAgdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1ID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpO1xyXG4gICAgICB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1ICAgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpO1xyXG4gICAgICB0aGlzLmdhbWUgPSBnYW1lXHJcbiAgICAgIFJvYm90TWFuYWdlci5yb2JvdE1hbmFnZXIgPSB0aGlzXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBdWN1bmUgcGFydGllIGTDqWZpbml0XCIpXHJcbiAgICB9XHJcbiAgICBcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRSb2JvdE1hbmFnZXIoZ2FtZSkge1xyXG4gICAgaWYgKFJvYm90TWFuYWdlci5yb2JvdE1hbmFnZXIpIHtcclxuICAgICAgcmV0dXJuIFJvYm90TWFuYWdlci5yb2JvdE1hbmFnZXJcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBuZXcgUm9ib3RNYW5hZ2VyKGdhbWUpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsYW5jZVVuZVBhcnRpZURlUm9ib3RzKCkge1xyXG4gICAgdGhpcy5nYW1lLnNldE1lc3NhZ2UoXCJSb2JvdCBWcy4gUm9ib3RcIik7XHJcbiAgICB0aGlzLmdhbWUucmVzZXRHYW1lKClcclxuICAgIHRoaXMuZ2FtZS5lbmFibGVHYW1lKClcclxuICAgIHRoaXMuZ2FtZS5tb25Ub3VyLnNldChmYWxzZSlcclxuICAgIC8vIE9uIGNob2lzaXMgdW5lIMOpcXVpcGUgcXVpIGNvbW1lbmNlIGFsw6lhdG9pcmVtZW50XHJcbiAgICBjb25zdCBjb2xvciA9IFV0aWxzLmdldENvdWxldXJFcXVpcGVBbGVhdG9pcmUoKTtcclxuICAgIC8vIE9uIGxhbmNlIGxhIHBhcnRpZVxyXG4gICAgdGhpcy5yb2JvdFZzUm9ib3QoY29sb3IpO1xyXG4gIH1cclxuXHJcbiAgcm9ib3RWc1JvYm90KGNvbG9yKSB7XHJcbiAgICAvLyBTaSBsYSBwYXJ0aWUgbidlc3QgcGFzIHRlcm1pbsOpXHJcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgIGlmICghdGhpcy5yb2JvdFBsYWNlVW5QaW9uKGNvbG9yKSlcclxuICAgIHtcclxuICAgICAgLy8gT24gZmFpcyBqb3VlciBsJ8OpcXVpcGUgYWR2ZXJzZVxyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGF0LnJvYm90VnNSb2JvdChVdGlscy5nZXRDb3VsZXVyRXF1aXBlQWR2ZXJzZShjb2xvcikpXHJcbiAgICAgIH0sIDUpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByb2JvdFBsYWNlVW5QaW9uKGNvbG9yKSB7XHJcbiAgICBjb25zdCBnYW1lID0gdGhpcy5nYW1lO1xyXG4gICAgLy8gT24gcsOpY3Vww6hyZSBsYSBsaXN0ZSBkZXMgY29sb25uZXMgcXVpIG4nb250IHBhcyBsZXVyc1xyXG4gICAgLy8gY29sb25uZXMgY29tcGzDqXTDqXMuXHJcbiAgICBjb25zdCBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzID0gZ2FtZS5nZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpO1xyXG4gICAgbGV0IGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCA9IFV0aWxzLmdldEVsZW1lbnRBbGVhdG9pcmUobGlzdGVDb2xvbm5lc05vbkNvbXBsZXRlcyk7XHJcbiAgICBjb25zdCBsZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIgID0gZ2FtZS5nZXRMZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIoKTtcclxuICAgIGxlc0Nhc2VzUG91dmFudEV0cmVKb3Vlci5mb3JFYWNoKGNhc2VQb3V2YW50RXRyZUpvdWVyID0+IHtcclxuICAgICAgbGV0IGluZGljZUhvcml6b250YWxlID0gY2FzZVBvdXZhbnRFdHJlSm91ZXJbMF07XHJcbiAgICAgIGxldCBpbmRpY2VWZXJ0aWNhbGUgICA9IGNhc2VQb3V2YW50RXRyZUpvdWVyWzFdO1xyXG4gICAgICBpZiAoV2lubmVyTWFuYWdlci52ZXJpZklmUGlvblBsYWNlZEdpdmVXaW4oZ2FtZSwgaW5kaWNlSG9yaXpvbnRhbGUsIGluZGljZVZlcnRpY2FsZSwgY29sb3IpKSB7XHJcbiAgICAgICAgY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50ID0gaW5kaWNlSG9yaXpvbnRhbGU7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoV2lubmVyTWFuYWdlci52ZXJpZklmUGlvblBsYWNlZEdpdmVXaW4oZ2FtZSwgaW5kaWNlSG9yaXpvbnRhbGUsIGluZGljZVZlcnRpY2FsZSwgVXRpbHMuZ2V0Q291bGV1ckVxdWlwZUFkdmVyc2UoY29sb3IpKSkge1xyXG4gICAgICAgIGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCA9IGluZGljZUhvcml6b250YWxlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgICAgXHJcbiAgICBpZiAoIWxlc0Nhc2VzUG91dmFudEV0cmVKb3VlciB8fCBsZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMuZ2FtZS5zZXRXaW5uZXIobnVsbCwgbnVsbCk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGJvdWNsZUFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIGxldCBpbmRpY2VUYWlsbGVWZXJ0aWNhbGUgPSB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1O1xyXG4gICAgICB3aGlsZSAoaW5kaWNlVGFpbGxlVmVydGljYWxlID4gMCAmJiBib3VjbGVBY3RpdmUpIHtcclxuICAgICAgICBsZXQgY291bGV1ckR1UGlvblBsYWNlID0gdGhpcy5nYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCwgaW5kaWNlVGFpbGxlVmVydGljYWxlKTtcclxuICAgICAgICBpZiAoIWNvdWxldXJEdVBpb25QbGFjZSkge1xyXG4gICAgICAgICAgYm91Y2xlQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmdhbWUuZm9yY2VBZGRQaW9uKGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCwgaW5kaWNlVGFpbGxlVmVydGljYWxlLCBjb2xvcilcclxuICAgICAgICAgIC8vYWpvdXRlVW5QaW9uRGFuc0JkZChjb2xvbm5lQ2hvaXNpdEFsZWF0b2lyZW1lbnQsIGluZGljZVRhaWxsZVZlcnRpY2FsZSwgY29sb3IpO1xyXG4gICAgICAgICAgY29uc3QgaXNXaW5uZXIgPSBXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgY29sb3IpO1xyXG4gICAgICAgICAgaWYgKGlzV2lubmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zZXRXaW5uZXIoY29sb3IsIGlzV2lubmVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGljZVRhaWxsZVZlcnRpY2FsZS0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==