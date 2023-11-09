var SceneManager

function setup()
{
    createCanvas(window.innerWidth, window.innerHeight);

    SceneManager = new SceneManager();
    setupScene();
    SceneManager.showScene( Intro );
}

function draw()
{
    SceneManager.draw();
}

function setupScene(){
    SceneManager.addScene( Intro );
    SceneManager.addScene ( Game );
}