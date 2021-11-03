function ajouteUnPionDansBdd(px, py, color) {
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

function playGame () {
  game.playGame()
}

function lanceUnePartieDeRobots() {
  const robotManager = RobotManager.getRobotManager(game)
  robotManager.lanceUnePartieDeRobots()
}

function openParam () {
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

function loadParam () {
  window.location.replace(
    '?x=' + $('#nbCaseX').val() + '&y=' + $('#nbCaseY').val()
  )
}
