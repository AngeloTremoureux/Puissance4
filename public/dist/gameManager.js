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
/* harmony import */ var _Jeton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);





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
/* harmony export */   "Jeton": () => (/* binding */ Jeton)
/* harmony export */ });
class Jeton {
  constructor(positionHorizontale, positionVerticale) {
    this.positionHorizontale = positionHorizontale;
    this.positionVerticale   = positionVerticale;
  }
}

/***/ }),
/* 8 */
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
/* harmony import */ var _TestsUnits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _RobotManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);



function ajouteUnPionDansBdd(px, py, color) {
    var gameId = 4;
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
    var testsUnits = new _TestsUnits__WEBPACK_IMPORTED_MODULE_1__.TestsUnits(_Game__WEBPACK_IMPORTED_MODULE_0__.Game.getGame());
    testsUnits.launchTestsUnits();
}
function playGame() {
    _Game__WEBPACK_IMPORTED_MODULE_0__.Game.getGame().playGame();
}
function lanceUnePartieDeRobots() {
    var robotManager = _RobotManager__WEBPACK_IMPORTED_MODULE_2__.RobotManager.getRobotManager(_Game__WEBPACK_IMPORTED_MODULE_0__.Game.getGame());
    robotManager.lanceUnePartieDeRobots();
}
function openParam() {
    $('#dialog').removeClass('d-none');
    $("#dialog").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "Valider": function () {
                $("#parametersValues").submit();
                $(this).dialog("close");
            },
            "Fermer": function () {
                $(this).dialog("close");
            }
        }
    });
}
function loadParam() {
    window.location.replace('?x=' + $('#nbCaseX').val() + '&y=' + $('#nbCaseY').val());
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RTtnQkFDVCxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDaEMsQ0FBQztZQUNELFFBQVEsRUFBRTtnQkFDRixDQUFDLENBQUMsSUFBSSxDQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUNoQyxDQUFDO1NBQ0Y7S0FDRixDQUFDO0FBQ0osQ0FBQztBQUVNLFNBQVMsU0FBUztJQUN2QixNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FDckIsS0FBSyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUMxRDtBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvR2FtZS50cyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvTW9uVG91ci5qcyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvVXRpbHMuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL1dpbm5lck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL0NoZWNrSWZXaW5uZXIuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL1JvYm90TWFuYWdlci5qcyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvSmV0b24uanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL1Rlc3RzVW5pdHMuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9nYW1lX21hbmFnZXIuaW5jLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vblRvdXIgfSBmcm9tIFwiLi9Nb25Ub3VyXCJcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBXaW5uZXJNYW5hZ2VyIH0gZnJvbSBcIi4vV2lubmVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBSb2JvdE1hbmFnZXIgfSBmcm9tIFwiLi9Sb2JvdE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSmV0b24gfSBmcm9tIFwiLi9KZXRvblwiO1xyXG5pbXBvcnQgKiBhcyBJbnRlcmZhY2UgZnJvbSBcIi4vSW50ZXJmYWNlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWUge1xyXG5cclxuICBwcml2YXRlIHRhaWxsZUhvcml6b250YWxlRHVKZXU6IG51bWJlcjtcclxuICBwcml2YXRlIHRhaWxsZVZlcnRpY2FsZUR1SmV1OiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBsaXN0ZVBpb25zUm91Z2U6IEFycmF5PEpldG9uPjtcclxuICBwcml2YXRlIGxpc3RlUGlvbnNKYXVuZTogQXJyYXk8SmV0b24+O1xyXG4gIHB1YmxpYyBtb25Ub3VyOiBNb25Ub3VyO1xyXG4gIHByaXZhdGUgc3RhdGljIGdhbWU6IEdhbWU7XHJcblxyXG4gIHByaXZhdGUgY29uc3RydWN0b3IodGFpbGxlSG9yaXpvbnRhbGU6IG51bWJlciwgdGFpbGxlVmVydGljYWxlOiBudW1iZXIpIHtcclxuICAgIHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldSA9IHRhaWxsZUhvcml6b250YWxlO1xyXG4gICAgdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldSA9IHRhaWxsZVZlcnRpY2FsZTtcclxuICAgIHRoaXMubGlzdGVQaW9uc1JvdWdlID0gbmV3IEFycmF5KCk7XHJcbiAgICB0aGlzLmxpc3RlUGlvbnNKYXVuZSA9IG5ldyBBcnJheSgpO1xyXG4gICAgdGhpcy5tb25Ub3VyID0gbmV3IE1vblRvdXIoKVxyXG4gICAgdGhpcy5kaXNhYmxlR2FtZSgpXHJcbiAgICB0aGlzLmxvZyhcclxuICAgICAgXCJQdWlzc2FuY2UgNFwiLFxyXG4gICAgICBcIkluaXRpYWxpc2F0aW9uIGR1IGpldSBlbiBcIiArIHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldSArIFwieFwiICsgdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldVxyXG4gICAgKTtcclxuICAgIEdhbWUuZ2FtZSA9IHRoaXM7XHJcbiAgfVxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0R2FtZSgpIHtcclxuICAgIGlmIChHYW1lLmdhbWUpIHtcclxuICAgICAgcmV0dXJuIEdhbWUuZ2FtZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHRhaWxsZUhvcml6b250YWxlUGFyc2VkID0gdGhpcy5nZXRUYWlsbGVIb3Jpem9udGFsZUZyb21VcmwoKVxyXG4gICAgICBsZXQgdGFpbGxlVmVydGljYWxlUGFyc2VkID0gdGhpcy5nZXRUYWlsbGVWZXJ0aWNhbGVGcm9tVXJsKClcclxuICAgICAgcmV0dXJuIG5ldyBHYW1lKHRhaWxsZUhvcml6b250YWxlUGFyc2VkLCB0YWlsbGVWZXJ0aWNhbGVQYXJzZWQpXHJcblxyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgc3RhdGljIGdldFRhaWxsZUhvcml6b250YWxlRnJvbVVybCgpIHtcclxuICAgIGNvbnN0IHBhcmFtc1VybDogYW55ID0gVXRpbHMucGFyc2VVUkxQYXJhbXMod2luZG93LmxvY2F0aW9uLmhyZWYpXHJcbiAgICBpZiAodHlwZW9mIHBhcmFtc1VybCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGFyYW1zVXJsLnRhaWxsZUhvcml6b250YWxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IHBhcmFtc1VybC50YWlsbGVIb3Jpem9udGFsZVswXTtcclxuICAgICAgaWYgKHBhcnNlSW50KHRhaWxsZUhvcml6b250YWxlKSkge1xyXG4gICAgICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlUGFyc2VkID0gcGFyc2VJbnQodGFpbGxlSG9yaXpvbnRhbGUpXHJcbiAgICAgICAgaWYgKHRhaWxsZUhvcml6b250YWxlUGFyc2VkID49IDQgJiYgdGFpbGxlSG9yaXpvbnRhbGVQYXJzZWQgPD0gMjApIHtcclxuICAgICAgICAgIHJldHVybiB0YWlsbGVIb3Jpem9udGFsZVBhcnNlZFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gNztcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIDc7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiA3O1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgc3RhdGljIGdldFRhaWxsZVZlcnRpY2FsZUZyb21VcmwoKSB7XHJcbiAgICBjb25zdCBwYXJhbXNVcmw6IGFueSA9IFV0aWxzLnBhcnNlVVJMUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXNVcmwgIT09ICd1bmRlZmluZWQnICYmIHBhcmFtc1VybC50YWlsbGVWZXJ0aWNhbGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSA9IHBhcmFtc1VybC50YWlsbGVWZXJ0aWNhbGVbMF07XHJcbiAgICAgIGlmIChwYXJzZUludCh0YWlsbGVWZXJ0aWNhbGUpKSB7XHJcbiAgICAgICAgY29uc3QgdGFpbGxlVmVydGljYWxlUGFyc2VkID0gcGFyc2VJbnQodGFpbGxlVmVydGljYWxlKVxyXG4gICAgICAgIGlmICh0YWlsbGVWZXJ0aWNhbGVQYXJzZWQgPj0gNCAmJiB0YWlsbGVWZXJ0aWNhbGVQYXJzZWQgPD0gMjApIHtcclxuICAgICAgICAgIHJldHVybiB0YWlsbGVWZXJ0aWNhbGVQYXJzZWRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIDU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiA1O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gNTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIHNlYXJjaFBpZWNlKGNvdWxldXI6IHN0cmluZywgaW5pdENhc2U6IG51bWJlcikge1xyXG4gICAgY29uc3QgcmVkQ2lyY2xlID0gJCgnI3ByZXZpZXcgI3JlZF9jaXJjbGUnKVxyXG4gICAgY29uc3QgeWVsbG93Q2lyY2xlID0gJCgnI3ByZXZpZXcgI3llbGxvd19jaXJjbGUnKVxyXG4gICAgY29uc3QgZGVmYXVsdENpcmNsZSA9ICQoJyNwcmV2aWV3ICNiYXNpY19jaXJjbGUnKVxyXG4gICAgaWYgKGluaXRDYXNlKSB7XHJcbiAgICAgIGlmIChjb3VsZXVyID09PSAncmVkJykge1xyXG4gICAgICAgICQocmVkQ2lyY2xlKS5jaGlsZHJlbigpLmNoaWxkcmVuKCkuYXR0cignY2FzZScsIGluaXRDYXNlKVxyXG4gICAgICAgIHJldHVybiAkKHJlZENpcmNsZSkuaHRtbCgpXHJcbiAgICAgIH0gZWxzZSBpZiAoY291bGV1ciA9PT0gJ3llbGxvdycpIHtcclxuICAgICAgICAkKHllbGxvd0NpcmNsZSkuY2hpbGRyZW4oKS5jaGlsZHJlbigpLmF0dHIoJ2Nhc2UnLCBpbml0Q2FzZSlcclxuICAgICAgICByZXR1cm4gJCh5ZWxsb3dDaXJjbGUpLmh0bWwoKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoZGVmYXVsdENpcmNsZSkuY2hpbGRyZW4oKS5jaGlsZHJlbigpLmF0dHIoJ2Nhc2UnLCBpbml0Q2FzZSlcclxuICAgICAgICByZXR1cm4gJChkZWZhdWx0Q2lyY2xlKS5odG1sKClcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNvdWxldXIgPT09ICdyZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuICQocmVkQ2lyY2xlKS5odG1sKClcclxuICAgICAgfSBlbHNlIGlmIChjb3VsZXVyID09PSAneWVsbG93Jykge1xyXG4gICAgICAgIHJldHVybiAkKHllbGxvd0NpcmNsZSkuaHRtbCgpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuICQoZGVmYXVsdENpcmNsZSkuaHRtbCgpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGU6IG51bWJlciwgaW5kZXhWZXJ0aWNhbGU6IG51bWJlcikge1xyXG4gICAgY29uc3QgbGlzdGVQaW9uc1JvdWdlID0gdGhpcy5nZXRQaW9ucygxKVxyXG4gICAgY29uc3QgbGlzdGVQaW9uc0phdW5lID0gdGhpcy5nZXRQaW9ucygyKVxyXG5cclxuICAgIGlmIChVdGlscy5hcnJheTJEQ29udGFpbnNBcnJheShsaXN0ZVBpb25zUm91Z2UsIFtpbmRleEhvcml6b250YWxlLCBpbmRleFZlcnRpY2FsZV0pKSB7XHJcbiAgICAgIHJldHVybiAncmVkJztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKFV0aWxzLmFycmF5MkRDb250YWluc0FycmF5KGxpc3RlUGlvbnNKYXVuZSwgW2luZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlXSkpIHtcclxuICAgICAgcmV0dXJuICd5ZWxsb3cnO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGNsZWFyR2FtZSgpIHtcclxuICAgICQoJy5yb3cnKS5yZW1vdmUoKVxyXG4gIH1cclxuICBwdWJsaWMgcmVzZXRHYW1lKCkge1xyXG4gICAgdGhpcy5jbGVhckdhbWUoKVxyXG4gICAgdGhpcy5jbGVhclBpb25zKClcclxuICAgIHRoaXMuY3JlYXRlQmFja2dyb3VuZCgpXHJcbiAgICB0aGlzLmRpc2FibGVHYW1lKClcclxuICB9XHJcbiAgcHVibGljIHBsYXlHYW1lKCkge1xyXG4gICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCcuLi9wdWJsaWMvYXVkaW8vc3RhcnRHYW1lLm1wNCcpO1xyXG4gICAgYXVkaW8ucGxheSgpO1xyXG4gICAgYXVkaW8gPSBudWxsO1xyXG4gICAgdGhpcy5yZXNldEdhbWUoKVxyXG4gICAgdGhpcy5zZXRNZXNzYWdlKFwiQSB0b2kgZGUgam91ZXIgIVwiKVxyXG4gICAgdGhpcy5lbmFibGVHYW1lKClcclxuICB9XHJcbiAgcHVibGljIHNlbGVjdChpbmRleEhvcml6b250YWxlOiBudW1iZXIpIHtcclxuICAgIGxldCBpbmRleFZlcnRpY2FsZSA9IHRoaXMuZ2V0VGFpbGxlVmVydGljYWxlKCk7XHJcbiAgICB3aGlsZSAoaW5kZXhWZXJ0aWNhbGUgPiAwKSB7XHJcbiAgICAgIGxldCB0ZWFtQ29sb3IgPSB0aGlzLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlKVxyXG4gICAgICBpZiAoIXRlYW1Db2xvcikge1xyXG4gICAgICAgIGxldCBjb3VsZXVyID0gJChcIiNnYW1lIC5yb3dcIikuZXEoKGluZGV4VmVydGljYWxlIC0gMSkpLmZpbmQoXCIuaWNvblwiKS5lcShpbmRleEhvcml6b250YWxlIC0gMSlcclxuICAgICAgICBjb3VsZXVyLmF0dHIoXCJzdXJicmlsbGFuY2VcIiwgXCJyZWRcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGluZGV4VmVydGljYWxlLS07XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpIHtcclxuICAgIGxldCBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzID0gW107XHJcbiAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gMTsgaW5kZXhIb3Jpem9udGFsZSA8PSB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXU7IGluZGV4SG9yaXpvbnRhbGUrKykge1xyXG4gICAgICBpZiAoIXRoaXMuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZSwgMSkpIHtcclxuICAgICAgICBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzLnB1c2goaW5kZXhIb3Jpem9udGFsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzO1xyXG4gIH1cclxuICBwdWJsaWMgaXNEcmF3KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGlzdGVQaW9uc0phdW5lLmxlbmd0aCArIHRoaXMubGlzdGVQaW9uc1JvdWdlLmxlbmd0aCA+PSB0aGlzLmdldFRhaWxsZUhvcml6b250YWxlKCkgKiB0aGlzLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRUYWlsbGVIb3Jpem9udGFsZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXU7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRUYWlsbGVWZXJ0aWNhbGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldTtcclxuICB9XHJcbiAgcHVibGljIGdldExlc0Nhc2VzUG91dmFudEV0cmVKb3VlcigpIHtcclxuICAgIGxldCBsaXN0ZURlc0Nhc2VzUG91dmFudEV0cmVKb3VlcjogQXJyYXk8QXJyYXk8TnVtYmVyPj4gPSBbXTtcclxuICAgIGxldCBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzID0gdGhpcy5nZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpO1xyXG4gICAgbGV0IGFUcm91dmVyTGVQaW9uO1xyXG4gICAgbGlzdGVDb2xvbm5lc05vbkNvbXBsZXRlcy5mb3JFYWNoKG51bWVyb0NvbG9ubmVIb3Jpem9udGFsZSA9PiB7XHJcbiAgICAgIGxldCBudW1lcm9Db2xvbm5lVmVydGljYWxlID0gdGhpcy5nZXRUYWlsbGVWZXJ0aWNhbGUoKTtcclxuICAgICAgYVRyb3V2ZXJMZVBpb24gPSBmYWxzZTtcclxuICAgICAgd2hpbGUgKG51bWVyb0NvbG9ubmVWZXJ0aWNhbGUgPiAwICYmICFhVHJvdXZlckxlUGlvbikge1xyXG4gICAgICAgIGlmICghVXRpbHMuYXJyYXkyRENvbnRhaW5zQXJyYXkodGhpcy5nZXRQaW9ucygxKSwgW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pXHJcbiAgICAgICAgICAmJiAhVXRpbHMuYXJyYXkyRENvbnRhaW5zQXJyYXkodGhpcy5nZXRQaW9ucygyKSwgW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc0Nhc2VzUG91dmFudEV0cmVKb3Vlci5wdXNoKFtudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGVdKVxyXG4gICAgICAgICAgYVRyb3V2ZXJMZVBpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbnVtZXJvQ29sb25uZVZlcnRpY2FsZS0tO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBsaXN0ZURlc0Nhc2VzUG91dmFudEV0cmVKb3VlcjtcclxuICB9XHJcbiAgcHVibGljIGV4cG9ydCgpIHtcclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJBZmZpY2hhZ2UgZGUgbCdleHBvcnQuLi5cIik7XHJcbiAgICBsZXQgcGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IEpldG9uW10gfSA9IHt9O1xyXG4gICAgcGFyYW1zWydyZWQnXSA9IHRoaXMuZ2V0UGlvbnMoJ3JlZCcpXHJcbiAgICBwYXJhbXNbJ3llbGxvdyddID0gdGhpcy5nZXRQaW9ucygneWVsbG93JylcclxuICAgIGNvbnN0IHJlZCA9IHBhcmFtc1sncmVkJ107XHJcbiAgICBjb25zdCB5ZWxsb3cgPSBwYXJhbXNbJ3llbGxvdyddO1xyXG4gICAgY29uc3QgcmVxdWVzdCA9ICQuYWpheCh7XHJcbiAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgdXJsOiBcImFwaS9leHBvcnQ/eD1cIiArIHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldSArIFwiJnk9XCIgKyB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1LFxyXG4gICAgICBkYXRhOiB7IHJlZDogcmVkLCB5ZWxsb3c6IHllbGxvdyB9LFxyXG4gICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgIHRpbWVvdXQ6IDEyMDAwMFxyXG4gICAgfSlcclxuICAgIHJlcXVlc3QuZG9uZShmdW5jdGlvbiAob3V0cHV0X3N1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2cob3V0cHV0X3N1Y2Nlc3MpXHJcbiAgICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJMJ2V4cG9ydCBzJ2VzdCBjb3JyZWN0ZW1lbnQgdGVybWluw6lcIik7XHJcbiAgICB9KVxyXG4gICAgcmVxdWVzdC5mYWlsKGZ1bmN0aW9uIChodHRwX2Vycm9yKSB7XHJcbiAgICAgIGxldCBzZXJ2ZXJfbXNnID0gaHR0cF9lcnJvci5yZXNwb25zZVRleHQ7XHJcbiAgICAgIGxldCBjb2RlID0gaHR0cF9lcnJvci5zdGF0dXM7XHJcbiAgICAgIGxldCBjb2RlX2xhYmVsID0gaHR0cF9lcnJvci5zdGF0dXNUZXh0O1xyXG4gICAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiRWNoZWMgbG9ycyBkZSBsJ2V4cG9ydCAoXCIgKyBjb2RlICsgXCIpXCIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHB1YmxpYyB1blNlbGVjdCgpIHtcclxuICAgICQoXCIucm93IC5pY29uXCIpLmF0dHIoXCJzdXJicmlsbGFuY2VcIiwgXCJcIik7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXRNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgJChcIiNnYW1lIHAjdG91clwiKS50ZXh0KG1lc3NhZ2UpO1xyXG4gIH1cclxuICBwdWJsaWMgaW1wb3J0KGdhbWVPYmplY3Q6IEludGVyZmFjZS5HYW1lT2JqZWN0LCBwYXJhbWV0ZXJzOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJEw6lidXQgZGUgbCdpbXBvcnQgLi4uXCIpO1xyXG4gICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkluaXRpYWxpc2F0aW9uIGRlcyBwYXJhbcOodHJlcyAuLi5cIik7XHJcbiAgICB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXUgPSBwYXJzZUludChnYW1lT2JqZWN0LnBhcmFtZXRyZXMueClcclxuICAgIHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXUgPSBwYXJzZUludChnYW1lT2JqZWN0LnBhcmFtZXRyZXMueSlcclxuICAgIHRoaXMucmVzZXRHYW1lKClcclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJJbXBvcnQgZGVzIHBpb25zIC4uLlwiKTtcclxuICAgIGdhbWVPYmplY3QuZGF0YXMucGlvbnMucmVkLmZvckVhY2gocGlvblJvdWdlID0+IHtcclxuICAgICAgdGhpcy5mb3JjZUFkZFBpb24ocGlvblJvdWdlWzBdLCBwaW9uUm91Z2VbMV0sICdyZWQnKVxyXG4gICAgfSk7XHJcbiAgICBnYW1lT2JqZWN0LmRhdGFzLnBpb25zLnllbGxvdy5mb3JFYWNoKHBpb25ZZWxsb3cgPT4ge1xyXG4gICAgICB0aGlzLmZvcmNlQWRkUGlvbihwaW9uWWVsbG93WzBdLCBwaW9uWWVsbG93WzFdLCAneWVsbG93JylcclxuICAgIH0pO1xyXG4gICAgaWYgKHBhcmFtZXRlcnMpIHtcclxuICAgICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIlbDqXJpZmljYXRpb24gZCd1biBwb3RlbnRpZWwgZ2FnbmFudCAuLi5cIik7XHJcbiAgICAgIGxldCBnYWduYW50Um91Z2UgPSBXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMsIFwicmVkXCIpO1xyXG4gICAgICBsZXQgZ2FnbmFudEphdW5lID0gV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLCBcInllbGxvd1wiKTtcclxuICAgICAgaWYgKGdhZ25hbnRSb3VnZSkge1xyXG4gICAgICAgIHRoaXMuc2V0V2lubmVyKCdyZWQnLCBnYWduYW50Um91Z2UpO1xyXG4gICAgICAgIHRoaXMudW5TZWxlY3QoKTtcclxuICAgICAgfSBlbHNlIGlmIChnYWduYW50SmF1bmUpIHtcclxuICAgICAgICB0aGlzLnNldFdpbm5lcigneWVsbG93JywgZ2FnbmFudEphdW5lKTtcclxuICAgICAgICB0aGlzLm1vblRvdXIuc2V0KGZhbHNlKTtcclxuICAgICAgICB0aGlzLnVuU2VsZWN0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJGaW4gZGUgbCdpbXBvcnRcIik7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXRXaW5uZXIoY291bGV1cjogc3RyaW5nLCBwaW9uc0dhZ25hbnRzOiBudW1iZXJbXVtdID0gbnVsbCkge1xyXG4gICAgdGhpcy5kaXNhYmxlR2FtZSgpXHJcbiAgICBpZiAocGlvbnNHYWduYW50cykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBpb25zR2FnbmFudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgaW5kZXhWZXJ0aWNhbGUgPSBwaW9uc0dhZ25hbnRzW2ldWzBdXHJcbiAgICAgICAgbGV0IGluZGV4SG9yaXpvbnRhbGUgPSBwaW9uc0dhZ25hbnRzW2ldWzFdXHJcbiAgICAgICAgbGV0IHN1cmJyaWxsYW5jZVJlY2hlcmNoZSA9ICQoXCIjZ2FtZSAucm93XCIpLmVxKChpbmRleFZlcnRpY2FsZSAtIDEpKS5maW5kKFwiLmljb25cIikuZXEoKGluZGV4SG9yaXpvbnRhbGUgLSAxKSlcclxuICAgICAgICAkKHN1cmJyaWxsYW5jZVJlY2hlcmNoZSkuY3NzKFwib3BhY2l0eVwiLCAxKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoY291bGV1ciA9PSAncmVkJykge1xyXG4gICAgICB0aGlzLnNldE1lc3NhZ2UoXCJMZXMgcm91Z2VzIG9udCBnYWduw6lzXCIpO1xyXG4gICAgfSBlbHNlIGlmIChjb3VsZXVyID09ICd5ZWxsb3cnKSB7XHJcbiAgICAgIHRoaXMuc2V0TWVzc2FnZShcIkxlcyBqYXVuZXMgb250IGdhZ27DqXNcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNldE1lc3NhZ2UoXCJNYXRjaCBudWwgIVwiKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGxvZyhwcmVmaXg6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBjb2xvclRleHQ6IHN0cmluZyA9ICdmYWxzZScpIHtcclxuICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICBcIiVjW1wiICsgcHJlZml4ICsgXCJdICVjXCIgKyBtZXNzYWdlLFxyXG4gICAgICBcImNvbG9yOiBwdXJwbGU7IGZvbnQtc2l6ZTogMTNweDsgZm9udC13ZWlnaHQ6IGJvbGQ7XCIsXHJcbiAgICAgIFwiZm9udC1zaXplOiAxM3B4OyBjb2xvcjogXCIgKyBjb2xvclRleHRcclxuICAgICk7XHJcbiAgfVxyXG4gIHB1YmxpYyBkaXNhYmxlR2FtZSgpIHtcclxuICAgICQoXCIjZ2FtZSAuaWNvblwiKS5jc3MoXCJvcGFjaXR5XCIsIDAuMylcclxuICAgIHRoaXMubW9uVG91ci5zZXQoZmFsc2UpXHJcbiAgfVxyXG4gIHB1YmxpYyBlbmFibGVHYW1lKCkge1xyXG4gICAgJChcIiNnYW1lIC5pY29uXCIpLmNzcyhcIm9wYWNpdHlcIiwgMSlcclxuICAgIHRoaXMubW9uVG91ci5zZXQodHJ1ZSlcclxuICB9XHJcbiAgcHVibGljIGNyZWF0ZUJhY2tncm91bmQoKSB7XHJcbiAgICBsZXQgUHggPSB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXU7XHJcbiAgICBsZXQgUHkgPSB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1O1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldTsgaSsrKSB7XHJcbiAgICAgIGxldCByb3dZID0gJzxkaXYgY2xhc3M9XCJyb3dcIiB2YWw9XCInICsgaSArICdcIj48L2Rpdj4nO1xyXG4gICAgICAkKFwiI2dhbWVcIikuYXBwZW5kKHJvd1kpO1xyXG4gICAgICBmb3IgKGxldCBqID0gMTsgaiA8PSB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXU7IGorKykge1xyXG4gICAgICAgICQoJy5yb3dbdmFsPVwiJyArIGkgKyAnXCJdJykuYXBwZW5kKHRoaXMuc2VhcmNoUGllY2UobnVsbCwgaikpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBmb3JjZUFkZFBpb24ocG9zaXRpb25Ib3Jpem9udGFsZTogbnVtYmVyLCBwb3NpdGlvblZlcnRpY2FsZTogbnVtYmVyLCBjb3VsZXVyOiBzdHJpbmcpIHtcclxuICAgICQoXCIucm93W3ZhbD0nXCIgKyBwb3NpdGlvblZlcnRpY2FsZSArIFwiJ10gLmljb25bY2FzZT0nXCIgKyBwb3NpdGlvbkhvcml6b250YWxlICsgXCInXVwiKS5yZXBsYWNlV2l0aCh0aGlzLnNlYXJjaFBpZWNlKGNvdWxldXIsIHBvc2l0aW9uSG9yaXpvbnRhbGUpKTtcclxuICAgICQoXCIucm93W3ZhbD0nXCIgKyBwb3NpdGlvblZlcnRpY2FsZSArIFwiJ10gLmljb25bY2FzZT0nXCIgKyBwb3NpdGlvbkhvcml6b250YWxlICsgXCInXVwiKS5hdHRyKFwidGVhbVwiLCBjb3VsZXVyKTtcclxuICAgIGlmIChjb3VsZXVyID09ICd5ZWxsb3cnKSB7XHJcbiAgICAgIHRoaXMuc2V0UGlvbigyLCBuZXcgSmV0b24ocG9zaXRpb25Ib3Jpem9udGFsZSwgcG9zaXRpb25WZXJ0aWNhbGUpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2V0UGlvbigxLCBuZXcgSmV0b24ocG9zaXRpb25Ib3Jpem9udGFsZSwgcG9zaXRpb25WZXJ0aWNhbGUpKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGdldFBvc2l0aW9uSG9yaXpvbnRhbGUoZXZlbnQ6IHN0cmluZ3xKUXVlcnk8YW55Pikge1xyXG4gICAgcmV0dXJuICQoZXZlbnQpLnBhcmVudCgpLmluZGV4KCkgKyAxO1xyXG4gIH1cclxuICBwdWJsaWMgYWRkUGlvbihpbmRleEhvcml6b250YWxlQ2xpY2tlZDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgPSB0aGlzLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgICBsZXQgcGxhY2VJc05vdFRha2VuID0gdHJ1ZTtcclxuICAgIGxldCBpbmRleFZlcnRpY2FsZSA9IHRhaWxsZVZlcnRpY2FsZTtcclxuICAgIGlmICh0aGlzLm1vblRvdXIuZ2V0KCkpIHtcclxuICAgICAgd2hpbGUgKGluZGV4VmVydGljYWxlID4gMCAmJiBwbGFjZUlzTm90VGFrZW4pIHtcclxuICAgICAgICBsZXQgY291bGV1ckR1UGlvbiA9IHRoaXMuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQsIGluZGV4VmVydGljYWxlKTtcclxuICAgICAgICBpZiAoIWNvdWxldXJEdVBpb24pIHtcclxuICAgICAgICAgIHBsYWNlSXNOb3RUYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5tb25Ub3VyLnNldChmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLnVuU2VsZWN0KCk7XHJcbiAgICAgICAgICB0aGlzLmZvcmNlQWRkUGlvbihpbmRleEhvcml6b250YWxlQ2xpY2tlZCwgaW5kZXhWZXJ0aWNhbGUsIFwicmVkXCIpXHJcbiAgICAgICAgICBsZXQgbGVzUGlvbnNHYWduYW50cyA9IFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcywgXCJyZWRcIik7XHJcbiAgICAgICAgICBpZiAobGVzUGlvbnNHYWduYW50cykge1xyXG4gICAgICAgICAgICB0aGlzLnNldFdpbm5lcigncmVkJywgbGVzUGlvbnNHYWduYW50cyk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNEcmF3KCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRXaW5uZXIobnVsbCwgbnVsbClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KGluZGV4SG9yaXpvbnRhbGVDbGlja2VkKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRNZXNzYWdlKFwiQXUgdG91ciBkZSBsJ2FkdmVyc2FpcmUhXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBnYW1lID0gdGhpcztcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgYXVkaW8gPSBuZXcgQXVkaW8oJy4uLy4uL3B1YmxpYy9hdWRpby9wb3AubXA0Jyk7XHJcbiAgICAgICAgICAgICAgYXVkaW8ucGxheSgpO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHJvYm90TWFuYWdlciA9IFJvYm90TWFuYWdlci5nZXRSb2JvdE1hbmFnZXIoZ2FtZSlcclxuICAgICAgICAgICAgICBpZiAocm9ib3RNYW5hZ2VyLnJvYm90UGxhY2VVblBpb24oXCJ5ZWxsb3dcIikpIHtcclxuICAgICAgICAgICAgICAgIGdhbWUuc2V0TWVzc2FnZShcIlR1IGFzIHBlcmR1IGxhIHBhcnRpZSAhXCIpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIlBlcmR1ICFcIik7XHJcbiAgICAgICAgICAgICAgICBnYW1lLm1vblRvdXIuc2V0KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGdhbWUudW5TZWxlY3QoKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQsIGluZGV4VmVydGljYWxlICsgMSkpIHtcclxuICAgICAgICAgICAgICAgICAgLy8gU2kgbGUgcm9ib3QgYSBqb3XDqSBzdXIgbGEgbcOqbWUgY29sb25uZSwgb24gYWN0dWFsaXNlIGxhIHPDqWxlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgZ2FtZS5zZWxlY3QoaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ2FtZS5tb25Ub3VyLnNldCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGdhbWUuc2V0TWVzc2FnZShcIkEgdG9uIHRvdXIgIVwiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kZXhWZXJ0aWNhbGUtLTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmxvZyhcclxuICAgICAgICBcIlB1aXNzYW5jZSA0XCIsXHJcbiAgICAgICAgXCJKZXRvbiBlbiBYOlwiICsgaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQgKyBcIiBZOlwiICsgKGluZGV4VmVydGljYWxlICsgMSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIHNldFBpb24odGVhbTogc3RyaW5nfG51bWJlciwgdmFsdWU6IEpldG9uKSB7XHJcbiAgICBpZiAodGVhbSA9PSAxIHx8IHRlYW0gPT0gJ3JlZCcpIHtcclxuICAgICAgdGhpcy5saXN0ZVBpb25zUm91Z2UucHVzaCh2YWx1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKHRlYW0gPT0gMiB8fCB0ZWFtID09ICd5ZWxsb3cnKSB7XHJcbiAgICAgIHRoaXMubGlzdGVQaW9uc0phdW5lLnB1c2godmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTGUgam91ZXVyIGVzdCBpbnRyb3V2YWJsZVwiKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIHJlbW92ZVBpb24odGVhbTogc3RyaW5nfG51bWJlciwgdmFsdWU6IEpldG9uKSB7XHJcbiAgICBsZXQgaW5kZXg7XHJcbiAgICBpZiAodGVhbSA9PSAxIHx8IHRlYW0gPT0gJ3JlZCcpIHtcclxuICAgICAgaW5kZXggPSBVdGlscy5nZXRJbmRleE9mMkRBcnJheSh0aGlzLmxpc3RlUGlvbnNSb3VnZSwgdmFsdWUpXHJcbiAgICAgIHRoaXMubGlzdGVQaW9uc1JvdWdlLnNwbGljZShpbmRleCwgMSlcclxuICAgIH0gZWxzZSBpZiAodGVhbSA9PSAyIHx8IHRlYW0gPT0gJ3llbGxvdycpIHtcclxuICAgICAgaW5kZXggPSBVdGlscy5nZXRJbmRleE9mMkRBcnJheSh0aGlzLmxpc3RlUGlvbnNKYXVuZSwgdmFsdWUpXHJcbiAgICAgIHRoaXMubGlzdGVQaW9uc0phdW5lLnNwbGljZShpbmRleCwgMSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IFwiTGUgam91ZXVyIGVzdCBpbnRyb3V2YWJsZVwiO1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgY2xlYXJQaW9ucygpIHtcclxuICAgIHRoaXMubGlzdGVQaW9uc1JvdWdlID0gW107XHJcbiAgICB0aGlzLmxpc3RlUGlvbnNKYXVuZSA9IFtdO1xyXG4gICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkxlcyBkb25uw6llcyBkZXMgcGlvbnMgb250IMOpdMOpIGVmZmFjw6lzXCIpO1xyXG4gIH1cclxuICBwdWJsaWMgZ2V0UGlvbnModGVhbTogc3RyaW5nfG51bWJlcikge1xyXG4gICAgaWYgKHRlYW0gPT0gMSB8fCB0ZWFtID09ICdyZWQnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlUGlvbnNSb3VnZTtcclxuICAgIH0gZWxzZSBpZiAodGVhbSA9PSAyIHx8IHRlYW0gPT0gJ3llbGxvdycpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVQaW9uc0phdW5lO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgXCJMZSBqb3VldXIgZXN0IGludHJvdXZhYmxlXCI7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIE1vblRvdXIge1xyXG4gIHNldChtb25Ub3VyKSB7XHJcbiAgICB0aGlzLm1vblRvdXIgPSBtb25Ub3VyXHJcbiAgfVxyXG4gIGdldCgpIHtcclxuICAgIHJldHVybiB0aGlzLm1vblRvdXJcclxuICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgVXRpbHMge1xyXG4gIHN0YXRpYyBnZXRFbnRpZXJBbGVhdG9pcmUobWluLCBtYXgpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbik7XHJcbiAgfVxyXG4gIFxyXG4gIHN0YXRpYyBnZXRFbGVtZW50QWxlYXRvaXJlKGxpc3RlKSB7XHJcbiAgICBsZXQgbG9uZ3VldXJMaXN0ZSA9IGxpc3RlLmxlbmd0aDtcclxuICAgIGxldCBlbnRpZXJBbGVhdG9pcmVJbmRleGVQYXJMaXN0ZSA9IFV0aWxzLmdldEVudGllckFsZWF0b2lyZSgwLCBsb25ndWV1ckxpc3RlKTtcclxuICAgIHJldHVybiBsaXN0ZVtlbnRpZXJBbGVhdG9pcmVJbmRleGVQYXJMaXN0ZV07XHJcbiAgfVxyXG4gIFxyXG4gIHN0YXRpYyBhcnJheTJEQ29udGFpbnNBcnJheShhcnJheTJELCBhcnJheVNlYXJjaCkge1xyXG4gICAgbGV0IGl0ZW1TdHJpbmcgPSBKU09OLnN0cmluZ2lmeShhcnJheVNlYXJjaCk7XHJcbiAgICBsZXQgY29udGFpbnMgPSBhcnJheTJELnNvbWUoZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZWxlbWVudCkgPT09IGl0ZW1TdHJpbmc7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBjb250YWlucztcclxuICB9XHJcbiAgXHJcbiAgc3RhdGljIGdldEluZGV4T2YyREFycmF5KGFycmF5MkQsIGluZGV4KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5MkQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIGN1cnJlbnRBcnJheSA9IGFycmF5MkRbaV07XHJcbiAgICAgIGlmIChjdXJyZW50QXJyYXlbMF0gPT0gaW5kZXhbMF0gJiYgY3VycmVudEFycmF5WzFdID09IGluZGV4WzFdKSB7XHJcbiAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRDb3VsZXVyRXF1aXBlQWxlYXRvaXJlKCkge1xyXG4gICAgbGV0IGxpc3RlRGVDb3VsZXVycyA9IFtcInllbGxvd1wiLCBcInJlZFwiXTtcclxuICAgIGxldCBub21icmVBbGVhdG9pcmUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsaXN0ZURlQ291bGV1cnMubGVuZ3RoKTtcclxuICAgIHJldHVybiBsaXN0ZURlQ291bGV1cnNbbm9tYnJlQWxlYXRvaXJlXTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRDb3VsZXVyRXF1aXBlQWR2ZXJzZShjb3VsZXVyRXF1aXBlQWN0dWVsbGUpIHtcclxuICAgIGlmIChjb3VsZXVyRXF1aXBlQWN0dWVsbGUgPT0gJ3JlZCcpIHtcclxuICAgICAgcmV0dXJuICd5ZWxsb3cnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICdyZWQnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBhcnNlVVJMUGFyYW1zKHVybCkge1xyXG4gICAgdmFyIHF1ZXJ5U3RhcnQgPSB1cmwuaW5kZXhPZihcIj9cIikgKyAxLFxyXG4gICAgICAgIHF1ZXJ5RW5kICAgPSB1cmwuaW5kZXhPZihcIiNcIikgKyAxIHx8IHVybC5sZW5ndGggKyAxLFxyXG4gICAgICAgIHF1ZXJ5ID0gdXJsLnNsaWNlKHF1ZXJ5U3RhcnQsIHF1ZXJ5RW5kIC0gMSksXHJcbiAgICAgICAgcGFpcnMgPSBxdWVyeS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpLnNwbGl0KFwiJlwiKSxcclxuICAgICAgICBwYXJtcyA9IHt9LCBpLCBuLCB2LCBudjtcclxuXHJcbiAgICBpZiAocXVlcnkgPT09IHVybCB8fCBxdWVyeSA9PT0gXCJcIikgcmV0dXJuO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG52ID0gcGFpcnNbaV0uc3BsaXQoXCI9XCIsIDIpO1xyXG4gICAgICAgIG4gPSBkZWNvZGVVUklDb21wb25lbnQobnZbMF0pO1xyXG4gICAgICAgIHYgPSBkZWNvZGVVUklDb21wb25lbnQobnZbMV0pO1xyXG5cclxuICAgICAgICBpZiAoIXBhcm1zLmhhc093blByb3BlcnR5KG4pKSBwYXJtc1tuXSA9IFtdO1xyXG4gICAgICAgIHBhcm1zW25dLnB1c2gobnYubGVuZ3RoID09PSAyID8gdiA6IG51bGwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcm1zO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDaGVja0lmV2lubmVyIH0gZnJvbSBcIi4vQ2hlY2tJZldpbm5lclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdpbm5lck1hbmFnZXIge1xyXG4gIHN0YXRpYyB2ZXJpZldpbihnYW1lLCBjb2xvcikge1xyXG4gICAgbGV0IHZlcmlmaWNhdGlvbiA9IENoZWNrSWZXaW5uZXIuaG9yaXpvbnRhbChnYW1lLCBjb2xvcik7XHJcbiAgICBpZiAodmVyaWZpY2F0aW9uKSB7XHJcbiAgICAgIHJldHVybiB2ZXJpZmljYXRpb247XHJcbiAgICB9XHJcbiAgICB2ZXJpZmljYXRpb24gPSBDaGVja0lmV2lubmVyLnZlcnRpY2FsKGdhbWUsIGNvbG9yKTtcclxuICAgIGlmICh2ZXJpZmljYXRpb24pIHtcclxuICAgICAgcmV0dXJuIHZlcmlmaWNhdGlvbjtcclxuICAgIH1cclxuICAgIHZlcmlmaWNhdGlvbiA9IENoZWNrSWZXaW5uZXIuZGlhZ29uYWxUb3BMZWZ0KGdhbWUsIGNvbG9yKTtcclxuICAgIGlmICh2ZXJpZmljYXRpb24pIHtcclxuICAgICAgcmV0dXJuIHZlcmlmaWNhdGlvbjtcclxuICAgIH1cclxuICAgIHZlcmlmaWNhdGlvbiA9IENoZWNrSWZXaW5uZXIuZGlhZ29uYWxUb3BSaWdodChnYW1lLCBjb2xvcik7XHJcbiAgICBpZiAodmVyaWZpY2F0aW9uKSB7XHJcbiAgICAgIHJldHVybiB2ZXJpZmljYXRpb247XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgdmVyaWZJZlBpb25QbGFjZWRHaXZlV2luKGdhbWUsIG51bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZSwgY291bGV1clBpb24pIHtcclxuICAgIGdhbWUuc2V0UGlvbihjb3VsZXVyUGlvbiwgW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pXHJcbiAgICBjb25zdCBpc1dpbm5lciA9IFdpbm5lck1hbmFnZXIudmVyaWZXaW4oZ2FtZSwgY291bGV1clBpb24pXHJcbiAgICBnYW1lLnJlbW92ZVBpb24oY291bGV1clBpb24sIFtudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGVdKVxyXG4gICAgcmV0dXJuIGlzV2lubmVyO1xyXG4gIH1cclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgQ2hlY2tJZldpbm5lciB7XHJcbiAgc3RhdGljIGhvcml6b250YWwoZ2FtZSwgY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgY29uc3QgdGFpbGxlVmVydGljYWxlICAgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKVxyXG4gICAgLy8gVsOpcmlmaWNhdGlvbiBlbiBob3Jpem9udGFsXHJcbiAgICBsZXQgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICBsZXQgY291bGV1ckR1UGlvbjtcclxuICAgIGxldCBuYlBpb25zR2FnbmFudHM7XHJcbiAgICBmb3IgKGxldCBpbmRleFZlcnRpY2FsZSA9IDE7IGluZGV4VmVydGljYWxlIDw9IHRhaWxsZVZlcnRpY2FsZTsgaW5kZXhWZXJ0aWNhbGUrKykge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgZm9yIChsZXQgaW5kZXhIb3Jpem9udGFsZSA9IDE7IGluZGV4SG9yaXpvbnRhbGUgPD0gdGFpbGxlSG9yaXpvbnRhbGU7IGluZGV4SG9yaXpvbnRhbGUrKykge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cysrO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzLnB1c2goW2luZGV4VmVydGljYWxlLCBpbmRleEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHN0YXRpYyB2ZXJ0aWNhbCAoZ2FtZSwgY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgY29uc3QgdGFpbGxlVmVydGljYWxlICAgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKVxyXG4gICAgLy8gUGFyY291cnMgZGUgY2hhcXVlIGNhc2UgaG9yaXpvbnRhbGUgZHUgamV1XHJcbiAgICBsZXQgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICBsZXQgY291bGV1ckR1UGlvbjtcclxuICAgIGxldCBuYlBpb25zR2FnbmFudHM7XHJcbiAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gMTsgaW5kZXhIb3Jpem9udGFsZSA8PSB0YWlsbGVIb3Jpem9udGFsZTsgaW5kZXhIb3Jpem9udGFsZSsrKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAvLyBQYXJjb3VycyBjaGFxdWUgY2FzZSB2ZXJ0aWNhbGUgZGUgbGEgY29sb25uZVxyXG4gICAgICBmb3IgKGxldCBpbmRleFZlcnRpY2FsZSA9IDE7IGluZGV4VmVydGljYWxlIDw9IHRhaWxsZVZlcnRpY2FsZTsgaW5kZXhWZXJ0aWNhbGUrKykge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleFZlcnRpY2FsZSwgaW5kZXhIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZGlhZ29uYWxUb3BMZWZ0IChnYW1lLCBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgICA9IGdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcblxyXG4gICAgbGV0IGNvdWxldXJEdVBpb24sIG5iUGlvbnNHYWduYW50cztcclxuICAgIGxldCBpbmRleENvdXJhbnRIb3Jpem9udGFsZTtcclxuICAgIGxldCBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgIGxldCBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPSA0O1xyXG5cclxuICAgIC8vIFBhcmNvdXJzIHRvdXRlcyBsZXMgZGlhZ29uYWxlcyDDoCBnYXVjaGVzIMOgIHBhcnRpciBkZSA0LlxyXG4gICAgZm9yIChsZXQgaW5kZXhWZXJ0aWNhbGUgPSA0OyBpbmRleFZlcnRpY2FsZSA8PSB0YWlsbGVWZXJ0aWNhbGU7IGluZGV4VmVydGljYWxlKyspIHtcclxuICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlID0gMTtcclxuICAgICAgXHJcbiAgICAgIC8vIFbDqXJpZmllciBsYSBsaWduZSBlbiBkaWFnb25hbGVcclxuICAgICAgd2hpbGUgKGluZGV4Q291cmFudEhvcml6b250YWxlIDw9IHRhaWxsZUhvcml6b250YWxlICYmIGluZGV4Q291cmFudFZlcnRpY2FsZSA+PSAxKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUsIGluZGV4Q291cmFudFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhDb3VyYW50VmVydGljYWxlLCBpbmRleENvdXJhbnRIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUtLTtcclxuICAgICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSsrO1xyXG4gICAgICB9XHJcbiAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZSA9IGluZGV4VmVydGljYWxlICsgMTtcclxuICAgIH1cclxuXHJcbiAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gMjsgaW5kZXhIb3Jpem9udGFsZSA8PSAodGFpbGxlSG9yaXpvbnRhbGUtNCk7IGluZGV4SG9yaXpvbnRhbGUrKykge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPSBpbmRleEhvcml6b250YWxlO1xyXG4gICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPSB0YWlsbGVWZXJ0aWNhbGU7XHJcbiAgICAgIC8vIFbDqXJpZmllciBsYSBsaWduZSBlbiBkaWFnb25hbGVcclxuICAgICAgd2hpbGUgKGluZGV4Q291cmFudEhvcml6b250YWxlIDw9IHRhaWxsZUhvcml6b250YWxlICYmIGluZGV4Q291cmFudFZlcnRpY2FsZSA+PSAxKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUsIGluZGV4Q291cmFudFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhDb3VyYW50VmVydGljYWxlLCBpbmRleENvdXJhbnRIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUtLTtcclxuICAgICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSsrO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRpYWdvbmFsVG9wUmlnaHQoZ2FtZSwgY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgY29uc3QgdGFpbGxlVmVydGljYWxlICAgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKVxyXG5cclxuICAgIGxldCBjb3VsZXVyRHVQaW9uLCBuYlBpb25zR2FnbmFudHM7XHJcbiAgICBsZXQgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGU7XHJcbiAgICBsZXQgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcblxyXG4gICAgLy8gUGFyY291cnMgdG91dGVzIGxlcyBkaWFnb25hbGVzIMOgIGdhdWNoZXMgw6AgcGFydGlyIGRlIDQuXHJcbiAgICBmb3IgKGxldCBpbmRleFZlcnRpY2FsZSA9IDQ7IGluZGV4VmVydGljYWxlIDw9IHRhaWxsZVZlcnRpY2FsZTsgaW5kZXhWZXJ0aWNhbGUrKykge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPSB0YWlsbGVIb3Jpem9udGFsZTtcclxuICAgICAgbGV0IGluZGV4Q291cmFudFZlcnRpY2FsZSA9IGluZGV4VmVydGljYWxlO1xyXG4gICAgICAvLyBWw6lyaWZpZXIgbGEgbGlnbmUgZW4gZGlhZ29uYWxlXHJcbiAgICAgIHdoaWxlIChpbmRleENvdXJhbnRIb3Jpem9udGFsZSA+PSAxICYmIGluZGV4Q291cmFudFZlcnRpY2FsZSA+PSAxKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUsIGluZGV4Q291cmFudFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhDb3VyYW50VmVydGljYWxlLCBpbmRleENvdXJhbnRIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZS0tO1xyXG4gICAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZS0tO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaW5kZXhIb3Jpem9udGFsZSA9ICh0YWlsbGVIb3Jpem9udGFsZSAtIDEpOyBpbmRleEhvcml6b250YWxlID49IDQ7IGluZGV4SG9yaXpvbnRhbGUtLSkge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPSBpbmRleEhvcml6b250YWxlO1xyXG4gICAgICBsZXQgaW5kZXhDb3VyYW50VmVydGljYWxlID0gdGFpbGxlVmVydGljYWxlO1xyXG4gICAgICAvLyBWw6lyaWZpZXIgbGEgbGlnbmUgZW4gZGlhZ29uYWxlXHJcbiAgICAgIHdoaWxlIChpbmRleENvdXJhbnRIb3Jpem9udGFsZSA+PSAxICYmIGluZGV4Q291cmFudFZlcnRpY2FsZSA+PSAxKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUsIGluZGV4Q291cmFudFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhDb3VyYW50VmVydGljYWxlLCBpbmRleENvdXJhbnRIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUtLTtcclxuICAgICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZS0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBXaW5uZXJNYW5hZ2VyIH0gZnJvbSBcIi4vV2lubmVyTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJvYm90TWFuYWdlciB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xyXG4gICAgaWYgKGdhbWUpIHtcclxuICAgICAgdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1ID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpO1xyXG4gICAgICB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1ICAgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpO1xyXG4gICAgICB0aGlzLmdhbWUgPSBnYW1lXHJcbiAgICAgIFJvYm90TWFuYWdlci5yb2JvdE1hbmFnZXIgPSB0aGlzXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBdWN1bmUgcGFydGllIGTDqWZpbml0XCIpXHJcbiAgICB9XHJcbiAgICBcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRSb2JvdE1hbmFnZXIoZ2FtZSkge1xyXG4gICAgaWYgKFJvYm90TWFuYWdlci5yb2JvdE1hbmFnZXIpIHtcclxuICAgICAgcmV0dXJuIFJvYm90TWFuYWdlci5yb2JvdE1hbmFnZXJcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBuZXcgUm9ib3RNYW5hZ2VyKGdhbWUpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsYW5jZVVuZVBhcnRpZURlUm9ib3RzKCkge1xyXG4gICAgdGhpcy5nYW1lLnNldE1lc3NhZ2UoXCJSb2JvdCBWcy4gUm9ib3RcIik7XHJcbiAgICB0aGlzLmdhbWUucmVzZXRHYW1lKClcclxuICAgIHRoaXMuZ2FtZS5lbmFibGVHYW1lKClcclxuICAgIHRoaXMuZ2FtZS5tb25Ub3VyLnNldChmYWxzZSlcclxuICAgIC8vIE9uIGNob2lzaXMgdW5lIMOpcXVpcGUgcXVpIGNvbW1lbmNlIGFsw6lhdG9pcmVtZW50XHJcbiAgICBjb25zdCBjb2xvciA9IFV0aWxzLmdldENvdWxldXJFcXVpcGVBbGVhdG9pcmUoKTtcclxuICAgIC8vIE9uIGxhbmNlIGxhIHBhcnRpZVxyXG4gICAgdGhpcy5yb2JvdFZzUm9ib3QoY29sb3IpO1xyXG4gIH1cclxuXHJcbiAgcm9ib3RWc1JvYm90KGNvbG9yKSB7XHJcbiAgICAvLyBTaSBsYSBwYXJ0aWUgbidlc3QgcGFzIHRlcm1pbsOpXHJcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgIGlmICghdGhpcy5yb2JvdFBsYWNlVW5QaW9uKGNvbG9yKSlcclxuICAgIHtcclxuICAgICAgLy8gT24gZmFpcyBqb3VlciBsJ8OpcXVpcGUgYWR2ZXJzZVxyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGF0LnJvYm90VnNSb2JvdChVdGlscy5nZXRDb3VsZXVyRXF1aXBlQWR2ZXJzZShjb2xvcikpXHJcbiAgICAgIH0sIDUpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByb2JvdFBsYWNlVW5QaW9uKGNvbG9yKSB7XHJcbiAgICBjb25zdCBnYW1lID0gdGhpcy5nYW1lO1xyXG4gICAgLy8gT24gcsOpY3Vww6hyZSBsYSBsaXN0ZSBkZXMgY29sb25uZXMgcXVpIG4nb250IHBhcyBsZXVyc1xyXG4gICAgLy8gY29sb25uZXMgY29tcGzDqXTDqXMuXHJcbiAgICBjb25zdCBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzID0gZ2FtZS5nZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpO1xyXG4gICAgbGV0IGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCA9IFV0aWxzLmdldEVsZW1lbnRBbGVhdG9pcmUobGlzdGVDb2xvbm5lc05vbkNvbXBsZXRlcyk7XHJcbiAgICBjb25zdCBsZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIgID0gZ2FtZS5nZXRMZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIoKTtcclxuICAgIGxlc0Nhc2VzUG91dmFudEV0cmVKb3Vlci5mb3JFYWNoKGNhc2VQb3V2YW50RXRyZUpvdWVyID0+IHtcclxuICAgICAgbGV0IGluZGljZUhvcml6b250YWxlID0gY2FzZVBvdXZhbnRFdHJlSm91ZXJbMF07XHJcbiAgICAgIGxldCBpbmRpY2VWZXJ0aWNhbGUgICA9IGNhc2VQb3V2YW50RXRyZUpvdWVyWzFdO1xyXG4gICAgICBpZiAoV2lubmVyTWFuYWdlci52ZXJpZklmUGlvblBsYWNlZEdpdmVXaW4oZ2FtZSwgaW5kaWNlSG9yaXpvbnRhbGUsIGluZGljZVZlcnRpY2FsZSwgY29sb3IpKSB7XHJcbiAgICAgICAgY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50ID0gaW5kaWNlSG9yaXpvbnRhbGU7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoV2lubmVyTWFuYWdlci52ZXJpZklmUGlvblBsYWNlZEdpdmVXaW4oZ2FtZSwgaW5kaWNlSG9yaXpvbnRhbGUsIGluZGljZVZlcnRpY2FsZSwgVXRpbHMuZ2V0Q291bGV1ckVxdWlwZUFkdmVyc2UoY29sb3IpKSkge1xyXG4gICAgICAgIGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCA9IGluZGljZUhvcml6b250YWxlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgICAgXHJcbiAgICBpZiAoIWxlc0Nhc2VzUG91dmFudEV0cmVKb3VlciB8fCBsZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMuZ2FtZS5zZXRXaW5uZXIobnVsbCwgbnVsbCk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGJvdWNsZUFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIGxldCBpbmRpY2VUYWlsbGVWZXJ0aWNhbGUgPSB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1O1xyXG4gICAgICB3aGlsZSAoaW5kaWNlVGFpbGxlVmVydGljYWxlID4gMCAmJiBib3VjbGVBY3RpdmUpIHtcclxuICAgICAgICBsZXQgY291bGV1ckR1UGlvblBsYWNlID0gdGhpcy5nYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCwgaW5kaWNlVGFpbGxlVmVydGljYWxlKTtcclxuICAgICAgICBpZiAoIWNvdWxldXJEdVBpb25QbGFjZSkge1xyXG4gICAgICAgICAgYm91Y2xlQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmdhbWUuZm9yY2VBZGRQaW9uKGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCwgaW5kaWNlVGFpbGxlVmVydGljYWxlLCBjb2xvcilcclxuICAgICAgICAgIC8vYWpvdXRlVW5QaW9uRGFuc0JkZChjb2xvbm5lQ2hvaXNpdEFsZWF0b2lyZW1lbnQsIGluZGljZVRhaWxsZVZlcnRpY2FsZSwgY29sb3IpO1xyXG4gICAgICAgICAgY29uc3QgaXNXaW5uZXIgPSBXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgY29sb3IpO1xyXG4gICAgICAgICAgaWYgKGlzV2lubmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zZXRXaW5uZXIoY29sb3IsIGlzV2lubmVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGljZVRhaWxsZVZlcnRpY2FsZS0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSIsImV4cG9ydCBjbGFzcyBKZXRvbiB7XHJcbiAgY29uc3RydWN0b3IocG9zaXRpb25Ib3Jpem9udGFsZSwgcG9zaXRpb25WZXJ0aWNhbGUpIHtcclxuICAgIHRoaXMucG9zaXRpb25Ib3Jpem9udGFsZSA9IHBvc2l0aW9uSG9yaXpvbnRhbGU7XHJcbiAgICB0aGlzLnBvc2l0aW9uVmVydGljYWxlICAgPSBwb3NpdGlvblZlcnRpY2FsZTtcclxuICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgVGVzdHNVbml0cyB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xyXG4gICAgaWYgKGdhbWUpIHtcclxuICAgICAgdGhpcy5nYW1lID0gZ2FtZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXVjdW5lIHBhcnRpZSBmb3Vybml0XCIpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGxhdW5jaFRlc3RzVW5pdHMgKCkge1xyXG4gICAgdGhpcy5kZWZhdWx0VGFpbGxlSG9yaXpvbnRhbGUgPSB0aGlzLmdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKVxyXG4gICAgdGhpcy5kZWZhdWx0VGFpbGxlVmVydGljYWxlICAgPSB0aGlzLmdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuXHJcbiAgICBjb25zdCBsaXN0c1Rlc3RzVW5pdHMgPSBbXVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDEoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQyKCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0MygpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDQoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQ1KCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0NigpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDcoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQ4KCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0OSgpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDEwKCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0MTEoKSlcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGlzdHNUZXN0c1VuaXRzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBsZXQgY29sb3I7XHJcbiAgICAgIGlmIChsaXN0c1Rlc3RzVW5pdHNbaW5kZXhdKSB7XHJcbiAgICAgICAgY29sb3IgPSBcImdyZWVuXCI7XHJcbiAgICAgIH0gIGVsc2Uge1xyXG4gICAgICAgIGNvbG9yID0gXCJyZWRcIjtcclxuICAgICAgfVxyXG4gICAgICBsZXQgbWVzc2FnZSA9IFwiVGVzdCBcIiArIChpbmRleCArIDEpICsgXCIgOiBcIiArIGxpc3RzVGVzdHNVbml0c1tpbmRleF0gKyBcIlxcblwiO1xyXG4gICAgICB0aGlzLmdhbWUubG9nKFwiVGVzdFwiLCBtZXNzYWdlLCBjb2xvcik7XHJcbiAgICAgIFxyXG4gICAgICBcclxuICAgIH1cclxuICAgIHRoaXMucmVzZXRUZXN0cygpO1xyXG4gICAgXHJcblxyXG4gIH1cclxuICByZXNldFRlc3RzKCkge1xyXG4gICAgdGhpcy5nYW1lLnRhaWxsZUhvcml6b250YWxlRHVKZXUgPSB0aGlzLmRlZmF1bHRUYWlsbGVIb3Jpem9udGFsZTtcclxuICAgIHRoaXMuZ2FtZS50YWlsbGVWZXJ0aWNhbGVEdUpldSAgID0gdGhpcy5kZWZhdWx0VGFpbGxlVmVydGljYWxlO1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gIH1cclxuICB0ZXN0VW5pdDEoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHtcInBhcmFtZXRyZXNcIjp7XCJ4XCI6XCI3XCIsXCJ5XCI6XCI1XCJ9LFwiZGF0YXNcIjp7XCJwaW9uc1wiOntcInJlZFwiOltbNCw1XSxbMyw1XSxbMiw1XSxbNiw0XSxbMyw0XSxbNCw0XSxbNyw0XSxbMywzXSxbNCwzXSxbNywzXSxbMSw0XSxbMSwyXSxbMSwxXSxbMiwxXSxbNywyXSxbNSwyXV0sXCJ5ZWxsb3dcIjpbWzEsNV0sWzYsNV0sWzUsNV0sWzcsNV0sWzIsNF0sWzUsNF0sWzIsM10sWzMsMl0sWzQsMl0sWzQsMV0sWzEsM10sWzYsM10sWzIsMl0sWzcsMV0sWzUsM11dfX19XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG4gICAgXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbNSwyXSxbNCwzXSxbMyw0XSxbMiw1XV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCd5ZWxsb3cnKSAmJiBKU09OLnN0cmluZ2lmeShXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwncmVkJykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbiAgdGVzdFVuaXQyKCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7XCJwYXJhbWV0cmVzXCI6e1wieFwiOlwiN1wiLFwieVwiOlwiNVwifSxcImRhdGFzXCI6e1wicGlvbnNcIjp7XCJyZWRcIjpbWzEsNV0sWzMsNV0sWzIsNV0sWzIsM10sWzUsNV0sWzcsNF0sWzIsMV0sWzUsNF1dLFwieWVsbG93XCI6W1s3LDVdLFs0LDVdLFsyLDRdLFs2LDVdLFszLDRdLFsyLDJdLFs0LDRdLFsxLDRdXX19fVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuICAgIFxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzQsMV0sWzQsMl0sWzQsM10sWzQsNF1dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwncmVkJykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3llbGxvdycpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0MygpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0ge1wicGFyYW1ldHJlc1wiOntcInhcIjpcIjdcIixcInlcIjpcIjVcIn0sXCJkYXRhc1wiOntcInBpb25zXCI6e1wicmVkXCI6W1szLDVdLFs3LDVdLFsxLDVdLFs3LDRdLFs1LDRdLFs0LDJdLFsyLDVdLFsxLDRdLFsyLDNdLFs3LDJdLFsyLDJdLFszLDNdLFsxLDNdLFs2LDRdXSxcInllbGxvd1wiOltbNCw1XSxbNSw1XSxbMyw0XSxbNCw0XSxbNCwzXSxbNywzXSxbNCwxXSxbMiw0XSxbNiw1XSxbNywxXSxbNSwzXSxbNSwyXSxbMiwxXSxbMSwyXSxbNiwzXV19fX1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcbiAgICBcclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1szLDRdLFszLDVdLFszLDZdLFszLDddXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3JlZCcpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCd5ZWxsb3cnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDQoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHtcInBhcmFtZXRyZXNcIjp7XCJ4XCI6XCI3XCIsXCJ5XCI6XCI1XCJ9LFwiZGF0YXNcIjp7XCJwaW9uc1wiOntcInJlZFwiOltbNSw1XSxbNSw0XSxbMyw1XSxbNCw1XSxbMSw1XSxbMSw0XSxbNCwzXSxbNiwyXSxbNCwyXSxbMiwzXSxbNSwyXSxbNywzXSxbNSwxXSxbNywxXSxbMiwyXSxbMiwxXSxbMyw0XSxbMywzXV0sXCJ5ZWxsb3dcIjpbWzcsNV0sWzYsNV0sWzYsNF0sWzIsNV0sWzQsNF0sWzcsNF0sWzYsM10sWzUsM10sWzIsNF0sWzQsMV0sWzYsMV0sWzEsM10sWzcsMl0sWzEsMl0sWzEsMV0sWzMsMl0sWzMsMV1dfX19XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG4gICAgXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwncmVkJykgJiYgIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCd5ZWxsb3cnKSlcclxuICB9XHJcbiAgdGVzdFVuaXQ1KCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7XCJwYXJhbWV0cmVzXCI6e1wieFwiOlwiN1wiLFwieVwiOlwiNVwifSxcImRhdGFzXCI6e1wicGlvbnNcIjp7XCJyZWRcIjpbWzMsNV0sWzQsNV0sWzEsNV0sWzcsNV0sWzcsNF0sWzYsMl0sWzUsNV0sWzUsNF0sWzUsMl0sWzIsMl0sWzEsNF0sWzQsM10sWzcsM10sWzQsMl0sWzMsMV0sWzcsMV0sWzEsMl0sWzEsMV1dLFwieWVsbG93XCI6W1s2LDVdLFs2LDRdLFsyLDVdLFsyLDRdLFs2LDNdLFszLDRdLFs2LDFdLFs1LDNdLFsyLDNdLFs0LDRdLFsxLDNdLFszLDNdLFs3LDJdLFszLDJdLFs0LDFdLFsyLDFdLFs1LDFdXX19fVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuICAgIFxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3JlZCcpICYmICFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwneWVsbG93JykpXHJcbiAgfVxyXG4gIHRlc3RVbml0NigpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0ge1wicGFyYW1ldHJlc1wiOntcInhcIjpcIjdcIixcInlcIjpcIjVcIn0sXCJkYXRhc1wiOntcInBpb25zXCI6e1wicmVkXCI6W1szLDVdLFs3LDRdLFs0LDVdLFs1LDRdLFs0LDRdLFsxLDRdLFszLDRdLFs0LDNdLFszLDNdLFs1LDJdLFs2LDRdXSxcInllbGxvd1wiOltbNyw1XSxbNSw1XSxbNywzXSxbMiw1XSxbMSw1XSxbNywyXSxbNSwzXSxbMiw0XSxbNCwyXSxbMywyXSxbNiw1XV19fX1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcbiAgICBcclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s0LDNdLFs0LDRdLFs0LDVdLFs0LDZdXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3llbGxvdycpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCdyZWQnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDcoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHtcInBhcmFtZXRyZXNcIjp7XCJ4XCI6XCI3XCIsXCJ5XCI6XCIxMFwifSxcImRhdGFzXCI6e1wicGlvbnNcIjp7XCJyZWRcIjpbWzYsMTBdLFsyLDEwXSxbNyw5XSxbMSwxMF0sWzUsMTBdLFszLDldLFs2LDhdLFs2LDZdLFs2LDVdLFs3LDddLFs1LDhdLFszLDddLFszLDZdLFs0LDhdLFs2LDNdLFs0LDddLFsxLDhdLFs0LDVdLFsyLDZdLFsyLDRdLFszLDRdLFszLDNdLFsxLDddXSxcInllbGxvd1wiOltbNywxMF0sWzMsMTBdLFs2LDldLFsyLDldLFs0LDEwXSxbMSw5XSxbNyw4XSxbNiw3XSxbNCw5XSxbMiw4XSxbNSw5XSxbMyw4XSxbNyw2XSxbNSw3XSxbNiw0XSxbNSw2XSxbMyw1XSxbNCw2XSxbMiw3XSxbMiw1XSxbNCw0XSxbNiwyXSxbNyw1XSxbMSw2XV19fX1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcbiAgICBcclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s5LDRdLFs4LDNdLFs3LDJdLFs2LDFdXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3JlZCcpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCd5ZWxsb3cnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDgoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHtcInBhcmFtZXRyZXNcIjp7XCJ4XCI6XCIxMVwiLFwieVwiOlwiNlwifSxcImRhdGFzXCI6e1wicGlvbnNcIjp7XCJyZWRcIjpbWzEsNl0sWzUsNl0sWzcsNl0sWzIsNV0sWzExLDZdLFs5LDZdLFs5LDVdLFs4LDNdLFszLDRdLFs0LDZdLFs5LDRdXSxcInllbGxvd1wiOltbOCw2XSxbOCw1XSxbMiw2XSxbNiw2XSxbMyw2XSxbMyw1XSxbOCw0XSxbMSw1XSxbMiw0XSxbNyw1XSxbOSwzXV19fX1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcbiAgICBcclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s2LDZdLFs1LDddLFs0LDhdLFszLDldXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3JlZCcpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCd5ZWxsb3cnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDkoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHtcInBhcmFtZXRyZXNcIjp7XCJ4XCI6XCI0XCIsXCJ5XCI6XCI0XCJ9LFwiZGF0YXNcIjp7XCJwaW9uc1wiOntcInJlZFwiOltbNCw0XSxbMiw0XSxbNCwyXSxbMiwzXSxbNCwxXSxbMiwxXSxbMSwyXSxbMywxXV0sXCJ5ZWxsb3dcIjpbWzEsNF0sWzQsM10sWzMsNF0sWzMsM10sWzIsMl0sWzEsM10sWzMsMl0sWzEsMV1dfX19XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG4gICAgXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwncmVkJykgJiYgIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCd5ZWxsb3cnKSlcclxuICB9XHJcbiAgdGVzdFVuaXQxMCgpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0ge1wicGFyYW1ldHJlc1wiOntcInhcIjpcIjRcIixcInlcIjpcIjRcIn0sXCJkYXRhc1wiOntcInBpb25zXCI6e1wicmVkXCI6W1syLDRdLFszLDRdLFsyLDJdLFsyLDFdLFsxLDNdLFs0LDJdXSxcInllbGxvd1wiOltbNCw0XSxbNCwzXSxbMiwzXSxbMSw0XSxbMywzXSxbMywyXSxbNCwxXV19fX1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcbiAgICBcclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s0LDFdLFszLDJdLFsyLDNdLFsxLDRdXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3JlZCcpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCd5ZWxsb3cnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDExKCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7XCJwYXJhbWV0cmVzXCI6e1wieFwiOlwiOFwiLFwieVwiOlwiN1wifSxcImRhdGFzXCI6e1wicGlvbnNcIjp7XCJyZWRcIjpbWzEsN10sWzYsN10sWzQsNl0sWzgsNl0sWzMsNl0sWzcsN10sWzcsNl0sWzcsNV0sWzUsN10sWzIsN10sWzUsNl0sWzUsNV0sWzUsM10sWzcsM10sWzYsNV1dLFwieWVsbG93XCI6W1s4LDddLFszLDddLFs0LDddLFs0LDVdLFs0LDRdLFsxLDZdLFs4LDVdLFs4LDRdLFs3LDRdLFszLDVdLFs2LDZdLFsyLDZdLFs1LDRdLFszLDRdLFs3LDJdLFs2LDRdXX19fVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuICAgIFxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzQsM10sWzQsNF0sWzQsNV0sWzQsNl1dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwncmVkJykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3llbGxvdycpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vR2FtZVwiXHJcbmltcG9ydCB7IFRlc3RzVW5pdHMgfSBmcm9tIFwiLi9UZXN0c1VuaXRzXCJcclxuaW1wb3J0IHsgUm9ib3RNYW5hZ2VyIH0gZnJvbSBcIi4vUm9ib3RNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWpvdXRlVW5QaW9uRGFuc0JkZChweDogbnVtYmVyLCBweTogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7XHJcbiAgbGV0IGdhbWVJZCA9IDQ7XHJcbiAgJC5wb3N0KFwiL2FwaS9waW9ucy9zZXRMaXN0L1wiLCB7XHJcbiAgICBpZDogZ2FtZUlkLFxyXG4gICAgUHg6IHB4LFxyXG4gICAgUHk6IHB5LFxyXG4gICAgQ29sb3I6IGNvbG9yXHJcbiAgfSlcclxuICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RzVW5pdHMoKSB7XHJcbiAgbGV0IHRlc3RzVW5pdHMgPSBuZXcgVGVzdHNVbml0cyhHYW1lLmdldEdhbWUoKSk7XHJcbiAgdGVzdHNVbml0cy5sYXVuY2hUZXN0c1VuaXRzKClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBsYXlHYW1lKCkge1xyXG4gIEdhbWUuZ2V0R2FtZSgpLnBsYXlHYW1lKClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxhbmNlVW5lUGFydGllRGVSb2JvdHMoKSB7XHJcbiAgY29uc3Qgcm9ib3RNYW5hZ2VyID0gUm9ib3RNYW5hZ2VyLmdldFJvYm90TWFuYWdlcihHYW1lLmdldEdhbWUoKSlcclxuICByb2JvdE1hbmFnZXIubGFuY2VVbmVQYXJ0aWVEZVJvYm90cygpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvcGVuUGFyYW0oKSB7XHJcbiAgJCgnI2RpYWxvZycpLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAoPGFueT4kKFwiI2RpYWxvZ1wiKSkuZGlhbG9nKHtcclxuICAgIHJlc2l6YWJsZTogZmFsc2UsXHJcbiAgICBoZWlnaHQ6IFwiYXV0b1wiLFxyXG4gICAgd2lkdGg6IDQwMCxcclxuICAgIG1vZGFsOiB0cnVlLFxyXG4gICAgYnV0dG9uczoge1xyXG4gICAgICBcIlZhbGlkZXJcIjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIjcGFyYW1ldGVyc1ZhbHVlc1wiKS5zdWJtaXQoKTtcclxuICAgICAgICAoPGFueT4kKHRoaXMpKS5kaWFsb2coXCJjbG9zZVwiKVxyXG4gICAgICB9LFxyXG4gICAgICBcIkZlcm1lclwiOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgKDxhbnk+JCh0aGlzKSkuZGlhbG9nKFwiY2xvc2VcIilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkUGFyYW0oKSB7XHJcbiAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoXHJcbiAgICAnP3g9JyArICQoJyNuYkNhc2VYJykudmFsKCkgKyAnJnk9JyArICQoJyNuYkNhc2VZJykudmFsKClcclxuICApXHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9