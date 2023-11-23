function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomBool() {
  return getRandomInt(2) === 1
}



function isInRect(pointX, pointY, squareX, squareY, squareWidth, squareHeight) {
  if (DEBUGMODE) {
    fill(255, 0, 0, 20)
    rect(squareX, squareY, squareWidth, squareHeight)
  }

  return (pointX >= squareX && pointX <= squareX + squareWidth && pointY >= squareY && pointY <= squareY + squareHeight)
}

function addition(value1, value2) {
  return value1 + value2
}