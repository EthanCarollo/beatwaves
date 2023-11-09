/**
 * This is the Tutorial scene, where we do the tutorial
 */
function Tutorial()
{
    // enter() will be executed each time the SceneManager switches
    // to this Scene
    this.enter = function()
    {
        background("teal");
        textAlign(CENTER);
        text("Welcome in the Main Menu scene", width / 2, height / 2);
        setTimeout(() => {
            this.goNextScene()
        }, 3000);
    }

    // draw() is the normal draw function, this function work like a scene
    this.draw = function(){

    }

    this.goNextScene = () => {
        SceneManager.showNextScene()
    }
}