function setMatch(Match, Px, Py, Color) {

	switch (Match) {
		case 2:
			$('#game p#tour').text('Match nul');
			$(".icon[case]").css('opacity', 0.3);
			return 0;
			break;
		case true:
			switch (Color) {
				case 'yellow':
					$('#game p#tour').text('Les Jaunes ont gagnés');
					return 0;
					break;
				default:
					$('#game p#tour').text('Les Rouges ont gagnés');
					return 0;
					break;
			}
			break;
		default:
			switch (Color) {
				case 'red':
					setTimeout(function(){
						RobotVsRobot(Py, Px, 'yellow');
					}, 1);
					break;
				default:
					setTimeout(function(){
						RobotVsRobot(Py, Px, 'red');
					}, 1);
					break;
			}
			break;
	}
}