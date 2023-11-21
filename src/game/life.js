let playerError = 5
function lifeSystem(touch, recovery) {
    if ((touch != null)) {
        if(DEBUGMODE){
            console.log("Touch :" + touch, " | Error :" + playerError, " | Recovery ? " + recovery, " | Game end ? " + gameEnd)
        }
        if (touch === playerError && !recovery) {
            gameEnd = true
        } else if (recovery) {
            playerError = 0
            recovery = false
        }
    }
}