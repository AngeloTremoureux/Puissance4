import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CheckIfWinner } from '../modules/CheckIfWinner';
import { MonTour } from '../modules/MonTour';
import { Utils } from '../modules/Utils';
import { PawnComponent } from '../pawn/pawn.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {

  sizeX: number;
  sizeY: number;
  monTour: MonTour;
  message: string = '';

  listePions: PawnComponent[];

  constructor() {
    this.sizeX = 7;
    this.sizeY = 5;
    this.listePions = [];
    this.monTour = new MonTour(true);
  }

  ngOnInit(): void {
    this.log(
      "Puissance 4",
      "Initialisation du jeu en " + this.sizeX + "x" + this.sizeY
    );
  }

  public log(prefix: string, message: string, colorText: string = 'false'): void {
    console.log(
      "%c[" + prefix + "] %c" + message,
      "color: purple; font-size: 13px; font-weight: bold;",
      "font-size: 13px; color: " + colorText
    );
  }

  addPion(pawn: PawnComponent) {
    this.listePions.push(pawn);
  }

  getAllPionsOfColor(color: string) {
    return this.listePions.filter(x => x.team == color);
  }

  getLoopSizeX() {
    return new Array(this.sizeX);
  }

  getLoopSizeY() {
    return new Array(this.sizeY);
  }

  getLesColonnesNonCompletes() {
    return this.listePions.filter(x => x.position.y == 1 && !x.team);
  }

  getLesCasesPouvantEtreJouer() {
    const liste: PawnComponent[] = [];
    for (let index = 1; index <= this.sizeX; index++) {
      const a = this.listePions.filter(x => x.position.x == index && !x.team);
      if (a && a.length > 0) {
        liste.push(a[a.length - 1]);
      }
    }
    return liste;
  }

  verifWin(liste: PawnComponent[]) {
    let verification = CheckIfWinner.horizontal(this.sizeY, this.sizeX, liste);
    if (verification) {
      return verification;
    }
    verification = CheckIfWinner.vertical(this.sizeY, this.sizeX, liste);
    if (verification) {
      return verification;
    }
    verification = CheckIfWinner.diagonalTopLeft(this.sizeY, this.sizeX, liste);
    if (verification) {
      return verification;
    }
    verification = CheckIfWinner.diagonalTopRight(this.sizeY, this.sizeX, liste);
    if (verification) {
      return verification;
    } else {
      return false;
    }
  }

  verifIfPionPlacedGiveWin(pawn: PawnComponent, couleurPion: string): false|PawnComponent[] {
    const liste: PawnComponent[] = this.getAllPionsOfColor(couleurPion);
    const liste2: PawnComponent[] = [pawn];
    return this.verifWin(liste2.concat(liste));
  }

  play() {
    let audio = new Audio('assets/audio/startGame.mp4');
    audio.play();
    this.setMessage("A toi de jouer !");
    this.resetGame();
  }

  public resetGame(): void {
    this.listePions.forEach(pawn => {
      pawn.team = null;
      pawn.isDisabled = false;
      pawn.isHighlight = false;
      pawn.isWinner = false;
    });
  }

  public setMessage(message: string): void {
    this.message = message;
  }

  public findAllByHorizontaleRangeWithoutTeam(rowX: number) {
    return this.listePions.filter(x => x.position.x == rowX && !x.team);
  }

  public findHighlights() {
    return this.listePions.filter(x => x.isHighlight = true);
  }

  public setWinner(pionsGagnants: PawnComponent[]|null): void {
    const highlights = this.findHighlights();
    highlights.forEach(pawn => {
      pawn.isHighlight = false;
    });
    this.listePions.forEach(pion => {
      pion.isDisabled = true;
    });
    if (pionsGagnants && pionsGagnants.length > 0) {
      pionsGagnants.forEach(pion => {
        pion.isWinner = true;
      });
      if (pionsGagnants[0].team == 'red') {
        this.setMessage("Les rouges ont gagnés");
      } else {
        this.setMessage("Les jaunes ont gagnés");
      }
    } else {
      this.setMessage("Match nul !");
    }
  }

  playBotMove(color: string) {
    // On récupère la liste des colonnes qui n'ont pas leurs
    // colonnes complétés.
    const lesCasesPouvantEtreJouer: PawnComponent[] = this.getLesCasesPouvantEtreJouer();
    let pionChoisit: PawnComponent = Utils.getElementAleatoire(lesCasesPouvantEtreJouer);
    lesCasesPouvantEtreJouer.forEach(pawn => {
      if (this.verifIfPionPlacedGiveWin(pawn, color) || this.verifIfPionPlacedGiveWin(pawn, Utils.getCouleurEquipeAdverse(color))) {
        pionChoisit = pawn;
      }
    });
    if (!lesCasesPouvantEtreJouer || lesCasesPouvantEtreJouer.length === 0) {
      this.setWinner(null);
    } else {
      let audio = new Audio('assets/audio/pop.mp4');
      audio.play();
      pionChoisit.team = color;
      const isWinner = this.verifWin(this.getAllPionsOfColor(color))
      if (isWinner) {
        this.setWinner(isWinner);
      } else {
        this.monTour.set(true);
      }
    }
    const a = this.listePions.find(x => x.isHighlight == true);
    if (a) {
      a.onMouseEnter();
    }
  }
}
