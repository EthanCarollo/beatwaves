/**
 * This is the Intro scene, played as the start
 */
function Intro()
{
    // enter() will be executed each time the SceneManager switches
    // to this Scene
    this.enter = function()
    {
        background("teal");
        textAlign(CENTER);
        text("Welcome in the Intro scene", width / 2, height / 2);
        
        // The function that request the capture and then go to the next scene
        this.requestCapture()
    }

    this.requestCapture = function(){
        video = createCapture(VIDEO, () => {
            video.size(width, height);
            this.goNextScene()

        });
    }

    // draw() is the normal draw function, this function work like a scene
    this.draw = function(){

    }

    this.goNextScene = () => {
        SceneManager.showNextScene()
    }
}