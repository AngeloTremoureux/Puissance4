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
        console.log("Equipes:");
        console.log(this.listePionsRouge);
        console.log(this.listePionsJaune);
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
/* harmony import */ var _gameManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);


$(function () {
    var game = _Game__WEBPACK_IMPORTED_MODULE_0__.Game.getGame();
    $("#playButton").on("click", function () { game.playGame(); });
    $("#robotButton").on("click", function () { _gameManager__WEBPACK_IMPORTED_MODULE_1__.lanceUnePartieDeRobots(); });
    $("#optionsButton").on("click", function () { _gameManager__WEBPACK_IMPORTED_MODULE_1__.openParam(); });
    $("html").on("keydown", "body", function (event) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxtQ0FBbUM7QUFDcEU7QUFDQTtBQUNBLHFDQUFxQyx1Q0FBdUM7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx1Q0FBdUM7QUFDMUU7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLG1DQUFtQztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsbUNBQW1DO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsNkNBQTZDO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsbUNBQW1DO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LEVBQUUsQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFO1FBQ3ZDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQyxDQUFDO0lBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFO1FBQ3RDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN0QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7SUFDSCxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9HYW1lLnRzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9Nb25Ub3VyLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9VdGlscy5qcyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvV2lubmVyTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvQ2hlY2tJZldpbm5lci5qcyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvUm9ib3RNYW5hZ2VyLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9KZXRvbi5qcyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvZ2FtZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL1Rlc3RzVW5pdHMuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vblRvdXIgfSBmcm9tIFwiLi9Nb25Ub3VyXCJcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBXaW5uZXJNYW5hZ2VyIH0gZnJvbSBcIi4vV2lubmVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBSb2JvdE1hbmFnZXIgfSBmcm9tIFwiLi9Sb2JvdE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSmV0b24gfSBmcm9tIFwiLi9KZXRvblwiO1xyXG5pbXBvcnQgKiBhcyBJbnRlcmZhY2UgZnJvbSBcIi4vSW50ZXJmYWNlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWUge1xyXG5cclxuICBwcml2YXRlIHRhaWxsZUhvcml6b250YWxlRHVKZXU6IG51bWJlcjtcclxuICBwcml2YXRlIHRhaWxsZVZlcnRpY2FsZUR1SmV1OiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBsaXN0ZVBpb25zUm91Z2U6IEFycmF5PEpldG9uPjtcclxuICBwcml2YXRlIGxpc3RlUGlvbnNKYXVuZTogQXJyYXk8SmV0b24+O1xyXG4gIHB1YmxpYyBtb25Ub3VyOiBNb25Ub3VyO1xyXG4gIHByaXZhdGUgc3RhdGljIGdhbWU6IEdhbWU7XHJcblxyXG4gIHByaXZhdGUgY29uc3RydWN0b3IodGFpbGxlSG9yaXpvbnRhbGU6IG51bWJlciwgdGFpbGxlVmVydGljYWxlOiBudW1iZXIpIHtcclxuICAgIHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldSA9IHRhaWxsZUhvcml6b250YWxlO1xyXG4gICAgdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldSA9IHRhaWxsZVZlcnRpY2FsZTtcclxuICAgIHRoaXMubGlzdGVQaW9uc1JvdWdlID0gbmV3IEFycmF5KCk7XHJcbiAgICB0aGlzLmxpc3RlUGlvbnNKYXVuZSA9IG5ldyBBcnJheSgpO1xyXG4gICAgdGhpcy5tb25Ub3VyID0gbmV3IE1vblRvdXIoKVxyXG4gICAgdGhpcy5kaXNhYmxlR2FtZSgpXHJcbiAgICB0aGlzLmxvZyhcclxuICAgICAgXCJQdWlzc2FuY2UgNFwiLFxyXG4gICAgICBcIkluaXRpYWxpc2F0aW9uIGR1IGpldSBlbiBcIiArIHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldSArIFwieFwiICsgdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldVxyXG4gICAgKTtcclxuICAgIEdhbWUuZ2FtZSA9IHRoaXM7XHJcbiAgfVxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0R2FtZSgpIHtcclxuICAgIGlmIChHYW1lLmdhbWUpIHtcclxuICAgICAgcmV0dXJuIEdhbWUuZ2FtZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHRhaWxsZUhvcml6b250YWxlUGFyc2VkID0gdGhpcy5nZXRUYWlsbGVIb3Jpem9udGFsZUZyb21VcmwoKVxyXG4gICAgICBsZXQgdGFpbGxlVmVydGljYWxlUGFyc2VkID0gdGhpcy5nZXRUYWlsbGVWZXJ0aWNhbGVGcm9tVXJsKClcclxuICAgICAgcmV0dXJuIG5ldyBHYW1lKHRhaWxsZUhvcml6b250YWxlUGFyc2VkLCB0YWlsbGVWZXJ0aWNhbGVQYXJzZWQpXHJcblxyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgc3RhdGljIGdldFRhaWxsZUhvcml6b250YWxlRnJvbVVybCgpIHtcclxuICAgIGNvbnN0IHBhcmFtc1VybDogYW55ID0gVXRpbHMucGFyc2VVUkxQYXJhbXMod2luZG93LmxvY2F0aW9uLmhyZWYpXHJcbiAgICBpZiAodHlwZW9mIHBhcmFtc1VybCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGFyYW1zVXJsLnRhaWxsZUhvcml6b250YWxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IHBhcmFtc1VybC50YWlsbGVIb3Jpem9udGFsZVswXTtcclxuICAgICAgaWYgKHBhcnNlSW50KHRhaWxsZUhvcml6b250YWxlKSkge1xyXG4gICAgICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlUGFyc2VkID0gcGFyc2VJbnQodGFpbGxlSG9yaXpvbnRhbGUpXHJcbiAgICAgICAgaWYgKHRhaWxsZUhvcml6b250YWxlUGFyc2VkID49IDQgJiYgdGFpbGxlSG9yaXpvbnRhbGVQYXJzZWQgPD0gMjApIHtcclxuICAgICAgICAgIHJldHVybiB0YWlsbGVIb3Jpem9udGFsZVBhcnNlZFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gNztcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIDc7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiA3O1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgc3RhdGljIGdldFRhaWxsZVZlcnRpY2FsZUZyb21VcmwoKSB7XHJcbiAgICBjb25zdCBwYXJhbXNVcmw6IGFueSA9IFV0aWxzLnBhcnNlVVJMUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXNVcmwgIT09ICd1bmRlZmluZWQnICYmIHBhcmFtc1VybC50YWlsbGVWZXJ0aWNhbGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSA9IHBhcmFtc1VybC50YWlsbGVWZXJ0aWNhbGVbMF07XHJcbiAgICAgIGlmIChwYXJzZUludCh0YWlsbGVWZXJ0aWNhbGUpKSB7XHJcbiAgICAgICAgY29uc3QgdGFpbGxlVmVydGljYWxlUGFyc2VkID0gcGFyc2VJbnQodGFpbGxlVmVydGljYWxlKVxyXG4gICAgICAgIGlmICh0YWlsbGVWZXJ0aWNhbGVQYXJzZWQgPj0gNCAmJiB0YWlsbGVWZXJ0aWNhbGVQYXJzZWQgPD0gMjApIHtcclxuICAgICAgICAgIHJldHVybiB0YWlsbGVWZXJ0aWNhbGVQYXJzZWRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIDU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiA1O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gNTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIHNlYXJjaFBpZWNlKGNvdWxldXI6IHN0cmluZywgaW5pdENhc2U6IG51bWJlcikge1xyXG4gICAgY29uc3QgcmVkQ2lyY2xlID0gJCgnI3ByZXZpZXcgI3JlZF9jaXJjbGUnKVxyXG4gICAgY29uc3QgeWVsbG93Q2lyY2xlID0gJCgnI3ByZXZpZXcgI3llbGxvd19jaXJjbGUnKVxyXG4gICAgY29uc3QgZGVmYXVsdENpcmNsZSA9ICQoJyNwcmV2aWV3ICNiYXNpY19jaXJjbGUnKVxyXG4gICAgaWYgKGluaXRDYXNlKSB7XHJcbiAgICAgIGlmIChjb3VsZXVyID09PSAncmVkJykge1xyXG4gICAgICAgICQocmVkQ2lyY2xlKS5jaGlsZHJlbigpLmNoaWxkcmVuKCkuYXR0cignY2FzZScsIGluaXRDYXNlKVxyXG4gICAgICAgIHJldHVybiAkKHJlZENpcmNsZSkuaHRtbCgpXHJcbiAgICAgIH0gZWxzZSBpZiAoY291bGV1ciA9PT0gJ3llbGxvdycpIHtcclxuICAgICAgICAkKHllbGxvd0NpcmNsZSkuY2hpbGRyZW4oKS5jaGlsZHJlbigpLmF0dHIoJ2Nhc2UnLCBpbml0Q2FzZSlcclxuICAgICAgICByZXR1cm4gJCh5ZWxsb3dDaXJjbGUpLmh0bWwoKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoZGVmYXVsdENpcmNsZSkuY2hpbGRyZW4oKS5jaGlsZHJlbigpLmF0dHIoJ2Nhc2UnLCBpbml0Q2FzZSlcclxuICAgICAgICByZXR1cm4gJChkZWZhdWx0Q2lyY2xlKS5odG1sKClcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNvdWxldXIgPT09ICdyZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuICQocmVkQ2lyY2xlKS5odG1sKClcclxuICAgICAgfSBlbHNlIGlmIChjb3VsZXVyID09PSAneWVsbG93Jykge1xyXG4gICAgICAgIHJldHVybiAkKHllbGxvd0NpcmNsZSkuaHRtbCgpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuICQoZGVmYXVsdENpcmNsZSkuaHRtbCgpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGU6IG51bWJlciwgaW5kZXhWZXJ0aWNhbGU6IG51bWJlcikge1xyXG4gICAgY29uc3QgbGlzdGVQaW9uc1JvdWdlID0gdGhpcy5nZXRQaW9ucygxKVxyXG4gICAgY29uc3QgbGlzdGVQaW9uc0phdW5lID0gdGhpcy5nZXRQaW9ucygyKVxyXG5cclxuICAgIGlmIChVdGlscy5hcnJheTJEQ29udGFpbnNBcnJheShsaXN0ZVBpb25zUm91Z2UsIFtpbmRleEhvcml6b250YWxlLCBpbmRleFZlcnRpY2FsZV0pKSB7XHJcbiAgICAgIHJldHVybiAncmVkJztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKFV0aWxzLmFycmF5MkRDb250YWluc0FycmF5KGxpc3RlUGlvbnNKYXVuZSwgW2luZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlXSkpIHtcclxuICAgICAgcmV0dXJuICd5ZWxsb3cnO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGNsZWFyR2FtZSgpIHtcclxuICAgICQoJy5yb3cnKS5yZW1vdmUoKVxyXG4gIH1cclxuICBwdWJsaWMgcmVzZXRHYW1lKCkge1xyXG4gICAgdGhpcy5jbGVhckdhbWUoKVxyXG4gICAgdGhpcy5jbGVhclBpb25zKClcclxuICAgIHRoaXMuY3JlYXRlQmFja2dyb3VuZCgpXHJcbiAgICB0aGlzLmRpc2FibGVHYW1lKClcclxuICB9XHJcbiAgcHVibGljIHBsYXlHYW1lKCkge1xyXG4gICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCcuLi9wdWJsaWMvYXVkaW8vc3RhcnRHYW1lLm1wNCcpO1xyXG4gICAgYXVkaW8ucGxheSgpO1xyXG4gICAgYXVkaW8gPSBudWxsO1xyXG4gICAgdGhpcy5yZXNldEdhbWUoKVxyXG4gICAgdGhpcy5zZXRNZXNzYWdlKFwiQSB0b2kgZGUgam91ZXIgIVwiKVxyXG4gICAgdGhpcy5lbmFibGVHYW1lKClcclxuICB9XHJcbiAgcHVibGljIHNlbGVjdChpbmRleEhvcml6b250YWxlOiBudW1iZXIpIHtcclxuICAgIGxldCBpbmRleFZlcnRpY2FsZSA9IHRoaXMuZ2V0VGFpbGxlVmVydGljYWxlKCk7XHJcbiAgICB3aGlsZSAoaW5kZXhWZXJ0aWNhbGUgPiAwKSB7XHJcbiAgICAgIGxldCB0ZWFtQ29sb3IgPSB0aGlzLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlKVxyXG4gICAgICBpZiAoIXRlYW1Db2xvcikge1xyXG4gICAgICAgIGxldCBjb3VsZXVyID0gJChcIiNnYW1lIC5yb3dcIikuZXEoKGluZGV4VmVydGljYWxlIC0gMSkpLmZpbmQoXCIuaWNvblwiKS5lcShpbmRleEhvcml6b250YWxlIC0gMSlcclxuICAgICAgICBjb3VsZXVyLmF0dHIoXCJzdXJicmlsbGFuY2VcIiwgXCJyZWRcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGluZGV4VmVydGljYWxlLS07XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpIHtcclxuICAgIGxldCBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzID0gW107XHJcbiAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gMTsgaW5kZXhIb3Jpem9udGFsZSA8PSB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXU7IGluZGV4SG9yaXpvbnRhbGUrKykge1xyXG4gICAgICBpZiAoIXRoaXMuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZSwgMSkpIHtcclxuICAgICAgICBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzLnB1c2goaW5kZXhIb3Jpem9udGFsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzO1xyXG4gIH1cclxuICBwdWJsaWMgaXNEcmF3KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGlzdGVQaW9uc0phdW5lLmxlbmd0aCArIHRoaXMubGlzdGVQaW9uc1JvdWdlLmxlbmd0aCA+PSB0aGlzLmdldFRhaWxsZUhvcml6b250YWxlKCkgKiB0aGlzLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRUYWlsbGVIb3Jpem9udGFsZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXU7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRUYWlsbGVWZXJ0aWNhbGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldTtcclxuICB9XHJcbiAgcHVibGljIGdldExlc0Nhc2VzUG91dmFudEV0cmVKb3VlcigpIHtcclxuICAgIGxldCBsaXN0ZURlc0Nhc2VzUG91dmFudEV0cmVKb3VlcjogQXJyYXk8QXJyYXk8TnVtYmVyPj4gPSBbXTtcclxuICAgIGxldCBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzID0gdGhpcy5nZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpO1xyXG4gICAgbGV0IGFUcm91dmVyTGVQaW9uO1xyXG4gICAgbGlzdGVDb2xvbm5lc05vbkNvbXBsZXRlcy5mb3JFYWNoKG51bWVyb0NvbG9ubmVIb3Jpem9udGFsZSA9PiB7XHJcbiAgICAgIGxldCBudW1lcm9Db2xvbm5lVmVydGljYWxlID0gdGhpcy5nZXRUYWlsbGVWZXJ0aWNhbGUoKTtcclxuICAgICAgYVRyb3V2ZXJMZVBpb24gPSBmYWxzZTtcclxuICAgICAgd2hpbGUgKG51bWVyb0NvbG9ubmVWZXJ0aWNhbGUgPiAwICYmICFhVHJvdXZlckxlUGlvbikge1xyXG4gICAgICAgIGlmICghVXRpbHMuYXJyYXkyRENvbnRhaW5zQXJyYXkodGhpcy5nZXRQaW9ucygxKSwgW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pXHJcbiAgICAgICAgICAmJiAhVXRpbHMuYXJyYXkyRENvbnRhaW5zQXJyYXkodGhpcy5nZXRQaW9ucygyKSwgW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc0Nhc2VzUG91dmFudEV0cmVKb3Vlci5wdXNoKFtudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGVdKVxyXG4gICAgICAgICAgYVRyb3V2ZXJMZVBpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbnVtZXJvQ29sb25uZVZlcnRpY2FsZS0tO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBsaXN0ZURlc0Nhc2VzUG91dmFudEV0cmVKb3VlcjtcclxuICB9XHJcbiAgcHVibGljIGV4cG9ydCgpIHtcclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJBZmZpY2hhZ2UgZGUgbCdleHBvcnQuLi5cIik7XHJcbiAgICBsZXQgcGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IEpldG9uW10gfSA9IHt9O1xyXG4gICAgcGFyYW1zWydyZWQnXSA9IHRoaXMuZ2V0UGlvbnMoJ3JlZCcpXHJcbiAgICBwYXJhbXNbJ3llbGxvdyddID0gdGhpcy5nZXRQaW9ucygneWVsbG93JylcclxuICAgIGNvbnN0IHJlZCA9IHBhcmFtc1sncmVkJ107XHJcbiAgICBjb25zdCB5ZWxsb3cgPSBwYXJhbXNbJ3llbGxvdyddO1xyXG4gICAgY29uc3QgcmVxdWVzdCA9ICQuYWpheCh7XHJcbiAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgdXJsOiBcImFwaS9leHBvcnQ/eD1cIiArIHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldSArIFwiJnk9XCIgKyB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1LFxyXG4gICAgICBkYXRhOiB7IHJlZDogcmVkLCB5ZWxsb3c6IHllbGxvdyB9LFxyXG4gICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgIHRpbWVvdXQ6IDEyMDAwMFxyXG4gICAgfSlcclxuICAgIHJlcXVlc3QuZG9uZShmdW5jdGlvbiAob3V0cHV0X3N1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2cob3V0cHV0X3N1Y2Nlc3MpXHJcbiAgICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJMJ2V4cG9ydCBzJ2VzdCBjb3JyZWN0ZW1lbnQgdGVybWluw6lcIik7XHJcbiAgICB9KVxyXG4gICAgcmVxdWVzdC5mYWlsKGZ1bmN0aW9uIChodHRwX2Vycm9yKSB7XHJcbiAgICAgIGxldCBzZXJ2ZXJfbXNnID0gaHR0cF9lcnJvci5yZXNwb25zZVRleHQ7XHJcbiAgICAgIGxldCBjb2RlID0gaHR0cF9lcnJvci5zdGF0dXM7XHJcbiAgICAgIGxldCBjb2RlX2xhYmVsID0gaHR0cF9lcnJvci5zdGF0dXNUZXh0O1xyXG4gICAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiRWNoZWMgbG9ycyBkZSBsJ2V4cG9ydCAoXCIgKyBjb2RlICsgXCIpXCIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHB1YmxpYyB1blNlbGVjdCgpIHtcclxuICAgICQoXCIucm93IC5pY29uXCIpLmF0dHIoXCJzdXJicmlsbGFuY2VcIiwgXCJcIik7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXRNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgJChcIiNnYW1lIHAjdG91clwiKS50ZXh0KG1lc3NhZ2UpO1xyXG4gIH1cclxuICBwdWJsaWMgaW1wb3J0KGdhbWVPYmplY3Q6IEludGVyZmFjZS5HYW1lT2JqZWN0LCBwYXJhbWV0ZXJzOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJEw6lidXQgZGUgbCdpbXBvcnQgLi4uXCIpO1xyXG4gICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkluaXRpYWxpc2F0aW9uIGRlcyBwYXJhbcOodHJlcyAuLi5cIik7XHJcbiAgICB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXUgPSBwYXJzZUludChnYW1lT2JqZWN0LnBhcmFtZXRyZXMueClcclxuICAgIHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXUgPSBwYXJzZUludChnYW1lT2JqZWN0LnBhcmFtZXRyZXMueSlcclxuICAgIHRoaXMucmVzZXRHYW1lKClcclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJJbXBvcnQgZGVzIHBpb25zIC4uLlwiKTtcclxuICAgIGdhbWVPYmplY3QuZGF0YXMucGlvbnMucmVkLmZvckVhY2gocGlvblJvdWdlID0+IHtcclxuICAgICAgdGhpcy5mb3JjZUFkZFBpb24ocGlvblJvdWdlWzBdLCBwaW9uUm91Z2VbMV0sICdyZWQnKVxyXG4gICAgfSk7XHJcbiAgICBnYW1lT2JqZWN0LmRhdGFzLnBpb25zLnllbGxvdy5mb3JFYWNoKHBpb25ZZWxsb3cgPT4ge1xyXG4gICAgICB0aGlzLmZvcmNlQWRkUGlvbihwaW9uWWVsbG93WzBdLCBwaW9uWWVsbG93WzFdLCAneWVsbG93JylcclxuICAgIH0pO1xyXG4gICAgaWYgKHBhcmFtZXRlcnMpIHtcclxuICAgICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIlbDqXJpZmljYXRpb24gZCd1biBwb3RlbnRpZWwgZ2FnbmFudCAuLi5cIik7XHJcbiAgICAgIGxldCBnYWduYW50Um91Z2UgPSBXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMsIFwicmVkXCIpO1xyXG4gICAgICBsZXQgZ2FnbmFudEphdW5lID0gV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLCBcInllbGxvd1wiKTtcclxuICAgICAgaWYgKGdhZ25hbnRSb3VnZSkge1xyXG4gICAgICAgIHRoaXMuc2V0V2lubmVyKCdyZWQnLCBnYWduYW50Um91Z2UpO1xyXG4gICAgICAgIHRoaXMudW5TZWxlY3QoKTtcclxuICAgICAgfSBlbHNlIGlmIChnYWduYW50SmF1bmUpIHtcclxuICAgICAgICB0aGlzLnNldFdpbm5lcigneWVsbG93JywgZ2FnbmFudEphdW5lKTtcclxuICAgICAgICB0aGlzLm1vblRvdXIuc2V0KGZhbHNlKTtcclxuICAgICAgICB0aGlzLnVuU2VsZWN0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJGaW4gZGUgbCdpbXBvcnRcIik7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXRXaW5uZXIoY291bGV1cjogc3RyaW5nLCBwaW9uc0dhZ25hbnRzOiBudW1iZXJbXVtdID0gbnVsbCkge1xyXG4gICAgdGhpcy5kaXNhYmxlR2FtZSgpXHJcbiAgICBpZiAocGlvbnNHYWduYW50cykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBpb25zR2FnbmFudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgaW5kZXhWZXJ0aWNhbGUgPSBwaW9uc0dhZ25hbnRzW2ldWzBdXHJcbiAgICAgICAgbGV0IGluZGV4SG9yaXpvbnRhbGUgPSBwaW9uc0dhZ25hbnRzW2ldWzFdXHJcbiAgICAgICAgbGV0IHN1cmJyaWxsYW5jZVJlY2hlcmNoZSA9ICQoXCIjZ2FtZSAucm93XCIpLmVxKChpbmRleFZlcnRpY2FsZSAtIDEpKS5maW5kKFwiLmljb25cIikuZXEoKGluZGV4SG9yaXpvbnRhbGUgLSAxKSlcclxuICAgICAgICAkKHN1cmJyaWxsYW5jZVJlY2hlcmNoZSkuY3NzKFwib3BhY2l0eVwiLCAxKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoY291bGV1ciA9PSAncmVkJykge1xyXG4gICAgICB0aGlzLnNldE1lc3NhZ2UoXCJMZXMgcm91Z2VzIG9udCBnYWduw6lzXCIpO1xyXG4gICAgfSBlbHNlIGlmIChjb3VsZXVyID09ICd5ZWxsb3cnKSB7XHJcbiAgICAgIHRoaXMuc2V0TWVzc2FnZShcIkxlcyBqYXVuZXMgb250IGdhZ27DqXNcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNldE1lc3NhZ2UoXCJNYXRjaCBudWwgIVwiKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGxvZyhwcmVmaXg6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBjb2xvclRleHQ6IHN0cmluZyA9ICdmYWxzZScpIHtcclxuICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICBcIiVjW1wiICsgcHJlZml4ICsgXCJdICVjXCIgKyBtZXNzYWdlLFxyXG4gICAgICBcImNvbG9yOiBwdXJwbGU7IGZvbnQtc2l6ZTogMTNweDsgZm9udC13ZWlnaHQ6IGJvbGQ7XCIsXHJcbiAgICAgIFwiZm9udC1zaXplOiAxM3B4OyBjb2xvcjogXCIgKyBjb2xvclRleHRcclxuICAgICk7XHJcbiAgfVxyXG4gIHB1YmxpYyBkaXNhYmxlR2FtZSgpIHtcclxuICAgICQoXCIjZ2FtZSAuaWNvblwiKS5jc3MoXCJvcGFjaXR5XCIsIDAuMylcclxuICAgIHRoaXMubW9uVG91ci5zZXQoZmFsc2UpXHJcbiAgfVxyXG4gIHB1YmxpYyBlbmFibGVHYW1lKCkge1xyXG4gICAgJChcIiNnYW1lIC5pY29uXCIpLmNzcyhcIm9wYWNpdHlcIiwgMSlcclxuICAgIHRoaXMubW9uVG91ci5zZXQodHJ1ZSlcclxuICB9XHJcbiAgcHVibGljIGNyZWF0ZUJhY2tncm91bmQoKSB7XHJcbiAgICBsZXQgUHggPSB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXU7XHJcbiAgICBsZXQgUHkgPSB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1O1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldTsgaSsrKSB7XHJcbiAgICAgIGxldCByb3dZID0gJzxkaXYgY2xhc3M9XCJyb3dcIiB2YWw9XCInICsgaSArICdcIj48L2Rpdj4nO1xyXG4gICAgICAkKFwiI2dhbWVcIikuYXBwZW5kKHJvd1kpO1xyXG4gICAgICBmb3IgKGxldCBqID0gMTsgaiA8PSB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXU7IGorKykge1xyXG4gICAgICAgICQoJy5yb3dbdmFsPVwiJyArIGkgKyAnXCJdJykuYXBwZW5kKHRoaXMuc2VhcmNoUGllY2UobnVsbCwgaikpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBmb3JjZUFkZFBpb24ocG9zaXRpb25Ib3Jpem9udGFsZTogbnVtYmVyLCBwb3NpdGlvblZlcnRpY2FsZTogbnVtYmVyLCBjb3VsZXVyOiBzdHJpbmcpIHtcclxuICAgICQoXCIucm93W3ZhbD0nXCIgKyBwb3NpdGlvblZlcnRpY2FsZSArIFwiJ10gLmljb25bY2FzZT0nXCIgKyBwb3NpdGlvbkhvcml6b250YWxlICsgXCInXVwiKS5yZXBsYWNlV2l0aCh0aGlzLnNlYXJjaFBpZWNlKGNvdWxldXIsIHBvc2l0aW9uSG9yaXpvbnRhbGUpKTtcclxuICAgICQoXCIucm93W3ZhbD0nXCIgKyBwb3NpdGlvblZlcnRpY2FsZSArIFwiJ10gLmljb25bY2FzZT0nXCIgKyBwb3NpdGlvbkhvcml6b250YWxlICsgXCInXVwiKS5hdHRyKFwidGVhbVwiLCBjb3VsZXVyKTtcclxuICAgIGlmIChjb3VsZXVyID09ICd5ZWxsb3cnKSB7XHJcbiAgICAgIHRoaXMuc2V0UGlvbigyLCBuZXcgSmV0b24ocG9zaXRpb25Ib3Jpem9udGFsZSwgcG9zaXRpb25WZXJ0aWNhbGUpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2V0UGlvbigxLCBuZXcgSmV0b24ocG9zaXRpb25Ib3Jpem9udGFsZSwgcG9zaXRpb25WZXJ0aWNhbGUpKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGdldFBvc2l0aW9uSG9yaXpvbnRhbGUoZXZlbnQ6IHN0cmluZyB8IEpRdWVyeTxhbnk+KSB7XHJcbiAgICByZXR1cm4gJChldmVudCkucGFyZW50KCkuaW5kZXgoKSArIDE7XHJcbiAgfVxyXG4gIHB1YmxpYyBhZGRQaW9uKGluZGV4SG9yaXpvbnRhbGVDbGlja2VkOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSA9IHRoaXMuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICAgIGxldCBwbGFjZUlzTm90VGFrZW4gPSB0cnVlO1xyXG4gICAgbGV0IGluZGV4VmVydGljYWxlID0gdGFpbGxlVmVydGljYWxlO1xyXG4gICAgaWYgKHRoaXMubW9uVG91ci5nZXQoKSkge1xyXG4gICAgICB3aGlsZSAoaW5kZXhWZXJ0aWNhbGUgPiAwICYmIHBsYWNlSXNOb3RUYWtlbikge1xyXG4gICAgICAgIGxldCBjb3VsZXVyRHVQaW9uID0gdGhpcy5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleEhvcml6b250YWxlQ2xpY2tlZCwgaW5kZXhWZXJ0aWNhbGUpO1xyXG4gICAgICAgIGlmICghY291bGV1ckR1UGlvbikge1xyXG4gICAgICAgICAgcGxhY2VJc05vdFRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLm1vblRvdXIuc2V0KGZhbHNlKTtcclxuICAgICAgICAgIHRoaXMudW5TZWxlY3QoKTtcclxuICAgICAgICAgIHRoaXMuZm9yY2VBZGRQaW9uKGluZGV4SG9yaXpvbnRhbGVDbGlja2VkLCBpbmRleFZlcnRpY2FsZSwgXCJyZWRcIilcclxuICAgICAgICAgIGxldCBsZXNQaW9uc0dhZ25hbnRzID0gV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLCBcInJlZFwiKTtcclxuICAgICAgICAgIGlmIChsZXNQaW9uc0dhZ25hbnRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0V2lubmVyKCdyZWQnLCBsZXNQaW9uc0dhZ25hbnRzKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0RyYXcoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFdpbm5lcihudWxsLCBudWxsKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3QoaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1lc3NhZ2UoXCJBdSB0b3VyIGRlIGwnYWR2ZXJzYWlyZSFcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGdhbWUgPSB0aGlzO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICBjb25zdCBhdWRpbyA9IG5ldyBBdWRpbygnLi4vLi4vcHVibGljL2F1ZGlvL3BvcC5tcDQnKTtcclxuICAgICAgICAgICAgICBhdWRpby5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgY29uc3Qgcm9ib3RNYW5hZ2VyID0gUm9ib3RNYW5hZ2VyLmdldFJvYm90TWFuYWdlcihnYW1lKVxyXG4gICAgICAgICAgICAgIGlmIChyb2JvdE1hbmFnZXIucm9ib3RQbGFjZVVuUGlvbihcInllbGxvd1wiKSkge1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5zZXRNZXNzYWdlKFwiVHUgYXMgcGVyZHUgbGEgcGFydGllICFcIik7XHJcbiAgICAgICAgICAgICAgICBnYW1lLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiUGVyZHUgIVwiKTtcclxuICAgICAgICAgICAgICAgIGdhbWUubW9uVG91ci5zZXQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS51blNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleEhvcml6b250YWxlQ2xpY2tlZCwgaW5kZXhWZXJ0aWNhbGUgKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAvLyBTaSBsZSByb2JvdCBhIGpvdcOpIHN1ciBsYSBtw6ptZSBjb2xvbm5lLCBvbiBhY3R1YWxpc2UgbGEgc8OpbGVjdGlvblxyXG4gICAgICAgICAgICAgICAgICBnYW1lLnNlbGVjdChpbmRleEhvcml6b250YWxlQ2xpY2tlZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnYW1lLm1vblRvdXIuc2V0KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5zZXRNZXNzYWdlKFwiQSB0b24gdG91ciAhXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleFZlcnRpY2FsZS0tO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubG9nKFxyXG4gICAgICAgIFwiUHVpc3NhbmNlIDRcIixcclxuICAgICAgICBcIkpldG9uIGVuIFg6XCIgKyBpbmRleEhvcml6b250YWxlQ2xpY2tlZCArIFwiIFk6XCIgKyAoaW5kZXhWZXJ0aWNhbGUgKyAxKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgc2V0UGlvbih0ZWFtOiBzdHJpbmcgfCBudW1iZXIsIHZhbHVlOiBKZXRvbikge1xyXG4gICAgaWYgKHRlYW0gPT0gMSB8fCB0ZWFtID09ICdyZWQnKSB7XHJcbiAgICAgIHRoaXMubGlzdGVQaW9uc1JvdWdlLnB1c2godmFsdWUpO1xyXG4gICAgfSBlbHNlIGlmICh0ZWFtID09IDIgfHwgdGVhbSA9PSAneWVsbG93Jykge1xyXG4gICAgICB0aGlzLmxpc3RlUGlvbnNKYXVuZS5wdXNoKHZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkxlIGpvdWV1ciBlc3QgaW50cm91dmFibGVcIik7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhcIkVxdWlwZXM6XCIpO1xyXG4gICAgY29uc29sZS5sb2codGhpcy5saXN0ZVBpb25zUm91Z2UpO1xyXG4gICAgY29uc29sZS5sb2codGhpcy5saXN0ZVBpb25zSmF1bmUpO1xyXG4gIH1cclxuICBwdWJsaWMgcmVtb3ZlUGlvbih0ZWFtOiBzdHJpbmcgfCBudW1iZXIsIHZhbHVlOiBKZXRvbikge1xyXG4gICAgbGV0IGluZGV4O1xyXG4gICAgaWYgKHRlYW0gPT0gMSB8fCB0ZWFtID09ICdyZWQnKSB7XHJcbiAgICAgIGluZGV4ID0gVXRpbHMuZ2V0SW5kZXhPZjJEQXJyYXkodGhpcy5saXN0ZVBpb25zUm91Z2UsIHZhbHVlKVxyXG4gICAgICB0aGlzLmxpc3RlUGlvbnNSb3VnZS5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICB9IGVsc2UgaWYgKHRlYW0gPT0gMiB8fCB0ZWFtID09ICd5ZWxsb3cnKSB7XHJcbiAgICAgIGluZGV4ID0gVXRpbHMuZ2V0SW5kZXhPZjJEQXJyYXkodGhpcy5saXN0ZVBpb25zSmF1bmUsIHZhbHVlKVxyXG4gICAgICB0aGlzLmxpc3RlUGlvbnNKYXVuZS5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBcIkxlIGpvdWV1ciBlc3QgaW50cm91dmFibGVcIjtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGNsZWFyUGlvbnMoKSB7XHJcbiAgICB0aGlzLmxpc3RlUGlvbnNSb3VnZSA9IFtdO1xyXG4gICAgdGhpcy5saXN0ZVBpb25zSmF1bmUgPSBbXTtcclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJMZXMgZG9ubsOpZXMgZGVzIHBpb25zIG9udCDDqXTDqSBlZmZhY8Opc1wiKTtcclxuICB9XHJcbiAgcHVibGljIGdldFBpb25zKHRlYW06IHN0cmluZyB8IG51bWJlcikge1xyXG4gICAgaWYgKHRlYW0gPT0gMSB8fCB0ZWFtID09ICdyZWQnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlUGlvbnNSb3VnZTtcclxuICAgIH0gZWxzZSBpZiAodGVhbSA9PSAyIHx8IHRlYW0gPT0gJ3llbGxvdycpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVQaW9uc0phdW5lO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgXCJMZSBqb3VldXIgZXN0IGludHJvdXZhYmxlXCI7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIE1vblRvdXIge1xyXG4gIHNldChtb25Ub3VyKSB7XHJcbiAgICB0aGlzLm1vblRvdXIgPSBtb25Ub3VyXHJcbiAgfVxyXG4gIGdldCgpIHtcclxuICAgIHJldHVybiB0aGlzLm1vblRvdXJcclxuICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgVXRpbHMge1xyXG4gIHN0YXRpYyBnZXRFbnRpZXJBbGVhdG9pcmUobWluLCBtYXgpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0RWxlbWVudEFsZWF0b2lyZShsaXN0ZSkge1xyXG4gICAgbGV0IGxvbmd1ZXVyTGlzdGUgPSBsaXN0ZS5sZW5ndGg7XHJcbiAgICBsZXQgZW50aWVyQWxlYXRvaXJlSW5kZXhlUGFyTGlzdGUgPSBVdGlscy5nZXRFbnRpZXJBbGVhdG9pcmUoMCwgbG9uZ3VldXJMaXN0ZSk7XHJcbiAgICByZXR1cm4gbGlzdGVbZW50aWVyQWxlYXRvaXJlSW5kZXhlUGFyTGlzdGVdO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFycmF5MkRDb250YWluc0FycmF5KGFycmF5MkQsIGFycmF5U2VhcmNoKSB7XHJcbiAgICBsZXQgaXRlbVN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGFycmF5U2VhcmNoKTtcclxuICAgIGxldCBjb250YWlucyA9IGFycmF5MkQuc29tZShmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZWxlbWVudCkgPT09IGl0ZW1TdHJpbmc7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBjb250YWlucztcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRJbmRleE9mMkRBcnJheShhcnJheTJELCBpbmRleCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheTJELmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBjdXJyZW50QXJyYXkgPSBhcnJheTJEW2ldO1xyXG4gICAgICBpZiAoY3VycmVudEFycmF5WzBdID09IGluZGV4WzBdICYmIGN1cnJlbnRBcnJheVsxXSA9PSBpbmRleFsxXSkge1xyXG4gICAgICAgIHJldHVybiBpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0Q291bGV1ckVxdWlwZUFsZWF0b2lyZSgpIHtcclxuICAgIGxldCBsaXN0ZURlQ291bGV1cnMgPSBbXCJ5ZWxsb3dcIiwgXCJyZWRcIl07XHJcbiAgICBsZXQgbm9tYnJlQWxlYXRvaXJlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGlzdGVEZUNvdWxldXJzLmxlbmd0aCk7XHJcbiAgICByZXR1cm4gbGlzdGVEZUNvdWxldXJzW25vbWJyZUFsZWF0b2lyZV07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0Q291bGV1ckVxdWlwZUFkdmVyc2UoY291bGV1ckVxdWlwZUFjdHVlbGxlKSB7XHJcbiAgICBpZiAoY291bGV1ckVxdWlwZUFjdHVlbGxlID09ICdyZWQnKSB7XHJcbiAgICAgIHJldHVybiAneWVsbG93JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAncmVkJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBwYXJzZVVSTFBhcmFtcyh1cmwpIHtcclxuICAgIHZhciBxdWVyeVN0YXJ0ID0gdXJsLmluZGV4T2YoXCI/XCIpICsgMSxcclxuICAgICAgcXVlcnlFbmQgPSB1cmwuaW5kZXhPZihcIiNcIikgKyAxIHx8IHVybC5sZW5ndGggKyAxLFxyXG4gICAgICBxdWVyeSA9IHVybC5zbGljZShxdWVyeVN0YXJ0LCBxdWVyeUVuZCAtIDEpLFxyXG4gICAgICBwYWlycyA9IHF1ZXJ5LnJlcGxhY2UoL1xcKy9nLCBcIiBcIikuc3BsaXQoXCImXCIpLFxyXG4gICAgICBwYXJtcyA9IHt9LCBpLCBuLCB2LCBudjtcclxuXHJcbiAgICBpZiAocXVlcnkgPT09IHVybCB8fCBxdWVyeSA9PT0gXCJcIikgcmV0dXJuO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBudiA9IHBhaXJzW2ldLnNwbGl0KFwiPVwiLCAyKTtcclxuICAgICAgbiA9IGRlY29kZVVSSUNvbXBvbmVudChudlswXSk7XHJcbiAgICAgIHYgPSBkZWNvZGVVUklDb21wb25lbnQobnZbMV0pO1xyXG5cclxuICAgICAgaWYgKCFwYXJtcy5oYXNPd25Qcm9wZXJ0eShuKSkgcGFybXNbbl0gPSBbXTtcclxuICAgICAgcGFybXNbbl0ucHVzaChudi5sZW5ndGggPT09IDIgPyB2IDogbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFybXM7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENoZWNrSWZXaW5uZXIgfSBmcm9tIFwiLi9DaGVja0lmV2lubmVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgV2lubmVyTWFuYWdlciB7XHJcbiAgc3RhdGljIHZlcmlmV2luKGdhbWUsIGNvbG9yKSB7XHJcbiAgICBsZXQgdmVyaWZpY2F0aW9uID0gQ2hlY2tJZldpbm5lci5ob3Jpem9udGFsKGdhbWUsIGNvbG9yKTtcclxuICAgIGlmICh2ZXJpZmljYXRpb24pIHtcclxuICAgICAgcmV0dXJuIHZlcmlmaWNhdGlvbjtcclxuICAgIH1cclxuICAgIHZlcmlmaWNhdGlvbiA9IENoZWNrSWZXaW5uZXIudmVydGljYWwoZ2FtZSwgY29sb3IpO1xyXG4gICAgaWYgKHZlcmlmaWNhdGlvbikge1xyXG4gICAgICByZXR1cm4gdmVyaWZpY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgdmVyaWZpY2F0aW9uID0gQ2hlY2tJZldpbm5lci5kaWFnb25hbFRvcExlZnQoZ2FtZSwgY29sb3IpO1xyXG4gICAgaWYgKHZlcmlmaWNhdGlvbikge1xyXG4gICAgICByZXR1cm4gdmVyaWZpY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgdmVyaWZpY2F0aW9uID0gQ2hlY2tJZldpbm5lci5kaWFnb25hbFRvcFJpZ2h0KGdhbWUsIGNvbG9yKTtcclxuICAgIGlmICh2ZXJpZmljYXRpb24pIHtcclxuICAgICAgcmV0dXJuIHZlcmlmaWNhdGlvbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyB2ZXJpZklmUGlvblBsYWNlZEdpdmVXaW4oZ2FtZSwgbnVtZXJvQ29sb25uZUhvcml6b250YWxlLCBudW1lcm9Db2xvbm5lVmVydGljYWxlLCBjb3VsZXVyUGlvbikge1xyXG4gICAgZ2FtZS5zZXRQaW9uKGNvdWxldXJQaW9uLCBbbnVtZXJvQ29sb25uZUhvcml6b250YWxlLCBudW1lcm9Db2xvbm5lVmVydGljYWxlXSlcclxuICAgIGNvbnN0IGlzV2lubmVyID0gV2lubmVyTWFuYWdlci52ZXJpZldpbihnYW1lLCBjb3VsZXVyUGlvbilcclxuICAgIGdhbWUucmVtb3ZlUGlvbihjb3VsZXVyUGlvbiwgW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pXHJcbiAgICByZXR1cm4gaXNXaW5uZXI7XHJcbiAgfVxyXG5cclxufSIsImV4cG9ydCBjbGFzcyBDaGVja0lmV2lubmVyIHtcclxuICBzdGF0aWMgaG9yaXpvbnRhbChnYW1lLCBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKVxyXG4gICAgLy8gVsOpcmlmaWNhdGlvbiBlbiBob3Jpem9udGFsXHJcbiAgICBsZXQgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICBsZXQgY291bGV1ckR1UGlvbjtcclxuICAgIGxldCBuYlBpb25zR2FnbmFudHM7XHJcbiAgICBmb3IgKGxldCBpbmRleFZlcnRpY2FsZSA9IDE7IGluZGV4VmVydGljYWxlIDw9IHRhaWxsZVZlcnRpY2FsZTsgaW5kZXhWZXJ0aWNhbGUrKykge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgZm9yIChsZXQgaW5kZXhIb3Jpem9udGFsZSA9IDE7IGluZGV4SG9yaXpvbnRhbGUgPD0gdGFpbGxlSG9yaXpvbnRhbGU7IGluZGV4SG9yaXpvbnRhbGUrKykge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cysrO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzLnB1c2goW2luZGV4VmVydGljYWxlLCBpbmRleEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHN0YXRpYyB2ZXJ0aWNhbChnYW1lLCBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKVxyXG4gICAgLy8gUGFyY291cnMgZGUgY2hhcXVlIGNhc2UgaG9yaXpvbnRhbGUgZHUgamV1XHJcbiAgICBsZXQgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICBsZXQgY291bGV1ckR1UGlvbjtcclxuICAgIGxldCBuYlBpb25zR2FnbmFudHM7XHJcbiAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gMTsgaW5kZXhIb3Jpem9udGFsZSA8PSB0YWlsbGVIb3Jpem9udGFsZTsgaW5kZXhIb3Jpem9udGFsZSsrKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAvLyBQYXJjb3VycyBjaGFxdWUgY2FzZSB2ZXJ0aWNhbGUgZGUgbGEgY29sb25uZVxyXG4gICAgICBmb3IgKGxldCBpbmRleFZlcnRpY2FsZSA9IDE7IGluZGV4VmVydGljYWxlIDw9IHRhaWxsZVZlcnRpY2FsZTsgaW5kZXhWZXJ0aWNhbGUrKykge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleFZlcnRpY2FsZSwgaW5kZXhIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZGlhZ29uYWxUb3BMZWZ0KGdhbWUsIGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSA9IGdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcblxyXG4gICAgbGV0IGNvdWxldXJEdVBpb24sIG5iUGlvbnNHYWduYW50cztcclxuICAgIGxldCBpbmRleENvdXJhbnRIb3Jpem9udGFsZTtcclxuICAgIGxldCBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgIGxldCBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPSA0O1xyXG5cclxuICAgIC8vIFBhcmNvdXJzIHRvdXRlcyBsZXMgZGlhZ29uYWxlcyDDoCBnYXVjaGVzIMOgIHBhcnRpciBkZSA0LlxyXG4gICAgZm9yIChsZXQgaW5kZXhWZXJ0aWNhbGUgPSA0OyBpbmRleFZlcnRpY2FsZSA8PSB0YWlsbGVWZXJ0aWNhbGU7IGluZGV4VmVydGljYWxlKyspIHtcclxuICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlID0gMTtcclxuXHJcbiAgICAgIC8vIFbDqXJpZmllciBsYSBsaWduZSBlbiBkaWFnb25hbGVcclxuICAgICAgd2hpbGUgKGluZGV4Q291cmFudEhvcml6b250YWxlIDw9IHRhaWxsZUhvcml6b250YWxlICYmIGluZGV4Q291cmFudFZlcnRpY2FsZSA+PSAxKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUsIGluZGV4Q291cmFudFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhDb3VyYW50VmVydGljYWxlLCBpbmRleENvdXJhbnRIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUtLTtcclxuICAgICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSsrO1xyXG4gICAgICB9XHJcbiAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZSA9IGluZGV4VmVydGljYWxlICsgMTtcclxuICAgIH1cclxuXHJcbiAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gMjsgaW5kZXhIb3Jpem9udGFsZSA8PSAodGFpbGxlSG9yaXpvbnRhbGUgLSA0KTsgaW5kZXhIb3Jpem9udGFsZSsrKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSA9IGluZGV4SG9yaXpvbnRhbGU7XHJcbiAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZSA9IHRhaWxsZVZlcnRpY2FsZTtcclxuICAgICAgLy8gVsOpcmlmaWVyIGxhIGxpZ25lIGVuIGRpYWdvbmFsZVxyXG4gICAgICB3aGlsZSAoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPD0gdGFpbGxlSG9yaXpvbnRhbGUgJiYgaW5kZXhDb3VyYW50VmVydGljYWxlID49IDEpIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleENvdXJhbnRIb3Jpem9udGFsZSwgaW5kZXhDb3VyYW50VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleENvdXJhbnRWZXJ0aWNhbGUsIGluZGV4Q291cmFudEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZS0tO1xyXG4gICAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlKys7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZGlhZ29uYWxUb3BSaWdodChnYW1lLCBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKVxyXG5cclxuICAgIGxldCBjb3VsZXVyRHVQaW9uLCBuYlBpb25zR2FnbmFudHM7XHJcbiAgICBsZXQgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGU7XHJcbiAgICBsZXQgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcblxyXG4gICAgLy8gUGFyY291cnMgdG91dGVzIGxlcyBkaWFnb25hbGVzIMOgIGdhdWNoZXMgw6AgcGFydGlyIGRlIDQuXHJcbiAgICBmb3IgKGxldCBpbmRleFZlcnRpY2FsZSA9IDQ7IGluZGV4VmVydGljYWxlIDw9IHRhaWxsZVZlcnRpY2FsZTsgaW5kZXhWZXJ0aWNhbGUrKykge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPSB0YWlsbGVIb3Jpem9udGFsZTtcclxuICAgICAgbGV0IGluZGV4Q291cmFudFZlcnRpY2FsZSA9IGluZGV4VmVydGljYWxlO1xyXG4gICAgICAvLyBWw6lyaWZpZXIgbGEgbGlnbmUgZW4gZGlhZ29uYWxlXHJcbiAgICAgIHdoaWxlIChpbmRleENvdXJhbnRIb3Jpem9udGFsZSA+PSAxICYmIGluZGV4Q291cmFudFZlcnRpY2FsZSA+PSAxKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUsIGluZGV4Q291cmFudFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhDb3VyYW50VmVydGljYWxlLCBpbmRleENvdXJhbnRIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZS0tO1xyXG4gICAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZS0tO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaW5kZXhIb3Jpem9udGFsZSA9ICh0YWlsbGVIb3Jpem9udGFsZSAtIDEpOyBpbmRleEhvcml6b250YWxlID49IDQ7IGluZGV4SG9yaXpvbnRhbGUtLSkge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPSBpbmRleEhvcml6b250YWxlO1xyXG4gICAgICBsZXQgaW5kZXhDb3VyYW50VmVydGljYWxlID0gdGFpbGxlVmVydGljYWxlO1xyXG4gICAgICAvLyBWw6lyaWZpZXIgbGEgbGlnbmUgZW4gZGlhZ29uYWxlXHJcbiAgICAgIHdoaWxlIChpbmRleENvdXJhbnRIb3Jpem9udGFsZSA+PSAxICYmIGluZGV4Q291cmFudFZlcnRpY2FsZSA+PSAxKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUsIGluZGV4Q291cmFudFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhDb3VyYW50VmVydGljYWxlLCBpbmRleENvdXJhbnRIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUtLTtcclxuICAgICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZS0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBXaW5uZXJNYW5hZ2VyIH0gZnJvbSBcIi4vV2lubmVyTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJvYm90TWFuYWdlciB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xyXG4gICAgaWYgKGdhbWUpIHtcclxuICAgICAgdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1ID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpO1xyXG4gICAgICB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1ID0gZ2FtZS5nZXRUYWlsbGVWZXJ0aWNhbGUoKTtcclxuICAgICAgdGhpcy5nYW1lID0gZ2FtZVxyXG4gICAgICBSb2JvdE1hbmFnZXIucm9ib3RNYW5hZ2VyID0gdGhpc1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXVjdW5lIHBhcnRpZSBkw6lmaW5pdFwiKVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRSb2JvdE1hbmFnZXIoZ2FtZSkge1xyXG4gICAgaWYgKFJvYm90TWFuYWdlci5yb2JvdE1hbmFnZXIpIHtcclxuICAgICAgcmV0dXJuIFJvYm90TWFuYWdlci5yb2JvdE1hbmFnZXJcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBuZXcgUm9ib3RNYW5hZ2VyKGdhbWUpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsYW5jZVVuZVBhcnRpZURlUm9ib3RzKCkge1xyXG4gICAgdGhpcy5nYW1lLnNldE1lc3NhZ2UoXCJSb2JvdCBWcy4gUm9ib3RcIik7XHJcbiAgICB0aGlzLmdhbWUucmVzZXRHYW1lKClcclxuICAgIHRoaXMuZ2FtZS5lbmFibGVHYW1lKClcclxuICAgIHRoaXMuZ2FtZS5tb25Ub3VyLnNldChmYWxzZSlcclxuICAgIC8vIE9uIGNob2lzaXMgdW5lIMOpcXVpcGUgcXVpIGNvbW1lbmNlIGFsw6lhdG9pcmVtZW50XHJcbiAgICBjb25zdCBjb2xvciA9IFV0aWxzLmdldENvdWxldXJFcXVpcGVBbGVhdG9pcmUoKTtcclxuICAgIC8vIE9uIGxhbmNlIGxhIHBhcnRpZVxyXG4gICAgdGhpcy5yb2JvdFZzUm9ib3QoY29sb3IpO1xyXG4gIH1cclxuXHJcbiAgcm9ib3RWc1JvYm90KGNvbG9yKSB7XHJcbiAgICAvLyBTaSBsYSBwYXJ0aWUgbidlc3QgcGFzIHRlcm1pbsOpXHJcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgIGlmICghdGhpcy5yb2JvdFBsYWNlVW5QaW9uKGNvbG9yKSkge1xyXG4gICAgICAvLyBPbiBmYWlzIGpvdWVyIGwnw6lxdWlwZSBhZHZlcnNlXHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoYXQucm9ib3RWc1JvYm90KFV0aWxzLmdldENvdWxldXJFcXVpcGVBZHZlcnNlKGNvbG9yKSlcclxuICAgICAgfSwgNSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJvYm90UGxhY2VVblBpb24oY29sb3IpIHtcclxuICAgIGNvbnN0IGdhbWUgPSB0aGlzLmdhbWU7XHJcbiAgICAvLyBPbiByw6ljdXDDqHJlIGxhIGxpc3RlIGRlcyBjb2xvbm5lcyBxdWkgbidvbnQgcGFzIGxldXJzXHJcbiAgICAvLyBjb2xvbm5lcyBjb21wbMOpdMOpcy5cclxuICAgIGNvbnN0IGxpc3RlQ29sb25uZXNOb25Db21wbGV0ZXMgPSBnYW1lLmdldExlc0NvbG9ubmVzTm9uQ29tcGxldGVzKCk7XHJcbiAgICBsZXQgY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50ID0gVXRpbHMuZ2V0RWxlbWVudEFsZWF0b2lyZShsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzKTtcclxuICAgIGNvbnN0IGxlc0Nhc2VzUG91dmFudEV0cmVKb3VlciA9IGdhbWUuZ2V0TGVzQ2FzZXNQb3V2YW50RXRyZUpvdWVyKCk7XHJcbiAgICBsZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIuZm9yRWFjaChjYXNlUG91dmFudEV0cmVKb3VlciA9PiB7XHJcbiAgICAgIGxldCBpbmRpY2VIb3Jpem9udGFsZSA9IGNhc2VQb3V2YW50RXRyZUpvdWVyWzBdO1xyXG4gICAgICBsZXQgaW5kaWNlVmVydGljYWxlID0gY2FzZVBvdXZhbnRFdHJlSm91ZXJbMV07XHJcbiAgICAgIGlmIChXaW5uZXJNYW5hZ2VyLnZlcmlmSWZQaW9uUGxhY2VkR2l2ZVdpbihnYW1lLCBpbmRpY2VIb3Jpem9udGFsZSwgaW5kaWNlVmVydGljYWxlLCBjb2xvcikpIHtcclxuICAgICAgICBjb2xvbm5lQ2hvaXNpdEFsZWF0b2lyZW1lbnQgPSBpbmRpY2VIb3Jpem9udGFsZTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChXaW5uZXJNYW5hZ2VyLnZlcmlmSWZQaW9uUGxhY2VkR2l2ZVdpbihnYW1lLCBpbmRpY2VIb3Jpem9udGFsZSwgaW5kaWNlVmVydGljYWxlLCBVdGlscy5nZXRDb3VsZXVyRXF1aXBlQWR2ZXJzZShjb2xvcikpKSB7XHJcbiAgICAgICAgY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50ID0gaW5kaWNlSG9yaXpvbnRhbGU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghbGVzQ2FzZXNQb3V2YW50RXRyZUpvdWVyIHx8IGxlc0Nhc2VzUG91dmFudEV0cmVKb3Vlci5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy5nYW1lLnNldFdpbm5lcihudWxsLCBudWxsKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgYm91Y2xlQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgbGV0IGluZGljZVRhaWxsZVZlcnRpY2FsZSA9IHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXU7XHJcbiAgICAgIHdoaWxlIChpbmRpY2VUYWlsbGVWZXJ0aWNhbGUgPiAwICYmIGJvdWNsZUFjdGl2ZSkge1xyXG4gICAgICAgIGxldCBjb3VsZXVyRHVQaW9uUGxhY2UgPSB0aGlzLmdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50LCBpbmRpY2VUYWlsbGVWZXJ0aWNhbGUpO1xyXG4gICAgICAgIGlmICghY291bGV1ckR1UGlvblBsYWNlKSB7XHJcbiAgICAgICAgICBib3VjbGVBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuZ2FtZS5mb3JjZUFkZFBpb24oY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50LCBpbmRpY2VUYWlsbGVWZXJ0aWNhbGUsIGNvbG9yKVxyXG4gICAgICAgICAgLy9ham91dGVVblBpb25EYW5zQmRkKGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCwgaW5kaWNlVGFpbGxlVmVydGljYWxlLCBjb2xvcik7XHJcbiAgICAgICAgICBjb25zdCBpc1dpbm5lciA9IFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCBjb2xvcik7XHJcbiAgICAgICAgICBpZiAoaXNXaW5uZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLnNldFdpbm5lcihjb2xvciwgaXNXaW5uZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kaWNlVGFpbGxlVmVydGljYWxlLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG59IiwiZXhwb3J0IGNsYXNzIEpldG9uIHtcclxuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbkhvcml6b250YWxlLCBwb3NpdGlvblZlcnRpY2FsZSkge1xyXG4gICAgdGhpcy5wb3NpdGlvbkhvcml6b250YWxlID0gcG9zaXRpb25Ib3Jpem9udGFsZTtcclxuICAgIHRoaXMucG9zaXRpb25WZXJ0aWNhbGUgICA9IHBvc2l0aW9uVmVydGljYWxlO1xyXG4gIH1cclxufSIsImltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9HYW1lXCJcclxuaW1wb3J0IHsgVGVzdHNVbml0cyB9IGZyb20gXCIuL1Rlc3RzVW5pdHNcIlxyXG5pbXBvcnQgeyBSb2JvdE1hbmFnZXIgfSBmcm9tIFwiLi9Sb2JvdE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBham91dGVVblBpb25EYW5zQmRkKHB4OiBudW1iZXIsIHB5OiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHtcclxuICBsZXQgZ2FtZUlkID0gNDtcclxuICAkLnBvc3QoXCIvYXBpL3Bpb25zL3NldExpc3QvXCIsIHtcclxuICAgIGlkOiBnYW1lSWQsXHJcbiAgICBQeDogcHgsXHJcbiAgICBQeTogcHksXHJcbiAgICBDb2xvcjogY29sb3JcclxuICB9KVxyXG4gICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGVzdHNVbml0cygpIHtcclxuICBsZXQgdGVzdHNVbml0cyA9IG5ldyBUZXN0c1VuaXRzKEdhbWUuZ2V0R2FtZSgpKTtcclxuICB0ZXN0c1VuaXRzLmxhdW5jaFRlc3RzVW5pdHMoKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGxheUdhbWUoKSB7XHJcbiAgR2FtZS5nZXRHYW1lKCkucGxheUdhbWUoKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbGFuY2VVbmVQYXJ0aWVEZVJvYm90cygpIHtcclxuICBjb25zdCByb2JvdE1hbmFnZXIgPSBSb2JvdE1hbmFnZXIuZ2V0Um9ib3RNYW5hZ2VyKEdhbWUuZ2V0R2FtZSgpKVxyXG4gIHJvYm90TWFuYWdlci5sYW5jZVVuZVBhcnRpZURlUm9ib3RzKClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5QYXJhbSgpIHtcclxuICAkKCcjZGlhbG9nJykucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICg8YW55PiQoXCIjZGlhbG9nXCIpKS5kaWFsb2coe1xyXG4gICAgcmVzaXphYmxlOiBmYWxzZSxcclxuICAgIGhlaWdodDogXCJhdXRvXCIsXHJcbiAgICB3aWR0aDogNDAwLFxyXG4gICAgbW9kYWw6IHRydWUsXHJcbiAgICBidXR0b25zOiB7XHJcbiAgICAgIFwiVmFsaWRlclwiOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIiNwYXJhbWV0ZXJzVmFsdWVzXCIpLnN1Ym1pdCgpO1xyXG4gICAgICAgICg8YW55PiQodGhpcykpLmRpYWxvZyhcImNsb3NlXCIpXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiRmVybWVyXCI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAoPGFueT4kKHRoaXMpKS5kaWFsb2coXCJjbG9zZVwiKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRQYXJhbSgpIHtcclxuICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShcclxuICAgICc/eD0nICsgJCgnI25iQ2FzZVgnKS52YWwoKSArICcmeT0nICsgJCgnI25iQ2FzZVknKS52YWwoKVxyXG4gIClcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgVGVzdHNVbml0cyB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xyXG4gICAgaWYgKGdhbWUpIHtcclxuICAgICAgdGhpcy5nYW1lID0gZ2FtZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXVjdW5lIHBhcnRpZSBmb3Vybml0XCIpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGxhdW5jaFRlc3RzVW5pdHMoKSB7XHJcbiAgICB0aGlzLmRlZmF1bHRUYWlsbGVIb3Jpem9udGFsZSA9IHRoaXMuZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcbiAgICB0aGlzLmRlZmF1bHRUYWlsbGVWZXJ0aWNhbGUgPSB0aGlzLmdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuXHJcbiAgICBjb25zdCBsaXN0c1Rlc3RzVW5pdHMgPSBbXVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDEoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQyKCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0MygpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDQoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQ1KCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0NigpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDcoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQ4KCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0OSgpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDEwKCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0MTEoKSlcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGlzdHNUZXN0c1VuaXRzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBsZXQgY29sb3I7XHJcbiAgICAgIGlmIChsaXN0c1Rlc3RzVW5pdHNbaW5kZXhdKSB7XHJcbiAgICAgICAgY29sb3IgPSBcImdyZWVuXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29sb3IgPSBcInJlZFwiO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBtZXNzYWdlID0gXCJUZXN0IFwiICsgKGluZGV4ICsgMSkgKyBcIiA6IFwiICsgbGlzdHNUZXN0c1VuaXRzW2luZGV4XSArIFwiXFxuXCI7XHJcbiAgICAgIHRoaXMuZ2FtZS5sb2coXCJUZXN0XCIsIG1lc3NhZ2UsIGNvbG9yKTtcclxuXHJcblxyXG4gICAgfVxyXG4gICAgdGhpcy5yZXNldFRlc3RzKCk7XHJcblxyXG5cclxuICB9XHJcbiAgcmVzZXRUZXN0cygpIHtcclxuICAgIHRoaXMuZ2FtZS50YWlsbGVIb3Jpem9udGFsZUR1SmV1ID0gdGhpcy5kZWZhdWx0VGFpbGxlSG9yaXpvbnRhbGU7XHJcbiAgICB0aGlzLmdhbWUudGFpbGxlVmVydGljYWxlRHVKZXUgPSB0aGlzLmRlZmF1bHRUYWlsbGVWZXJ0aWNhbGU7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgfVxyXG4gIHRlc3RVbml0MSgpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0geyBcInBhcmFtZXRyZXNcIjogeyBcInhcIjogXCI3XCIsIFwieVwiOiBcIjVcIiB9LCBcImRhdGFzXCI6IHsgXCJwaW9uc1wiOiB7IFwicmVkXCI6IFtbNCwgNV0sIFszLCA1XSwgWzIsIDVdLCBbNiwgNF0sIFszLCA0XSwgWzQsIDRdLCBbNywgNF0sIFszLCAzXSwgWzQsIDNdLCBbNywgM10sIFsxLCA0XSwgWzEsIDJdLCBbMSwgMV0sIFsyLCAxXSwgWzcsIDJdLCBbNSwgMl1dLCBcInllbGxvd1wiOiBbWzEsIDVdLCBbNiwgNV0sIFs1LCA1XSwgWzcsIDVdLCBbMiwgNF0sIFs1LCA0XSwgWzIsIDNdLCBbMywgMl0sIFs0LCAyXSwgWzQsIDFdLCBbMSwgM10sIFs2LCAzXSwgWzIsIDJdLCBbNywgMV0sIFs1LCAzXV0gfSB9IH1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcblxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzUsIDJdLCBbNCwgM10sIFszLCA0XSwgWzIsIDVdXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICd5ZWxsb3cnKSAmJiBKU09OLnN0cmluZ2lmeShXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3JlZCcpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0MigpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0geyBcInBhcmFtZXRyZXNcIjogeyBcInhcIjogXCI3XCIsIFwieVwiOiBcIjVcIiB9LCBcImRhdGFzXCI6IHsgXCJwaW9uc1wiOiB7IFwicmVkXCI6IFtbMSwgNV0sIFszLCA1XSwgWzIsIDVdLCBbMiwgM10sIFs1LCA1XSwgWzcsIDRdLCBbMiwgMV0sIFs1LCA0XV0sIFwieWVsbG93XCI6IFtbNywgNV0sIFs0LCA1XSwgWzIsIDRdLCBbNiwgNV0sIFszLCA0XSwgWzIsIDJdLCBbNCwgNF0sIFsxLCA0XV0gfSB9IH1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcblxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzQsIDFdLCBbNCwgMl0sIFs0LCAzXSwgWzQsIDRdXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICdyZWQnKSAmJiBKU09OLnN0cmluZ2lmeShXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3llbGxvdycpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0MygpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0geyBcInBhcmFtZXRyZXNcIjogeyBcInhcIjogXCI3XCIsIFwieVwiOiBcIjVcIiB9LCBcImRhdGFzXCI6IHsgXCJwaW9uc1wiOiB7IFwicmVkXCI6IFtbMywgNV0sIFs3LCA1XSwgWzEsIDVdLCBbNywgNF0sIFs1LCA0XSwgWzQsIDJdLCBbMiwgNV0sIFsxLCA0XSwgWzIsIDNdLCBbNywgMl0sIFsyLCAyXSwgWzMsIDNdLCBbMSwgM10sIFs2LCA0XV0sIFwieWVsbG93XCI6IFtbNCwgNV0sIFs1LCA1XSwgWzMsIDRdLCBbNCwgNF0sIFs0LCAzXSwgWzcsIDNdLCBbNCwgMV0sIFsyLCA0XSwgWzYsIDVdLCBbNywgMV0sIFs1LCAzXSwgWzUsIDJdLCBbMiwgMV0sIFsxLCAyXSwgWzYsIDNdXSB9IH0gfVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbMywgNF0sIFszLCA1XSwgWzMsIDZdLCBbMywgN11dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3JlZCcpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAneWVsbG93JykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbiAgdGVzdFVuaXQ0KCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7IFwicGFyYW1ldHJlc1wiOiB7IFwieFwiOiBcIjdcIiwgXCJ5XCI6IFwiNVwiIH0sIFwiZGF0YXNcIjogeyBcInBpb25zXCI6IHsgXCJyZWRcIjogW1s1LCA1XSwgWzUsIDRdLCBbMywgNV0sIFs0LCA1XSwgWzEsIDVdLCBbMSwgNF0sIFs0LCAzXSwgWzYsIDJdLCBbNCwgMl0sIFsyLCAzXSwgWzUsIDJdLCBbNywgM10sIFs1LCAxXSwgWzcsIDFdLCBbMiwgMl0sIFsyLCAxXSwgWzMsIDRdLCBbMywgM11dLCBcInllbGxvd1wiOiBbWzcsIDVdLCBbNiwgNV0sIFs2LCA0XSwgWzIsIDVdLCBbNCwgNF0sIFs3LCA0XSwgWzYsIDNdLCBbNSwgM10sIFsyLCA0XSwgWzQsIDFdLCBbNiwgMV0sIFsxLCAzXSwgWzcsIDJdLCBbMSwgMl0sIFsxLCAxXSwgWzMsIDJdLCBbMywgMV1dIH0gfSB9XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG5cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAncmVkJykgJiYgIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAneWVsbG93JykpXHJcbiAgfVxyXG4gIHRlc3RVbml0NSgpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0geyBcInBhcmFtZXRyZXNcIjogeyBcInhcIjogXCI3XCIsIFwieVwiOiBcIjVcIiB9LCBcImRhdGFzXCI6IHsgXCJwaW9uc1wiOiB7IFwicmVkXCI6IFtbMywgNV0sIFs0LCA1XSwgWzEsIDVdLCBbNywgNV0sIFs3LCA0XSwgWzYsIDJdLCBbNSwgNV0sIFs1LCA0XSwgWzUsIDJdLCBbMiwgMl0sIFsxLCA0XSwgWzQsIDNdLCBbNywgM10sIFs0LCAyXSwgWzMsIDFdLCBbNywgMV0sIFsxLCAyXSwgWzEsIDFdXSwgXCJ5ZWxsb3dcIjogW1s2LCA1XSwgWzYsIDRdLCBbMiwgNV0sIFsyLCA0XSwgWzYsIDNdLCBbMywgNF0sIFs2LCAxXSwgWzUsIDNdLCBbMiwgM10sIFs0LCA0XSwgWzEsIDNdLCBbMywgM10sIFs3LCAyXSwgWzMsIDJdLCBbNCwgMV0sIFsyLCAxXSwgWzUsIDFdXSB9IH0gfVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3JlZCcpICYmICFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3llbGxvdycpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDYoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHsgXCJwYXJhbWV0cmVzXCI6IHsgXCJ4XCI6IFwiN1wiLCBcInlcIjogXCI1XCIgfSwgXCJkYXRhc1wiOiB7IFwicGlvbnNcIjogeyBcInJlZFwiOiBbWzMsIDVdLCBbNywgNF0sIFs0LCA1XSwgWzUsIDRdLCBbNCwgNF0sIFsxLCA0XSwgWzMsIDRdLCBbNCwgM10sIFszLCAzXSwgWzUsIDJdLCBbNiwgNF1dLCBcInllbGxvd1wiOiBbWzcsIDVdLCBbNSwgNV0sIFs3LCAzXSwgWzIsIDVdLCBbMSwgNV0sIFs3LCAyXSwgWzUsIDNdLCBbMiwgNF0sIFs0LCAyXSwgWzMsIDJdLCBbNiwgNV1dIH0gfSB9XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG5cclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s0LCAzXSwgWzQsIDRdLCBbNCwgNV0sIFs0LCA2XV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAneWVsbG93JykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICdyZWQnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDcoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHsgXCJwYXJhbWV0cmVzXCI6IHsgXCJ4XCI6IFwiN1wiLCBcInlcIjogXCIxMFwiIH0sIFwiZGF0YXNcIjogeyBcInBpb25zXCI6IHsgXCJyZWRcIjogW1s2LCAxMF0sIFsyLCAxMF0sIFs3LCA5XSwgWzEsIDEwXSwgWzUsIDEwXSwgWzMsIDldLCBbNiwgOF0sIFs2LCA2XSwgWzYsIDVdLCBbNywgN10sIFs1LCA4XSwgWzMsIDddLCBbMywgNl0sIFs0LCA4XSwgWzYsIDNdLCBbNCwgN10sIFsxLCA4XSwgWzQsIDVdLCBbMiwgNl0sIFsyLCA0XSwgWzMsIDRdLCBbMywgM10sIFsxLCA3XV0sIFwieWVsbG93XCI6IFtbNywgMTBdLCBbMywgMTBdLCBbNiwgOV0sIFsyLCA5XSwgWzQsIDEwXSwgWzEsIDldLCBbNywgOF0sIFs2LCA3XSwgWzQsIDldLCBbMiwgOF0sIFs1LCA5XSwgWzMsIDhdLCBbNywgNl0sIFs1LCA3XSwgWzYsIDRdLCBbNSwgNl0sIFszLCA1XSwgWzQsIDZdLCBbMiwgN10sIFsyLCA1XSwgWzQsIDRdLCBbNiwgMl0sIFs3LCA1XSwgWzEsIDZdXSB9IH0gfVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbOSwgNF0sIFs4LCAzXSwgWzcsIDJdLCBbNiwgMV1dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3JlZCcpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAneWVsbG93JykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbiAgdGVzdFVuaXQ4KCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7IFwicGFyYW1ldHJlc1wiOiB7IFwieFwiOiBcIjExXCIsIFwieVwiOiBcIjZcIiB9LCBcImRhdGFzXCI6IHsgXCJwaW9uc1wiOiB7IFwicmVkXCI6IFtbMSwgNl0sIFs1LCA2XSwgWzcsIDZdLCBbMiwgNV0sIFsxMSwgNl0sIFs5LCA2XSwgWzksIDVdLCBbOCwgM10sIFszLCA0XSwgWzQsIDZdLCBbOSwgNF1dLCBcInllbGxvd1wiOiBbWzgsIDZdLCBbOCwgNV0sIFsyLCA2XSwgWzYsIDZdLCBbMywgNl0sIFszLCA1XSwgWzgsIDRdLCBbMSwgNV0sIFsyLCA0XSwgWzcsIDVdLCBbOSwgM11dIH0gfSB9XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG5cclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s2LCA2XSwgWzUsIDddLCBbNCwgOF0sIFszLCA5XV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAncmVkJykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICd5ZWxsb3cnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDkoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHsgXCJwYXJhbWV0cmVzXCI6IHsgXCJ4XCI6IFwiNFwiLCBcInlcIjogXCI0XCIgfSwgXCJkYXRhc1wiOiB7IFwicGlvbnNcIjogeyBcInJlZFwiOiBbWzQsIDRdLCBbMiwgNF0sIFs0LCAyXSwgWzIsIDNdLCBbNCwgMV0sIFsyLCAxXSwgWzEsIDJdLCBbMywgMV1dLCBcInllbGxvd1wiOiBbWzEsIDRdLCBbNCwgM10sIFszLCA0XSwgWzMsIDNdLCBbMiwgMl0sIFsxLCAzXSwgWzMsIDJdLCBbMSwgMV1dIH0gfSB9XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG5cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAncmVkJykgJiYgIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAneWVsbG93JykpXHJcbiAgfVxyXG4gIHRlc3RVbml0MTAoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHsgXCJwYXJhbWV0cmVzXCI6IHsgXCJ4XCI6IFwiNFwiLCBcInlcIjogXCI0XCIgfSwgXCJkYXRhc1wiOiB7IFwicGlvbnNcIjogeyBcInJlZFwiOiBbWzIsIDRdLCBbMywgNF0sIFsyLCAyXSwgWzIsIDFdLCBbMSwgM10sIFs0LCAyXV0sIFwieWVsbG93XCI6IFtbNCwgNF0sIFs0LCAzXSwgWzIsIDNdLCBbMSwgNF0sIFszLCAzXSwgWzMsIDJdLCBbNCwgMV1dIH0gfSB9XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG5cclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s0LCAxXSwgWzMsIDJdLCBbMiwgM10sIFsxLCA0XV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAncmVkJykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICd5ZWxsb3cnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDExKCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7IFwicGFyYW1ldHJlc1wiOiB7IFwieFwiOiBcIjhcIiwgXCJ5XCI6IFwiN1wiIH0sIFwiZGF0YXNcIjogeyBcInBpb25zXCI6IHsgXCJyZWRcIjogW1sxLCA3XSwgWzYsIDddLCBbNCwgNl0sIFs4LCA2XSwgWzMsIDZdLCBbNywgN10sIFs3LCA2XSwgWzcsIDVdLCBbNSwgN10sIFsyLCA3XSwgWzUsIDZdLCBbNSwgNV0sIFs1LCAzXSwgWzcsIDNdLCBbNiwgNV1dLCBcInllbGxvd1wiOiBbWzgsIDddLCBbMywgN10sIFs0LCA3XSwgWzQsIDVdLCBbNCwgNF0sIFsxLCA2XSwgWzgsIDVdLCBbOCwgNF0sIFs3LCA0XSwgWzMsIDVdLCBbNiwgNl0sIFsyLCA2XSwgWzUsIDRdLCBbMywgNF0sIFs3LCAyXSwgWzYsIDRdXSB9IH0gfVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbNCwgM10sIFs0LCA0XSwgWzQsIDVdLCBbNCwgNl1dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3JlZCcpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAneWVsbG93JykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9HYW1lXCJcclxuaW1wb3J0ICogYXMgbW9kdWxlcyBmcm9tICcuL2dhbWVNYW5hZ2VyJztcclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gIGNvbnN0IGdhbWUgPSBHYW1lLmdldEdhbWUoKVxyXG4gICQoXCIjcGxheUJ1dHRvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHsgZ2FtZS5wbGF5R2FtZSgpIH0pXHJcbiAgJChcIiNyb2JvdEJ1dHRvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHsgbW9kdWxlcy5sYW5jZVVuZVBhcnRpZURlUm9ib3RzKCkgfSlcclxuICAkKFwiI29wdGlvbnNCdXR0b25cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7IG1vZHVsZXMub3BlblBhcmFtKCkgfSlcclxuICAkKFwiaHRtbFwiKS5vbihcImtleWRvd25cIiwgXCJib2R5XCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKGdhbWUubW9uVG91ci5nZXQoKSkge1xyXG4gICAgICBjb25zdCBrZXkgPSBldmVudC5rZXlDb2RlO1xyXG4gICAgICBpZiAoJChcIiNnYW1lIC5yb3cgLmljb25bc3VyYnJpbGxhbmNlPSdyZWQnXVwiKS5sZW5ndGggPj0gMSAmJiAhZ2FtZS5pc0RyYXcoKSkge1xyXG4gICAgICAgIGNvbnN0IHBpb25FblN1cmJyaWxsYW5jZSA9ICQoXCIjZ2FtZSAucm93IC5pY29uW3N1cmJyaWxsYW5jZT0ncmVkJ11cIik7XHJcbiAgICAgICAgbGV0IGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPSBwYXJzZUludChwaW9uRW5TdXJicmlsbGFuY2UuYXR0cihcImNhc2VcIikpO1xyXG4gICAgICAgIGlmIChpbmRleEhvcml6b250YWxlRHVQaW9uKSB7XHJcbiAgICAgICAgICAkKFwiI2dhbWUgLnJvdyAuaWNvblwiKS5tb3VzZW91dCgpO1xyXG4gICAgICAgICAgaWYgKGtleSA9PSAzOSkge1xyXG4gICAgICAgICAgICAvLyBmbMOoY2hlIGRyb2l0ZSA6IHNpbXVsYXRpb24gw6AgZHJvaXRlXHJcbiAgICAgICAgICAgIGluZGV4SG9yaXpvbnRhbGVEdVBpb24rKztcclxuICAgICAgICAgICAgaWYgKGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPj0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpICsgMSkge1xyXG4gICAgICAgICAgICAgIGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdoaWxlICghZ2FtZS5nZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpLmluY2x1ZGVzKGluZGV4SG9yaXpvbnRhbGVEdVBpb24pICYmICFnYW1lLmlzRHJhdygpICYmIGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPD0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpKSB7XHJcbiAgICAgICAgICAgICAgaW5kZXhIb3Jpem9udGFsZUR1UGlvbisrO1xyXG4gICAgICAgICAgICAgIGlmIChpbmRleEhvcml6b250YWxlRHVQaW9uID49IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKSArIDEpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPSAxO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJChcIiNnYW1lIC5yb3dbdmFsPScxJ10gLmljb25bY2FzZT0nXCIgKyBpbmRleEhvcml6b250YWxlRHVQaW9uICsgXCInXVwiKS5tb3VzZW92ZXIoKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09IDM3KSB7XHJcbiAgICAgICAgICAgIC8vIGZsw6hjaGUgZ2F1Y2hlIDogc2ltdWxhdGlvbiDDoCBnYXVjaGVcclxuICAgICAgICAgICAgaW5kZXhIb3Jpem9udGFsZUR1UGlvbi0tO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpbmRleEhvcml6b250YWxlRHVQaW9uKVxyXG4gICAgICAgICAgICB3aGlsZSAoIWdhbWUuZ2V0TGVzQ29sb25uZXNOb25Db21wbGV0ZXMoKS5pbmNsdWRlcyhpbmRleEhvcml6b250YWxlRHVQaW9uKSAmJiAhZ2FtZS5pc0RyYXcoKSAmJiBpbmRleEhvcml6b250YWxlRHVQaW9uID49IDApIHtcclxuICAgICAgICAgICAgICBpbmRleEhvcml6b250YWxlRHVQaW9uLS07XHJcbiAgICAgICAgICAgICAgaWYgKGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coaW5kZXhIb3Jpem9udGFsZUR1UGlvbilcclxuICAgICAgICAgICAgJChcIiNnYW1lIC5yb3dbdmFsPScxJ10gLmljb25bY2FzZT0nXCIgKyBpbmRleEhvcml6b250YWxlRHVQaW9uICsgXCInXVwiKS5tb3VzZW92ZXIoKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09IDEzIHx8IGtleSA9PSAzOCkge1xyXG4gICAgICAgICAgICAvLyB0b3VjaGUgZW50csOpIG91IGZsw6hjaGUgaGF1dCA6IHNpbXVsYXRpb24gZCd1biBjbGlja1xyXG4gICAgICAgICAgICAkKHBpb25FblN1cmJyaWxsYW5jZSkuY2xpY2soKTtcclxuICAgICAgICAgICAgaWYgKCFnYW1lLmdldExlc0NvbG9ubmVzTm9uQ29tcGxldGVzKCkuaW5jbHVkZXMoaW5kZXhIb3Jpem9udGFsZUR1UGlvbikpIHtcclxuICAgICAgICAgICAgICBpbmRleEhvcml6b250YWxlRHVQaW9uKytcclxuICAgICAgICAgICAgICBpZiAoaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA+PSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKCkgKyAxKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleEhvcml6b250YWxlRHVQaW9uID0gMTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgd2hpbGUgKCFnYW1lLmdldExlc0NvbG9ubmVzTm9uQ29tcGxldGVzKCkuaW5jbHVkZXMoaW5kZXhIb3Jpem9udGFsZUR1UGlvbikgJiYgIWdhbWUuaXNEcmF3KCkgJiYgaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA8PSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKCkpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4SG9yaXpvbnRhbGVEdVBpb24rKztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgJChcIiNnYW1lIC5yb3dbdmFsPScxJ10gLmljb25bY2FzZT0nXCIgKyBpbmRleEhvcml6b250YWxlRHVQaW9uICsgXCInXVwiKS5tb3VzZW92ZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKFwiI2dhbWUgLnJvdyAuaWNvblwiKS5tb3VzZW91dCgpO1xyXG4gICAgICAgIGxldCBpbmRleEhvcml6b250YWxlRHVQaW9uID0gMTtcclxuICAgICAgICB3aGlsZSAoIWdhbWUuZ2V0TGVzQ29sb25uZXNOb25Db21wbGV0ZXMoKS5pbmNsdWRlcyhpbmRleEhvcml6b250YWxlRHVQaW9uKSAmJiAhZ2FtZS5pc0RyYXcoKSAmJiBpbmRleEhvcml6b250YWxlRHVQaW9uIDw9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKSkge1xyXG4gICAgICAgICAgaW5kZXhIb3Jpem9udGFsZUR1UGlvbisrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKFwiI2dhbWUgLnJvd1t2YWw9JzEnXSAuaWNvbltjYXNlPSdcIiArIGluZGV4SG9yaXpvbnRhbGVEdVBpb24gKyBcIiddXCIpLm1vdXNlb3ZlcigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgJChcIiNib3hcIikub24oJ2NsaWNrJywgJyNnYW1lIC5pY29uJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKGdhbWUubW9uVG91ci5nZXQoKSkge1xyXG4gICAgICBjb25zdCBwb3NpdGlvbkhvcml6b250YWxlID0gZ2FtZS5nZXRQb3NpdGlvbkhvcml6b250YWxlKCQodGhpcykpXHJcbiAgICAgIGdhbWUuYWRkUGlvbihwb3NpdGlvbkhvcml6b250YWxlKTtcclxuICAgICAgZ2FtZS5zZWxlY3QocG9zaXRpb25Ib3Jpem9udGFsZSk7XHJcbiAgICB9XHJcbiAgfSlcclxuICAkKFwiI2JveFwiKS5vbignbW91c2VvdmVyJywgJyNnYW1lIC5pY29uJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKGdhbWUubW9uVG91ci5nZXQoKSkge1xyXG4gICAgICBnYW1lLnNlbGVjdChnYW1lLmdldFBvc2l0aW9uSG9yaXpvbnRhbGUoJCh0aGlzKSkpO1xyXG4gICAgfVxyXG4gIH0pXHJcbiAgJChcIiNib3hcIikub24oJ21vdXNlb3V0JywgJyNnYW1lIC5pY29uJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKGdhbWUubW9uVG91ci5nZXQoKSkge1xyXG4gICAgICBnYW1lLnVuU2VsZWN0KCk7XHJcbiAgICB9XHJcbiAgfSlcclxufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9