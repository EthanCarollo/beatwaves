const alphabeticalNotation = {
    "S": {
        "pourcent": 94,
        "scoreMin": null
    },
    "A": {
        "pourcent": 84,
        "scoreMin": null
    },
    "B": {
        "pourcent": 68,
        "scoreMin": null
    },
    "C": {
        "pourcent": 52,
        "scoreMin": null
    },
    "D": {
        "pourcent": 36,
        "scoreMin": null
    },
    "E": {
        "pourcent": 20,
        "scoreMin": null
    },
    "F": {
        "pourcent": 4,
        "scoreMin": null
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
        let scorePlayer, isLower

        if (keyTouch < keyMiss) {
            scorePlayer = (keyTouch - keyMiss) + (keyMiss)
        } else {
            scorePlayer = (keyTouch) - (keyMiss)
        }

        return {
            "scorePlayer": scorePlayer,
            "maxRating": (keyTouch + keyMiss),
            "touch": keyTouch,
            "miss": keyMiss,
            "isLower": isLower
        }
    }

    /**
    * This function will return an object that contains the entire object alphabeticalNotation so that it returns the same object with the points due to hit and miss
    * ! ADVERTISEMENT : This function is not responsive with the alphabetical variable, so don't touch it, we don't know why, but when we change it, it all mess up
    * @param {object} resultNotation an object with important values ​​retrieved previously
    * @returns {object} return a key object
    */
    const gradeThreshold = (resultNotation) => {
        const newNotation = {};

        newNotation['S'] = {
            pourcent: 100,
            scoreMin: resultNotation,
        };

        let currentScoreMin = resultNotation;
        ['A', 'B', 'C', 'D', 'E', 'F'].forEach((grade, index) => {
            const reduction = Math.round(resultNotation / 6);
            const scoreMin = Math.max(currentScoreMin - reduction, 0);

            newNotation[grade] = {
                pourcent: alphabeticalNotation[grade].pourcent,
                scoreMin: scoreMin,
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
            if (scorePlayer >= info.scoreMin) {
                if (!matchingGrades.Min || info.scoreMin > matchingGrades.Min.scoreMin) {
                    matchingGrades.Min = { grade: grade, pourcent: info.pourcent, scoreMin: info.scoreMin };
                }
            } else if (!matchingGrades.Max || info.scoreMin < matchingGrades.Max.scoreMin) {
                matchingGrades.Max = { grade: grade, pourcent: info.pourcent, scoreMax: info.scoreMin };
            }
        });
        return matchingGrades
    }

    /**
    * This function will return the value between two percentage
    * @param {string} valueScorePlayer a player score string
    * @param {string} valueMaxRating a string that contains the maximum value of the keys
    * @returns {string} return a string
    */
    function valueTwoPercentage(valueScorePlayer, valueMaxRating) {
        let proportion = valueScorePlayer * 100 / valueMaxRating

        return proportion;
    }

    //! This variable allows the use of data and easier readability
    let score = {
        "scoreMin": thresholdLevelPoint(gradeThreshold(resultScore(keyTouch, keyMiss).maxRating), resultScore(keyTouch, keyMiss).scorePlayer).Min.scoreMin,
        "scoreMax": thresholdLevelPoint(gradeThreshold(resultScore(keyTouch, keyMiss).maxRating), resultScore(keyTouch, keyMiss).scorePlayer).Max.scoreMax,
        "minPourcent": thresholdLevelPoint(gradeThreshold(resultScore(keyTouch, keyMiss).maxRating), resultScore(keyTouch, keyMiss).scorePlayer).Min.pourcent,
        "scoreMaxPourcent": thresholdLevelPoint(gradeThreshold(resultScore(keyTouch, keyMiss).maxRating), resultScore(keyTouch, keyMiss).scorePlayer).Max.pourcent,
        "note": thresholdLevelPoint(gradeThreshold(resultScore(keyTouch, keyMiss).maxRating), resultScore(keyTouch, keyMiss).scorePlayer).Min.grade
    }

    //! This variable collects all the information for the dataviz at the end of the game
    allInformationScore = {
        "keysTouch": resultScore(keyTouch, keyMiss).touch,
        "keysMiss": resultScore(keyTouch, keyMiss).miss,
        "maximumScore": resultScore(keyTouch, keyMiss).maxRating + " pts",
        "playerScore": resultScore(keyTouch, keyMiss).scorePlayer + " pts",
        "successPercentage": Math.round(valueTwoPercentage(resultScore(keyTouch, keyMiss).scorePlayer,resultScore(keyTouch, keyMiss).maxRating,)) + "%",
        "playerRating": score.note
    }

    if(allInformationScore.playerRating === "F"){
        character("ratingF")
    }else{
        character("ratingAbove")
    }

    console.log(allInformationScore)

    return allInformationScore
}