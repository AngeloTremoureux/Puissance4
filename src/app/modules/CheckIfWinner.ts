import { GameComponent } from "../game/game.component";
import { PawnComponent } from "../pawn/pawn.component";

export class CheckIfWinner {
  static horizontal(tailleVerticale: number, tailleHorizontale: number, listePions: PawnComponent[]): PawnComponent[]|null {
    // Vérification en horizontal
    let listeDesPionsGagnants: PawnComponent[] = [];
    let pionAtIndex: PawnComponent|undefined;
    let nbPionsGagnants: number = 0;
    for (let indexVerticale = 1; indexVerticale <= tailleVerticale; indexVerticale++) {
      nbPionsGagnants = 0;
      listeDesPionsGagnants = [];
      for (let indexHorizontale = 1; indexHorizontale <= tailleHorizontale; indexHorizontale++) {
        pionAtIndex = listePions.find(x => x.position.x == indexHorizontale && x.position.y == indexVerticale);
        if (pionAtIndex) {
          nbPionsGagnants++;
          listeDesPionsGagnants.push(pionAtIndex);
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
    return null;
  }
  static vertical(tailleVerticale: number, tailleHorizontale: number, listePions: PawnComponent[]): PawnComponent[]|null {
    // Vérification en horizontal
    let listeDesPionsGagnants: PawnComponent[] = [];
    let pionAtIndex: PawnComponent|undefined;
    let nbPionsGagnants: number = 0;
    for (let indexHorizontale = 1; indexHorizontale <= tailleHorizontale; indexHorizontale++) {
      nbPionsGagnants = 0;
      listeDesPionsGagnants = [];
      // Parcours chaque case verticale de la colonne
      for (let indexVerticale = 1; indexVerticale <= tailleVerticale; indexVerticale++) {
        pionAtIndex = listePions.find(x => x.position.x == indexHorizontale && x.position.y == indexVerticale);
        if (pionAtIndex) {
          listeDesPionsGagnants.push(pionAtIndex);
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
    return null;
  }

  static diagonalTopLeft(tailleVerticale: number, tailleHorizontale: number, listePions: PawnComponent[]): PawnComponent[]|null {
    // Vérification en diagonal gauche
    let listeDesPionsGagnants: PawnComponent[] = [];
    let pionAtIndex: PawnComponent|undefined;
    let nbPionsGagnants: number = 0;
    let indexCourantHorizontale: number;
    let indexCourantVerticale: number = 4;

    // Parcours toutes les diagonales à gauches à partir de 4.
    for (let indexVerticale = 4; indexVerticale <= tailleVerticale; indexVerticale++) {
      nbPionsGagnants = 0;
      listeDesPionsGagnants = [];
      indexCourantHorizontale = 1;

      // Vérifier la ligne en diagonale
      while (indexCourantHorizontale <= tailleHorizontale && indexCourantVerticale >= 1) {
        pionAtIndex = listePions.find(x => x.position.x == indexCourantHorizontale && x.position.y == indexCourantVerticale);
        if (pionAtIndex) {
          listeDesPionsGagnants.push(pionAtIndex);
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

    for (let indexHorizontale = 2; indexHorizontale <= (tailleHorizontale - 3); indexHorizontale++) {
      nbPionsGagnants = 0;
      listeDesPionsGagnants = [];
      indexCourantHorizontale = indexHorizontale;
      indexCourantVerticale = tailleVerticale;
      // Vérifier la ligne en diagonale
      while (indexCourantHorizontale <= tailleHorizontale && indexCourantVerticale >= 1) {
        pionAtIndex = listePions.find(x => x.position.x == indexCourantHorizontale && x.position.y == indexCourantVerticale);
        if (pionAtIndex) {
          listeDesPionsGagnants.push(pionAtIndex);
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
    return null;
  }

  static diagonalTopRight(tailleVerticale: number, tailleHorizontale: number, listePions: PawnComponent[]): PawnComponent[]|null {
    // Vérification en diagonal droite
    let listeDesPionsGagnants: PawnComponent[] = [];
    let pionAtIndex: PawnComponent|undefined;
    let nbPionsGagnants: number = 0;
    let indexCourantHorizontale: number;

    // Parcours toutes les diagonales à gauches à partir de 4.
    for (let indexVerticale = 4; indexVerticale <= tailleVerticale; indexVerticale++) {
      nbPionsGagnants = 0;
      listeDesPionsGagnants = [];
      indexCourantHorizontale = tailleHorizontale;
      let indexCourantVerticale = indexVerticale;
      // Vérifier la ligne en diagonale
      while (indexCourantHorizontale >= 1 && indexCourantVerticale >= 1) {
        pionAtIndex = listePions.find(x => x.position.x == indexCourantHorizontale && x.position.y == indexCourantVerticale);
        if (pionAtIndex) {
          listeDesPionsGagnants.push(pionAtIndex);
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
        pionAtIndex = listePions.find(x => x.position.x == indexCourantHorizontale && x.position.y == indexCourantVerticale);
        if (pionAtIndex) {
          listeDesPionsGagnants.push(pionAtIndex);
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
    return null;
  }
}
