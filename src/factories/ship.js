export default function Ship (length) {
    let hitCount = 0;

    const hit = () => {
        hitCount++;
        return hitCount;
    };

    const isSunk = () => {
        if (hitCount == length) {
            return true;
        }
    };

    const getLength = () => {
        return length;
    };
 
    return {
        hit,
        isSunk,
        getLength,
    };
}

