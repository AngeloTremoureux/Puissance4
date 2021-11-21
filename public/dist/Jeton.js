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


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSmV0b24uanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNOQTtJQUtFLGVBQVksbUJBQTJCLEVBQUUsaUJBQXlCO1FBQ2hFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztRQUMvQyxJQUFJLENBQUMsaUJBQWlCLEdBQUssaUJBQWlCLENBQUM7SUFDL0MsQ0FBQztJQUVNLDJCQUFXLEdBQWxCO1FBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDM0QsQ0FBQztJQUVNLHNDQUFzQixHQUE3QjtRQUNFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ2xDLENBQUM7SUFFTSxvQ0FBb0IsR0FBM0I7UUFDRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0lBRUgsWUFBQztBQUFELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3B1aXNzYW5jZTQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3B1aXNzYW5jZTQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL0pldG9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0IGNsYXNzIEpldG9uIHtcclxuXHJcbiAgcHJpdmF0ZSBwb3NpdGlvbkhvcml6b250YWxlOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBwb3NpdGlvblZlcnRpY2FsZTogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbkhvcml6b250YWxlOiBudW1iZXIsIHBvc2l0aW9uVmVydGljYWxlOiBudW1iZXIpIHtcclxuICAgIHRoaXMucG9zaXRpb25Ib3Jpem9udGFsZSA9IHBvc2l0aW9uSG9yaXpvbnRhbGU7XHJcbiAgICB0aGlzLnBvc2l0aW9uVmVydGljYWxlICAgPSBwb3NpdGlvblZlcnRpY2FsZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRQb3NpdGlvbigpOiBudW1iZXJbXSB7XHJcbiAgICByZXR1cm4gW3RoaXMucG9zaXRpb25Ib3Jpem9udGFsZSwgdGhpcy5wb3NpdGlvblZlcnRpY2FsZV1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRQb3NpdGlvbkhvcml6b250YWxlKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbkhvcml6b250YWxlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFBvc2l0aW9uVmVydGljYWxlKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvblZlcnRpY2FsZTtcclxuICB9XHJcbiAgXHJcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=