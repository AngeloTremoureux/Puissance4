var monTour =
  monTour ||
  (function () {
    var monTour;
    return {
      set: function (boolMonTour) {
        this.monTour = boolMonTour;
      },
      get: function () {
        return this.monTour;
      },
    };
  })();