var SceneManager
var cnv
const SCENELIST = [
    Intro,
    MainMenu,
    // For the demonstration of the prototype, we actually don't need Tutorial cause it doesnt works at all lol
    //Tutorial,
    Game,
    EndMenu
]

function preload(){
    loadAllAssets(ASSETSPATH)
}


function setup(){
    cnv = createCanvas(window.innerWidth, window.innerHeight, P2D);
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
    cnv.mouseClicked(() => {})
    if(sceneIsLoad === true && isAssetsLoaded === true){
        SceneManager.draw();
    }
}

// Just setup every scene of SCENELIST const
function setupScene(){
    for(scene of SCENELIST)
        SceneManager.addScene( scene );

    sceneIsLoad = true
}