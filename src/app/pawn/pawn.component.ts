import { Component, Input, OnInit } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { Utils } from '../modules/Utils';

interface IPosition {
  x: number,
  y: number
}

@Component({
  selector: 'app-pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.less']
})
export class PawnComponent implements OnInit {

  @Input() position!: IPosition
  @Input() team: string|null = null;
  @Input() game!: GameComponent;

  isHighlight: boolean = false;
  isDisabled: boolean = true;
  isWinner: boolean = false;

  constructor() {  }

  ngOnInit(): void {
    this.game.initializePawn(this);
  }

  /**
   * Met en surbrillance le pion sélectionné jouable
   */
  onMouseEnter(): void {
    const highlights = this.game.getHighlightedPawns();
    highlights.forEach(pawn => {
      pawn.isHighlight = false;
    });
    if (!this.game.myTurn.get()) {
      return;
    }
    const pawns: PawnComponent[]|undefined = this.game.findPawnsWithoutTeamFromColumn(this.position.x);
    if (pawns && pawns.length > 0) {
      pawns[pawns.length - 1].isHighlight = true;
    }
  }

  /**
   * Récupère la couleur de l'arrière plan correspondant à l'équipe du pion
   * @param color Couleur de l'équipe
   * @returns Couleur au format RGB à appliquer
   */
  getFillColor(color: string): string {
    return color == 'red' ? 'rgb(255, 154, 154)' : 'rgb(255, 248, 175)';
  }

  /**
   * Joue un pion
   */
  click(): void {
    const pawns: PawnComponent[]|undefined = this.game.findPawnsWithoutTeamFromColumn(this.position.x);
    if (this.game.myTurn.get() && pawns && pawns.length > 0) {
      this.game.myTurn.set(false);
      this.onMouseEnter();
      // Ajoute le pion jouable de la colonne
      const lowestPawn: PawnComponent = pawns[pawns.length - 1];
      lowestPawn.team = 'red';
      const audio: HTMLAudioElement = new Audio('assets/audio/pop.mp4');
      audio.play();
      // Vérifie si ce pion donne la victoire ou le match nul
      const isWinner: PawnComponent[] | false = (pawns.length === 1 && lowestPawn.position.y === 1) ? [] : this.game.checksIfThereAreWiningPawns(this.game.getPawnsOfTeam("red"));
      if (isWinner) {
        this.game.setWinner(isWinner);
      } else {
        setTimeout(() => {
          this.game.playBotMove('yellow');
        }, Utils.getRandomInt(200, 600));
      }
    }
  }
}
