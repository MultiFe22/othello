var gameBoardAux = [[0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7]];
var huPlayer = "b";
var aiPlayer = "w";
var round = 0; 
var turnAux = 0; 
var black = 0; 
var white = 0; 

var mode = 0;

function setUp() { 
  gameBoardAux[3][3] = "w";
  gameBoardAux[3][4] = "b";
  gameBoardAux[4][3] = "b";
  gameBoardAux[4][4] = "w";

  setTimeout(function(){ display(); }, 500); 

  if(turnAux == 1 && mode == 1) {
    compMove();
  }
}

function move(pos) { 
  if(turnAux == 0 && canPlace(gameBoardAux, pos, huPlayer, aiPlayer)) { 
    gameBoardAux = updateBoard(gameBoardAux, pos, huPlayer, aiPlayer); 

    round += 1; 

    if(canMove(gameBoardAux, aiPlayer, huPlayer)) {
      turnAux = 1;
    } else if(canMove(gameBoardAux, huPlayer, aiPlayer)) {
      turnAux = 0;
    } else {
      display();
      setTimeout(function(){ gameOverAux(); }, 1000);
      return; 
    }

  } else if(turnAux == 1 && canPlace(gameBoardAux, pos, aiPlayer, huPlayer)) { 
    gameBoardAux = updateBoard(gameBoardAux, pos, aiPlayer, huPlayer); 

    round += 1; 

    
    if(canMove(gameBoardAux, huPlayer, aiPlayer)) {
      turnAux = 0;
    } else if(canMove(gameBoardAux, aiPlayer, huPlayer)){
      turnAux = 1;
    } else {
      display();
      setTimeout(function(){ gameOverAux(); }, 1000);
      return; 
    }
  }

  if(round == 64) { 
    display();
    setTimeout(function(){ gameOverAux(); }, 1000);
  }

  display(); 
}




function gameOverAux() { 
  alert("game over");
  
  if(black > white) {
    alert("black won");
  } else if(black < white) {
    alert("white won");
  } else if(black == white) {
    alert("tie");
  }
  reset(); 
}

function reset() { 
  gameBoardAux = [[0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7]];
  huPlayer = "b";
  aiPlayer = "w";
  round = 0;
  if(mode == 2) {
    turnAux = 0;
  }
  setUp(); 
}

function getEmpty(b) { 
  var board = clone(b);
  var posArray = [];
  for(var i = 0; i < board.length; i++) {
    for(var j = 0; j < board[i].length; j++) {
      if(board[i][j] !== huPlayer && board[i][j] !== aiPlayer) { 
        posArray.push(i * 8 + j); 
      }
    }
  }
  return posArray; 
}

function canMove(b, player, otherPlayer) { 
  var posMoves = 0;
  var posArray = getEmpty(b); 
  for(var x = 0; x < posArray.length; x++) {
      if(canPlace(b, posArray[x], player, otherPlayer)) { 
        posMoves += 1;
      }
    }


  if(posMoves !== 0) { 
    return true;
  } else { 
    return false;
  }
}

function canPlace(b, pos, player, otherPlayer) { 
  var prevBoard = clone(b);
  var changedBoard = updateBoard(clone(b), pos, player, otherPlayer); 

  var jPos = pos % 8;
  var iPos = Math.floor(pos / 8);
  prevBoard[iPos][jPos] = player; 


  if(checkSame(prevBoard, changedBoard)) { 
    return false;
  } else {
    if(b[iPos][jPos] !== player && b[iPos][jPos] !== otherPlayer) { 
      return true;
    } else {
      return false;
    }

  }

}

function checkSame(array1, array2) { 
  if(array1.length == array2.length) { 
    for(i = 0; i < array1.length; i++) {
      for(j = 0; j < array1[i].length; j++) {
        if(array1[i][j] !== array2[i][j]) { 
          return false;
        }
      }
    }
    return true;
  } else {
    return false;
  }
}


function clone(array) { 
	var newArray = []; 
  for(i = 0; i < array.length; i++) {
  	newArray[i] = [];
    for(j = 0; j < array[i].length; j++) {
    	newArray[i][j] = array[i][j]; 
    }
  }
  return newArray;
}


