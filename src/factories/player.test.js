import Player from './player';

describe('player functions', () => {
    const boardMinX = 0;
    const boardMinY = 0;
    const boardMaxX = 9;
    const boardMaxY = 9;
    let player;

    beforeEach(() => {
        player = Player();
    });

    it('knows if its turn is active', () => {
        expect(player.isTurnActive()).toBeFalsy();
    });
    
    it('can toggle whether its turn is active', () => {
        expect(player.isTurnActive()).toBeFalsy();
        player.toggleTurn();
        expect(player.isTurnActive()).toBeTruthy();
    })

    it('can make a random guess (generate coords) within board bounds', () => {
        let coords = player.guess();
        const x = Number(coords.charAt(0));
        const y = Number(coords.charAt(1));
        expect(x).toBeGreaterThanOrEqual(boardMinX);
        expect(y).toBeGreaterThanOrEqual(boardMinY);
        expect(x).toBeLessThanOrEqual(boardMaxX);
        expect(y).toBeLessThanOrEqual(boardMaxY);
    });

    it('can be informed of and knows its misses', () => {
        player.addMiss('22');
        player.addMiss('09');
        expect(player.getMisses()).toContainEqual('22');
        expect(player.getMisses()).toContainEqual('09');
    });

    it('can be informed of and knows its hits', () => {
        player.addHit('22');
        player.addHit('09');
        expect(player.getHits()).toContainEqual('22');
        expect(player.getHits()).toContainEqual('09');
    });

    it('does not repeat a previously made guess', () => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 10; j++) {
                player.addHit(String(i) + String(j));
            }
        }

        // available guesses should be in row 9 and any column
        let coords = player.guess();
        let x = Number(coords.charAt(0));
        let y = Number(coords.charAt(1));
        expect(x).toBe(9)
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThanOrEqual(9);
    });

    it('can make the only guess remaining', () => {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (!(i === 9 && j === 9)) {
                    player.addHit(String(i) + String(j));
                }
            }
        }

        expect(player.guess()).toBe('99');
    });

    it('knows if its previous guess was a hit', () => {
        player.addHit('11');
        expect(player.isPreviousGuessHit()).toBeTruthy();
        player.addMiss('22');
        expect(player.isPreviousGuessHit()).toBeFalsy();
    })
    
});
