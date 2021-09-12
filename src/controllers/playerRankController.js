function playerRankController(players) {
    // filter out players who have played more than five games
    const ranked = players.filter((player) => {
        if ((player.wins + player.losses) >= 5) {
            return player;
        }
    })

    //sort ranked players in ascending order
    const rankedSort = ranked.sort((a, b) => {
        return ((a.wins + a.losses)/a.wins) - ((b.wins + b.losses)/b.wins);
    })

    // filter out players who have played fewer than five games
    const unranked = players.filter((player) => {
        if ((player.wins + player.losses) < 5) {
            return player;
        }
    })


    // return object with ranked and unranked players
    return { ranked: rankedSort, unranked: unranked };

}

module.exports = playerRankController;