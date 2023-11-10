/**
 * This is the Intro scene, played as the start
 */
function Intro() {
    // enter() will be executed each time the SceneManager switches
    // to this Scene
    this.enter = function () {
        background("teal");
        textAlign(CENTER);
        text("Welcome in the Intro scene", width / 2, height / 2);

        // The function that request the capture and then go to the next scene
        this.splashScreen()
    }

    this.showRequest = function () {
        // Show capture text
        anime({
            targets: ".request_capture",
            opacity: 1,
            complete : () => {
                // Request capture
                this.requestCapture()
            }
        })
    }

    this.requestCapture = function(){
        video = createCapture(VIDEO, () => {
            video.size(width, height);

            // Hide request capture text and go next scene
            anime({
                targets: ".request_capture",
                opacity: 0,
                complete: () => {
                    // Hide request capture text and go next scene
                    document.getElementById("request_capture").style.display = "none"
                    this.goNextScene()
                }
            })

        });
    }

    this.splashScreen = function () {
        var animationSplashScreen = new Letterize({
            targets: ".splash_screen"
        });
        var animation = anime.timeline({
            targets: animationSplashScreen.listAll,
            delay: anime.stagger(50),
            loop: false,
            complete: (anim) => {
                // At the end, go to the stage to ask for the camera
                document.getElementById("splash_screen").style.display = "none"
                document.getElementById("splash_screen").innerHTML = ""
                this.showRequest()
            }
        });

        animation
            .add({
                translateY: -40
            })
            .add({
                translateY: 0,
                opacity: 0
            });
    }

    // draw() is the normal draw function, this function work like a scene
    this.draw = function () {

    }

    this.goNextScene = () => {
        SceneManager.showNextScene()
    }
}