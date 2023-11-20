/**
 * If we want to get any informations of the assets, we can instantly do it with :
 * * Assets.get("nameofassets")
 */

var Assets = { }
var Instruments = { }

/**
 * This function return an asset by passing an asset slug
 * @param {string} asset_slug the slug of the asset to uppercase
 * @returns 
 */
Assets.get = (asset_slug) => Assets[asset_slug.toUpperCase()] !== undefined ? Assets[asset_slug.toUpperCase()] : null;


/**
 * Load assets 1 per 1
 * @param {string} path this is the path of the asset
 * @param {string} assetname this is the name of the asset
 * @param {array[int]} _assetIterator this is an array of one int, cause it's a reference
 */
function loadAssets(path, assetname, _assetIterator){
    fetch(path)
        .then(res => res.json())
        .then(res => { 
            Assets[assetname] = res;
            _assetIterator[0]++
            (_assetIterator[0] === Object.keys(ASSETSPATH).length) ? isAssetsLoaded = true : isAssetsLoaded = false
            assetsLoaded(assetname)
        })
}

/**
 * A function called after an asset is loaded
 * @param {string} assetname 
 */
function assetsLoaded (assetname){
    if(DEBUGMODE === true)
        console.log("Extra Load for : - " + assetname)

    switch(assetname){
        case "INSTRUMENTS":
            // This code will add to the instruments object a new synth with every sample of
            // the instruments in the instrument.json
            for(instrument of Object.keys(Assets.get(assetname).instruments)){
                Instruments[instrument] = new Tone.Sampler({
                    urls: Assets.get(assetname).instruments[instrument],
                    baseUrl: "./"
                })
            }
            break;
        case "SONGS":
            // Fetch the differents melody in the assets and set it to the melody key
            fetchSongs()
            break;
        default :
            console.log("Extra Load Not registered for : - " + assetname)
            break;
    }
}

const fetchSongs = () => {
    let assetname = "SONGS";
    for (let i = 0; i < Assets[assetname].songs.length; i++) {
        const song = Assets[assetname].songs[i];
        fetch(song.melo_principal.melody_url)
            .then(res => res.json())
            .then(res => {
                song.melo_principal["melody"] = res
            })
    }
}

/**
 * Just load all Assets
 * @param {Object} _ASSETSPATH 
 */
function loadAllAssets(_ASSETSPATH){
    // Need to tell the variable she is in an array to make it a reference for a function
    // This is probably stupid but it is the only solution i found quickly
    var assetsIterator = [0]
    for(assetsName of Object.keys(_ASSETSPATH)){
        loadAssets(_ASSETSPATH[assetsName], assetsName, assetsIterator);
    }
}

loadAllAssets(ASSETSPATH)
