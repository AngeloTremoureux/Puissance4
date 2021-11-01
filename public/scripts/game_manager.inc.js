function searchPiece (name, initCase) {
  const redCircle = $('#preview #red_circle')
  const yellowCircle = $('#preview #yellow_circle')
  const defaultCircle = $('#preview #basic_circle')
  if (initCase) {
    if (name === 'red') {
      $(redCircle).children().children().attr('case', initCase)
      return $(redCircle).html()
    } else if (name === 'yellow') {
      $(yellowCircle).children().children().attr('case', initCase)
      return $(yellowCircle).html()
    } else {
      $(defaultCircle).children().children().attr('case', initCase)
      return $(defaultCircle).html()
    }
  } else {
    if (name === 'red') {
      return $(redCircle).html()
    } else if (name === 'yellow') {
      return $(yellowCircle).html()
    } else {
      return $(defaultCircle).html()
    }
  }
}

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

function clearGame () {
  $('.row').remove()
}

function playGame () {
  resetGame()
  game.setMessage("A toi de jouer !")
  game.enable()
}

function resetGame () {
  const Px = game.getPx()
  const Py = game.getPy()
  clearGame()
  jeton.clear()
  game.createBackground()
  game.disable()
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
