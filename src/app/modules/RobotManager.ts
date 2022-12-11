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
    const color = Utils.getRandomTeam();
    // On lance la partie
    this.robotVsRobot(color);
  }

  private robotVsRobot(color: 'red'|'yellow') {
    // Si la partie n'est pas terminé
    const that = this;
    if (!this.robotPlaceUnPion(color)) {
      // On fais jouer l'équipe adverse
      setTimeout(function () {
        that.robotVsRobot(Utils.getOpposingTeam(color))
      }, 5)
    }
  }

}
