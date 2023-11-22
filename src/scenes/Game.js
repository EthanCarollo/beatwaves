/**
 * This is the Game scene played when we launch a game
 */
function Game() {
    let poseNet;
    let poses;
    let sceneIsLoaded = false;
    let lifeTime = 60;
    let handPoseHistory = {
        "right": [],
        "left": []
    }


    // This is the options for load pose net
    let poseNetOptions = {
        imageScaleFactor: 0.3,
        minConfidence: 0.5,
        maxPoseDetections: 1,
        flipHorizontal: true,
        outputStride: 16,
        multiplier: 0.75,
        inputResolution: 257,
        nmsRadius: 30
    }

    // enter() will be executed each time the SceneManager switches
    // to this Scene
    this.enter = () => {
        initializeCenterOfWindow()
        frameRate(30)

        poseNet = ml5.poseNet(video, poseNetOptions, this.modelLoaded);
        poseNet.on('pose', (results) => { poses = results; }); // Just set the poses var on the event pose
    }

    // draw() is the normal draw function, this function work like a scene
    this.draw = () => {
        // this scene needs to be loaded if we want to draw in
        if (sceneIsLoaded === false) return;
        this.registerHandPosition()
        
        if (DEBUGMODE === true) {
            this.debugScene();
            showKeyOnMap(handPoseHistory)
            mooveKeyOnMap()
            this.lifeOfPlayer()
        }

        if (gameEnd === true) {
            if (DEBUGMODE === true) {
                console.log("GAME IS FINISH ! --->")
            }
            this.goNextScene()
        }

        this.checkHand()
    }

    this.checkHand = () => {
        // Boucle on the right hand history
        for (let i = 0; i < handPoseHistory.right.length; i++) {
            const hand = handPoseHistory.right[i];
            hand.life--;
        }

        // This boucle on the hand life
        for (let i = 0; i < handPoseHistory.right.length; i++) {
            const hand = handPoseHistory.right[i];
            if (hand.life <= 0)
                handPoseHistory.right.splice(i, 1)
        }
    }

    this.registerHandPosition = () => {
        if (!poses || !poses[0])
            return

        var pose = poses[0];

        let _rightWrist = this.getHandForHistory(pose.pose.rightWrist)
        if (_rightWrist.confidence > 0.6) handPoseHistory.right.push(_rightWrist);

        let _leftWrist = this.getHandForHistory(pose.pose.leftWrist)
        if (_leftWrist.confidence > 0.6) handPoseHistory.left.push(_leftWrist)

    }

    this.getHandForHistory = (hand) => {
        return {
            position: createVector(hand.x, hand.y),
            confidence: hand.confidence,
            life: lifeTime
        }
    }

    // Function called once model is loaded
    this.modelLoaded = () => {
        sceneIsLoaded = true
        if (DEBUGMODE === true)
            console.log('/-Model Loaded, you can play-/');
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
        SceneManager.showNextScene()
    }

    //#region Debug Functions

    // Function called if DEBUGMODE const is true
    this.debugScene = () => {

        // Flip video horizontaly
        scale(-1, 1);
        image(video, -width, 0, width, height)
        scale(-1, 1);

        if (poses) {
            this.drawDebugPose(poses[0])
        }
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

    //Debug function which allows you to view errors/remaining lives
    this.lifeOfPlayer = () => {
        let lifePlayer = playerError - TouchOrNot.Error
        let rectWidth = 20;
        let rectHeight = 20;
        let spacing = 20;

        for (let i = 0; i < lifePlayer; i++) {
            let xPos = i * (rectWidth + spacing); 
            let yPos = height / 2 - rectHeight / 2;

            fill(255,0,0)
            rect(xPos, yPos, rectWidth, rectHeight);
        }
    }

    //#endregion

}