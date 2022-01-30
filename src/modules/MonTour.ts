export class MonTour {
  private monTour: boolean = false;
  set(monTour: boolean) {
    this.monTour = monTour
  }
  get() {
    return this.monTour
  }
}