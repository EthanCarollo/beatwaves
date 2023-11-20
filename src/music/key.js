let keyOnMap = []
let keyWidth = 40
let keyHeight = 40
let keySpeed = 0.25
let centerOfMap;
const alphabeticalNotation = {
    "S": {
        "Pourcent": 100,
        "ScoreMin": null
    },
    "A": {
        "Pourcent": 84,
        "ScoreMin": null
    },
    "B": {
        "Pourcent": 68,
        "ScoreMin": null
    },
    "C": {
        "Pourcent": 52,
        "ScoreMin": null
    },
    "D": {
        "Pourcent": 36,
        "ScoreMin": null
    },
    "E": {
        "Pourcent": 20,
        "ScoreMin": null
    },
    "F": {
        "Pourcent": 4,
        "ScoreMin": null
    }
}


// Function called on every resize of the window & at the start of the game
const initializeCenterOfWindow = () => {
    centerOfMap = new createVector(width / 2, height / 2)
}

// Function called every frames to show the key on map
const showKeyOnMap = (handPoseHist) => {
    for (key of keyOnMap) {
        if (key.isClean === true) {
            fill(0, 0, 255)
        } else {
            fill(255, 0, 0)
        }
        rect(key.position.x - keyWidth / 2, key.position.y - keyHeight / 2, 20, 20)
        keyIsInside(handPoseHist, key)
    }
}

/**
 * Check if the key is inside a rail
 * @param {*} handPoseHistory 
 * @param {*} key 
 */
const keyIsInside = (handPoseHistory, key) => {
    let trailSize = 15;
    fill(255, 255, 255, 120)
    let cnt = 0
    // Boucle on the right hand history
    for (let i = 1; i < handPoseHistory.right.length; i++) {
        // Draw of the back of that
        const hand = handPoseHistory.right[i];
        let edge1 = {
            x1: hand.position.x - trailSize,
            y1: hand.position.y,
            x2: handPoseHistory.right[i - 1].position.x - trailSize,
            y2: handPoseHistory.right[i - 1].position.y
        }
        if (keyIsInEdge(key, edge1) === true) {
            cnt++
        }

        let edge2 = {
            x1: hand.position.x + trailSize,
            y1: hand.position.y,
            x2: handPoseHistory.right[i - 1].position.x + trailSize,
            y2: handPoseHistory.right[i - 1].position.y
        }
        if (keyIsInEdge(key, edge2) === true) {
            cnt++
        }
        line(edge1.x1, edge1.y1, edge1.x2, edge1.y2)
        line(edge2.x1, edge2.y1, edge2.x2, edge2.y2)
        //circle(hand.position.x, hand.position.y, 15, 15)
    }
    fill(255, 0, 0)
    if (cnt % 2 === 1) {
        key.isClean = true
    }
}

/**
 * Check if the key is between some edge
 * @param {*} key 
 * @param {*} edge 
 * @returns 
 */
function keyIsInEdge(key, edge) {
    if ((key.position.y < edge.y1) !== (key.position.y < edge.y2) &&
        key.position.x < edge.x1 + ((key.position.y - edge.y1) / (edge.y2 - edge.y1)) * (edge.x2 - edge.x1)) {
        return true
    }
    return false
}

// Function called every frame if we need to moove the key on map
const mooveKeyOnMap = () => {
    // Moove or play the key !
    for (key of keyOnMap) {
        // Every key is necessary going to the center of the map
        key.position === centerOfMap ? playKey(key) : mooveKeyTo(key, centerOfMap)
    }

    // Second verification where we chech if a key has been played or no
    // ? If we wan't to save some statistics, we can do it here !
    for (let i = 0; i < keyOnMap.length; i++) {
        (keyOnMap[i].isPlayed === true) ? keyOnMap.splice(i, 1) : null;
    }
}

/**
 * moove the coordonate of key to another coord
 * @param {object} key the key from getRandomKey for example
 * @param {p5.vector} destination a simple p5 vector for the destination
 */
const mooveKeyTo = (key, destination) => {
    (Math.abs(key.position.x - destination.x) < 0.1 && Math.abs(key.position.y - destination.y) < 0.1)
        ? key.position = centerOfMap
        : key.position.lerp(destination, keySpeed / 15)
}

/**
 * Play a note normally, take the key and woopala
 * @param {object} key 
 */
const playKey = (key) => {
    if (DEBUGMODE === true)
        console.log("/-- Key has been played --/")
    // ! Temporary use 8n for the vel, it is just for debugging actually because i didn't
    // ! find any other solutions
    key.instr.triggerAttackRelease(key.note, "8n");
    key.isPlayed = true;
}

/**
 * This function will just return a random key actually
 * @param {string} note a string like C5, C#5, F5,...
 * @param {float} velocity the velocity of the key
 * @param {Instrument} instrument an instrument from tone js used for the key
 * @returns {object} return a key object
 */
const getRandomKey = (note, velocity, instrument = classicSynth) => {
    // This will generate a random position for the key actually
    let isHorizontal = getRandomBool()
    let xPosition = isHorizontal ? getRandomInt(width) : (getRandomBool() ? width : 0)
    let yPosition = isHorizontal ? (getRandomBool() ? height : 0) : getRandomInt(height)
    return {
        position: createVector(xPosition, yPosition), // Position on map of the note
        note: note, // The note of... the note..
        isClean: false,
        vel: velocity, // The velocity of the note
        isPlayed: false, // If the note is played or no
        instr: instrument, // The instrument of the note
    }
}


