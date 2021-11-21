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
/* harmony export */   "ajouteUnPionDansBdd": () => (/* binding */ ajouteUnPionDansBdd),
/* harmony export */   "testsUnits": () => (/* binding */ testsUnits),
/* harmony export */   "playGame": () => (/* binding */ playGame),
/* harmony export */   "lanceUnePartieDeRobots": () => (/* binding */ lanceUnePartieDeRobots),
/* harmony export */   "openParam": () => (/* binding */ openParam),
/* harmony export */   "loadParam": () => (/* binding */ loadParam)
/* harmony export */ });
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _TestsUnits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
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


/***/ }),
/* 9 */
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
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _game_manager_inc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);


jQuery(document).ready(function ($) {
    var game = _Game__WEBPACK_IMPORTED_MODULE_0__.Game.getGame();
    $(document).ready(function () {
        $("#playButton").click(function () { game.playGame(); });
        $("#robotButton").click(function () { _game_manager_inc__WEBPACK_IMPORTED_MODULE_1__.lanceUnePartieDeRobots(); });
        $("#optionsButton").click(function () { _game_manager_inc__WEBPACK_IMPORTED_MODULE_1__.openParam(); });
    });
    $("html").on("keydown", "body", function (e) {
        if (game.monTour.get()) {
            var key = event.keyCode;
            if ($("#game .row .icon[surbrillance='red']").length >= 1 && !game.isDraw()) {
                var pionEnSurbrillance = $("#game .row .icon[surbrillance='red']");
                var indexHorizontaleDuPion = parseInt(pionEnSurbrillance.attr("case"));
                if (indexHorizontaleDuPion) {
                    $("#game .row .icon").mouseout();
                    if (key == 39) {
                        // flèche droite : simulation à droite
                        indexHorizontaleDuPion++;
                        if (indexHorizontaleDuPion >= game.getTailleHorizontale() + 1) {
                            indexHorizontaleDuPion = 1;
                        }
                        while (!game.getLesColonnesNonCompletes().includes(indexHorizontaleDuPion) && !game.isDraw() && indexHorizontaleDuPion <= game.getTailleHorizontale()) {
                            indexHorizontaleDuPion++;
                            if (indexHorizontaleDuPion >= game.getTailleHorizontale() + 1) {
                                indexHorizontaleDuPion = 1;
                            }
                        }
                        $("#game .row[val='1'] .icon[case='" + indexHorizontaleDuPion + "']").mouseover();
                    }
                    else if (key == 37) {
                        // flèche gauche : simulation à gauche
                        indexHorizontaleDuPion--;
                        if (indexHorizontaleDuPion <= 0) {
                            indexHorizontaleDuPion = game.getTailleHorizontale();
                        }
                        console.log(indexHorizontaleDuPion);
                        while (!game.getLesColonnesNonCompletes().includes(indexHorizontaleDuPion) && !game.isDraw() && indexHorizontaleDuPion >= 0) {
                            indexHorizontaleDuPion--;
                            if (indexHorizontaleDuPion <= 0) {
                                indexHorizontaleDuPion = game.getTailleHorizontale();
                            }
                        }
                        console.log(indexHorizontaleDuPion);
                        $("#game .row[val='1'] .icon[case='" + indexHorizontaleDuPion + "']").mouseover();
                    }
                    else if (key == 13 || key == 38) {
                        // touche entré ou flèche haut : simulation d'un click
                        $(pionEnSurbrillance).click();
                        if (!game.getLesColonnesNonCompletes().includes(indexHorizontaleDuPion)) {
                            indexHorizontaleDuPion++;
                            if (indexHorizontaleDuPion >= game.getTailleHorizontale() + 1) {
                                indexHorizontaleDuPion = 1;
                            }
                            while (!game.getLesColonnesNonCompletes().includes(indexHorizontaleDuPion) && !game.isDraw() && indexHorizontaleDuPion <= game.getTailleHorizontale()) {
                                indexHorizontaleDuPion++;
                            }
                            $("#game .row[val='1'] .icon[case='" + indexHorizontaleDuPion + "']").mouseover();
                        }
                    }
                }
            }
            else {
                $("#game .row .icon").mouseout();
                var indexHorizontaleDuPion = 1;
                while (!game.getLesColonnesNonCompletes().includes(indexHorizontaleDuPion) && !game.isDraw() && indexHorizontaleDuPion <= game.getTailleHorizontale()) {
                    indexHorizontaleDuPion++;
                }
                $("#game .row[val='1'] .icon[case='" + indexHorizontaleDuPion + "']").mouseover();
            }
        }
    });
    $("#box").on('click', '#game .icon', function () {
        if (game.monTour.get()) {
            var positionHorizontale = game.getPositionHorizontale($(this));
            game.addPion(positionHorizontale);
            game.select(positionHorizontale);
        }
    });
    $("#box").on('mouseover', '#game .icon', function () {
        if (game.monTour.get()) {
            game.select(game.getPositionHorizontale($(this)));
        }
    });
    $("#box").on('mouseout', '#game .icon', function () {
        if (game.monTour.get()) {
            game.unSelect();
        }
    });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsdUNBQXVDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxtQ0FBbUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG1DQUFtQztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLDJDQUEyQztBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG1DQUFtQztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCx1QkFBdUI7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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LENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkQ7SUFDSCxDQUFDLENBQUM7SUFDRixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUU7UUFDdEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNqQjtJQUNILENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL0dhbWUudHMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL01vblRvdXIuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL1V0aWxzLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9XaW5uZXJNYW5hZ2VyLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9DaGVja0lmV2lubmVyLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9Sb2JvdE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL0pldG9uLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9nYW1lX21hbmFnZXIuaW5jLnRzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9UZXN0c1VuaXRzLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3B1aXNzYW5jZTQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvbWFpbi5pbmMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9uVG91ciB9IGZyb20gXCIuL01vblRvdXJcIlxyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCB7IFdpbm5lck1hbmFnZXIgfSBmcm9tIFwiLi9XaW5uZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFJvYm90TWFuYWdlciB9IGZyb20gXCIuL1JvYm90TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBKZXRvbiB9IGZyb20gXCIuL0pldG9uXCI7XHJcbmltcG9ydCAqIGFzIEludGVyZmFjZSBmcm9tIFwiLi9JbnRlcmZhY2VzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZSB7XHJcblxyXG4gIHByaXZhdGUgdGFpbGxlSG9yaXpvbnRhbGVEdUpldTogbnVtYmVyO1xyXG4gIHByaXZhdGUgdGFpbGxlVmVydGljYWxlRHVKZXU6IG51bWJlcjtcclxuICBwcml2YXRlIGxpc3RlUGlvbnNSb3VnZTogQXJyYXk8SmV0b24+O1xyXG4gIHByaXZhdGUgbGlzdGVQaW9uc0phdW5lOiBBcnJheTxKZXRvbj47XHJcbiAgcHVibGljIG1vblRvdXI6IE1vblRvdXI7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgZ2FtZTogR2FtZTtcclxuXHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcih0YWlsbGVIb3Jpem9udGFsZTogbnVtYmVyLCB0YWlsbGVWZXJ0aWNhbGU6IG51bWJlcikge1xyXG4gICAgdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1ID0gdGFpbGxlSG9yaXpvbnRhbGU7XHJcbiAgICB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1ID0gdGFpbGxlVmVydGljYWxlO1xyXG4gICAgdGhpcy5saXN0ZVBpb25zUm91Z2UgPSBuZXcgQXJyYXkoKTtcclxuICAgIHRoaXMubGlzdGVQaW9uc0phdW5lID0gbmV3IEFycmF5KCk7XHJcbiAgICB0aGlzLm1vblRvdXIgPSBuZXcgTW9uVG91cigpXHJcbiAgICB0aGlzLmRpc2FibGVHYW1lKClcclxuICAgIHRoaXMubG9nKFxyXG4gICAgICBcIlB1aXNzYW5jZSA0XCIsXHJcbiAgICAgIFwiSW5pdGlhbGlzYXRpb24gZHUgamV1IGVuIFwiICsgdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1ICsgXCJ4XCIgKyB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1XHJcbiAgICApO1xyXG4gICAgR2FtZS5nYW1lID0gdGhpcztcclxuICB9XHJcbiAgcHVibGljIHN0YXRpYyBnZXRHYW1lKCkge1xyXG4gICAgaWYgKEdhbWUuZ2FtZSkge1xyXG4gICAgICByZXR1cm4gR2FtZS5nYW1lXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgdGFpbGxlSG9yaXpvbnRhbGVQYXJzZWQgPSB0aGlzLmdldFRhaWxsZUhvcml6b250YWxlRnJvbVVybCgpXHJcbiAgICAgIGxldCB0YWlsbGVWZXJ0aWNhbGVQYXJzZWQgPSB0aGlzLmdldFRhaWxsZVZlcnRpY2FsZUZyb21VcmwoKVxyXG4gICAgICByZXR1cm4gbmV3IEdhbWUodGFpbGxlSG9yaXpvbnRhbGVQYXJzZWQsIHRhaWxsZVZlcnRpY2FsZVBhcnNlZClcclxuXHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0VGFpbGxlSG9yaXpvbnRhbGVGcm9tVXJsKCkge1xyXG4gICAgY29uc3QgcGFyYW1zVXJsOiBhbnkgPSBVdGlscy5wYXJzZVVSTFBhcmFtcyh3aW5kb3cubG9jYXRpb24uaHJlZilcclxuICAgIGlmICh0eXBlb2YgcGFyYW1zVXJsICE9PSAndW5kZWZpbmVkJyAmJiBwYXJhbXNVcmwudGFpbGxlSG9yaXpvbnRhbGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlID0gcGFyYW1zVXJsLnRhaWxsZUhvcml6b250YWxlWzBdO1xyXG4gICAgICBpZiAocGFyc2VJbnQodGFpbGxlSG9yaXpvbnRhbGUpKSB7XHJcbiAgICAgICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGVQYXJzZWQgPSBwYXJzZUludCh0YWlsbGVIb3Jpem9udGFsZSlcclxuICAgICAgICBpZiAodGFpbGxlSG9yaXpvbnRhbGVQYXJzZWQgPj0gNCAmJiB0YWlsbGVIb3Jpem9udGFsZVBhcnNlZCA8PSAyMCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRhaWxsZUhvcml6b250YWxlUGFyc2VkXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiA3O1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gNztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIDc7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0VGFpbGxlVmVydGljYWxlRnJvbVVybCgpIHtcclxuICAgIGNvbnN0IHBhcmFtc1VybDogYW55ID0gVXRpbHMucGFyc2VVUkxQYXJhbXMod2luZG93LmxvY2F0aW9uLmhyZWYpXHJcbiAgICBpZiAodHlwZW9mIHBhcmFtc1VybCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGFyYW1zVXJsLnRhaWxsZVZlcnRpY2FsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgdGFpbGxlVmVydGljYWxlID0gcGFyYW1zVXJsLnRhaWxsZVZlcnRpY2FsZVswXTtcclxuICAgICAgaWYgKHBhcnNlSW50KHRhaWxsZVZlcnRpY2FsZSkpIHtcclxuICAgICAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGVQYXJzZWQgPSBwYXJzZUludCh0YWlsbGVWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKHRhaWxsZVZlcnRpY2FsZVBhcnNlZCA+PSA0ICYmIHRhaWxsZVZlcnRpY2FsZVBhcnNlZCA8PSAyMCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRhaWxsZVZlcnRpY2FsZVBhcnNlZFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gNTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIDU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiA1O1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgc2VhcmNoUGllY2UoY291bGV1cjogc3RyaW5nLCBpbml0Q2FzZTogbnVtYmVyKSB7XHJcbiAgICBjb25zdCByZWRDaXJjbGUgPSAkKCcjcHJldmlldyAjcmVkX2NpcmNsZScpXHJcbiAgICBjb25zdCB5ZWxsb3dDaXJjbGUgPSAkKCcjcHJldmlldyAjeWVsbG93X2NpcmNsZScpXHJcbiAgICBjb25zdCBkZWZhdWx0Q2lyY2xlID0gJCgnI3ByZXZpZXcgI2Jhc2ljX2NpcmNsZScpXHJcbiAgICBpZiAoaW5pdENhc2UpIHtcclxuICAgICAgaWYgKGNvdWxldXIgPT09ICdyZWQnKSB7XHJcbiAgICAgICAgJChyZWRDaXJjbGUpLmNoaWxkcmVuKCkuY2hpbGRyZW4oKS5hdHRyKCdjYXNlJywgaW5pdENhc2UpXHJcbiAgICAgICAgcmV0dXJuICQocmVkQ2lyY2xlKS5odG1sKClcclxuICAgICAgfSBlbHNlIGlmIChjb3VsZXVyID09PSAneWVsbG93Jykge1xyXG4gICAgICAgICQoeWVsbG93Q2lyY2xlKS5jaGlsZHJlbigpLmNoaWxkcmVuKCkuYXR0cignY2FzZScsIGluaXRDYXNlKVxyXG4gICAgICAgIHJldHVybiAkKHllbGxvd0NpcmNsZSkuaHRtbCgpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJChkZWZhdWx0Q2lyY2xlKS5jaGlsZHJlbigpLmNoaWxkcmVuKCkuYXR0cignY2FzZScsIGluaXRDYXNlKVxyXG4gICAgICAgIHJldHVybiAkKGRlZmF1bHRDaXJjbGUpLmh0bWwoKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoY291bGV1ciA9PT0gJ3JlZCcpIHtcclxuICAgICAgICByZXR1cm4gJChyZWRDaXJjbGUpLmh0bWwoKVxyXG4gICAgICB9IGVsc2UgaWYgKGNvdWxldXIgPT09ICd5ZWxsb3cnKSB7XHJcbiAgICAgICAgcmV0dXJuICQoeWVsbG93Q2lyY2xlKS5odG1sKClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gJChkZWZhdWx0Q2lyY2xlKS5odG1sKClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZTogbnVtYmVyLCBpbmRleFZlcnRpY2FsZTogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBsaXN0ZVBpb25zUm91Z2UgPSB0aGlzLmdldFBpb25zKDEpXHJcbiAgICBjb25zdCBsaXN0ZVBpb25zSmF1bmUgPSB0aGlzLmdldFBpb25zKDIpXHJcblxyXG4gICAgaWYgKFV0aWxzLmFycmF5MkRDb250YWluc0FycmF5KGxpc3RlUGlvbnNSb3VnZSwgW2luZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlXSkpIHtcclxuICAgICAgcmV0dXJuICdyZWQnO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoVXRpbHMuYXJyYXkyRENvbnRhaW5zQXJyYXkobGlzdGVQaW9uc0phdW5lLCBbaW5kZXhIb3Jpem9udGFsZSwgaW5kZXhWZXJ0aWNhbGVdKSkge1xyXG4gICAgICByZXR1cm4gJ3llbGxvdyc7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgY2xlYXJHYW1lKCkge1xyXG4gICAgJCgnLnJvdycpLnJlbW92ZSgpXHJcbiAgfVxyXG4gIHB1YmxpYyByZXNldEdhbWUoKSB7XHJcbiAgICB0aGlzLmNsZWFyR2FtZSgpXHJcbiAgICB0aGlzLmNsZWFyUGlvbnMoKVxyXG4gICAgdGhpcy5jcmVhdGVCYWNrZ3JvdW5kKClcclxuICAgIHRoaXMuZGlzYWJsZUdhbWUoKVxyXG4gIH1cclxuICBwdWJsaWMgcGxheUdhbWUoKSB7XHJcbiAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJy4uL3B1YmxpYy9hdWRpby9zdGFydEdhbWUubXA0Jyk7XHJcbiAgICBhdWRpby5wbGF5KCk7XHJcbiAgICBhdWRpbyA9IG51bGw7XHJcbiAgICB0aGlzLnJlc2V0R2FtZSgpXHJcbiAgICB0aGlzLnNldE1lc3NhZ2UoXCJBIHRvaSBkZSBqb3VlciAhXCIpXHJcbiAgICB0aGlzLmVuYWJsZUdhbWUoKVxyXG4gIH1cclxuICBwdWJsaWMgc2VsZWN0KGluZGV4SG9yaXpvbnRhbGU6IG51bWJlcikge1xyXG4gICAgbGV0IGluZGV4VmVydGljYWxlID0gdGhpcy5nZXRUYWlsbGVWZXJ0aWNhbGUoKTtcclxuICAgIHdoaWxlIChpbmRleFZlcnRpY2FsZSA+IDApIHtcclxuICAgICAgbGV0IHRlYW1Db2xvciA9IHRoaXMuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZSwgaW5kZXhWZXJ0aWNhbGUpXHJcbiAgICAgIGlmICghdGVhbUNvbG9yKSB7XHJcbiAgICAgICAgbGV0IGNvdWxldXIgPSAkKFwiI2dhbWUgLnJvd1wiKS5lcSgoaW5kZXhWZXJ0aWNhbGUgLSAxKSkuZmluZChcIi5pY29uXCIpLmVxKGluZGV4SG9yaXpvbnRhbGUgLSAxKVxyXG4gICAgICAgIGNvdWxldXIuYXR0cihcInN1cmJyaWxsYW5jZVwiLCBcInJlZFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaW5kZXhWZXJ0aWNhbGUtLTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGdldExlc0NvbG9ubmVzTm9uQ29tcGxldGVzKCkge1xyXG4gICAgbGV0IGxpc3RlQ29sb25uZXNOb25Db21wbGV0ZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGluZGV4SG9yaXpvbnRhbGUgPSAxOyBpbmRleEhvcml6b250YWxlIDw9IHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldTsgaW5kZXhIb3Jpem9udGFsZSsrKSB7XHJcbiAgICAgIGlmICghdGhpcy5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleEhvcml6b250YWxlLCAxKSkge1xyXG4gICAgICAgIGxpc3RlQ29sb25uZXNOb25Db21wbGV0ZXMucHVzaChpbmRleEhvcml6b250YWxlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpc3RlQ29sb25uZXNOb25Db21wbGV0ZXM7XHJcbiAgfVxyXG4gIHB1YmxpYyBpc0RyYXcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5saXN0ZVBpb25zSmF1bmUubGVuZ3RoICsgdGhpcy5saXN0ZVBpb25zUm91Z2UubGVuZ3RoID49IHRoaXMuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKSAqIHRoaXMuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICB9XHJcbiAgcHVibGljIGdldFRhaWxsZUhvcml6b250YWxlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldTtcclxuICB9XHJcbiAgcHVibGljIGdldFRhaWxsZVZlcnRpY2FsZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1O1xyXG4gIH1cclxuICBwdWJsaWMgZ2V0TGVzQ2FzZXNQb3V2YW50RXRyZUpvdWVyKCkge1xyXG4gICAgbGV0IGxpc3RlRGVzQ2FzZXNQb3V2YW50RXRyZUpvdWVyOiBBcnJheTxBcnJheTxOdW1iZXI+PiA9IFtdO1xyXG4gICAgbGV0IGxpc3RlQ29sb25uZXNOb25Db21wbGV0ZXMgPSB0aGlzLmdldExlc0NvbG9ubmVzTm9uQ29tcGxldGVzKCk7XHJcbiAgICBsZXQgYVRyb3V2ZXJMZVBpb247XHJcbiAgICBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzLmZvckVhY2gobnVtZXJvQ29sb25uZUhvcml6b250YWxlID0+IHtcclxuICAgICAgbGV0IG51bWVyb0NvbG9ubmVWZXJ0aWNhbGUgPSB0aGlzLmdldFRhaWxsZVZlcnRpY2FsZSgpO1xyXG4gICAgICBhVHJvdXZlckxlUGlvbiA9IGZhbHNlO1xyXG4gICAgICB3aGlsZSAobnVtZXJvQ29sb25uZVZlcnRpY2FsZSA+IDAgJiYgIWFUcm91dmVyTGVQaW9uKSB7XHJcbiAgICAgICAgaWYgKCFVdGlscy5hcnJheTJEQ29udGFpbnNBcnJheSh0aGlzLmdldFBpb25zKDEpLCBbbnVtZXJvQ29sb25uZUhvcml6b250YWxlLCBudW1lcm9Db2xvbm5lVmVydGljYWxlXSlcclxuICAgICAgICAgICYmICFVdGlscy5hcnJheTJEQ29udGFpbnNBcnJheSh0aGlzLmdldFBpb25zKDIpLCBbbnVtZXJvQ29sb25uZUhvcml6b250YWxlLCBudW1lcm9Db2xvbm5lVmVydGljYWxlXSkpIHtcclxuICAgICAgICAgIGxpc3RlRGVzQ2FzZXNQb3V2YW50RXRyZUpvdWVyLnB1c2goW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pXHJcbiAgICAgICAgICBhVHJvdXZlckxlUGlvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBudW1lcm9Db2xvbm5lVmVydGljYWxlLS07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGxpc3RlRGVzQ2FzZXNQb3V2YW50RXRyZUpvdWVyO1xyXG4gIH1cclxuICBwdWJsaWMgZXhwb3J0KCkge1xyXG4gICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkFmZmljaGFnZSBkZSBsJ2V4cG9ydC4uLlwiKTtcclxuICAgIGxldCBwYXJhbXM6IHsgW2tleTogc3RyaW5nXTogSmV0b25bXSB9ID0ge307XHJcbiAgICBwYXJhbXNbJ3JlZCddID0gdGhpcy5nZXRQaW9ucygncmVkJylcclxuICAgIHBhcmFtc1sneWVsbG93J10gPSB0aGlzLmdldFBpb25zKCd5ZWxsb3cnKVxyXG4gICAgY29uc3QgcmVkID0gcGFyYW1zWydyZWQnXTtcclxuICAgIGNvbnN0IHllbGxvdyA9IHBhcmFtc1sneWVsbG93J107XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gJC5hamF4KHtcclxuICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICB1cmw6IFwiYXBpL2V4cG9ydD94PVwiICsgdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1ICsgXCImeT1cIiArIHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXUsXHJcbiAgICAgIGRhdGE6IHsgcmVkOiByZWQsIHllbGxvdzogeWVsbG93IH0sXHJcbiAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgdGltZW91dDogMTIwMDAwXHJcbiAgICB9KVxyXG4gICAgcmVxdWVzdC5kb25lKGZ1bmN0aW9uIChvdXRwdXRfc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmxvZyhvdXRwdXRfc3VjY2VzcylcclxuICAgICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkwnZXhwb3J0IHMnZXN0IGNvcnJlY3RlbWVudCB0ZXJtaW7DqVwiKTtcclxuICAgIH0pXHJcbiAgICByZXF1ZXN0LmZhaWwoZnVuY3Rpb24gKGh0dHBfZXJyb3IpIHtcclxuICAgICAgbGV0IHNlcnZlcl9tc2cgPSBodHRwX2Vycm9yLnJlc3BvbnNlVGV4dDtcclxuICAgICAgbGV0IGNvZGUgPSBodHRwX2Vycm9yLnN0YXR1cztcclxuICAgICAgbGV0IGNvZGVfbGFiZWwgPSBodHRwX2Vycm9yLnN0YXR1c1RleHQ7XHJcbiAgICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJFY2hlYyBsb3JzIGRlIGwnZXhwb3J0IChcIiArIGNvZGUgKyBcIilcIik7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcHVibGljIHVuU2VsZWN0KCkge1xyXG4gICAgJChcIi5yb3cgLmljb25cIikuYXR0cihcInN1cmJyaWxsYW5jZVwiLCBcIlwiKTtcclxuICB9XHJcbiAgcHVibGljIHNldE1lc3NhZ2UobWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICAkKFwiI2dhbWUgcCN0b3VyXCIpLnRleHQobWVzc2FnZSk7XHJcbiAgfVxyXG4gIHB1YmxpYyBpbXBvcnQoZ2FtZU9iamVjdDogSW50ZXJmYWNlLkdhbWVPYmplY3QsIHBhcmFtZXRlcnM6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkTDqWJ1dCBkZSBsJ2ltcG9ydCAuLi5cIik7XHJcbiAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiSW5pdGlhbGlzYXRpb24gZGVzIHBhcmFtw6h0cmVzIC4uLlwiKTtcclxuICAgIHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldSA9IHBhcnNlSW50KGdhbWVPYmplY3QucGFyYW1ldHJlcy54KVxyXG4gICAgdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldSA9IHBhcnNlSW50KGdhbWVPYmplY3QucGFyYW1ldHJlcy55KVxyXG4gICAgdGhpcy5yZXNldEdhbWUoKVxyXG4gICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkltcG9ydCBkZXMgcGlvbnMgLi4uXCIpO1xyXG4gICAgZ2FtZU9iamVjdC5kYXRhcy5waW9ucy5yZWQuZm9yRWFjaChwaW9uUm91Z2UgPT4ge1xyXG4gICAgICB0aGlzLmZvcmNlQWRkUGlvbihwaW9uUm91Z2VbMF0sIHBpb25Sb3VnZVsxXSwgJ3JlZCcpXHJcbiAgICB9KTtcclxuICAgIGdhbWVPYmplY3QuZGF0YXMucGlvbnMueWVsbG93LmZvckVhY2gocGlvblllbGxvdyA9PiB7XHJcbiAgICAgIHRoaXMuZm9yY2VBZGRQaW9uKHBpb25ZZWxsb3dbMF0sIHBpb25ZZWxsb3dbMV0sICd5ZWxsb3cnKVxyXG4gICAgfSk7XHJcbiAgICBpZiAocGFyYW1ldGVycykge1xyXG4gICAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiVsOpcmlmaWNhdGlvbiBkJ3VuIHBvdGVudGllbCBnYWduYW50IC4uLlwiKTtcclxuICAgICAgbGV0IGdhZ25hbnRSb3VnZSA9IFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcywgXCJyZWRcIik7XHJcbiAgICAgIGxldCBnYWduYW50SmF1bmUgPSBXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMsIFwieWVsbG93XCIpO1xyXG4gICAgICBpZiAoZ2FnbmFudFJvdWdlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRXaW5uZXIoJ3JlZCcsIGdhZ25hbnRSb3VnZSk7XHJcbiAgICAgICAgdGhpcy51blNlbGVjdCgpO1xyXG4gICAgICB9IGVsc2UgaWYgKGdhZ25hbnRKYXVuZSkge1xyXG4gICAgICAgIHRoaXMuc2V0V2lubmVyKCd5ZWxsb3cnLCBnYWduYW50SmF1bmUpO1xyXG4gICAgICAgIHRoaXMubW9uVG91ci5zZXQoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMudW5TZWxlY3QoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkZpbiBkZSBsJ2ltcG9ydFwiKTtcclxuICB9XHJcbiAgcHVibGljIHNldFdpbm5lcihjb3VsZXVyOiBzdHJpbmcsIHBpb25zR2FnbmFudHM6IG51bWJlcltdW10gPSBudWxsKSB7XHJcbiAgICB0aGlzLmRpc2FibGVHYW1lKClcclxuICAgIGlmIChwaW9uc0dhZ25hbnRzKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGlvbnNHYWduYW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBpbmRleFZlcnRpY2FsZSA9IHBpb25zR2FnbmFudHNbaV1bMF1cclxuICAgICAgICBsZXQgaW5kZXhIb3Jpem9udGFsZSA9IHBpb25zR2FnbmFudHNbaV1bMV1cclxuICAgICAgICBsZXQgc3VyYnJpbGxhbmNlUmVjaGVyY2hlID0gJChcIiNnYW1lIC5yb3dcIikuZXEoKGluZGV4VmVydGljYWxlIC0gMSkpLmZpbmQoXCIuaWNvblwiKS5lcSgoaW5kZXhIb3Jpem9udGFsZSAtIDEpKVxyXG4gICAgICAgICQoc3VyYnJpbGxhbmNlUmVjaGVyY2hlKS5jc3MoXCJvcGFjaXR5XCIsIDEpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChjb3VsZXVyID09ICdyZWQnKSB7XHJcbiAgICAgIHRoaXMuc2V0TWVzc2FnZShcIkxlcyByb3VnZXMgb250IGdhZ27DqXNcIik7XHJcbiAgICB9IGVsc2UgaWYgKGNvdWxldXIgPT0gJ3llbGxvdycpIHtcclxuICAgICAgdGhpcy5zZXRNZXNzYWdlKFwiTGVzIGphdW5lcyBvbnQgZ2FnbsOpc1wiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2V0TWVzc2FnZShcIk1hdGNoIG51bCAhXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgbG9nKHByZWZpeDogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIGNvbG9yVGV4dDogc3RyaW5nID0gJ2ZhbHNlJykge1xyXG4gICAgY29uc29sZS5sb2coXHJcbiAgICAgIFwiJWNbXCIgKyBwcmVmaXggKyBcIl0gJWNcIiArIG1lc3NhZ2UsXHJcbiAgICAgIFwiY29sb3I6IHB1cnBsZTsgZm9udC1zaXplOiAxM3B4OyBmb250LXdlaWdodDogYm9sZDtcIixcclxuICAgICAgXCJmb250LXNpemU6IDEzcHg7IGNvbG9yOiBcIiArIGNvbG9yVGV4dFxyXG4gICAgKTtcclxuICB9XHJcbiAgcHVibGljIGRpc2FibGVHYW1lKCkge1xyXG4gICAgJChcIiNnYW1lIC5pY29uXCIpLmNzcyhcIm9wYWNpdHlcIiwgMC4zKVxyXG4gICAgdGhpcy5tb25Ub3VyLnNldChmYWxzZSlcclxuICB9XHJcbiAgcHVibGljIGVuYWJsZUdhbWUoKSB7XHJcbiAgICAkKFwiI2dhbWUgLmljb25cIikuY3NzKFwib3BhY2l0eVwiLCAxKVxyXG4gICAgdGhpcy5tb25Ub3VyLnNldCh0cnVlKVxyXG4gIH1cclxuICBwdWJsaWMgY3JlYXRlQmFja2dyb3VuZCgpIHtcclxuICAgIGxldCBQeCA9IHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldTtcclxuICAgIGxldCBQeSA9IHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXU7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1OyBpKyspIHtcclxuICAgICAgbGV0IHJvd1kgPSAnPGRpdiBjbGFzcz1cInJvd1wiIHZhbD1cIicgKyBpICsgJ1wiPjwvZGl2Pic7XHJcbiAgICAgICQoXCIjZ2FtZVwiKS5hcHBlbmQocm93WSk7XHJcbiAgICAgIGZvciAobGV0IGogPSAxOyBqIDw9IHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldTsgaisrKSB7XHJcbiAgICAgICAgJCgnLnJvd1t2YWw9XCInICsgaSArICdcIl0nKS5hcHBlbmQodGhpcy5zZWFyY2hQaWVjZShudWxsLCBqKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGZvcmNlQWRkUGlvbihwb3NpdGlvbkhvcml6b250YWxlOiBudW1iZXIsIHBvc2l0aW9uVmVydGljYWxlOiBudW1iZXIsIGNvdWxldXI6IHN0cmluZykge1xyXG4gICAgJChcIi5yb3dbdmFsPSdcIiArIHBvc2l0aW9uVmVydGljYWxlICsgXCInXSAuaWNvbltjYXNlPSdcIiArIHBvc2l0aW9uSG9yaXpvbnRhbGUgKyBcIiddXCIpLnJlcGxhY2VXaXRoKHRoaXMuc2VhcmNoUGllY2UoY291bGV1ciwgcG9zaXRpb25Ib3Jpem9udGFsZSkpO1xyXG4gICAgJChcIi5yb3dbdmFsPSdcIiArIHBvc2l0aW9uVmVydGljYWxlICsgXCInXSAuaWNvbltjYXNlPSdcIiArIHBvc2l0aW9uSG9yaXpvbnRhbGUgKyBcIiddXCIpLmF0dHIoXCJ0ZWFtXCIsIGNvdWxldXIpO1xyXG4gICAgaWYgKGNvdWxldXIgPT0gJ3llbGxvdycpIHtcclxuICAgICAgdGhpcy5zZXRQaW9uKDIsIG5ldyBKZXRvbihwb3NpdGlvbkhvcml6b250YWxlLCBwb3NpdGlvblZlcnRpY2FsZSkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZXRQaW9uKDEsIG5ldyBKZXRvbihwb3NpdGlvbkhvcml6b250YWxlLCBwb3NpdGlvblZlcnRpY2FsZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgZ2V0UG9zaXRpb25Ib3Jpem9udGFsZShldmVudDogc3RyaW5nfEpRdWVyeTxhbnk+KSB7XHJcbiAgICByZXR1cm4gJChldmVudCkucGFyZW50KCkuaW5kZXgoKSArIDE7XHJcbiAgfVxyXG4gIHB1YmxpYyBhZGRQaW9uKGluZGV4SG9yaXpvbnRhbGVDbGlja2VkOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSA9IHRoaXMuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICAgIGxldCBwbGFjZUlzTm90VGFrZW4gPSB0cnVlO1xyXG4gICAgbGV0IGluZGV4VmVydGljYWxlID0gdGFpbGxlVmVydGljYWxlO1xyXG4gICAgaWYgKHRoaXMubW9uVG91ci5nZXQoKSkge1xyXG4gICAgICB3aGlsZSAoaW5kZXhWZXJ0aWNhbGUgPiAwICYmIHBsYWNlSXNOb3RUYWtlbikge1xyXG4gICAgICAgIGxldCBjb3VsZXVyRHVQaW9uID0gdGhpcy5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleEhvcml6b250YWxlQ2xpY2tlZCwgaW5kZXhWZXJ0aWNhbGUpO1xyXG4gICAgICAgIGlmICghY291bGV1ckR1UGlvbikge1xyXG4gICAgICAgICAgcGxhY2VJc05vdFRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLm1vblRvdXIuc2V0KGZhbHNlKTtcclxuICAgICAgICAgIHRoaXMudW5TZWxlY3QoKTtcclxuICAgICAgICAgIHRoaXMuZm9yY2VBZGRQaW9uKGluZGV4SG9yaXpvbnRhbGVDbGlja2VkLCBpbmRleFZlcnRpY2FsZSwgXCJyZWRcIilcclxuICAgICAgICAgIGxldCBsZXNQaW9uc0dhZ25hbnRzID0gV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLCBcInJlZFwiKTtcclxuICAgICAgICAgIGlmIChsZXNQaW9uc0dhZ25hbnRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0V2lubmVyKCdyZWQnLCBsZXNQaW9uc0dhZ25hbnRzKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0RyYXcoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFdpbm5lcihudWxsLCBudWxsKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3QoaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1lc3NhZ2UoXCJBdSB0b3VyIGRlIGwnYWR2ZXJzYWlyZSFcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGdhbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICBjb25zdCBhdWRpbyA9IG5ldyBBdWRpbygnLi4vLi4vcHVibGljL2F1ZGlvL3BvcC5tcDQnKTtcclxuICAgICAgICAgICAgICBhdWRpby5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgY29uc3Qgcm9ib3RNYW5hZ2VyID0gUm9ib3RNYW5hZ2VyLmdldFJvYm90TWFuYWdlcihnYW1lKVxyXG4gICAgICAgICAgICAgIGlmIChyb2JvdE1hbmFnZXIucm9ib3RQbGFjZVVuUGlvbihcInllbGxvd1wiKSkge1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5zZXRNZXNzYWdlKFwiVHUgYXMgcGVyZHUgbGEgcGFydGllICFcIik7XHJcbiAgICAgICAgICAgICAgICBnYW1lLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiUGVyZHUgIVwiKTtcclxuICAgICAgICAgICAgICAgIGdhbWUubW9uVG91ci5zZXQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS51blNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleEhvcml6b250YWxlQ2xpY2tlZCwgaW5kZXhWZXJ0aWNhbGUgKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAvLyBTaSBsZSByb2JvdCBhIGpvdcOpIHN1ciBsYSBtw6ptZSBjb2xvbm5lLCBvbiBhY3R1YWxpc2UgbGEgc8OpbGVjdGlvblxyXG4gICAgICAgICAgICAgICAgICBnYW1lLnNlbGVjdChpbmRleEhvcml6b250YWxlQ2xpY2tlZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnYW1lLm1vblRvdXIuc2V0KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5zZXRNZXNzYWdlKFwiQSB0b24gdG91ciAhXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleFZlcnRpY2FsZS0tO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubG9nKFxyXG4gICAgICAgIFwiUHVpc3NhbmNlIDRcIixcclxuICAgICAgICBcIkpldG9uIGVuIFg6XCIgKyBpbmRleEhvcml6b250YWxlQ2xpY2tlZCArIFwiIFk6XCIgKyAoaW5kZXhWZXJ0aWNhbGUgKyAxKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgc2V0UGlvbih0ZWFtOiBzdHJpbmd8bnVtYmVyLCB2YWx1ZTogSmV0b24pIHtcclxuICAgIGlmICh0ZWFtID09IDEgfHwgdGVhbSA9PSAncmVkJykge1xyXG4gICAgICB0aGlzLmxpc3RlUGlvbnNSb3VnZS5wdXNoKHZhbHVlKTtcclxuICAgIH0gZWxzZSBpZiAodGVhbSA9PSAyIHx8IHRlYW0gPT0gJ3llbGxvdycpIHtcclxuICAgICAgdGhpcy5saXN0ZVBpb25zSmF1bmUucHVzaCh2YWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMZSBqb3VldXIgZXN0IGludHJvdXZhYmxlXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgcmVtb3ZlUGlvbih0ZWFtOiBzdHJpbmd8bnVtYmVyLCB2YWx1ZTogSmV0b24pIHtcclxuICAgIGxldCBpbmRleDtcclxuICAgIGlmICh0ZWFtID09IDEgfHwgdGVhbSA9PSAncmVkJykge1xyXG4gICAgICBpbmRleCA9IFV0aWxzLmdldEluZGV4T2YyREFycmF5KHRoaXMubGlzdGVQaW9uc1JvdWdlLCB2YWx1ZSlcclxuICAgICAgdGhpcy5saXN0ZVBpb25zUm91Z2Uuc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgfSBlbHNlIGlmICh0ZWFtID09IDIgfHwgdGVhbSA9PSAneWVsbG93Jykge1xyXG4gICAgICBpbmRleCA9IFV0aWxzLmdldEluZGV4T2YyREFycmF5KHRoaXMubGlzdGVQaW9uc0phdW5lLCB2YWx1ZSlcclxuICAgICAgdGhpcy5saXN0ZVBpb25zSmF1bmUuc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgXCJMZSBqb3VldXIgZXN0IGludHJvdXZhYmxlXCI7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBjbGVhclBpb25zKCkge1xyXG4gICAgdGhpcy5saXN0ZVBpb25zUm91Z2UgPSBbXTtcclxuICAgIHRoaXMubGlzdGVQaW9uc0phdW5lID0gW107XHJcbiAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiTGVzIGRvbm7DqWVzIGRlcyBwaW9ucyBvbnQgw6l0w6kgZWZmYWPDqXNcIik7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRQaW9ucyh0ZWFtOiBzdHJpbmd8bnVtYmVyKSB7XHJcbiAgICBpZiAodGVhbSA9PSAxIHx8IHRlYW0gPT0gJ3JlZCcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVQaW9uc1JvdWdlO1xyXG4gICAgfSBlbHNlIGlmICh0ZWFtID09IDIgfHwgdGVhbSA9PSAneWVsbG93Jykge1xyXG4gICAgICByZXR1cm4gdGhpcy5saXN0ZVBpb25zSmF1bmU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBcIkxlIGpvdWV1ciBlc3QgaW50cm91dmFibGVcIjtcclxuICAgIH1cclxuICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgTW9uVG91ciB7XHJcbiAgc2V0KG1vblRvdXIpIHtcclxuICAgIHRoaXMubW9uVG91ciA9IG1vblRvdXJcclxuICB9XHJcbiAgZ2V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubW9uVG91clxyXG4gIH1cclxufSIsImV4cG9ydCBjbGFzcyBVdGlscyB7XHJcbiAgc3RhdGljIGdldEVudGllckFsZWF0b2lyZShtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKTtcclxuICB9XHJcbiAgXHJcbiAgc3RhdGljIGdldEVsZW1lbnRBbGVhdG9pcmUobGlzdGUpIHtcclxuICAgIGxldCBsb25ndWV1ckxpc3RlID0gbGlzdGUubGVuZ3RoO1xyXG4gICAgbGV0IGVudGllckFsZWF0b2lyZUluZGV4ZVBhckxpc3RlID0gVXRpbHMuZ2V0RW50aWVyQWxlYXRvaXJlKDAsIGxvbmd1ZXVyTGlzdGUpO1xyXG4gICAgcmV0dXJuIGxpc3RlW2VudGllckFsZWF0b2lyZUluZGV4ZVBhckxpc3RlXTtcclxuICB9XHJcbiAgXHJcbiAgc3RhdGljIGFycmF5MkRDb250YWluc0FycmF5KGFycmF5MkQsIGFycmF5U2VhcmNoKSB7XHJcbiAgICBsZXQgaXRlbVN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGFycmF5U2VhcmNoKTtcclxuICAgIGxldCBjb250YWlucyA9IGFycmF5MkQuc29tZShmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShlbGVtZW50KSA9PT0gaXRlbVN0cmluZztcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNvbnRhaW5zO1xyXG4gIH1cclxuICBcclxuICBzdGF0aWMgZ2V0SW5kZXhPZjJEQXJyYXkoYXJyYXkyRCwgaW5kZXgpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkyRC5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgY3VycmVudEFycmF5ID0gYXJyYXkyRFtpXTtcclxuICAgICAgaWYgKGN1cnJlbnRBcnJheVswXSA9PSBpbmRleFswXSAmJiBjdXJyZW50QXJyYXlbMV0gPT0gaW5kZXhbMV0pIHtcclxuICAgICAgICByZXR1cm4gaTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldENvdWxldXJFcXVpcGVBbGVhdG9pcmUoKSB7XHJcbiAgICBsZXQgbGlzdGVEZUNvdWxldXJzID0gW1wieWVsbG93XCIsIFwicmVkXCJdO1xyXG4gICAgbGV0IG5vbWJyZUFsZWF0b2lyZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxpc3RlRGVDb3VsZXVycy5sZW5ndGgpO1xyXG4gICAgcmV0dXJuIGxpc3RlRGVDb3VsZXVyc1tub21icmVBbGVhdG9pcmVdO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldENvdWxldXJFcXVpcGVBZHZlcnNlKGNvdWxldXJFcXVpcGVBY3R1ZWxsZSkge1xyXG4gICAgaWYgKGNvdWxldXJFcXVpcGVBY3R1ZWxsZSA9PSAncmVkJykge1xyXG4gICAgICByZXR1cm4gJ3llbGxvdyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJ3JlZCc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGFyc2VVUkxQYXJhbXModXJsKSB7XHJcbiAgICB2YXIgcXVlcnlTdGFydCA9IHVybC5pbmRleE9mKFwiP1wiKSArIDEsXHJcbiAgICAgICAgcXVlcnlFbmQgICA9IHVybC5pbmRleE9mKFwiI1wiKSArIDEgfHwgdXJsLmxlbmd0aCArIDEsXHJcbiAgICAgICAgcXVlcnkgPSB1cmwuc2xpY2UocXVlcnlTdGFydCwgcXVlcnlFbmQgLSAxKSxcclxuICAgICAgICBwYWlycyA9IHF1ZXJ5LnJlcGxhY2UoL1xcKy9nLCBcIiBcIikuc3BsaXQoXCImXCIpLFxyXG4gICAgICAgIHBhcm1zID0ge30sIGksIG4sIHYsIG52O1xyXG5cclxuICAgIGlmIChxdWVyeSA9PT0gdXJsIHx8IHF1ZXJ5ID09PSBcIlwiKSByZXR1cm47XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbnYgPSBwYWlyc1tpXS5zcGxpdChcIj1cIiwgMik7XHJcbiAgICAgICAgbiA9IGRlY29kZVVSSUNvbXBvbmVudChudlswXSk7XHJcbiAgICAgICAgdiA9IGRlY29kZVVSSUNvbXBvbmVudChudlsxXSk7XHJcblxyXG4gICAgICAgIGlmICghcGFybXMuaGFzT3duUHJvcGVydHkobikpIHBhcm1zW25dID0gW107XHJcbiAgICAgICAgcGFybXNbbl0ucHVzaChudi5sZW5ndGggPT09IDIgPyB2IDogbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFybXM7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENoZWNrSWZXaW5uZXIgfSBmcm9tIFwiLi9DaGVja0lmV2lubmVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgV2lubmVyTWFuYWdlciB7XHJcbiAgc3RhdGljIHZlcmlmV2luKGdhbWUsIGNvbG9yKSB7XHJcbiAgICBsZXQgdmVyaWZpY2F0aW9uID0gQ2hlY2tJZldpbm5lci5ob3Jpem9udGFsKGdhbWUsIGNvbG9yKTtcclxuICAgIGlmICh2ZXJpZmljYXRpb24pIHtcclxuICAgICAgcmV0dXJuIHZlcmlmaWNhdGlvbjtcclxuICAgIH1cclxuICAgIHZlcmlmaWNhdGlvbiA9IENoZWNrSWZXaW5uZXIudmVydGljYWwoZ2FtZSwgY29sb3IpO1xyXG4gICAgaWYgKHZlcmlmaWNhdGlvbikge1xyXG4gICAgICByZXR1cm4gdmVyaWZpY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgdmVyaWZpY2F0aW9uID0gQ2hlY2tJZldpbm5lci5kaWFnb25hbFRvcExlZnQoZ2FtZSwgY29sb3IpO1xyXG4gICAgaWYgKHZlcmlmaWNhdGlvbikge1xyXG4gICAgICByZXR1cm4gdmVyaWZpY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgdmVyaWZpY2F0aW9uID0gQ2hlY2tJZldpbm5lci5kaWFnb25hbFRvcFJpZ2h0KGdhbWUsIGNvbG9yKTtcclxuICAgIGlmICh2ZXJpZmljYXRpb24pIHtcclxuICAgICAgcmV0dXJuIHZlcmlmaWNhdGlvbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyB2ZXJpZklmUGlvblBsYWNlZEdpdmVXaW4oZ2FtZSwgbnVtZXJvQ29sb25uZUhvcml6b250YWxlLCBudW1lcm9Db2xvbm5lVmVydGljYWxlLCBjb3VsZXVyUGlvbikge1xyXG4gICAgZ2FtZS5zZXRQaW9uKGNvdWxldXJQaW9uLCBbbnVtZXJvQ29sb25uZUhvcml6b250YWxlLCBudW1lcm9Db2xvbm5lVmVydGljYWxlXSlcclxuICAgIGNvbnN0IGlzV2lubmVyID0gV2lubmVyTWFuYWdlci52ZXJpZldpbihnYW1lLCBjb3VsZXVyUGlvbilcclxuICAgIGdhbWUucmVtb3ZlUGlvbihjb3VsZXVyUGlvbiwgW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pXHJcbiAgICByZXR1cm4gaXNXaW5uZXI7XHJcbiAgfVxyXG5cclxufSIsImV4cG9ydCBjbGFzcyBDaGVja0lmV2lubmVyIHtcclxuICBzdGF0aWMgaG9yaXpvbnRhbChnYW1lLCBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgICA9IGdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcbiAgICAvLyBWw6lyaWZpY2F0aW9uIGVuIGhvcml6b250YWxcclxuICAgIGxldCBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgIGxldCBjb3VsZXVyRHVQaW9uO1xyXG4gICAgbGV0IG5iUGlvbnNHYWduYW50cztcclxuICAgIGZvciAobGV0IGluZGV4VmVydGljYWxlID0gMTsgaW5kZXhWZXJ0aWNhbGUgPD0gdGFpbGxlVmVydGljYWxlOyBpbmRleFZlcnRpY2FsZSsrKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gMTsgaW5kZXhIb3Jpem9udGFsZSA8PSB0YWlsbGVIb3Jpem9udGFsZTsgaW5kZXhIb3Jpem9udGFsZSsrKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZSwgaW5kZXhWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKGNvdWxldXJEdVBpb24gPT0gY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhWZXJ0aWNhbGUsIGluZGV4SG9yaXpvbnRhbGVdKTtcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgc3RhdGljIHZlcnRpY2FsIChnYW1lLCBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgICA9IGdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcbiAgICAvLyBQYXJjb3VycyBkZSBjaGFxdWUgY2FzZSBob3Jpem9udGFsZSBkdSBqZXVcclxuICAgIGxldCBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgIGxldCBjb3VsZXVyRHVQaW9uO1xyXG4gICAgbGV0IG5iUGlvbnNHYWduYW50cztcclxuICAgIGZvciAobGV0IGluZGV4SG9yaXpvbnRhbGUgPSAxOyBpbmRleEhvcml6b250YWxlIDw9IHRhaWxsZUhvcml6b250YWxlOyBpbmRleEhvcml6b250YWxlKyspIHtcclxuICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgIC8vIFBhcmNvdXJzIGNoYXF1ZSBjYXNlIHZlcnRpY2FsZSBkZSBsYSBjb2xvbm5lXHJcbiAgICAgIGZvciAobGV0IGluZGV4VmVydGljYWxlID0gMTsgaW5kZXhWZXJ0aWNhbGUgPD0gdGFpbGxlVmVydGljYWxlOyBpbmRleFZlcnRpY2FsZSsrKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZSwgaW5kZXhWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKGNvdWxldXJEdVBpb24gPT0gY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzLnB1c2goW2luZGV4VmVydGljYWxlLCBpbmRleEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBkaWFnb25hbFRvcExlZnQgKGdhbWUsIGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSAgID0gZ2FtZS5nZXRUYWlsbGVWZXJ0aWNhbGUoKVxyXG4gICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGUgPSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKClcclxuXHJcbiAgICBsZXQgY291bGV1ckR1UGlvbiwgbmJQaW9uc0dhZ25hbnRzO1xyXG4gICAgbGV0IGluZGV4Q291cmFudEhvcml6b250YWxlO1xyXG4gICAgbGV0IGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgbGV0IGluZGV4Q291cmFudFZlcnRpY2FsZSA9IDQ7XHJcblxyXG4gICAgLy8gUGFyY291cnMgdG91dGVzIGxlcyBkaWFnb25hbGVzIMOgIGdhdWNoZXMgw6AgcGFydGlyIGRlIDQuXHJcbiAgICBmb3IgKGxldCBpbmRleFZlcnRpY2FsZSA9IDQ7IGluZGV4VmVydGljYWxlIDw9IHRhaWxsZVZlcnRpY2FsZTsgaW5kZXhWZXJ0aWNhbGUrKykge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPSAxO1xyXG4gICAgICBcclxuICAgICAgLy8gVsOpcmlmaWVyIGxhIGxpZ25lIGVuIGRpYWdvbmFsZVxyXG4gICAgICB3aGlsZSAoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPD0gdGFpbGxlSG9yaXpvbnRhbGUgJiYgaW5kZXhDb3VyYW50VmVydGljYWxlID49IDEpIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleENvdXJhbnRIb3Jpem9udGFsZSwgaW5kZXhDb3VyYW50VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleENvdXJhbnRWZXJ0aWNhbGUsIGluZGV4Q291cmFudEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZS0tO1xyXG4gICAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlKys7XHJcbiAgICAgIH1cclxuICAgICAgaW5kZXhDb3VyYW50VmVydGljYWxlID0gaW5kZXhWZXJ0aWNhbGUgKyAxO1xyXG4gICAgfVxyXG5cclxuICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4SG9yaXpvbnRhbGUgPSAyOyBpbmRleEhvcml6b250YWxlIDw9ICh0YWlsbGVIb3Jpem9udGFsZS00KTsgaW5kZXhIb3Jpem9udGFsZSsrKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSA9IGluZGV4SG9yaXpvbnRhbGU7XHJcbiAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZSA9IHRhaWxsZVZlcnRpY2FsZTtcclxuICAgICAgLy8gVsOpcmlmaWVyIGxhIGxpZ25lIGVuIGRpYWdvbmFsZVxyXG4gICAgICB3aGlsZSAoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPD0gdGFpbGxlSG9yaXpvbnRhbGUgJiYgaW5kZXhDb3VyYW50VmVydGljYWxlID49IDEpIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleENvdXJhbnRIb3Jpem9udGFsZSwgaW5kZXhDb3VyYW50VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleENvdXJhbnRWZXJ0aWNhbGUsIGluZGV4Q291cmFudEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZS0tO1xyXG4gICAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlKys7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZGlhZ29uYWxUb3BSaWdodChnYW1lLCBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgICA9IGdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcblxyXG4gICAgbGV0IGNvdWxldXJEdVBpb24sIG5iUGlvbnNHYWduYW50cztcclxuICAgIGxldCBpbmRleENvdXJhbnRIb3Jpem9udGFsZTtcclxuICAgIGxldCBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuXHJcbiAgICAvLyBQYXJjb3VycyB0b3V0ZXMgbGVzIGRpYWdvbmFsZXMgw6AgZ2F1Y2hlcyDDoCBwYXJ0aXIgZGUgNC5cclxuICAgIGZvciAobGV0IGluZGV4VmVydGljYWxlID0gNDsgaW5kZXhWZXJ0aWNhbGUgPD0gdGFpbGxlVmVydGljYWxlOyBpbmRleFZlcnRpY2FsZSsrKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSA9IHRhaWxsZUhvcml6b250YWxlO1xyXG4gICAgICBsZXQgaW5kZXhDb3VyYW50VmVydGljYWxlID0gaW5kZXhWZXJ0aWNhbGU7XHJcbiAgICAgIC8vIFbDqXJpZmllciBsYSBsaWduZSBlbiBkaWFnb25hbGVcclxuICAgICAgd2hpbGUgKGluZGV4Q291cmFudEhvcml6b250YWxlID49IDEgJiYgaW5kZXhDb3VyYW50VmVydGljYWxlID49IDEpIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleENvdXJhbnRIb3Jpem9udGFsZSwgaW5kZXhDb3VyYW50VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleENvdXJhbnRWZXJ0aWNhbGUsIGluZGV4Q291cmFudEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlLS07XHJcbiAgICAgICAgaW5kZXhDb3VyYW50VmVydGljYWxlLS07XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gKHRhaWxsZUhvcml6b250YWxlIC0gMSk7IGluZGV4SG9yaXpvbnRhbGUgPj0gNDsgaW5kZXhIb3Jpem9udGFsZS0tKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSA9IGluZGV4SG9yaXpvbnRhbGU7XHJcbiAgICAgIGxldCBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPSB0YWlsbGVWZXJ0aWNhbGU7XHJcbiAgICAgIC8vIFbDqXJpZmllciBsYSBsaWduZSBlbiBkaWFnb25hbGVcclxuICAgICAgd2hpbGUgKGluZGV4Q291cmFudEhvcml6b250YWxlID49IDEgJiYgaW5kZXhDb3VyYW50VmVydGljYWxlID49IDEpIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleENvdXJhbnRIb3Jpem9udGFsZSwgaW5kZXhDb3VyYW50VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleENvdXJhbnRWZXJ0aWNhbGUsIGluZGV4Q291cmFudEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZS0tO1xyXG4gICAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCB7IFdpbm5lck1hbmFnZXIgfSBmcm9tIFwiLi9XaW5uZXJNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUm9ib3RNYW5hZ2VyIHtcclxuICBjb25zdHJ1Y3RvcihnYW1lKSB7XHJcbiAgICBpZiAoZ2FtZSkge1xyXG4gICAgICB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXUgPSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKCk7XHJcbiAgICAgIHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXUgICA9IGdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKCk7XHJcbiAgICAgIHRoaXMuZ2FtZSA9IGdhbWVcclxuICAgICAgUm9ib3RNYW5hZ2VyLnJvYm90TWFuYWdlciA9IHRoaXNcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkF1Y3VuZSBwYXJ0aWUgZMOpZmluaXRcIilcclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldFJvYm90TWFuYWdlcihnYW1lKSB7XHJcbiAgICBpZiAoUm9ib3RNYW5hZ2VyLnJvYm90TWFuYWdlcikge1xyXG4gICAgICByZXR1cm4gUm9ib3RNYW5hZ2VyLnJvYm90TWFuYWdlclxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG5ldyBSb2JvdE1hbmFnZXIoZ2FtZSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxhbmNlVW5lUGFydGllRGVSb2JvdHMoKSB7XHJcbiAgICB0aGlzLmdhbWUuc2V0TWVzc2FnZShcIlJvYm90IFZzLiBSb2JvdFwiKTtcclxuICAgIHRoaXMuZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgdGhpcy5nYW1lLmVuYWJsZUdhbWUoKVxyXG4gICAgdGhpcy5nYW1lLm1vblRvdXIuc2V0KGZhbHNlKVxyXG4gICAgLy8gT24gY2hvaXNpcyB1bmUgw6lxdWlwZSBxdWkgY29tbWVuY2UgYWzDqWF0b2lyZW1lbnRcclxuICAgIGNvbnN0IGNvbG9yID0gVXRpbHMuZ2V0Q291bGV1ckVxdWlwZUFsZWF0b2lyZSgpO1xyXG4gICAgLy8gT24gbGFuY2UgbGEgcGFydGllXHJcbiAgICB0aGlzLnJvYm90VnNSb2JvdChjb2xvcik7XHJcbiAgfVxyXG5cclxuICByb2JvdFZzUm9ib3QoY29sb3IpIHtcclxuICAgIC8vIFNpIGxhIHBhcnRpZSBuJ2VzdCBwYXMgdGVybWluw6lcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgaWYgKCF0aGlzLnJvYm90UGxhY2VVblBpb24oY29sb3IpKVxyXG4gICAge1xyXG4gICAgICAvLyBPbiBmYWlzIGpvdWVyIGwnw6lxdWlwZSBhZHZlcnNlXHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoYXQucm9ib3RWc1JvYm90KFV0aWxzLmdldENvdWxldXJFcXVpcGVBZHZlcnNlKGNvbG9yKSlcclxuICAgICAgfSwgNSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJvYm90UGxhY2VVblBpb24oY29sb3IpIHtcclxuICAgIGNvbnN0IGdhbWUgPSB0aGlzLmdhbWU7XHJcbiAgICAvLyBPbiByw6ljdXDDqHJlIGxhIGxpc3RlIGRlcyBjb2xvbm5lcyBxdWkgbidvbnQgcGFzIGxldXJzXHJcbiAgICAvLyBjb2xvbm5lcyBjb21wbMOpdMOpcy5cclxuICAgIGNvbnN0IGxpc3RlQ29sb25uZXNOb25Db21wbGV0ZXMgPSBnYW1lLmdldExlc0NvbG9ubmVzTm9uQ29tcGxldGVzKCk7XHJcbiAgICBsZXQgY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50ID0gVXRpbHMuZ2V0RWxlbWVudEFsZWF0b2lyZShsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzKTtcclxuICAgIGNvbnN0IGxlc0Nhc2VzUG91dmFudEV0cmVKb3VlciAgPSBnYW1lLmdldExlc0Nhc2VzUG91dmFudEV0cmVKb3VlcigpO1xyXG4gICAgbGVzQ2FzZXNQb3V2YW50RXRyZUpvdWVyLmZvckVhY2goY2FzZVBvdXZhbnRFdHJlSm91ZXIgPT4ge1xyXG4gICAgICBsZXQgaW5kaWNlSG9yaXpvbnRhbGUgPSBjYXNlUG91dmFudEV0cmVKb3VlclswXTtcclxuICAgICAgbGV0IGluZGljZVZlcnRpY2FsZSAgID0gY2FzZVBvdXZhbnRFdHJlSm91ZXJbMV07XHJcbiAgICAgIGlmIChXaW5uZXJNYW5hZ2VyLnZlcmlmSWZQaW9uUGxhY2VkR2l2ZVdpbihnYW1lLCBpbmRpY2VIb3Jpem9udGFsZSwgaW5kaWNlVmVydGljYWxlLCBjb2xvcikpIHtcclxuICAgICAgICBjb2xvbm5lQ2hvaXNpdEFsZWF0b2lyZW1lbnQgPSBpbmRpY2VIb3Jpem9udGFsZTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChXaW5uZXJNYW5hZ2VyLnZlcmlmSWZQaW9uUGxhY2VkR2l2ZVdpbihnYW1lLCBpbmRpY2VIb3Jpem9udGFsZSwgaW5kaWNlVmVydGljYWxlLCBVdGlscy5nZXRDb3VsZXVyRXF1aXBlQWR2ZXJzZShjb2xvcikpKSB7XHJcbiAgICAgICAgY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50ID0gaW5kaWNlSG9yaXpvbnRhbGU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgICBcclxuICAgIGlmICghbGVzQ2FzZXNQb3V2YW50RXRyZUpvdWVyIHx8IGxlc0Nhc2VzUG91dmFudEV0cmVKb3Vlci5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy5nYW1lLnNldFdpbm5lcihudWxsLCBudWxsKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgYm91Y2xlQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgbGV0IGluZGljZVRhaWxsZVZlcnRpY2FsZSA9IHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXU7XHJcbiAgICAgIHdoaWxlIChpbmRpY2VUYWlsbGVWZXJ0aWNhbGUgPiAwICYmIGJvdWNsZUFjdGl2ZSkge1xyXG4gICAgICAgIGxldCBjb3VsZXVyRHVQaW9uUGxhY2UgPSB0aGlzLmdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50LCBpbmRpY2VUYWlsbGVWZXJ0aWNhbGUpO1xyXG4gICAgICAgIGlmICghY291bGV1ckR1UGlvblBsYWNlKSB7XHJcbiAgICAgICAgICBib3VjbGVBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuZ2FtZS5mb3JjZUFkZFBpb24oY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50LCBpbmRpY2VUYWlsbGVWZXJ0aWNhbGUsIGNvbG9yKVxyXG4gICAgICAgICAgLy9ham91dGVVblBpb25EYW5zQmRkKGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCwgaW5kaWNlVGFpbGxlVmVydGljYWxlLCBjb2xvcik7XHJcbiAgICAgICAgICBjb25zdCBpc1dpbm5lciA9IFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCBjb2xvcik7XHJcbiAgICAgICAgICBpZiAoaXNXaW5uZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLnNldFdpbm5lcihjb2xvciwgaXNXaW5uZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kaWNlVGFpbGxlVmVydGljYWxlLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG59IiwiZXhwb3J0IGNsYXNzIEpldG9uIHtcclxuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbkhvcml6b250YWxlLCBwb3NpdGlvblZlcnRpY2FsZSkge1xyXG4gICAgdGhpcy5wb3NpdGlvbkhvcml6b250YWxlID0gcG9zaXRpb25Ib3Jpem9udGFsZTtcclxuICAgIHRoaXMucG9zaXRpb25WZXJ0aWNhbGUgICA9IHBvc2l0aW9uVmVydGljYWxlO1xyXG4gIH1cclxufSIsImltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9HYW1lXCJcclxuaW1wb3J0IHsgVGVzdHNVbml0cyB9IGZyb20gXCIuL1Rlc3RzVW5pdHNcIlxyXG5pbXBvcnQgeyBSb2JvdE1hbmFnZXIgfSBmcm9tIFwiLi9Sb2JvdE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBham91dGVVblBpb25EYW5zQmRkKHB4OiBudW1iZXIsIHB5OiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHtcclxuICBsZXQgZ2FtZUlkID0gNDtcclxuICAkLnBvc3QoXCIvYXBpL3Bpb25zL3NldExpc3QvXCIsIHtcclxuICAgIGlkOiBnYW1lSWQsXHJcbiAgICBQeDogcHgsXHJcbiAgICBQeTogcHksXHJcbiAgICBDb2xvcjogY29sb3JcclxuICB9KVxyXG4gICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGVzdHNVbml0cygpIHtcclxuICBsZXQgdGVzdHNVbml0cyA9IG5ldyBUZXN0c1VuaXRzKEdhbWUuZ2V0R2FtZSgpKTtcclxuICB0ZXN0c1VuaXRzLmxhdW5jaFRlc3RzVW5pdHMoKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGxheUdhbWUoKSB7XHJcbiAgR2FtZS5nZXRHYW1lKCkucGxheUdhbWUoKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbGFuY2VVbmVQYXJ0aWVEZVJvYm90cygpIHtcclxuICBjb25zdCByb2JvdE1hbmFnZXIgPSBSb2JvdE1hbmFnZXIuZ2V0Um9ib3RNYW5hZ2VyKEdhbWUuZ2V0R2FtZSgpKVxyXG4gIHJvYm90TWFuYWdlci5sYW5jZVVuZVBhcnRpZURlUm9ib3RzKClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5QYXJhbSgpIHtcclxuICAkKCcjZGlhbG9nJykucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICg8YW55PiQoXCIjZGlhbG9nXCIpKS5kaWFsb2coe1xyXG4gICAgcmVzaXphYmxlOiBmYWxzZSxcclxuICAgIGhlaWdodDogXCJhdXRvXCIsXHJcbiAgICB3aWR0aDogNDAwLFxyXG4gICAgbW9kYWw6IHRydWUsXHJcbiAgICBidXR0b25zOiB7XHJcbiAgICAgIFwiVmFsaWRlclwiOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIiNwYXJhbWV0ZXJzVmFsdWVzXCIpLnN1Ym1pdCgpO1xyXG4gICAgICAgICg8YW55PiQodGhpcykpLmRpYWxvZyhcImNsb3NlXCIpXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiRmVybWVyXCI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAoPGFueT4kKHRoaXMpKS5kaWFsb2coXCJjbG9zZVwiKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRQYXJhbSgpIHtcclxuICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShcclxuICAgICc/eD0nICsgJCgnI25iQ2FzZVgnKS52YWwoKSArICcmeT0nICsgJCgnI25iQ2FzZVknKS52YWwoKVxyXG4gIClcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgVGVzdHNVbml0cyB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xyXG4gICAgaWYgKGdhbWUpIHtcclxuICAgICAgdGhpcy5nYW1lID0gZ2FtZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXVjdW5lIHBhcnRpZSBmb3Vybml0XCIpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGxhdW5jaFRlc3RzVW5pdHMgKCkge1xyXG4gICAgdGhpcy5kZWZhdWx0VGFpbGxlSG9yaXpvbnRhbGUgPSB0aGlzLmdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKVxyXG4gICAgdGhpcy5kZWZhdWx0VGFpbGxlVmVydGljYWxlICAgPSB0aGlzLmdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuXHJcbiAgICBjb25zdCBsaXN0c1Rlc3RzVW5pdHMgPSBbXVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDEoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQyKCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0MygpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDQoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQ1KCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0NigpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDcoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQ4KCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0OSgpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDEwKCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0MTEoKSlcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGlzdHNUZXN0c1VuaXRzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBsZXQgY29sb3I7XHJcbiAgICAgIGlmIChsaXN0c1Rlc3RzVW5pdHNbaW5kZXhdKSB7XHJcbiAgICAgICAgY29sb3IgPSBcImdyZWVuXCI7XHJcbiAgICAgIH0gIGVsc2Uge1xyXG4gICAgICAgIGNvbG9yID0gXCJyZWRcIjtcclxuICAgICAgfVxyXG4gICAgICBsZXQgbWVzc2FnZSA9IFwiVGVzdCBcIiArIChpbmRleCArIDEpICsgXCIgOiBcIiArIGxpc3RzVGVzdHNVbml0c1tpbmRleF0gKyBcIlxcblwiO1xyXG4gICAgICB0aGlzLmdhbWUubG9nKFwiVGVzdFwiLCBtZXNzYWdlLCBjb2xvcik7XHJcbiAgICAgIFxyXG4gICAgICBcclxuICAgIH1cclxuICAgIHRoaXMucmVzZXRUZXN0cygpO1xyXG4gICAgXHJcblxyXG4gIH1cclxuICByZXNldFRlc3RzKCkge1xyXG4gICAgdGhpcy5nYW1lLnRhaWxsZUhvcml6b250YWxlRHVKZXUgPSB0aGlzLmRlZmF1bHRUYWlsbGVIb3Jpem9udGFsZTtcclxuICAgIHRoaXMuZ2FtZS50YWlsbGVWZXJ0aWNhbGVEdUpldSAgID0gdGhpcy5kZWZhdWx0VGFpbGxlVmVydGljYWxlO1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gIH1cclxuICB0ZXN0VW5pdDEoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHtcInBhcmFtZXRyZXNcIjp7XCJ4XCI6XCI3XCIsXCJ5XCI6XCI1XCJ9LFwiZGF0YXNcIjp7XCJwaW9uc1wiOntcInJlZFwiOltbNCw1XSxbMyw1XSxbMiw1XSxbNiw0XSxbMyw0XSxbNCw0XSxbNyw0XSxbMywzXSxbNCwzXSxbNywzXSxbMSw0XSxbMSwyXSxbMSwxXSxbMiwxXSxbNywyXSxbNSwyXV0sXCJ5ZWxsb3dcIjpbWzEsNV0sWzYsNV0sWzUsNV0sWzcsNV0sWzIsNF0sWzUsNF0sWzIsM10sWzMsMl0sWzQsMl0sWzQsMV0sWzEsM10sWzYsM10sWzIsMl0sWzcsMV0sWzUsM11dfX19XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG4gICAgXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbNSwyXSxbNCwzXSxbMyw0XSxbMiw1XV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCd5ZWxsb3cnKSAmJiBKU09OLnN0cmluZ2lmeShXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwncmVkJykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbiAgdGVzdFVuaXQyKCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7XCJwYXJhbWV0cmVzXCI6e1wieFwiOlwiN1wiLFwieVwiOlwiNVwifSxcImRhdGFzXCI6e1wicGlvbnNcIjp7XCJyZWRcIjpbWzEsNV0sWzMsNV0sWzIsNV0sWzIsM10sWzUsNV0sWzcsNF0sWzIsMV0sWzUsNF1dLFwieWVsbG93XCI6W1s3LDVdLFs0LDVdLFsyLDRdLFs2LDVdLFszLDRdLFsyLDJdLFs0LDRdLFsxLDRdXX19fVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuICAgIFxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzQsMV0sWzQsMl0sWzQsM10sWzQsNF1dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwncmVkJykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3llbGxvdycpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0MygpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0ge1wicGFyYW1ldHJlc1wiOntcInhcIjpcIjdcIixcInlcIjpcIjVcIn0sXCJkYXRhc1wiOntcInBpb25zXCI6e1wicmVkXCI6W1szLDVdLFs3LDVdLFsxLDVdLFs3LDRdLFs1LDRdLFs0LDJdLFsyLDVdLFsxLDRdLFsyLDNdLFs3LDJdLFsyLDJdLFszLDNdLFsxLDNdLFs2LDRdXSxcInllbGxvd1wiOltbNCw1XSxbNSw1XSxbMyw0XSxbNCw0XSxbNCwzXSxbNywzXSxbNCwxXSxbMiw0XSxbNiw1XSxbNywxXSxbNSwzXSxbNSwyXSxbMiwxXSxbMSwyXSxbNiwzXV19fX1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcbiAgICBcclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1szLDRdLFszLDVdLFszLDZdLFszLDddXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3JlZCcpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCd5ZWxsb3cnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDQoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHtcInBhcmFtZXRyZXNcIjp7XCJ4XCI6XCI3XCIsXCJ5XCI6XCI1XCJ9LFwiZGF0YXNcIjp7XCJwaW9uc1wiOntcInJlZFwiOltbNSw1XSxbNSw0XSxbMyw1XSxbNCw1XSxbMSw1XSxbMSw0XSxbNCwzXSxbNiwyXSxbNCwyXSxbMiwzXSxbNSwyXSxbNywzXSxbNSwxXSxbNywxXSxbMiwyXSxbMiwxXSxbMyw0XSxbMywzXV0sXCJ5ZWxsb3dcIjpbWzcsNV0sWzYsNV0sWzYsNF0sWzIsNV0sWzQsNF0sWzcsNF0sWzYsM10sWzUsM10sWzIsNF0sWzQsMV0sWzYsMV0sWzEsM10sWzcsMl0sWzEsMl0sWzEsMV0sWzMsMl0sWzMsMV1dfX19XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG4gICAgXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwncmVkJykgJiYgIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCd5ZWxsb3cnKSlcclxuICB9XHJcbiAgdGVzdFVuaXQ1KCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7XCJwYXJhbWV0cmVzXCI6e1wieFwiOlwiN1wiLFwieVwiOlwiNVwifSxcImRhdGFzXCI6e1wicGlvbnNcIjp7XCJyZWRcIjpbWzMsNV0sWzQsNV0sWzEsNV0sWzcsNV0sWzcsNF0sWzYsMl0sWzUsNV0sWzUsNF0sWzUsMl0sWzIsMl0sWzEsNF0sWzQsM10sWzcsM10sWzQsMl0sWzMsMV0sWzcsMV0sWzEsMl0sWzEsMV1dLFwieWVsbG93XCI6W1s2LDVdLFs2LDRdLFsyLDVdLFsyLDRdLFs2LDNdLFszLDRdLFs2LDFdLFs1LDNdLFsyLDNdLFs0LDRdLFsxLDNdLFszLDNdLFs3LDJdLFszLDJdLFs0LDFdLFsyLDFdLFs1LDFdXX19fVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuICAgIFxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3JlZCcpICYmICFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwneWVsbG93JykpXHJcbiAgfVxyXG4gIHRlc3RVbml0NigpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0ge1wicGFyYW1ldHJlc1wiOntcInhcIjpcIjdcIixcInlcIjpcIjVcIn0sXCJkYXRhc1wiOntcInBpb25zXCI6e1wicmVkXCI6W1szLDVdLFs3LDRdLFs0LDVdLFs1LDRdLFs0LDRdLFsxLDRdLFszLDRdLFs0LDNdLFszLDNdLFs1LDJdLFs2LDRdXSxcInllbGxvd1wiOltbNyw1XSxbNSw1XSxbNywzXSxbMiw1XSxbMSw1XSxbNywyXSxbNSwzXSxbMiw0XSxbNCwyXSxbMywyXSxbNiw1XV19fX1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcbiAgICBcclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s0LDNdLFs0LDRdLFs0LDVdLFs0LDZdXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3llbGxvdycpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCdyZWQnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDcoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHtcInBhcmFtZXRyZXNcIjp7XCJ4XCI6XCI3XCIsXCJ5XCI6XCIxMFwifSxcImRhdGFzXCI6e1wicGlvbnNcIjp7XCJyZWRcIjpbWzYsMTBdLFsyLDEwXSxbNyw5XSxbMSwxMF0sWzUsMTBdLFszLDldLFs2LDhdLFs2LDZdLFs2LDVdLFs3LDddLFs1LDhdLFszLDddLFszLDZdLFs0LDhdLFs2LDNdLFs0LDddLFsxLDhdLFs0LDVdLFsyLDZdLFsyLDRdLFszLDRdLFszLDNdLFsxLDddXSxcInllbGxvd1wiOltbNywxMF0sWzMsMTBdLFs2LDldLFsyLDldLFs0LDEwXSxbMSw5XSxbNyw4XSxbNiw3XSxbNCw5XSxbMiw4XSxbNSw5XSxbMyw4XSxbNyw2XSxbNSw3XSxbNiw0XSxbNSw2XSxbMyw1XSxbNCw2XSxbMiw3XSxbMiw1XSxbNCw0XSxbNiwyXSxbNyw1XSxbMSw2XV19fX1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcbiAgICBcclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s5LDRdLFs4LDNdLFs3LDJdLFs2LDFdXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3JlZCcpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCd5ZWxsb3cnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDgoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHtcInBhcmFtZXRyZXNcIjp7XCJ4XCI6XCIxMVwiLFwieVwiOlwiNlwifSxcImRhdGFzXCI6e1wicGlvbnNcIjp7XCJyZWRcIjpbWzEsNl0sWzUsNl0sWzcsNl0sWzIsNV0sWzExLDZdLFs5LDZdLFs5LDVdLFs4LDNdLFszLDRdLFs0LDZdLFs5LDRdXSxcInllbGxvd1wiOltbOCw2XSxbOCw1XSxbMiw2XSxbNiw2XSxbMyw2XSxbMyw1XSxbOCw0XSxbMSw1XSxbMiw0XSxbNyw1XSxbOSwzXV19fX1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcbiAgICBcclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s2LDZdLFs1LDddLFs0LDhdLFszLDldXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3JlZCcpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCd5ZWxsb3cnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDkoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHtcInBhcmFtZXRyZXNcIjp7XCJ4XCI6XCI0XCIsXCJ5XCI6XCI0XCJ9LFwiZGF0YXNcIjp7XCJwaW9uc1wiOntcInJlZFwiOltbNCw0XSxbMiw0XSxbNCwyXSxbMiwzXSxbNCwxXSxbMiwxXSxbMSwyXSxbMywxXV0sXCJ5ZWxsb3dcIjpbWzEsNF0sWzQsM10sWzMsNF0sWzMsM10sWzIsMl0sWzEsM10sWzMsMl0sWzEsMV1dfX19XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG4gICAgXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwncmVkJykgJiYgIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCd5ZWxsb3cnKSlcclxuICB9XHJcbiAgdGVzdFVuaXQxMCgpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0ge1wicGFyYW1ldHJlc1wiOntcInhcIjpcIjRcIixcInlcIjpcIjRcIn0sXCJkYXRhc1wiOntcInBpb25zXCI6e1wicmVkXCI6W1syLDRdLFszLDRdLFsyLDJdLFsyLDFdLFsxLDNdLFs0LDJdXSxcInllbGxvd1wiOltbNCw0XSxbNCwzXSxbMiwzXSxbMSw0XSxbMywzXSxbMywyXSxbNCwxXV19fX1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcbiAgICBcclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s0LDFdLFszLDJdLFsyLDNdLFsxLDRdXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3JlZCcpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCd5ZWxsb3cnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDExKCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7XCJwYXJhbWV0cmVzXCI6e1wieFwiOlwiOFwiLFwieVwiOlwiN1wifSxcImRhdGFzXCI6e1wicGlvbnNcIjp7XCJyZWRcIjpbWzEsN10sWzYsN10sWzQsNl0sWzgsNl0sWzMsNl0sWzcsN10sWzcsNl0sWzcsNV0sWzUsN10sWzIsN10sWzUsNl0sWzUsNV0sWzUsM10sWzcsM10sWzYsNV1dLFwieWVsbG93XCI6W1s4LDddLFszLDddLFs0LDddLFs0LDVdLFs0LDRdLFsxLDZdLFs4LDVdLFs4LDRdLFs3LDRdLFszLDVdLFs2LDZdLFsyLDZdLFs1LDRdLFszLDRdLFs3LDJdLFs2LDRdXX19fVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuICAgIFxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzQsM10sWzQsNF0sWzQsNV0sWzQsNl1dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwncmVkJykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsJ3llbGxvdycpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vR2FtZVwiXHJcbmltcG9ydCAqIGFzIG1vZHVsZXMgZnJvbSAnLi9nYW1lX21hbmFnZXIuaW5jJztcclxuXHJcbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCQpIHtcclxuXHJcbiAgY29uc3QgZ2FtZSA9IEdhbWUuZ2V0R2FtZSgpXHJcbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgJChcIiNwbGF5QnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHsgZ2FtZS5wbGF5R2FtZSgpIH0pXHJcbiAgICAkKFwiI3JvYm90QnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHsgbW9kdWxlcy5sYW5jZVVuZVBhcnRpZURlUm9ib3RzKCkgfSlcclxuICAgICQoXCIjb3B0aW9uc0J1dHRvblwiKS5jbGljayhmdW5jdGlvbiAoKSB7IG1vZHVsZXMub3BlblBhcmFtKCkgfSlcclxuICB9KVxyXG4gICQoXCJodG1sXCIpLm9uKFwia2V5ZG93blwiLCBcImJvZHlcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgIGlmIChnYW1lLm1vblRvdXIuZ2V0KCkpIHtcclxuICAgICAgY29uc3Qga2V5ID0gKDxhbnk+ZXZlbnQpLmtleUNvZGU7XHJcbiAgICAgIGlmICgkKFwiI2dhbWUgLnJvdyAuaWNvbltzdXJicmlsbGFuY2U9J3JlZCddXCIpLmxlbmd0aCA+PSAxICYmICFnYW1lLmlzRHJhdygpKSB7XHJcbiAgICAgICAgY29uc3QgcGlvbkVuU3VyYnJpbGxhbmNlID0gJChcIiNnYW1lIC5yb3cgLmljb25bc3VyYnJpbGxhbmNlPSdyZWQnXVwiKTtcclxuICAgICAgICBsZXQgaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA9IHBhcnNlSW50KHBpb25FblN1cmJyaWxsYW5jZS5hdHRyKFwiY2FzZVwiKSk7XHJcbiAgICAgICAgaWYgKGluZGV4SG9yaXpvbnRhbGVEdVBpb24pIHtcclxuICAgICAgICAgICQoXCIjZ2FtZSAucm93IC5pY29uXCIpLm1vdXNlb3V0KCk7XHJcbiAgICAgICAgICBpZiAoa2V5ID09IDM5KSB7XHJcbiAgICAgICAgICAgIC8vIGZsw6hjaGUgZHJvaXRlIDogc2ltdWxhdGlvbiDDoCBkcm9pdGVcclxuICAgICAgICAgICAgaW5kZXhIb3Jpem9udGFsZUR1UGlvbisrO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA+PSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKCkgKyAxKSB7XHJcbiAgICAgICAgICAgICAgaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2hpbGUgKCFnYW1lLmdldExlc0NvbG9ubmVzTm9uQ29tcGxldGVzKCkuaW5jbHVkZXMoaW5kZXhIb3Jpem9udGFsZUR1UGlvbikgJiYgIWdhbWUuaXNEcmF3KCkgJiYgaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA8PSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKCkpIHtcclxuICAgICAgICAgICAgICBpbmRleEhvcml6b250YWxlRHVQaW9uKys7XHJcbiAgICAgICAgICAgICAgaWYgKGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPj0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpICsgMSkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA9IDE7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkKFwiI2dhbWUgLnJvd1t2YWw9JzEnXSAuaWNvbltjYXNlPSdcIiArIGluZGV4SG9yaXpvbnRhbGVEdVBpb24gKyBcIiddXCIpLm1vdXNlb3ZlcigpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT0gMzcpIHtcclxuICAgICAgICAgICAgLy8gZmzDqGNoZSBnYXVjaGUgOiBzaW11bGF0aW9uIMOgIGdhdWNoZVxyXG4gICAgICAgICAgICBpbmRleEhvcml6b250YWxlRHVQaW9uLS07XHJcbiAgICAgICAgICAgIGlmIChpbmRleEhvcml6b250YWxlRHVQaW9uIDw9IDApIHtcclxuICAgICAgICAgICAgICBpbmRleEhvcml6b250YWxlRHVQaW9uID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGluZGV4SG9yaXpvbnRhbGVEdVBpb24pXHJcbiAgICAgICAgICAgIHdoaWxlICghZ2FtZS5nZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpLmluY2x1ZGVzKGluZGV4SG9yaXpvbnRhbGVEdVBpb24pICYmICFnYW1lLmlzRHJhdygpICYmIGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPj0gMCkge1xyXG4gICAgICAgICAgICAgIGluZGV4SG9yaXpvbnRhbGVEdVBpb24tLTtcclxuICAgICAgICAgICAgICBpZiAoaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleEhvcml6b250YWxlRHVQaW9uID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpbmRleEhvcml6b250YWxlRHVQaW9uKVxyXG4gICAgICAgICAgICAkKFwiI2dhbWUgLnJvd1t2YWw9JzEnXSAuaWNvbltjYXNlPSdcIiArIGluZGV4SG9yaXpvbnRhbGVEdVBpb24gKyBcIiddXCIpLm1vdXNlb3ZlcigpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT0gMTMgfHwga2V5ID09IDM4KSB7XHJcbiAgICAgICAgICAgIC8vIHRvdWNoZSBlbnRyw6kgb3UgZmzDqGNoZSBoYXV0IDogc2ltdWxhdGlvbiBkJ3VuIGNsaWNrXHJcbiAgICAgICAgICAgICQocGlvbkVuU3VyYnJpbGxhbmNlKS5jbGljaygpO1xyXG4gICAgICAgICAgICBpZiAoIWdhbWUuZ2V0TGVzQ29sb25uZXNOb25Db21wbGV0ZXMoKS5pbmNsdWRlcyhpbmRleEhvcml6b250YWxlRHVQaW9uKSkge1xyXG4gICAgICAgICAgICAgIGluZGV4SG9yaXpvbnRhbGVEdVBpb24rK1xyXG4gICAgICAgICAgICAgIGlmIChpbmRleEhvcml6b250YWxlRHVQaW9uID49IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKSArIDEpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPSAxO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB3aGlsZSAoIWdhbWUuZ2V0TGVzQ29sb25uZXNOb25Db21wbGV0ZXMoKS5pbmNsdWRlcyhpbmRleEhvcml6b250YWxlRHVQaW9uKSAmJiAhZ2FtZS5pc0RyYXcoKSAmJiBpbmRleEhvcml6b250YWxlRHVQaW9uIDw9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKSkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXhIb3Jpem9udGFsZUR1UGlvbisrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAkKFwiI2dhbWUgLnJvd1t2YWw9JzEnXSAuaWNvbltjYXNlPSdcIiArIGluZGV4SG9yaXpvbnRhbGVEdVBpb24gKyBcIiddXCIpLm1vdXNlb3ZlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoXCIjZ2FtZSAucm93IC5pY29uXCIpLm1vdXNlb3V0KCk7XHJcbiAgICAgICAgbGV0IGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPSAxO1xyXG4gICAgICAgIHdoaWxlICghZ2FtZS5nZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpLmluY2x1ZGVzKGluZGV4SG9yaXpvbnRhbGVEdVBpb24pICYmICFnYW1lLmlzRHJhdygpICYmIGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPD0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpKSB7XHJcbiAgICAgICAgICBpbmRleEhvcml6b250YWxlRHVQaW9uKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoXCIjZ2FtZSAucm93W3ZhbD0nMSddIC5pY29uW2Nhc2U9J1wiICsgaW5kZXhIb3Jpem9udGFsZUR1UGlvbiArIFwiJ11cIikubW91c2VvdmVyKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuICAkKFwiI2JveFwiKS5vbignY2xpY2snLCAnI2dhbWUgLmljb24nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoZ2FtZS5tb25Ub3VyLmdldCgpKSB7XHJcbiAgICAgIGNvbnN0IHBvc2l0aW9uSG9yaXpvbnRhbGUgPSBnYW1lLmdldFBvc2l0aW9uSG9yaXpvbnRhbGUoJCh0aGlzKSlcclxuICAgICAgZ2FtZS5hZGRQaW9uKHBvc2l0aW9uSG9yaXpvbnRhbGUpO1xyXG4gICAgICBnYW1lLnNlbGVjdChwb3NpdGlvbkhvcml6b250YWxlKTtcclxuICAgIH1cclxuICB9KVxyXG4gICQoXCIjYm94XCIpLm9uKCdtb3VzZW92ZXInLCAnI2dhbWUgLmljb24nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoZ2FtZS5tb25Ub3VyLmdldCgpKSB7XHJcbiAgICAgIGdhbWUuc2VsZWN0KGdhbWUuZ2V0UG9zaXRpb25Ib3Jpem9udGFsZSgkKHRoaXMpKSk7XHJcbiAgICB9XHJcbiAgfSlcclxuICAkKFwiI2JveFwiKS5vbignbW91c2VvdXQnLCAnI2dhbWUgLmljb24nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoZ2FtZS5tb25Ub3VyLmdldCgpKSB7XHJcbiAgICAgIGdhbWUudW5TZWxlY3QoKTtcclxuICAgIH1cclxuICB9KVxyXG59KTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=