//create a synth and connect it to the main output (your speakers)
let classicSynth = new Tone.Synth();
let gameEnd = false;

// Function need to be called by a button from a player action
const initializeMusic = (melody = null) => {
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

    if(melody !== null){
        initializeMelody(melody)
    }
    
}
/**
 * Initialize the melody for the game, played before the launch of the scene
 * @param {object} melody 
 */
const initializeMelody = (melody) => {
    let melo = melody.melo_principal.melody.notes

    // Appends the key in the array with a time out, in that way, we can have the good melody playing
    for (let i = 0; i < melo.length; i++) {
        const melody_key = melo[i];
        setTimeout(() => {
            keyOnMap.push(getRandomKey(melody_key.name, "n8", melody_key.end - melody_key.start, Instruments.cloud_key))
        }, melody_key.start*1000);
    }

    // End the game at the end of the party ! (2500 ms after in fact...)
    setTimeout(() => {
        gameEnd = true;
    }, melo[melo.length-1].end*1000+2500);
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