jQuery(document).ready(function ($) {
    $("html").on("keydown", "body", function (e) {
      if (game.monTour.get()) {
        const key = event.keyCode;
        if ($("#game .row .icon[surbrillance='red']").length >= 1 && !game.isDraw()) {
          const pionEnSurbrillance = $("#game .row .icon[surbrillance='red']");
          let indexHorizontaleDuPion = parseInt(pionEnSurbrillance.attr("case"));
          if (indexHorizontaleDuPion) {
            $("#game .row .icon").mouseout();
            if (key == 39) {
              // flèche droite : simulation à droite
              indexHorizontaleDuPion++;
              if (indexHorizontaleDuPion >= game.getTailleHorizontale() + 1) {
                indexHorizontaleDuPion = 1;
              }
              while (!game.getLesColonnesNonCompletes().includes(indexHorizontaleDuPion) && !game.isDraw() && indexHorizontaleDuPion <= game.getTailleHorizontale()) {
                indexHorizontaleDuPion++;
                if (indexHorizontaleDuPion >= game.getTailleHorizontale() + 1) {
                  indexHorizontaleDuPion = 1;
                }
              }
              
              $("#game .row[val='1'] .icon[case='" + indexHorizontaleDuPion + "']").mouseover();
            } else if (key == 37) {
              // flèche gauche : simulation à gauche
              indexHorizontaleDuPion--;
              if (indexHorizontaleDuPion <= 0) {
                indexHorizontaleDuPion = game.getTailleHorizontale();
              }
              console.log(indexHorizontaleDuPion)
              while (!game.getLesColonnesNonCompletes().includes(indexHorizontaleDuPion) && !game.isDraw() && indexHorizontaleDuPion >= 0) {
                indexHorizontaleDuPion--;
                if (indexHorizontaleDuPion <= 0) {
                  indexHorizontaleDuPion = game.getTailleHorizontale();
                }
              }
              console.log(indexHorizontaleDuPion)
              $( "#game .row[val='1'] .icon[case='" + indexHorizontaleDuPion + "']").mouseover();
            } else if (key == 13 || key == 38) {
              // touche entré ou flèche haut : simulation d'un click
              $(pionEnSurbrillance).click();
              if (!game.getLesColonnesNonCompletes().includes(indexHorizontaleDuPion)) {
                indexHorizontaleDuPion++
                if (indexHorizontaleDuPion >= game.getTailleHorizontale() + 1) {
                  indexHorizontaleDuPion = 1;
                }
                while (!game.getLesColonnesNonCompletes().includes(indexHorizontaleDuPion) && !game.isDraw() && indexHorizontaleDuPion <= game.getTailleHorizontale()) {
                  indexHorizontaleDuPion++;
                }
                $("#game .row[val='1'] .icon[case='" + indexHorizontaleDuPion + "']").mouseover();
              }
            }
          }
        } else {
          $("#game .row .icon").mouseout();
          indexHorizontaleDuPion = 1;
          while (!game.getLesColonnesNonCompletes().includes(indexHorizontaleDuPion) && !game.isDraw() && indexHorizontaleDuPion <= game.getTailleHorizontale()) {
            indexHorizontaleDuPion++;
          }
          $("#game .row[val='1'] .icon[case='" + indexHorizontaleDuPion + "']").mouseover();
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