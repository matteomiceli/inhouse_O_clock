// events for selectors pushes name and position to server
// so score can be returned
$('select').on('change', (e) => {
    let alias = e.target.value;
    let position = e.target.name.substring(4);
    
    let redTotal = $('#red-total-score');
    let bluTotal = $('#blu-total-score');

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

            updateTotals();
        }
    )
})

function updateTotals() {
     // update total scores
     let redTotal = $('#red-total-score');
     let bluTotal = $('#blu-total-score');

     if ($('#red-top-score').html()) {
        redTotal += $('#red-top-score').html()
        console.log(redTotal)
     }
}