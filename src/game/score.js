
const alphabeticalNotation = {
    "S": {
        "Pourcent": 94,
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
    * ! ADVERTISEMENT : This function is not responsive with the alphabetical variable, so don't touch it, we don't know why, but when we change it, it all mess up
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
