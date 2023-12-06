
const DEBUGMODE = true;

const ASSETSPATH = {
    SONGS: "./resources/songs/songs.json",
    INSTRUMENTS: "./resources/instruments/instruments.json",
    IMAGES: "./resources/image.json"
}
var isAssetsLoaded = false;

var sceneIsLoad = false;
var audioIsLoad = false;



// Pose net var
var video = undefined;
var poseNet;
var poses;
var poseNetOptions = {
    imageScaleFactor: 0.3,
    minConfidence: 0.5,
    maxPoseDetections: 1,
    flipHorizontal: true,
    outputStride: 16,
    multiplier: 0.75,
    inputResolution: 257,
    nmsRadius: 30
}
var socketHandPosition = {
    "right" : {
        "x" : 0,
        "y" : 0
    },
    "left" : {
        "x" : 0,
        "y" : 0
    }
}
var loadingMouse = 0;