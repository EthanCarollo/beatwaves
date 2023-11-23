/**
 * This is the Main Menu scene, played as the end of each game
 */
function MainMenu() {
    let slider

    let poseNet;
    let poses;
    let sceneIsLoaded = false;
    let lifeTime = 60;
    let handPosition = {
        x: 0,
        y: 0
    }
    let mousePosition = {
        x: 0,
        y: 0
    }

    // This is the options for load pose net
    // This can probably need a small improvement
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
    this.enter = function () {

        initializeCenterOfWindow()
        frameRate(30)

        poseNet = ml5.poseNet(video, poseNetOptions, this.modelLoaded);
        poseNet.on('pose', (results) => { poses = results; }); // Just set the poses var on the event pose

        background(255, 255, 255)
        this.setCarousselSlide()
        // Create and mount the slider with splide, show the documentation here : https://splidejs.com/guides/
        this.slider = new Splide('#splide', {
            type: 'slide',
            perPage: 3,
            focus: 'center',
            arrows: false,
            autoplay: false,
            interval: 8000,
            flickMaxPages: 1,
            updateOnMove: true,
            pagination: false
        }).mount();
        this.slider.go("+1")
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
        background(255,255,255,80)

        if (DEBUGMODE === true) {
            this.debugScene();
        }

        this.registerHandPosition()
        this.drawHandPosition()
        this.navigateMenu()
    }

    this.drawHandPosition = () => {
        // ! This will need some improvement, actually it's just circle
        if(handPosition){
            mousePosition.x = lerp(mousePosition.x, handPosition.x, 0.07)
            mousePosition.y = lerp(mousePosition.y, handPosition.y, 0.07)
            circle(mousePosition.x, mousePosition.y, 20)
        }
    }

    this.registerHandPosition = () => {
        if (!poses || !poses[0])
            return

        var pose = poses[0];

        if (pose.pose.rightWrist.confidence > 0.6) handPosition = pose.pose.rightWrist;
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

    let sizeButton = width/8;
    const interactiveButtons = [
        {
            position: {
                x:120,
                y:height/2-sizeButton/2
            },
            width: sizeButton,
            height: sizeButton,
            loading: 0,
            isReady: false,
            callback : () => { this.slider.go("-1") }
        },
        {
            position: {
                x:width-sizeButton-120,
                y:height/2-sizeButton/2
            },
            width: sizeButton,
            height: sizeButton,
            loading: 0,
            isReady: false,
            callback : () => { this.slider.go("+1") }
        },
        {
            position: {
                x:width/2-sizeButton/2,
                y:height-400
            },
            width: sizeButton,
            height: sizeButton,
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
            fill(255, button.loading*2, 0)
            rect(button.position.x, button.position.y, button.width, button.height)
            
        }
    }
}