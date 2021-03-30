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

            updateTotals(team);
        }
    )
})

// collects values from both teams and adds them to total
function updateTotals(team) {
    // update total scores
    let currentRedTotal = $('#red-total-score');
    let currentBluTotal = $('#blu-total-score');
    
    if (team == 'red') {
        let sum = 0;
        $("td[name='red-scores']").each((i, val) => {
            let score = val.innerHTML;
    
            if (score != '') {
                sum += parseInt(val.innerHTML);
                // console.log(parseInt(val.innerHTML));
            }
            currentRedTotal.html(sum);
        })
    } else if (team == 'blu') {
        let sum = 0;
        $("td[name='blu-scores']").each((i, val) => {
            let score = val.innerHTML;
    
            if (score != '') {
                sum += parseInt(val.innerHTML);
                // console.log(parseInt(val.innerHTML));
            }
            currentBluTotal.html(sum);
        })
    }    
}