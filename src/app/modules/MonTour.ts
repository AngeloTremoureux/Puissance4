export class MonTour {

  private monTour: boolean;

  constructor(monTour: boolean) {
    this.monTour = monTour;
  }

  set(monTour: boolean) {
    this.monTour = monTour
  }

  get() {
    return this.monTour
  }
}
