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

// function to validate game form, returns boolean -> true = valid
function validateGame() {
    let valid = true;
    let errors = {};
    let selects = [];
    let cache = {};

    // all password validation is on the frontend for now == perhaps change in production
    if ($('#password').val() != 'tf69') {
        valid = false;
        errors['pin'] = 'enter valid authorization code';
    }

    $('.red-select').each(((i, select) => {
        if (select.value == '') {
            valid = false;
            errors['table'] = 'positions cannot be left blank';
            
        } else {
            selects.push(select);
        }
    }))

    $('.blu-select').each(((i, select) => {
        if (select.value == '') {
            valid = false;
            errors['table'] = 'positions cannot be left blank';
            
        } else {
            selects.push(select);
        }
    }))

    // if(!errors.table) {
    //     for (let i = 0; i < selects.length; i++) {
    //         const select = selects[i];
    //         if(cache[select]) {
    //             valid = false;
    //             errors['duplicate'] = 'players can only be entered once per team';
    //             break;
    //         }
    //         cache[select] = true;
    //     }
    // }

    return { valid: valid, errors: errors }
}

// prevents enter key from submitting form without validation
$(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });

// modals
$('.close-modal').on('click', () => {
    $('.blue-modal').css('display', 'none');
    $('.red-modal').css('display', 'none');
    $('.overlay').css('display', 'none');
})

$('#red-victory').on('click', () => {
    // clearing previous error messages
    $('#pinError').html('');
    $('#tableError').html('');

    let gameVal = validateGame();
    if (gameVal.valid) {
        $('#pinError').css('display', 'none');
        $('#tableError').css('display', 'none');
        $('.overlay').css('display', 'block');
        $('.blue-modal').css('display', 'none');
        $('.red-modal').css('display', 'flex');
    } else if (gameVal.errors.pin) {
        $('#pinError').html(gameVal.errors.pin);
    } else if (gameVal.errors.table) {
        $('#tableError').html(gameVal.errors.table);
    } else if (gameVal.errors.duplicate) {
        $('#tableError').html(gameVal.errors.duplicate);
    }
})

$('#blue-victory').on('click', () => {
    // clearing previous error messages
    $('#pinError').html('');
    $('#tableError').html('');

    let gameVal = validateGame();
    if (gameVal.valid) {
        $('#pinError').css('display', 'none');
        $('#tableError').css('display', 'none');
        $('.overlay').css('display', 'none');
        $('.red-modal').css('display', 'none');
        $('.blue-modal').css('display', 'flex');
    } else if (gameVal.errors.pin) {
        $('#pinError').html(gameVal.errors.pin);
    } else if (gameVal.errors.table) {
        $('#tableError').html(gameVal.errors.table);
    } else if (gameVal.errors.duplicate) {
        $('#tableError').html(gameVal.errors.duplicate);
    }
})