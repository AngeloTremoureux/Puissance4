/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
  launchTestsUnits() {
    this.defaultTailleHorizontale = this.game.getTailleHorizontale()
    this.defaultTailleVerticale = this.game.getTailleVerticale()

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
      } else {
        color = "red";
      }
      let message = "Test " + (index + 1) + " : " + listsTestsUnits[index] + "\n";
      this.game.log("Test", message, color);


    }
    this.resetTests();


  }
  resetTests() {
    this.game.tailleHorizontaleDuJeu = this.defaultTailleHorizontale;
    this.game.tailleVerticaleDuJeu = this.defaultTailleVerticale;
    game.resetGame()
  }
  testUnit1() {
    game.resetGame()
    let gameExport = { "parametres": { "x": "7", "y": "5" }, "datas": { "pions": { "red": [[4, 5], [3, 5], [2, 5], [6, 4], [3, 4], [4, 4], [7, 4], [3, 3], [4, 3], [7, 3], [1, 4], [1, 2], [1, 1], [2, 1], [7, 2], [5, 2]], "yellow": [[1, 5], [6, 5], [5, 5], [7, 5], [2, 4], [5, 4], [2, 3], [3, 2], [4, 2], [4, 1], [1, 3], [6, 3], [2, 2], [7, 1], [5, 3]] } } }
    game.import(gameExport)

    let valeurAttendu = [[5, 2], [4, 3], [3, 4], [2, 5]]
    return (!WinnerManager.verifWin(this.game, 'yellow') && JSON.stringify(WinnerManager.verifWin(this.game, 'red')) === JSON.stringify(valeurAttendu))
  }
  testUnit2() {
    game.resetGame()
    let gameExport = { "parametres": { "x": "7", "y": "5" }, "datas": { "pions": { "red": [[1, 5], [3, 5], [2, 5], [2, 3], [5, 5], [7, 4], [2, 1], [5, 4]], "yellow": [[7, 5], [4, 5], [2, 4], [6, 5], [3, 4], [2, 2], [4, 4], [1, 4]] } } }
    game.import(gameExport)

    let valeurAttendu = [[4, 1], [4, 2], [4, 3], [4, 4]]
    return (!WinnerManager.verifWin(this.game, 'red') && JSON.stringify(WinnerManager.verifWin(this.game, 'yellow')) === JSON.stringify(valeurAttendu))
  }
  testUnit3() {
    game.resetGame()
    let gameExport = { "parametres": { "x": "7", "y": "5" }, "datas": { "pions": { "red": [[3, 5], [7, 5], [1, 5], [7, 4], [5, 4], [4, 2], [2, 5], [1, 4], [2, 3], [7, 2], [2, 2], [3, 3], [1, 3], [6, 4]], "yellow": [[4, 5], [5, 5], [3, 4], [4, 4], [4, 3], [7, 3], [4, 1], [2, 4], [6, 5], [7, 1], [5, 3], [5, 2], [2, 1], [1, 2], [6, 3]] } } }
    game.import(gameExport)

    let valeurAttendu = [[3, 4], [3, 5], [3, 6], [3, 7]]
    return (!WinnerManager.verifWin(this.game, 'red') && JSON.stringify(WinnerManager.verifWin(this.game, 'yellow')) === JSON.stringify(valeurAttendu))
  }
  testUnit4() {
    game.resetGame()
    let gameExport = { "parametres": { "x": "7", "y": "5" }, "datas": { "pions": { "red": [[5, 5], [5, 4], [3, 5], [4, 5], [1, 5], [1, 4], [4, 3], [6, 2], [4, 2], [2, 3], [5, 2], [7, 3], [5, 1], [7, 1], [2, 2], [2, 1], [3, 4], [3, 3]], "yellow": [[7, 5], [6, 5], [6, 4], [2, 5], [4, 4], [7, 4], [6, 3], [5, 3], [2, 4], [4, 1], [6, 1], [1, 3], [7, 2], [1, 2], [1, 1], [3, 2], [3, 1]] } } }
    game.import(gameExport)

    return (!WinnerManager.verifWin(this.game, 'red') && !WinnerManager.verifWin(this.game, 'yellow'))
  }
  testUnit5() {
    game.resetGame()
    let gameExport = { "parametres": { "x": "7", "y": "5" }, "datas": { "pions": { "red": [[3, 5], [4, 5], [1, 5], [7, 5], [7, 4], [6, 2], [5, 5], [5, 4], [5, 2], [2, 2], [1, 4], [4, 3], [7, 3], [4, 2], [3, 1], [7, 1], [1, 2], [1, 1]], "yellow": [[6, 5], [6, 4], [2, 5], [2, 4], [6, 3], [3, 4], [6, 1], [5, 3], [2, 3], [4, 4], [1, 3], [3, 3], [7, 2], [3, 2], [4, 1], [2, 1], [5, 1]] } } }
    game.import(gameExport)

    return (!WinnerManager.verifWin(this.game, 'red') && !WinnerManager.verifWin(this.game, 'yellow'))
  }
  testUnit6() {
    game.resetGame()
    let gameExport = { "parametres": { "x": "7", "y": "5" }, "datas": { "pions": { "red": [[3, 5], [7, 4], [4, 5], [5, 4], [4, 4], [1, 4], [3, 4], [4, 3], [3, 3], [5, 2], [6, 4]], "yellow": [[7, 5], [5, 5], [7, 3], [2, 5], [1, 5], [7, 2], [5, 3], [2, 4], [4, 2], [3, 2], [6, 5]] } } }
    game.import(gameExport)

    let valeurAttendu = [[4, 3], [4, 4], [4, 5], [4, 6]]
    return (!WinnerManager.verifWin(this.game, 'yellow') && JSON.stringify(WinnerManager.verifWin(this.game, 'red')) === JSON.stringify(valeurAttendu))
  }
  testUnit7() {
    game.resetGame()
    let gameExport = { "parametres": { "x": "7", "y": "10" }, "datas": { "pions": { "red": [[6, 10], [2, 10], [7, 9], [1, 10], [5, 10], [3, 9], [6, 8], [6, 6], [6, 5], [7, 7], [5, 8], [3, 7], [3, 6], [4, 8], [6, 3], [4, 7], [1, 8], [4, 5], [2, 6], [2, 4], [3, 4], [3, 3], [1, 7]], "yellow": [[7, 10], [3, 10], [6, 9], [2, 9], [4, 10], [1, 9], [7, 8], [6, 7], [4, 9], [2, 8], [5, 9], [3, 8], [7, 6], [5, 7], [6, 4], [5, 6], [3, 5], [4, 6], [2, 7], [2, 5], [4, 4], [6, 2], [7, 5], [1, 6]] } } }
    game.import(gameExport)

    let valeurAttendu = [[9, 4], [8, 3], [7, 2], [6, 1]]
    return (!WinnerManager.verifWin(this.game, 'red') && JSON.stringify(WinnerManager.verifWin(this.game, 'yellow')) === JSON.stringify(valeurAttendu))
  }
  testUnit8() {
    game.resetGame()
    let gameExport = { "parametres": { "x": "11", "y": "6" }, "datas": { "pions": { "red": [[1, 6], [5, 6], [7, 6], [2, 5], [11, 6], [9, 6], [9, 5], [8, 3], [3, 4], [4, 6], [9, 4]], "yellow": [[8, 6], [8, 5], [2, 6], [6, 6], [3, 6], [3, 5], [8, 4], [1, 5], [2, 4], [7, 5], [9, 3]] } } }
    game.import(gameExport)

    let valeurAttendu = [[6, 6], [5, 7], [4, 8], [3, 9]]
    return (!WinnerManager.verifWin(this.game, 'red') && JSON.stringify(WinnerManager.verifWin(this.game, 'yellow')) === JSON.stringify(valeurAttendu))
  }
  testUnit9() {
    game.resetGame()
    let gameExport = { "parametres": { "x": "4", "y": "4" }, "datas": { "pions": { "red": [[4, 4], [2, 4], [4, 2], [2, 3], [4, 1], [2, 1], [1, 2], [3, 1]], "yellow": [[1, 4], [4, 3], [3, 4], [3, 3], [2, 2], [1, 3], [3, 2], [1, 1]] } } }
    game.import(gameExport)

    return (!WinnerManager.verifWin(this.game, 'red') && !WinnerManager.verifWin(this.game, 'yellow'))
  }
  testUnit10() {
    game.resetGame()
    let gameExport = { "parametres": { "x": "4", "y": "4" }, "datas": { "pions": { "red": [[2, 4], [3, 4], [2, 2], [2, 1], [1, 3], [4, 2]], "yellow": [[4, 4], [4, 3], [2, 3], [1, 4], [3, 3], [3, 2], [4, 1]] } } }
    game.import(gameExport)

    let valeurAttendu = [[4, 1], [3, 2], [2, 3], [1, 4]]
    return (!WinnerManager.verifWin(this.game, 'red') && JSON.stringify(WinnerManager.verifWin(this.game, 'yellow')) === JSON.stringify(valeurAttendu))
  }
  testUnit11() {
    game.resetGame()
    let gameExport = { "parametres": { "x": "8", "y": "7" }, "datas": { "pions": { "red": [[1, 7], [6, 7], [4, 6], [8, 6], [3, 6], [7, 7], [7, 6], [7, 5], [5, 7], [2, 7], [5, 6], [5, 5], [5, 3], [7, 3], [6, 5]], "yellow": [[8, 7], [3, 7], [4, 7], [4, 5], [4, 4], [1, 6], [8, 5], [8, 4], [7, 4], [3, 5], [6, 6], [2, 6], [5, 4], [3, 4], [7, 2], [6, 4]] } } }
    game.import(gameExport)

    let valeurAttendu = [[4, 3], [4, 4], [4, 5], [4, 6]]
    return (!WinnerManager.verifWin(this.game, 'red') && JSON.stringify(WinnerManager.verifWin(this.game, 'yellow')) === JSON.stringify(valeurAttendu))
  }
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdHNVbml0cy5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7OztBQ05PO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0NBQWdDO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZ0JBQWdCLG9CQUFvQixhQUFhLFdBQVc7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZ0JBQWdCLG9CQUFvQixhQUFhLFdBQVc7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZ0JBQWdCLG9CQUFvQixhQUFhLFdBQVc7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZ0JBQWdCLG9CQUFvQixhQUFhLFdBQVc7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGdCQUFnQixvQkFBb0IsYUFBYSxXQUFXO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixnQkFBZ0Isb0JBQW9CLGFBQWEsV0FBVztBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixnQkFBZ0IscUJBQXFCLGFBQWEsV0FBVztBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixnQkFBZ0IscUJBQXFCLGFBQWEsV0FBVztBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixnQkFBZ0Isb0JBQW9CLGFBQWEsV0FBVztBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZ0JBQWdCLG9CQUFvQixhQUFhLFdBQVc7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZ0JBQWdCLG9CQUFvQixhQUFhLFdBQVc7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3B1aXNzYW5jZTQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3B1aXNzYW5jZTQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL1Rlc3RzVW5pdHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQgY2xhc3MgVGVzdHNVbml0cyB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xyXG4gICAgaWYgKGdhbWUpIHtcclxuICAgICAgdGhpcy5nYW1lID0gZ2FtZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXVjdW5lIHBhcnRpZSBmb3Vybml0XCIpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGxhdW5jaFRlc3RzVW5pdHMoKSB7XHJcbiAgICB0aGlzLmRlZmF1bHRUYWlsbGVIb3Jpem9udGFsZSA9IHRoaXMuZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcbiAgICB0aGlzLmRlZmF1bHRUYWlsbGVWZXJ0aWNhbGUgPSB0aGlzLmdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuXHJcbiAgICBjb25zdCBsaXN0c1Rlc3RzVW5pdHMgPSBbXVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDEoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQyKCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0MygpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDQoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQ1KCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0NigpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDcoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQ4KCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0OSgpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDEwKCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0MTEoKSlcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGlzdHNUZXN0c1VuaXRzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBsZXQgY29sb3I7XHJcbiAgICAgIGlmIChsaXN0c1Rlc3RzVW5pdHNbaW5kZXhdKSB7XHJcbiAgICAgICAgY29sb3IgPSBcImdyZWVuXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29sb3IgPSBcInJlZFwiO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBtZXNzYWdlID0gXCJUZXN0IFwiICsgKGluZGV4ICsgMSkgKyBcIiA6IFwiICsgbGlzdHNUZXN0c1VuaXRzW2luZGV4XSArIFwiXFxuXCI7XHJcbiAgICAgIHRoaXMuZ2FtZS5sb2coXCJUZXN0XCIsIG1lc3NhZ2UsIGNvbG9yKTtcclxuXHJcblxyXG4gICAgfVxyXG4gICAgdGhpcy5yZXNldFRlc3RzKCk7XHJcblxyXG5cclxuICB9XHJcbiAgcmVzZXRUZXN0cygpIHtcclxuICAgIHRoaXMuZ2FtZS50YWlsbGVIb3Jpem9udGFsZUR1SmV1ID0gdGhpcy5kZWZhdWx0VGFpbGxlSG9yaXpvbnRhbGU7XHJcbiAgICB0aGlzLmdhbWUudGFpbGxlVmVydGljYWxlRHVKZXUgPSB0aGlzLmRlZmF1bHRUYWlsbGVWZXJ0aWNhbGU7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgfVxyXG4gIHRlc3RVbml0MSgpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0geyBcInBhcmFtZXRyZXNcIjogeyBcInhcIjogXCI3XCIsIFwieVwiOiBcIjVcIiB9LCBcImRhdGFzXCI6IHsgXCJwaW9uc1wiOiB7IFwicmVkXCI6IFtbNCwgNV0sIFszLCA1XSwgWzIsIDVdLCBbNiwgNF0sIFszLCA0XSwgWzQsIDRdLCBbNywgNF0sIFszLCAzXSwgWzQsIDNdLCBbNywgM10sIFsxLCA0XSwgWzEsIDJdLCBbMSwgMV0sIFsyLCAxXSwgWzcsIDJdLCBbNSwgMl1dLCBcInllbGxvd1wiOiBbWzEsIDVdLCBbNiwgNV0sIFs1LCA1XSwgWzcsIDVdLCBbMiwgNF0sIFs1LCA0XSwgWzIsIDNdLCBbMywgMl0sIFs0LCAyXSwgWzQsIDFdLCBbMSwgM10sIFs2LCAzXSwgWzIsIDJdLCBbNywgMV0sIFs1LCAzXV0gfSB9IH1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcblxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzUsIDJdLCBbNCwgM10sIFszLCA0XSwgWzIsIDVdXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICd5ZWxsb3cnKSAmJiBKU09OLnN0cmluZ2lmeShXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3JlZCcpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0MigpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0geyBcInBhcmFtZXRyZXNcIjogeyBcInhcIjogXCI3XCIsIFwieVwiOiBcIjVcIiB9LCBcImRhdGFzXCI6IHsgXCJwaW9uc1wiOiB7IFwicmVkXCI6IFtbMSwgNV0sIFszLCA1XSwgWzIsIDVdLCBbMiwgM10sIFs1LCA1XSwgWzcsIDRdLCBbMiwgMV0sIFs1LCA0XV0sIFwieWVsbG93XCI6IFtbNywgNV0sIFs0LCA1XSwgWzIsIDRdLCBbNiwgNV0sIFszLCA0XSwgWzIsIDJdLCBbNCwgNF0sIFsxLCA0XV0gfSB9IH1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcblxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzQsIDFdLCBbNCwgMl0sIFs0LCAzXSwgWzQsIDRdXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICdyZWQnKSAmJiBKU09OLnN0cmluZ2lmeShXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3llbGxvdycpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0MygpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0geyBcInBhcmFtZXRyZXNcIjogeyBcInhcIjogXCI3XCIsIFwieVwiOiBcIjVcIiB9LCBcImRhdGFzXCI6IHsgXCJwaW9uc1wiOiB7IFwicmVkXCI6IFtbMywgNV0sIFs3LCA1XSwgWzEsIDVdLCBbNywgNF0sIFs1LCA0XSwgWzQsIDJdLCBbMiwgNV0sIFsxLCA0XSwgWzIsIDNdLCBbNywgMl0sIFsyLCAyXSwgWzMsIDNdLCBbMSwgM10sIFs2LCA0XV0sIFwieWVsbG93XCI6IFtbNCwgNV0sIFs1LCA1XSwgWzMsIDRdLCBbNCwgNF0sIFs0LCAzXSwgWzcsIDNdLCBbNCwgMV0sIFsyLCA0XSwgWzYsIDVdLCBbNywgMV0sIFs1LCAzXSwgWzUsIDJdLCBbMiwgMV0sIFsxLCAyXSwgWzYsIDNdXSB9IH0gfVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbMywgNF0sIFszLCA1XSwgWzMsIDZdLCBbMywgN11dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3JlZCcpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAneWVsbG93JykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbiAgdGVzdFVuaXQ0KCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7IFwicGFyYW1ldHJlc1wiOiB7IFwieFwiOiBcIjdcIiwgXCJ5XCI6IFwiNVwiIH0sIFwiZGF0YXNcIjogeyBcInBpb25zXCI6IHsgXCJyZWRcIjogW1s1LCA1XSwgWzUsIDRdLCBbMywgNV0sIFs0LCA1XSwgWzEsIDVdLCBbMSwgNF0sIFs0LCAzXSwgWzYsIDJdLCBbNCwgMl0sIFsyLCAzXSwgWzUsIDJdLCBbNywgM10sIFs1LCAxXSwgWzcsIDFdLCBbMiwgMl0sIFsyLCAxXSwgWzMsIDRdLCBbMywgM11dLCBcInllbGxvd1wiOiBbWzcsIDVdLCBbNiwgNV0sIFs2LCA0XSwgWzIsIDVdLCBbNCwgNF0sIFs3LCA0XSwgWzYsIDNdLCBbNSwgM10sIFsyLCA0XSwgWzQsIDFdLCBbNiwgMV0sIFsxLCAzXSwgWzcsIDJdLCBbMSwgMl0sIFsxLCAxXSwgWzMsIDJdLCBbMywgMV1dIH0gfSB9XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG5cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAncmVkJykgJiYgIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAneWVsbG93JykpXHJcbiAgfVxyXG4gIHRlc3RVbml0NSgpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0geyBcInBhcmFtZXRyZXNcIjogeyBcInhcIjogXCI3XCIsIFwieVwiOiBcIjVcIiB9LCBcImRhdGFzXCI6IHsgXCJwaW9uc1wiOiB7IFwicmVkXCI6IFtbMywgNV0sIFs0LCA1XSwgWzEsIDVdLCBbNywgNV0sIFs3LCA0XSwgWzYsIDJdLCBbNSwgNV0sIFs1LCA0XSwgWzUsIDJdLCBbMiwgMl0sIFsxLCA0XSwgWzQsIDNdLCBbNywgM10sIFs0LCAyXSwgWzMsIDFdLCBbNywgMV0sIFsxLCAyXSwgWzEsIDFdXSwgXCJ5ZWxsb3dcIjogW1s2LCA1XSwgWzYsIDRdLCBbMiwgNV0sIFsyLCA0XSwgWzYsIDNdLCBbMywgNF0sIFs2LCAxXSwgWzUsIDNdLCBbMiwgM10sIFs0LCA0XSwgWzEsIDNdLCBbMywgM10sIFs3LCAyXSwgWzMsIDJdLCBbNCwgMV0sIFsyLCAxXSwgWzUsIDFdXSB9IH0gfVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3JlZCcpICYmICFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3llbGxvdycpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDYoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHsgXCJwYXJhbWV0cmVzXCI6IHsgXCJ4XCI6IFwiN1wiLCBcInlcIjogXCI1XCIgfSwgXCJkYXRhc1wiOiB7IFwicGlvbnNcIjogeyBcInJlZFwiOiBbWzMsIDVdLCBbNywgNF0sIFs0LCA1XSwgWzUsIDRdLCBbNCwgNF0sIFsxLCA0XSwgWzMsIDRdLCBbNCwgM10sIFszLCAzXSwgWzUsIDJdLCBbNiwgNF1dLCBcInllbGxvd1wiOiBbWzcsIDVdLCBbNSwgNV0sIFs3LCAzXSwgWzIsIDVdLCBbMSwgNV0sIFs3LCAyXSwgWzUsIDNdLCBbMiwgNF0sIFs0LCAyXSwgWzMsIDJdLCBbNiwgNV1dIH0gfSB9XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG5cclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s0LCAzXSwgWzQsIDRdLCBbNCwgNV0sIFs0LCA2XV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAneWVsbG93JykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICdyZWQnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDcoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHsgXCJwYXJhbWV0cmVzXCI6IHsgXCJ4XCI6IFwiN1wiLCBcInlcIjogXCIxMFwiIH0sIFwiZGF0YXNcIjogeyBcInBpb25zXCI6IHsgXCJyZWRcIjogW1s2LCAxMF0sIFsyLCAxMF0sIFs3LCA5XSwgWzEsIDEwXSwgWzUsIDEwXSwgWzMsIDldLCBbNiwgOF0sIFs2LCA2XSwgWzYsIDVdLCBbNywgN10sIFs1LCA4XSwgWzMsIDddLCBbMywgNl0sIFs0LCA4XSwgWzYsIDNdLCBbNCwgN10sIFsxLCA4XSwgWzQsIDVdLCBbMiwgNl0sIFsyLCA0XSwgWzMsIDRdLCBbMywgM10sIFsxLCA3XV0sIFwieWVsbG93XCI6IFtbNywgMTBdLCBbMywgMTBdLCBbNiwgOV0sIFsyLCA5XSwgWzQsIDEwXSwgWzEsIDldLCBbNywgOF0sIFs2LCA3XSwgWzQsIDldLCBbMiwgOF0sIFs1LCA5XSwgWzMsIDhdLCBbNywgNl0sIFs1LCA3XSwgWzYsIDRdLCBbNSwgNl0sIFszLCA1XSwgWzQsIDZdLCBbMiwgN10sIFsyLCA1XSwgWzQsIDRdLCBbNiwgMl0sIFs3LCA1XSwgWzEsIDZdXSB9IH0gfVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbOSwgNF0sIFs4LCAzXSwgWzcsIDJdLCBbNiwgMV1dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3JlZCcpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAneWVsbG93JykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbiAgdGVzdFVuaXQ4KCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7IFwicGFyYW1ldHJlc1wiOiB7IFwieFwiOiBcIjExXCIsIFwieVwiOiBcIjZcIiB9LCBcImRhdGFzXCI6IHsgXCJwaW9uc1wiOiB7IFwicmVkXCI6IFtbMSwgNl0sIFs1LCA2XSwgWzcsIDZdLCBbMiwgNV0sIFsxMSwgNl0sIFs5LCA2XSwgWzksIDVdLCBbOCwgM10sIFszLCA0XSwgWzQsIDZdLCBbOSwgNF1dLCBcInllbGxvd1wiOiBbWzgsIDZdLCBbOCwgNV0sIFsyLCA2XSwgWzYsIDZdLCBbMywgNl0sIFszLCA1XSwgWzgsIDRdLCBbMSwgNV0sIFsyLCA0XSwgWzcsIDVdLCBbOSwgM11dIH0gfSB9XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG5cclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s2LCA2XSwgWzUsIDddLCBbNCwgOF0sIFszLCA5XV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAncmVkJykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICd5ZWxsb3cnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDkoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHsgXCJwYXJhbWV0cmVzXCI6IHsgXCJ4XCI6IFwiNFwiLCBcInlcIjogXCI0XCIgfSwgXCJkYXRhc1wiOiB7IFwicGlvbnNcIjogeyBcInJlZFwiOiBbWzQsIDRdLCBbMiwgNF0sIFs0LCAyXSwgWzIsIDNdLCBbNCwgMV0sIFsyLCAxXSwgWzEsIDJdLCBbMywgMV1dLCBcInllbGxvd1wiOiBbWzEsIDRdLCBbNCwgM10sIFszLCA0XSwgWzMsIDNdLCBbMiwgMl0sIFsxLCAzXSwgWzMsIDJdLCBbMSwgMV1dIH0gfSB9XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG5cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAncmVkJykgJiYgIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAneWVsbG93JykpXHJcbiAgfVxyXG4gIHRlc3RVbml0MTAoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHsgXCJwYXJhbWV0cmVzXCI6IHsgXCJ4XCI6IFwiNFwiLCBcInlcIjogXCI0XCIgfSwgXCJkYXRhc1wiOiB7IFwicGlvbnNcIjogeyBcInJlZFwiOiBbWzIsIDRdLCBbMywgNF0sIFsyLCAyXSwgWzIsIDFdLCBbMSwgM10sIFs0LCAyXV0sIFwieWVsbG93XCI6IFtbNCwgNF0sIFs0LCAzXSwgWzIsIDNdLCBbMSwgNF0sIFszLCAzXSwgWzMsIDJdLCBbNCwgMV1dIH0gfSB9XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG5cclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s0LCAxXSwgWzMsIDJdLCBbMiwgM10sIFsxLCA0XV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAncmVkJykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICd5ZWxsb3cnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDExKCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7IFwicGFyYW1ldHJlc1wiOiB7IFwieFwiOiBcIjhcIiwgXCJ5XCI6IFwiN1wiIH0sIFwiZGF0YXNcIjogeyBcInBpb25zXCI6IHsgXCJyZWRcIjogW1sxLCA3XSwgWzYsIDddLCBbNCwgNl0sIFs4LCA2XSwgWzMsIDZdLCBbNywgN10sIFs3LCA2XSwgWzcsIDVdLCBbNSwgN10sIFsyLCA3XSwgWzUsIDZdLCBbNSwgNV0sIFs1LCAzXSwgWzcsIDNdLCBbNiwgNV1dLCBcInllbGxvd1wiOiBbWzgsIDddLCBbMywgN10sIFs0LCA3XSwgWzQsIDVdLCBbNCwgNF0sIFsxLCA2XSwgWzgsIDVdLCBbOCwgNF0sIFs3LCA0XSwgWzMsIDVdLCBbNiwgNl0sIFsyLCA2XSwgWzUsIDRdLCBbMywgNF0sIFs3LCAyXSwgWzYsIDRdXSB9IH0gfVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbNCwgM10sIFs0LCA0XSwgWzQsIDVdLCBbNCwgNl1dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3JlZCcpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAneWVsbG93JykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=