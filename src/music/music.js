//create a synth and connect it to the main output (your speakers)
let classicSynth = new Tone.Synth();
let gameEnd = false;
let timeOutMelody = []


// If the music speed is at 2, this doesnt mean that the music will go faster, it means that the music is 2x slower
let globalMusicSpeed = 1.25;

// Function need to be called by a button from a player action
const initializeMusic = (song = null) => {
    Tone.start()
    classicSynth.toDestination();
    audioIsLoad = true

    for (instr of Object.keys(Instruments))
        Instruments[instr].toDestination()

    // Test the synth if we are on Debug Mode
    if (DEBUGMODE === true) {
        classicSynth.triggerAttackRelease("C4", "8n");
        console.log("Set every instruments to destination")
    }

    if (song !== null) {
        initializeMelody(song)
    }
    melodyOne = song.melo_principal.melody.notes
}

let timeOutGameEnd = setTimeout(() => {
    
}, 100);

/**
 * Initialize the melody for the game, played before the launch of the scene
 * @param {object} melody 
 */
const initializeMelody = (melody) => {
    let mainMelody = melody.melo_principal.melody.notes
    setTimeout(() => {
        initializeGameMelody(melody.melo_principal)
        initalizeOtherMelody(melody.different_melo, melody.melo_principal)
    }, gameStartDelay + 1000);

    clearTimeout(timeOutGameEnd)
    // End the game at the end of the party ! (2500 ms after in fact...)
    timeOutGameEnd = setTimeout(() => {
        gameEnd = true;
    }, (((melody.duration+8) * 1000) * globalMusicSpeed));
}

/**
 * Initialize the other melodies of the game (the melody played in the background)
 * @param {Object} otherMelodies 
 */
const initalizeOtherMelody = (otherMelodies, mainMelo) => {
    for (melodyObject of otherMelodies) {
        // Play the other sounds of the melody
        for (let i = 0; i < melodyObject.melody.notes.length; i++) {
            const melody_key = melodyObject.melody.notes[i];
            // Do not show the same not, it is already in the main melo
            if(mainMelo.melody.notes.filter(note => note.name === melody_key.name && note.start === melody_key.start).length > 0){
                continue;
            }
            timeOutMelody.push(setTimeout(() => {
                //Instruments[melodyObject.instrument].triggerAttackRelease(melody_key.name, "+"+(melody_key.end - melody_key.start), Tone.now(), melody_key.velocity-0.3);
                keyOnMap.push(getRandomKey(melody_key.name, melody_key.velocity, melody_key.end - melody_key.start, Instruments[melodyObject.instrument], false))
            }, (melody_key.start * 1000) * globalMusicSpeed)); // A totally random value but it works..

        }
    }
}

/**
 * Just initialize the main game melody that the player is playing
 * @param {Object} melodyObject 
 */
const initializeGameMelody = (melodyObject) => {
    for (let i = 0; i < melodyObject.melody.notes.length; i++) {
        const melody_key = melodyObject.melody.notes[i];
        timeOutMelody.push(setTimeout(() => {
            keyOnMap.push(getRandomKey(melody_key.name, melody_key.velocity, melody_key.end - melody_key.start, Instruments[melodyObject.instrument]))
        }, (melody_key.start * 1000) * globalMusicSpeed));
    }
}

/**
 * This function will just clear all time out of the incoming melody, so we need to call it at the end of the game
 */
const clearMelody = () => {
    for (let i = 0; i < timeOutMelody.length; i++) {
        clearTimeout(timeOutMelody[i])
    }
    timeOutMelody = []
    keyOnMap = []
}

// This is used for debug so, if we are in debug mode, we have a button for active music at every moment
if (DEBUGMODE === true) {
    document.getElementById("active-music-debug-button").style.display = "block"
    document.getElementById("active-music-debug-button").addEventListener("click", () => {
        initializeMusic()
        // And then make the button disappear, this can be problematic for some reason so, if you
        // have a problem with that, you can easily comment the line behind
        document.getElementById("active-music-debug-button").style.display = "none"
    })
}