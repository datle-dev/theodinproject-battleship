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
                board[[i, j]] = null;
            }
        }
    });

    it('can place a ship horizontally', () => {
        board[[3, 3]] = ship;
        board[[4, 3]] = ship;
        board[[5, 3]] = ship;
        expect(gameboard.placeShip(ship, [3, 3], 'horizontal')).toEqual(board)
    });

    it('can place a ship vertically', () => {
        board[[3, 3]] = ship;
        board[[3, 4]] = ship;
        board[[3, 5]] = ship;
        expect(gameboard.placeShip(ship, [3, 3], 'vertical')).toEqual(board)
    });

    it('throws error for invalid ship placement, horizontally in bottom right corner', () => {
        expect(() => {
            gameboard.placeShip(ship, [9, 9], 'horizontal');
        }).toThrow(Error);
    });

    it('throws error for invalid ship placement, vertically in bottom right corner', () => {
        expect(() => {
            gameboard.placeShip(ship, [9, 9], 'vertical');
        }).toThrow(Error);
    });

    it('throws error for invalid ship placement, horizontally in top right corner', () => {
        expect(() => {
            gameboard.placeShip(ship, [9, 2], 'horizontal');
        }).toThrow(Error);
    });

    it('throws error for invalid ship placement, vertically in bottom left corner', () => {
        expect(() => {
            gameboard.placeShip(ship, [2, 9], 'vertical');
        }).toThrow(Error);
    });

    it('registers a successful hit on a ship', () => {
        gameboard.placeShip(ship, [3, 3], 'horizontal');
        expect(gameboard.receiveAttack([3, 3])).toBeTruthy();
    });

    it('registers a miss', () => {
        gameboard.placeShip(ship, [3, 3], 'horizontal');
        expect(gameboard.receiveAttack([2, 2])).toBeFalsy();
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
                board[[i, j]] = null;
            }
        }

        gameboard.placeShip(ship1, [3, 3], 'horizontal')
        gameboard.placeShip(ship2, [2, 2], 'vertical')

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