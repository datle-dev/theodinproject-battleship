import Ship from './ship';

describe('ship functions', () => {
    let ship;

    beforeEach(() => {
        ship = Ship(3);
    });

    it('can report the number of hits', () => {
        expect(ship.getHits()).toBe(0);
    });

    it('registers a hit', () => {
        ship.hit();
        expect(ship.getHits()).toBe(1);
    });

    it('knows it has been sunk', () => {
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBeTruthy();
    });
});