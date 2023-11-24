let playerLife = 6

function lifeSystem(touch, recovery) {
    if (touch != null) {
        console.log("in life system")
        if (touch === playerLife && !recovery) {
            gameEnd = true
            playerLife = 0
        } else if (!touch & recovery) {
            playerLife = 6
            TouchOrNot.Error = 0;
        }
    }
}

const showLifeOfPlayer = () => {
    let lifePlayer = playerLife - TouchOrNot.Error
    let rectWidth = 20;
    let rectHeight = 20;
    let spacing = 20;

    for (let i = 0; i < lifePlayer; i++) {
        let xPos = i * (rectWidth + spacing);
        let yPos = 20;

        fill(255, 0, 0)
        rect(xPos, yPos, rectWidth, rectHeight);
    }
}