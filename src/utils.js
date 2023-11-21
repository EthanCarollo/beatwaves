function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomBool() {
  return getRandomInt(2) === 1
}



function isInRect(pointX, pointY, squareX, squareY, squareSize) {
  if (DEBUGMODE) {
    fill(255, 0, 0, 80)
    rect(squareX, squareY, squareSize)
  }

  return (pointX >= squareX && pointX <= squareX + squareSize && pointY >= squareY && pointY <= squareY + squareSize)
}