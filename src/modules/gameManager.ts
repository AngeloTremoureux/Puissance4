import { Game } from "./Game"
import { RobotManager } from "./RobotManager";

export function ajouteUnPionDansBdd(px: number, py: number, color: string) {
  let gameId = 4;
  $.post("/api/pions/setList/", {
    id: gameId,
    Px: px,
    Py: py,
    Color: color
  })
    .done(function (data) {
    });
}

export function playGame() {
  Game.getGame().playGame()
}

export function lanceUnePartieDeRobots() {
  const robotManager = RobotManager.getRobotManager(Game.getGame())
  robotManager.lanceUnePartieDeRobots()
}

export function openParam() {
  $('#dialog').removeClass('d-none');
  (<any>$("#dialog")).dialog({
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    buttons: {
      "Valider": function () {
        $("#parametersValues").submit();
        (<any>$(this)).dialog("close")
      },
      "Export": function () {
        (<any>$(this)).dialog("close")
        Game.getGame().export()
      },
      "Fermer": function () {
        (<any>$(this)).dialog("close")
      }
    }
  })
}

export function loadParam() {
  window.location.replace(
    '?x=' + $('#nbCaseX').val() + '&y=' + $('#nbCaseY').val()
  )
}
