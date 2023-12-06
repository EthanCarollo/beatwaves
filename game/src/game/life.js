let playerLife = 5

function lifeSystem(recovery) {
    if(recovery === true){
        if(playerLife < 5){
            playerLife++
        }
    }else{
        if(playerLife > 0){
            playerLife--
        }
    }
}

const showLifeOfPlayer = () => {
    let lifePlayer = playerLife
    let rectWidth = 40;
    let rectHeight = 40;
    let spacing = 35;
    let lifeImage = {
        "heart": Assets.get("IMAGES").data[8].img,
        "lastheart": Assets.get("IMAGES").data[9].img
    }

    for (let i = 0; i < lifePlayer; i++) {
        let xPos = i * (rectWidth + spacing) + spacing;
        let yPos = spacing;

        if(lifePlayer === 1) {
            image(lifeImage.lastheart, xPos, yPos, rectWidth, rectHeight);
        }else{
            image(lifeImage.heart, xPos, yPos, rectWidth, rectHeight);
        }
    }
}