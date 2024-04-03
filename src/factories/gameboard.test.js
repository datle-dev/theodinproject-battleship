import Ship from './ship';
import GameBoard from './gameboard';

describe('gameboard functions', () => {
    const boardMinX = 0;
    const boardMinY = 0;
    const boardMaxX = 9;
    const boardMaxY = 9;
    let gameboard;
    let ship;
    let board;

    beforeEach(() => {
        gameboard = GameBoard();
        ship = Ship(3);
        board = {};

        for (let i = 0; i == boardMaxX; i++) {
            for (let j = 0; j == boardMaxY; j++) {
                board[String(i) + String(j)] = null;
            }
        }
    });

    it('can place a ship horizontally', () => {
        board['33'] = ship;
        board['43'] = ship;
        board['53'] = ship;
        expect(gameboard.placeShip(ship, '33', 'horizontal')).toEqual(board)
    });

    it('can place a ship vertically', () => {
        board['33'] = ship;
        board['34'] = ship;
        board['35'] = ship;
        expect(gameboard.placeShip(ship, '33', 'vertical')).toEqual(board)
    });

    it('throws error for invalid ship placement, horizontally in bottom right corner', () => {
        expect(() => {
            gameboard.placeShip(ship, '99', 'horizontal');
        }).toThrow(Error);
    });

    it('throws error for invalid ship placement, vertically in bottom right corner', () => {
        expect(() => {
            gameboard.placeShip(ship, '99', 'vertical');
        }).toThrow(Error);
    });

    it('throws error for invalid ship placement, horizontally in top right corner', () => {
        expect(() => {
            gameboard.placeShip(ship, '92', 'horizontal');
        }).toThrow(Error);
    });

    it('throws error for invalid ship placement, vertically in bottom left corner', () => {
        expect(() => {
            gameboard.placeShip(ship, '29', 'vertical');
        }).toThrow(Error);
    });

    it ('throws error for already occupied spaces', () => {
        gameboard.placeShip(ship, '33', 'horizontal')
        expect(() => {
            gameboard.placeShip(ship, '33', 'vertical');
        }).toThrow(Error);
    });

    it('registers a successful hit on a ship', () => {
        gameboard.placeShip(ship, '33', 'horizontal');
        expect(gameboard.receiveAttack('33')).toBeTruthy();
    });

    it('registers a miss', () => {
        gameboard.placeShip(ship, '33', 'horizontal');
        expect(gameboard.receiveAttack('22')).toBeFalsy();
    });

});

describe('end conditions', () => {
    const boardMinX = 0;
    const boardMinY = 0;
    const boardMaxX = 9;
    const boardMaxY = 9;
    let gameboard;
    let ship1;
    let ship2;
    let board;

    beforeEach(() => {
        gameboard = GameBoard();
        ship1 = Ship(3);
        ship2 = Ship(5);
        board = {};

        for (let i = 0; i == boardMaxX; i++) {
            for (let j = 0; j == boardMaxY; j++) {
                board[String(i) + String(j)] = null;
            }
        }

        gameboard.placeShip(ship1, '33', 'horizontal')
        gameboard.placeShip(ship2, '22', 'vertical')

    });

    it('knows when all ships are sunk', () => {
        ship1.hit();
        ship1.hit();
        ship1.hit();
        ship2.hit();
        ship2.hit();
        ship2.hit();
        ship2.hit();
        ship2.hit();
        expect(gameboard.isAllSunk()).toBeTruthy();
    });

    it('knows when all ships are not sunk yet', () => {
        ship1.hit();
        ship1.hit();
        // ship1.hit();
        ship2.hit();
        ship2.hit();
        ship2.hit();
        // ship2.hit();
        // ship2.hit();
        expect(gameboard.isAllSunk()).toBeFalsy();
    });

})