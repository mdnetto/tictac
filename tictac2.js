// why is newCard() called twice on line 11 and 41
// why does it not redraw properly when line 41 is commented out

window.onload = initAll;
var usedWords = new Array(buzzwords.length);

function initAll() {
  if (document.getElementById) {
    document.getElementById("reload").onclick = anotherCard;
    newCard();
  } else {
    alert("Sorry your browser does not support this script");
  }
}

function newCard() {
    for(var i=0; i<24; i++) {
      setSquare(i);
    }
}

function setSquare(thisSquare) {
  // prevents dupe words being set and says if usedWords[0] is true
  // it's a taken so pick another word
  do {
    var randomWord = Math.floor(Math.random() * buzzwords.length);
  } while (usedWords[randomWord]);

  usedWords[randomWord] = true;
  var currentSquare = "square" + thisSquare;
  document.getElementById(currentSquare).innerHTML = buzzwords[randomWord];
  document.getElementById(currentSquare).className = "";
  document.getElementById(currentSquare).onmousedown = toggleColor;
}

//this function keeps track of which words have been selected
//resets them to false when anotherCard is requested
function anotherCard() {
  for (var i=1; i < buzzwords.length; i++) {
    usedWords[i] = false;
  }
  newCard();
  return false;
}

function toggleColor(evt) {
  if (evt) {
    var thisSquare = evt.target;
  } else {
    //for IE, because it sucks
    var thisSquare = window.event.srcElement;
  }
  if (thisSquare.className == '') {
   thisSquare.className = 'pickedBG';
  } else {
    thisSquare.className = '';
  }
  checkWin();
}

function checkWin() {
  var winningOption = -1;
  var setSquares = 0;
  var winners = new Array(31,992,15360,507904,541729,557328,1083458,2162820,4329736,8519745,8659472,16252928);

  for (var i=0; i<24; i++) {
    var currentSquare = "square" + i;
    if (document.getElementById( currentSquare).className != "") {
      document.getElementById( currentSquare).className = "pickedBG";
      setSquares = setSquares | Math.pow( 2, i);
    }
  }

  for (var i = 0; i < winners.length; i++) {
    if (( winners[i] & setSquares) == winners[i]) {
      winningOption = i;
    }
  }

  if (winningOption > -1) {
    for (var i = 0; i < 24; i++) {
      if (winners[winningOption] & Math.pow(2, i)) {
        currentSquare = "square" + i;
        document.getElementById(currentSquare).className = "winningBG";
      }
    }
  }
}
