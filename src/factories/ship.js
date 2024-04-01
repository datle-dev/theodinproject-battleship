export default function Ship (shipLength) {
    let hitCount = 0;
    // let shipLength = shipLength
    let isSunkStatus = false;

    const hit = () => {
        hitCount++;
    };

    const getHits = () => {
        return hitCount;
    };

    const isSunk = () => {
        if (hitCount == shipLength) {
            return true;
        }
    };

    return {
        hit,
        getHits,
        isSunk,
    };
}

