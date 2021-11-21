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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUFDdkMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkQ7SUFDSCxDQUFDLENBQUM7SUFDRixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUU7UUFDdEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNqQjtJQUNILENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL0dhbWUudHMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL01vblRvdXIuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL1V0aWxzLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9XaW5uZXJNYW5hZ2VyLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9DaGVja0lmV2lubmVyLmpzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9Sb2JvdE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL0pldG9uLnRzIiwid2VicGFjazovL3B1aXNzYW5jZTQvLi9zcmMvbW9kdWxlcy9nYW1lTWFuYWdlci50cyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0Ly4vc3JjL21vZHVsZXMvVGVzdHNVbml0cy5qcyIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3B1aXNzYW5jZTQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3B1aXNzYW5jZTQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wdWlzc2FuY2U0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHVpc3NhbmNlNC8uL3NyYy9tb2R1bGVzL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9uVG91ciB9IGZyb20gXCIuL01vblRvdXJcIlxyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCB7IFdpbm5lck1hbmFnZXIgfSBmcm9tIFwiLi9XaW5uZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFJvYm90TWFuYWdlciB9IGZyb20gXCIuL1JvYm90TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBKZXRvbiB9IGZyb20gXCIuL0pldG9uXCI7XHJcbmltcG9ydCAqIGFzIEludGVyZmFjZSBmcm9tIFwiLi9JbnRlcmZhY2VzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZSB7XHJcblxyXG4gIHByaXZhdGUgdGFpbGxlSG9yaXpvbnRhbGVEdUpldTogbnVtYmVyO1xyXG4gIHByaXZhdGUgdGFpbGxlVmVydGljYWxlRHVKZXU6IG51bWJlcjtcclxuICBwcml2YXRlIGxpc3RlUGlvbnNSb3VnZTogQXJyYXk8SmV0b24+O1xyXG4gIHByaXZhdGUgbGlzdGVQaW9uc0phdW5lOiBBcnJheTxKZXRvbj47XHJcbiAgcHVibGljIG1vblRvdXI6IE1vblRvdXI7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgZ2FtZTogR2FtZTtcclxuXHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcih0YWlsbGVIb3Jpem9udGFsZTogbnVtYmVyLCB0YWlsbGVWZXJ0aWNhbGU6IG51bWJlcikge1xyXG4gICAgdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1ID0gdGFpbGxlSG9yaXpvbnRhbGU7XHJcbiAgICB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1ID0gdGFpbGxlVmVydGljYWxlO1xyXG4gICAgdGhpcy5saXN0ZVBpb25zUm91Z2UgPSBuZXcgQXJyYXkoKTtcclxuICAgIHRoaXMubGlzdGVQaW9uc0phdW5lID0gbmV3IEFycmF5KCk7XHJcbiAgICB0aGlzLm1vblRvdXIgPSBuZXcgTW9uVG91cigpXHJcbiAgICB0aGlzLmRpc2FibGVHYW1lKClcclxuICAgIHRoaXMubG9nKFxyXG4gICAgICBcIlB1aXNzYW5jZSA0XCIsXHJcbiAgICAgIFwiSW5pdGlhbGlzYXRpb24gZHUgamV1IGVuIFwiICsgdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1ICsgXCJ4XCIgKyB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1XHJcbiAgICApO1xyXG4gICAgR2FtZS5nYW1lID0gdGhpcztcclxuICB9XHJcbiAgcHVibGljIHN0YXRpYyBnZXRHYW1lKCk6IEdhbWUge1xyXG4gICAgaWYgKEdhbWUuZ2FtZSkge1xyXG4gICAgICByZXR1cm4gR2FtZS5nYW1lXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgdGFpbGxlSG9yaXpvbnRhbGVQYXJzZWQgPSB0aGlzLmdldFRhaWxsZUhvcml6b250YWxlRnJvbVVybCgpXHJcbiAgICAgIGxldCB0YWlsbGVWZXJ0aWNhbGVQYXJzZWQgPSB0aGlzLmdldFRhaWxsZVZlcnRpY2FsZUZyb21VcmwoKVxyXG4gICAgICByZXR1cm4gbmV3IEdhbWUodGFpbGxlSG9yaXpvbnRhbGVQYXJzZWQsIHRhaWxsZVZlcnRpY2FsZVBhcnNlZClcclxuXHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0VGFpbGxlSG9yaXpvbnRhbGVGcm9tVXJsKCk6IG51bWJlciB7XHJcbiAgICBjb25zdCBwYXJhbXNVcmw6IGFueSA9IFV0aWxzLnBhcnNlVVJMUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXNVcmwgIT09ICd1bmRlZmluZWQnICYmIHBhcmFtc1VybC50YWlsbGVIb3Jpem9udGFsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGUgPSBwYXJhbXNVcmwudGFpbGxlSG9yaXpvbnRhbGVbMF07XHJcbiAgICAgIGlmIChwYXJzZUludCh0YWlsbGVIb3Jpem9udGFsZSkpIHtcclxuICAgICAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZVBhcnNlZCA9IHBhcnNlSW50KHRhaWxsZUhvcml6b250YWxlKVxyXG4gICAgICAgIGlmICh0YWlsbGVIb3Jpem9udGFsZVBhcnNlZCA+PSA0ICYmIHRhaWxsZUhvcml6b250YWxlUGFyc2VkIDw9IDIwKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGFpbGxlSG9yaXpvbnRhbGVQYXJzZWRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIDc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiA3O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gNztcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIHN0YXRpYyBnZXRUYWlsbGVWZXJ0aWNhbGVGcm9tVXJsKCk6IG51bWJlciB7XHJcbiAgICBjb25zdCBwYXJhbXNVcmw6IGFueSA9IFV0aWxzLnBhcnNlVVJMUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXNVcmwgIT09ICd1bmRlZmluZWQnICYmIHBhcmFtc1VybC50YWlsbGVWZXJ0aWNhbGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbnN0IHRhaWxsZVZlcnRpY2FsZSA9IHBhcmFtc1VybC50YWlsbGVWZXJ0aWNhbGVbMF07XHJcbiAgICAgIGlmIChwYXJzZUludCh0YWlsbGVWZXJ0aWNhbGUpKSB7XHJcbiAgICAgICAgY29uc3QgdGFpbGxlVmVydGljYWxlUGFyc2VkID0gcGFyc2VJbnQodGFpbGxlVmVydGljYWxlKVxyXG4gICAgICAgIGlmICh0YWlsbGVWZXJ0aWNhbGVQYXJzZWQgPj0gNCAmJiB0YWlsbGVWZXJ0aWNhbGVQYXJzZWQgPD0gMjApIHtcclxuICAgICAgICAgIHJldHVybiB0YWlsbGVWZXJ0aWNhbGVQYXJzZWRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIDU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiA1O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gNTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIHNlYXJjaFBpZWNlKGNvdWxldXI6IHN0cmluZywgaW5pdENhc2U6IG51bWJlcikge1xyXG4gICAgY29uc3QgcmVkQ2lyY2xlID0gJCgnI3ByZXZpZXcgI3JlZF9jaXJjbGUnKVxyXG4gICAgY29uc3QgeWVsbG93Q2lyY2xlID0gJCgnI3ByZXZpZXcgI3llbGxvd19jaXJjbGUnKVxyXG4gICAgY29uc3QgZGVmYXVsdENpcmNsZSA9ICQoJyNwcmV2aWV3ICNiYXNpY19jaXJjbGUnKVxyXG4gICAgaWYgKGluaXRDYXNlKSB7XHJcbiAgICAgIGlmIChjb3VsZXVyID09PSAncmVkJykge1xyXG4gICAgICAgICQocmVkQ2lyY2xlKS5jaGlsZHJlbigpLmNoaWxkcmVuKCkuYXR0cignY2FzZScsIGluaXRDYXNlKVxyXG4gICAgICAgIHJldHVybiAkKHJlZENpcmNsZSkuaHRtbCgpXHJcbiAgICAgIH0gZWxzZSBpZiAoY291bGV1ciA9PT0gJ3llbGxvdycpIHtcclxuICAgICAgICAkKHllbGxvd0NpcmNsZSkuY2hpbGRyZW4oKS5jaGlsZHJlbigpLmF0dHIoJ2Nhc2UnLCBpbml0Q2FzZSlcclxuICAgICAgICByZXR1cm4gJCh5ZWxsb3dDaXJjbGUpLmh0bWwoKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoZGVmYXVsdENpcmNsZSkuY2hpbGRyZW4oKS5jaGlsZHJlbigpLmF0dHIoJ2Nhc2UnLCBpbml0Q2FzZSlcclxuICAgICAgICByZXR1cm4gJChkZWZhdWx0Q2lyY2xlKS5odG1sKClcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNvdWxldXIgPT09ICdyZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuICQocmVkQ2lyY2xlKS5odG1sKClcclxuICAgICAgfSBlbHNlIGlmIChjb3VsZXVyID09PSAneWVsbG93Jykge1xyXG4gICAgICAgIHJldHVybiAkKHllbGxvd0NpcmNsZSkuaHRtbCgpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuICQoZGVmYXVsdENpcmNsZSkuaHRtbCgpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGU6IG51bWJlciwgaW5kZXhWZXJ0aWNhbGU6IG51bWJlcik6IHN0cmluZ3xib29sZWFuIHtcclxuICAgIHRoaXMuZ2V0UGlvbnMoMSkuZm9yRWFjaChqZXRvbiA9PiB7XHJcbiAgICAgIGlmIChqZXRvbi5nZXRQb3NpdGlvbigpID09IFtpbmRleEhvcml6b250YWxlLCBpbmRleFZlcnRpY2FsZV0pIHtcclxuICAgICAgICByZXR1cm4gJ3JlZCc7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5nZXRQaW9ucygyKS5mb3JFYWNoKGpldG9uID0+IHtcclxuICAgICAgaWYgKGpldG9uLmdldFBvc2l0aW9uKCkgPT0gW2luZGV4SG9yaXpvbnRhbGUsIGluZGV4VmVydGljYWxlXSkge1xyXG4gICAgICAgIHJldHVybiAneWVsbG93JztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBwdWJsaWMgY2xlYXJHYW1lKCk6IHZvaWQge1xyXG4gICAgJCgnLnJvdycpLnJlbW92ZSgpXHJcbiAgfVxyXG4gIHB1YmxpYyByZXNldEdhbWUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNsZWFyR2FtZSgpXHJcbiAgICB0aGlzLmNsZWFyUGlvbnMoKVxyXG4gICAgdGhpcy5jcmVhdGVCYWNrZ3JvdW5kKClcclxuICAgIHRoaXMuZGlzYWJsZUdhbWUoKVxyXG4gIH1cclxuICBwdWJsaWMgcGxheUdhbWUoKTogdm9pZCB7XHJcbiAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oJy4uL3B1YmxpYy9hdWRpby9zdGFydEdhbWUubXA0Jyk7XHJcbiAgICBhdWRpby5wbGF5KCk7XHJcbiAgICBhdWRpbyA9IG51bGw7XHJcbiAgICB0aGlzLnJlc2V0R2FtZSgpXHJcbiAgICB0aGlzLnNldE1lc3NhZ2UoXCJBIHRvaSBkZSBqb3VlciAhXCIpXHJcbiAgICB0aGlzLmVuYWJsZUdhbWUoKVxyXG4gIH1cclxuICBwdWJsaWMgc2VsZWN0KGluZGV4SG9yaXpvbnRhbGU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgbGV0IGluZGV4VmVydGljYWxlID0gdGhpcy5nZXRUYWlsbGVWZXJ0aWNhbGUoKTtcclxuICAgIHdoaWxlIChpbmRleFZlcnRpY2FsZSA+IDApIHtcclxuICAgICAgbGV0IHRlYW1Db2xvciA9IHRoaXMuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZSwgaW5kZXhWZXJ0aWNhbGUpXHJcbiAgICAgIGlmICghdGVhbUNvbG9yKSB7XHJcbiAgICAgICAgbGV0IGNvdWxldXIgPSAkKFwiI2dhbWUgLnJvd1wiKS5lcSgoaW5kZXhWZXJ0aWNhbGUgLSAxKSkuZmluZChcIi5pY29uXCIpLmVxKGluZGV4SG9yaXpvbnRhbGUgLSAxKVxyXG4gICAgICAgIGNvdWxldXIuYXR0cihcInN1cmJyaWxsYW5jZVwiLCBcInJlZFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaW5kZXhWZXJ0aWNhbGUtLTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGdldExlc0NvbG9ubmVzTm9uQ29tcGxldGVzKCk6IG51bWJlcltdIHtcclxuICAgIGxldCBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzID0gW107XHJcbiAgICBmb3IgKGxldCBpbmRleEhvcml6b250YWxlID0gMTsgaW5kZXhIb3Jpem9udGFsZSA8PSB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXU7IGluZGV4SG9yaXpvbnRhbGUrKykge1xyXG4gICAgICBpZiAoIXRoaXMuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhIb3Jpem9udGFsZSwgMSkpIHtcclxuICAgICAgICBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzLnB1c2goaW5kZXhIb3Jpem9udGFsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzO1xyXG4gIH1cclxuICBwdWJsaWMgaXNEcmF3KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubGlzdGVQaW9uc0phdW5lLmxlbmd0aCArIHRoaXMubGlzdGVQaW9uc1JvdWdlLmxlbmd0aCA+PSB0aGlzLmdldFRhaWxsZUhvcml6b250YWxlKCkgKiB0aGlzLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRUYWlsbGVIb3Jpem9udGFsZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldTtcclxuICB9XHJcbiAgcHVibGljIGdldFRhaWxsZVZlcnRpY2FsZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXU7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRMZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIoKTogbnVtYmVyW11bXSB7XHJcbiAgICBsZXQgbGlzdGVEZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXI6IEFycmF5PEFycmF5PG51bWJlcj4+ID0gW107XHJcbiAgICBsZXQgbGlzdGVDb2xvbm5lc05vbkNvbXBsZXRlcyA9IHRoaXMuZ2V0TGVzQ29sb25uZXNOb25Db21wbGV0ZXMoKTtcclxuICAgIGxldCBhVHJvdXZlckxlUGlvbjtcclxuICAgIGxpc3RlQ29sb25uZXNOb25Db21wbGV0ZXMuZm9yRWFjaChudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUgPT4ge1xyXG4gICAgICBsZXQgbnVtZXJvQ29sb25uZVZlcnRpY2FsZSA9IHRoaXMuZ2V0VGFpbGxlVmVydGljYWxlKCk7XHJcbiAgICAgIGFUcm91dmVyTGVQaW9uID0gZmFsc2U7XHJcbiAgICAgIHdoaWxlIChudW1lcm9Db2xvbm5lVmVydGljYWxlID4gMCAmJiAhYVRyb3V2ZXJMZVBpb24pIHtcclxuICAgICAgICBpZiAoIVV0aWxzLmFycmF5MkRDb250YWluc0FycmF5KHRoaXMuZ2V0UGlvbnMoMSksIFtudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGVdKVxyXG4gICAgICAgICAgJiYgIVV0aWxzLmFycmF5MkRDb250YWluc0FycmF5KHRoaXMuZ2V0UGlvbnMoMiksIFtudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGVdKSkge1xyXG4gICAgICAgICAgbGlzdGVEZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIucHVzaChbbnVtZXJvQ29sb25uZUhvcml6b250YWxlLCBudW1lcm9Db2xvbm5lVmVydGljYWxlXSlcclxuICAgICAgICAgIGFUcm91dmVyTGVQaW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGUtLTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbGlzdGVEZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXI7XHJcbiAgfVxyXG4gIHB1YmxpYyBleHBvcnQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiQWZmaWNoYWdlIGRlIGwnZXhwb3J0Li4uXCIpO1xyXG4gICAgbGV0IHBhcmFtczogeyBba2V5OiBzdHJpbmddOiBKZXRvbltdIH0gPSB7fTtcclxuICAgIHBhcmFtc1sncmVkJ10gPSB0aGlzLmdldFBpb25zKCdyZWQnKVxyXG4gICAgcGFyYW1zWyd5ZWxsb3cnXSA9IHRoaXMuZ2V0UGlvbnMoJ3llbGxvdycpXHJcbiAgICBjb25zdCByZWQgPSBwYXJhbXNbJ3JlZCddO1xyXG4gICAgY29uc3QgeWVsbG93ID0gcGFyYW1zWyd5ZWxsb3cnXTtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSAkLmFqYXgoe1xyXG4gICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgIHVybDogXCJhcGkvZXhwb3J0P3g9XCIgKyB0aGlzLnRhaWxsZUhvcml6b250YWxlRHVKZXUgKyBcIiZ5PVwiICsgdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldSxcclxuICAgICAgZGF0YTogeyByZWQ6IHJlZCwgeWVsbG93OiB5ZWxsb3cgfSxcclxuICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICB0aW1lb3V0OiAxMjAwMDBcclxuICAgIH0pXHJcbiAgICByZXF1ZXN0LmRvbmUoZnVuY3Rpb24gKG91dHB1dF9zdWNjZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG91dHB1dF9zdWNjZXNzKVxyXG4gICAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiTCdleHBvcnQgcydlc3QgY29ycmVjdGVtZW50IHRlcm1pbsOpXCIpO1xyXG4gICAgfSlcclxuICAgIHJlcXVlc3QuZmFpbChmdW5jdGlvbiAoaHR0cF9lcnJvcikge1xyXG4gICAgICBsZXQgc2VydmVyX21zZyA9IGh0dHBfZXJyb3IucmVzcG9uc2VUZXh0O1xyXG4gICAgICBsZXQgY29kZSA9IGh0dHBfZXJyb3Iuc3RhdHVzO1xyXG4gICAgICBsZXQgY29kZV9sYWJlbCA9IGh0dHBfZXJyb3Iuc3RhdHVzVGV4dDtcclxuICAgICAgdGhpcy5sb2coXCJQdWlzc2FuY2UgNFwiLCBcIkVjaGVjIGxvcnMgZGUgbCdleHBvcnQgKFwiICsgY29kZSArIFwiKVwiKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBwdWJsaWMgdW5TZWxlY3QoKTogdm9pZCB7XHJcbiAgICAkKFwiLnJvdyAuaWNvblwiKS5hdHRyKFwic3VyYnJpbGxhbmNlXCIsIFwiXCIpO1xyXG4gIH1cclxuICBwdWJsaWMgc2V0TWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICQoXCIjZ2FtZSBwI3RvdXJcIikudGV4dChtZXNzYWdlKTtcclxuICB9XHJcbiAgcHVibGljIGltcG9ydChnYW1lT2JqZWN0OiBJbnRlcmZhY2UuR2FtZU9iamVjdCwgcGFyYW1ldGVyczogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiRMOpYnV0IGRlIGwnaW1wb3J0IC4uLlwiKTtcclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJJbml0aWFsaXNhdGlvbiBkZXMgcGFyYW3DqHRyZXMgLi4uXCIpO1xyXG4gICAgdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1ID0gcGFyc2VJbnQoZ2FtZU9iamVjdC5wYXJhbWV0cmVzLngpXHJcbiAgICB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1ID0gcGFyc2VJbnQoZ2FtZU9iamVjdC5wYXJhbWV0cmVzLnkpXHJcbiAgICB0aGlzLnJlc2V0R2FtZSgpXHJcbiAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiSW1wb3J0IGRlcyBwaW9ucyAuLi5cIik7XHJcbiAgICBnYW1lT2JqZWN0LmRhdGFzLnBpb25zLnJlZC5mb3JFYWNoKHBpb25Sb3VnZSA9PiB7XHJcbiAgICAgIHRoaXMuZm9yY2VBZGRQaW9uKHBpb25Sb3VnZVswXSwgcGlvblJvdWdlWzFdLCAncmVkJylcclxuICAgIH0pO1xyXG4gICAgZ2FtZU9iamVjdC5kYXRhcy5waW9ucy55ZWxsb3cuZm9yRWFjaChwaW9uWWVsbG93ID0+IHtcclxuICAgICAgdGhpcy5mb3JjZUFkZFBpb24ocGlvblllbGxvd1swXSwgcGlvblllbGxvd1sxXSwgJ3llbGxvdycpXHJcbiAgICB9KTtcclxuICAgIGlmIChwYXJhbWV0ZXJzKSB7XHJcbiAgICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJWw6lyaWZpY2F0aW9uIGQndW4gcG90ZW50aWVsIGdhZ25hbnQgLi4uXCIpO1xyXG4gICAgICBsZXQgZ2FnbmFudFJvdWdlID0gV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLCBcInJlZFwiKTtcclxuICAgICAgbGV0IGdhZ25hbnRKYXVuZSA9IFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcywgXCJ5ZWxsb3dcIik7XHJcbiAgICAgIGlmIChnYWduYW50Um91Z2UpIHtcclxuICAgICAgICB0aGlzLnNldFdpbm5lcigncmVkJywgZ2FnbmFudFJvdWdlKTtcclxuICAgICAgICB0aGlzLnVuU2VsZWN0KCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZ2FnbmFudEphdW5lKSB7XHJcbiAgICAgICAgdGhpcy5zZXRXaW5uZXIoJ3llbGxvdycsIGdhZ25hbnRKYXVuZSk7XHJcbiAgICAgICAgdGhpcy5tb25Ub3VyLnNldChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy51blNlbGVjdCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmxvZyhcIlB1aXNzYW5jZSA0XCIsIFwiRmluIGRlIGwnaW1wb3J0XCIpO1xyXG4gIH1cclxuICBwdWJsaWMgc2V0V2lubmVyKGNvdWxldXI6IHN0cmluZywgcGlvbnNHYWduYW50czogbnVtYmVyW11bXSA9IG51bGwpOiB2b2lkIHtcclxuICAgIHRoaXMuZGlzYWJsZUdhbWUoKVxyXG4gICAgaWYgKHBpb25zR2FnbmFudHMpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwaW9uc0dhZ25hbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGluZGV4VmVydGljYWxlID0gcGlvbnNHYWduYW50c1tpXVswXVxyXG4gICAgICAgIGxldCBpbmRleEhvcml6b250YWxlID0gcGlvbnNHYWduYW50c1tpXVsxXVxyXG4gICAgICAgIGxldCBzdXJicmlsbGFuY2VSZWNoZXJjaGUgPSAkKFwiI2dhbWUgLnJvd1wiKS5lcSgoaW5kZXhWZXJ0aWNhbGUgLSAxKSkuZmluZChcIi5pY29uXCIpLmVxKChpbmRleEhvcml6b250YWxlIC0gMSkpXHJcbiAgICAgICAgJChzdXJicmlsbGFuY2VSZWNoZXJjaGUpLmNzcyhcIm9wYWNpdHlcIiwgMSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGNvdWxldXIgPT0gJ3JlZCcpIHtcclxuICAgICAgdGhpcy5zZXRNZXNzYWdlKFwiTGVzIHJvdWdlcyBvbnQgZ2FnbsOpc1wiKTtcclxuICAgIH0gZWxzZSBpZiAoY291bGV1ciA9PSAneWVsbG93Jykge1xyXG4gICAgICB0aGlzLnNldE1lc3NhZ2UoXCJMZXMgamF1bmVzIG9udCBnYWduw6lzXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZXRNZXNzYWdlKFwiTWF0Y2ggbnVsICFcIik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBsb2cocHJlZml4OiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgY29sb3JUZXh0OiBzdHJpbmcgPSAnZmFsc2UnKTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZyhcclxuICAgICAgXCIlY1tcIiArIHByZWZpeCArIFwiXSAlY1wiICsgbWVzc2FnZSxcclxuICAgICAgXCJjb2xvcjogcHVycGxlOyBmb250LXNpemU6IDEzcHg7IGZvbnQtd2VpZ2h0OiBib2xkO1wiLFxyXG4gICAgICBcImZvbnQtc2l6ZTogMTNweDsgY29sb3I6IFwiICsgY29sb3JUZXh0XHJcbiAgICApO1xyXG4gIH1cclxuICBwdWJsaWMgZGlzYWJsZUdhbWUoKTogdm9pZCB7XHJcbiAgICAkKFwiI2dhbWUgLmljb25cIikuY3NzKFwib3BhY2l0eVwiLCAwLjMpXHJcbiAgICB0aGlzLm1vblRvdXIuc2V0KGZhbHNlKVxyXG4gIH1cclxuICBwdWJsaWMgZW5hYmxlR2FtZSgpOiB2b2lkIHtcclxuICAgICQoXCIjZ2FtZSAuaWNvblwiKS5jc3MoXCJvcGFjaXR5XCIsIDEpXHJcbiAgICB0aGlzLm1vblRvdXIuc2V0KHRydWUpXHJcbiAgfVxyXG4gIHB1YmxpYyBjcmVhdGVCYWNrZ3JvdW5kKCk6IHZvaWQge1xyXG4gICAgbGV0IFB4ID0gdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1O1xyXG4gICAgbGV0IFB5ID0gdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldTtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHRoaXMudGFpbGxlVmVydGljYWxlRHVKZXU7IGkrKykge1xyXG4gICAgICBsZXQgcm93WSA9ICc8ZGl2IGNsYXNzPVwicm93XCIgdmFsPVwiJyArIGkgKyAnXCI+PC9kaXY+JztcclxuICAgICAgJChcIiNnYW1lXCIpLmFwcGVuZChyb3dZKTtcclxuICAgICAgZm9yIChsZXQgaiA9IDE7IGogPD0gdGhpcy50YWlsbGVIb3Jpem9udGFsZUR1SmV1OyBqKyspIHtcclxuICAgICAgICAkKCcucm93W3ZhbD1cIicgKyBpICsgJ1wiXScpLmFwcGVuZCh0aGlzLnNlYXJjaFBpZWNlKG51bGwsIGopKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgZm9yY2VBZGRQaW9uKHBvc2l0aW9uSG9yaXpvbnRhbGU6IG51bWJlciwgcG9zaXRpb25WZXJ0aWNhbGU6IG51bWJlciwgY291bGV1cjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAkKFwiLnJvd1t2YWw9J1wiICsgcG9zaXRpb25WZXJ0aWNhbGUgKyBcIiddIC5pY29uW2Nhc2U9J1wiICsgcG9zaXRpb25Ib3Jpem9udGFsZSArIFwiJ11cIikucmVwbGFjZVdpdGgodGhpcy5zZWFyY2hQaWVjZShjb3VsZXVyLCBwb3NpdGlvbkhvcml6b250YWxlKSk7XHJcbiAgICAkKFwiLnJvd1t2YWw9J1wiICsgcG9zaXRpb25WZXJ0aWNhbGUgKyBcIiddIC5pY29uW2Nhc2U9J1wiICsgcG9zaXRpb25Ib3Jpem9udGFsZSArIFwiJ11cIikuYXR0cihcInRlYW1cIiwgY291bGV1cik7XHJcbiAgICBpZiAoY291bGV1ciA9PSAneWVsbG93Jykge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImFqb3V0IDogXCIgKyBwb3NpdGlvbkhvcml6b250YWxlICsgXCIsIFwiKyBwb3NpdGlvblZlcnRpY2FsZSlcclxuICAgICAgdGhpcy5zZXRQaW9uKDIsIG5ldyBKZXRvbihwb3NpdGlvbkhvcml6b250YWxlLCBwb3NpdGlvblZlcnRpY2FsZSkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZXRQaW9uKDEsIG5ldyBKZXRvbihwb3NpdGlvbkhvcml6b250YWxlLCBwb3NpdGlvblZlcnRpY2FsZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgZ2V0UG9zaXRpb25Ib3Jpem9udGFsZShldmVudDogc3RyaW5nIHwgSlF1ZXJ5PGFueT4pIHtcclxuICAgIHJldHVybiAkKGV2ZW50KS5wYXJlbnQoKS5pbmRleCgpICsgMTtcclxuICB9XHJcbiAgcHVibGljIGFkZFBpb24oaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3QgdGFpbGxlVmVydGljYWxlID0gdGhpcy5nZXRUYWlsbGVWZXJ0aWNhbGUoKVxyXG4gICAgbGV0IHBsYWNlSXNOb3RUYWtlbiA9IHRydWU7XHJcbiAgICBsZXQgaW5kZXhWZXJ0aWNhbGUgPSB0YWlsbGVWZXJ0aWNhbGU7XHJcbiAgICBpZiAodGhpcy5tb25Ub3VyLmdldCgpKSB7XHJcbiAgICAgIHdoaWxlIChpbmRleFZlcnRpY2FsZSA+IDAgJiYgcGxhY2VJc05vdFRha2VuKSB7XHJcbiAgICAgICAgbGV0IGNvdWxldXJEdVBpb24gPSB0aGlzLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGVDbGlja2VkLCBpbmRleFZlcnRpY2FsZSk7XHJcbiAgICAgICAgaWYgKCFjb3VsZXVyRHVQaW9uKSB7XHJcbiAgICAgICAgICBwbGFjZUlzTm90VGFrZW4gPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMubW9uVG91ci5zZXQoZmFsc2UpO1xyXG4gICAgICAgICAgdGhpcy51blNlbGVjdCgpO1xyXG4gICAgICAgICAgdGhpcy5mb3JjZUFkZFBpb24oaW5kZXhIb3Jpem9udGFsZUNsaWNrZWQsIGluZGV4VmVydGljYWxlLCBcInJlZFwiKVxyXG4gICAgICAgICAgbGV0IGxlc1Bpb25zR2FnbmFudHMgPSBXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMsIFwicmVkXCIpO1xyXG4gICAgICAgICAgaWYgKGxlc1Bpb25zR2FnbmFudHMpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRXaW5uZXIoJ3JlZCcsIGxlc1Bpb25zR2FnbmFudHMpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRHJhdygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0V2lubmVyKG51bGwsIG51bGwpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdChpbmRleEhvcml6b250YWxlQ2xpY2tlZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TWVzc2FnZShcIkF1IHRvdXIgZGUgbCdhZHZlcnNhaXJlIVwiKTtcclxuICAgICAgICAgICAgY29uc3QgZ2FtZSA9IHRoaXM7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGF1ZGlvID0gbmV3IEF1ZGlvKCcuLi8uLi9wdWJsaWMvYXVkaW8vcG9wLm1wNCcpO1xyXG4gICAgICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcclxuICAgICAgICAgICAgICBjb25zdCByb2JvdE1hbmFnZXIgPSBSb2JvdE1hbmFnZXIuZ2V0Um9ib3RNYW5hZ2VyKGdhbWUpXHJcbiAgICAgICAgICAgICAgaWYgKHJvYm90TWFuYWdlci5yb2JvdFBsYWNlVW5QaW9uKFwieWVsbG93XCIpKSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLnNldE1lc3NhZ2UoXCJUdSBhcyBwZXJkdSBsYSBwYXJ0aWUgIVwiKTtcclxuICAgICAgICAgICAgICAgIGdhbWUubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJQZXJkdSAhXCIpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5tb25Ub3VyLnNldChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLnVuU2VsZWN0KCk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4SG9yaXpvbnRhbGVDbGlja2VkLCBpbmRleFZlcnRpY2FsZSArIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIFNpIGxlIHJvYm90IGEgam91w6kgc3VyIGxhIG3Dqm1lIGNvbG9ubmUsIG9uIGFjdHVhbGlzZSBsYSBzw6lsZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgIGdhbWUuc2VsZWN0KGluZGV4SG9yaXpvbnRhbGVDbGlja2VkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdhbWUubW9uVG91ci5zZXQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLnNldE1lc3NhZ2UoXCJBIHRvbiB0b3VyICFcIik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4VmVydGljYWxlLS07XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5sb2coXHJcbiAgICAgICAgXCJQdWlzc2FuY2UgNFwiLFxyXG4gICAgICAgIFwiSmV0b24gZW4gWDpcIiArIGluZGV4SG9yaXpvbnRhbGVDbGlja2VkICsgXCIgWTpcIiArIChpbmRleFZlcnRpY2FsZSArIDEpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXRQaW9uKHRlYW06IHN0cmluZyB8IG51bWJlciwgdmFsdWU6IEpldG9uKTogdm9pZCB7XHJcbiAgICBpZiAodGVhbSA9PSAxIHx8IHRlYW0gPT0gJ3JlZCcpIHtcclxuICAgICAgdGhpcy5saXN0ZVBpb25zUm91Z2UucHVzaCh2YWx1ZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMubGlzdGVQaW9uc1JvdWdlKTtcclxuICAgIH0gZWxzZSBpZiAodGVhbSA9PSAyIHx8IHRlYW0gPT0gJ3llbGxvdycpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJORVcgUElPTjpcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcclxuICAgICAgY29uc29sZS5sb2codGhpcy5saXN0ZVBpb25zSmF1bmUpO1xyXG4gICAgICB0aGlzLmxpc3RlUGlvbnNKYXVuZS5wdXNoKHZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkxlIGpvdWV1ciBlc3QgaW50cm91dmFibGVcIik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0SW5kZXhPZlBpb24odGVhbTogc3RyaW5nLCBwaW9uOiBKZXRvbik6IG51bWJlciB7XHJcbiAgICB0aGlzLmdldFBpb25zKHRlYW0pLmZvckVhY2godW5QaW9uID0+IHtcclxuICAgICAgaWYgKHVuUGlvbi5nZXRQb3NpdGlvbigpID09IHBpb24uZ2V0UG9zaXRpb24oKSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFBpb25zKHRlYW0pLmluZGV4T2YodW5QaW9uKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgcHVibGljIHJlbW92ZVBpb24odGVhbTogc3RyaW5nIHwgbnVtYmVyLCB2YWx1ZTogSmV0b24pOiB2b2lkIHtcclxuICAgIGlmICh0ZWFtID09IDEgfHwgdGVhbSA9PSAncmVkJykge1xyXG4gICAgICBsZXQgaW5kZXhPZlBpb24gPSB0aGlzLmdldEluZGV4T2ZQaW9uKCdyZWQnLCB2YWx1ZSk7XHJcbiAgICAgIHRoaXMubGlzdGVQaW9uc1JvdWdlLnNwbGljZShpbmRleE9mUGlvbiwgMSlcclxuICAgIH0gZWxzZSBpZiAodGVhbSA9PSAyIHx8IHRlYW0gPT0gJ3llbGxvdycpIHtcclxuICAgICAgbGV0IGluZGV4T2ZQaW9uID0gdGhpcy5nZXRJbmRleE9mUGlvbigneWVsbG93JywgdmFsdWUpO1xyXG4gICAgICB0aGlzLmxpc3RlUGlvbnNKYXVuZS5zcGxpY2UoaW5kZXhPZlBpb24sIDEpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBcIkxlIGpvdWV1ciBlc3QgaW50cm91dmFibGVcIjtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGNsZWFyUGlvbnMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmxpc3RlUGlvbnNSb3VnZSA9IFtdO1xyXG4gICAgdGhpcy5saXN0ZVBpb25zSmF1bmUgPSBbXTtcclxuICAgIHRoaXMubG9nKFwiUHVpc3NhbmNlIDRcIiwgXCJMZXMgZG9ubsOpZXMgZGVzIHBpb25zIG9udCDDqXTDqSBlZmZhY8Opc1wiKTtcclxuICB9XHJcbiAgcHVibGljIGdldFBpb25zKHRlYW06IHN0cmluZyB8IG51bWJlcik6IEpldG9uW10ge1xyXG4gICAgaWYgKHRlYW0gPT0gMSB8fCB0ZWFtID09ICdyZWQnKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMubGlzdGVQaW9uc1JvdWdlKTtcclxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVQaW9uc1JvdWdlO1xyXG4gICAgfSBlbHNlIGlmICh0ZWFtID09IDIgfHwgdGVhbSA9PSAneWVsbG93Jykge1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmxpc3RlUGlvbnNKYXVuZSk7XHJcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlUGlvbnNKYXVuZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IFwiTGUgam91ZXVyIGVzdCBpbnRyb3V2YWJsZVwiO1xyXG4gICAgfVxyXG4gIH1cclxufSIsImV4cG9ydCBjbGFzcyBNb25Ub3VyIHtcclxuICBzZXQobW9uVG91cikge1xyXG4gICAgdGhpcy5tb25Ub3VyID0gbW9uVG91clxyXG4gIH1cclxuICBnZXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tb25Ub3VyXHJcbiAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFV0aWxzIHtcclxuICBzdGF0aWMgZ2V0RW50aWVyQWxlYXRvaXJlKG1pbiwgbWF4KSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldEVsZW1lbnRBbGVhdG9pcmUobGlzdGUpIHtcclxuICAgIGxldCBsb25ndWV1ckxpc3RlID0gbGlzdGUubGVuZ3RoO1xyXG4gICAgbGV0IGVudGllckFsZWF0b2lyZUluZGV4ZVBhckxpc3RlID0gVXRpbHMuZ2V0RW50aWVyQWxlYXRvaXJlKDAsIGxvbmd1ZXVyTGlzdGUpO1xyXG4gICAgcmV0dXJuIGxpc3RlW2VudGllckFsZWF0b2lyZUluZGV4ZVBhckxpc3RlXTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhcnJheTJEQ29udGFpbnNBcnJheShhcnJheTJELCBhcnJheVNlYXJjaCkge1xyXG4gICAgbGV0IGl0ZW1TdHJpbmcgPSBKU09OLnN0cmluZ2lmeShhcnJheVNlYXJjaCk7XHJcbiAgICBsZXQgY29udGFpbnMgPSBhcnJheTJELnNvbWUoZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGVsZW1lbnQpID09PSBpdGVtU3RyaW5nO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gY29udGFpbnM7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0SW5kZXhPZjJEQXJyYXkoYXJyYXkyRCwgaW5kZXgpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkyRC5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgY3VycmVudEFycmF5ID0gYXJyYXkyRFtpXTtcclxuICAgICAgaWYgKGN1cnJlbnRBcnJheVswXSA9PSBpbmRleFswXSAmJiBjdXJyZW50QXJyYXlbMV0gPT0gaW5kZXhbMV0pIHtcclxuICAgICAgICByZXR1cm4gaTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldENvdWxldXJFcXVpcGVBbGVhdG9pcmUoKSB7XHJcbiAgICBsZXQgbGlzdGVEZUNvdWxldXJzID0gW1wieWVsbG93XCIsIFwicmVkXCJdO1xyXG4gICAgbGV0IG5vbWJyZUFsZWF0b2lyZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxpc3RlRGVDb3VsZXVycy5sZW5ndGgpO1xyXG4gICAgcmV0dXJuIGxpc3RlRGVDb3VsZXVyc1tub21icmVBbGVhdG9pcmVdO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldENvdWxldXJFcXVpcGVBZHZlcnNlKGNvdWxldXJFcXVpcGVBY3R1ZWxsZSkge1xyXG4gICAgaWYgKGNvdWxldXJFcXVpcGVBY3R1ZWxsZSA9PSAncmVkJykge1xyXG4gICAgICByZXR1cm4gJ3llbGxvdyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJ3JlZCc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGFyc2VVUkxQYXJhbXModXJsKSB7XHJcbiAgICB2YXIgcXVlcnlTdGFydCA9IHVybC5pbmRleE9mKFwiP1wiKSArIDEsXHJcbiAgICAgIHF1ZXJ5RW5kID0gdXJsLmluZGV4T2YoXCIjXCIpICsgMSB8fCB1cmwubGVuZ3RoICsgMSxcclxuICAgICAgcXVlcnkgPSB1cmwuc2xpY2UocXVlcnlTdGFydCwgcXVlcnlFbmQgLSAxKSxcclxuICAgICAgcGFpcnMgPSBxdWVyeS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpLnNwbGl0KFwiJlwiKSxcclxuICAgICAgcGFybXMgPSB7fSwgaSwgbiwgdiwgbnY7XHJcblxyXG4gICAgaWYgKHF1ZXJ5ID09PSB1cmwgfHwgcXVlcnkgPT09IFwiXCIpIHJldHVybjtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbnYgPSBwYWlyc1tpXS5zcGxpdChcIj1cIiwgMik7XHJcbiAgICAgIG4gPSBkZWNvZGVVUklDb21wb25lbnQobnZbMF0pO1xyXG4gICAgICB2ID0gZGVjb2RlVVJJQ29tcG9uZW50KG52WzFdKTtcclxuXHJcbiAgICAgIGlmICghcGFybXMuaGFzT3duUHJvcGVydHkobikpIHBhcm1zW25dID0gW107XHJcbiAgICAgIHBhcm1zW25dLnB1c2gobnYubGVuZ3RoID09PSAyID8gdiA6IG51bGwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcm1zO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDaGVja0lmV2lubmVyIH0gZnJvbSBcIi4vQ2hlY2tJZldpbm5lclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdpbm5lck1hbmFnZXIge1xyXG4gIHN0YXRpYyB2ZXJpZldpbihnYW1lLCBjb2xvcikge1xyXG4gICAgbGV0IHZlcmlmaWNhdGlvbiA9IENoZWNrSWZXaW5uZXIuaG9yaXpvbnRhbChnYW1lLCBjb2xvcik7XHJcbiAgICBpZiAodmVyaWZpY2F0aW9uKSB7XHJcbiAgICAgIHJldHVybiB2ZXJpZmljYXRpb247XHJcbiAgICB9XHJcbiAgICB2ZXJpZmljYXRpb24gPSBDaGVja0lmV2lubmVyLnZlcnRpY2FsKGdhbWUsIGNvbG9yKTtcclxuICAgIGlmICh2ZXJpZmljYXRpb24pIHtcclxuICAgICAgcmV0dXJuIHZlcmlmaWNhdGlvbjtcclxuICAgIH1cclxuICAgIHZlcmlmaWNhdGlvbiA9IENoZWNrSWZXaW5uZXIuZGlhZ29uYWxUb3BMZWZ0KGdhbWUsIGNvbG9yKTtcclxuICAgIGlmICh2ZXJpZmljYXRpb24pIHtcclxuICAgICAgcmV0dXJuIHZlcmlmaWNhdGlvbjtcclxuICAgIH1cclxuICAgIHZlcmlmaWNhdGlvbiA9IENoZWNrSWZXaW5uZXIuZGlhZ29uYWxUb3BSaWdodChnYW1lLCBjb2xvcik7XHJcbiAgICBpZiAodmVyaWZpY2F0aW9uKSB7XHJcbiAgICAgIHJldHVybiB2ZXJpZmljYXRpb247XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgdmVyaWZJZlBpb25QbGFjZWRHaXZlV2luKGdhbWUsIG51bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZSwgY291bGV1clBpb24pIHtcclxuICAgIGdhbWUuc2V0UGlvbihjb3VsZXVyUGlvbiwgW251bWVyb0NvbG9ubmVIb3Jpem9udGFsZSwgbnVtZXJvQ29sb25uZVZlcnRpY2FsZV0pXHJcbiAgICBjb25zdCBpc1dpbm5lciA9IFdpbm5lck1hbmFnZXIudmVyaWZXaW4oZ2FtZSwgY291bGV1clBpb24pXHJcbiAgICBnYW1lLnJlbW92ZVBpb24oY291bGV1clBpb24sIFtudW1lcm9Db2xvbm5lSG9yaXpvbnRhbGUsIG51bWVyb0NvbG9ubmVWZXJ0aWNhbGVdKVxyXG4gICAgcmV0dXJuIGlzV2lubmVyO1xyXG4gIH1cclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgQ2hlY2tJZldpbm5lciB7XHJcbiAgc3RhdGljIGhvcml6b250YWwoZ2FtZSwgY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgY29uc3QgdGFpbGxlVmVydGljYWxlID0gZ2FtZS5nZXRUYWlsbGVWZXJ0aWNhbGUoKVxyXG4gICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGUgPSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKClcclxuICAgIC8vIFbDqXJpZmljYXRpb24gZW4gaG9yaXpvbnRhbFxyXG4gICAgbGV0IGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgbGV0IGNvdWxldXJEdVBpb247XHJcbiAgICBsZXQgbmJQaW9uc0dhZ25hbnRzO1xyXG4gICAgZm9yIChsZXQgaW5kZXhWZXJ0aWNhbGUgPSAxOyBpbmRleFZlcnRpY2FsZSA8PSB0YWlsbGVWZXJ0aWNhbGU7IGluZGV4VmVydGljYWxlKyspIHtcclxuICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgIGZvciAobGV0IGluZGV4SG9yaXpvbnRhbGUgPSAxOyBpbmRleEhvcml6b250YWxlIDw9IHRhaWxsZUhvcml6b250YWxlOyBpbmRleEhvcml6b250YWxlKyspIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleEhvcml6b250YWxlLCBpbmRleFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBuYlBpb25zR2FnbmFudHMrKztcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cy5wdXNoKFtpbmRleFZlcnRpY2FsZSwgaW5kZXhIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBzdGF0aWMgdmVydGljYWwoZ2FtZSwgY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgY29uc3QgdGFpbGxlVmVydGljYWxlID0gZ2FtZS5nZXRUYWlsbGVWZXJ0aWNhbGUoKVxyXG4gICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGUgPSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKClcclxuICAgIC8vIFBhcmNvdXJzIGRlIGNoYXF1ZSBjYXNlIGhvcml6b250YWxlIGR1IGpldVxyXG4gICAgbGV0IGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgbGV0IGNvdWxldXJEdVBpb247XHJcbiAgICBsZXQgbmJQaW9uc0dhZ25hbnRzO1xyXG4gICAgZm9yIChsZXQgaW5kZXhIb3Jpem9udGFsZSA9IDE7IGluZGV4SG9yaXpvbnRhbGUgPD0gdGFpbGxlSG9yaXpvbnRhbGU7IGluZGV4SG9yaXpvbnRhbGUrKykge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgLy8gUGFyY291cnMgY2hhcXVlIGNhc2UgdmVydGljYWxlIGRlIGxhIGNvbG9ubmVcclxuICAgICAgZm9yIChsZXQgaW5kZXhWZXJ0aWNhbGUgPSAxOyBpbmRleFZlcnRpY2FsZSA8PSB0YWlsbGVWZXJ0aWNhbGU7IGluZGV4VmVydGljYWxlKyspIHtcclxuICAgICAgICBjb3VsZXVyRHVQaW9uID0gZ2FtZS5nZXRDb2xvck9mUGlvblBsYWNlZChpbmRleEhvcml6b250YWxlLCBpbmRleFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhWZXJ0aWNhbGUsIGluZGV4SG9yaXpvbnRhbGVdKTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cysrO1xyXG4gICAgICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRpYWdvbmFsVG9wTGVmdChnYW1lLCBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICBjb25zdCB0YWlsbGVWZXJ0aWNhbGUgPSBnYW1lLmdldFRhaWxsZVZlcnRpY2FsZSgpXHJcbiAgICBjb25zdCB0YWlsbGVIb3Jpem9udGFsZSA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKVxyXG5cclxuICAgIGxldCBjb3VsZXVyRHVQaW9uLCBuYlBpb25zR2FnbmFudHM7XHJcbiAgICBsZXQgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGU7XHJcbiAgICBsZXQgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICBsZXQgaW5kZXhDb3VyYW50VmVydGljYWxlID0gNDtcclxuXHJcbiAgICAvLyBQYXJjb3VycyB0b3V0ZXMgbGVzIGRpYWdvbmFsZXMgw6AgZ2F1Y2hlcyDDoCBwYXJ0aXIgZGUgNC5cclxuICAgIGZvciAobGV0IGluZGV4VmVydGljYWxlID0gNDsgaW5kZXhWZXJ0aWNhbGUgPD0gdGFpbGxlVmVydGljYWxlOyBpbmRleFZlcnRpY2FsZSsrKSB7XHJcbiAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSA9IDE7XHJcblxyXG4gICAgICAvLyBWw6lyaWZpZXIgbGEgbGlnbmUgZW4gZGlhZ29uYWxlXHJcbiAgICAgIHdoaWxlIChpbmRleENvdXJhbnRIb3Jpem9udGFsZSA8PSB0YWlsbGVIb3Jpem9udGFsZSAmJiBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPj0gMSkge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4Q291cmFudEhvcml6b250YWxlLCBpbmRleENvdXJhbnRWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKGNvdWxldXJEdVBpb24gPT0gY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzLnB1c2goW2luZGV4Q291cmFudFZlcnRpY2FsZSwgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGVdKTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cysrO1xyXG4gICAgICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kZXhDb3VyYW50VmVydGljYWxlLS07XHJcbiAgICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUrKztcclxuICAgICAgfVxyXG4gICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPSBpbmRleFZlcnRpY2FsZSArIDE7XHJcbiAgICB9XHJcblxyXG4gICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXhIb3Jpem9udGFsZSA9IDI7IGluZGV4SG9yaXpvbnRhbGUgPD0gKHRhaWxsZUhvcml6b250YWxlIC0gNCk7IGluZGV4SG9yaXpvbnRhbGUrKykge1xyXG4gICAgICBuYlBpb25zR2FnbmFudHMgPSAwO1xyXG4gICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPSBpbmRleEhvcml6b250YWxlO1xyXG4gICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPSB0YWlsbGVWZXJ0aWNhbGU7XHJcbiAgICAgIC8vIFbDqXJpZmllciBsYSBsaWduZSBlbiBkaWFnb25hbGVcclxuICAgICAgd2hpbGUgKGluZGV4Q291cmFudEhvcml6b250YWxlIDw9IHRhaWxsZUhvcml6b250YWxlICYmIGluZGV4Q291cmFudFZlcnRpY2FsZSA+PSAxKSB7XHJcbiAgICAgICAgY291bGV1ckR1UGlvbiA9IGdhbWUuZ2V0Q29sb3JPZlBpb25QbGFjZWQoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUsIGluZGV4Q291cmFudFZlcnRpY2FsZSlcclxuICAgICAgICBpZiAoY291bGV1ckR1UGlvbiA9PSBjb3VsZXVyQVZlcmlmaWVyKSB7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMucHVzaChbaW5kZXhDb3VyYW50VmVydGljYWxlLCBpbmRleENvdXJhbnRIb3Jpem9udGFsZV0pO1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzKys7XHJcbiAgICAgICAgICBpZiAobmJQaW9uc0dhZ25hbnRzID49IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlRGVzUGlvbnNHYWduYW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgICAgIGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUtLTtcclxuICAgICAgICBpbmRleENvdXJhbnRIb3Jpem9udGFsZSsrO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRpYWdvbmFsVG9wUmlnaHQoZ2FtZSwgY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgY29uc3QgdGFpbGxlVmVydGljYWxlID0gZ2FtZS5nZXRUYWlsbGVWZXJ0aWNhbGUoKVxyXG4gICAgY29uc3QgdGFpbGxlSG9yaXpvbnRhbGUgPSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKClcclxuXHJcbiAgICBsZXQgY291bGV1ckR1UGlvbiwgbmJQaW9uc0dhZ25hbnRzO1xyXG4gICAgbGV0IGluZGV4Q291cmFudEhvcml6b250YWxlO1xyXG4gICAgbGV0IGxpc3RlRGVzUGlvbnNHYWduYW50cyA9IFtdO1xyXG5cclxuICAgIC8vIFBhcmNvdXJzIHRvdXRlcyBsZXMgZGlhZ29uYWxlcyDDoCBnYXVjaGVzIMOgIHBhcnRpciBkZSA0LlxyXG4gICAgZm9yIChsZXQgaW5kZXhWZXJ0aWNhbGUgPSA0OyBpbmRleFZlcnRpY2FsZSA8PSB0YWlsbGVWZXJ0aWNhbGU7IGluZGV4VmVydGljYWxlKyspIHtcclxuICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlID0gdGFpbGxlSG9yaXpvbnRhbGU7XHJcbiAgICAgIGxldCBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPSBpbmRleFZlcnRpY2FsZTtcclxuICAgICAgLy8gVsOpcmlmaWVyIGxhIGxpZ25lIGVuIGRpYWdvbmFsZVxyXG4gICAgICB3aGlsZSAoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPj0gMSAmJiBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPj0gMSkge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4Q291cmFudEhvcml6b250YWxlLCBpbmRleENvdXJhbnRWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKGNvdWxldXJEdVBpb24gPT0gY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzLnB1c2goW2luZGV4Q291cmFudFZlcnRpY2FsZSwgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGVdKTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cysrO1xyXG4gICAgICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUtLTtcclxuICAgICAgICBpbmRleENvdXJhbnRWZXJ0aWNhbGUtLTtcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgIGZvciAobGV0IGluZGV4SG9yaXpvbnRhbGUgPSAodGFpbGxlSG9yaXpvbnRhbGUgLSAxKTsgaW5kZXhIb3Jpem9udGFsZSA+PSA0OyBpbmRleEhvcml6b250YWxlLS0pIHtcclxuICAgICAgbmJQaW9uc0dhZ25hbnRzID0gMDtcclxuICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzID0gW107XHJcbiAgICAgIGluZGV4Q291cmFudEhvcml6b250YWxlID0gaW5kZXhIb3Jpem9udGFsZTtcclxuICAgICAgbGV0IGluZGV4Q291cmFudFZlcnRpY2FsZSA9IHRhaWxsZVZlcnRpY2FsZTtcclxuICAgICAgLy8gVsOpcmlmaWVyIGxhIGxpZ25lIGVuIGRpYWdvbmFsZVxyXG4gICAgICB3aGlsZSAoaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUgPj0gMSAmJiBpbmRleENvdXJhbnRWZXJ0aWNhbGUgPj0gMSkge1xyXG4gICAgICAgIGNvdWxldXJEdVBpb24gPSBnYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGluZGV4Q291cmFudEhvcml6b250YWxlLCBpbmRleENvdXJhbnRWZXJ0aWNhbGUpXHJcbiAgICAgICAgaWYgKGNvdWxldXJEdVBpb24gPT0gY291bGV1ckFWZXJpZmllcikge1xyXG4gICAgICAgICAgbGlzdGVEZXNQaW9uc0dhZ25hbnRzLnB1c2goW2luZGV4Q291cmFudFZlcnRpY2FsZSwgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGVdKTtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cysrO1xyXG4gICAgICAgICAgaWYgKG5iUGlvbnNHYWduYW50cyA+PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZURlc1Bpb25zR2FnbmFudHM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5iUGlvbnNHYWduYW50cyA9IDA7XHJcbiAgICAgICAgICBsaXN0ZURlc1Bpb25zR2FnbmFudHMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kZXhDb3VyYW50VmVydGljYWxlLS07XHJcbiAgICAgICAgaW5kZXhDb3VyYW50SG9yaXpvbnRhbGUtLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufSIsImltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IHsgV2lubmVyTWFuYWdlciB9IGZyb20gXCIuL1dpbm5lck1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSb2JvdE1hbmFnZXIge1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUpIHtcclxuICAgIGlmIChnYW1lKSB7XHJcbiAgICAgIHRoaXMudGFpbGxlSG9yaXpvbnRhbGVEdUpldSA9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKTtcclxuICAgICAgdGhpcy50YWlsbGVWZXJ0aWNhbGVEdUpldSA9IGdhbWUuZ2V0VGFpbGxlVmVydGljYWxlKCk7XHJcbiAgICAgIHRoaXMuZ2FtZSA9IGdhbWVcclxuICAgICAgUm9ib3RNYW5hZ2VyLnJvYm90TWFuYWdlciA9IHRoaXNcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkF1Y3VuZSBwYXJ0aWUgZMOpZmluaXRcIilcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0Um9ib3RNYW5hZ2VyKGdhbWUpIHtcclxuICAgIGlmIChSb2JvdE1hbmFnZXIucm9ib3RNYW5hZ2VyKSB7XHJcbiAgICAgIHJldHVybiBSb2JvdE1hbmFnZXIucm9ib3RNYW5hZ2VyXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbmV3IFJvYm90TWFuYWdlcihnYW1lKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbGFuY2VVbmVQYXJ0aWVEZVJvYm90cygpIHtcclxuICAgIHRoaXMuZ2FtZS5zZXRNZXNzYWdlKFwiUm9ib3QgVnMuIFJvYm90XCIpO1xyXG4gICAgdGhpcy5nYW1lLnJlc2V0R2FtZSgpXHJcbiAgICB0aGlzLmdhbWUuZW5hYmxlR2FtZSgpXHJcbiAgICB0aGlzLmdhbWUubW9uVG91ci5zZXQoZmFsc2UpXHJcbiAgICAvLyBPbiBjaG9pc2lzIHVuZSDDqXF1aXBlIHF1aSBjb21tZW5jZSBhbMOpYXRvaXJlbWVudFxyXG4gICAgY29uc3QgY29sb3IgPSBVdGlscy5nZXRDb3VsZXVyRXF1aXBlQWxlYXRvaXJlKCk7XHJcbiAgICAvLyBPbiBsYW5jZSBsYSBwYXJ0aWVcclxuICAgIHRoaXMucm9ib3RWc1JvYm90KGNvbG9yKTtcclxuICB9XHJcblxyXG4gIHJvYm90VnNSb2JvdChjb2xvcikge1xyXG4gICAgLy8gU2kgbGEgcGFydGllIG4nZXN0IHBhcyB0ZXJtaW7DqVxyXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICBpZiAoIXRoaXMucm9ib3RQbGFjZVVuUGlvbihjb2xvcikpIHtcclxuICAgICAgLy8gT24gZmFpcyBqb3VlciBsJ8OpcXVpcGUgYWR2ZXJzZVxyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGF0LnJvYm90VnNSb2JvdChVdGlscy5nZXRDb3VsZXVyRXF1aXBlQWR2ZXJzZShjb2xvcikpXHJcbiAgICAgIH0sIDUpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByb2JvdFBsYWNlVW5QaW9uKGNvbG9yKSB7XHJcbiAgICBjb25zdCBnYW1lID0gdGhpcy5nYW1lO1xyXG4gICAgLy8gT24gcsOpY3Vww6hyZSBsYSBsaXN0ZSBkZXMgY29sb25uZXMgcXVpIG4nb250IHBhcyBsZXVyc1xyXG4gICAgLy8gY29sb25uZXMgY29tcGzDqXTDqXMuXHJcbiAgICBjb25zdCBsaXN0ZUNvbG9ubmVzTm9uQ29tcGxldGVzID0gZ2FtZS5nZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpO1xyXG4gICAgbGV0IGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCA9IFV0aWxzLmdldEVsZW1lbnRBbGVhdG9pcmUobGlzdGVDb2xvbm5lc05vbkNvbXBsZXRlcyk7XHJcbiAgICBjb25zdCBsZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIgPSBnYW1lLmdldExlc0Nhc2VzUG91dmFudEV0cmVKb3VlcigpO1xyXG4gICAgbGVzQ2FzZXNQb3V2YW50RXRyZUpvdWVyLmZvckVhY2goY2FzZVBvdXZhbnRFdHJlSm91ZXIgPT4ge1xyXG4gICAgICBsZXQgaW5kaWNlSG9yaXpvbnRhbGUgPSBjYXNlUG91dmFudEV0cmVKb3VlclswXTtcclxuICAgICAgbGV0IGluZGljZVZlcnRpY2FsZSA9IGNhc2VQb3V2YW50RXRyZUpvdWVyWzFdO1xyXG4gICAgICBpZiAoV2lubmVyTWFuYWdlci52ZXJpZklmUGlvblBsYWNlZEdpdmVXaW4oZ2FtZSwgaW5kaWNlSG9yaXpvbnRhbGUsIGluZGljZVZlcnRpY2FsZSwgY29sb3IpKSB7XHJcbiAgICAgICAgY29sb25uZUNob2lzaXRBbGVhdG9pcmVtZW50ID0gaW5kaWNlSG9yaXpvbnRhbGU7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoV2lubmVyTWFuYWdlci52ZXJpZklmUGlvblBsYWNlZEdpdmVXaW4oZ2FtZSwgaW5kaWNlSG9yaXpvbnRhbGUsIGluZGljZVZlcnRpY2FsZSwgVXRpbHMuZ2V0Q291bGV1ckVxdWlwZUFkdmVyc2UoY29sb3IpKSkge1xyXG4gICAgICAgIGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCA9IGluZGljZUhvcml6b250YWxlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIWxlc0Nhc2VzUG91dmFudEV0cmVKb3VlciB8fCBsZXNDYXNlc1BvdXZhbnRFdHJlSm91ZXIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMuZ2FtZS5zZXRXaW5uZXIobnVsbCwgbnVsbCk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGJvdWNsZUFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIGxldCBpbmRpY2VUYWlsbGVWZXJ0aWNhbGUgPSB0aGlzLnRhaWxsZVZlcnRpY2FsZUR1SmV1O1xyXG4gICAgICB3aGlsZSAoaW5kaWNlVGFpbGxlVmVydGljYWxlID4gMCAmJiBib3VjbGVBY3RpdmUpIHtcclxuICAgICAgICBsZXQgY291bGV1ckR1UGlvblBsYWNlID0gdGhpcy5nYW1lLmdldENvbG9yT2ZQaW9uUGxhY2VkKGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCwgaW5kaWNlVGFpbGxlVmVydGljYWxlKTtcclxuICAgICAgICBpZiAoIWNvdWxldXJEdVBpb25QbGFjZSkge1xyXG4gICAgICAgICAgYm91Y2xlQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmdhbWUuZm9yY2VBZGRQaW9uKGNvbG9ubmVDaG9pc2l0QWxlYXRvaXJlbWVudCwgaW5kaWNlVGFpbGxlVmVydGljYWxlLCBjb2xvcilcclxuICAgICAgICAgIC8vYWpvdXRlVW5QaW9uRGFuc0JkZChjb2xvbm5lQ2hvaXNpdEFsZWF0b2lyZW1lbnQsIGluZGljZVRhaWxsZVZlcnRpY2FsZSwgY29sb3IpO1xyXG4gICAgICAgICAgY29uc3QgaXNXaW5uZXIgPSBXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgY29sb3IpO1xyXG4gICAgICAgICAgaWYgKGlzV2lubmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zZXRXaW5uZXIoY29sb3IsIGlzV2lubmVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGljZVRhaWxsZVZlcnRpY2FsZS0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSIsImV4cG9ydCBjbGFzcyBKZXRvbiB7XHJcblxyXG4gIHByaXZhdGUgcG9zaXRpb25Ib3Jpem9udGFsZTogbnVtYmVyO1xyXG4gIHByaXZhdGUgcG9zaXRpb25WZXJ0aWNhbGU6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IocG9zaXRpb25Ib3Jpem9udGFsZTogbnVtYmVyLCBwb3NpdGlvblZlcnRpY2FsZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnBvc2l0aW9uSG9yaXpvbnRhbGUgPSBwb3NpdGlvbkhvcml6b250YWxlO1xyXG4gICAgdGhpcy5wb3NpdGlvblZlcnRpY2FsZSAgID0gcG9zaXRpb25WZXJ0aWNhbGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0UG9zaXRpb24oKTogbnVtYmVyW10ge1xyXG4gICAgcmV0dXJuIFt0aGlzLnBvc2l0aW9uSG9yaXpvbnRhbGUsIHRoaXMucG9zaXRpb25WZXJ0aWNhbGVdXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0UG9zaXRpb25Ib3Jpem9udGFsZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25Ib3Jpem9udGFsZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRQb3NpdGlvblZlcnRpY2FsZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25WZXJ0aWNhbGU7XHJcbiAgfVxyXG4gIFxyXG59IiwiaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL0dhbWVcIlxyXG5pbXBvcnQgeyBUZXN0c1VuaXRzIH0gZnJvbSBcIi4vVGVzdHNVbml0c1wiXHJcbmltcG9ydCB7IFJvYm90TWFuYWdlciB9IGZyb20gXCIuL1JvYm90TWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFqb3V0ZVVuUGlvbkRhbnNCZGQocHg6IG51bWJlciwgcHk6IG51bWJlciwgY29sb3I6IHN0cmluZykge1xyXG4gIGxldCBnYW1lSWQgPSA0O1xyXG4gICQucG9zdChcIi9hcGkvcGlvbnMvc2V0TGlzdC9cIiwge1xyXG4gICAgaWQ6IGdhbWVJZCxcclxuICAgIFB4OiBweCxcclxuICAgIFB5OiBweSxcclxuICAgIENvbG9yOiBjb2xvclxyXG4gIH0pXHJcbiAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0ZXN0c1VuaXRzKCkge1xyXG4gIGxldCB0ZXN0c1VuaXRzID0gbmV3IFRlc3RzVW5pdHMoR2FtZS5nZXRHYW1lKCkpO1xyXG4gIHRlc3RzVW5pdHMubGF1bmNoVGVzdHNVbml0cygpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwbGF5R2FtZSgpIHtcclxuICBHYW1lLmdldEdhbWUoKS5wbGF5R2FtZSgpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsYW5jZVVuZVBhcnRpZURlUm9ib3RzKCkge1xyXG4gIGNvbnN0IHJvYm90TWFuYWdlciA9IFJvYm90TWFuYWdlci5nZXRSb2JvdE1hbmFnZXIoR2FtZS5nZXRHYW1lKCkpXHJcbiAgcm9ib3RNYW5hZ2VyLmxhbmNlVW5lUGFydGllRGVSb2JvdHMoKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb3BlblBhcmFtKCkge1xyXG4gICQoJyNkaWFsb2cnKS5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgKDxhbnk+JChcIiNkaWFsb2dcIikpLmRpYWxvZyh7XHJcbiAgICByZXNpemFibGU6IGZhbHNlLFxyXG4gICAgaGVpZ2h0OiBcImF1dG9cIixcclxuICAgIHdpZHRoOiA0MDAsXHJcbiAgICBtb2RhbDogdHJ1ZSxcclxuICAgIGJ1dHRvbnM6IHtcclxuICAgICAgXCJWYWxpZGVyXCI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiI3BhcmFtZXRlcnNWYWx1ZXNcIikuc3VibWl0KCk7XHJcbiAgICAgICAgKDxhbnk+JCh0aGlzKSkuZGlhbG9nKFwiY2xvc2VcIilcclxuICAgICAgfSxcclxuICAgICAgXCJGZXJtZXJcIjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICg8YW55PiQodGhpcykpLmRpYWxvZyhcImNsb3NlXCIpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZFBhcmFtKCkge1xyXG4gIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKFxyXG4gICAgJz94PScgKyAkKCcjbmJDYXNlWCcpLnZhbCgpICsgJyZ5PScgKyAkKCcjbmJDYXNlWScpLnZhbCgpXHJcbiAgKVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBUZXN0c1VuaXRzIHtcclxuICBjb25zdHJ1Y3RvcihnYW1lKSB7XHJcbiAgICBpZiAoZ2FtZSkge1xyXG4gICAgICB0aGlzLmdhbWUgPSBnYW1lXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBdWN1bmUgcGFydGllIGZvdXJuaXRcIilcclxuICAgIH1cclxuICB9XHJcbiAgbGF1bmNoVGVzdHNVbml0cygpIHtcclxuICAgIHRoaXMuZGVmYXVsdFRhaWxsZUhvcml6b250YWxlID0gdGhpcy5nYW1lLmdldFRhaWxsZUhvcml6b250YWxlKClcclxuICAgIHRoaXMuZGVmYXVsdFRhaWxsZVZlcnRpY2FsZSA9IHRoaXMuZ2FtZS5nZXRUYWlsbGVWZXJ0aWNhbGUoKVxyXG5cclxuICAgIGNvbnN0IGxpc3RzVGVzdHNVbml0cyA9IFtdXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0MSgpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDIoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQzKCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0NCgpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDUoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQ2KCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0NygpKVxyXG4gICAgbGlzdHNUZXN0c1VuaXRzLnB1c2godGhpcy50ZXN0VW5pdDgoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQ5KCkpXHJcbiAgICBsaXN0c1Rlc3RzVW5pdHMucHVzaCh0aGlzLnRlc3RVbml0MTAoKSlcclxuICAgIGxpc3RzVGVzdHNVbml0cy5wdXNoKHRoaXMudGVzdFVuaXQxMSgpKVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsaXN0c1Rlc3RzVW5pdHMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGxldCBjb2xvcjtcclxuICAgICAgaWYgKGxpc3RzVGVzdHNVbml0c1tpbmRleF0pIHtcclxuICAgICAgICBjb2xvciA9IFwiZ3JlZW5cIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb2xvciA9IFwicmVkXCI7XHJcbiAgICAgIH1cclxuICAgICAgbGV0IG1lc3NhZ2UgPSBcIlRlc3QgXCIgKyAoaW5kZXggKyAxKSArIFwiIDogXCIgKyBsaXN0c1Rlc3RzVW5pdHNbaW5kZXhdICsgXCJcXG5cIjtcclxuICAgICAgdGhpcy5nYW1lLmxvZyhcIlRlc3RcIiwgbWVzc2FnZSwgY29sb3IpO1xyXG5cclxuXHJcbiAgICB9XHJcbiAgICB0aGlzLnJlc2V0VGVzdHMoKTtcclxuXHJcblxyXG4gIH1cclxuICByZXNldFRlc3RzKCkge1xyXG4gICAgdGhpcy5nYW1lLnRhaWxsZUhvcml6b250YWxlRHVKZXUgPSB0aGlzLmRlZmF1bHRUYWlsbGVIb3Jpem9udGFsZTtcclxuICAgIHRoaXMuZ2FtZS50YWlsbGVWZXJ0aWNhbGVEdUpldSA9IHRoaXMuZGVmYXVsdFRhaWxsZVZlcnRpY2FsZTtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICB9XHJcbiAgdGVzdFVuaXQxKCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7IFwicGFyYW1ldHJlc1wiOiB7IFwieFwiOiBcIjdcIiwgXCJ5XCI6IFwiNVwiIH0sIFwiZGF0YXNcIjogeyBcInBpb25zXCI6IHsgXCJyZWRcIjogW1s0LCA1XSwgWzMsIDVdLCBbMiwgNV0sIFs2LCA0XSwgWzMsIDRdLCBbNCwgNF0sIFs3LCA0XSwgWzMsIDNdLCBbNCwgM10sIFs3LCAzXSwgWzEsIDRdLCBbMSwgMl0sIFsxLCAxXSwgWzIsIDFdLCBbNywgMl0sIFs1LCAyXV0sIFwieWVsbG93XCI6IFtbMSwgNV0sIFs2LCA1XSwgWzUsIDVdLCBbNywgNV0sIFsyLCA0XSwgWzUsIDRdLCBbMiwgM10sIFszLCAyXSwgWzQsIDJdLCBbNCwgMV0sIFsxLCAzXSwgWzYsIDNdLCBbMiwgMl0sIFs3LCAxXSwgWzUsIDNdXSB9IH0gfVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbNSwgMl0sIFs0LCAzXSwgWzMsIDRdLCBbMiwgNV1dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3llbGxvdycpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAncmVkJykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbiAgdGVzdFVuaXQyKCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7IFwicGFyYW1ldHJlc1wiOiB7IFwieFwiOiBcIjdcIiwgXCJ5XCI6IFwiNVwiIH0sIFwiZGF0YXNcIjogeyBcInBpb25zXCI6IHsgXCJyZWRcIjogW1sxLCA1XSwgWzMsIDVdLCBbMiwgNV0sIFsyLCAzXSwgWzUsIDVdLCBbNywgNF0sIFsyLCAxXSwgWzUsIDRdXSwgXCJ5ZWxsb3dcIjogW1s3LCA1XSwgWzQsIDVdLCBbMiwgNF0sIFs2LCA1XSwgWzMsIDRdLCBbMiwgMl0sIFs0LCA0XSwgWzEsIDRdXSB9IH0gfVxyXG4gICAgZ2FtZS5pbXBvcnQoZ2FtZUV4cG9ydClcclxuXHJcbiAgICBsZXQgdmFsZXVyQXR0ZW5kdSA9IFtbNCwgMV0sIFs0LCAyXSwgWzQsIDNdLCBbNCwgNF1dXHJcbiAgICByZXR1cm4gKCFXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3JlZCcpICYmIEpTT04uc3RyaW5naWZ5KFdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAneWVsbG93JykpID09PSBKU09OLnN0cmluZ2lmeSh2YWxldXJBdHRlbmR1KSlcclxuICB9XHJcbiAgdGVzdFVuaXQzKCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7IFwicGFyYW1ldHJlc1wiOiB7IFwieFwiOiBcIjdcIiwgXCJ5XCI6IFwiNVwiIH0sIFwiZGF0YXNcIjogeyBcInBpb25zXCI6IHsgXCJyZWRcIjogW1szLCA1XSwgWzcsIDVdLCBbMSwgNV0sIFs3LCA0XSwgWzUsIDRdLCBbNCwgMl0sIFsyLCA1XSwgWzEsIDRdLCBbMiwgM10sIFs3LCAyXSwgWzIsIDJdLCBbMywgM10sIFsxLCAzXSwgWzYsIDRdXSwgXCJ5ZWxsb3dcIjogW1s0LCA1XSwgWzUsIDVdLCBbMywgNF0sIFs0LCA0XSwgWzQsIDNdLCBbNywgM10sIFs0LCAxXSwgWzIsIDRdLCBbNiwgNV0sIFs3LCAxXSwgWzUsIDNdLCBbNSwgMl0sIFsyLCAxXSwgWzEsIDJdLCBbNiwgM11dIH0gfSB9XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG5cclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1szLCA0XSwgWzMsIDVdLCBbMywgNl0sIFszLCA3XV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAncmVkJykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICd5ZWxsb3cnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDQoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHsgXCJwYXJhbWV0cmVzXCI6IHsgXCJ4XCI6IFwiN1wiLCBcInlcIjogXCI1XCIgfSwgXCJkYXRhc1wiOiB7IFwicGlvbnNcIjogeyBcInJlZFwiOiBbWzUsIDVdLCBbNSwgNF0sIFszLCA1XSwgWzQsIDVdLCBbMSwgNV0sIFsxLCA0XSwgWzQsIDNdLCBbNiwgMl0sIFs0LCAyXSwgWzIsIDNdLCBbNSwgMl0sIFs3LCAzXSwgWzUsIDFdLCBbNywgMV0sIFsyLCAyXSwgWzIsIDFdLCBbMywgNF0sIFszLCAzXV0sIFwieWVsbG93XCI6IFtbNywgNV0sIFs2LCA1XSwgWzYsIDRdLCBbMiwgNV0sIFs0LCA0XSwgWzcsIDRdLCBbNiwgM10sIFs1LCAzXSwgWzIsIDRdLCBbNCwgMV0sIFs2LCAxXSwgWzEsIDNdLCBbNywgMl0sIFsxLCAyXSwgWzEsIDFdLCBbMywgMl0sIFszLCAxXV0gfSB9IH1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcblxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICdyZWQnKSAmJiAhV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICd5ZWxsb3cnKSlcclxuICB9XHJcbiAgdGVzdFVuaXQ1KCkge1xyXG4gICAgZ2FtZS5yZXNldEdhbWUoKVxyXG4gICAgbGV0IGdhbWVFeHBvcnQgPSB7IFwicGFyYW1ldHJlc1wiOiB7IFwieFwiOiBcIjdcIiwgXCJ5XCI6IFwiNVwiIH0sIFwiZGF0YXNcIjogeyBcInBpb25zXCI6IHsgXCJyZWRcIjogW1szLCA1XSwgWzQsIDVdLCBbMSwgNV0sIFs3LCA1XSwgWzcsIDRdLCBbNiwgMl0sIFs1LCA1XSwgWzUsIDRdLCBbNSwgMl0sIFsyLCAyXSwgWzEsIDRdLCBbNCwgM10sIFs3LCAzXSwgWzQsIDJdLCBbMywgMV0sIFs3LCAxXSwgWzEsIDJdLCBbMSwgMV1dLCBcInllbGxvd1wiOiBbWzYsIDVdLCBbNiwgNF0sIFsyLCA1XSwgWzIsIDRdLCBbNiwgM10sIFszLCA0XSwgWzYsIDFdLCBbNSwgM10sIFsyLCAzXSwgWzQsIDRdLCBbMSwgM10sIFszLCAzXSwgWzcsIDJdLCBbMywgMl0sIFs0LCAxXSwgWzIsIDFdLCBbNSwgMV1dIH0gfSB9XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG5cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAncmVkJykgJiYgIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAneWVsbG93JykpXHJcbiAgfVxyXG4gIHRlc3RVbml0NigpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0geyBcInBhcmFtZXRyZXNcIjogeyBcInhcIjogXCI3XCIsIFwieVwiOiBcIjVcIiB9LCBcImRhdGFzXCI6IHsgXCJwaW9uc1wiOiB7IFwicmVkXCI6IFtbMywgNV0sIFs3LCA0XSwgWzQsIDVdLCBbNSwgNF0sIFs0LCA0XSwgWzEsIDRdLCBbMywgNF0sIFs0LCAzXSwgWzMsIDNdLCBbNSwgMl0sIFs2LCA0XV0sIFwieWVsbG93XCI6IFtbNywgNV0sIFs1LCA1XSwgWzcsIDNdLCBbMiwgNV0sIFsxLCA1XSwgWzcsIDJdLCBbNSwgM10sIFsyLCA0XSwgWzQsIDJdLCBbMywgMl0sIFs2LCA1XV0gfSB9IH1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcblxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzQsIDNdLCBbNCwgNF0sIFs0LCA1XSwgWzQsIDZdXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICd5ZWxsb3cnKSAmJiBKU09OLnN0cmluZ2lmeShXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3JlZCcpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0NygpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0geyBcInBhcmFtZXRyZXNcIjogeyBcInhcIjogXCI3XCIsIFwieVwiOiBcIjEwXCIgfSwgXCJkYXRhc1wiOiB7IFwicGlvbnNcIjogeyBcInJlZFwiOiBbWzYsIDEwXSwgWzIsIDEwXSwgWzcsIDldLCBbMSwgMTBdLCBbNSwgMTBdLCBbMywgOV0sIFs2LCA4XSwgWzYsIDZdLCBbNiwgNV0sIFs3LCA3XSwgWzUsIDhdLCBbMywgN10sIFszLCA2XSwgWzQsIDhdLCBbNiwgM10sIFs0LCA3XSwgWzEsIDhdLCBbNCwgNV0sIFsyLCA2XSwgWzIsIDRdLCBbMywgNF0sIFszLCAzXSwgWzEsIDddXSwgXCJ5ZWxsb3dcIjogW1s3LCAxMF0sIFszLCAxMF0sIFs2LCA5XSwgWzIsIDldLCBbNCwgMTBdLCBbMSwgOV0sIFs3LCA4XSwgWzYsIDddLCBbNCwgOV0sIFsyLCA4XSwgWzUsIDldLCBbMywgOF0sIFs3LCA2XSwgWzUsIDddLCBbNiwgNF0sIFs1LCA2XSwgWzMsIDVdLCBbNCwgNl0sIFsyLCA3XSwgWzIsIDVdLCBbNCwgNF0sIFs2LCAyXSwgWzcsIDVdLCBbMSwgNl1dIH0gfSB9XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG5cclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s5LCA0XSwgWzgsIDNdLCBbNywgMl0sIFs2LCAxXV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAncmVkJykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICd5ZWxsb3cnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxuICB0ZXN0VW5pdDgoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHsgXCJwYXJhbWV0cmVzXCI6IHsgXCJ4XCI6IFwiMTFcIiwgXCJ5XCI6IFwiNlwiIH0sIFwiZGF0YXNcIjogeyBcInBpb25zXCI6IHsgXCJyZWRcIjogW1sxLCA2XSwgWzUsIDZdLCBbNywgNl0sIFsyLCA1XSwgWzExLCA2XSwgWzksIDZdLCBbOSwgNV0sIFs4LCAzXSwgWzMsIDRdLCBbNCwgNl0sIFs5LCA0XV0sIFwieWVsbG93XCI6IFtbOCwgNl0sIFs4LCA1XSwgWzIsIDZdLCBbNiwgNl0sIFszLCA2XSwgWzMsIDVdLCBbOCwgNF0sIFsxLCA1XSwgWzIsIDRdLCBbNywgNV0sIFs5LCAzXV0gfSB9IH1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcblxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzYsIDZdLCBbNSwgN10sIFs0LCA4XSwgWzMsIDldXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICdyZWQnKSAmJiBKU09OLnN0cmluZ2lmeShXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3llbGxvdycpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0OSgpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0geyBcInBhcmFtZXRyZXNcIjogeyBcInhcIjogXCI0XCIsIFwieVwiOiBcIjRcIiB9LCBcImRhdGFzXCI6IHsgXCJwaW9uc1wiOiB7IFwicmVkXCI6IFtbNCwgNF0sIFsyLCA0XSwgWzQsIDJdLCBbMiwgM10sIFs0LCAxXSwgWzIsIDFdLCBbMSwgMl0sIFszLCAxXV0sIFwieWVsbG93XCI6IFtbMSwgNF0sIFs0LCAzXSwgWzMsIDRdLCBbMywgM10sIFsyLCAyXSwgWzEsIDNdLCBbMywgMl0sIFsxLCAxXV0gfSB9IH1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcblxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICdyZWQnKSAmJiAhV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICd5ZWxsb3cnKSlcclxuICB9XHJcbiAgdGVzdFVuaXQxMCgpIHtcclxuICAgIGdhbWUucmVzZXRHYW1lKClcclxuICAgIGxldCBnYW1lRXhwb3J0ID0geyBcInBhcmFtZXRyZXNcIjogeyBcInhcIjogXCI0XCIsIFwieVwiOiBcIjRcIiB9LCBcImRhdGFzXCI6IHsgXCJwaW9uc1wiOiB7IFwicmVkXCI6IFtbMiwgNF0sIFszLCA0XSwgWzIsIDJdLCBbMiwgMV0sIFsxLCAzXSwgWzQsIDJdXSwgXCJ5ZWxsb3dcIjogW1s0LCA0XSwgWzQsIDNdLCBbMiwgM10sIFsxLCA0XSwgWzMsIDNdLCBbMywgMl0sIFs0LCAxXV0gfSB9IH1cclxuICAgIGdhbWUuaW1wb3J0KGdhbWVFeHBvcnQpXHJcblxyXG4gICAgbGV0IHZhbGV1ckF0dGVuZHUgPSBbWzQsIDFdLCBbMywgMl0sIFsyLCAzXSwgWzEsIDRdXVxyXG4gICAgcmV0dXJuICghV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICdyZWQnKSAmJiBKU09OLnN0cmluZ2lmeShXaW5uZXJNYW5hZ2VyLnZlcmlmV2luKHRoaXMuZ2FtZSwgJ3llbGxvdycpKSA9PT0gSlNPTi5zdHJpbmdpZnkodmFsZXVyQXR0ZW5kdSkpXHJcbiAgfVxyXG4gIHRlc3RVbml0MTEoKSB7XHJcbiAgICBnYW1lLnJlc2V0R2FtZSgpXHJcbiAgICBsZXQgZ2FtZUV4cG9ydCA9IHsgXCJwYXJhbWV0cmVzXCI6IHsgXCJ4XCI6IFwiOFwiLCBcInlcIjogXCI3XCIgfSwgXCJkYXRhc1wiOiB7IFwicGlvbnNcIjogeyBcInJlZFwiOiBbWzEsIDddLCBbNiwgN10sIFs0LCA2XSwgWzgsIDZdLCBbMywgNl0sIFs3LCA3XSwgWzcsIDZdLCBbNywgNV0sIFs1LCA3XSwgWzIsIDddLCBbNSwgNl0sIFs1LCA1XSwgWzUsIDNdLCBbNywgM10sIFs2LCA1XV0sIFwieWVsbG93XCI6IFtbOCwgN10sIFszLCA3XSwgWzQsIDddLCBbNCwgNV0sIFs0LCA0XSwgWzEsIDZdLCBbOCwgNV0sIFs4LCA0XSwgWzcsIDRdLCBbMywgNV0sIFs2LCA2XSwgWzIsIDZdLCBbNSwgNF0sIFszLCA0XSwgWzcsIDJdLCBbNiwgNF1dIH0gfSB9XHJcbiAgICBnYW1lLmltcG9ydChnYW1lRXhwb3J0KVxyXG5cclxuICAgIGxldCB2YWxldXJBdHRlbmR1ID0gW1s0LCAzXSwgWzQsIDRdLCBbNCwgNV0sIFs0LCA2XV1cclxuICAgIHJldHVybiAoIVdpbm5lck1hbmFnZXIudmVyaWZXaW4odGhpcy5nYW1lLCAncmVkJykgJiYgSlNPTi5zdHJpbmdpZnkoV2lubmVyTWFuYWdlci52ZXJpZldpbih0aGlzLmdhbWUsICd5ZWxsb3cnKSkgPT09IEpTT04uc3RyaW5naWZ5KHZhbGV1ckF0dGVuZHUpKVxyXG4gIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL0dhbWVcIlxyXG5pbXBvcnQgKiBhcyBtb2R1bGVzIGZyb20gJy4vZ2FtZU1hbmFnZXInO1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgY29uc3QgZ2FtZSA9IEdhbWUuZ2V0R2FtZSgpXHJcbiAgJChcIiNwbGF5QnV0dG9uXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkgeyBnYW1lLnBsYXlHYW1lKCkgfSlcclxuICAkKFwiI3JvYm90QnV0dG9uXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkgeyBtb2R1bGVzLmxhbmNlVW5lUGFydGllRGVSb2JvdHMoKSB9KVxyXG4gICQoXCIjb3B0aW9uc0J1dHRvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHsgbW9kdWxlcy5vcGVuUGFyYW0oKSB9KVxyXG4gICQoXCJodG1sXCIpLm9uKFwia2V5ZG93blwiLCBcImJvZHlcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBpZiAoZ2FtZS5tb25Ub3VyLmdldCgpKSB7XHJcbiAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleUNvZGU7XHJcbiAgICAgIGlmICgkKFwiI2dhbWUgLnJvdyAuaWNvbltzdXJicmlsbGFuY2U9J3JlZCddXCIpLmxlbmd0aCA+PSAxICYmICFnYW1lLmlzRHJhdygpKSB7XHJcbiAgICAgICAgY29uc3QgcGlvbkVuU3VyYnJpbGxhbmNlID0gJChcIiNnYW1lIC5yb3cgLmljb25bc3VyYnJpbGxhbmNlPSdyZWQnXVwiKTtcclxuICAgICAgICBsZXQgaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA9IHBhcnNlSW50KHBpb25FblN1cmJyaWxsYW5jZS5hdHRyKFwiY2FzZVwiKSk7XHJcbiAgICAgICAgaWYgKGluZGV4SG9yaXpvbnRhbGVEdVBpb24pIHtcclxuICAgICAgICAgICQoXCIjZ2FtZSAucm93IC5pY29uXCIpLm1vdXNlb3V0KCk7XHJcbiAgICAgICAgICBpZiAoa2V5ID09IDM5KSB7XHJcbiAgICAgICAgICAgIC8vIGZsw6hjaGUgZHJvaXRlIDogc2ltdWxhdGlvbiDDoCBkcm9pdGVcclxuICAgICAgICAgICAgaW5kZXhIb3Jpem9udGFsZUR1UGlvbisrO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA+PSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKCkgKyAxKSB7XHJcbiAgICAgICAgICAgICAgaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2hpbGUgKCFnYW1lLmdldExlc0NvbG9ubmVzTm9uQ29tcGxldGVzKCkuaW5jbHVkZXMoaW5kZXhIb3Jpem9udGFsZUR1UGlvbikgJiYgIWdhbWUuaXNEcmF3KCkgJiYgaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA8PSBnYW1lLmdldFRhaWxsZUhvcml6b250YWxlKCkpIHtcclxuICAgICAgICAgICAgICBpbmRleEhvcml6b250YWxlRHVQaW9uKys7XHJcbiAgICAgICAgICAgICAgaWYgKGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPj0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpICsgMSkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA9IDE7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkKFwiI2dhbWUgLnJvd1t2YWw9JzEnXSAuaWNvbltjYXNlPSdcIiArIGluZGV4SG9yaXpvbnRhbGVEdVBpb24gKyBcIiddXCIpLm1vdXNlb3ZlcigpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT0gMzcpIHtcclxuICAgICAgICAgICAgLy8gZmzDqGNoZSBnYXVjaGUgOiBzaW11bGF0aW9uIMOgIGdhdWNoZVxyXG4gICAgICAgICAgICBpbmRleEhvcml6b250YWxlRHVQaW9uLS07XHJcbiAgICAgICAgICAgIGlmIChpbmRleEhvcml6b250YWxlRHVQaW9uIDw9IDApIHtcclxuICAgICAgICAgICAgICBpbmRleEhvcml6b250YWxlRHVQaW9uID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGluZGV4SG9yaXpvbnRhbGVEdVBpb24pXHJcbiAgICAgICAgICAgIHdoaWxlICghZ2FtZS5nZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpLmluY2x1ZGVzKGluZGV4SG9yaXpvbnRhbGVEdVBpb24pICYmICFnYW1lLmlzRHJhdygpICYmIGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPj0gMCkge1xyXG4gICAgICAgICAgICAgIGluZGV4SG9yaXpvbnRhbGVEdVBpb24tLTtcclxuICAgICAgICAgICAgICBpZiAoaW5kZXhIb3Jpem9udGFsZUR1UGlvbiA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleEhvcml6b250YWxlRHVQaW9uID0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpbmRleEhvcml6b250YWxlRHVQaW9uKVxyXG4gICAgICAgICAgICAkKFwiI2dhbWUgLnJvd1t2YWw9JzEnXSAuaWNvbltjYXNlPSdcIiArIGluZGV4SG9yaXpvbnRhbGVEdVBpb24gKyBcIiddXCIpLm1vdXNlb3ZlcigpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT0gMTMgfHwga2V5ID09IDM4KSB7XHJcbiAgICAgICAgICAgIC8vIHRvdWNoZSBlbnRyw6kgb3UgZmzDqGNoZSBoYXV0IDogc2ltdWxhdGlvbiBkJ3VuIGNsaWNrXHJcbiAgICAgICAgICAgICQocGlvbkVuU3VyYnJpbGxhbmNlKS5jbGljaygpO1xyXG4gICAgICAgICAgICBpZiAoIWdhbWUuZ2V0TGVzQ29sb25uZXNOb25Db21wbGV0ZXMoKS5pbmNsdWRlcyhpbmRleEhvcml6b250YWxlRHVQaW9uKSkge1xyXG4gICAgICAgICAgICAgIGluZGV4SG9yaXpvbnRhbGVEdVBpb24rK1xyXG4gICAgICAgICAgICAgIGlmIChpbmRleEhvcml6b250YWxlRHVQaW9uID49IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKSArIDEpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPSAxO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB3aGlsZSAoIWdhbWUuZ2V0TGVzQ29sb25uZXNOb25Db21wbGV0ZXMoKS5pbmNsdWRlcyhpbmRleEhvcml6b250YWxlRHVQaW9uKSAmJiAhZ2FtZS5pc0RyYXcoKSAmJiBpbmRleEhvcml6b250YWxlRHVQaW9uIDw9IGdhbWUuZ2V0VGFpbGxlSG9yaXpvbnRhbGUoKSkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXhIb3Jpem9udGFsZUR1UGlvbisrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAkKFwiI2dhbWUgLnJvd1t2YWw9JzEnXSAuaWNvbltjYXNlPSdcIiArIGluZGV4SG9yaXpvbnRhbGVEdVBpb24gKyBcIiddXCIpLm1vdXNlb3ZlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoXCIjZ2FtZSAucm93IC5pY29uXCIpLm1vdXNlb3V0KCk7XHJcbiAgICAgICAgbGV0IGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPSAxO1xyXG4gICAgICAgIHdoaWxlICghZ2FtZS5nZXRMZXNDb2xvbm5lc05vbkNvbXBsZXRlcygpLmluY2x1ZGVzKGluZGV4SG9yaXpvbnRhbGVEdVBpb24pICYmICFnYW1lLmlzRHJhdygpICYmIGluZGV4SG9yaXpvbnRhbGVEdVBpb24gPD0gZ2FtZS5nZXRUYWlsbGVIb3Jpem9udGFsZSgpKSB7XHJcbiAgICAgICAgICBpbmRleEhvcml6b250YWxlRHVQaW9uKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoXCIjZ2FtZSAucm93W3ZhbD0nMSddIC5pY29uW2Nhc2U9J1wiICsgaW5kZXhIb3Jpem9udGFsZUR1UGlvbiArIFwiJ11cIikubW91c2VvdmVyKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuICAkKFwiI2JveFwiKS5vbignY2xpY2snLCAnI2dhbWUgLmljb24nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoZ2FtZS5tb25Ub3VyLmdldCgpKSB7XHJcbiAgICAgIGNvbnN0IHBvc2l0aW9uSG9yaXpvbnRhbGUgPSBnYW1lLmdldFBvc2l0aW9uSG9yaXpvbnRhbGUoJCh0aGlzKSlcclxuICAgICAgZ2FtZS5hZGRQaW9uKHBvc2l0aW9uSG9yaXpvbnRhbGUpO1xyXG4gICAgICBnYW1lLnNlbGVjdChwb3NpdGlvbkhvcml6b250YWxlKTtcclxuICAgIH1cclxuICB9KVxyXG4gICQoXCIjYm94XCIpLm9uKCdtb3VzZW92ZXInLCAnI2dhbWUgLmljb24nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoZ2FtZS5tb25Ub3VyLmdldCgpKSB7XHJcbiAgICAgIGdhbWUuc2VsZWN0KGdhbWUuZ2V0UG9zaXRpb25Ib3Jpem9udGFsZSgkKHRoaXMpKSk7XHJcbiAgICB9XHJcbiAgfSlcclxuICAkKFwiI2JveFwiKS5vbignbW91c2VvdXQnLCAnI2dhbWUgLmljb24nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoZ2FtZS5tb25Ub3VyLmdldCgpKSB7XHJcbiAgICAgIGdhbWUudW5TZWxlY3QoKTtcclxuICAgIH1cclxuICB9KVxyXG59KTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=