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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbHMuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNOTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isb0JBQW9CO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isa0JBQWtCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9VdGlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCBjbGFzcyBVdGlscyB7XHJcbiAgc3RhdGljIGdldEVudGllckFsZWF0b2lyZShtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKTtcclxuICB9XHJcbiAgXHJcbiAgc3RhdGljIGdldEVsZW1lbnRBbGVhdG9pcmUobGlzdGUpIHtcclxuICAgIGxldCBsb25ndWV1ckxpc3RlID0gbGlzdGUubGVuZ3RoO1xyXG4gICAgbGV0IGVudGllckFsZWF0b2lyZUluZGV4ZVBhckxpc3RlID0gVXRpbHMuZ2V0RW50aWVyQWxlYXRvaXJlKDAsIGxvbmd1ZXVyTGlzdGUpO1xyXG4gICAgcmV0dXJuIGxpc3RlW2VudGllckFsZWF0b2lyZUluZGV4ZVBhckxpc3RlXTtcclxuICB9XHJcbiAgXHJcbiAgc3RhdGljIGFycmF5MkRDb250YWluc0FycmF5KGFycmF5MkQsIGFycmF5U2VhcmNoKSB7XHJcbiAgICBsZXQgaXRlbVN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGFycmF5U2VhcmNoKTtcclxuICAgIGxldCBjb250YWlucyA9IGFycmF5MkQuc29tZShmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShlbGVtZW50KSA9PT0gaXRlbVN0cmluZztcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNvbnRhaW5zO1xyXG4gIH1cclxuICBcclxuICBzdGF0aWMgZ2V0SW5kZXhPZjJEQXJyYXkoYXJyYXkyRCwgaW5kZXgpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkyRC5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgY3VycmVudEFycmF5ID0gYXJyYXkyRFtpXTtcclxuICAgICAgaWYgKGN1cnJlbnRBcnJheVswXSA9PSBpbmRleFswXSAmJiBjdXJyZW50QXJyYXlbMV0gPT0gaW5kZXhbMV0pIHtcclxuICAgICAgICByZXR1cm4gaTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldENvdWxldXJFcXVpcGVBbGVhdG9pcmUoKSB7XHJcbiAgICBsZXQgbGlzdGVEZUNvdWxldXJzID0gW1wieWVsbG93XCIsIFwicmVkXCJdO1xyXG4gICAgbGV0IG5vbWJyZUFsZWF0b2lyZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxpc3RlRGVDb3VsZXVycy5sZW5ndGgpO1xyXG4gICAgcmV0dXJuIGxpc3RlRGVDb3VsZXVyc1tub21icmVBbGVhdG9pcmVdO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldENvdWxldXJFcXVpcGVBZHZlcnNlKGNvdWxldXJFcXVpcGVBY3R1ZWxsZSkge1xyXG4gICAgaWYgKGNvdWxldXJFcXVpcGVBY3R1ZWxsZSA9PSAncmVkJykge1xyXG4gICAgICByZXR1cm4gJ3llbGxvdyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJ3JlZCc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGFyc2VVUkxQYXJhbXModXJsKSB7XHJcbiAgICB2YXIgcXVlcnlTdGFydCA9IHVybC5pbmRleE9mKFwiP1wiKSArIDEsXHJcbiAgICAgICAgcXVlcnlFbmQgICA9IHVybC5pbmRleE9mKFwiI1wiKSArIDEgfHwgdXJsLmxlbmd0aCArIDEsXHJcbiAgICAgICAgcXVlcnkgPSB1cmwuc2xpY2UocXVlcnlTdGFydCwgcXVlcnlFbmQgLSAxKSxcclxuICAgICAgICBwYWlycyA9IHF1ZXJ5LnJlcGxhY2UoL1xcKy9nLCBcIiBcIikuc3BsaXQoXCImXCIpLFxyXG4gICAgICAgIHBhcm1zID0ge30sIGksIG4sIHYsIG52O1xyXG5cclxuICAgIGlmIChxdWVyeSA9PT0gdXJsIHx8IHF1ZXJ5ID09PSBcIlwiKSByZXR1cm47XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbnYgPSBwYWlyc1tpXS5zcGxpdChcIj1cIiwgMik7XHJcbiAgICAgICAgbiA9IGRlY29kZVVSSUNvbXBvbmVudChudlswXSk7XHJcbiAgICAgICAgdiA9IGRlY29kZVVSSUNvbXBvbmVudChudlsxXSk7XHJcblxyXG4gICAgICAgIGlmICghcGFybXMuaGFzT3duUHJvcGVydHkobikpIHBhcm1zW25dID0gW107XHJcbiAgICAgICAgcGFybXNbbl0ucHVzaChudi5sZW5ndGggPT09IDIgPyB2IDogbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFybXM7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==