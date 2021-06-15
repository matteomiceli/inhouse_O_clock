// events for selectors pushes name and position to server
// so score can be returned 

$('select').on('change', (e) => {
    let alias = e.target.value;
    let position = e.target.name.substring(4);
    let team = e.target.name.substring(0, 3);


    // fetch player score from db and append to score cell
    $.post("/LoL/new-game",
        {
            player: alias,
            position: position
        },
        function (data) {
            let score = data.score;
            let roleTarget = e.target.name;

            // write score to cell
            let scoreCell = $(`#${roleTarget}-score`);
            scoreCell.html(score);

            // write value to position input
            $(`#${roleTarget}-value`).val(score);

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
        $('#red-side').append(`<span id='favourite-percent' class='text-green-300 pr-2'>+${((redProb * 100) - 50).toFixed(2)}%</span>`);
    } else if (redProb < blueProb) {
        $("#favourite-percent").remove();
        $('#blue-side').append(`<span id='favourite-percent' class='text-green-300 pl-2'>+${((blueProb * 100) - 50).toFixed(2)}%</span>`);
    } else {
        $("#favourite-percent").remove();
    }

    $('#red-prob').val(redProb);
    $('#blue-prob').val(blueProb);
}

// modals
$('.close-modal').on('click', () => {
    $('.blue-modal').css('display', 'none');
    $('.red-modal').css('display', 'none');
})

$('#red-victory').on('click', () => {
    $('.blue-modal').css('display', 'none');
    $('.red-modal').css('display', 'block');
})

$('#blue-victory').on('click', () => {
    $('.red-modal').css('display', 'none');
    $('.blue-modal').css('display', 'block');
})

// $('#confirm-red-victory').on('click', () => {
//     gameData = sendGameData('red');
//     postGameResults(gameData);
// });

// $('#confirm-blue-victory').on('click', () => {
//     gameData = sendGameData('blue');
//     postGameResults(gameData);
// });

// returns game data
// function sendGameData(winningTeam) {
//     const winner = winningTeam;

//     let redScores = {};

//     $("td[name='red-scores']").each((i, score) => {
//         redScores[score.id] = score.innerHTML;
//     });


//     let bluScores = {};

//     $("td[name='blu-scores']").each((i, score) => {
//         bluScores[score.id] = score.innerHTML;
//     });

//     let redTeamMembers = $('.red-select');
//     let bluTeamMembers = $('.blu-select');

//     return gameData = {
//         winningTeam: winner,
//         red: {
//             top: {alias: redTeamMembers[0].value, score: redScores['red-top-score']},
//             jung: {alias: redTeamMembers[1].value, score: redScores['red-jung-score']},
//             mid: {alias: redTeamMembers[2].value, score: redScores['red-mid-score']},
//             adc: {alias: redTeamMembers[3].value, score: redScores['red-adc-score']},
//             sup: {alias: redTeamMembers[4].value, score: redScores['red-sup-score']}
//         },
//         blu: {
//             top: {alias: bluTeamMembers[0].value, score: bluScores['blu-top-score']},
//             jung: {alias: bluTeamMembers[1].value, score: bluScores['blu-jung-score']},
//             mid: {alias: bluTeamMembers[2].value, score: bluScores['blu-mid-score']},
//             adc: {alias: bluTeamMembers[3].value, score: bluScores['blu-adc-score']},
//             sup: {alias: bluTeamMembers[4].value, score: bluScores['blu-sup-score']}
//         },
//         probability: favourite(),
//     }
// };

// // post data to server, call favourite function to pass probabilities 
// function postGameResults(data) {
//     $.post("/game-results", data, (results) => {
//         console.log(results);
//     });
// }