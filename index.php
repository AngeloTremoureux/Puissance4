<?php

try {
    require('game.php');
    if (isset($_GET['x'], $_GET['y']))
    {
        $game = new game('templates/tplIndex.php');
        $game->setCase($_GET['x'],$_GET['y']);
        require($game->getTemplate());

        print("X:" . $game->getNbCase('x') . "<br/>");
        print("Y:" . $game->getNbCase('y'));

    }
    else
    {
        throw new Exception('Aucun paramètres définies');
    }
} catch (Exception $ex) {
    print($ex->getMessage());
}

?>