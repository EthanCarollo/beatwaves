let scoreHand = {
    "right" : 0,
    "left" : 0
}

function showHandTrail(handPoseHistory, hand){
    let spBef = null
    let _color = "#FF007D"
    stroke(_color);
    fill(_color);

    for(let i = 0; i < handPoseHistory.length; i++){
        if(i === 0){
            continue;
        }

        // This function will draw the trail of the hand of the player

        hand1=handPoseHistory[i]
        hand2=handPoseHistory[i-1]

        lifeX1 = Math.abs(hand1.position.x-hand2.position.x) > Math.abs(hand1.position.y-hand2.position.y) ? hand1.life/PI - 2: hand1.life
        lifeY1 = Math.abs(hand1.position.x-hand2.position.x) > Math.abs(hand1.position.y-hand2.position.y) ? hand1.life: hand1.life/PI - 2
        lifeX2 = Math.abs(hand1.position.x-hand2.position.x) > Math.abs(hand1.position.y-hand2.position.y) ? hand2.life/PI - 2 : hand2.life
        lifeY2 = Math.abs(hand1.position.x-hand2.position.x) > Math.abs(hand1.position.y-hand2.position.y) ? hand2.life: hand2.life/PI - 2


        let fp1 = {x: hand1.position.x - lifeX1, y: hand1.position.y-lifeY1}
        let fp2 = {x: hand1.position.x + lifeX1, y: hand1.position.y+lifeY1}
        let sp1 = {x: hand2.position.x + lifeX2, y: hand2.position.y+lifeY2}
        let sp2 = {x: hand2.position.x - lifeX2, y: hand2.position.y-lifeY2}

        quad(fp1.x, fp1.y, fp2.x, fp2.y, sp1.x, sp1.y, sp2.x, sp2.y)

        if(spBef !== null){
            quad(sp1.x, sp1.y, sp2.x, sp2.y, spBef.p1.x, spBef.p1.y, spBef.p2.x, spBef.p2.y)
        }
        spBef = {
            p1:{x: hand1.position.x - lifeX1, y: hand1.position.y-lifeY1},
            p2:{x: hand1.position.x + lifeX1, y: hand1.position.y+lifeY1}
        };

        for (let j = 0; j < keyOnMap.length; j++) {
            if(keyOnMap[j].isClean === true){
                continue;
            }
            let cnt = 0;
            const key = keyOnMap[j];

            let edge1 = {
                x1: fp1.x,
                y1: fp1.y,
                x2: fp2.x,
                y2: fp2.y
            }
            if (keyIsInEdge(key, edge1) === true) {
                cnt++
            }
            let edge2 = {
                x1: sp1.x,
                y1: sp1.y,
                x2: sp2.x,
                y2: sp2.y
            }
            if (keyIsInEdge(key, edge2) === true) {
                cnt++
            }

            let edge3 = {
                x1: fp2.x,
                y1: fp2.y,
                x2: sp1.x,
                y2: sp1.y
            }
            if (keyIsInEdge(key, edge3) === true) {
                cnt++
            }

            let edge4 = {
                x1: fp1.x,
                y1: fp1.y,
                x2: sp2.x,
                y2: sp2.y
            }
            if (keyIsInEdge(key, edge4) === true) {
                cnt++
            }

            if (cnt % 2 === 1 && keyOnMap[j].isClean !== true) {
                key.touchedBy = hand
                key.isClean = true
            }
            
        }
    }

    if(handPoseHistory.length > 0){
        circle(handPoseHistory[handPoseHistory.length-1].position.x, handPoseHistory[handPoseHistory.length-1].position.y, handLifeTime*2+1)
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