function updateBoard(b, pos, player, otherPlayer) { 

  var board = clone(b); 

  
  var jPos = pos % 8;
  var iPos = Math.floor(pos / 8);


  board[iPos][jPos] = player;

  var flipArray = []; 
  var tempArray = []; 


  
  
  

  

  
  for(i = 0; i < iPos; i++) { 
    if(board[iPos - i - 1][jPos] == otherPlayer) { 
      tempArray.push([iPos - i - 1, jPos]); 
    } else if(board[iPos - i - 1][jPos] == player) { 
      flipArray = addToArray(tempArray, flipArray); 
      break;
    } else { 
      break;
    }
  }

  

  tempArray = []; 

  for(i = 0; i < 7 - iPos; i++) { 
    if(board[iPos + i + 1][jPos] == otherPlayer) {
      tempArray.push([iPos + i + 1, jPos]);
    } else if(board[iPos + i + 1][jPos] == player) {
      flipArray = addToArray(tempArray, flipArray);
      break;
    } else {
      break;
    }
  }

  

  tempArray = []; 

  
  for(j = 0; j < jPos; j++) { 
    if(board[iPos][jPos - j - 1] == otherPlayer) {
      tempArray.push([iPos, jPos - j - 1]);
    } else if(board[iPos][jPos - j - 1] == player) {
      flipArray = addToArray(tempArray, flipArray);
      break;
    } else {
      break;
    }
  }

  

  tempArray = [];  

  for(j = 0; j < 7 - jPos; j++) { 
    if(board[iPos][jPos + j + 1] == otherPlayer) {
      tempArray.push([iPos, jPos + j + 1]);
    } else if(board[iPos][jPos + j + 1] == player) {
      flipArray = addToArray(tempArray, flipArray);
      break;
    } else {
      break;
    }
  }

  

  

  tempArray = [];  

  var min; 

  
  if(jPos < iPos) {
    min = jPos;
  } else {
    min = iPos;
  }


  for(j = 0; j < min; j++) { 
    if(board[iPos - j - 1][jPos - j - 1] == otherPlayer) {
      tempArray.push([iPos - j - 1, jPos - j - 1]);
    } else if(board[iPos - j - 1][jPos - j - 1] == player) {
      flipArray = addToArray(tempArray, flipArray);
      break;
    } else {
      break;
    }
  }

  

  tempArray = []; 

  var max = 0; 

  

  if(jPos < iPos) { 
    var iTemp = iPos;
    while(iTemp !== 7) {
      max += 1;
      iTemp += 1;
    }
  } else { 
    var jTemp = jPos;
    while(jTemp !== 7) {
      max += 1;
      jTemp += 1;
    }
  }


  for(i = 0; i < max; i++) { 
    if(board[iPos + i + 1][jPos + i + 1] == otherPlayer) {
      tempArray.push([iPos + i + 1, jPos + i + 1]);
    } else if(board[iPos + i + 1][jPos + i + 1] == player) {
      flipArray = addToArray(tempArray, flipArray);
      break;
    } else {
      break;
    }
  }

  

  tempArray = []; 

  var min; 

  
  if(iPos + jPos < 8) {
    min = iPos;
  } else {
    min = 7 - jPos;
  }

  for(j = 0; j < min; j++) { 
    if(board[iPos - j - 1][jPos + j + 1] == otherPlayer) {
      tempArray.push([iPos - j - 1, jPos + j + 1]);
    } else if(board[iPos - j - 1][jPos + j + 1] == player) {
      flipArray = addToArray(tempArray, flipArray);
      break;
    } else {
      break;
    }
  }



  

  tempArray = []; 

  var max = 0; 

  
  if(iPos + jPos < 8) { 
    var jTemp = jPos;
    while(jTemp !== 0) {
      max += 1;
      jTemp -= 1;
    }
  } else { 
    var iTemp = iPos;
    while(iTemp !== 7) {
      max += 1;
      iTemp += 1;
    }
  }

  for(i = 0; i < max; i++) { 
    if(board[iPos + i + 1][jPos - i - 1] == otherPlayer) {
      tempArray.push([iPos + i + 1, jPos - i - 1]);
    } else if(board[iPos + i + 1][jPos - i - 1] == player) {
      flipArray = addToArray(tempArray, flipArray);
      break;
    } else {
      break;
    }
  }

  board = flipValue(flipArray, board); 
  return board;
}

function addToArray(array1, array2) { 
  for(i = 0; i < array1.length; i++) {
    array2.push(array1[i]);
  }
  return array2; 
}


function flipValue(array, board) { 
  for(z = 0; z < array.length; z++) {
    
    var i = array[z][0];
    var j = array[z][1];
    if(board[i][j] == huPlayer) {
      board[i][j] = aiPlayer;
    } else if(board[i][j] == aiPlayer) {
      board[i][j] = huPlayer;
    }
  }
  return board; 
}