/**
 * This function will return all the values ​​at the end of the game! (dataviz)
 * @param {string} keyTouch a string for touch key values
 * @param {string} keyMiss a string for missed key values
 * @returns {object} return a key object
*/
const overallScore = (keyTouch, keyMiss) => {

    /**
    * This function will return 4 values ​​including the score, maximum score, hits and misses
    * @param {string} keyTouch a string for touch key values
    * @param {string} keyMiss a string for missed key values
    * @returns {object} return a key object
    */
    const resultScore = (keyTouch, keyMiss) => {
        let score
        return score = {
            "ScorePlayer": (keyTouch * 300) - (keyMiss * 200),
            "MaxRating": (keyTouch + keyMiss) * 300,
            "Touch": keyTouch,
            "Miss": keyMiss
        }
    }

    /**
    * This function will return an object that contains the entire object alphabeticalNotation so that it returns the same object with the points due to hit and miss
    * @param {object} resultNotation an object with important values ​​retrieved previously
    * @returns {object} return a key object
    */
    const gradeThreshold = (resultNotation) => {
        const newNotation = {};

        newNotation['S'] = {
            Pourcent: 100,
            ScoreMin: resultNotation,
        };

        let currentScoreMin = resultNotation;

        ['A', 'B', 'C', 'D', 'E', 'F'].forEach((grade, index) => {
            const reduction = Math.round(resultNotation / 6);
            const scoreMin = Math.max(currentScoreMin - reduction, 0);

            newNotation[grade] = {
                Pourcent: alphabeticalNotation[grade].Pourcent,
                ScoreMin: scoreMin,
            };

            currentScoreMin = scoreMin;
        });

        return newNotation;
    };

    /**
    * This function will return an object with higher or lower rating values ​​to the player
    * @param {object} gradeThreshold an object with values ​​retrieved previously
    * @param {string} scorePlayer a player score string
    * @returns {object} return a key object
    */
    function thresholdLevelPoint(gradeThreshold, scorePlayer) {
        const matchingGrades = {
            Max: null,
            Min: null,
        };

        Object.entries(gradeThreshold).forEach(([grade, info]) => {
            if (scorePlayer >= info.ScoreMin) {
                if (!matchingGrades.Min || info.ScoreMin > matchingGrades.Min.ScoreMin) {
                    matchingGrades.Min = { Grade: grade, Pourcent: info.Pourcent, ScoreMin: info.ScoreMin };
                }
            } else if (!matchingGrades.Max || info.ScoreMin < matchingGrades.Max.ScoreMin) {
                matchingGrades.Max = { Grade: grade, Pourcent: info.Pourcent, ScoreMax: info.ScoreMin };
            }
        });
        return matchingGrades
    }

    /**
    * This function will return the value between two percentage
    * @param {string} valueScorePlayer a player score string
    * @param {string} valueMin a string that contains the minimum value of the rating lower than the player
    * @param {string} valueMax a string that contains the maximum value of the player's higher rating
    * @param {string} percentageMin a string that contains the minimum value of the player's bottom percentage
    * @param {string} percentageMax a string that contains the maximum value of the player's highest percentage
    * @returns {object} return a key object
    */
    function valueTwoPercentage(valueScorePlayer, valueMinRating, valueMaxRating, percentageMinRating, percentageMaxRating) {
        let differencePercentage = percentageMaxRating - percentageMinRating;

        let proportion = differencePercentage * ((valueScorePlayer - valueMinRating) / (valueMaxRating - valueMinRating));

        let percentageFinal = percentageMinRating + proportion;

        return percentageFinal;
    }

    // This variable allows the use of data and easier readability
    let score = {
        "ScoreMin": thresholdLevelPoint(gradeThreshold(resultScore(keyTouch, keyMiss).MaxRating), resultScore(keyTouch, keyMiss).ScorePlayer).Min.ScoreMin,
        "ScoreMax": thresholdLevelPoint(gradeThreshold(resultScore(keyTouch, keyMiss).MaxRating), resultScore(keyTouch, keyMiss).ScorePlayer).Max.ScoreMax,
        "MinPourcent": thresholdLevelPoint(gradeThreshold(resultScore(keyTouch, keyMiss).MaxRating), resultScore(keyTouch, keyMiss).ScorePlayer).Min.Pourcent,
        "ScoreMaxPourcent": thresholdLevelPoint(gradeThreshold(resultScore(keyTouch, keyMiss).MaxRating), resultScore(keyTouch, keyMiss).ScorePlayer).Max.Pourcent,
        "Note": thresholdLevelPoint(gradeThreshold(resultScore(keyTouch, keyMiss).MaxRating), resultScore(keyTouch, keyMiss).ScorePlayer).Min.Grade
    }

    //! This variable collects all the information for the dataviz at the end of the game
    allInformationScore = {
        "Keys touch": resultScore(keyTouch, keyMiss).Touch,
        "Keys miss": resultScore(keyTouch, keyMiss).Miss,
        "Maximum score": resultScore(keyTouch, keyMiss).MaxRating + " pts",
        "Maximum score": resultScore(keyTouch, keyMiss).MaxRating + " pts",
        "Player Score": resultScore(keyTouch, keyMiss).ScorePlayer + " pts",
        "Success percentage": valueTwoPercentage(resultScore(keyTouch, keyMiss).ScorePlayer, score.ScoreMin, score.ScoreMax, score.MinPourcent, score.ScoreMaxPourcent) + "%",
        "Player rating": score.Note
    }
    console.log(allInformationScore)
}