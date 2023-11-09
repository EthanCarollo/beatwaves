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
    // Moove or play the key !
    for(key of keyOnMap){
        // Every key is necessary going to the center of the map
        key.position === centerOfMap ? playKey(key) : mooveKeyTo(key, centerOfMap)
    }

    // Second verification where we chech if a key has been played or no
    // ? If we wan't to save some statistics, we can do it here !
    for (let i = 0; i < keyOnMap.length; i++) {
        (keyOnMap[i].isPlayed === true) ? keyOnMap.splice(i,1):null;
    }
}

/**
 * moove the coordonate of key to another coord
 * @param {object} key the key from getRandomKey for example
 * @param {p5.vector} destination a simple p5 vector for the destination
 */
const mooveKeyTo = (key, destination) => {
    (Math.abs(key.position.x - destination.x) < 0.1 && Math.abs(key.position.y - destination.y) < 0.1) 
    ? key.position = centerOfMap
    : key.position.lerp(destination, keySpeed/15)
}

/**
 * Play a note normally, take the key and woopala
 * @param {object} key 
 */
const playKey = (key) => {
    if(DEBUGMODE === true)
        console.log("/-- Key has been played --/")
    // ! Temporary use 8n for the vel, it is just for debugging actually because i didn't
    // ! find any other solutions
    key.instr.triggerAttackRelease(key.note, "8n");
    key.isPlayed = true;
}

/**
 * This function will just return a random key actually
 * @param {string} note a string like C5, C#5, F5,...
 * @param {float} velocity the velocity of the key
 * @param {Instrument} instrument an instrument from tone js used for the key
 * @returns {object} return a key object
 */
const getRandomKey = (note, velocity, instrument = classicSynth) => {
    // This will generate a random position for the key actually
    let isHorizontal = getRandomBool()
    let xPosition = isHorizontal ? getRandomInt(width) : (getRandomBool() ? width : 0)
    let yPosition = isHorizontal ? (getRandomBool() ? height : 0) : getRandomInt(height)
    return {
        position : createVector(xPosition,yPosition), // Position on map of the note
        note: note, // The note of... the note..
        vel: velocity, // The velocity of the note
        isPlayed: false, // If the note is played or no
        instr : instrument, // The instrument of the note
    }
}