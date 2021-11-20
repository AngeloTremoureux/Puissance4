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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdHNVbml0cy5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7OztBQ05PO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0NBQWdDO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsY0FBYyxnQkFBZ0IsVUFBVSxTQUFTO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGNBQWMsZ0JBQWdCLFVBQVUsU0FBUztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixjQUFjLGdCQUFnQixVQUFVLFNBQVM7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsY0FBYyxnQkFBZ0IsVUFBVSxTQUFTO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixjQUFjLGdCQUFnQixVQUFVLFNBQVM7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGNBQWMsZ0JBQWdCLFVBQVUsU0FBUztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixjQUFjLGlCQUFpQixVQUFVLFNBQVM7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsY0FBYyxpQkFBaUIsVUFBVSxTQUFTO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGNBQWMsZ0JBQWdCLFVBQVUsU0FBUztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsY0FBYyxnQkFBZ0IsVUFBVSxTQUFTO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGNBQWMsZ0JBQWdCLFVBQVUsU0FBUztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3B1aXNzYW5jZTQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3B1aXNzYW5jZTQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvVGVzdHNVbml0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCBjbGFzcyBUZXN0c1VuaXRzIHtcclxuICBjb25zdHJ1Y3RvcihnYW1lKSB7XHJcbiAgICBpZiAoZ2FtZSkge1xyXG4gICAgICB0aGlzLmdhbWUgPSBnYW1lXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBdWN1bmUgcGFydGllIGZvdXJuaXRcIilcclxuICAgIH1cclxuICB9XHJcbiAgbGF1bmNoVGVzdHNVbml0cyAoKSB7XHJcbiAgICB0aGlzLmRlZmF1bHRUYWlsbGVIb3Jpem9udGFsZSA9IHRoaXMuZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcbiAgICB0aGlzLmRlZmF1bHRUYWlsbGVWZXJ0aWNhbGUgICA9IHRoaXMuZ2FtZS5nZXRUYWlsbGVWZXJ0aWNhbGUoKVxyXG5cclxuICAgIGNvbnN0IGxpc3RzVGVzdHNVbml0cyA9IFtdXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0MSgpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDIoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQzKCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0NCgpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDUoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQ2KCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0NygpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDgoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQ5KCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0MTAoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQxMSgpKVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsaXN0c1Rlc3RzVW5pdHMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGxldCBjb2xvcjtcclxuICAgICAgaWYgKGxpc3RzVGVzdHNVbml0c1tpbmRleF0pIHtcclxuICAgICAgICBjb2xvciA9IFwiZ3JlZW5cIjtcclxuICAgICAgfSAgZWxzZSB7XHJcbiAgICAgICAgY29sb3IgPSBcInJlZFwiO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBtZXNzYWdlID0gXCJUZXN0IFwiICsgKGluZGV4ICsgMSkgKyBcIiA6IFwiICsgbGlzdHNUZXN0c1VuaXRzW2luZGV4XSArIFwiXFxuXCI7XHJcbiAgICAgIHRoaXMuZ2FtZS5sb2coXCJUZXN0XCIsIG1lc3NhZ2UsIGNvbG9yKTtcclxuICAgICAgXHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgdGhpcy5yZXNldFRlc3RzKCk7XHJcbiAgICBcclxuXHJcbiAgfVxyXG4gIHJlc2V0VGVzdHMoKSB7XHJcbiAgICB0aGlzLmdhbWUudGFpbGxlSG9yaXpvbnRhbGVEdUpldSA9IHRoaXMuZGVmYXVsdFRhaWxsZUhvcml6b250YWxlO1xyXG4gICAgdGhpcy5nYW1lLnRhaWxsZVZlcnRpY2FsZUR1SmV1ICAgPSB0aGlzLmRlZmF1bHRUYWlsbGVWZXJ0aWNhbGU7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgfVxyXG4gIHRlc3RVbml0MSgpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0ge1wicGFyYW1ldHJlc1wiOntcInhcIjpcIjdcIixcInlcIjpcIjVcIn0sXCJkYXRhc1wiOntcInBpb25zXCI6e1wicmVkXCI6W1s0LDVdLFszLDVdLFsyLDVdLFs2LDRdLFszLDRdLFs0LDRdLFs3LDRdLFszLDNdLFs0LDNdLFs3LDNdLFsxLDRdLFsxLDJdLFsxLDFdLFsyLDFdLFs3LDJdLFs1LDJdXSxcInllbGxvd1wiOltbMSw1XSxbNiw1XSxbNSw1XSxbNyw1XSxbMiw0XSxbNSw0XSxbMiwzXSxbMywyXSxbNCwyXSxbNCwxXSxbMSwzXSxbNiwzXSxbMiwyXSxbNywxXSxbNSwzXV19fX1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcbiAgICBcclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s1LDJdLFs0LDNdLFszLDRdLFsyLDVdXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3llbGxvdycpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCdyZWQnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDIoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHtcInBhcmFtZXRyZXNcIjp7XCJ4XCI6XCI3XCIsXCJ5XCI6XCI1XCJ9LFwiZGF0YXNcIjp7XCJwaW9uc1wiOntcInJlZFwiOltbMSw1XSxbMyw1XSxbMiw1XSxbMiwzXSxbNSw1XSxbNyw0XSxbMiwxXSxbNSw0XV0sXCJ5ZWxsb3dcIjpbWzcsNV0sWzQsNV0sWzIsNF0sWzYsNV0sWzMsNF0sWzIsMl0sWzQsNF0sWzEsNF1dfX19XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG4gICAgXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbNCwxXSxbNCwyXSxbNCwzXSxbNCw0XV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCdyZWQnKSAmJiBKU09OLnN0cmluZ2lmeShXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwneWVsbG93JykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbiAgdGVzdFVuaXQzKCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7XCJwYXJhbWV0cmVzXCI6e1wieFwiOlwiN1wiLFwieVwiOlwiNVwifSxcImRhdGFzXCI6e1wicGlvbnNcIjp7XCJyZWRcIjpbWzMsNV0sWzcsNV0sWzEsNV0sWzcsNF0sWzUsNF0sWzQsMl0sWzIsNV0sWzEsNF0sWzIsM10sWzcsMl0sWzIsMl0sWzMsM10sWzEsM10sWzYsNF1dLFwieWVsbG93XCI6W1s0LDVdLFs1LDVdLFszLDRdLFs0LDRdLFs0LDNdLFs3LDNdLFs0LDFdLFsyLDRdLFs2LDVdLFs3LDFdLFs1LDNdLFs1LDJdLFsyLDFdLFsxLDJdLFs2LDNdXX19fVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuICAgIFxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzMsNF0sWzMsNV0sWzMsNl0sWzMsN11dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwncmVkJykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3llbGxvdycpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0NCgpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0ge1wicGFyYW1ldHJlc1wiOntcInhcIjpcIjdcIixcInlcIjpcIjVcIn0sXCJkYXRhc1wiOntcInBpb25zXCI6e1wicmVkXCI6W1s1LDVdLFs1LDRdLFszLDVdLFs0LDVdLFsxLDVdLFsxLDRdLFs0LDNdLFs2LDJdLFs0LDJdLFsyLDNdLFs1LDJdLFs3LDNdLFs1LDFdLFs3LDFdLFsyLDJdLFsyLDFdLFszLDRdLFszLDNdXSxcInllbGxvd1wiOltbNyw1XSxbNiw1XSxbNiw0XSxbMiw1XSxbNCw0XSxbNyw0XSxbNiwzXSxbNSwzXSxbMiw0XSxbNCwxXSxbNiwxXSxbMSwzXSxbNywyXSxbMSwyXSxbMSwxXSxbMywyXSxbMywxXV19fX1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcbiAgICBcclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCdyZWQnKSAmJiAhV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3llbGxvdycpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDUoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHtcInBhcmFtZXRyZXNcIjp7XCJ4XCI6XCI3XCIsXCJ5XCI6XCI1XCJ9LFwiZGF0YXNcIjp7XCJwaW9uc1wiOntcInJlZFwiOltbMyw1XSxbNCw1XSxbMSw1XSxbNyw1XSxbNyw0XSxbNiwyXSxbNSw1XSxbNSw0XSxbNSwyXSxbMiwyXSxbMSw0XSxbNCwzXSxbNywzXSxbNCwyXSxbMywxXSxbNywxXSxbMSwyXSxbMSwxXV0sXCJ5ZWxsb3dcIjpbWzYsNV0sWzYsNF0sWzIsNV0sWzIsNF0sWzYsM10sWzMsNF0sWzYsMV0sWzUsM10sWzIsM10sWzQsNF0sWzEsM10sWzMsM10sWzcsMl0sWzMsMl0sWzQsMV0sWzIsMV0sWzUsMV1dfX19XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG4gICAgXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwncmVkJykgJiYgIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCd5ZWxsb3cnKSlcclxuICB9XHJcbiAgdGVzdFVuaXQ2KCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7XCJwYXJhbWV0cmVzXCI6e1wieFwiOlwiN1wiLFwieVwiOlwiNVwifSxcImRhdGFzXCI6e1wicGlvbnNcIjp7XCJyZWRcIjpbWzMsNV0sWzcsNF0sWzQsNV0sWzUsNF0sWzQsNF0sWzEsNF0sWzMsNF0sWzQsM10sWzMsM10sWzUsMl0sWzYsNF1dLFwieWVsbG93XCI6W1s3LDVdLFs1LDVdLFs3LDNdLFsyLDVdLFsxLDVdLFs3LDJdLFs1LDNdLFsyLDRdLFs0LDJdLFszLDJdLFs2LDVdXX19fVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuICAgIFxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzQsM10sWzQsNF0sWzQsNV0sWzQsNl1dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwneWVsbG93JykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3JlZCcpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0NygpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0ge1wicGFyYW1ldHJlc1wiOntcInhcIjpcIjdcIixcInlcIjpcIjEwXCJ9LFwiZGF0YXNcIjp7XCJwaW9uc1wiOntcInJlZFwiOltbNiwxMF0sWzIsMTBdLFs3LDldLFsxLDEwXSxbNSwxMF0sWzMsOV0sWzYsOF0sWzYsNl0sWzYsNV0sWzcsN10sWzUsOF0sWzMsN10sWzMsNl0sWzQsOF0sWzYsM10sWzQsN10sWzEsOF0sWzQsNV0sWzIsNl0sWzIsNF0sWzMsNF0sWzMsM10sWzEsN11dLFwieWVsbG93XCI6W1s3LDEwXSxbMywxMF0sWzYsOV0sWzIsOV0sWzQsMTBdLFsxLDldLFs3LDhdLFs2LDddLFs0LDldLFsyLDhdLFs1LDldLFszLDhdLFs3LDZdLFs1LDddLFs2LDRdLFs1LDZdLFszLDVdLFs0LDZdLFsyLDddLFsyLDVdLFs0LDRdLFs2LDJdLFs3LDVdLFsxLDZdXX19fVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuICAgIFxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzksNF0sWzgsM10sWzcsMl0sWzYsMV1dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwncmVkJykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3llbGxvdycpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0OCgpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0ge1wicGFyYW1ldHJlc1wiOntcInhcIjpcIjExXCIsXCJ5XCI6XCI2XCJ9LFwiZGF0YXNcIjp7XCJwaW9uc1wiOntcInJlZFwiOltbMSw2XSxbNSw2XSxbNyw2XSxbMiw1XSxbMTEsNl0sWzksNl0sWzksNV0sWzgsM10sWzMsNF0sWzQsNl0sWzksNF1dLFwieWVsbG93XCI6W1s4LDZdLFs4LDVdLFsyLDZdLFs2LDZdLFszLDZdLFszLDVdLFs4LDRdLFsxLDVdLFsyLDRdLFs3LDVdLFs5LDNdXX19fVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuICAgIFxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzYsNl0sWzUsN10sWzQsOF0sWzMsOV1dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwncmVkJykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3llbGxvdycpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0OSgpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0ge1wicGFyYW1ldHJlc1wiOntcInhcIjpcIjRcIixcInlcIjpcIjRcIn0sXCJkYXRhc1wiOntcInBpb25zXCI6e1wicmVkXCI6W1s0LDRdLFsyLDRdLFs0LDJdLFsyLDNdLFs0LDFdLFsyLDFdLFsxLDJdLFszLDFdXSxcInllbGxvd1wiOltbMSw0XSxbNCwzXSxbMyw0XSxbMywzXSxbMiwyXSxbMSwzXSxbMywyXSxbMSwxXV19fX1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcbiAgICBcclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCdyZWQnKSAmJiAhV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3llbGxvdycpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDEwKCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7XCJwYXJhbWV0cmVzXCI6e1wieFwiOlwiNFwiLFwieVwiOlwiNFwifSxcImRhdGFzXCI6e1wicGlvbnNcIjp7XCJyZWRcIjpbWzIsNF0sWzMsNF0sWzIsMl0sWzIsMV0sWzEsM10sWzQsMl1dLFwieWVsbG93XCI6W1s0LDRdLFs0LDNdLFsyLDNdLFsxLDRdLFszLDNdLFszLDJdLFs0LDFdXX19fVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuICAgIFxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzQsMV0sWzMsMl0sWzIsM10sWzEsNF1dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwncmVkJykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3llbGxvdycpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0MTEoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHtcInBhcmFtZXRyZXNcIjp7XCJ4XCI6XCI4XCIsXCJ5XCI6XCI3XCJ9LFwiZGF0YXNcIjp7XCJwaW9uc1wiOntcInJlZFwiOltbMSw3XSxbNiw3XSxbNCw2XSxbOCw2XSxbMyw2XSxbNyw3XSxbNyw2XSxbNyw1XSxbNSw3XSxbMiw3XSxbNSw2XSxbNSw1XSxbNSwzXSxbNywzXSxbNiw1XV0sXCJ5ZWxsb3dcIjpbWzgsN10sWzMsN10sWzQsN10sWzQsNV0sWzQsNF0sWzEsNl0sWzgsNV0sWzgsNF0sWzcsNF0sWzMsNV0sWzYsNl0sWzIsNl0sWzUsNF0sWzMsNF0sWzcsMl0sWzYsNF1dfX19XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG4gICAgXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbNCwzXSxbNCw0XSxbNCw1XSxbNCw2XV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCdyZWQnKSAmJiBKU09OLnN0cmluZ2lmeShXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwneWVsbG93JykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=