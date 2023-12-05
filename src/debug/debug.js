
function logGameInformations(){
    console.log('/----------------------------/');
    console.log('/----SCENE IS LOAD : '+sceneIsLoad+'----/');
    console.log('/----NUMBER OF SCENE : '+ SCENELIST.length + '-----/');
    console.log('/------DEBUG MODE : '+DEBUGMODE+'-----/');
    console.log('/----AUDIO LOADED : '+audioIsLoad+'----/');
    console.log('/---ASSETS LOADED : '+isAssetsLoaded+'----/');
    console.log('/----------------------------/');
}

drawDebugPose = (pose) => {
    if (!pose)
        return

    // Every position to draw on sketch
    const positionArray = [
        pose.pose.leftWrist,
        pose.pose.leftElbow,
        pose.pose.leftShoulder,
        pose.pose.leftAnkle,
        pose.pose.leftEye,
        pose.pose.rightWrist,
        pose.pose.rightElbow,
        pose.pose.rightShoulder,
        pose.pose.rightAnkle,
        pose.pose.rightEye,
    ]

    // For the debug, i boucle on the array of position and then draw every parts of the body
    // And for the color, i just check if we here in the second half of the array or not
    // Fill the color of the circle with the confidence
    for (let i = 0; i < positionArray.length; i++) {
        const elementPosition = positionArray[i];
        (i > (positionArray.length - 1) / 2) ? fill(255, 0, 0, elementPosition.confidence * 255) : fill(0, 255, 0, elementPosition.confidence * 255)
        circle(elementPosition.x, elementPosition.y, 30)
    }

    // Left 
    line(positionArray[0].x, positionArray[0].y, positionArray[1].x, positionArray[1].y)
    line(positionArray[1].x, positionArray[1].y, positionArray[2].x, positionArray[2].y)
    line(positionArray[2].x, positionArray[2].y, positionArray[3].x, positionArray[3].y)


    // Right
    line(positionArray[5].x, positionArray[5].y, positionArray[6].x, positionArray[6].y)
    line(positionArray[6].x, positionArray[6].y, positionArray[7].x, positionArray[7].y)
    line(positionArray[7].x, positionArray[7].y, positionArray[8].x, positionArray[8].y)
    

}