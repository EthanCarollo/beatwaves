/**
 * This is the End Menu scene, played as the end of each game
 */
function EndMenu()
{


    // let dataviz = [overallScore(TouchOrNot.Touch, TouchOrNot.Miss), playerError] 
    let dataviz = [overallScore(30, 10), 2] 

    // enter() will be executed each time the SceneManager switches
    // to this Scene
    this.enter = function()
    {
        // background("teal");
        textAlign(CENTER);
        text("Welcome in the End Menu scene", width / 2, height / 2);


        this.seeDataviz(dataviz)

    }

    // draw() is the normal draw function, this function work like a scene
    this.draw = function(){
        clearMelody()
    }


    this.seeDataviz = (data) =>{

        let fullValue = {
            "keysMiss":data[0].keysMiss,
            "keysTouch": data[0].keysTouch,
            "playerScore": data[0].playerScore,
            "playerRating": data[0].playerRating,
            "successPercentage": data[0].successPercentage,
            "livesRemaining":data[1]
        }

        this.createZooning()
        // console.log(fullValue)
    } 


    this.createZooning = () => {
        let form = {
            "Rect":{
                "posX": (width / 2) / 2,
                "posY": height / 2 - 200,
                "width": 700,
                "height": 400,
                "border":20
            },
            "Cercle": {
                "posX": (width / 2),
                "posY": height / 2,
                "width": 200
            },
            "rectLineVertical": {
                "posX": (width / 2) - 30,
                "posY": 158,
                "width": 20,
                "height": 400,
            },
            "rectLineHorizon": {
                "posX": (width / 2) / 2,
                "posY": height / 2,
                "width": 700,
                "height": 20,
            },

        }

        fill("gray")
        rect(form.Rect.posX, form.Rect.posY, form.Rect.width, form.Rect.height, form.Rect.border)
        noStroke()
        fill(0, 0, 255,1)
        rect(form.rectLineVertical.posX, form.rectLineVertical.posY, form.rectLineVertical.width, form.rectLineVertical.height)
        noStroke()
        fill(0, 0, 255,1)
        rect(form.rectLineHorizon.posX, form.rectLineHorizon.posY, form.rectLineHorizon.width, form.rectLineHorizon.height)
        fill(0, 0, 255,10)
        ellipse(form.Cercle.posX - 20, form.Cercle.posY, form.Cercle.width)
    }

    this.goNextScene = () => {
        SceneManager.showNextScene()
    }
}