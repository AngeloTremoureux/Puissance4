var CheckIfWinner = /** @class */ (function () {
    function CheckIfWinner() {
    }
    CheckIfWinner.horizontal = function (game, couleurAVerifier) {
        var tailleVerticale = game.getTailleVerticale();
        var tailleHorizontale = game.getTailleHorizontale();
        // Vérification en horizontal
        var listeDesPionsGagnants = [];
        var couleurDuPion;
        var nbPionsGagnants;
        for (var indexVerticale = 1; indexVerticale <= tailleVerticale; indexVerticale++) {
            nbPionsGagnants = 0;
            listeDesPionsGagnants = [];
            for (var indexHorizontale = 1; indexHorizontale <= tailleHorizontale; indexHorizontale++) {
                couleurDuPion = game.getColorOfPionPlaced(indexHorizontale, indexVerticale);
                if (couleurDuPion == couleurAVerifier) {
                    nbPionsGagnants++;
                    listeDesPionsGagnants.push([indexVerticale, indexHorizontale]);
                    if (nbPionsGagnants >= 4) {
                        return listeDesPionsGagnants;
                    }
                }
                else {
                    listeDesPionsGagnants = [];
                    nbPionsGagnants = 0;
                }
            }
            if (nbPionsGagnants >= 4) {
                return listeDesPionsGagnants;
            }
        }
        return false;
    };
    CheckIfWinner.vertical = function (game, couleurAVerifier) {
        var tailleVerticale = game.getTailleVerticale();
        var tailleHorizontale = game.getTailleHorizontale();
        // Parcours de chaque case horizontale du jeu
        var listeDesPionsGagnants = [];
        var couleurDuPion;
        var nbPionsGagnants;
        for (var indexHorizontale = 1; indexHorizontale <= tailleHorizontale; indexHorizontale++) {
            nbPionsGagnants = 0;
            listeDesPionsGagnants = [];
            // Parcours chaque case verticale de la colonne
            for (var indexVerticale = 1; indexVerticale <= tailleVerticale; indexVerticale++) {
                couleurDuPion = game.getColorOfPionPlaced(indexHorizontale, indexVerticale);
                if (couleurDuPion == couleurAVerifier) {
                    listeDesPionsGagnants.push([indexVerticale, indexHorizontale]);
                    nbPionsGagnants++;
                    if (nbPionsGagnants >= 4) {
                        return listeDesPionsGagnants;
                    }
                }
                else {
                    listeDesPionsGagnants = [];
                    nbPionsGagnants = 0;
                }
            }
            if (nbPionsGagnants >= 4) {
                return listeDesPionsGagnants;
            }
        }
        return false;
    };
    CheckIfWinner.diagonalTopLeft = function (game, couleurAVerifier) {
        var tailleVerticale = game.getTailleVerticale();
        var tailleHorizontale = game.getTailleHorizontale();
        var couleurDuPion, nbPionsGagnants;
        var indexCourantHorizontale;
        var listeDesPionsGagnants = [];
        var indexCourantVerticale = 4;
        // Parcours toutes les diagonales à gauches à partir de 4.
        for (var indexVerticale = 4; indexVerticale <= tailleVerticale; indexVerticale++) {
            nbPionsGagnants = 0;
            listeDesPionsGagnants = [];
            indexCourantHorizontale = 1;
            // Vérifier la ligne en diagonale
            while (indexCourantHorizontale <= tailleHorizontale && indexCourantVerticale >= 1) {
                couleurDuPion = game.getColorOfPionPlaced(indexCourantHorizontale, indexCourantVerticale);
                if (couleurDuPion == couleurAVerifier) {
                    listeDesPionsGagnants.push([indexCourantVerticale, indexCourantHorizontale]);
                    nbPionsGagnants++;
                    if (nbPionsGagnants >= 4) {
                        return listeDesPionsGagnants;
                    }
                }
                else {
                    nbPionsGagnants = 0;
                    listeDesPionsGagnants = [];
                }
                indexCourantVerticale--;
                indexCourantHorizontale++;
            }
            indexCourantVerticale = indexVerticale + 1;
        }
        listeDesPionsGagnants = [];
        for (var indexHorizontale = 2; indexHorizontale <= (tailleHorizontale - 4); indexHorizontale++) {
            nbPionsGagnants = 0;
            listeDesPionsGagnants = [];
            indexCourantHorizontale = indexHorizontale;
            indexCourantVerticale = tailleVerticale;
            // Vérifier la ligne en diagonale
            while (indexCourantHorizontale <= tailleHorizontale && indexCourantVerticale >= 1) {
                couleurDuPion = game.getColorOfPionPlaced(indexCourantHorizontale, indexCourantVerticale);
                if (couleurDuPion == couleurAVerifier) {
                    listeDesPionsGagnants.push([indexCourantVerticale, indexCourantHorizontale]);
                    nbPionsGagnants++;
                    if (nbPionsGagnants >= 4) {
                        return listeDesPionsGagnants;
                    }
                }
                else {
                    nbPionsGagnants = 0;
                    listeDesPionsGagnants = [];
                }
                indexCourantVerticale--;
                indexCourantHorizontale++;
            }
        }
        return false;
    };
    CheckIfWinner.diagonalTopRight = function (game, couleurAVerifier) {
        var tailleVerticale = game.getTailleVerticale();
        var tailleHorizontale = game.getTailleHorizontale();
        var couleurDuPion, nbPionsGagnants;
        var indexCourantHorizontale;
        var listeDesPionsGagnants = [];
        // Parcours toutes les diagonales à gauches à partir de 4.
        for (var indexVerticale = 4; indexVerticale <= tailleVerticale; indexVerticale++) {
            nbPionsGagnants = 0;
            listeDesPionsGagnants = [];
            indexCourantHorizontale = tailleHorizontale;
            var indexCourantVerticale = indexVerticale;
            // Vérifier la ligne en diagonale
            while (indexCourantHorizontale >= 1 && indexCourantVerticale >= 1) {
                couleurDuPion = game.getColorOfPionPlaced(indexCourantHorizontale, indexCourantVerticale);
                if (couleurDuPion == couleurAVerifier) {
                    listeDesPionsGagnants.push([indexCourantVerticale, indexCourantHorizontale]);
                    nbPionsGagnants++;
                    if (nbPionsGagnants >= 4) {
                        return listeDesPionsGagnants;
                    }
                }
                else {
                    nbPionsGagnants = 0;
                    listeDesPionsGagnants = [];
                }
                indexCourantHorizontale--;
                indexCourantVerticale--;
            }
        }
        listeDesPionsGagnants = [];
        for (var indexHorizontale = (tailleHorizontale - 1); indexHorizontale >= 4; indexHorizontale--) {
            nbPionsGagnants = 0;
            listeDesPionsGagnants = [];
            indexCourantHorizontale = indexHorizontale;
            var indexCourantVerticale = tailleVerticale;
            // Vérifier la ligne en diagonale
            while (indexCourantHorizontale >= 1 && indexCourantVerticale >= 1) {
                couleurDuPion = game.getColorOfPionPlaced(indexCourantHorizontale, indexCourantVerticale);
                if (couleurDuPion == couleurAVerifier) {
                    listeDesPionsGagnants.push([indexCourantVerticale, indexCourantHorizontale]);
                    nbPionsGagnants++;
                    if (nbPionsGagnants >= 4) {
                        return listeDesPionsGagnants;
                    }
                }
                else {
                    nbPionsGagnants = 0;
                    listeDesPionsGagnants = [];
                }
                indexCourantVerticale--;
                indexCourantHorizontale--;
            }
        }
        return false;
    };
    return CheckIfWinner;
}());
export { CheckIfWinner };
//# sourceMappingURL=CheckIfWinner.js.map