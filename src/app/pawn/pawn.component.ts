import { Component, Input, OnInit } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { CheckIfWinner } from '../modules/CheckIfWinner';
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
    this.game.addPion(this);
  }

  onMouseEnter() {
    const highlights = this.game.findHighlights();
    highlights.forEach(pawn => {
      pawn.isHighlight = false;
    });
    if (!this.game.monTour.get()) {
      return;
    }
    const pawns: PawnComponent[]|undefined = this.game.findAllByHorizontaleRangeWithoutTeam(this.position.x);
    if (pawns && pawns.length > 0) {
      pawns[pawns.length - 1].isHighlight = true;
    }
  }

  getFillColor(color: string) {
    return color == 'red' ? 'rgb(255, 154, 154)' : 'rgb(255, 248, 175)';
  }

  click() {
    if (!this.game.monTour.get()) {
      return;
    }
    const pawns: PawnComponent[]|undefined = this.game.findAllByHorizontaleRangeWithoutTeam(this.position.x);
    if (pawns && pawns.length > 0) {
      let audio = new Audio('assets/audio/pop.mp4');
      audio.play();
      pawns[pawns.length - 1].team = 'red';
      this.game.monTour.set(false);
      this.onMouseEnter();
    }
    setTimeout(() => {
      this.game.playBotMove('yellow');
    }, Utils.getEntierAleatoire(200, 2000));
  }
}
