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
    let jeton = new Jeton(numeroColonneHorizontale, numeroColonneVerticale);
    game.setPion(couleurPion, jeton)
    const isWinner = WinnerManager.verifWin(game, couleurPion)
    game.removePion(couleurPion, jeton)
    return isWinner;
  }

}