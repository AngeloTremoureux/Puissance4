var WinnerManager = /** @class */ (function () {
    function WinnerManager() {
    }
    WinnerManager.verifWin = function (game, color) {
        var verification = CheckIfWinner.horizontal(game, color);
        if (verification) {
            return verification;
        }
        verification = CheckIfWinner.vertical(game, color);
        if (verification) {
            return verification;
        }
        verification = CheckIfWinner.diagonalTopLeft(game, color);
        if (verification) {
            return verification;
        }
        verification = CheckIfWinner.diagonalTopRight(game, color);
        if (verification) {
            return verification;
        }
        else {
            return false;
        }
    };
    WinnerManager.verifIfPionPlacedGiveWin = function (game, numeroColonneHorizontale, numeroColonneVerticale, couleurPion) {
        game.setPion(couleurPion, [numeroColonneHorizontale, numeroColonneVerticale]);
        var isWinner = WinnerManager.verifWin(game, couleurPion);
        game.removePion(couleurPion, [numeroColonneHorizontale, numeroColonneVerticale]);
        return isWinner;
    };
    return WinnerManager;
}());
export { WinnerManager };
//# sourceMappingURL=WinnerManager.js.map