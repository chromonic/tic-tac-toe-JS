const prt = require("prompt-sync")();

let lBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let dLegalChars = {
  'X': 'Player1',
  'O': 'Player2'
};

const getInput = (cPlayerCharacter) => {
  let coords = prt( dLegalChars[cPlayerCharacter] + "'s turn -> ");
  coords = coords.split(" ");
  coords[0] = parseInt(coords[0]);
  coords[1] = parseInt(coords[1]);

  if (lBoard[coords[1]][coords[0]] == '') {
    lBoard[coords[1]][coords[0]] = cPlayerCharacter; 
  }
  else {
    console.log("Invalid coords.");
    getInput(cPlayerCharacter);
  }
};

const checkWinner = (cPlayerCharacter, lBoard) => {
  bResult = false;
  const allSameCheck = arr => arr.every(v => v === cPlayerCharacter);
  // horizontal checking
  for (let verticalIterator = 0; verticalIterator < 3; verticalIterator++) {
    // check if every list item is the same
    if (allSameCheck(lBoard[verticalIterator])) {
      bResult = true;
      break;
    }
  }

  // vertical checking
  for (let horizontalIterator = 0; horizontalIterator < 3; horizontalIterator++) {
    let tmpArr = [];
    for (let verticalIterator = 0; verticalIterator < 3; verticalIterator++) {
      tmpArr.push(lBoard[verticalIterator][horizontalIterator]);
    }
    if (allSameCheck(tmpArr)) {
      bResult = true;
      break;
    }
  }

  // diagonal checking
  // from left to right
  const diagonalChecking_LeftToRight = () => {
    let tmpArr = [];
    for (let diagonalIterator = 0; diagonalIterator < 3; diagonalIterator++) {
      tmpArr.push(lBoard[diagonalIterator][diagonalIterator]);
    }
    return allSameCheck(tmpArr)  
  };
  const diagonalChecking_RightToLeft = () => {
    let tmpArr = [];
    for (let diagonalIterator = 2; diagonalIterator > -1; diagonalIterator--) {
      tmpArr.push(lBoard[diagonalIterator][diagonalIterator]);
    }
    return allSameCheck(tmpArr);
  };
  
  bResult = diagonalChecking_LeftToRight() ? true : diagonalChecking_RightToLeft();

  return bResult;
};

let cPlayerCharacter = 'X';

let bGameOver = false;
while (!bGameOver) { 
  console.table(lBoard);
  getInput(cPlayerCharacter);
  if (cPlayerCharacter == 'X') {cPlayerCharacter = 'O';}
  else {cPlayerCharacter = 'X';}

  bGameOver = checkWinner(cPlayerCharacter, lBoard)
}
console.log("-- "+ cPlayerCharacter + " has won the game. --");
