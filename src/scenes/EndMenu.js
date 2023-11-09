/**
 * This is the End Menu scene, played as the end of each game
 */
function EndMenu()
{
    // enter() will be executed each time the SceneManager switches
    // to this Scene
    this.enter = function()
    {
        background("teal");
        textAlign(CENTER);
        text("Welcome in the End Menu scene", width / 2, height / 2);
    }

    // draw() is the normal draw function, this function work like a scene
    this.draw = function(){

    }

    this.goNextScene = () => {
        SceneManager.showNextScene()
    }
}