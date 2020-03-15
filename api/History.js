class History {
    history = [];

    add(game) {
        game.date = Date.now();
        this.history.push(game);
    }

    all() {
        return this.history.map(game => ({
            date: game.date,
            winner: game.winner,
            squares: game.squares,
        }));
    }

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
