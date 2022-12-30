import { Component, OnInit } from '@angular/core';
import { CheckIfWinner } from '../modules/CheckIfWinner';
import { MonTour } from '../modules/MonTour';
import { Utils } from '../modules/Utils';
import { PawnComponent } from '../pawn/pawn.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ParametersComponent } from '../parameters/parameters.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {

  rowSize: number;
  columnSize: number;
  myTurn: MonTour;
  state: string;
  progress: boolean;
  message: string = '';
  playMessage: string;
  isGameBreak: boolean = false;
  speed: number = 500;

  pawns: PawnComponent[];

  constructor(public dialog: MatDialog) {
    this.state = '';
    this.playMessage = 'Jouer';
    this.progress = false;
    this.rowSize = 7;
    this.columnSize = 5;
    this.pawns = [];
    this.myTurn = new MonTour(true);
  }

  ngOnInit(): void {
    this.log(
      "Puissance 4",
      "Initialisation du jeu en " + this.rowSize + "x" + this.columnSize
    );
  }

  log(prefix: string, message: string, colorText: string = 'false'): void {
    console.log(
      "%c[" + prefix + "] %c" + message,
      "color: purple; font-size: 13px; font-weight: bold;",
      "font-size: 13px; color: " + colorText
    );
  }

  /**
   * Initialise un pion jouable
   * @param pawn Pion
   */
  initializePawn(pawn: PawnComponent): void {
    this.pawns.push(pawn);
  }

  /**
   * Récupère la liste des pions d'une couleur spécifique
   * @param color rouge ou jaune
   * @returns liste de pions ou liste vide
   */
  getPawnsOfTeam(team: 'red'|'yellow'): PawnComponent[] {
    return this.pawns.filter(x => x.team == team);
  }

  /**
   * Créer une liste d'éléments null de la taille du nombre de colonnes
   * @returns Liste de null
   */
  getColumnNumberAsArray(): null[] {
    return new Array(this.rowSize);
  }

  /**
   * Créer une liste d'éléments null de la taille du nombre de colonnes
   * @returns Liste de null
   */
  getRowNumberAsArray(): null[] {
    return new Array(this.columnSize);
  }

  /**
   * Récupère la liste des colonnes jouables et non complétés avec le pion correspondant
   * @returns Liste
   */
  getNonEmptyColumns(): PawnComponent[] {
    const liste: PawnComponent[] = [];
    // Parcours de chaque colonne
    for (let index = 1; index <= this.rowSize; index++) {
      // On récupère la liste des pions
      const pawns: PawnComponent[] = this.pawns.filter(x => x.position.x == index && !x.team);
      if (pawns && pawns.length > 0) {
        liste.push(pawns[pawns.length - 1]);
      }
    }
    return liste;
  }

  /**
   * Vérifie s'il y a une équipe gagnante
   * @param liste Liste de pion à vérifier
   * @returns La liste des pions gagnants ou false
   */
  checksIfThereAreWiningPawns(liste: PawnComponent[]):  PawnComponent[] | false {
    let verification: PawnComponent[]|null = CheckIfWinner.horizontal(this.columnSize, this.rowSize, liste);
    if (verification) {
      return verification;
    }
    verification = CheckIfWinner.vertical(this.columnSize, this.rowSize, liste);
    if (verification) {
      return verification;
    }
    verification = CheckIfWinner.diagonalTopLeft(this.columnSize, this.rowSize, liste);
    if (verification) {
      return verification;
    }
    verification = CheckIfWinner.diagonalTopRight(this.columnSize, this.rowSize, liste);
    if (verification) {
      return verification;
    } else {
      return false;
    }
  }

  /**
   * Vérifie si l'ajout d'un pion donne la victoire à une équipe
   * @param pawn Pion à ajouter
   * @param team Equipe  correspondante
   * @returns Liste des pions gagnants ou false
   */
  checksIfThisPawnGivesVictory(pawn: PawnComponent, team: 'red'|'yellow'): false|PawnComponent[] {
    const pawnsOfTeam: PawnComponent[] = this.getPawnsOfTeam(team);
    const arrayWithGivedPawn: PawnComponent[] = [pawn];
    return this.checksIfThereAreWiningPawns(arrayWithGivedPawn.concat(pawnsOfTeam));
  }

  /**
   * Lance une nouvelle partie
   */
  startNewGame(): void {
    const audio: HTMLAudioElement = new Audio('assets/audio/startGame.mp4');
    this.setMessage("A toi de jouer !");
    audio.play();
    if (this.isGameIsStarted()) {
      this.pawns.forEach(pawn => {
        pawn.isDisabled = false;
      });
    } else {
      this.resetGame();
    }
    this.state = 'play';
    this.myTurn.set(true);
  }

  /**
   * Réinitialise une partie
   */
  resetGame(): void {
    this.isGameBreak = false;
    this.pawns.forEach(pawn => {
      pawn.team = null;
      pawn.isDisabled = false;
      pawn.isHighlight = false;
      pawn.isWinner = false;
    });
  }

  /**
   * Désactive une partie
   */
  disableGame(): void {
    this.pawns.forEach(pawn => {
      pawn.team = null;
      pawn.isDisabled = true;
      pawn.isHighlight = false;
      pawn.isWinner = false;
    });
  }

  /**
   * Met à jour le statut de la partie avec un message
   * @param message Message à afficher
   */
  setMessage(message: string): void {
    this.message = message;
  }

  /**
   * Récupère la liste des pions d'une colonne sans équipe
   * @param indexColumn Index de la ligne
   * @returns Liste des pions ou liste vide
   */
  findPawnsWithoutTeamFromColumn(indexColumn: number): PawnComponent[] {
    return this.pawns.filter(x => x.position.x == indexColumn && !x.team);
  }

  /**
   * Récupère la liste des pions en surbrillance
   * @returns Liste des pions ou liste vide
   */
  getHighlightedPawns(): PawnComponent[] {
    return this.pawns.filter(x => x.isHighlight == true);
  }

  /**
   * Met des pions gagnants
   * @param winningPawns Liste des pions
   */
  setWinner(winningPawns: PawnComponent[]|null): void {
    this.isGameBreak = true;
    const highlights = this.getHighlightedPawns();
    highlights.forEach(pawn => {
      pawn.isHighlight = false;
    });
    this.pawns.forEach(pion => {
      pion.isDisabled = true;
    });
    if (winningPawns && winningPawns.length > 0) {
      winningPawns.forEach(pion => {
        pion.isWinner = true;
      });
      if (winningPawns[0].team == 'red') {
        this.setMessage("Les rouges ont gagnés");
      } else {
        this.setMessage("Les jaunes ont gagnés");
      }
    } else {
      this.setMessage("Match nul !");
    }
  }

  isPlayState() {
    return (this.state == 'play');
  }

  isRobotState() {
    return (this.state == 'robot');
  }

  isDefaultState() {
    return (this.state == '');
  }

  selectPane(message: 'play' | 'robot') {
    this.playMessage = 'Jouer';
    this.progress = false;
    if (message == 'play') {
      this.setMessage("Jouer");
    } else {
      this.setMessage("Robot Vs. Robot");
    }
    this.state = message;
  }

  /**
   * Evenement lors du clique sur le bouton Jouer ou Reprendre
   */
  start() {
    this.progress = true;
    if (this.isPlayState()) {
      this.startNewGame();
    } else if (this.isRobotState()) {
      this.startARobotGame();
    }
  }

  isGameIsStarted(): boolean {
    let verify: boolean = false;
    this.pawns.forEach(pawn => {
      if (pawn.team) {
        verify = true;
      }
    });
    return verify;
  }

  stop() {
    if (this.isPlayState()) {
      if (this.isGameIsStarted()) {
        this.playMessage = 'Reprendre';
      }
      this.progress = false;
      this.pawns.forEach(pawn => {
        pawn.isDisabled = true;
        pawn.isHighlight = false;
      });
      this.setMessage("");
    } else {
      if (this.isGameIsStarted()) {
        this.playMessage = 'Reprendre';
      }
      this.progress = false;
      this.pawns.forEach(pawn => {
        pawn.isDisabled = true;
        pawn.isHighlight = false;
      });
      this.setMessage("");
    }

  }

  reset() {
    if (this.isPlayState()) {
      this.myTurn.set(true);
      this.setMessage("Jouer");
      this.resetGame();
    } else if (this.isRobotState()) {
      this.stopRobotGame().then(() => {
        this.resetGame();
        this.setMessage("Robot Vs. Robot");
        this.startARobotGame();
      })
    }
  }

  async stopRobotGame() {
    this.progress = false;
    console.log("sleep 1")
    await this.sleep(100);
    console.log("sleep 2")
    this.progress = true;
  }

  retour() {
    this.disableGame();
    this.state = '';
    this.setMessage("");
    this.myTurn.set(false);
  }

  parametres() {
    const dialogRef = this.dialog.open(ParametersComponent, {
      data: {speed: this.speed/1000},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.speed = result*1000;
      }
    });
  }



  /**
   * Lance une partie de robots
   */
  startARobotGame() {
    this.setMessage("Robot Vs. Robot");
    this.state = 'robot';
    if (!this.isGameIsStarted()) {
      this.resetGame();
    } else {
      this.pawns.forEach(pion => {
        pion.isDisabled = false;
      });
    }
    this.myTurn.set(false);
    // On choisis une équipe qui commence aléatoirement
    const color = Utils.getRandomTeam();
    // On lance la partie
    this.robotVsRobotManager(color);
  }

  /**
   * Place toutes les 0.3 secondes un pion aléatoire
   * @param color Equipe
   */
  async robotVsRobotManager(team: 'red'|'yellow'): Promise<void> {
    console.log("(1) robot vs robot ! ", "state:", this.state, "progress:", this.progress)
    if (this.state == '' || !this.progress) {
      return;
    }
    await this.structuredSleep(this.speed);
    console.log("(2) robot vs robot ! ", "state:", this.state, "progress:", this.progress)
    if (this.state == '' || !this.progress) {
      return;
    }
    const isWinner = this.checksIfThereAreWiningPawns(this.getPawnsOfTeam(Utils.getOpposingTeam(team)));
    if (isWinner) {
      this.setWinner(isWinner);
    } else {
      this.playBotMove(team);
      this.robotVsRobotManager(Utils.getOpposingTeam(team))
    }
  }

  async structuredSleep(ms: number): Promise<void> {
    const timer = (ms > 50) ? 50 : ms;
    for (let index = 0; index < ms; index += 50) {
      if (this.state != '' && this.progress) {
        await this.sleep(timer);
      }
    }
  }

  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Joue et place un pion
   * @param team Equipe correspondante au pion
   */
  playBotMove(team: 'red' | 'yellow'): void {
    // On récupère la liste des colonnes qui n'ont pas leurs colonnes complétés.
    const playablePawns: PawnComponent[] = this.getNonEmptyColumns();
    // Définit un pion à jouer choisit aléatoirement
    let choosedPawn: PawnComponent = Utils.getRandomObject(playablePawns);
    // Si un pion donne la victoire, on modifie le pion choisit aléatoirement
    // avec celui qui donne la victoire
    playablePawns.forEach(pawn => {
      if (this.checksIfThisPawnGivesVictory(pawn, team) || this.checksIfThisPawnGivesVictory(pawn, Utils.getOpposingTeam(team))) {
        choosedPawn = pawn;
      }
    });
    if (!playablePawns || playablePawns.length === 0) {
      this.setWinner(null);
    } else {
      const audio: HTMLAudioElement = new Audio('assets/audio/pop.mp4');
      audio.play();
      choosedPawn.team = team;
      const winningPawns = this.checksIfThereAreWiningPawns(this.getPawnsOfTeam(team));
      if (winningPawns) {
        this.setWinner(winningPawns);
      } else if (this.state == 'play') {
        this.myTurn.set(true);
      }
    }
    const highlightedPawns: PawnComponent[] = this.getHighlightedPawns();
    if (highlightedPawns && highlightedPawns.length > 0) {
      highlightedPawns[0].onMouseEnter();
    }
  }
}
