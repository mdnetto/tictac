window.onload = initAll;

function initAll() {
		if (document.getElementById) {
				startTicTac();
		}
}

function startTicTac() {
		for(var i=1; i<=9; i++){
				document.getElementById(i).className = '';
				document.getElementById(i).innerHTML = '&nbsp';
				document.getElementById(i).onmousedown = setSquare;
		}
}

function setSquare(e) {
		if (e) {
				var thisSquare = e.target;
		}		

		if (thisSquare.className == '') {
				thisSquare.innerHTML = 'x';
		} else {
				thisSquare.className = '';
		}

		xIsWinner = checkWin();

	console.log(xIsWinner);
		if (xIsWinner == false) {
				computerSetSquare;
		}
		
}

function computerSetSquare() {
		var freeSquares = [];
		
		for (var i=1; i<=9; i++) {
				if (document.getElementById(i).innerHTML = '') {
						freeSquares.push(i);	
				}
		}

		var rand = freeSquares[Math.floor(Math.random() * freeSquares.length)];
		document.getElementById(rand).innerHTML = 'o';
}


function checkWin() {
		var xArray = [];
		var oArray = [];
		var winners = new Array(
				[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]
		);	
		
		for(var i=1; i<=9; i++) {
				var square = document.getElementById(i).innerHTML;

				if (square == 'x') {
						xArray.push(i);
				} else if (square == '0') {
						oArray.push(i);
				}
		}

		for (var i=0; i<winners.length; i++) {
				xHasWon = winners[i].every(function (val) {
						return xArray.indexOf(val) >= 0;
				});

				oHasWon = winners[i].every(function (val) {
						return oArray.indexOf(val) >= 0;
				});

				if (xHasWon || oHasWon) { 
						var person = '';
						xHasWon ? person = 'You have' : 'The computer has';
						document.getElementById('text').innerHTML = person + ' won!';
						return true;
				} else {
					return false;
				}
		}

}
