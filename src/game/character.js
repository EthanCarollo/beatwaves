function character(status) {
    
    let characterDiv = document.getElementById("character")

    let imgCharacter = {
        "mainMenu": Assets.get("IMAGES").data[2].url,
        "combo": Assets.get("IMAGES").data[3].url,
        "ratingAbove": Assets.get("IMAGES").data[4].url,
        "ratingF": Assets.get("IMAGES").data[5].url,
    }



    switch (status) {
        case "mainMenu":
            characterDiv.style.display = "block"
            characterDiv.src = imgCharacter.mainMenu
            break;

        case "ratingF":
            characterDiv.style.display = "block"
            characterDiv.src = imgCharacter.ratingF
            break;

        case "ratingAbove":
            characterDiv.style.display = "block"
            characterDiv.src = imgCharacter.aboveB
            break;

        case "combo":
            characterDiv.style.display = "block"
            characterDiv.src = imgCharacter.combo
            break;

        default:
            break;
    }

    //    console.log(Assets.get("IMAGES"))
    // console.log(Assets.get("IMAGES").data[1])
}