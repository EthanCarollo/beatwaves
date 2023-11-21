let keyOnMap = []
let keyWidth = 40
let keyHeight = 40
let keySpeed = 0.25
let centerOfMap;
let TouchOrNot = {
    "Touch":0,
    "Miss":0
}



// Function called on every resize of the window & at the start of the game
const initializeCenterOfWindow = () => {
    centerOfMap = new createVector(width / 2, height / 2)
}

// Function called every frames to show the key on map
const showKeyOnMap = (handPoseHist) => {
    for (key of keyOnMap) {
        if (key.isClean === true) {
            fill(0, 0, 255)
        } else {
            fill(255, 0, 0)
        }
        rect(key.position.x - keyWidth / 2, key.position.y - keyHeight / 2, 20, 20)
        keyIsInside(handPoseHist, key)
    }
}

/**
 * Check if the key is inside a rail
 * @param {*} handPoseHistory 
 * @param {*} key 
 */
const keyIsInside = (handPoseHistory, key) => {
    let trailSize = 15;
    fill(255, 255, 255, 120)
    let cnt = 0
    // Boucle on the right hand history
    for (let i = 1; i < handPoseHistory.right.length; i++) {
        // Draw of the back of that
        const hand = handPoseHistory.right[i];
        let edge1 = {
            x1: hand.position.x - trailSize,
            y1: hand.position.y,
            x2: handPoseHistory.right[i - 1].position.x - trailSize,
            y2: handPoseHistory.right[i - 1].position.y
        }
        if (keyIsInEdge(key, edge1) === true) {
            cnt++
        }

        let edge2 = {
            x1: hand.position.x + trailSize,
            y1: hand.position.y,
            x2: handPoseHistory.right[i - 1].position.x + trailSize,
            y2: handPoseHistory.right[i - 1].position.y
        }
        if (keyIsInEdge(key, edge2) === true) {
            cnt++
        }
        line(edge1.x1, edge1.y1, edge1.x2, edge1.y2)
        line(edge2.x1, edge2.y1, edge2.x2, edge2.y2)
        //circle(hand.position.x, hand.position.y, 15, 15)
    }
    fill(255, 0, 0)
    if (cnt % 2 === 1) {
        key.isClean = true
    }
}

/**
 * Check if the key is between some edge
 * @param {*} key 
 * @param {*} edge 
 * @returns 
 */
function keyIsInEdge(key, edge) {
    if ((key.position.y < edge.y1) !== (key.position.y < edge.y2) &&
        key.position.x < edge.x1 + ((key.position.y - edge.y1) / (edge.y2 - edge.y1)) * (edge.x2 - edge.x1)) {
        return true
    }
    return false
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
    (Math.abs(key.position.x - destination.x) < 0.1 && Math.abs(key.position.y - destination.y) < 0.1)
        ? key.position = centerOfMap
        : key.position.lerp(destination, keySpeed / 15)
}

/**
 * Play a note normally, take the key and woopala
 * @param {object} key 
 */
const playKey = (key) => {
    if (DEBUGMODE === true)
        console.log("/-- Key has been played --/")
    
    if (key.isClean === true){
        TouchOrNot.Touch++
        lifeSystem(TouchOrNot.Miss, true, false)
    } else if(!key.isClean){
        TouchOrNot.Miss++
        lifeSystem(TouchOrNot.Miss, false, false)
    }
    let time_now = Tone.now();
    key.instr.triggerAttackRelease(key.note, "+"+key.timeNote);
    key.isPlayed = true;
}

/**
 * This function will just return a random key actually
 * @param {string} note a string like C5, C#5, F5,...
 * @param {float} velocity the velocity of the key
 * @param {Instrument} instrument an instrument from tone js used for the key
 * @returns {object} return a key object
 */
const getRandomKey = (note, velocity, noteTime, instrument = classicSynth) => {
    // This will generate a random position for the key actually
    let isHorizontal = getRandomBool()
    let xPosition = isHorizontal ? getRandomInt(width) : (getRandomBool() ? width : 0)
    let yPosition = isHorizontal ? (getRandomBool() ? height : 0) : getRandomInt(height)
    return {
        position: createVector(xPosition, yPosition), // Position on map of the note
        note: note, // The note of... the note..
        isClean: false,
        timeNote : noteTime,
        vel: velocity, // The velocity of the note
        isPlayed: false, // If the note is played or no
        instr: instrument, // The instrument of the note
    }
}

