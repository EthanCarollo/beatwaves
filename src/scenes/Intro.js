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
    }

    // draw() is the normal draw function, this function work like a scene
    this.draw = function(){

    }
}