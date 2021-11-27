export class Jeton {

  private positionHorizontale: number;
  private positionVerticale: number;

  constructor(positionHorizontale: number, positionVerticale: number) {
    this.positionHorizontale = positionHorizontale;
    this.positionVerticale   = positionVerticale;
  }

  public getPosition(): number[] {
    return [this.positionHorizontale, this.positionVerticale]
  }

  public getPositionHorizontale(): number {
    return this.positionHorizontale;
  }

  public getPositionVerticale(): number {
    return this.positionVerticale;
  }

  public aPositionEgale(jeton: Jeton): boolean {
    return (this.getPositionHorizontale() == jeton.getPositionHorizontale() && this.getPositionVerticale() == jeton.getPositionVerticale());
  }
  
}