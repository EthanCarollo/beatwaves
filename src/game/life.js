function lifeSystem(touch, recovery) {
    let error = 5
    if ((touch != null)) {
        if(DEBUGMODE){
            console.log(touch, error, recovery, gameEnd)
        }
        if (touch === error && !recovery) {
            gameEnd = true
        } else if (recovery) {
            error = 0
            recovery = false
        }
    }
}