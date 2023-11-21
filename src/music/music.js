//create a synth and connect it to the main output (your speakers)
let classicSynth = new Tone.Synth();
let gameEnd = false;

// Function need to be called by a button from a player action
const initializeMusic = (song = null) => {
    Tone.start()
    classicSynth.toDestination();
    audioIsLoad = true

    for(instr of Object.keys(Instruments))
        Instruments[instr].toDestination()

    // Test the synth if we are on Debug Mode
    if(DEBUGMODE === true){
        classicSynth.triggerAttackRelease("C4", "8n");
        console.log("Set every instruments to destination")
    }

    if(song !== null){
        initializeMelody(song)
        console.log(song)
    }
    
}
/**
 * Initialize the melody for the game, played before the launch of the scene
 * @param {object} melody 
 */
const initializeMelody = (melody) => {
    let mainMelody = melody.melo_principal.melody.notes
    initializeGameMelody(melody.melo_principal)
    initalizeOtherMelody(melody.different_melo)

    // End the game at the end of the party ! (2500 ms after in fact...)
    setTimeout(() => {
        gameEnd = true;
    }, mainMelody[mainMelody.length-1].end*1000+2500);
}

const initalizeOtherMelody = (otherMelodies) => {
    for(melodyObject of otherMelodies){
        for(note of melodyObject.melody.notes){
            // ! Play the other note of the melody, it is possible that is not really in time
            setTimeout(() => {
                Instruments[melodyObject.instrument].triggerAttackRelease(note.name, "+"+(note.end - note.start), Tone.now(), note.velocity);
            }, (note.start*1000+keySpeed*10));
        }
    }
}

const initializeGameMelody = (melodyObject) => {
    for (let i = 0; i < melodyObject.melody.notes.length; i++) {
        const melody_key = melodyObject.melody.notes[i];
        setTimeout(() => {
            keyOnMap.push(getRandomKey(melody_key.name, melody_key.velocity, melody_key.end - melody_key.start, Instruments[melodyObject.instrument]))
        }, melody_key.start*1000);
    }
}


// This is used for debug so, if we are in debug mode, we have a button for active music at every moment
if(DEBUGMODE === true){
    document.getElementById("active-music-debug-button").style.display = "block"
    document.getElementById("active-music-debug-button").addEventListener("click" , () => {
        initializeMusic()
        // And then make the button disappear, this can be problematic for some reason so, if you
        // have a problem with that, you can easily comment the line behind
        document.getElementById("active-music-debug-button").style.display = "none"
    })
}