let keyOnMap = []
let keyWidth = 40
let keyHeight = 40
let keySpeed = 1
let centerOfMap;

// Function called on every resize of the window & at the start of the game
const initializeCenterOfWindow = () => {
    centerOfMap = new createVector(width/2, height/2)
}

// Function called every frames to show the key on map
const showKeyOnMap = () =>{
    fill(255,255,255)
    for(key of keyOnMap){
        rect(key.position.x - keyWidth / 2, key.position.y - keyHeight / 2, 20, 20)
    }
}

// Function called every frame if we need to moove the key on map
const mooveKeyOnMap = () => {
    for(key of keyOnMap){
        // Every key is necessary going to the center of the map
        mooveKeyTo(key, centerOfMap) 
    }
}

/**
 * moove the coordonate of key to another coord
 * @param {object} key the key from getRandomKey for example
 * @param {p5.vector} destination a simple p5 vector for the destination
 */
const mooveKeyTo = (key, destination) => {
    key.position.lerp(destination, keySpeed/15)
}

// This function will just return a random key actually
const getRandomKey = () => {
    // This will generate a random position for the key actually
    let isHorizontal = getRandomBool()
    let xPosition = isHorizontal ? getRandomInt(width) : (getRandomBool() ? width : 0)
    let yPosition = isHorizontal ? (getRandomBool() ? height : 0) : getRandomInt(height)
    return {
        position : createVector(xPosition,yPosition)
    }
}