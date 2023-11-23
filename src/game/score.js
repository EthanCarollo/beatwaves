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
*  @param {string} totalsKey a string for missed key values
 * @returns {object} return a key object
*/
const overallScore = (keyTouch, totalsKey, keyMiss ) => {
    let scoreMin, minPourcent, scoreMaxPourcent, note


    /**
    * This function will return 4 values ​​including the score, maximum score, hits and misses
    * @param {string} keyTouch a string for touch key values
    * @param {string} totalsKey a string for total key values
    * @returns {object} return a key object
    */
    const resultScore = (keyTouch, totalsKey) => {
        let scorePlayer, isLower

        if (keyTouch < totalsKey) {
            scorePlayer = (keyTouch - totalsKey) + (totalsKey)
        } else {
            scorePlayer = (keyTouch) - (totalsKey)
        }

        return {
            "scorePlayer": scorePlayer,
            "maxRating": (keyTouch + totalsKey),
            "touch": keyTouch,
            "miss": totalsKey,
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
            } else if (scorePlayer <= 0) {
                matchingGrades.Min = { grade: "F", pourcent: "0", scoreMin: "0" };
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

    scoreMin = thresholdLevelPoint(gradeThreshold(resultScore(keyTouch, totalsKey).maxRating), resultScore(keyTouch, totalsKey).scorePlayer).Min.scoreMin
    minPourcent = thresholdLevelPoint(gradeThreshold(resultScore(keyTouch, totalsKey).maxRating), resultScore(keyTouch, totalsKey).scorePlayer).Min.pourcent
    scoreMaxPourcent = thresholdLevelPoint(gradeThreshold(resultScore(keyTouch, totalsKey).maxRating), resultScore(keyTouch, totalsKey).scorePlayer).Max.pourcent
    note = thresholdLevelPoint(gradeThreshold(resultScore(keyTouch, totalsKey).maxRating), resultScore(keyTouch, totalsKey).scorePlayer).Min.grade


    let score = {
        "scoreMin": 0,
        "scoreMax": thresholdLevelPoint(gradeThreshold(resultScore(keyTouch, totalsKey).maxRating), resultScore(keyTouch, totalsKey).scorePlayer).Max.scoreMax,
        "minPourcent": 0,
        "scoreMaxPourcent": 0,
        "note": "F"
    }

    if (scoreMin && minPourcent && scoreMaxPourcent && note != null) {
        score.scoreMin = scoreMin
        score.minPourcent = minPourcent
        score.scoreMaxPourcent = scoreMaxPourcent
        score.note = note
    }

    //! This variable collects all the information for the dataviz at the end of the game
    allInformationScore = {
        "keysTouch": resultScore(keyTouch, totalsKey).touch,
        "totalsKeys": resultScore(keyTouch, totalsKey).miss,
        "keysMiss": keyMiss,
        "maximumScore": resultScore(keyTouch, totalsKey).maxRating + " pts",
        "playerScore": resultScore(keyTouch, totalsKey).scorePlayer + " pts",
        "successPercentage": Math.round(valueTwoPercentage(resultScore(keyTouch, totalsKey).scorePlayer, resultScore(keyTouch, totalsKey).maxRating,)) + "%",
        "playerRating": score.note
    }

    if (allInformationScore.playerRating === "F") {
        spawnCharacter("ratingF")
    } else {
        spawnCharacter("aboveB")
    }

    return allInformationScore
}