// events for selectors pushes name and position to server
// so score can be returned 

$('select').on('change', (e) => {
    let alias = e.target.value;
    let position = e.target.name.substring(4);
    let team = e.target.name.substring(0, 3);


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
            favourite();
        }
    )
})

// collects values from both teams and adds them to total
function updateTotals(team) {
    // update total scores
    let currentRedTotal = $('#red-total-score');
    let currentBlueTotal = $('#blu-total-score');

    if (team == 'red') {
        let sum = 0;
        $("td[name='red-scores']").each((i, val) => {
            let score = val.innerHTML;

            if (score != '') {
                sum += parseInt(val.innerHTML);
            }
            currentRedTotal.html(sum);
        })
    } else if (team == 'blu') {
        let sum = 0;
        $("td[name='blu-scores']").each((i, val) => {
            let score = val.innerHTML;

            if (score != '') {
                sum += parseInt(val.innerHTML);
            }
            currentBlueTotal.html(sum);
        })
    }
}

// displays and returns probability of winning for favoured team
function favourite() {
    let redScore = $('#red-total-score').html();
    let blueScore = $('#blu-total-score').html();
    let k = 12;

    let redProb = 1 / (1 + Math.pow(10, ((blueScore - redScore) / 100)));
    let blueProb = 1 - redProb;

    if (redProb > blueProb) {
        $("#favourite-percent").remove();
        $('#red-side').append(`<span id='favourite-percent'>+${((redProb * 100) - 50).toFixed(2)}%</span>`);
    } else if (redProb < blueProb) {
        $("#favourite-percent").remove();
        $('#blue-side').append(`<span id='favourite-percent'>+${((blueProb * 100) - 50).toFixed(2)}%</span>`);
    } else {
        $("#favourite-percent").remove();
    }

    // console.log(redProb + '  ' + blueProb);
    return { red: redProb, blue: blueProb }
}

// on red team victory
$('#red-victory').on('click', (e) => {
    const winner = 'red';
    let redScores = {};
    $("td[name='red-scores']").each((i, score) => {
        redScores[score.id] = score.innerHTML;
    });

    let bluScores = {};
    $("td[name='blu-scores']").each((i, score) => {
        bluScores[score.id] = score.innerHTML;
    });

    let redTeamMembers = $('.red-select');
    let bluTeamMembers = $('.blu-select');

    let gameData = {
        winningTeam: winner,
        red: {
            top: {alias: redTeamMembers[0].value, score: redScores['red-top-score']},
            jung: {alias: redTeamMembers[1].value, score: redScores['red-jung-score']},
            mid: {alias: redTeamMembers[2].value, score: redScores['red-mid-score']},
            adc: {alias: redTeamMembers[3].value, score: redScores['red-adc-score']},
            sup: {alias: redTeamMembers[4].value, score: redScores['red-sup-score']}
        },
        blu: {
            top: {alias: bluTeamMembers[0].value, score: bluScores['blu-top-score']},
            jung: {alias: bluTeamMembers[1].value, score: bluScores['blu-jung-score']},
            mid: {alias: bluTeamMembers[2].value, score: bluScores['blu-mid-score']},
            adc: {alias: bluTeamMembers[3].value, score: bluScores['blu-adc-score']},
            sup: {alias: bluTeamMembers[4].value, score: bluScores['blu-sup-score']}
        },
        probability: favourite(),
    }



    console.log(gameData)

    // post data to server, call favourite function to pass probabilities 
    // $.post("/game-results",
    //     {
    //         winner: 'red',

    //     },
    //     function (data) {}
    // )
});


// on blue team victory