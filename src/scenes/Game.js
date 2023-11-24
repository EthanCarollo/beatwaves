let glitch
let timeGlitched = 0
let gameStartDelay = 5000
let melodyOne
let melodyOther
let handLifeTime = 25;
let minusLifeTime = 0.75;

/**
 * This is the Game scene played when we launch a game
 */
function Game() {
    let sceneIsLoaded = false;
    let handPoseHistory = {
        "right": [],
        "left": []

    }


    // enter() will be executed each time the SceneManager switches
    // to this Scene
    this.enter = () => {
        TouchOrNot = {
            "Touch":0,
            "Miss":0,
            "Error":0
        }

        initializeCenterOfWindow()
        frameRate(30)
        this.launchDecount()
        gameEnd = false;
        glitch = new Glitch();
        glitch.pixelate(1);
        this.sceneLoaded()
    }

    this.launchDecount = () => {
        document.getElementById("game-start-decount").style.display = "flex";
        document.getElementById("game-start-decount").style.opacity = "80%";

        let countNumber = 5
        // This show the count progressively according to the game start delay
        for (let i = 1; i <= countNumber; i++) {
            setTimeout(() => {
                document.getElementById("counter-text").innerHTML = countNumber - i
                if (i === countNumber) {
                    console.log("start animation")
                    anime({
                        targets: "#game-start-decount",
                        opacity: 0,
                        easing: 'easeInOutQuad'
                    })
                }
            }, gameStartDelay / countNumber * (i - 1));
        }

        setTimeout(() => {
            // Do it at the end of the timer
            document.getElementById("game-start-decount").style.display = "none";
        }, gameStartDelay);


    }

    // draw() is the normal draw function, this function work like a scene
    this.draw = () => {

        // this scene needs to be loaded if we want to draw in
        if (sceneIsLoaded === false) return;
        background(255,255,255,80)

        if (DEBUGMODE === true) {
            this.debugScene();
            showLifeOfPlayer()
            if (poses) {
                this.drawDebugPose(poses[0])
            }
        }

        this.registerHandPosition()
        // Show Key on map
        mooveKeyOnMap()
        showKeyOnMap()
        showHandTrail(handPoseHistory.right)
        showHandTrail(handPoseHistory.left)
        // Check every hands of the history
        this.checkHand(handPoseHistory.right)
        this.checkHand(handPoseHistory.left)

        if (gameEnd === true) {
            if (DEBUGMODE === true) {
                console.log("GAME IS FINISH ! --->")
            }
            this.goNextScene()
        }

    }

    this.checkHand = (handPoseHist) => {
        // Boucle on the right hand history
        for (let i = 0; i < handPoseHist.length; i++) {
            const hand = handPoseHist[i];
            hand.life-=minusLifeTime;
        }

        // This boucle on the hand life
        for (let i = 0; i < handPoseHist.length; i++) {
            const hand = handPoseHist[i];
            if (hand.life <= 0)
                handPoseHist.splice(i, 1)
        }
    }

    this.registerHandPosition = () => {
        if (!poses || !poses[0])
            return

        var pose = poses[0];

        let _rightWrist = this.getHandForHistory(pose.pose.rightWrist)
        if (_rightWrist.confidence > 0.4) handPoseHistory.right.push(_rightWrist);

        let _leftWrist = this.getHandForHistory(pose.pose.leftWrist)
        if (_leftWrist.confidence > 0.4) handPoseHistory.left.push(_leftWrist)

    }

    this.getHandForHistory = (hand) => {
        return {
            position: createVector(hand.x, hand.y),
            confidence: hand.confidence,
            life: handLifeTime
        }
    }

    // Function called once model is loaded
    this.sceneLoaded = () => {
        sceneIsLoaded = true
        if (DEBUGMODE === true)
            console.log('/-Scene Loaded, you can play-/');
    }



    this.goNextScene = () => {
        if (DEBUGMODE) {
            console.log("Clear Melody + Clear HandPoseHistory")
        }
        clearMelody()
        handPoseHistory = {
            "right": [],
            "left": []
        }
        goToScene()
    }

    //#region Debug Functions

    // Function called if DEBUGMODE const is true
    this.debugScene = () => {

        // Flip video horizontaly
        scale(-1, 1);
        image(video, -width, 0, width, height)

        if (timeGlitched > 0) {
            
	        if(frameCount % 2 === 0) {
                glitch.loadImage(video);
                // map mouseX to # of randomBytes() + mouseY to limitBytes()
                glitch.limitBytes(map(25, 0, height, 0, 1));
                glitch.randomBytes(map(25, 0, width, 0, 100));
                glitch.buildImage();
                image(glitch.image, -width, 0, width, height)
            }
            timeGlitched--
        }
        scale(-1, 1);
    }

    // Function called when we need to show the pose
    this.drawDebugPose = (pose) => {
        if (!pose)
            return

        // Every position to draw on sketch
        const positionArray = [
            pose.pose.leftShoulder,
            pose.pose.leftElbow,
            pose.pose.leftWrist,
            pose.pose.leftEye,
            pose.pose.leftAnkle,
            pose.pose.rightShoulder,
            pose.pose.rightElbow,
            pose.pose.rightWrist,
            pose.pose.rightEye,
            pose.pose.rightAnkle,
        ]

        // For the debug, i boucle on the array of position and then draw every parts of the body
        // And for the color, i just check if we here in the second half of the array or not
        // Fill the color of the circle with the confidence
        for (let i = 0; i < positionArray.length; i++) {
            const elementPosition = positionArray[i];
            (i > (positionArray.length - 1) / 2) ? fill(255, 0, 0, elementPosition.confidence * 255) : fill(0, 255, 0, elementPosition.confidence * 255)
            circle(elementPosition.x, elementPosition.y, 30)
        }

    }

    //#endregion



}