function calcScore(b, player) { 
  var board = clone(b);
  var score = 0;
  for(i = 0; i < board.length; i++) {
    for(j = 0; j < board[i].length; j++) {
      if(board[i][j] == aiPlayer) { 
        score += 1; 
      } else if(board[i][j] == huPlayer) { 
        score -= 1; 
      }
    }
  }
  return score;

}

function riskRegions(i, j) { 
  var pos = i * 8 + j;
  
  var r1 = 2;
  var arrayR1 = [18, 19, 20, 21, 26, 27, 28, 29, 34, 35, 36, 37, 42, 43, 44, 45];
  
  var r2 = 3;
  var arrayR2 = [10, 11, 12, 13, 17, 22, 25, 30, 33, 38, 41, 46, 50, 51, 52, 53];
  
  var r3 = 1;
  var arrayR3 = [2, 3, 4, 5, 16, 24, 32, 40, 23, 31, 39, 47, 58, 59, 60, 61];
  
  var r4 = 4;
  var arrayR4 = [1, 8, 9, 6, 14, 15, 48, 49, 57, 54, 55, 62];
  
  var r5 = 0;
  var arrayR5 = [0, 7, 56, 63];

  
  if(inArray(arrayR1, pos)) {
    return r1;
  } else if(inArray(arrayR2, pos)) {
    return r2;
  } else if(inArray(arrayR3, pos)) {
    return r3;
  } else if(inArray(arrayR4, pos)) {
    return r4;
  } else if(inArray(arrayR5, pos)) {
    return r5;
  }

}

function inArray(array, char) { 
  for(var i = 0; i < array.length; i++) {
    if(array[i] == char) {
      return true;
    }
  }
  return false;
}


function potentialSpots(b, player, otherPlayer) { 
  var board = clone(b);
  var posArray = getEmpty(board); 
  var potentialArray = [];
  for(var x = 0; x < posArray.length; x++) {
      if(canPlace(b, posArray[x], player, otherPlayer)) { 
        potentialArray.push(posArray[x]);
      }
    }
  return potentialArray;
}


function minimax(newBoard, player, layer) { 
  
  console.log("minimax");
  var availSpots;
  if(player == aiPlayer) {
    availSpots = potentialSpots(clone(newBoard), aiPlayer, huPlayer);
  } else if(player == huPlayer) {
    availSpots = potentialSpots(clone(newBoard), aiPlayer, huPlayer);
  }


  
  if(layer == 6) { 
    return {score:calcScore(newBoard, player)};
  } else if(availSpots.length == 0) { 
    return {score:calcScore(newBoard, player)};
  }




  var moves = []; 

  for(var i = 0; i < availSpots.length; i++) { 
    var move = {}; 
    move.index = availSpots[i]; 
    move.board = clone(newBoard); 

    
    if(player == huPlayer) {
      move.board = updateBoard(move.board, move.index, huPlayer, aiPlayer);
    } else if(player == aiPlayer) {
      move.board = updateBoard(move.board, move.index, aiPlayer, huPlayer);
    }

    
    if(player == aiPlayer) {
      var result = minimax(move.board, huPlayer, layer + 1); 
      move.score = result.score;
    } else if(player == huPlayer) {
      var result = minimax(move.board, aiPlayer, layer + 1); 
      move.score = result.score;
    }

    moves.push(move); 

  }

  var bestMove = 0; 
  moves = getBestRisk(moves);
  
  
  if(player === aiPlayer){ 
    var bestScore = moves[0].score;
    for(var i = 0; i < moves.length; i++){ 
      if(moves[i].score > bestScore){ 
        bestScore = moves[i].score;
        bestMove = i;
      }
    }

  } else {
  
    var bestScore = moves[0].score;
    for(var i = 0; i < moves.length; i++){ 
      if(moves[i].score < bestScore){ 
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  
  return moves[bestMove];
}

function getBestRisk(moves) {
  var riskArray = [];
  for(var i = 0; i < 5; i++) {
    riskArray.push([]);
  }
  for(var i = 0; i < moves.length; i++) {
    var pos = moves[i].index;
    var jPos = pos % 8;
    var iPos = Math.floor(pos / 8);
    var index = riskRegions(iPos, jPos);
    riskArray[index].push(moves[i]);
  }

  for(var i = 0; i < riskArray.length; i++) {
    if(riskArray[i].length !== 0) {
      return riskArray[i];
    }
  }
}
