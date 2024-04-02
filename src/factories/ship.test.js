import Ship from './ship';

describe('ship functions', () => {
    let ship;

    beforeEach(() => {
        ship = Ship(3);
    });

    it('registers a hit', () => {
        expect(ship.hit()).toBe(1);
    });

    it('knows it has been sunk', () => {
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBeTruthy();
    });
});