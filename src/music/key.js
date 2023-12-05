let keyOnMap = []
let keyWidth = 40
let keyHeight = 40
let keySpeed = 180
let centerOfMap;
let touched = 0;



// Function called on every resize of the window & at the start of the game
const initializeCenterOfWindow = () => {
    centerOfMap = new createVector(width / 2, height / 2)
}

let sizeKey = 80
// Function called every frames to show the key on map
const showKeyOnMap = () => {
    noStroke()
    for (key of keyOnMap) {
        if(key.isVisible === true){

            key.cells[0].show()
            key.cells[0].pos = key.position
            for (let i = 1; i < key.cells.length; i++) {
                const element = key.cells[i];
                element.show()
                element.alpha-=4;
                element.move()
                element.move()
                element.move()
            }
            image(Assets.get("IMAGES").data[11].img, key.position.x-50, key.position.y-50, 100, 100)

            if (key.isClean === true) {
                key.cells[0].red = 30;
                key.cells[0].green = 28;
                key.cells[0].blue = 28;
            }else{
                // Make a train if he isnt clean
                if(frameCount % 40 !== 0){
                    key.cells.push(key.cells[0].mitosis())
                }
            }
        }else{
            if(DEBUGMODE === true){
                fill(0,0,255,20) // The fake key used for play music in background is blue
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
        if(keyOnMap[i].isPlayed === true){
            if(keyOnMap[i].isVisible === true){
                if (keyOnMap[i].isClean === true){
                    touched++;
                    lifeSystem(true)
                    if(keyOnMap[i].touchedBy === "right"){
                        scoreHand.right++
                    }else{
                        scoreHand.left++
                    }
                } else if(!keyOnMap[i].isClean){
                    lifeSystem(false)
                }
            }
            keyOnMap.splice(i, 1)
        }
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
    let _position = createVector(xPosition, yPosition)
    return {
        position: _position, // Position on map of the note
        note: note, // The note of... the note..
        isClean: false,
        isVisible: _isVisible,
        timeNote : noteTime,
        speedX : null,
        speedY: null,
        vel: velocity, // The velocity of the note
        isPlayed: false, // If the note is played or no
        instr: instrument, // The instrument of the note
        touchedBy: "",
        // Temp :
        cells : [new Cell(_position, 50)]
    }
}




// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/jxGS3fKPKJA

function Cell(pos, r, _color = {red:202,green:0,blue:211}) {

    if (pos) {
      this.pos = pos.copy();
    } else {
      this.pos = createVector(random(width), random(height));
    }
  
    this.r = r || 180;
    this.red = _color.red;
    this.blue = _color.blue;
    this.green = _color.green;
    this.alpha = 100;
  
    this.clicked = function(x, y) {
      var d = dist(this.pos.x, this.pos.y, x, y);
      if (d < this.r) {
        return true;
      } else {
        return false;
      }
    }
  
    this.mitosis = function() {
      //this.pos.x += random(-this.r, this.r);
      var cell = new Cell(this.pos, this.r * (0.5 + (getRandomInt(100)+1)/200), {red:this.red,blue:this.blue,green:this.green});
      cell.alpha = 100;
      return cell;
    }
  
    this.move = function() {
      var vel = p5.Vector.random2D();
      this.pos.add(vel);
    }
  
    this.show = function() {
      noStroke();
      fill(color(this.red, this.green, this.blue, this.alpha));
      ellipse(this.pos.x, this.pos.y, this.r, this.r)
    }
  
  }