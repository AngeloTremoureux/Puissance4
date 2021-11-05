
export function ajouteUnPionDansBdd(px, py, color) {
  let gameId = 4;
  $.post("/api/pions/setList/", {
      id: gameId,
      Px:px,
      Py:py,
      Color:color
    })
    .done(function( data ) {
  });
}

export function testsUnits() {
  lanceTestsUnits = new TestsUnits(game);
  lanceTestsUnits.launchTestsUnits()
}

export function playGame (game) {
  console.log(game)
  game.playGame()
}

export function lanceUnePartieDeRobots() {
  const robotManager = RobotManager.getRobotManager(game)
  robotManager.lanceUnePartieDeRobots()
}

export function openParam () {
  $('#dialog').removeClass('d-none')
  $("#dialog").dialog({
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    buttons: {
      "Valider": function() {
        $ ( "#parametersValues" ).submit()
        $( this ).dialog( "close" )
      },
      "Fermer": function() {
        $( this ).dialog( "close" )
      }
    }
  })
}

export function loadParam () {
  window.location.replace(
    '?x=' + $('#nbCaseX').val() + '&y=' + $('#nbCaseY').val()
  )
}
