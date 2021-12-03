<?php

require_once (__DIR__ . '/../config/config.php');
require_once (__DIR__ . '/../classes/Game.php');

try {
    $game = new Game();
    $game->setTemplateInk(PATH_TO_TEMPLATES . '/skeleton.php');

    if (isset($_GET['tailleVerticale'], $_GET['tailleHorizontale'])) {
        $game->setCase($_GET['tailleHorizontale'], $_GET['tailleVerticale']);
    } else {
        $game->setCase(7, 5);
    }
    require($game->getTemplateInk());

} catch (Exception $ex) {
    echo($ex->getMessage());
}