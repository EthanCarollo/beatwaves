function spawnCharacter(status) {

    // Set the image for the character
    let imgCharacter = {
        "mainMenu": Assets.get("IMAGES").data[2].url,
        "combo": Assets.get("IMAGES").data[3].url,
        "aboveB": Assets.get("IMAGES").data[4].url,
        "ratingF": Assets.get("IMAGES").data[5].url,
    }

    // Make the character image spawn
    let characterDiv = document.createElement("img")
    characterDiv.style.position = "absolute"
    characterDiv.style.left = "2vw"
    characterDiv.style.bottom = "-20vw";
    characterDiv.style.width = "20vw"
    characterDiv.classList.add("character_div")
    characterDiv.src = imgCharacter[status]
    document.body.appendChild(characterDiv)

    // Animate the coming of the character
    anime({
        targets: ".character_div",
        bottom: "0vw",
        delay: 0,
        duration: 800,
        endDelay: 2000,
        easing:"easeInOutQuad",
        complete: () => {
            anime({
                targets: ".character_div",
                bottom: "-20vw",
                delay: 1000,
                duration: 800,
                easing:"easeInOutQuad",
                complete: () => {
                    characterDiv.remove()
                }
            })
        }
    })
}