export default function Player () {
    let active = false;
    let moves = [];
    let hits = [];
    let misses = [];
    let prevGuessWasHit = false;

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            moves.push(String(i) + String(j))
        }
    }

    const isTurnActive = () => {
        return active;
    };

    const toggleTurn = () => {
        active = !active;
    };

    const guess = () => {
        let index;
        if (moves.length === 1) {
            index = 0;
        } else {
            index = getRandIntIncl(0, moves.length - 1);
        }
        return moves[index];
    };

    const getRandIntIncl = (min, max) => {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    };

    const addHit = (coords) => {
        const index = moves.indexOf(coords);
        console.log(index);
        moves.splice(index, 1);
        hits.push(coords);
        prevGuessWasHit = true;
    };

    const addMiss = (coords) => {
        const index = moves.indexOf(coords);
        moves.splice(index, 1);
        misses.push(coords);
        prevGuessWasHit = false;
    };

    const getMoves = () => {
        return moves;
    };

    const getHits = () => {
        return hits;
    };

    const getMisses = () => {
        return misses;
    };

    const isPreviousGuessHit = () => {
        return prevGuessWasHit;
    };

    return {
        isTurnActive,
        toggleTurn,
        guess,
        addHit,
        addMiss,
        getMoves,
        getHits,
        getMisses,
        isPreviousGuessHit,
    };

}
