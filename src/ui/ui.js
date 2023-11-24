let mouseSize = 80;

const showInteractiveButton = (interactiveButton, checkPosition) => {

    if (isInRect(checkPosition.x, checkPosition.y, interactiveButton.position.x, interactiveButton.position.y, interactiveButton.width, interactiveButton.height) && interactiveButton.isReady) {
        console.log("Is lerping in ")
        interactiveButton.loading = lerp(interactiveButton.loading, 100, 0.1)
        if(interactiveButton.loading > 99.9){
            interactiveButton.callback()
            interactiveButton.isReady = false
        }
    } else {
        interactiveButton.loading = lerp(interactiveButton.loading, 0, 0.1)
        if(interactiveButton.loading < 1){
            interactiveButton.isReady = true
        }
    }

    fill(255, interactiveButton.loading*2, 0)
    if(DEBUGMODE){
        rect(interactiveButton.position.x, interactiveButton.position.y, interactiveButton.width, interactiveButton.height)
    }

    if(interactiveButton.loading > 1){
        noStroke()
        fill(255,255,255)
        circle(checkPosition.x, checkPosition.y, mouseSize*interactiveButton.loading/100)
    }
}

const drawMouse = (_position) => {
    fill(255,0,0,0)
    strokeWeight(10)
    stroke(255,255,255)
    circle(_position.x, _position.y, mouseSize)
    fill(255,0,0,255)
}