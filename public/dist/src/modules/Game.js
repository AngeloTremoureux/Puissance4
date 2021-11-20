import { MonTour } from "./MonTour";
import { Utils } from "./Utils";
var Game = /** @class */ (function () {
    function Game(tailleHorizontale, tailleVerticale) {
        this.tailleHorizontaleDuJeu = tailleHorizontale;
        this.tailleVerticaleDuJeu = tailleVerticale;
        this.listePionsRouge = new Array();
        this.listePionsJaune = new Array();
        this.monTour = new MonTour();
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
        var paramsUrl = Utils.parseURLParams(window.location.href);
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
        var paramsUrl = Utils.parseURLParams(window.location.href);
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
        if (Utils.array2DContainsArray(listePionsRouge, [indexHorizontale, indexVerticale])) {
            return 'red';
        }
        else if (Utils.array2DContainsArray(listePionsJaune, [indexHorizontale, indexVerticale])) {
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
        indexHorizontale = parseInt(indexHorizontale);
        var indexVerticale = this.getTailleVerticale();
        while (indexVerticale > 0) {
            var teamColor = this.getColorOfPionPlaced(indexHorizontale, indexVerticale);
            if (!teamColor) {
                var couleur = $("#game .row").eq((indexVerticale - 1)).find(".icon").eq((indexHorizontale - 1));
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
        return parseInt(this.tailleHorizontaleDuJeu);
    };
    Game.prototype.getTailleVerticale = function () {
        return parseInt(this.tailleVerticaleDuJeu);
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
                if (!Utils.array2DContainsArray(_this.getPions(1), [numeroColonneHorizontale, numeroColonneVerticale])
                    && !Utils.array2DContainsArray(_this.getPions(2), [numeroColonneHorizontale, numeroColonneVerticale])) {
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
        var params = [];
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
        this.log("Puissance 4", "Début de l'import ...");
        this.log("Puissance 4", "Initialisation des paramètres ...");
        this.tailleHorizontaleDuJeu = gameObject.parametres.x;
        this.tailleVerticaleDuJeu = gameObject.parametres.y;
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
            var gagnantRouge = WinnerManager.verifWin(this, "red");
            var gagnantJaune = WinnerManager.verifWin(this, "yellow");
            if (gagnantRouge) {
                this.setWinner(gagnantRouge);
                this.setMessage("Tu as gagné !");
                this.log("Puissance 4", "Gagné ! Bien joué");
                this.unSelect();
            }
            else if (gagnantJaune) {
                this.setWinner(gagnantJaune);
                this.setMessage("Tu as perdu la partie !");
                this.log("Puissance 4", "Perdu ! :(");
                this.monTour.set(false);
                this.unSelect();
            }
        }
        this.log("Puissance 4", "Fin de l'import");
    };
    Game.prototype.setWinner = function (couleur, pionsGagnants) {
        this.disableGame();
        if (pionsGagnants) {
            for (var i = 0; i < pionsGagnants.length; i++) {
                var indexVerticale = pionsGagnants[i][0];
                var indexHorizontale = pionsGagnants[i][1];
                var couleur_1 = $("#game .row").eq((indexVerticale - 1)).find(".icon").eq((indexHorizontale - 1));
                $(couleur_1).css("opacity", 1);
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
        if (!colorText) {
            colorText = "false";
        }
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
            this.setPion(2, [positionHorizontale, positionVerticale]);
        }
        else {
            this.setPion(1, [positionHorizontale, positionVerticale]);
        }
    };
    Game.prototype.getPositionHorizontale = function (event) {
        return $(event).parent().index() + 1;
    };
    Game.prototype.addPion = function (indexHorizontaleClicked) {
        var tailleVerticale = this.getTailleVerticale();
        var tailleHorizontale = this.getTailleHorizontale();
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
                    var lesPionsGagnants = WinnerManager.verifWin(this_1, "red");
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
                            var robotManager = RobotManager.getRobotManager(game_1);
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
            index = Utils.getIndexOf2DArray(this.listePionsRouge, value);
            this.listePionsRouge.splice(index, 1);
        }
        else if (team == 2 || team == 'yellow') {
            index = Utils.getIndexOf2DArray(this.listePionsJaune, value);
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
export { Game };
//# sourceMappingURL=Game.js.map