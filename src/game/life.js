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
