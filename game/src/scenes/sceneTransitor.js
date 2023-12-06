const transitor = document.getElementById("scene-transitor-background")
let isInTransition = false;

const goToScene = (scene = null) => {
    if(isInTransition === false){
        isInTransition = true
        transitor.classList.add("opacity-max")
        setTimeout(() => {
            if(scene === null){
                SceneManager.showNextScene()
            }else{
                SceneManager.showScene( scene );
            }
            transitor.classList.remove("opacity-max")
            isInTransition = false;
        }, 500);
    }
}