/**
 * This is the Main Menu scene, played as the end of each game
 */
function MainMenu() {
    let slider
    console.log((width / 2) / 2)
    let poseNet;
    let poses;
    let sceneIsLoaded = false;
    let lifeTime = 60;
    let handPosition = {
        x: 0,
        y: 0
    }

    // This is the options for load pose net
    let poseNetOptions = {
        imageScaleFactor: 0.3,
        minConfidence: 0.5,
        maxPoseDetections: 1,
        flipHorizontal: true,
        outputStride: 16,
        multiplier: 0.75,
        inputResolution: 321,
        nmsRadius: 30,
        autoplay: false
    }

    // enter() will be executed each time the SceneManager switches
    // to this Scene
    this.enter = function () {

        initializeCenterOfWindow()
        frameRate(60)

        poseNet = ml5.poseNet(video, poseNetOptions, this.modelLoaded);
        poseNet.on('pose', (results) => { poses = results; }); // Just set the poses var on the event pose


        background(255, 255, 255)
        this.setCarousselSlide()
        // Create and mount the slider with splide, show the documentation here : https://splidejs.com/guides/
        this.slider = new Splide('#splide', {
            type: 'loop',
            perPage: 3,
            focus: 'center',
            arrows: false,
            autoplay: false,
            interval: 8000,
            flickMaxPages: 1,
            updateOnMove: true,
            pagination: false,
            padding: '-5%',
            gap: '3vw'
        }).mount();

    }

    this.setCarousselSlide = function () {
        // Show the game caroussel
        document.getElementById("game_caroussel").style.display = "flex"
        let splideList = document.getElementById("splide__list")
        splideList.innerHTML = ""
        for (let i = 0; i < Assets.get("songs").songs.length; i++) {
            const song = Assets.get("songs").songs[i];
            // Appends the text document
            let doc = document.createElement("div")
            doc.classList.add("song_element")
            doc.style.backgroundImage = "url(" + Assets.get("IMAGES").data[0].url + ")";
            doc.classList.add("splide__slide")
            doc.innerHTML = "<h1>" + song.nameSong + "</h1>"

            let song_button = document.createElement("button")
            song_button.innerHTML = "Choose Music"
            song_button.addEventListener("click", () => {
                initializeMusic(song)
                this.goNextScene()
            })
            doc.appendChild(song_button)
            splideList.appendChild(doc)

        }
    }

    // draw() is the normal draw function, this function work like a scene
    this.draw = function () {
        if (sceneIsLoaded === false) return;

        if (DEBUGMODE === true) {
            this.debugScene();
        }

        this.registerHandPosition()
        this.navigateMenu()
    }

    this.registerHandPosition = () => {
        if (!poses || !poses[0])
            return

        var pose = poses[0];

        handPosition = pose.pose.rightWrist
        //if (_rightWrist.confidence > 0.6) handPoseHistory.right.push(_rightWrist);
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
        document.getElementById("game_caroussel").style.display = "none"
        SceneManager.showNextScene()
    }

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

    const interactiveButtons = [
        {
            position: {
                x:120,
                y:height/2-200/2
            },
            width: 200,
            height: 200,
            loading: 0,
            isReady: false,
            callback : () => { this.slider.go("-1") }
        },
        {
            position: {
                x:width-200-120,
                y:height/2-200/2
            },
            width: 200,
            height: 200,
            loading: 0,
            isReady: false,
            callback : () => { this.slider.go("+1") }
        },
        {
            position: {
                x:width/2-200/2,
                y:height-400
            },
            width: 200,
            height: 200,
            loading: 0,
            isReady: false,
            callback : () => { 
                initializeMusic(Assets.get("songs").songs[this.slider.index])
                this.goNextScene()
            }
        }
    ]

    this.navigateMenu = () => {
        if (DEBUGMODE) {
            // console.log("==== " + handPosition.x + "X ====== ")
            // console.log("==== " + handPosition.y + "Y ====== ")
        }

        for (let i = 0; i < interactiveButtons.length; i++) {
            const button = interactiveButtons[i];
            showInteractiveButton(button, handPosition)
        }
    }
}