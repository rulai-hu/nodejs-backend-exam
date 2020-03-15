class History {
    /**
     * History of games.
     * @type {Array}
     */
    history = [];

    /**
     * Add a game to the history.
     * @param {game} game
     */
    add(game) {
        game.date = Date.now();
        this.history.push(game);
    }

    /**
     * Return the entire history of games.
     * @return {[Object]}
     */
    all() {
        return this.history.map(game => ({
            date: game.date,
            winner: game.winner,
            squares: game.squares,
        }));
    }

    /**
     * Return the win/lose amounts for X and O.
     * @return {Object}
     */
    summarize() {
        return this.history.reduce(function(sum, game) {
            if (game.winner == 'X') {
                sum.x++;
            } else if (game.winner == 'O') {
                sum.o++;
            }

            return sum;
        }, { x: 0, o: 0 });
    }
}

module.exports = History;
