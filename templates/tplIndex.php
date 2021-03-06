<!DOCTYPE html>
<html>
<head>
	<title>Puissance 4</title>
	<meta charset="utf-8">
	<script src="https://kit.fontawesome.com/f1e20245fc.js" crossorigin="anonymous"></script>
	<link rel="stylesheet" type="text/css" href="style.css">
	<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
	<script type="text/javascript" src="piece_add.js"></script>
	<script type="text/javascript" src="game_manager.js"></script>
	<script type="text/javascript" src="robot_manager.js"></script>
	<script type="text/javascript" src="match_manager.js"></script>
	<script type="text/javascript" src="isWinner_manager.js"></script>
	<script type="text/javascript" src="isWinner_call.js"></script>
	<script type="text/javascript" src="main.js"></script>
</head>
<body>
	<script type="text/javascript">
		game.init(<?php echo $game->getNbCase('x') . ', ' . $game->getNbCase('y') ?>);
		jQuery(document).ready(function($) {
			game.createBackground();
		});
	</script>
	
	<div id="box">
		<h2>Puissance 4</h2>
		<div id="game">
			<p id="tour">A toi de commencer !</p>
		</div>
		<a href="#" onclick="resetGame();">Relancer</a>
		<a href="#" onclick="clearGame();">Effacer</a>
		<a href="#" onclick="setBot('yellow');">AutoBot</a>
	</div>
	<div id="preview" style="display: none;">
		<!-- red_circle -->
		<div id="red_circle">
			<svg class="icon" viewBox="229.937 99.737 41.192 41.103" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com"> <defs> <radialGradient gradientUnits="userSpaceOnUse" cx="327" cy="246.978" r="91.742" id="gradient-0" spreadMethod="repeat" gradientTransform="matrix(0.218003, 0, 0, 0.218003, 255.713331, 193.153387)"> <stop offset="0" style="stop-color: rgba(255, 0, 0, 1)"/> <stop offset="1" style="stop-color: rgba(153, 0, 0, 1)"/> </radialGradient> </defs> <circle style="stroke-miterlimit: 8; paint-order: fill markers; fill: rgb(255, 154, 154);" cx="250.76" cy="120.36" r="17.46"/> <path d="M 327 247 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0 Z M 327 247 m -16.2 0 a 16.2 16.2 0 0 1 32.4 0 a 16.2 16.2 0 0 1 -32.4 0 Z" style="paint-order: fill; fill: url(#gradient-0); stroke: rgb(0, 0, 0); stroke-linejoin: round; stroke-dashoffset: 35px;" transform="matrix(-0.80291, 0.5961, -0.5961, -0.80291, 660.268085, 123.699843)" bx:shape="ring 327 247 16.2 16.2 20 20 1@4a3258e7"/></svg>
		</div>
		<!-- basic_circle -->
		<div id="basic_circle">
			<svg class="icon" viewBox="229.937 99.737 41.192 41.103" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com"> <circle style="stroke-miterlimit: 8; paint-order: fill markers; fill: rgb(255, 255, 255);" cx="250.76" cy="120.36" r="17.46"/> <path d="M 327 247 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0 Z M 327 247 m -16.2 0 a 16.2 16.2 0 0 1 32.4 0 a 16.2 16.2 0 0 1 -32.4 0 Z" style="paint-order: fill; stroke-linejoin: round; stroke-dashoffset: 35px; stroke: rgb(0, 0, 0); fill: rgb(94, 135, 255);" transform="matrix(-0.80291, 0.5961, -0.5961, -0.80291, 660.268085, 123.699843)" bx:shape="ring 327 247 16.2 16.2 20 20 1@4a3258e7"/></svg>
		</div>
		<!-- yellow_circle -->
		<div id="yellow_circle">
			<svg class="icon" viewBox="229.937 99.737 41.192 41.103" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com"> <circle style="stroke-miterlimit: 8; paint-order: fill markers; fill: rgb(255, 248, 175);" cx="250.76" cy="120.36" r="17.46"/> <path d="M 327 247 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0 Z M 327 247 m -16.2 0 a 16.2 16.2 0 0 1 32.4 0 a 16.2 16.2 0 0 1 -32.4 0 Z" style="paint-order: fill; stroke-linejoin: round; stroke-dashoffset: 35px; stroke: rgb(0, 0, 0); fill: rgb(255, 236, 27);" transform="matrix(-0.80291, 0.5961, -0.5961, -0.80291, 660.268085, 123.699843)" bx:shape="ring 327 247 16.2 16.2 20 20 1@4a3258e7"/></svg>
		</div>
	</div>
</body>
</html>