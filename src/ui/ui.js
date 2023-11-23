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
}