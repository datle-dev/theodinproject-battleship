export default function GameBoard () {
    const boardMinX = 0;
    const boardMinY = 0;
    const boardMaxX = 9;
    const boardMaxY = 9;

    let misses = [];
    let board = {};

    for (let i = 0; i == boardMaxX; i++) {
        for (let j = 0; j == boardMaxY; j++) {
            board[[i, j]] = null;
        }
    }

    const placeShip = (ship, coords, orientation) => {
        if (isValidPlacement(ship, coords, orientation)) {
            const x = coords[0];
            const y = coords[1];
            for (let i = 0; i < ship.getLength(); i++) {
                if (orientation === 'horizontal') {
                    board[[x + i, y]] = ship;
                } else if (orientation === 'vertical') {
                    board[[x, y + i]] = ship;
                }
            }
            return board;
        } else {
            throw new Error('Ship cannot be placed at that location');
        }
    };

    const isValidPlacement = (ship, coords, orientation) => {
        const shipLength = ship.getLength();
        let shipMinX;
        let shipMaxX;
        let shipMinY;
        let shipMaxY;
        const x = coords[0];
        const y = coords[1];

        shipMinX = x;
        shipMinY = y;
        if (orientation === 'horizontal') {
            shipMaxX = x + shipLength - 1;
            shipMaxY = y;
        } else if (orientation === 'vertical') {
            shipMaxX = x;
            shipMaxY = y + shipLength - 1;
        }

        if (
            shipMinX >= boardMinX
            && shipMaxX <= boardMaxX
            && shipMinY >= boardMinY
            && shipMaxY <= boardMaxY
        ) {
            return true;
        } else {
            return false;
        }

    };

    const receiveAttack = (coords) => {
        let ship = board[coords];
        if (ship != null) {
            ship.hit();
            return true;
        } else {
            misses.push(coords);
            return false;
        }
    };

    const isAllSunk = () => {
        for (let key of Object.keys(board)) {
            if (board[key] != null) {
                if (!board[key].isSunk()) {
                    return false;
                }
            }
        }
        return true;
    }

    return {
        placeShip,
        receiveAttack,
        isAllSunk,
    }
}
