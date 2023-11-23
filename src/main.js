var SceneManager
const SCENELIST = [
    Intro,
    MainMenu,
    Tutorial,
    Game,
    EndMenu
]

function preload(){
    loadAllAssets(ASSETSPATH)
}


function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    noSmooth();

    SceneManager = new SceneManager();
    setupScene();
    // SceneManager.showScene( Intro );
    // For the developpement on this branch, i only show the scene for the game
    SceneManager.showScene( SCENELIST[0] );

    if(DEBUGMODE){
        logGameInformations()
    }
}

function draw() {
    SceneManager.draw();
    character()
}

// Just setup every scene of SCENELIST const
function setupScene(){
    for(scene of SCENELIST)
        SceneManager.addScene( scene );

    sceneIsLoad = true
}