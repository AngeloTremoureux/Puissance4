/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
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
/* harmony export */   "WinnerManager": () => (/* binding */ WinnerManager)
/* harmony export */ });
/* harmony import */ var _CheckIfWinner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2lubmVyTWFuYWdlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsbUNBQW1DO0FBQ3BFO0FBQ0E7QUFDQSxxQ0FBcUMsdUNBQXVDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsdUNBQXVDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxtQ0FBbUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG1DQUFtQztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLDJDQUEyQztBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG1DQUFtQztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCx1QkFBdUI7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O1VDckxBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOZ0Q7QUFDaEQ7QUFDTztBQUNQO0FBQ0EsdUJBQXVCLG9FQUF3QjtBQUMvQztBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsa0VBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix5RUFBNkI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDBFQUE4QjtBQUNqRDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL0NoZWNrSWZXaW5uZXIuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9XaW5uZXJNYW5hZ2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDaGVja0lmV2lubmVyIHtcclxuICBzdGF0aWMgaG9yaXpvbnRhbChnYW1lLCBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgICA9IGdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcbiAgICAvLyBWw6lyaWZpY2F0aW9uIGVuIGhvcml6b250YWxcclxuICAgIGxldCBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgIGxldCBjb3VsZXVyRHVQaW9uO1xyXG4gICAgbGV0IG5iUGlvbnNHYWduYW50cztcclxuICAgIGZvciAobGV0IGluZGV4VmVydGljYWxlID0gMTsgaW5kZXhWZXJ0aWNhbGUgPD0gdGFpbGxlVmVydGljYWxlOyBpbmRleFZlcnRpY2FsZSsrKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gMTsgaW5kZXhIb3Jpem9udGFsZSA8PSB0YWlsbGVIb3Jpem9udGFsZTsgaW5kZXhIb3Jpem9udGFsZSsrKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZSwgaW5kZXhWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKGNvdWxldXJEdVBpb24gPT0gY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhWZXJ0aWNhbGUsIGluZGV4SG9yaXpvbnRhbGVdKTtcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgc3RhdGljIHZlcnRpY2FsIChnYW1lLCBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgICA9IGdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcbiAgICAvLyBQYXJjb3VycyBkZSBjaGFxdWUgY2FzZSBob3Jpem9udGFsZSBkdSBqZXVcclxuICAgIGxldCBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgIGxldCBjb3VsZXVyRHVQaW9uO1xyXG4gICAgbGV0IG5iUGlvbnNHYWduYW50cztcclxuICAgIGZvciAobGV0IGluZGV4SG9yaXpvbnRhbGUgPSAxOyBpbmRleEhvcml6b250YWxlIDw9IHRhaWxsZUhvcml6b250YWxlOyBpbmRleEhvcml6b250YWxlKyspIHtcclxuICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgIC8vIFBhcmNvdXJzIGNoYXF1ZSBjYXNlIHZlcnRpY2FsZSBkZSBsYSBjb2xvbm5lXHJcbiAgICAgIGZvciAobGV0IGluZGV4VmVydGljYWxlID0gMTsgaW5kZXhWZXJ0aWNhbGUgPD0gdGFpbGxlVmVydGljYWxlOyBpbmRleFZlcnRpY2FsZSsrKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZSwgaW5kZXhWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKGNvdWxldXJEdVBpb24gPT0gY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzLnB1c2goW2luZGV4VmVydGljYWxlLCBpbmRleEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBkaWFnb25hbFRvcExlZnQgKGdhbWUsIGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSAgID0gZ2FtZS5nZXRUYWlsbGVWZXJ0aWNhbGUoKVxyXG4gICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGUgPSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKClcclxuXHJcbiAgICBsZXQgY291bGV1ckR1UGlvbiwgbmJQaW9uc0dhZ25hbnRzO1xyXG4gICAgbGV0IGluZGV4Q291cmFudEhvcml6b250YWxlO1xyXG4gICAgbGV0IGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgbGV0IGluZGV4Q291cmFudFZlcnRpY2FsZSA9IDQ7XHJcblxyXG4gICAgLy8gUGFyY291cnMgdG91dGVzIGxlcyBkaWFnb25hbGVzIMOgIGdhdWNoZXMgw6AgcGFydGlyIGRlIDQuXHJcbiAgICBmb3IgKGxldCBpbmRleFZlcnRpY2FsZSA9IDQ7IGluZGV4VmVydGljYWxlIDw9IHRhaWxsZVZlcnRpY2FsZTsgaW5kZXhWZXJ0aWNhbGUrKykge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPSAxO1xyXG4gICAgICBcclxuICAgICAgLy8gVsOpcmlmaWVyIGxhIGxpZ25lIGVuIGRpYWdvbmFsZVxyXG4gICAgICB3aGlsZSAoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPD0gdGFpbGxlSG9yaXpvbnRhbGUgJiYgaW5kZXhDb3VyYW50VmVydGljYWxlID49IDEpIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleENvdXJhbnRIb3Jpem9udGFsZSwgaW5kZXhDb3VyYW50VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleENvdXJhbnRWZXJ0aWNhbGUsIGluZGV4Q291cmFudEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZS0tO1xyXG4gICAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlKys7XHJcbiAgICAgIH1cclxuICAgICAgaW5kZXhDb3VyYW50VmVydGljYWxlID0gaW5kZXhWZXJ0aWNhbGUgKyAxO1xyXG4gICAgfVxyXG5cclxuICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4SG9yaXpvbnRhbGUgPSAyOyBpbmRleEhvcml6b250YWxlIDw9ICh0YWlsbGVIb3Jpem9udGFsZS00KTsgaW5kZXhIb3Jpem9udGFsZSsrKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSA9IGluZGV4SG9yaXpvbnRhbGU7XHJcbiAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZSA9IHRhaWxsZVZlcnRpY2FsZTtcclxuICAgICAgLy8gVsOpcmlmaWVyIGxhIGxpZ25lIGVuIGRpYWdvbmFsZVxyXG4gICAgICB3aGlsZSAoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPD0gdGFpbGxlSG9yaXpvbnRhbGUgJiYgaW5kZXhDb3VyYW50VmVydGljYWxlID49IDEpIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleENvdXJhbnRIb3Jpem9udGFsZSwgaW5kZXhDb3VyYW50VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleENvdXJhbnRWZXJ0aWNhbGUsIGluZGV4Q291cmFudEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZS0tO1xyXG4gICAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlKys7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZGlhZ29uYWxUb3BSaWdodChnYW1lLCBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgICA9IGdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcblxyXG4gICAgbGV0IGNvdWxldXJEdVBpb24sIG5iUGlvbnNHYWduYW50cztcclxuICAgIGxldCBpbmRleENvdXJhbnRIb3Jpem9udGFsZTtcclxuICAgIGxldCBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuXHJcbiAgICAvLyBQYXJjb3VycyB0b3V0ZXMgbGVzIGRpYWdvbmFsZXMgw6AgZ2F1Y2hlcyDDoCBwYXJ0aXIgZGUgNC5cclxuICAgIGZvciAobGV0IGluZGV4VmVydGljYWxlID0gNDsgaW5kZXhWZXJ0aWNhbGUgPD0gdGFpbGxlVmVydGljYWxlOyBpbmRleFZlcnRpY2FsZSsrKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSA9IHRhaWxsZUhvcml6b250YWxlO1xyXG4gICAgICBsZXQgaW5kZXhDb3VyYW50VmVydGljYWxlID0gaW5kZXhWZXJ0aWNhbGU7XHJcbiAgICAgIC8vIFbDqXJpZmllciBsYSBsaWduZSBlbiBkaWFnb25hbGVcclxuICAgICAgd2hpbGUgKGluZGV4Q291cmFudEhvcml6b250YWxlID49IDEgJiYgaW5kZXhDb3VyYW50VmVydGljYWxlID49IDEpIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleENvdXJhbnRIb3Jpem9udGFsZSwgaW5kZXhDb3VyYW50VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleENvdXJhbnRWZXJ0aWNhbGUsIGluZGV4Q291cmFudEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlLS07XHJcbiAgICAgICAgaW5kZXhDb3VyYW50VmVydGljYWxlLS07XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gKHRhaWxsZUhvcml6b250YWxlIC0gMSk7IGluZGV4SG9yaXpvbnRhbGUgPj0gNDsgaW5kZXhIb3Jpem9udGFsZS0tKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSA9IGluZGV4SG9yaXpvbnRhbGU7XHJcbiAgICAgIGxldCBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPSB0YWlsbGVWZXJ0aWNhbGU7XHJcbiAgICAgIC8vIFbDqXJpZmllciBsYSBsaWduZSBlbiBkaWFnb25hbGVcclxuICAgICAgd2hpbGUgKGluZGV4Q291cmFudEhvcml6b250YWxlID49IDEgJiYgaW5kZXhDb3VyYW50VmVydGljYWxlID49IDEpIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleENvdXJhbnRIb3Jpem9udGFsZSwgaW5kZXhDb3VyYW50VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleENvdXJhbnRWZXJ0aWNhbGUsIGluZGV4Q291cmFudEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZS0tO1xyXG4gICAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IENoZWNrSWZXaW5uZXIgfSBmcm9tIFwiLi9DaGVja0lmV2lubmVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgV2lubmVyTWFuYWdlciB7XHJcbiAgc3RhdGljIHZlcmlmV2luKGdhbWUsIGNvbG9yKSB7XHJcbiAgICBsZXQgdmVyaWZpY2F0aW9uID0gQ2hlY2tJZldpbm5lci5ob3Jpem9udGFsKGdhbWUsIGNvbG9yKTtcclxuICAgIGlmICh2ZXJpZmljYXRpb24pIHtcclxuICAgICAgcmV0dXJuIHZlcmlmaWNhdGlvbjtcclxuICAgIH1cclxuICAgIHZlcmlmaWNhdGlvbiA9IENoZWNrSWZXaW5uZXIudmVydGljYWwoZ2FtZSwgY29sb3IpO1xyXG4gICAgaWYgKHZlcmlmaWNhdGlvbikge1xyXG4gICAgICByZXR1cm4gdmVyaWZpY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgdmVyaWZpY2F0aW9uID0gQ2hlY2tJZldpbm5lci5kaWFnb25hbFRvcExlZnQoZ2FtZSwgY29sb3IpO1xyXG4gICAgaWYgKHZlcmlmaWNhdGlvbikge1xyXG4gICAgICByZXR1cm4gdmVyaWZpY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgdmVyaWZpY2F0aW9uID0gQ2hlY2tJZldpbm5lci5kaWFnb25hbFRvcFJpZ2h0KGdhbWUsIGNvbG9yKTtcclxuICAgIGlmICh2ZXJpZmljYXRpb24pIHtcclxuICAgICAgcmV0dXJuIHZlcmlmaWNhdGlvbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyB2ZXJpZklmUGlvblBsYWNlZEdpdmVXaW4oZ2FtZSwgbnVtZXJvQ29sb25uZUhvcml6b250YWxlLCBudW1lcm9Db2xvbm5lVmVydGljYWxlLCBjb3VsZXVyUGlvbikge1xyXG4gICAgZ2FtZS5zZXRQaW9uKGNvdWxldXJQaW9uLCBbbnVtZXJvQ29sb25uZUhvcml6b250YWxlLCBudW1lcm9Db2xvbm5lVmVydGljYWxlXSlcclxuICAgIGNvbnN0IGlzV2lubmVyID0gV2lubmVyTWFuYWdlci52ZXJpZldpbihnYW1lLCBjb3VsZXVyUGlvbilcclxuICAgIGdhbWUucmVtb3ZlUGlvbihjb3VsZXVyUGlvbiwgW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pXHJcbiAgICByZXR1cm4gaXNXaW5uZXI7XHJcbiAgfVxyXG5cclxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==