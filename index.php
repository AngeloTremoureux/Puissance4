<?php

require('game.php');

if (isset($_GET['x'], $_GET['y']))
{

	try {
		$game = new game('templates/tplIndex.php');
		$game->setCase($_GET['x'],$_GET['y']);
		require($game->getTemplate());

		print("X:" . $game->getNbCase('x') . "<br/>");
		print("Y:" . $game->getNbCase('y'));

	}
	catch (Exception $ex)
	{
		print($ex->getMessage());
	}
}
?>