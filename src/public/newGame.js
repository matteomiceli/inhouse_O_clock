// events for selectors pushes name and position to server
// so score can be returned
$('select').on('change', (e) => {
    let alias = e.target.value;
    let position = e.target.name.substring(4);
    let team = e.target.name.substring(0,3);

    // fetch player score from db
    $.post("/new-game",
        {
            player: alias,
            position: position
        },
        function (data) {
            let score = data.score;
            let roleTarget = e.target.name;

            let scoreCell = $("#" + roleTarget + '-score');
            scoreCell.html(score);

            updateTotals(scoreCell, team);
        }
    )
})

function updateTotals(cell, team) {
     // update total scores
     let currentRedTotal;
     let bluTotal = $('#blu-total-score');
     
     if (currentRedTotal == '') {
         currentRedTotal = 0;
     } else {
         currentRedTotal = $('#red-total-score').html();
     }

     console.log(cell.html())

     if (team == 'red') {
        if (cell.html()) {
            console.log((currentRedTotal))
            $('#red-total-score').html(currentRedTotal + parseInt(cell.html()));
         }
     }

     
}