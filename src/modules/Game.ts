import { MonTour } from "./MonTour"
import { Utils } from "./Utils";
import { WinnerManager } from "./WinnerManager";
import { RobotManager } from "./RobotManager";
import { Jeton } from "./Jeton";
import * as Interface from "./Interfaces";
var $ = require( "jquery" );

export class Game {

  private tailleHorizontaleDuJeu: number;
  private tailleVerticaleDuJeu: number;
  private listePionsRouge: Jeton[];
  private listePionsJaune: Jeton[];
  public monTour: MonTour;
  private static game: Game;

  private constructor(tailleHorizontale: number, tailleVerticale: number) {
    this.tailleHorizontaleDuJeu = tailleHorizontale;
    this.tailleVerticaleDuJeu = tailleVerticale;
    this.listePionsRouge = [];
    this.listePionsJaune = [];
    this.monTour = new MonTour()
    this.disableGame()
    this.log(
      "Puissance 4",
      "Initialisation du jeu en " + this.tailleHorizontaleDuJeu + "x" + this.tailleVerticaleDuJeu
    );
    Game.game = this;
  }
  public static getGame(): Game {
    if (Game.game) {
      return Game.game
    } else {
      let tailleHorizontaleParsed = this.getTailleHorizontaleFromUrl()
      let tailleVerticaleParsed = this.getTailleVerticaleFromUrl()
      return new Game(tailleHorizontaleParsed, tailleVerticaleParsed)
    }
  }
  public static getTailleHorizontaleFromUrl(): number {
    const paramsUrl: any = Utils.parseURLParams(window.location.href)
    if (typeof paramsUrl !== 'undefined' && paramsUrl.tailleHorizontale !== 'undefined') {
      const tailleHorizontale = paramsUrl.tailleHorizontale[0];
      if (parseInt(tailleHorizontale)) {
        const tailleHorizontaleParsed = parseInt(tailleHorizontale)
        if (tailleHorizontaleParsed >= 4 && tailleHorizontaleParsed <= 20) {
          return tailleHorizontaleParsed
        } else {
          return 7;
        }
      } else {
        return 7;
      }
    } else {
      return 7;
    }
  }
  public static getTailleVerticaleFromUrl(): number {
    const paramsUrl: any = Utils.parseURLParams(window.location.href)
    if (typeof paramsUrl !== 'undefined' && paramsUrl.tailleVerticale !== 'undefined') {
      const tailleVerticale = paramsUrl.tailleVerticale[0];
      if (parseInt(tailleVerticale)) {
        const tailleVerticaleParsed = parseInt(tailleVerticale)
        if (tailleVerticaleParsed >= 4 && tailleVerticaleParsed <= 20) {
          return tailleVerticaleParsed
        } else {
          return 5;
        }
      } else {
        return 5;
      }
    } else {
      return 5;
    }
  }
  public searchPiece(couleur: string, initCase: number) {
    const redCircle = $('#preview #red_circle')
    const yellowCircle = $('#preview #yellow_circle')
    const defaultCircle = $('#preview #basic_circle')
    if (initCase) {
      if (couleur === 'red') {
        $(redCircle).children().children().attr('case', initCase)
        return $(redCircle).html()
      } else if (couleur === 'yellow') {
        $(yellowCircle).children().children().attr('case', initCase)
        return $(yellowCircle).html()
      } else {
        $(defaultCircle).children().children().attr('case', initCase)
        return $(defaultCircle).html()
      }
    } else {
      if (couleur === 'red') {
        return $(redCircle).html()
      } else if (couleur === 'yellow') {
        return $(yellowCircle).html()
      } else {
        return $(defaultCircle).html()
      }
    }
  }
  public getColorOfPionPlaced(indexHorizontale: number, indexVerticale: number): string|boolean {
    let couleurARetourner = '';
    let jetonCible = new Jeton(indexHorizontale, indexVerticale);
    this.getPions(1).forEach(jeton => {
      if (jeton.aPositionEgale(jetonCible)) {
        couleurARetourner = 'red';
      }
    });
    this.getPions(2).forEach(jeton => {
      if (jeton.aPositionEgale(jetonCible)) {
        couleurARetourner = 'yellow';
      }
    });
    return (couleurARetourner == '' ? false : couleurARetourner);
  }
  public clearGame(): void {
    $('.row').remove()
  }
  public resetGame(): void {
    this.clearGame()
    this.clearPions()
    this.createBackground()
    this.disableGame()
  }
  public playGame(): void {
    let audio = new Audio('../audio/startGame.mp4');
    audio.play();
    audio = null;
    this.resetGame()
    this.setMessage("A toi de jouer !")
    this.enableGame()
  }
  public select(indexHorizontale: number): void {
    let indexVerticale = this.getTailleVerticale();
    while (indexVerticale > 0) {
      let teamColor = this.getColorOfPionPlaced(indexHorizontale, indexVerticale)
      if (!teamColor) {
        let couleur = $("#game .row").eq((indexVerticale - 1)).find(".icon").eq(indexHorizontale - 1)
        couleur.attr("surbrillance", "red");
        return;
      }
      indexVerticale--;
    }
  }
  public getLesColonnesNonCompletes(): number[] {
    let listeColonnesNonCompletes = [];
    for (let indexHorizontale = 1; indexHorizontale <= this.tailleHorizontaleDuJeu; indexHorizontale++) {
      if (!this.getColorOfPionPlaced(indexHorizontale, 1)) {
        listeColonnesNonCompletes.push(indexHorizontale);
      }
    }
    return listeColonnesNonCompletes;
  }
  public isDraw(): boolean {
    return this.listePionsJaune.length + this.listePionsRouge.length >= this.getTailleHorizontale() * this.getTailleVerticale()
  }
  public getTailleHorizontale(): number {
    return this.tailleHorizontaleDuJeu;
  }
  public getTailleVerticale(): number {
    return this.tailleVerticaleDuJeu;
  }
  public getLesCasesPouvantEtreJouer(): number[][] {
    let listeDesCasesPouvantEtreJouer: number[][] = [];
    let listeColonnesNonCompletes = this.getLesColonnesNonCompletes();
    let aTrouverLePion;
    listeColonnesNonCompletes.forEach(numeroColonneHorizontale => {
      let numeroColonneVerticale = this.getTailleVerticale();
      aTrouverLePion = false;
      while (numeroColonneVerticale > 0 && !aTrouverLePion) {
        let tempJeton = new Jeton(numeroColonneHorizontale, numeroColonneVerticale)
        if (this.getIndexOfPion('red', tempJeton) === -1 && this.getIndexOfPion('yellow', tempJeton) === -1) {
          listeDesCasesPouvantEtreJouer.push([numeroColonneHorizontale, numeroColonneVerticale])
          aTrouverLePion = true;
        }
        tempJeton = null;

        numeroColonneVerticale--;
      }
    });
    return listeDesCasesPouvantEtreJouer;
  }
  public export(): void {
    this.log("Puissance 4", "Affichage de l'export...");
    let params: { [key: string]: Jeton[] } = {};
    params['red'] = this.getPions('red')
    params['yellow'] = this.getPions('yellow')
    const red = params['red'];
    const yellow = params['yellow'];
    const request = $.ajax({
      type: 'POST',
      url: "api/export?x=" + this.tailleHorizontaleDuJeu + "&y=" + this.tailleVerticaleDuJeu,
      data: { red: red, yellow: yellow },
      cache: false,
      timeout: 120000
    })
    request.done(function (output_success: any) {
      console.log(output_success)
      this.log("Puissance 4", "L'export s'est correctement terminé");
    })
    request.fail(function (http_error: any) {
      let server_msg = http_error.responseText;
      let code = http_error.status;
      let code_label = http_error.statusText;
      this.log("Puissance 4", "Echec lors de l'export (" + code + ")");
    });
  }
  public unSelect(): void {
    $(".row .icon").attr("surbrillance", "");
  }
  public setMessage(message: string): void {
    $("#game p#tour").text(message);
  }
  public import(gameObject: Interface.GameObject, parameters: boolean = false): void {
    this.log("Puissance 4", "Début de l'import ...");
    this.log("Puissance 4", "Initialisation des paramètres ...");
    this.tailleHorizontaleDuJeu = parseInt(gameObject.parametres.x)
    this.tailleVerticaleDuJeu = parseInt(gameObject.parametres.y)
    this.resetGame()
    this.log("Puissance 4", "Import des pions ...");
    gameObject.datas.pions.red.forEach(pionRouge => {
      this.forceAddPion(pionRouge[0], pionRouge[1], 'red')
    });
    gameObject.datas.pions.yellow.forEach(pionYellow => {
      this.forceAddPion(pionYellow[0], pionYellow[1], 'yellow')
    });
    if (parameters) {
      this.log("Puissance 4", "Vérification d'un potentiel gagnant ...");
      let gagnantRouge = WinnerManager.verifWin(this, "red");
      let gagnantJaune = WinnerManager.verifWin(this, "yellow");
      if (gagnantRouge) {
        this.setWinner('red', gagnantRouge);
        this.unSelect();
      } else if (gagnantJaune) {
        this.setWinner('yellow', gagnantJaune);
        this.monTour.set(false);
        this.unSelect();
      }
    }
    this.log("Puissance 4", "Fin de l'import");
  }
  public setWinner(couleur: string, pionsGagnants: number[][] = null): void {
    this.disableGame()
    if (pionsGagnants) {
      for (let i = 0; i < pionsGagnants.length; i++) {
        let indexVerticale = pionsGagnants[i][0]
        let indexHorizontale = pionsGagnants[i][1]
        let surbrillanceRecherche = $("#game .row").eq((indexVerticale - 1)).find(".icon").eq((indexHorizontale - 1))
        $(surbrillanceRecherche).css("opacity", 1)
      }
    }
    if (couleur == 'red') {
      this.setMessage("Les rouges ont gagnés");
    } else if (couleur == 'yellow') {
      this.setMessage("Les jaunes ont gagnés");
    } else {
      this.setMessage("Match nul !");
    }
  }
  public log(prefix: string, message: string, colorText: string = 'false'): void {
    console.log(
      "%c[" + prefix + "] %c" + message,
      "color: purple; font-size: 13px; font-weight: bold;",
      "font-size: 13px; color: " + colorText
    );
  }
  public disableGame(): void {
    $("#game .icon").css("opacity", 0.3)
    this.monTour.set(false)
  }
  public enableGame(): void {
    $("#game .icon").css("opacity", 1)
    this.monTour.set(true)
  }
  public createBackground(): void {
    let Px = this.tailleHorizontaleDuJeu;
    let Py = this.tailleVerticaleDuJeu;
    for (let i = 1; i <= this.tailleVerticaleDuJeu; i++) {
      let rowY = '<div class="row" val="' + i + '"></div>';
      $("#game").append(rowY);
      for (let j = 1; j <= this.tailleHorizontaleDuJeu; j++) {
        $('.row[val="' + i + '"]').append(this.searchPiece(null, j));
      }
    }
  }
  public forceAddPion(positionHorizontale: number, positionVerticale: number, couleur: string): void {
    $(".row[val='" + positionVerticale + "'] .icon[case='" + positionHorizontale + "']").replaceWith(this.searchPiece(couleur, positionHorizontale));
    $(".row[val='" + positionVerticale + "'] .icon[case='" + positionHorizontale + "']").attr("team", couleur);
    if (couleur == 'yellow') {
      this.setPion(2, positionHorizontale, positionVerticale);
    } else {
      this.setPion(1, positionHorizontale, positionVerticale);
    }
  }
  public getPositionHorizontale(event: string | JQuery<any>) {
    return $(event).parent().index() + 1;
  }
  public addPion(indexHorizontaleClicked: number): void {
    const tailleVerticale = this.getTailleVerticale()
    let placeIsNotTaken = true;
    let indexVerticale = tailleVerticale;
    if (this.monTour.get()) {
      while (indexVerticale > 0 && placeIsNotTaken) {
        let couleurDuPion = this.getColorOfPionPlaced(indexHorizontaleClicked, indexVerticale);
        if (!couleurDuPion) {
          placeIsNotTaken = false;
          this.monTour.set(false);
          this.unSelect();
          this.forceAddPion(indexHorizontaleClicked, indexVerticale, "red")
          let lesPionsGagnants = WinnerManager.verifWin(this, "red");
          if (lesPionsGagnants) {
            this.setWinner('red', lesPionsGagnants);
          } else if (this.isDraw()) {
            this.setWinner(null, null)
          } else {
            this.select(indexHorizontaleClicked);
            this.setMessage("Au tour de l'adversaire!");
            const game = this;
            setTimeout(function () {
              const audio = new Audio('../../audio/pop.mp4');
              audio.play();
              const robotManager = RobotManager.getRobotManager(game)
              if (robotManager.robotPlaceUnPion("yellow")) {
                game.setMessage("Tu as perdu la partie !");
                game.log("Puissance 4", "Perdu !");
                game.monTour.set(false);
                game.unSelect();
              } else {
                if (game.getColorOfPionPlaced(indexHorizontaleClicked, indexVerticale + 1)) {
                  // Si le robot a joué sur la même colonne, on actualise la sélection
                  game.select(indexHorizontaleClicked);
                }
                game.monTour.set(true);
                game.setMessage("A ton tour !");
              }
            }, 50);
          }
        }
        indexVerticale--;
      }
      this.log(
        "Puissance 4",
        "Jeton en X:" + indexHorizontaleClicked + " Y:" + (indexVerticale + 1)
      );
    }
  }
  public setPion(team: string | number, positionHorizontale: number, positionVerticale: number): void {
    let jeton = new Jeton(positionHorizontale, positionVerticale);
    if (team == 1 || team == 'red') {
      this.listePionsRouge.push(jeton);
    } else if (team == 2 || team == 'yellow') {
      this.listePionsJaune.push(jeton);
    } else {
      throw new Error("Le joueur est introuvable");
    }
    
  }
  private getIndexOfPion(team: string, pion: Jeton): number {
    let index = -1;
    this.getPions(team).forEach(unPion => {
      if (unPion.aPositionEgale(pion)) {
        index = this.getPions(team).indexOf(unPion);
      }
    });
    return index;
  }
  public removePion(team: string | number, numeroColonneHorizontale: number, numeroColonneVerticale: number): void {
    let jeton = new Jeton(numeroColonneHorizontale, numeroColonneVerticale);
    if (team == 1 || team == 'red') {
      let indexOfPion = this.getIndexOfPion('red', jeton);
      this.listePionsRouge.splice(indexOfPion, 1)
    } else if (team == 2 || team == 'yellow') {
      let indexOfPion = this.getIndexOfPion('yellow', jeton);
      this.listePionsJaune.splice(indexOfPion, 1)
    } else {
      throw "Le joueur est introuvable";
    }
  }
  public clearPions(): void {
    this.listePionsRouge = [];
    this.listePionsJaune = [];
    this.log("Puissance 4", "Les données des pions ont été effacés");
  }
  public getPions(team: string | number): Jeton[] {
    if (team == 1 || team == 'red') {
      return this.listePionsRouge;
    } else if (team == 2 || team == 'yellow') {
      return this.listePionsJaune;
    } else {
      throw "Le joueur est introuvable";
    }
  }
}