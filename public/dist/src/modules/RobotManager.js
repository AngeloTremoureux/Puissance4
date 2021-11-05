var RobotManager = /** @class */ (function () {
    function RobotManager(game) {
        if (game) {
            this.tailleHorizontaleDuJeu = game.getTailleHorizontale();
            this.tailleVerticaleDuJeu = game.getTailleVerticale();
            this.game = game;
            RobotManager.robotManager = this;
        }
        else {
            throw new Error("Aucune partie définit");
        }
    }
    RobotManager.getRobotManager = function (game) {
        if (RobotManager.robotManager) {
            return RobotManager.robotManager;
        }
        else {
            return new RobotManager(game);
        }
    };
    RobotManager.prototype.lanceUnePartieDeRobots = function () {
        this.game.setMessage("Robot Vs. Robot");
        this.game.resetGame();
        this.game.enableGame();
        this.game.monTour.set(false);
        // On choisis une équipe qui commence aléatoirement
        var color = Utils.getCouleurEquipeAleatoire();
        // On lance la partie
        this.robotVsRobot(color);
    };
    RobotManager.prototype.robotVsRobot = function (color) {
        // Si la partie n'est pas terminé
        var that = this;
        if (!this.robotPlaceUnPion(color)) {
            // On fais jouer l'équipe adverse
            setTimeout(function () {
                that.robotVsRobot(Utils.getCouleurEquipeAdverse(color));
            }, 5);
        }
    };
    RobotManager.prototype.robotPlaceUnPion = function (color) {
        var game = this.game;
        // On récupère la liste des colonnes qui n'ont pas leurs
        // colonnes complétés.
        var listeColonnesNonCompletes = game.getLesColonnesNonCompletes();
        var colonneChoisitAleatoirement = Utils.getElementAleatoire(listeColonnesNonCompletes);
        var lesCasesPouvantEtreJouer = game.getLesCasesPouvantEtreJouer();
        lesCasesPouvantEtreJouer.forEach(function (casePouvantEtreJouer) {
            var indiceHorizontale = casePouvantEtreJouer[0];
            var indiceVerticale = casePouvantEtreJouer[1];
            if (WinnerManager.verifIfPionPlacedGiveWin(game, indiceHorizontale, indiceVerticale, color)) {
                colonneChoisitAleatoirement = indiceHorizontale;
            }
            else if (WinnerManager.verifIfPionPlacedGiveWin(game, indiceHorizontale, indiceVerticale, Utils.getCouleurEquipeAdverse(color))) {
                colonneChoisitAleatoirement = indiceHorizontale;
            }
        });
        if (!lesCasesPouvantEtreJouer || lesCasesPouvantEtreJouer.length === 0) {
            this.game.setWinner(null, null);
            return true;
        }
        else {
            var boucleActive = true;
            var indiceTailleVerticale = this.tailleVerticaleDuJeu;
            while (indiceTailleVerticale > 0 && boucleActive) {
                var couleurDuPionPlace = this.game.getColorOfPionPlaced(colonneChoisitAleatoirement, indiceTailleVerticale);
                if (!couleurDuPionPlace) {
                    boucleActive = false;
                    this.game.forceAddPion(colonneChoisitAleatoirement, indiceTailleVerticale, color);
                    //ajouteUnPionDansBdd(colonneChoisitAleatoirement, indiceTailleVerticale, color);
                    var isWinner = WinnerManager.verifWin(this.game, color);
                    if (isWinner) {
                        this.game.setWinner(color, isWinner);
                        return true;
                    }
                }
                indiceTailleVerticale--;
            }
        }
    };
    return RobotManager;
}());
export { RobotManager };
//# sourceMappingURL=RobotManager.js.map