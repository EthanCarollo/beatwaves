/**
 * If we want to get any informations of the assets, we can instantly do it with :
 * * Assets.get("nameofassets")
 */

var Assets = { }

/**
 * This function return an asset 
 * @param {string} asset_slug the slug of the asset to uppercase
 * @returns 
 */
Assets.get = (asset_slug) => (isAssetsLoaded === true) ? (Assets[asset_slug.toUpperCase()] !== undefined ? Assets[asset_slug.toUpperCase()] : null) : null;


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
        })
}

/**
 * Just load all Assets
 * @param {Object} _ASSETSPATH 
 */
function loadAllAssets(_ASSETSPATH){
    // Need to tell the variable she is in an array to make it a reference for a function
    var assetsIterator = [0]
    for(assetsName of Object.keys(_ASSETSPATH)){
        loadAssets(_ASSETSPATH[assetsName], assetsName, assetsIterator);
    }
}

loadAllAssets(ASSETSPATH)
