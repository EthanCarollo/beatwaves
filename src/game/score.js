const alphabeticalNotation = [
    {
        "note" : "S",
        "minPercent": 94,
        "scoreMin": null
    },
    {
        "note" : "A",
        "minPercent": 84,
        "scoreMin": null
    },
    {
        "note" : "B",
        "minPercent": 68,
        "scoreMin": null
    },
    {
        "note" : "C",
        "minPercent": 52,
        "scoreMin": null
    },
    {
        "note" : "D",
        "minPercent": 36,
        "scoreMin": null
    },
    {
        "note" : "E",
        "minPercent": 20,
        "scoreMin": null
    },
    {
        "note" : "F",
        "minPercent": 0,
        "scoreMin": null
    }
]

// Good by threshold, hello score

function getScore(keyTouch, totalKey){
    let percent = (keyTouch*100/totalKey)
    let rating = alphabeticalNotation.find(element => element.minPercent < percent).note
    return{
        "keysTouch": keyTouch,
        "totalsKey": totalKey,
        "keysMiss" : totalKey - keyTouch,
        "maximumScore": (totalKey*100)*totalKey*1.5+" pts",
        "playerScore": percent*totalKey*1.5+" pts",
        "successPercentage": percent+"%",
        "playerRating": rating
    }
}