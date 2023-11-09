//create a synth and connect it to the main output (your speakers)
let classicSynth;

// Function need to be called by a button from a player action
const initializeMusic = () => {
    Tone.start()
    classicSynth = new Tone.Synth().toDestination();
    audioIsLoad = true

    // Test the synth if we are on Debug Mode
    if(DEBUGMODE === true)
        classicSynth.triggerAttackRelease("C4", "8n");
    
}

// This is used for debug so, if we are in debug mode, we have a button for active music at every moment
if(DEBUGMODE === true){
    document.getElementById("active-music-debug-button").style.display = "block"
    document.getElementById("active-music-debug-button").addEventListener("click" , () => {
        initializeMusic()
        // And then make the button disappear, this can be problematic for some reason so, if you
        // have a problem with that, you can easily comment this line
        document.getElementById("active-music-debug-button").style.display = "none"
    })
}