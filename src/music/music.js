//create a synth and connect it to the main output (your speakers)
let classicSynth = new Tone.Synth();

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
        console.log(melody)
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