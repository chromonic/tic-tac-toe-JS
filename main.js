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

const checkFullBoard = (lBoard) => {
  let sum = 0;
  for (let verticalIterator = 0; verticalIterator < 3; verticalIterator++) {
    for (let horizontalIterator = 0; horizontalIterator < 3; horizontalIterator++) {
      if (lBoard[verticalIterator][horizontalIterator] != '') {
        sum++;
      }
    }
  }
  return sum;
};

const getInput = (cPlayerCharacter) => {
  let coords = prt( dLegalChars[cPlayerCharacter] + "'s turn -> ");
  coords = coords.split(" ");
  coords[0] = parseInt(coords[0]);
  coords[1] = parseInt(coords[1]);

  if (checkFullBoard(lBoard) == 9) {
    return;
  }

  if (! ( lBoard[coords[1]][coords[0]] == '' ) ) {
    console.log("Invalid coords.");
    getInput(cPlayerCharacter);
  }

  lBoard[coords[1]][coords[0]] = cPlayerCharacter;
};

const checkWinner = (cPlayerCharacter, lBoard) => {
  bResult = false;
  const allSameCheck = arr => arr.every(v => v === cPlayerCharacter);
  // horizontal checking
  for (let verticalIterator = 0; verticalIterator < 3; verticalIterator++) {
    // check if every list item is the same
    bResult = allSameCheck(lBoard[verticalIterator]);
    if ( bResult ) { return bResult; }
  }

  // vertical checking
  for (let horizontalIterator = 0; horizontalIterator < 3; horizontalIterator++) {
    let tmpArr = [];
    for (let verticalIterator = 0; verticalIterator < 3; verticalIterator++) {
      tmpArr.push(lBoard[verticalIterator][horizontalIterator]);
    }
    bResult = allSameCheck(tmpArr);
    if ( bResult ) {return bResult;}
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

  bGameOver = checkFullBoard(lBoard) == 9 ? true : false;

  bGameOver = checkWinner(cPlayerCharacter, lBoard);
}
console.log("-- "+ cPlayerCharacter + " has won the game. --");
