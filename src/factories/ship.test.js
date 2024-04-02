import Ship from './ship';

describe('ship functions', () => {
    let ship;

    beforeEach(() => {
        ship = Ship(3);
    });

    it('registers a hit', () => {
        expect(ship.hit()).toBe(1);
    });

    it('can return its own length', () => {
        expect(ship.getLength()).toBe(3);
    });

    it('knows it has been sunk', () => {
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBeTruthy();
    });
});