jQuery(document).ready(function ($) {
    $("html").keydown(function () {
      let canPlay = game.monTour.get();
      if (canPlay) {
        let key = event.keyCode;
        if ($("#game .row .icon[surbrillance='red']").length) {
          let id = $("#game .row .icon[surbrillance='red']").attr("case");
          let caseDuPion = parseInt(id, 10);
          if (caseDuPion) {
            if (key == 39) {
              // flèche droite : simulation à droite
              caseDuPion++;
              while (
                $("#game .row[val='1'] .icon[case='" + caseDuPion + "']").attr(
                  "team"
                )
              ) {
                caseDuPion++;
              }
              if (caseDuPion >= game.getPositionHorizontale() + 1) {
                caseDuPion = 1;
              }
              $("#game .row .icon").getTailleHorizontale();
              $(
                "#game .row[val='1'] .icon[case='" + caseDuPion + "']"
              ).mouseover();
            } else if (key == 37) {
              // flèche gauche : simulation à gauche
              caseDuPion--;
              while (
                $("#game .row[val='1'] .icon[case='" + caseDuPion + "']").attr(
                  "team"
                )
              ) {
                caseDuPion--;
              }
              if (caseDuPion <= 0) {
                caseDuPion = game.getTailleHorizontale();
              }
              $("#game .row .icon").mouseout();
              $(
                "#game .row[val='1'] .icon[case='" + caseDuPion + "']"
              ).mouseover();
            } else if (key == 13 || key == 38) {
              // touche entré ou flèche haut : simulation d'un click
              $("#game .row .icon[surbrillance='red']").click();
            }
          }
        } else {
          $("#game .row .icon").mouseout();
          $("#game .row[val='1'] .icon[case='1']").mouseover();
        }
      }
    });
    $("#box").on('click', '#game .icon', function() {
      if (game.monTour.get()) {
        const positionHorizontale = game.getPositionHorizontale($(this))
        game.addPion(positionHorizontale);
        game.select(positionHorizontale);
      }
    })
    $("#box").on('mouseover', '#game .icon', function() {
      if (game.monTour.get()) {
        game.select(game.getPositionHorizontale($(this)));
      }
    })
    $("#box").on('mouseout', '#game .icon', function() {
      if (game.monTour.get()) {
        game.unSelect();
      }
    })
  });