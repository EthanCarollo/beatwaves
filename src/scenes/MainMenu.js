/**
 * This is the Main Menu scene, played as the end of each game
 */
function MainMenu()
{
    var slider 
    // enter() will be executed each time the SceneManager switches
    // to this Scene
    this.enter = function()
    {
        background(255,255,255)
        this.setCarousselSlide() 
        // Create and mount the slider with splide, show the documentation here : https://splidejs.com/guides/
        this.slider = new Splide('#splide', {
            type: 'loop',
            perPage: 3,
            focus: 'center',
            arrows:false,
            autoplay: true,
            interval: 8000,
            flickMaxPages: 1,
            updateOnMove: true,
            pagination: false,
            padding: '-5%',
            gap: '3vw'
          }).mount();
    }

    this.setCarousselSlide = function(){
        // Show the game caroussel
        document.getElementById("game_caroussel").style.display = "flex"
        let splideList = document.getElementById("splide__list")
        splideList.innerHTML = ""
        for(song of Assets.get("songs").songs){
            // Happends the text document
            var doc = document.createElement("div")
            doc.classList.add("song_element")
            doc.classList.add("splide__slide")
            doc.innerHTML = "<h1>"+song.nameSong+"</h1>"
            splideList.appendChild(doc)

            var button = document.createElement("button")
            button.innerHTML = "Choose Music"
            button.addEventListener("click", () => {
                initializeMusic()
                this.goNextScene()
            })
            doc.appendChild(button)
        }
    }

    // draw() is the normal draw function, this function work like a scene
    this.draw = function(){

    }

    this.goNextScene = () => {
        document.getElementById("game_caroussel").style.display = "none"
        SceneManager.showNextScene()
    }
}