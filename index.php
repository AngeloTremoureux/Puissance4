<?php

try {
    require('game.php');
    $game = new game('templates/tplIndex.php');
    if (isset($_GET['x'], $_GET['y'])) {
        $game->setCase($_GET['x'], $_GET['y']);
    } else {
        $game->setCase(7, 5);
        
    }
    require($game->getTemplate());
} catch (Exception $ex) {
    print($ex->getMessage());
}
?>