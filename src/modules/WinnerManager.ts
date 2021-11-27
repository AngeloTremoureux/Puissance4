import { CheckIfWinner } from "./CheckIfWinner";
import { Game } from "./Game";
import { Jeton } from "./Jeton";

export class WinnerManager {
  static verifWin(game: Game, color: string) {
    let verification = CheckIfWinner.horizontal(game, color);
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
    } else {
      return false;
    }
  }

  static verifIfPionPlacedGiveWin(game: Game, numeroColonneHorizontale: number, numeroColonneVerticale: number, couleurPion: string): boolean|number[][] {
    game.setPion(couleurPion, numeroColonneHorizontale, numeroColonneVerticale)
    const isWinner = WinnerManager.verifWin(game, couleurPion)
    game.removePion(couleurPion, numeroColonneHorizontale, numeroColonneVerticale)
    return isWinner;
  }

}