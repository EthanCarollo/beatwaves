/**
 * This is the End Menu scene, played as the end of each game
 */
function EndMenu() {

    // enter() will be executed each time the SceneManager switches
    // to this Scene
    this.enter = function () {
        // background("teal");
        // textAlign(CENTER);
        // text("Welcome in the End Menu scene", width / 2, height / 2);
        let dataviz = [overallScore(TouchOrNot.Touch, TouchOrNot.Miss), playerError] 
        this.seeDataviz(dataviz)

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
            "leftArm":null,
            "rightArm":null
        };

        let domDataviz = {
            "keysMiss": { "title": "Keys Missed", "font": "2vm", "nameId":"keysMiss" },
            "keysTouch": { "title": "Keys Touch", "font": "2vm", "nameId":"keysTouch" },
            "playerScore": { "title": "Score player", "font": "2vm", "nameId":"playerScore" },
            "playerRating": { "title": "playerRating", "font": "2vm", "nameId":"playerRating" },
            "successPercentage": { "title": "successPercentage", "font": "2vm", "nameId":"successPercentage" },
            "livesRemaining": { "title": "livesRemaining", "font": "2vm", "nameId":"livesRemaining" },
            "leftArm": { "title": "leftArm", "font": "2vm", "nameId": "leftArm" },
            "rightArm": { "title": "rightArm", "font": "2vm", "nameId": "rightArm" },
        };

        let divDataviz = document.getElementById("dataviz");
        divDataviz.style.display = "block";

        this.createZooningDOM();


        for (let key in fullValue) {
            if (fullValue.hasOwnProperty(key)) {
                if (domDataviz[key]) {
                    let newDiv = document.getElementById(domDataviz[key].nameId)
                    newDiv.textContent = `${domDataviz[key].title}: ${fullValue[key]}`;
                    newDiv.style.fontSize = domDataviz[key].font;
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
        container.style.position = "absolute"
        container.style.top = ((height / 2) - 200) + "px"
        console.log(((height / 2) - 200) + "px")
        container.style.left = ((width / 2) / 2) + "px"
        container.style.width = "700px"
        container.style.height = "400px"


        let keysMissDiv = document.getElementById("keysMiss")
        keysMissDiv.style.left = "7%"

        let keysTouchDiv = document.getElementById("keysTouch")
        keysTouchDiv.style.left = "7%"

        let playerScoreDiv = document.getElementById("playerScore")
        playerScoreDiv.style.left = "78%"
        playerScoreDiv.style.top = "82%"

        let playerRatingDiv = document.getElementById("playerRating")
        playerRatingDiv.style.left = "42%"
        playerRatingDiv.style.top = "35%"

        let successPercentageDiv = document.getElementById("successPercentage")
        successPercentageDiv.style.bottom = "10%"
        successPercentageDiv.style.left = "7%"

        let livesRemainingDiv = document.getElementById("livesRemaining")
        livesRemainingDiv.style.left = "79%"
        livesRemainingDiv.style.bottom = "20%"

        let leftArmDiv = document.getElementById("leftArm")
        leftArmDiv.style.top = "59%"
        leftArmDiv.style.left = "7%"

        let rightArmDiv = document.getElementById("rightArm")
        rightArmDiv.style.top = "60%"
        rightArmDiv.style.left = "7%"
    }

    this.goNextScene = () => {
        SceneManager.showNextScene()
    }
}