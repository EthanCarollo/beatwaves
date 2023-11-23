let playerError = 9000

function lifeSystem(touch, recovery) {
    if ((touch != null) && touch.isVisible === true) {
        if(DEBUGMODE){
            // console.log("Touch :" + touch, " | Error :" + playerError, " | Recovery ? " + recovery, " | Game end ? " + gameEnd)
        }
        if (touch === playerError && !recovery) {
            gameEnd = true
        } else if (recovery) {
            playerError = 5
            TouchOrNot.Error = 0;
        }
    }
}

const showLifeOfPlayer = () =>{
    let lifePlayer = playerError - TouchOrNot.Error
    let rectWidth = 20;
    let rectHeight = 20;
    let spacing = 20;

    for (let i = 0; i < lifePlayer; i++) {
        let xPos = i * (rectWidth + spacing); 
        let yPos = 20;

        fill(255,0,0)
        rect(xPos, yPos, rectWidth, rectHeight);
    }
}