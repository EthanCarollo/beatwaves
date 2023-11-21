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
            isLower = true
            scorePlayer = 0
        } else {
            isLower = false
            scorePlayer = (keyTouch * 300) - (keyMiss * 200)
        }

        return {
            "scorePlayer": scorePlayer,
            "maxRating": (keyTouch + keyMiss) * 300,
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
    function thresholdLevelPoint(gradeThreshold, scorePlayer, isLower) {
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
            } else if (isLower) {
                matchingGrades.Min = { grade: "F", pourcent: info.pourcent, scoreMin: info.scoreMin };
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
    function valueTwoPercentage(valueScorePlayer, valueMinRating, valueMaxRating, percentageMinRating, percentageMaxRating, isLower) {
        let percentageFinal
        if (isLower) {

            percentageFinal = "0"

            return percentageFinal;

        } else {

            let differencePercentage = percentageMaxRating - percentageMinRating;

            let proportion = differencePercentage * ((valueScorePlayer - valueMinRating) / (valueMaxRating - valueMinRating));

            percentageFinal = percentageMinRating + proportion;

            return percentageFinal;
        }
    }

    //! This variable allows the use of data and easier readability
    let score = {
        "scoreMin": thresholdLevelPoint(gradeThreshold(resultScore(keyTouch, keyMiss).maxRating), resultScore(keyTouch, keyMiss).scorePlayer, resultScore(keyTouch, keyMiss).isLower).Min.scoreMin,
        "scoreMax": thresholdLevelPoint(gradeThreshold(resultScore(keyTouch, keyMiss).maxRating), resultScore(keyTouch, keyMiss).scorePlayer, resultScore(keyTouch, keyMiss).isLower).Max.scoreMax,
        "minPourcent": thresholdLevelPoint(gradeThreshold(resultScore(keyTouch, keyMiss).maxRating), resultScore(keyTouch, keyMiss).scorePlayer, resultScore(keyTouch, keyMiss).isLower).Min.pourcent,
        "scoreMaxPourcent": thresholdLevelPoint(gradeThreshold(resultScore(keyTouch, keyMiss).maxRating), resultScore(keyTouch, keyMiss).scorePlayer, resultScore(keyTouch, keyMiss).isLower).Max.pourcent,
        "note": thresholdLevelPoint(gradeThreshold(resultScore(keyTouch, keyMiss).maxRating), resultScore(keyTouch, keyMiss).scorePlayer, resultScore(keyTouch, keyMiss).isLower).Min.grade
    }

    //! This variable collects all the information for the dataviz at the end of the game
    allInformationScore = {
        "keysTouch": resultScore(keyTouch, keyMiss).touch,
        "keysMiss": resultScore(keyTouch, keyMiss).miss,
        "maximumScore": resultScore(keyTouch, keyMiss).maxRating + " pts",
        "playerScore": resultScore(keyTouch, keyMiss).scorePlayer + " pts",
        "successPercentage": Math.round(valueTwoPercentage(resultScore(keyTouch, keyMiss).scorePlayer, score.scoreMin, score.scoreMax, score.minPourcent, score.scoreMaxPourcent, resultScore(keyTouch, keyMiss).isLower)) + "%",
        "playerRating": score.note
    }
    console.log(allInformationScore)

    return allInformationScore
}