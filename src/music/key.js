let keyOnMap = []
let keyWidth = 40
let keyHeight = 40
let keySpeed = 180
let centerOfMap;
let TouchOrNot = {
    "Touch":0,
    "Miss":0,
    "Error":0
}



// Function called on every resize of the window & at the start of the game
const initializeCenterOfWindow = () => {
    centerOfMap = new createVector(width / 2, height / 2)
}

let sizeKey = 80
// Function called every frames to show the key on map
const showKeyOnMap = () => {
    for (key of keyOnMap) {
        if(key.isVisible === true){
            if (key.isClean === true) {
                image(Assets.get("IMAGES").data[6].img, key.position.x - keyWidth / 2, key.position.y - keyHeight / 2, sizeKey, sizeKey)
            } else {
                image(Assets.get("IMAGES").data[7].img, key.position.x - keyWidth / 2, key.position.y - keyHeight / 2, sizeKey, sizeKey)
            }
        }else{
            if(DEBUGMODE === true){
                fill(0,0,255) // The fake key used for play music in background is blue
                rect(key.position.x - keyWidth / 2, key.position.y - keyHeight / 2, sizeKey, sizeKey);
            }
        }
    }
}

// Function called every frame if we need to moove the key on map
const mooveKeyOnMap = () => {
    // Moove or play the key !
    for (key of keyOnMap) {
        // Every key is necessary going to the center of the map
        key.position === centerOfMap ? playKey(key) : mooveKeyTo(key, centerOfMap)
    }

    // Second verification where we chech if a key has been played or no
    // ? If we wan't to save some statistics, we can do it here !
    for (let i = 0; i < keyOnMap.length; i++) {
        (keyOnMap[i].isPlayed === true) ? keyOnMap.splice(i, 1) : null;
    }
}

/**
 * moove the coordonate of key to another coord
 * @param {object} key the key from getRandomKey for example
 * @param {p5.vector} destination a simple p5 vector for the destination
 */
const mooveKeyTo = (key, destination) => {
    if(key.speedX === null || key.speedY === null){
        key.speedX = -((key.position.x - destination.x) / keySpeed )
        key.speedY = -((key.position.y - destination.y) / keySpeed )
    }

    if(Math.abs(key.position.x - destination.x) < 0.1 && Math.abs(key.position.y - destination.y) < 0.1) {
        key.position = centerOfMap
    }else{
        key.position.x += key.speedX
        key.position.y += key.speedY
    }
}

/**
 * Play a note normally, take the key and woopala
 * @param {object} key 
 */
const playKey = (key) => {
    if (DEBUGMODE === true){
        console.log("/-- Key has been played --/")
    }
    
    if(key.isVisible === true){
        if (key.isClean === true){
            TouchOrNot.Touch++
            lifeSystem(TouchOrNot.Error, true)
        } else if(!key.isClean){
            TouchOrNot.Miss++
            TouchOrNot.Error++
            lifeSystem(TouchOrNot.Error, false)
        }
    }
    

    if(key.isVisible === false){
        key.instr.triggerAttackRelease(key.note, "+"+key.timeNote, Tone.now(), key.vel);
    }else{
        if(key.isClean){
            key.instr.triggerAttackRelease(key.note, "+"+key.timeNote, Tone.now(), key.vel);
        }else{
            key.instr.triggerAttackRelease(getRandomNote(), "+"+key.timeNote, Tone.now(), key.vel);
            //triggerBugKey(key)
        }
    }


    key.isPlayed = true;
}

const getRandomNote = () => {
    let arrayNote = ["C#6", "F6", "D6", "C6"]
    return arrayNote[getRandomInt(arrayNote.length)]
}

const triggerBugKey = (key) => {
    if(DEBUGMODE){
        console.log("trigger a bug on a key")
    }
    timeGlitched = 5
}

/**
 * This function will just return a random key actually
 * @param {string} note a string like C5, C#5, F5,...
 * @param {float} velocity the velocity of the key
 * @param {Instrument} instrument an instrument from tone js used for the key
 * @returns {object} return a key object
 */
const getRandomKey = (note, velocity, noteTime, instrument = classicSynth, _isVisible = true) => {
    // This will generate a random position for the key actually
    let isHorizontal = getRandomBool()
    let xPosition = isHorizontal ? getRandomInt(width) : (getRandomBool() ? width : 0)
    let yPosition = isHorizontal ? (getRandomBool() ? height : 0) : getRandomInt(height)
    return {
        position: createVector(xPosition, yPosition), // Position on map of the note
        note: note, // The note of... the note..
        isClean: false,
        isVisible: _isVisible,
        timeNote : noteTime,
        speedX : null,
        speedY: null,
        vel: velocity, // The velocity of the note
        isPlayed: false, // If the note is played or no
        instr: instrument, // The instrument of the note
    }
}

