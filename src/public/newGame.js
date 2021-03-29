// events for selectors pushes name and position to server
// so score can be returned
$('select').on('change', (e) => {
    let alias = e.target.value;
    let position = e.target.name.substring(4);

    $.post("/new-game",
        {
            player: alias,
            position: position
        },
        function (data) {
            let score = data.score;
            let roleTarget = e.target.name;
            console.log(roleTarget)

            let scoreCell = $("#" + roleTarget + '-score');
            scoreCell.html(score)
            console.log(scoreCell);
        }
    )
})