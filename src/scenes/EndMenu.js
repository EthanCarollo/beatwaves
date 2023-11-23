/**
 * This is the End Menu scene, played as the end of each game
 */
function EndMenu() {

    // enter() will be executed each time the SceneManager switches
    // to this Scene
    this.enter = function () {
        this.seeDataviz([overallScore(TouchOrNot.Touch, TouchOrNot.Miss), playerError])
    }

    // draw() is the normal draw function, this function work like a scene
    this.draw = function () {
        clearMelody()
    }


    this.seeDataviz = (data) => {

        let fullValue = {
            "keysMiss": data[0].keysMiss,
            "keysTouch": data[0].keysTouch,
            "playerScore": data[0].playerScore,
            "playerRating": data[0].playerRating,
            "successPercentage": data[0].successPercentage,
            "livesRemaining": data[1],
            "leftArm": null,
            "rightArm": null
        };

        let domDataviz = {
            "keysMiss": { "title": "Keys Missed", "fontSize": "2vm", "nameId": "keysMiss" },
            "keysTouch": { "title": "Keys Touch", "fontSize": "2vm", "nameId": "keysTouch" },
            "playerScore": { "title": "Score player", "fontSize": "2vm", "nameId": "playerScore" },
            "playerRating": { "title": "playerRating", "fontSize": "2vm", "nameId": "playerRating" },
            "successPercentage": { "title": "successPercentage", "fontSize": "2vm", "nameId": "successPercentage" },
            "livesRemaining": { "title": "livesRemaining", "fontSize": "2vm", "nameId": "livesRemaining" },
            "leftArm": { "title": "leftArm", "fontSize": "2vm", "nameId": "leftArm" },
            "rightArm": { "title": "rightArm", "fontSize": "2vm", "nameId": "rightArm" },
        };

        let divDataviz = document.getElementById("dataviz");
        divDataviz.style.display = "block";

        this.createZooningDOM();


        for (let key in fullValue) {
            if (fullValue.hasOwnProperty(key)) {
                if (domDataviz[key]) {
                    let newDiv = document.getElementById(domDataviz[key].nameId)
                    newDiv.textContent = `${domDataviz[key].title}: ${fullValue[key]}`;
                    newDiv.style.fontSize = domDataviz[key].fontSize;
                    newDiv.style.position = "relative";
                    newDiv.style.width = "25%"
                    newDiv.style.height = "auto"
                    newDiv.style.zIndex = "1"
                }
            }
        }

    }

    this.createZooningDOM = () => {
        let container = document.getElementById("container")
        container.style.top = ((height / 2) - 200) + "px"
        container.style.left = ((width / 2) / 2) + "px"
    }

    this.goNextScene = () => {
        goToScene( MainMenu )
    }
}