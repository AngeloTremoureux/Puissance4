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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFLENBQUMsTUFBTSxDQUFDO1FBQ3pCLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLE1BQU0sRUFBRSxNQUFNO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixLQUFLLEVBQUUsSUFBSTtRQUNYLE9BQU8sRUFBRTtZQUNQLFNBQVMsRUFBRTtnQkFDVCxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDaEMsQ0FBQztZQUNELFFBQVEsRUFBRTtnQkFDRixDQUFDLENBQUMsSUFBSSxDQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUNoQyxDQUFDO1NBQ0Y7S0FDRixDQUFDO0FBQ0osQ0FBQztBQUVNLFNBQVMsU0FBUztJQUN2QixNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FDckIsS0FBSyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUMxRDtBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvR2FtZS50cyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvTW9uVG91ci5qcyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvVXRpbHMuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL1dpbm5lck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL0NoZWNrSWZXaW5uZXIuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL1JvYm90TWFuYWdlci5qcyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvSmV0b24udHMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL1Rlc3RzVW5pdHMuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9nYW1lTWFuYWdlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb25Ub3VyIH0gZnJvbSBcIi4vTW9uVG91clwiXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IHsgV2lubmVyTWFuYWdlciB9IGZyb20gXCIuL1dpbm5lck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUm9ib3RNYW5hZ2VyIH0gZnJvbSBcIi4vUm9ib3RNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEpldG9uIH0gZnJvbSBcIi4vSmV0b25cIjtcclxuaW1wb3J0ICogYXMgSW50ZXJmYWNlIGZyb20gXCIuL0ludGVyZmFjZXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lIHtcclxuXHJcbiAgcHJpdmF0ZSB0YWlsbGVIb3Jpem9udGFsZUR1SmV1OiBudW1iZXI7XHJcbiAgcHJpdmF0ZSB0YWlsbGVWZXJ0aWNhbGVEdUpldTogbnVtYmVyO1xyXG4gIHByaXZhdGUgbGlzdGVQaW9uc1JvdWdlOiBBcnJheTxKZXRvbj47XHJcbiAgcHJpdmF0ZSBsaXN0ZVBpb25zSmF1bmU6IEFycmF5PEpldG9uPjtcclxuICBwdWJsaWMgbW9uVG91cjogTW9uVG91cjtcclxuICBwcml2YXRlIHN0YXRpYyBnYW1lOiBHYW1lO1xyXG5cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHRhaWxsZUhvcml6b250YWxlOiBudW1iZXIsIHRhaWxsZVZlcnRpY2FsZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXUgPSB0YWlsbGVIb3Jpem9udGFsZTtcclxuICAgIHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXUgPSB0YWlsbGVWZXJ0aWNhbGU7XHJcbiAgICB0aGlzLmxpc3RlUGlvbnNSb3VnZSA9IG5ldyBBcnJheSgpO1xyXG4gICAgdGhpcy5saXN0ZVBpb25zSmF1bmUgPSBuZXcgQXJyYXkoKTtcclxuICAgIHRoaXMubW9uVG91ciA9IG5ldyBNb25Ub3VyKClcclxuICAgIHRoaXMuZGlzYWJsZUdhbWUoKVxyXG4gICAgdGhpcy5sb2coXHJcbiAgICAgIFwiUHVpc3NhbmNlIDRcIixcclxuICAgICAgXCJJbml0aWFsaXNhdGlvbiBkdSBqZXUgZW4gXCIgKyB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXUgKyBcInhcIiArIHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXVcclxuICAgICk7XHJcbiAgICBHYW1lLmdhbWUgPSB0aGlzO1xyXG4gIH1cclxuICBwdWJsaWMgc3RhdGljIGdldEdhbWUoKTogR2FtZSB7XHJcbiAgICBpZiAoR2FtZS5nYW1lKSB7XHJcbiAgICAgIHJldHVybiBHYW1lLmdhbWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCB0YWlsbGVIb3Jpem9udGFsZVBhcnNlZCA9IHRoaXMuZ2V0VGFpbGxlSG9yaXpvbnRhbGVGcm9tVXJsKClcclxuICAgICAgbGV0IHRhaWxsZVZlcnRpY2FsZVBhcnNlZCA9IHRoaXMuZ2V0VGFpbGxlVmVydGljYWxlRnJvbVVybCgpXHJcbiAgICAgIHJldHVybiBuZXcgR2FtZSh0YWlsbGVIb3Jpem9udGFsZVBhcnNlZCwgdGFpbGxlVmVydGljYWxlUGFyc2VkKVxyXG5cclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIHN0YXRpYyBnZXRUYWlsbGVIb3Jpem9udGFsZUZyb21VcmwoKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IHBhcmFtc1VybDogYW55ID0gVXRpbHMucGFyc2VVUkxQYXJhbXMod2luZG93LmxvY2F0aW9uLmhyZWYpXHJcbiAgICBpZiAodHlwZW9mIHBhcmFtc1VybCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGFyYW1zVXJsLnRhaWxsZUhvcml6b250YWxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IHBhcmFtc1VybC50YWlsbGVIb3Jpem9udGFsZVswXTtcclxuICAgICAgaWYgKHBhcnNlSW50KHRhaWxsZUhvcml6b250YWxlKSkge1xyXG4gICAgICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlUGFyc2VkID0gcGFyc2VJbnQodGFpbGxlSG9yaXpvbnRhbGUpXHJcbiAgICAgICAgaWYgKHRhaWxsZUhvcml6b250YWxlUGFyc2VkID49IDQgJiYgdGFpbGxlSG9yaXpvbnRhbGVQYXJzZWQgPD0gMjApIHtcclxuICAgICAgICAgIHJldHVybiB0YWlsbGVIb3Jpem9udGFsZVBhcnNlZFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gNztcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIDc7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiA3O1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgc3RhdGljIGdldFRhaWxsZVZlcnRpY2FsZUZyb21VcmwoKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IHBhcmFtc1VybDogYW55ID0gVXRpbHMucGFyc2VVUkxQYXJhbXMod2luZG93LmxvY2F0aW9uLmhyZWYpXHJcbiAgICBpZiAodHlwZW9mIHBhcmFtc1VybCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGFyYW1zVXJsLnRhaWxsZVZlcnRpY2FsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgdGFpbGxlVmVydGljYWxlID0gcGFyYW1zVXJsLnRhaWxsZVZlcnRpY2FsZVswXTtcclxuICAgICAgaWYgKHBhcnNlSW50KHRhaWxsZVZlcnRpY2FsZSkpIHtcclxuICAgICAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGVQYXJzZWQgPSBwYXJzZUludCh0YWlsbGVWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKHRhaWxsZVZlcnRpY2FsZVBhcnNlZCA+PSA0ICYmIHRhaWxsZVZlcnRpY2FsZVBhcnNlZCA8PSAyMCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRhaWxsZVZlcnRpY2FsZVBhcnNlZFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gNTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIDU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiA1O1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgc2VhcmNoUGllY2UoY291bGV1cjogc3RyaW5nLCBpbml0Q2FzZTogbnVtYmVyKSB7XHJcbiAgICBjb25zdCByZWRDaXJjbGUgPSAkKCcjcHJldmlldyAjcmVkX2NpcmNsZScpXHJcbiAgICBjb25zdCB5ZWxsb3dDaXJjbGUgPSAkKCcjcHJldmlldyAjeWVsbG93X2NpcmNsZScpXHJcbiAgICBjb25zdCBkZWZhdWx0Q2lyY2xlID0gJCgnI3ByZXZpZXcgI2Jhc2ljX2NpcmNsZScpXHJcbiAgICBpZiAoaW5pdENhc2UpIHtcclxuICAgICAgaWYgKGNvdWxldXIgPT09ICdyZWQnKSB7XHJcbiAgICAgICAgJChyZWRDaXJjbGUpLmNoaWxkcmVuKCkuY2hpbGRyZW4oKS5hdHRyKCdjYXNlJywgaW5pdENhc2UpXHJcbiAgICAgICAgcmV0dXJuICQocmVkQ2lyY2xlKS5odG1sKClcclxuICAgICAgfSBlbHNlIGlmIChjb3VsZXVyID09PSAneWVsbG93Jykge1xyXG4gICAgICAgICQoeWVsbG93Q2lyY2xlKS5jaGlsZHJlbigpLmNoaWxkcmVuKCkuYXR0cignY2FzZScsIGluaXRDYXNlKVxyXG4gICAgICAgIHJldHVybiAkKHllbGxvd0NpcmNsZSkuaHRtbCgpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJChkZWZhdWx0Q2lyY2xlKS5jaGlsZHJlbigpLmNoaWxkcmVuKCkuYXR0cignY2FzZScsIGluaXRDYXNlKVxyXG4gICAgICAgIHJldHVybiAkKGRlZmF1bHRDaXJjbGUpLmh0bWwoKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoY291bGV1ciA9PT0gJ3JlZCcpIHtcclxuICAgICAgICByZXR1cm4gJChyZWRDaXJjbGUpLmh0bWwoKVxyXG4gICAgICB9IGVsc2UgaWYgKGNvdWxldXIgPT09ICd5ZWxsb3cnKSB7XHJcbiAgICAgICAgcmV0dXJuICQoeWVsbG93Q2lyY2xlKS5odG1sKClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gJChkZWZhdWx0Q2lyY2xlKS5odG1sKClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZTogbnVtYmVyLCBpbmRleFZlcnRpY2FsZTogbnVtYmVyKTogc3RyaW5nfGJvb2xlYW4ge1xyXG4gICAgdGhpcy5nZXRQaW9ucygxKS5mb3JFYWNoKGpldG9uID0+IHtcclxuICAgICAgaWYgKGpldG9uLmdldFBvc2l0aW9uKCkgPT0gW2luZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlXSkge1xyXG4gICAgICAgIHJldHVybiAncmVkJztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmdldFBpb25zKDIpLmZvckVhY2goamV0b24gPT4ge1xyXG4gICAgICBpZiAoamV0b24uZ2V0UG9zaXRpb24oKSA9PSBbaW5kZXhIb3Jpem9udGFsZSwgaW5kZXhWZXJ0aWNhbGVdKSB7XHJcbiAgICAgICAgcmV0dXJuICd5ZWxsb3cnO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHB1YmxpYyBjbGVhckdhbWUoKTogdm9pZCB7XHJcbiAgICAkKCcucm93JykucmVtb3ZlKClcclxuICB9XHJcbiAgcHVibGljIHJlc2V0R2FtZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2xlYXJHYW1lKClcclxuICAgIHRoaXMuY2xlYXJQaW9ucygpXHJcbiAgICB0aGlzLmNyZWF0ZUJhY2tncm91bmQoKVxyXG4gICAgdGhpcy5kaXNhYmxlR2FtZSgpXHJcbiAgfVxyXG4gIHB1YmxpYyBwbGF5R2FtZSgpOiB2b2lkIHtcclxuICAgIGxldCBhdWRpbyA9IG5ldyBBdWRpbygnLi4vcHVibGljL2F1ZGlvL3N0YXJ0R2FtZS5tcDQnKTtcclxuICAgIGF1ZGlvLnBsYXkoKTtcclxuICAgIGF1ZGlvID0gbnVsbDtcclxuICAgIHRoaXMucmVzZXRHYW1lKClcclxuICAgIHRoaXMuc2V0TWVzc2FnZShcIkEgdG9pIGRlIGpvdWVyICFcIilcclxuICAgIHRoaXMuZW5hYmxlR2FtZSgpXHJcbiAgfVxyXG4gIHB1YmxpYyBzZWxlY3QoaW5kZXhIb3Jpem9udGFsZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBsZXQgaW5kZXhWZXJ0aWNhbGUgPSB0aGlzLmdldFRhaWxsZVZlcnRpY2FsZSgpO1xyXG4gICAgd2hpbGUgKGluZGV4VmVydGljYWxlID4gMCkge1xyXG4gICAgICBsZXQgdGVhbUNvbG9yID0gdGhpcy5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleEhvcml6b250YWxlLCBpbmRleFZlcnRpY2FsZSlcclxuICAgICAgaWYgKCF0ZWFtQ29sb3IpIHtcclxuICAgICAgICBsZXQgY291bGV1ciA9ICQoXCIjZ2FtZSAucm93XCIpLmVxKChpbmRleFZlcnRpY2FsZSAtIDEpKS5maW5kKFwiLmljb25cIikuZXEoaW5kZXhIb3Jpem9udGFsZSAtIDEpXHJcbiAgICAgICAgY291bGV1ci5hdHRyKFwic3VyYnJpbGxhbmNlXCIsIFwicmVkXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpbmRleFZlcnRpY2FsZS0tO1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgZ2V0TGVzQ29sb25uZXNOb25Db21wbGV0ZXMoKTogbnVtYmVyW10ge1xyXG4gICAgbGV0IGxpc3RlQ29sb25uZXNOb25Db21wbGV0ZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGluZGV4SG9yaXpvbnRhbGUgPSAxOyBpbmRleEhvcml6b250YWxlIDw9IHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldTsgaW5kZXhIb3Jpem9udGFsZSsrKSB7XHJcbiAgICAgIGlmICghdGhpcy5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleEhvcml6b250YWxlLCAxKSkge1xyXG4gICAgICAgIGxpc3RlQ29sb25uZXNOb25Db21wbGV0ZXMucHVzaChpbmRleEhvcml6b250YWxlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpc3RlQ29sb25uZXNOb25Db21wbGV0ZXM7XHJcbiAgfVxyXG4gIHB1YmxpYyBpc0RyYXcoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5saXN0ZVBpb25zSmF1bmUubGVuZ3RoICsgdGhpcy5saXN0ZVBpb25zUm91Z2UubGVuZ3RoID49IHRoaXMuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKSAqIHRoaXMuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICB9XHJcbiAgcHVibGljIGdldFRhaWxsZUhvcml6b250YWxlKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1O1xyXG4gIH1cclxuICBwdWJsaWMgZ2V0VGFpbGxlVmVydGljYWxlKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldTtcclxuICB9XHJcbiAgcHVibGljIGdldExlc0Nhc2VzUG91dmFudEV0cmVKb3VlcigpOiBudW1iZXJbXVtdIHtcclxuICAgIGxldCBsaXN0ZURlc0Nhc2VzUG91dmFudEV0cmVKb3VlcjogQXJyYXk8QXJyYXk8bnVtYmVyPj4gPSBbXTtcclxuICAgIGxldCBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzID0gdGhpcy5nZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpO1xyXG4gICAgbGV0IGFUcm91dmVyTGVQaW9uO1xyXG4gICAgbGlzdGVDb2xvbm5lc05vbkNvbXBsZXRlcy5mb3JFYWNoKG51bWVyb0NvbG9ubmVIb3Jpem9udGFsZSA9PiB7XHJcbiAgICAgIGxldCBudW1lcm9Db2xvbm5lVmVydGljYWxlID0gdGhpcy5nZXRUYWlsbGVWZXJ0aWNhbGUoKTtcclxuICAgICAgYVRyb3V2ZXJMZVBpb24gPSBmYWxzZTtcclxuICAgICAgd2hpbGUgKG51bWVyb0NvbG9ubmVWZXJ0aWNhbGUgPiAwICYmICFhVHJvdXZlckxlUGlvbikge1xyXG4gICAgICAgIGlmICghVXRpbHMuYXJyYXkyRENvbnRhaW5zQXJyYXkodGhpcy5nZXRQaW9ucygxKSwgW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pXHJcbiAgICAgICAgICAmJiAhVXRpbHMuYXJyYXkyRENvbnRhaW5zQXJyYXkodGhpcy5nZXRQaW9ucygyKSwgW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc0Nhc2VzUG91dmFudEV0cmVKb3Vlci5wdXNoKFtudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGVdKVxyXG4gICAgICAgICAgYVRyb3V2ZXJMZVBpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbnVtZXJvQ29sb25uZVZlcnRpY2FsZS0tO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBsaXN0ZURlc0Nhc2VzUG91dmFudEV0cmVKb3VlcjtcclxuICB9XHJcbiAgcHVibGljIGV4cG9ydCgpOiB2b2lkIHtcclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJBZmZpY2hhZ2UgZGUgbCdleHBvcnQuLi5cIik7XHJcbiAgICBsZXQgcGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IEpldG9uW10gfSA9IHt9O1xyXG4gICAgcGFyYW1zWydyZWQnXSA9IHRoaXMuZ2V0UGlvbnMoJ3JlZCcpXHJcbiAgICBwYXJhbXNbJ3llbGxvdyddID0gdGhpcy5nZXRQaW9ucygneWVsbG93JylcclxuICAgIGNvbnN0IHJlZCA9IHBhcmFtc1sncmVkJ107XHJcbiAgICBjb25zdCB5ZWxsb3cgPSBwYXJhbXNbJ3llbGxvdyddO1xyXG4gICAgY29uc3QgcmVxdWVzdCA9ICQuYWpheCh7XHJcbiAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgdXJsOiBcImFwaS9leHBvcnQ/eD1cIiArIHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldSArIFwiJnk9XCIgKyB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1LFxyXG4gICAgICBkYXRhOiB7IHJlZDogcmVkLCB5ZWxsb3c6IHllbGxvdyB9LFxyXG4gICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgIHRpbWVvdXQ6IDEyMDAwMFxyXG4gICAgfSlcclxuICAgIHJlcXVlc3QuZG9uZShmdW5jdGlvbiAob3V0cHV0X3N1Y2Nlc3MpIHtcclxuICAgICAgY29uc29sZS5sb2cob3V0cHV0X3N1Y2Nlc3MpXHJcbiAgICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJMJ2V4cG9ydCBzJ2VzdCBjb3JyZWN0ZW1lbnQgdGVybWluw6lcIik7XHJcbiAgICB9KVxyXG4gICAgcmVxdWVzdC5mYWlsKGZ1bmN0aW9uIChodHRwX2Vycm9yKSB7XHJcbiAgICAgIGxldCBzZXJ2ZXJfbXNnID0gaHR0cF9lcnJvci5yZXNwb25zZVRleHQ7XHJcbiAgICAgIGxldCBjb2RlID0gaHR0cF9lcnJvci5zdGF0dXM7XHJcbiAgICAgIGxldCBjb2RlX2xhYmVsID0gaHR0cF9lcnJvci5zdGF0dXNUZXh0O1xyXG4gICAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiRWNoZWMgbG9ycyBkZSBsJ2V4cG9ydCAoXCIgKyBjb2RlICsgXCIpXCIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHB1YmxpYyB1blNlbGVjdCgpOiB2b2lkIHtcclxuICAgICQoXCIucm93IC5pY29uXCIpLmF0dHIoXCJzdXJicmlsbGFuY2VcIiwgXCJcIik7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXRNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgJChcIiNnYW1lIHAjdG91clwiKS50ZXh0KG1lc3NhZ2UpO1xyXG4gIH1cclxuICBwdWJsaWMgaW1wb3J0KGdhbWVPYmplY3Q6IEludGVyZmFjZS5HYW1lT2JqZWN0LCBwYXJhbWV0ZXJzOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJEw6lidXQgZGUgbCdpbXBvcnQgLi4uXCIpO1xyXG4gICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkluaXRpYWxpc2F0aW9uIGRlcyBwYXJhbcOodHJlcyAuLi5cIik7XHJcbiAgICB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXUgPSBwYXJzZUludChnYW1lT2JqZWN0LnBhcmFtZXRyZXMueClcclxuICAgIHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXUgPSBwYXJzZUludChnYW1lT2JqZWN0LnBhcmFtZXRyZXMueSlcclxuICAgIHRoaXMucmVzZXRHYW1lKClcclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJJbXBvcnQgZGVzIHBpb25zIC4uLlwiKTtcclxuICAgIGdhbWVPYmplY3QuZGF0YXMucGlvbnMucmVkLmZvckVhY2gocGlvblJvdWdlID0+IHtcclxuICAgICAgdGhpcy5mb3JjZUFkZFBpb24ocGlvblJvdWdlWzBdLCBwaW9uUm91Z2VbMV0sICdyZWQnKVxyXG4gICAgfSk7XHJcbiAgICBnYW1lT2JqZWN0LmRhdGFzLnBpb25zLnllbGxvdy5mb3JFYWNoKHBpb25ZZWxsb3cgPT4ge1xyXG4gICAgICB0aGlzLmZvcmNlQWRkUGlvbihwaW9uWWVsbG93WzBdLCBwaW9uWWVsbG93WzFdLCAneWVsbG93JylcclxuICAgIH0pO1xyXG4gICAgaWYgKHBhcmFtZXRlcnMpIHtcclxuICAgICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIlbDqXJpZmljYXRpb24gZCd1biBwb3RlbnRpZWwgZ2FnbmFudCAuLi5cIik7XHJcbiAgICAgIGxldCBnYWduYW50Um91Z2UgPSBXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMsIFwicmVkXCIpO1xyXG4gICAgICBsZXQgZ2FnbmFudEphdW5lID0gV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLCBcInllbGxvd1wiKTtcclxuICAgICAgaWYgKGdhZ25hbnRSb3VnZSkge1xyXG4gICAgICAgIHRoaXMuc2V0V2lubmVyKCdyZWQnLCBnYWduYW50Um91Z2UpO1xyXG4gICAgICAgIHRoaXMudW5TZWxlY3QoKTtcclxuICAgICAgfSBlbHNlIGlmIChnYWduYW50SmF1bmUpIHtcclxuICAgICAgICB0aGlzLnNldFdpbm5lcigneWVsbG93JywgZ2FnbmFudEphdW5lKTtcclxuICAgICAgICB0aGlzLm1vblRvdXIuc2V0KGZhbHNlKTtcclxuICAgICAgICB0aGlzLnVuU2VsZWN0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJGaW4gZGUgbCdpbXBvcnRcIik7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXRXaW5uZXIoY291bGV1cjogc3RyaW5nLCBwaW9uc0dhZ25hbnRzOiBudW1iZXJbXVtdID0gbnVsbCk6IHZvaWQge1xyXG4gICAgdGhpcy5kaXNhYmxlR2FtZSgpXHJcbiAgICBpZiAocGlvbnNHYWduYW50cykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBpb25zR2FnbmFudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgaW5kZXhWZXJ0aWNhbGUgPSBwaW9uc0dhZ25hbnRzW2ldWzBdXHJcbiAgICAgICAgbGV0IGluZGV4SG9yaXpvbnRhbGUgPSBwaW9uc0dhZ25hbnRzW2ldWzFdXHJcbiAgICAgICAgbGV0IHN1cmJyaWxsYW5jZVJlY2hlcmNoZSA9ICQoXCIjZ2FtZSAucm93XCIpLmVxKChpbmRleFZlcnRpY2FsZSAtIDEpKS5maW5kKFwiLmljb25cIikuZXEoKGluZGV4SG9yaXpvbnRhbGUgLSAxKSlcclxuICAgICAgICAkKHN1cmJyaWxsYW5jZVJlY2hlcmNoZSkuY3NzKFwib3BhY2l0eVwiLCAxKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoY291bGV1ciA9PSAncmVkJykge1xyXG4gICAgICB0aGlzLnNldE1lc3NhZ2UoXCJMZXMgcm91Z2VzIG9udCBnYWduw6lzXCIpO1xyXG4gICAgfSBlbHNlIGlmIChjb3VsZXVyID09ICd5ZWxsb3cnKSB7XHJcbiAgICAgIHRoaXMuc2V0TWVzc2FnZShcIkxlcyBqYXVuZXMgb250IGdhZ27DqXNcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNldE1lc3NhZ2UoXCJNYXRjaCBudWwgIVwiKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGxvZyhwcmVmaXg6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBjb2xvclRleHQ6IHN0cmluZyA9ICdmYWxzZScpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICBcIiVjW1wiICsgcHJlZml4ICsgXCJdICVjXCIgKyBtZXNzYWdlLFxyXG4gICAgICBcImNvbG9yOiBwdXJwbGU7IGZvbnQtc2l6ZTogMTNweDsgZm9udC13ZWlnaHQ6IGJvbGQ7XCIsXHJcbiAgICAgIFwiZm9udC1zaXplOiAxM3B4OyBjb2xvcjogXCIgKyBjb2xvclRleHRcclxuICAgICk7XHJcbiAgfVxyXG4gIHB1YmxpYyBkaXNhYmxlR2FtZSgpOiB2b2lkIHtcclxuICAgICQoXCIjZ2FtZSAuaWNvblwiKS5jc3MoXCJvcGFjaXR5XCIsIDAuMylcclxuICAgIHRoaXMubW9uVG91ci5zZXQoZmFsc2UpXHJcbiAgfVxyXG4gIHB1YmxpYyBlbmFibGVHYW1lKCk6IHZvaWQge1xyXG4gICAgJChcIiNnYW1lIC5pY29uXCIpLmNzcyhcIm9wYWNpdHlcIiwgMSlcclxuICAgIHRoaXMubW9uVG91ci5zZXQodHJ1ZSlcclxuICB9XHJcbiAgcHVibGljIGNyZWF0ZUJhY2tncm91bmQoKTogdm9pZCB7XHJcbiAgICBsZXQgUHggPSB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXU7XHJcbiAgICBsZXQgUHkgPSB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1O1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldTsgaSsrKSB7XHJcbiAgICAgIGxldCByb3dZID0gJzxkaXYgY2xhc3M9XCJyb3dcIiB2YWw9XCInICsgaSArICdcIj48L2Rpdj4nO1xyXG4gICAgICAkKFwiI2dhbWVcIikuYXBwZW5kKHJvd1kpO1xyXG4gICAgICBmb3IgKGxldCBqID0gMTsgaiA8PSB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXU7IGorKykge1xyXG4gICAgICAgICQoJy5yb3dbdmFsPVwiJyArIGkgKyAnXCJdJykuYXBwZW5kKHRoaXMuc2VhcmNoUGllY2UobnVsbCwgaikpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBmb3JjZUFkZFBpb24ocG9zaXRpb25Ib3Jpem9udGFsZTogbnVtYmVyLCBwb3NpdGlvblZlcnRpY2FsZTogbnVtYmVyLCBjb3VsZXVyOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICQoXCIucm93W3ZhbD0nXCIgKyBwb3NpdGlvblZlcnRpY2FsZSArIFwiJ10gLmljb25bY2FzZT0nXCIgKyBwb3NpdGlvbkhvcml6b250YWxlICsgXCInXVwiKS5yZXBsYWNlV2l0aCh0aGlzLnNlYXJjaFBpZWNlKGNvdWxldXIsIHBvc2l0aW9uSG9yaXpvbnRhbGUpKTtcclxuICAgICQoXCIucm93W3ZhbD0nXCIgKyBwb3NpdGlvblZlcnRpY2FsZSArIFwiJ10gLmljb25bY2FzZT0nXCIgKyBwb3NpdGlvbkhvcml6b250YWxlICsgXCInXVwiKS5hdHRyKFwidGVhbVwiLCBjb3VsZXVyKTtcclxuICAgIGlmIChjb3VsZXVyID09ICd5ZWxsb3cnKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYWpvdXQgOiBcIiArIHBvc2l0aW9uSG9yaXpvbnRhbGUgKyBcIiwgXCIrIHBvc2l0aW9uVmVydGljYWxlKVxyXG4gICAgICB0aGlzLnNldFBpb24oMiwgbmV3IEpldG9uKHBvc2l0aW9uSG9yaXpvbnRhbGUsIHBvc2l0aW9uVmVydGljYWxlKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNldFBpb24oMSwgbmV3IEpldG9uKHBvc2l0aW9uSG9yaXpvbnRhbGUsIHBvc2l0aW9uVmVydGljYWxlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRQb3NpdGlvbkhvcml6b250YWxlKGV2ZW50OiBzdHJpbmcgfCBKUXVlcnk8YW55Pikge1xyXG4gICAgcmV0dXJuICQoZXZlbnQpLnBhcmVudCgpLmluZGV4KCkgKyAxO1xyXG4gIH1cclxuICBwdWJsaWMgYWRkUGlvbihpbmRleEhvcml6b250YWxlQ2xpY2tlZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgPSB0aGlzLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgICBsZXQgcGxhY2VJc05vdFRha2VuID0gdHJ1ZTtcclxuICAgIGxldCBpbmRleFZlcnRpY2FsZSA9IHRhaWxsZVZlcnRpY2FsZTtcclxuICAgIGlmICh0aGlzLm1vblRvdXIuZ2V0KCkpIHtcclxuICAgICAgd2hpbGUgKGluZGV4VmVydGljYWxlID4gMCAmJiBwbGFjZUlzTm90VGFrZW4pIHtcclxuICAgICAgICBsZXQgY291bGV1ckR1UGlvbiA9IHRoaXMuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQsIGluZGV4VmVydGljYWxlKTtcclxuICAgICAgICBpZiAoIWNvdWxldXJEdVBpb24pIHtcclxuICAgICAgICAgIHBsYWNlSXNOb3RUYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5tb25Ub3VyLnNldChmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLnVuU2VsZWN0KCk7XHJcbiAgICAgICAgICB0aGlzLmZvcmNlQWRkUGlvbihpbmRleEhvcml6b250YWxlQ2xpY2tlZCwgaW5kZXhWZXJ0aWNhbGUsIFwicmVkXCIpXHJcbiAgICAgICAgICBsZXQgbGVzUGlvbnNHYWduYW50cyA9IFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcywgXCJyZWRcIik7XHJcbiAgICAgICAgICBpZiAobGVzUGlvbnNHYWduYW50cykge1xyXG4gICAgICAgICAgICB0aGlzLnNldFdpbm5lcigncmVkJywgbGVzUGlvbnNHYWduYW50cyk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNEcmF3KCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRXaW5uZXIobnVsbCwgbnVsbClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KGluZGV4SG9yaXpvbnRhbGVDbGlja2VkKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRNZXNzYWdlKFwiQXUgdG91ciBkZSBsJ2FkdmVyc2FpcmUhXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBnYW1lID0gdGhpcztcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgYXVkaW8gPSBuZXcgQXVkaW8oJy4uLy4uL3B1YmxpYy9hdWRpby9wb3AubXA0Jyk7XHJcbiAgICAgICAgICAgICAgYXVkaW8ucGxheSgpO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHJvYm90TWFuYWdlciA9IFJvYm90TWFuYWdlci5nZXRSb2JvdE1hbmFnZXIoZ2FtZSlcclxuICAgICAgICAgICAgICBpZiAocm9ib3RNYW5hZ2VyLnJvYm90UGxhY2VVblBpb24oXCJ5ZWxsb3dcIikpIHtcclxuICAgICAgICAgICAgICAgIGdhbWUuc2V0TWVzc2FnZShcIlR1IGFzIHBlcmR1IGxhIHBhcnRpZSAhXCIpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIlBlcmR1ICFcIik7XHJcbiAgICAgICAgICAgICAgICBnYW1lLm1vblRvdXIuc2V0KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGdhbWUudW5TZWxlY3QoKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQsIGluZGV4VmVydGljYWxlICsgMSkpIHtcclxuICAgICAgICAgICAgICAgICAgLy8gU2kgbGUgcm9ib3QgYSBqb3XDqSBzdXIgbGEgbcOqbWUgY29sb25uZSwgb24gYWN0dWFsaXNlIGxhIHPDqWxlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgZ2FtZS5zZWxlY3QoaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ2FtZS5tb25Ub3VyLnNldCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGdhbWUuc2V0TWVzc2FnZShcIkEgdG9uIHRvdXIgIVwiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kZXhWZXJ0aWNhbGUtLTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmxvZyhcclxuICAgICAgICBcIlB1aXNzYW5jZSA0XCIsXHJcbiAgICAgICAgXCJKZXRvbiBlbiBYOlwiICsgaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQgKyBcIiBZOlwiICsgKGluZGV4VmVydGljYWxlICsgMSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIHNldFBpb24odGVhbTogc3RyaW5nIHwgbnVtYmVyLCB2YWx1ZTogSmV0b24pOiB2b2lkIHtcclxuICAgIGlmICh0ZWFtID09IDEgfHwgdGVhbSA9PSAncmVkJykge1xyXG4gICAgICB0aGlzLmxpc3RlUGlvbnNSb3VnZS5wdXNoKHZhbHVlKTtcclxuICAgICAgY29uc29sZS5sb2codGhpcy5saXN0ZVBpb25zUm91Z2UpO1xyXG4gICAgfSBlbHNlIGlmICh0ZWFtID09IDIgfHwgdGVhbSA9PSAneWVsbG93Jykge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIk5FVyBQSU9OOlwiKTtcclxuICAgICAgY29uc29sZS5sb2codmFsdWUpO1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmxpc3RlUGlvbnNKYXVuZSk7XHJcbiAgICAgIHRoaXMubGlzdGVQaW9uc0phdW5lLnB1c2godmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTGUgam91ZXVyIGVzdCBpbnRyb3V2YWJsZVwiKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBnZXRJbmRleE9mUGlvbih0ZWFtOiBzdHJpbmcsIHBpb246IEpldG9uKTogbnVtYmVyIHtcclxuICAgIHRoaXMuZ2V0UGlvbnModGVhbSkuZm9yRWFjaCh1blBpb24gPT4ge1xyXG4gICAgICBpZiAodW5QaW9uLmdldFBvc2l0aW9uKCkgPT0gcGlvbi5nZXRQb3NpdGlvbigpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGlvbnModGVhbSkuaW5kZXhPZih1blBpb24pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICBwdWJsaWMgcmVtb3ZlUGlvbih0ZWFtOiBzdHJpbmcgfCBudW1iZXIsIHZhbHVlOiBKZXRvbik6IHZvaWQge1xyXG4gICAgaWYgKHRlYW0gPT0gMSB8fCB0ZWFtID09ICdyZWQnKSB7XHJcbiAgICAgIGxldCBpbmRleE9mUGlvbiA9IHRoaXMuZ2V0SW5kZXhPZlBpb24oJ3JlZCcsIHZhbHVlKTtcclxuICAgICAgdGhpcy5saXN0ZVBpb25zUm91Z2Uuc3BsaWNlKGluZGV4T2ZQaW9uLCAxKVxyXG4gICAgfSBlbHNlIGlmICh0ZWFtID09IDIgfHwgdGVhbSA9PSAneWVsbG93Jykge1xyXG4gICAgICBsZXQgaW5kZXhPZlBpb24gPSB0aGlzLmdldEluZGV4T2ZQaW9uKCd5ZWxsb3cnLCB2YWx1ZSk7XHJcbiAgICAgIHRoaXMubGlzdGVQaW9uc0phdW5lLnNwbGljZShpbmRleE9mUGlvbiwgMSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IFwiTGUgam91ZXVyIGVzdCBpbnRyb3V2YWJsZVwiO1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgY2xlYXJQaW9ucygpOiB2b2lkIHtcclxuICAgIHRoaXMubGlzdGVQaW9uc1JvdWdlID0gW107XHJcbiAgICB0aGlzLmxpc3RlUGlvbnNKYXVuZSA9IFtdO1xyXG4gICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkxlcyBkb25uw6llcyBkZXMgcGlvbnMgb250IMOpdMOpIGVmZmFjw6lzXCIpO1xyXG4gIH1cclxuICBwdWJsaWMgZ2V0UGlvbnModGVhbTogc3RyaW5nIHwgbnVtYmVyKTogSmV0b25bXSB7XHJcbiAgICBpZiAodGVhbSA9PSAxIHx8IHRlYW0gPT0gJ3JlZCcpIHtcclxuICAgICAgY29uc29sZS5sb2codGhpcy5saXN0ZVBpb25zUm91Z2UpO1xyXG4gICAgICByZXR1cm4gdGhpcy5saXN0ZVBpb25zUm91Z2U7XHJcbiAgICB9IGVsc2UgaWYgKHRlYW0gPT0gMiB8fCB0ZWFtID09ICd5ZWxsb3cnKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMubGlzdGVQaW9uc0phdW5lKTtcclxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVQaW9uc0phdW5lO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgXCJMZSBqb3VldXIgZXN0IGludHJvdXZhYmxlXCI7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIE1vblRvdXIge1xyXG4gIHNldChtb25Ub3VyKSB7XHJcbiAgICB0aGlzLm1vblRvdXIgPSBtb25Ub3VyXHJcbiAgfVxyXG4gIGdldCgpIHtcclxuICAgIHJldHVybiB0aGlzLm1vblRvdXJcclxuICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgVXRpbHMge1xyXG4gIHN0YXRpYyBnZXRFbnRpZXJBbGVhdG9pcmUobWluLCBtYXgpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0RWxlbWVudEFsZWF0b2lyZShsaXN0ZSkge1xyXG4gICAgbGV0IGxvbmd1ZXVyTGlzdGUgPSBsaXN0ZS5sZW5ndGg7XHJcbiAgICBsZXQgZW50aWVyQWxlYXRvaXJlSW5kZXhlUGFyTGlzdGUgPSBVdGlscy5nZXRFbnRpZXJBbGVhdG9pcmUoMCwgbG9uZ3VldXJMaXN0ZSk7XHJcbiAgICByZXR1cm4gbGlzdGVbZW50aWVyQWxlYXRvaXJlSW5kZXhlUGFyTGlzdGVdO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFycmF5MkRDb250YWluc0FycmF5KGFycmF5MkQsIGFycmF5U2VhcmNoKSB7XHJcbiAgICBsZXQgaXRlbVN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGFycmF5U2VhcmNoKTtcclxuICAgIGxldCBjb250YWlucyA9IGFycmF5MkQuc29tZShmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZWxlbWVudCkgPT09IGl0ZW1TdHJpbmc7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBjb250YWlucztcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRJbmRleE9mMkRBcnJheShhcnJheTJELCBpbmRleCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheTJELmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBjdXJyZW50QXJyYXkgPSBhcnJheTJEW2ldO1xyXG4gICAgICBpZiAoY3VycmVudEFycmF5WzBdID09IGluZGV4WzBdICYmIGN1cnJlbnRBcnJheVsxXSA9PSBpbmRleFsxXSkge1xyXG4gICAgICAgIHJldHVybiBpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0Q291bGV1ckVxdWlwZUFsZWF0b2lyZSgpIHtcclxuICAgIGxldCBsaXN0ZURlQ291bGV1cnMgPSBbXCJ5ZWxsb3dcIiwgXCJyZWRcIl07XHJcbiAgICBsZXQgbm9tYnJlQWxlYXRvaXJlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGlzdGVEZUNvdWxldXJzLmxlbmd0aCk7XHJcbiAgICByZXR1cm4gbGlzdGVEZUNvdWxldXJzW25vbWJyZUFsZWF0b2lyZV07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0Q291bGV1ckVxdWlwZUFkdmVyc2UoY291bGV1ckVxdWlwZUFjdHVlbGxlKSB7XHJcbiAgICBpZiAoY291bGV1ckVxdWlwZUFjdHVlbGxlID09ICdyZWQnKSB7XHJcbiAgICAgIHJldHVybiAneWVsbG93JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAncmVkJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBwYXJzZVVSTFBhcmFtcyh1cmwpIHtcclxuICAgIHZhciBxdWVyeVN0YXJ0ID0gdXJsLmluZGV4T2YoXCI/XCIpICsgMSxcclxuICAgICAgcXVlcnlFbmQgPSB1cmwuaW5kZXhPZihcIiNcIikgKyAxIHx8IHVybC5sZW5ndGggKyAxLFxyXG4gICAgICBxdWVyeSA9IHVybC5zbGljZShxdWVyeVN0YXJ0LCBxdWVyeUVuZCAtIDEpLFxyXG4gICAgICBwYWlycyA9IHF1ZXJ5LnJlcGxhY2UoL1xcKy9nLCBcIiBcIikuc3BsaXQoXCImXCIpLFxyXG4gICAgICBwYXJtcyA9IHt9LCBpLCBuLCB2LCBudjtcclxuXHJcbiAgICBpZiAocXVlcnkgPT09IHVybCB8fCBxdWVyeSA9PT0gXCJcIikgcmV0dXJuO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBudiA9IHBhaXJzW2ldLnNwbGl0KFwiPVwiLCAyKTtcclxuICAgICAgbiA9IGRlY29kZVVSSUNvbXBvbmVudChudlswXSk7XHJcbiAgICAgIHYgPSBkZWNvZGVVUklDb21wb25lbnQobnZbMV0pO1xyXG5cclxuICAgICAgaWYgKCFwYXJtcy5oYXNPd25Qcm9wZXJ0eShuKSkgcGFybXNbbl0gPSBbXTtcclxuICAgICAgcGFybXNbbl0ucHVzaChudi5sZW5ndGggPT09IDIgPyB2IDogbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFybXM7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENoZWNrSWZXaW5uZXIgfSBmcm9tIFwiLi9DaGVja0lmV2lubmVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgV2lubmVyTWFuYWdlciB7XHJcbiAgc3RhdGljIHZlcmlmV2luKGdhbWUsIGNvbG9yKSB7XHJcbiAgICBsZXQgdmVyaWZpY2F0aW9uID0gQ2hlY2tJZldpbm5lci5ob3Jpem9udGFsKGdhbWUsIGNvbG9yKTtcclxuICAgIGlmICh2ZXJpZmljYXRpb24pIHtcclxuICAgICAgcmV0dXJuIHZlcmlmaWNhdGlvbjtcclxuICAgIH1cclxuICAgIHZlcmlmaWNhdGlvbiA9IENoZWNrSWZXaW5uZXIudmVydGljYWwoZ2FtZSwgY29sb3IpO1xyXG4gICAgaWYgKHZlcmlmaWNhdGlvbikge1xyXG4gICAgICByZXR1cm4gdmVyaWZpY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgdmVyaWZpY2F0aW9uID0gQ2hlY2tJZldpbm5lci5kaWFnb25hbFRvcExlZnQoZ2FtZSwgY29sb3IpO1xyXG4gICAgaWYgKHZlcmlmaWNhdGlvbikge1xyXG4gICAgICByZXR1cm4gdmVyaWZpY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgdmVyaWZpY2F0aW9uID0gQ2hlY2tJZldpbm5lci5kaWFnb25hbFRvcFJpZ2h0KGdhbWUsIGNvbG9yKTtcclxuICAgIGlmICh2ZXJpZmljYXRpb24pIHtcclxuICAgICAgcmV0dXJuIHZlcmlmaWNhdGlvbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyB2ZXJpZklmUGlvblBsYWNlZEdpdmVXaW4oZ2FtZSwgbnVtZXJvQ29sb25uZUhvcml6b250YWxlLCBudW1lcm9Db2xvbm5lVmVydGljYWxlLCBjb3VsZXVyUGlvbikge1xyXG4gICAgZ2FtZS5zZXRQaW9uKGNvdWxldXJQaW9uLCBbbnVtZXJvQ29sb25uZUhvcml6b250YWxlLCBudW1lcm9Db2xvbm5lVmVydGljYWxlXSlcclxuICAgIGNvbnN0IGlzV2lubmVyID0gV2lubmVyTWFuYWdlci52ZXJpZldpbihnYW1lLCBjb3VsZXVyUGlvbilcclxuICAgIGdhbWUucmVtb3ZlUGlvbihjb3VsZXVyUGlvbiwgW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pXHJcbiAgICByZXR1cm4gaXNXaW5uZXI7XHJcbiAgfVxyXG5cclxufSIsImV4cG9ydCBjbGFzcyBDaGVja0lmV2lubmVyIHtcclxuICBzdGF0aWMgaG9yaXpvbnRhbChnYW1lLCBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKVxyXG4gICAgLy8gVsOpcmlmaWNhdGlvbiBlbiBob3Jpem9udGFsXHJcbiAgICBsZXQgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICBsZXQgY291bGV1ckR1UGlvbjtcclxuICAgIGxldCBuYlBpb25zR2FnbmFudHM7XHJcbiAgICBmb3IgKGxldCBpbmRleFZlcnRpY2FsZSA9IDE7IGluZGV4VmVydGljYWxlIDw9IHRhaWxsZVZlcnRpY2FsZTsgaW5kZXhWZXJ0aWNhbGUrKykge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgZm9yIChsZXQgaW5kZXhIb3Jpem9udGFsZSA9IDE7IGluZGV4SG9yaXpvbnRhbGUgPD0gdGFpbGxlSG9yaXpvbnRhbGU7IGluZGV4SG9yaXpvbnRhbGUrKykge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cysrO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzLnB1c2goW2luZGV4VmVydGljYWxlLCBpbmRleEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHN0YXRpYyB2ZXJ0aWNhbChnYW1lLCBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKVxyXG4gICAgLy8gUGFyY291cnMgZGUgY2hhcXVlIGNhc2UgaG9yaXpvbnRhbGUgZHUgamV1XHJcbiAgICBsZXQgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICBsZXQgY291bGV1ckR1UGlvbjtcclxuICAgIGxldCBuYlBpb25zR2FnbmFudHM7XHJcbiAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gMTsgaW5kZXhIb3Jpem9udGFsZSA8PSB0YWlsbGVIb3Jpem9udGFsZTsgaW5kZXhIb3Jpem9udGFsZSsrKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAvLyBQYXJjb3VycyBjaGFxdWUgY2FzZSB2ZXJ0aWNhbGUgZGUgbGEgY29sb25uZVxyXG4gICAgICBmb3IgKGxldCBpbmRleFZlcnRpY2FsZSA9IDE7IGluZGV4VmVydGljYWxlIDw9IHRhaWxsZVZlcnRpY2FsZTsgaW5kZXhWZXJ0aWNhbGUrKykge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleFZlcnRpY2FsZSwgaW5kZXhIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZGlhZ29uYWxUb3BMZWZ0KGdhbWUsIGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSA9IGdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuICAgIGNvbnN0IHRhaWxsZUhvcml6b250YWxlID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcblxyXG4gICAgbGV0IGNvdWxldXJEdVBpb24sIG5iUGlvbnNHYWduYW50cztcclxuICAgIGxldCBpbmRleENvdXJhbnRIb3Jpem9udGFsZTtcclxuICAgIGxldCBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgIGxldCBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPSA0O1xyXG5cclxuICAgIC8vIFBhcmNvdXJzIHRvdXRlcyBsZXMgZGlhZ29uYWxlcyDDoCBnYXVjaGVzIMOgIHBhcnRpciBkZSA0LlxyXG4gICAgZm9yIChsZXQgaW5kZXhWZXJ0aWNhbGUgPSA0OyBpbmRleFZlcnRpY2FsZSA8PSB0YWlsbGVWZXJ0aWNhbGU7IGluZGV4VmVydGljYWxlKyspIHtcclxuICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlID0gMTtcclxuXHJcbiAgICAgIC8vIFbDqXJpZmllciBsYSBsaWduZSBlbiBkaWFnb25hbGVcclxuICAgICAgd2hpbGUgKGluZGV4Q291cmFudEhvcml6b250YWxlIDw9IHRhaWxsZUhvcml6b250YWxlICYmIGluZGV4Q291cmFudFZlcnRpY2FsZSA+PSAxKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUsIGluZGV4Q291cmFudFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhDb3VyYW50VmVydGljYWxlLCBpbmRleENvdXJhbnRIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUtLTtcclxuICAgICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSsrO1xyXG4gICAgICB9XHJcbiAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZSA9IGluZGV4VmVydGljYWxlICsgMTtcclxuICAgIH1cclxuXHJcbiAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gMjsgaW5kZXhIb3Jpem9udGFsZSA8PSAodGFpbGxlSG9yaXpvbnRhbGUgLSA0KTsgaW5kZXhIb3Jpem9udGFsZSsrKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSA9IGluZGV4SG9yaXpvbnRhbGU7XHJcbiAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZSA9IHRhaWxsZVZlcnRpY2FsZTtcclxuICAgICAgLy8gVsOpcmlmaWVyIGxhIGxpZ25lIGVuIGRpYWdvbmFsZVxyXG4gICAgICB3aGlsZSAoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPD0gdGFpbGxlSG9yaXpvbnRhbGUgJiYgaW5kZXhDb3VyYW50VmVydGljYWxlID49IDEpIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleENvdXJhbnRIb3Jpem9udGFsZSwgaW5kZXhDb3VyYW50VmVydGljYWxlKVxyXG4gICAgICAgIGlmIChjb3VsZXVyRHVQaW9uID09IGNvdWxldXJBVmVyaWZpZXIpIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleENvdXJhbnRWZXJ0aWNhbGUsIGluZGV4Q291cmFudEhvcml6b250YWxlXSk7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGlmIChuYlBpb25zR2FnbmFudHMgPj0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVEZXNQaW9uc0dhZ25hbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZS0tO1xyXG4gICAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlKys7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZGlhZ29uYWxUb3BSaWdodChnYW1lLCBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKVxyXG5cclxuICAgIGxldCBjb3VsZXVyRHVQaW9uLCBuYlBpb25zR2FnbmFudHM7XHJcbiAgICBsZXQgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGU7XHJcbiAgICBsZXQgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcblxyXG4gICAgLy8gUGFyY291cnMgdG91dGVzIGxlcyBkaWFnb25hbGVzIMOgIGdhdWNoZXMgw6AgcGFydGlyIGRlIDQuXHJcbiAgICBmb3IgKGxldCBpbmRleFZlcnRpY2FsZSA9IDQ7IGluZGV4VmVydGljYWxlIDw9IHRhaWxsZVZlcnRpY2FsZTsgaW5kZXhWZXJ0aWNhbGUrKykge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPSB0YWlsbGVIb3Jpem9udGFsZTtcclxuICAgICAgbGV0IGluZGV4Q291cmFudFZlcnRpY2FsZSA9IGluZGV4VmVydGljYWxlO1xyXG4gICAgICAvLyBWw6lyaWZpZXIgbGEgbGlnbmUgZW4gZGlhZ29uYWxlXHJcbiAgICAgIHdoaWxlIChpbmRleENvdXJhbnRIb3Jpem9udGFsZSA+PSAxICYmIGluZGV4Q291cmFudFZlcnRpY2FsZSA+PSAxKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUsIGluZGV4Q291cmFudFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhDb3VyYW50VmVydGljYWxlLCBpbmRleENvdXJhbnRIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZS0tO1xyXG4gICAgICAgIGluZGV4Q291cmFudFZlcnRpY2FsZS0tO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaW5kZXhIb3Jpem9udGFsZSA9ICh0YWlsbGVIb3Jpem9udGFsZSAtIDEpOyBpbmRleEhvcml6b250YWxlID49IDQ7IGluZGV4SG9yaXpvbnRhbGUtLSkge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPSBpbmRleEhvcml6b250YWxlO1xyXG4gICAgICBsZXQgaW5kZXhDb3VyYW50VmVydGljYWxlID0gdGFpbGxlVmVydGljYWxlO1xyXG4gICAgICAvLyBWw6lyaWZpZXIgbGEgbGlnbmUgZW4gZGlhZ29uYWxlXHJcbiAgICAgIHdoaWxlIChpbmRleENvdXJhbnRIb3Jpem9udGFsZSA+PSAxICYmIGluZGV4Q291cmFudFZlcnRpY2FsZSA+PSAxKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUsIGluZGV4Q291cmFudFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhDb3VyYW50VmVydGljYWxlLCBpbmRleENvdXJhbnRIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUtLTtcclxuICAgICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZS0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBXaW5uZXJNYW5hZ2VyIH0gZnJvbSBcIi4vV2lubmVyTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJvYm90TWFuYWdlciB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xyXG4gICAgaWYgKGdhbWUpIHtcclxuICAgICAgdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1ID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpO1xyXG4gICAgICB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1ID0gZ2FtZS5nZXRUYWlsbGVWZXJ0aWNhbGUoKTtcclxuICAgICAgdGhpcy5nYW1lID0gZ2FtZVxyXG4gICAgICBSb2JvdE1hbmFnZXIucm9ib3RNYW5hZ2VyID0gdGhpc1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXVjdW5lIHBhcnRpZSBkw6lmaW5pdFwiKVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRSb2JvdE1hbmFnZXIoZ2FtZSkge1xyXG4gICAgaWYgKFJvYm90TWFuYWdlci5yb2JvdE1hbmFnZXIpIHtcclxuICAgICAgcmV0dXJuIFJvYm90TWFuYWdlci5yb2JvdE1hbmFnZXJcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBuZXcgUm9ib3RNYW5hZ2VyKGdhbWUpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsYW5jZVVuZVBhcnRpZURlUm9ib3RzKCkge1xyXG4gICAgdGhpcy5nYW1lLnNldE1lc3NhZ2UoXCJSb2JvdCBWcy4gUm9ib3RcIik7XHJcbiAgICB0aGlzLmdhbWUucmVzZXRHYW1lKClcclxuICAgIHRoaXMuZ2FtZS5lbmFibGVHYW1lKClcclxuICAgIHRoaXMuZ2FtZS5tb25Ub3VyLnNldChmYWxzZSlcclxuICAgIC8vIE9uIGNob2lzaXMgdW5lIMOpcXVpcGUgcXVpIGNvbW1lbmNlIGFsw6lhdG9pcmVtZW50XHJcbiAgICBjb25zdCBjb2xvciA9IFV0aWxzLmdldENvdWxldXJFcXVpcGVBbGVhdG9pcmUoKTtcclxuICAgIC8vIE9uIGxhbmNlIGxhIHBhcnRpZVxyXG4gICAgdGhpcy5yb2JvdFZzUm9ib3QoY29sb3IpO1xyXG4gIH1cclxuXHJcbiAgcm9ib3RWc1JvYm90KGNvbG9yKSB7XHJcbiAgICAvLyBTaSBsYSBwYXJ0aWUgbidlc3QgcGFzIHRlcm1pbsOpXHJcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgIGlmICghdGhpcy5yb2JvdFBsYWNlVW5QaW9uKGNvbG9yKSkge1xyXG4gICAgICAvLyBPbiBmYWlzIGpvdWVyIGwnw6lxdWlwZSBhZHZlcnNlXHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoYXQucm9ib3RWc1JvYm90KFV0aWxzLmdldENvdWxldXJFcXVpcGVBZHZlcnNlKGNvbG9yKSlcclxuICAgICAgfSwgNSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJvYm90UGxhY2VVblBpb24oY29sb3IpIHtcclxuICAgIGNvbnN0IGdhbWUgPSB0aGlzLmdhbWU7XHJcbiAgICAvLyBPbiByw6ljdXDDqHJlIGxhIGxpc3RlIGRlcyBjb2xvbm5lcyBxdWkgbidvbnQgcGFzIGxldXJzXHJcbiAgICAvLyBjb2xvbm5lcyBjb21wbMOpdMOpcy5cclxuICAgIGNvbnN0IGxpc3RlQ29sb25uZXNOb25Db21wbGV0ZXMgPSBnYW1lLmdldExlc0NvbG9ubmVzTm9uQ29tcGxldGVzKCk7XHJcbiAgICBsZXQgY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50ID0gVXRpbHMuZ2V0RWxlbWVudEFsZWF0b2lyZShsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzKTtcclxuICAgIGNvbnN0IGxlc0Nhc2VzUG91dmFudEV0cmVKb3VlciA9IGdhbWUuZ2V0TGVzQ2FzZXNQb3V2YW50RXRyZUpvdWVyKCk7XHJcbiAgICBsZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIuZm9yRWFjaChjYXNlUG91dmFudEV0cmVKb3VlciA9PiB7XHJcbiAgICAgIGxldCBpbmRpY2VIb3Jpem9udGFsZSA9IGNhc2VQb3V2YW50RXRyZUpvdWVyWzBdO1xyXG4gICAgICBsZXQgaW5kaWNlVmVydGljYWxlID0gY2FzZVBvdXZhbnRFdHJlSm91ZXJbMV07XHJcbiAgICAgIGlmIChXaW5uZXJNYW5hZ2VyLnZlcmlmSWZQaW9uUGxhY2VkR2l2ZVdpbihnYW1lLCBpbmRpY2VIb3Jpem9udGFsZSwgaW5kaWNlVmVydGljYWxlLCBjb2xvcikpIHtcclxuICAgICAgICBjb2xvbm5lQ2hvaXNpdEFsZWF0b2lyZW1lbnQgPSBpbmRpY2VIb3Jpem9udGFsZTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChXaW5uZXJNYW5hZ2VyLnZlcmlmSWZQaW9uUGxhY2VkR2l2ZVdpbihnYW1lLCBpbmRpY2VIb3Jpem9udGFsZSwgaW5kaWNlVmVydGljYWxlLCBVdGlscy5nZXRDb3VsZXVyRXF1aXBlQWR2ZXJzZShjb2xvcikpKSB7XHJcbiAgICAgICAgY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50ID0gaW5kaWNlSG9yaXpvbnRhbGU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghbGVzQ2FzZXNQb3V2YW50RXRyZUpvdWVyIHx8IGxlc0Nhc2VzUG91dmFudEV0cmVKb3Vlci5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy5nYW1lLnNldFdpbm5lcihudWxsLCBudWxsKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgYm91Y2xlQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgbGV0IGluZGljZVRhaWxsZVZlcnRpY2FsZSA9IHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXU7XHJcbiAgICAgIHdoaWxlIChpbmRpY2VUYWlsbGVWZXJ0aWNhbGUgPiAwICYmIGJvdWNsZUFjdGl2ZSkge1xyXG4gICAgICAgIGxldCBjb3VsZXVyRHVQaW9uUGxhY2UgPSB0aGlzLmdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50LCBpbmRpY2VUYWlsbGVWZXJ0aWNhbGUpO1xyXG4gICAgICAgIGlmICghY291bGV1ckR1UGlvblBsYWNlKSB7XHJcbiAgICAgICAgICBib3VjbGVBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuZ2FtZS5mb3JjZUFkZFBpb24oY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50LCBpbmRpY2VUYWlsbGVWZXJ0aWNhbGUsIGNvbG9yKVxyXG4gICAgICAgICAgLy9ham91dGVVblBpb25EYW5zQmRkKGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCwgaW5kaWNlVGFpbGxlVmVydGljYWxlLCBjb2xvcik7XHJcbiAgICAgICAgICBjb25zdCBpc1dpbm5lciA9IFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCBjb2xvcik7XHJcbiAgICAgICAgICBpZiAoaXNXaW5uZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLnNldFdpbm5lcihjb2xvciwgaXNXaW5uZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kaWNlVGFpbGxlVmVydGljYWxlLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG59IiwiZXhwb3J0IGNsYXNzIEpldG9uIHtcclxuXHJcbiAgcHJpdmF0ZSBwb3NpdGlvbkhvcml6b250YWxlOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBwb3NpdGlvblZlcnRpY2FsZTogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbkhvcml6b250YWxlOiBudW1iZXIsIHBvc2l0aW9uVmVydGljYWxlOiBudW1iZXIpIHtcclxuICAgIHRoaXMucG9zaXRpb25Ib3Jpem9udGFsZSA9IHBvc2l0aW9uSG9yaXpvbnRhbGU7XHJcbiAgICB0aGlzLnBvc2l0aW9uVmVydGljYWxlICAgPSBwb3NpdGlvblZlcnRpY2FsZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRQb3NpdGlvbigpOiBudW1iZXJbXSB7XHJcbiAgICByZXR1cm4gW3RoaXMucG9zaXRpb25Ib3Jpem9udGFsZSwgdGhpcy5wb3NpdGlvblZlcnRpY2FsZV1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRQb3NpdGlvbkhvcml6b250YWxlKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbkhvcml6b250YWxlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFBvc2l0aW9uVmVydGljYWxlKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvblZlcnRpY2FsZTtcclxuICB9XHJcbiAgXHJcbn0iLCJleHBvcnQgY2xhc3MgVGVzdHNVbml0cyB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xyXG4gICAgaWYgKGdhbWUpIHtcclxuICAgICAgdGhpcy5nYW1lID0gZ2FtZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXVjdW5lIHBhcnRpZSBmb3Vybml0XCIpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGxhdW5jaFRlc3RzVW5pdHMoKSB7XHJcbiAgICB0aGlzLmRlZmF1bHRUYWlsbGVIb3Jpem9udGFsZSA9IHRoaXMuZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpXHJcbiAgICB0aGlzLmRlZmF1bHRUYWlsbGVWZXJ0aWNhbGUgPSB0aGlzLmdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKClcclxuXHJcbiAgICBjb25zdCBsaXN0c1Rlc3RzVW5pdHMgPSBbXVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDEoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQyKCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0MygpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDQoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQ1KCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0NigpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDcoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQ4KCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0OSgpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDEwKCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0MTEoKSlcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGlzdHNUZXN0c1VuaXRzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBsZXQgY29sb3I7XHJcbiAgICAgIGlmIChsaXN0c1Rlc3RzVW5pdHNbaW5kZXhdKSB7XHJcbiAgICAgICAgY29sb3IgPSBcImdyZWVuXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29sb3IgPSBcInJlZFwiO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBtZXNzYWdlID0gXCJUZXN0IFwiICsgKGluZGV4ICsgMSkgKyBcIiA6IFwiICsgbGlzdHNUZXN0c1VuaXRzW2luZGV4XSArIFwiXFxuXCI7XHJcbiAgICAgIHRoaXMuZ2FtZS5sb2coXCJUZXN0XCIsIG1lc3NhZ2UsIGNvbG9yKTtcclxuXHJcblxyXG4gICAgfVxyXG4gICAgdGhpcy5yZXNldFRlc3RzKCk7XHJcblxyXG5cclxuICB9XHJcbiAgcmVzZXRUZXN0cygpIHtcclxuICAgIHRoaXMuZ2FtZS50YWlsbGVIb3Jpem9udGFsZUR1SmV1ID0gdGhpcy5kZWZhdWx0VGFpbGxlSG9yaXpvbnRhbGU7XHJcbiAgICB0aGlzLmdhbWUudGFpbGxlVmVydGljYWxlRHVKZXUgPSB0aGlzLmRlZmF1bHRUYWlsbGVWZXJ0aWNhbGU7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgfVxyXG4gIHRlc3RVbml0MSgpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0geyBcInBhcmFtZXRyZXNcIjogeyBcInhcIjogXCI3XCIsIFwieVwiOiBcIjVcIiB9LCBcImRhdGFzXCI6IHsgXCJwaW9uc1wiOiB7IFwicmVkXCI6IFtbNCwgNV0sIFszLCA1XSwgWzIsIDVdLCBbNiwgNF0sIFszLCA0XSwgWzQsIDRdLCBbNywgNF0sIFszLCAzXSwgWzQsIDNdLCBbNywgM10sIFsxLCA0XSwgWzEsIDJdLCBbMSwgMV0sIFsyLCAxXSwgWzcsIDJdLCBbNSwgMl1dLCBcInllbGxvd1wiOiBbWzEsIDVdLCBbNiwgNV0sIFs1LCA1XSwgWzcsIDVdLCBbMiwgNF0sIFs1LCA0XSwgWzIsIDNdLCBbMywgMl0sIFs0LCAyXSwgWzQsIDFdLCBbMSwgM10sIFs2LCAzXSwgWzIsIDJdLCBbNywgMV0sIFs1LCAzXV0gfSB9IH1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcblxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzUsIDJdLCBbNCwgM10sIFszLCA0XSwgWzIsIDVdXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICd5ZWxsb3cnKSAmJiBKU09OLnN0cmluZ2lmeShXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3JlZCcpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0MigpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0geyBcInBhcmFtZXRyZXNcIjogeyBcInhcIjogXCI3XCIsIFwieVwiOiBcIjVcIiB9LCBcImRhdGFzXCI6IHsgXCJwaW9uc1wiOiB7IFwicmVkXCI6IFtbMSwgNV0sIFszLCA1XSwgWzIsIDVdLCBbMiwgM10sIFs1LCA1XSwgWzcsIDRdLCBbMiwgMV0sIFs1LCA0XV0sIFwieWVsbG93XCI6IFtbNywgNV0sIFs0LCA1XSwgWzIsIDRdLCBbNiwgNV0sIFszLCA0XSwgWzIsIDJdLCBbNCwgNF0sIFsxLCA0XV0gfSB9IH1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcblxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzQsIDFdLCBbNCwgMl0sIFs0LCAzXSwgWzQsIDRdXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICdyZWQnKSAmJiBKU09OLnN0cmluZ2lmeShXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3llbGxvdycpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0MygpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0geyBcInBhcmFtZXRyZXNcIjogeyBcInhcIjogXCI3XCIsIFwieVwiOiBcIjVcIiB9LCBcImRhdGFzXCI6IHsgXCJwaW9uc1wiOiB7IFwicmVkXCI6IFtbMywgNV0sIFs3LCA1XSwgWzEsIDVdLCBbNywgNF0sIFs1LCA0XSwgWzQsIDJdLCBbMiwgNV0sIFsxLCA0XSwgWzIsIDNdLCBbNywgMl0sIFsyLCAyXSwgWzMsIDNdLCBbMSwgM10sIFs2LCA0XV0sIFwieWVsbG93XCI6IFtbNCwgNV0sIFs1LCA1XSwgWzMsIDRdLCBbNCwgNF0sIFs0LCAzXSwgWzcsIDNdLCBbNCwgMV0sIFsyLCA0XSwgWzYsIDVdLCBbNywgMV0sIFs1LCAzXSwgWzUsIDJdLCBbMiwgMV0sIFsxLCAyXSwgWzYsIDNdXSB9IH0gfVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbMywgNF0sIFszLCA1XSwgWzMsIDZdLCBbMywgN11dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3JlZCcpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAneWVsbG93JykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbiAgdGVzdFVuaXQ0KCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7IFwicGFyYW1ldHJlc1wiOiB7IFwieFwiOiBcIjdcIiwgXCJ5XCI6IFwiNVwiIH0sIFwiZGF0YXNcIjogeyBcInBpb25zXCI6IHsgXCJyZWRcIjogW1s1LCA1XSwgWzUsIDRdLCBbMywgNV0sIFs0LCA1XSwgWzEsIDVdLCBbMSwgNF0sIFs0LCAzXSwgWzYsIDJdLCBbNCwgMl0sIFsyLCAzXSwgWzUsIDJdLCBbNywgM10sIFs1LCAxXSwgWzcsIDFdLCBbMiwgMl0sIFsyLCAxXSwgWzMsIDRdLCBbMywgM11dLCBcInllbGxvd1wiOiBbWzcsIDVdLCBbNiwgNV0sIFs2LCA0XSwgWzIsIDVdLCBbNCwgNF0sIFs3LCA0XSwgWzYsIDNdLCBbNSwgM10sIFsyLCA0XSwgWzQsIDFdLCBbNiwgMV0sIFsxLCAzXSwgWzcsIDJdLCBbMSwgMl0sIFsxLCAxXSwgWzMsIDJdLCBbMywgMV1dIH0gfSB9XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG5cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAncmVkJykgJiYgIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAneWVsbG93JykpXHJcbiAgfVxyXG4gIHRlc3RVbml0NSgpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0geyBcInBhcmFtZXRyZXNcIjogeyBcInhcIjogXCI3XCIsIFwieVwiOiBcIjVcIiB9LCBcImRhdGFzXCI6IHsgXCJwaW9uc1wiOiB7IFwicmVkXCI6IFtbMywgNV0sIFs0LCA1XSwgWzEsIDVdLCBbNywgNV0sIFs3LCA0XSwgWzYsIDJdLCBbNSwgNV0sIFs1LCA0XSwgWzUsIDJdLCBbMiwgMl0sIFsxLCA0XSwgWzQsIDNdLCBbNywgM10sIFs0LCAyXSwgWzMsIDFdLCBbNywgMV0sIFsxLCAyXSwgWzEsIDFdXSwgXCJ5ZWxsb3dcIjogW1s2LCA1XSwgWzYsIDRdLCBbMiwgNV0sIFsyLCA0XSwgWzYsIDNdLCBbMywgNF0sIFs2LCAxXSwgWzUsIDNdLCBbMiwgM10sIFs0LCA0XSwgWzEsIDNdLCBbMywgM10sIFs3LCAyXSwgWzMsIDJdLCBbNCwgMV0sIFsyLCAxXSwgWzUsIDFdXSB9IH0gfVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3JlZCcpICYmICFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3llbGxvdycpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDYoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHsgXCJwYXJhbWV0cmVzXCI6IHsgXCJ4XCI6IFwiN1wiLCBcInlcIjogXCI1XCIgfSwgXCJkYXRhc1wiOiB7IFwicGlvbnNcIjogeyBcInJlZFwiOiBbWzMsIDVdLCBbNywgNF0sIFs0LCA1XSwgWzUsIDRdLCBbNCwgNF0sIFsxLCA0XSwgWzMsIDRdLCBbNCwgM10sIFszLCAzXSwgWzUsIDJdLCBbNiwgNF1dLCBcInllbGxvd1wiOiBbWzcsIDVdLCBbNSwgNV0sIFs3LCAzXSwgWzIsIDVdLCBbMSwgNV0sIFs3LCAyXSwgWzUsIDNdLCBbMiwgNF0sIFs0LCAyXSwgWzMsIDJdLCBbNiwgNV1dIH0gfSB9XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG5cclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s0LCAzXSwgWzQsIDRdLCBbNCwgNV0sIFs0LCA2XV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAneWVsbG93JykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICdyZWQnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDcoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHsgXCJwYXJhbWV0cmVzXCI6IHsgXCJ4XCI6IFwiN1wiLCBcInlcIjogXCIxMFwiIH0sIFwiZGF0YXNcIjogeyBcInBpb25zXCI6IHsgXCJyZWRcIjogW1s2LCAxMF0sIFsyLCAxMF0sIFs3LCA5XSwgWzEsIDEwXSwgWzUsIDEwXSwgWzMsIDldLCBbNiwgOF0sIFs2LCA2XSwgWzYsIDVdLCBbNywgN10sIFs1LCA4XSwgWzMsIDddLCBbMywgNl0sIFs0LCA4XSwgWzYsIDNdLCBbNCwgN10sIFsxLCA4XSwgWzQsIDVdLCBbMiwgNl0sIFsyLCA0XSwgWzMsIDRdLCBbMywgM10sIFsxLCA3XV0sIFwieWVsbG93XCI6IFtbNywgMTBdLCBbMywgMTBdLCBbNiwgOV0sIFsyLCA5XSwgWzQsIDEwXSwgWzEsIDldLCBbNywgOF0sIFs2LCA3XSwgWzQsIDldLCBbMiwgOF0sIFs1LCA5XSwgWzMsIDhdLCBbNywgNl0sIFs1LCA3XSwgWzYsIDRdLCBbNSwgNl0sIFszLCA1XSwgWzQsIDZdLCBbMiwgN10sIFsyLCA1XSwgWzQsIDRdLCBbNiwgMl0sIFs3LCA1XSwgWzEsIDZdXSB9IH0gfVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbOSwgNF0sIFs4LCAzXSwgWzcsIDJdLCBbNiwgMV1dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3JlZCcpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAneWVsbG93JykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbiAgdGVzdFVuaXQ4KCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7IFwicGFyYW1ldHJlc1wiOiB7IFwieFwiOiBcIjExXCIsIFwieVwiOiBcIjZcIiB9LCBcImRhdGFzXCI6IHsgXCJwaW9uc1wiOiB7IFwicmVkXCI6IFtbMSwgNl0sIFs1LCA2XSwgWzcsIDZdLCBbMiwgNV0sIFsxMSwgNl0sIFs5LCA2XSwgWzksIDVdLCBbOCwgM10sIFszLCA0XSwgWzQsIDZdLCBbOSwgNF1dLCBcInllbGxvd1wiOiBbWzgsIDZdLCBbOCwgNV0sIFsyLCA2XSwgWzYsIDZdLCBbMywgNl0sIFszLCA1XSwgWzgsIDRdLCBbMSwgNV0sIFsyLCA0XSwgWzcsIDVdLCBbOSwgM11dIH0gfSB9XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG5cclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s2LCA2XSwgWzUsIDddLCBbNCwgOF0sIFszLCA5XV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAncmVkJykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICd5ZWxsb3cnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDkoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHsgXCJwYXJhbWV0cmVzXCI6IHsgXCJ4XCI6IFwiNFwiLCBcInlcIjogXCI0XCIgfSwgXCJkYXRhc1wiOiB7IFwicGlvbnNcIjogeyBcInJlZFwiOiBbWzQsIDRdLCBbMiwgNF0sIFs0LCAyXSwgWzIsIDNdLCBbNCwgMV0sIFsyLCAxXSwgWzEsIDJdLCBbMywgMV1dLCBcInllbGxvd1wiOiBbWzEsIDRdLCBbNCwgM10sIFszLCA0XSwgWzMsIDNdLCBbMiwgMl0sIFsxLCAzXSwgWzMsIDJdLCBbMSwgMV1dIH0gfSB9XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG5cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAncmVkJykgJiYgIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAneWVsbG93JykpXHJcbiAgfVxyXG4gIHRlc3RVbml0MTAoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHsgXCJwYXJhbWV0cmVzXCI6IHsgXCJ4XCI6IFwiNFwiLCBcInlcIjogXCI0XCIgfSwgXCJkYXRhc1wiOiB7IFwicGlvbnNcIjogeyBcInJlZFwiOiBbWzIsIDRdLCBbMywgNF0sIFsyLCAyXSwgWzIsIDFdLCBbMSwgM10sIFs0LCAyXV0sIFwieWVsbG93XCI6IFtbNCwgNF0sIFs0LCAzXSwgWzIsIDNdLCBbMSwgNF0sIFszLCAzXSwgWzMsIDJdLCBbNCwgMV1dIH0gfSB9XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG5cclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s0LCAxXSwgWzMsIDJdLCBbMiwgM10sIFsxLCA0XV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAncmVkJykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICd5ZWxsb3cnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDExKCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7IFwicGFyYW1ldHJlc1wiOiB7IFwieFwiOiBcIjhcIiwgXCJ5XCI6IFwiN1wiIH0sIFwiZGF0YXNcIjogeyBcInBpb25zXCI6IHsgXCJyZWRcIjogW1sxLCA3XSwgWzYsIDddLCBbNCwgNl0sIFs4LCA2XSwgWzMsIDZdLCBbNywgN10sIFs3LCA2XSwgWzcsIDVdLCBbNSwgN10sIFsyLCA3XSwgWzUsIDZdLCBbNSwgNV0sIFs1LCAzXSwgWzcsIDNdLCBbNiwgNV1dLCBcInllbGxvd1wiOiBbWzgsIDddLCBbMywgN10sIFs0LCA3XSwgWzQsIDVdLCBbNCwgNF0sIFsxLCA2XSwgWzgsIDVdLCBbOCwgNF0sIFs3LCA0XSwgWzMsIDVdLCBbNiwgNl0sIFsyLCA2XSwgWzUsIDRdLCBbMywgNF0sIFs3LCAyXSwgWzYsIDRdXSB9IH0gfVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbNCwgM10sIFs0LCA0XSwgWzQsIDVdLCBbNCwgNl1dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3JlZCcpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAneWVsbG93JykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9HYW1lXCJcclxuaW1wb3J0IHsgVGVzdHNVbml0cyB9IGZyb20gXCIuL1Rlc3RzVW5pdHNcIlxyXG5pbXBvcnQgeyBSb2JvdE1hbmFnZXIgfSBmcm9tIFwiLi9Sb2JvdE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBham91dGVVblBpb25EYW5zQmRkKHB4OiBudW1iZXIsIHB5OiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHtcclxuICBsZXQgZ2FtZUlkID0gNDtcclxuICAkLnBvc3QoXCIvYXBpL3Bpb25zL3NldExpc3QvXCIsIHtcclxuICAgIGlkOiBnYW1lSWQsXHJcbiAgICBQeDogcHgsXHJcbiAgICBQeTogcHksXHJcbiAgICBDb2xvcjogY29sb3JcclxuICB9KVxyXG4gICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGVzdHNVbml0cygpIHtcclxuICBsZXQgdGVzdHNVbml0cyA9IG5ldyBUZXN0c1VuaXRzKEdhbWUuZ2V0R2FtZSgpKTtcclxuICB0ZXN0c1VuaXRzLmxhdW5jaFRlc3RzVW5pdHMoKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGxheUdhbWUoKSB7XHJcbiAgR2FtZS5nZXRHYW1lKCkucGxheUdhbWUoKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbGFuY2VVbmVQYXJ0aWVEZVJvYm90cygpIHtcclxuICBjb25zdCByb2JvdE1hbmFnZXIgPSBSb2JvdE1hbmFnZXIuZ2V0Um9ib3RNYW5hZ2VyKEdhbWUuZ2V0R2FtZSgpKVxyXG4gIHJvYm90TWFuYWdlci5sYW5jZVVuZVBhcnRpZURlUm9ib3RzKClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5QYXJhbSgpIHtcclxuICAkKCcjZGlhbG9nJykucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICg8YW55PiQoXCIjZGlhbG9nXCIpKS5kaWFsb2coe1xyXG4gICAgcmVzaXphYmxlOiBmYWxzZSxcclxuICAgIGhlaWdodDogXCJhdXRvXCIsXHJcbiAgICB3aWR0aDogNDAwLFxyXG4gICAgbW9kYWw6IHRydWUsXHJcbiAgICBidXR0b25zOiB7XHJcbiAgICAgIFwiVmFsaWRlclwiOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIiNwYXJhbWV0ZXJzVmFsdWVzXCIpLnN1Ym1pdCgpO1xyXG4gICAgICAgICg8YW55PiQodGhpcykpLmRpYWxvZyhcImNsb3NlXCIpXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiRmVybWVyXCI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAoPGFueT4kKHRoaXMpKS5kaWFsb2coXCJjbG9zZVwiKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRQYXJhbSgpIHtcclxuICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShcclxuICAgICc/eD0nICsgJCgnI25iQ2FzZVgnKS52YWwoKSArICcmeT0nICsgJCgnI25iQ2FzZVknKS52YWwoKVxyXG4gIClcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=