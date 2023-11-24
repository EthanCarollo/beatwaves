let playerLife = 5

function lifeSystem(touch, recovery) {
    if (touch != null) {
        console.log("in life system")
        if (touch === playerLife && !recovery) {
            gameEnd = true
            playerLife = 0
        } else if (touch & recovery) {
            playerLife = 5
            TouchOrNot.Error = 0;
        }
    }
}

const showLifeOfPlayer = () => {
    let lifePlayer = (playerLife) - TouchOrNot.Error
    let rectWidth = 80;
    let rectHeight = 80;
    let spacing = 0;
    let lifeImage = {
        "heart": Assets.get("IMAGES").data[6].img,
        "lastheart": Assets.get("IMAGES").data[7].img
    }

    for (let i = 0; i < lifePlayer; i++) {
        let xPos = i * (rectWidth + spacing);
        let yPos = 20;

        if(lifePlayer === 1) {
            image(lifeImage.lastheart, xPos, yPos, rectWidth, rectHeight);
        }else{
            image(lifeImage.heart, xPos, yPos, rectWidth, rectHeight);
        }
    }
}