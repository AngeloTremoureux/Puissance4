import { Game } from "./Game";
import { Utils } from "./Utils";
import { WinnerManager } from "./WinnerManager";

export class RobotManager {
  
  private tailleHorizontaleDuJeu: number;
  private tailleVerticaleDuJeu: number;
  private game: Game;
  private static robotManager: RobotManager;

  private constructor(game: Game) {
    if (game) {
      this.tailleHorizontaleDuJeu = game.getTailleHorizontale();
      this.tailleVerticaleDuJeu = game.getTailleVerticale();
      this.game = game
      RobotManager.robotManager = this
    } else {
      throw new Error("Aucune partie définit")
    }
  }

  public static getRobotManager(game: Game) {
    if (RobotManager.robotManager) {
      return RobotManager.robotManager
    } else {
      return new RobotManager(game)
    }
  }

  public lanceUnePartieDeRobots() {
    this.game.setMessage("Robot Vs. Robot");
    this.game.resetGame()
    this.game.enableGame()
    this.game.monTour.set(false)
    // On choisis une équipe qui commence aléatoirement
    const color = Utils.getCouleurEquipeAleatoire();
    // On lance la partie
    this.robotVsRobot(color);
  }

  private robotVsRobot(color: string) {
    // Si la partie n'est pas terminé
    const that = this;
    if (!this.robotPlaceUnPion(color)) {
      // On fais jouer l'équipe adverse
      setTimeout(function () {
        that.robotVsRobot(Utils.getCouleurEquipeAdverse(color))
      }, 5)
    }
  }

  public robotPlaceUnPion(color: string) {
    const game = this.game;
    // On récupère la liste des colonnes qui n'ont pas leurs
    // colonnes complétés.
    const listeColonnesNonCompletes = game.getLesColonnesNonCompletes();
    let colonneChoisitAleatoirement = Utils.getElementAleatoire(listeColonnesNonCompletes);
    const lesCasesPouvantEtreJouer = game.getLesCasesPouvantEtreJouer();
    lesCasesPouvantEtreJouer.forEach(casePouvantEtreJouer => {
      let indiceHorizontale = casePouvantEtreJouer[0];
      let indiceVerticale = casePouvantEtreJouer[1];
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
    } else {
      let boucleActive = true;
      let indiceTailleVerticale = this.tailleVerticaleDuJeu;
      while (indiceTailleVerticale > 0 && boucleActive) {
        let couleurDuPionPlace = this.game.getColorOfPionPlaced(colonneChoisitAleatoirement, indiceTailleVerticale);
        if (!couleurDuPionPlace) {
          boucleActive = false;
          this.game.forceAddPion(colonneChoisitAleatoirement, indiceTailleVerticale, color)
          //ajouteUnPionDansBdd(colonneChoisitAleatoirement, indiceTailleVerticale, color);
          const isWinner = WinnerManager.verifWin(this.game, color);
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