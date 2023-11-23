let playerError = 5

function lifeSystem(touch, recovery) {
    if ((touch != null)) {
        if(DEBUGMODE){
            // console.log("Touch :" + touch, " | Error :" + playerError, " | Recovery ? " + recovery, " | Game end ? " + gameEnd)
        }
        if (touch === playerError && !recovery) {
            gameEnd = true
            playerError = 0
        } else if (recovery) {
            playerError = 5
            TouchOrNot.Error = 0;
        }
    }
}
