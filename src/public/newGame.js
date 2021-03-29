// events for selectors pushes name and position to server
// so score can be returned -- click event to retrieve prev
// value

$('select').on('click', (e) => {
    origVal = e.target.value;
    console.log(origVal)
}); 
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
     let currentRedTotal = $('#red-total-score');
     let bluTotal = $('#blu-total-score');

     if (!currentRedTotal.html() == '') {
         if (cell.html() != '') {
            let total = parseInt(currentRedTotal.html());
            currentRedTotal.html(total + parseInt(cell.html()));
         } else {
            let total = parseInt(currentRedTotal.html());
            currentRedTotal.html(total + parseInt(cell.html()));
         }
        console.log(currentRedTotal.html())
     } else {
        currentRedTotal.html(cell.html());
     }
    


    
    
     
    //  if (currentRedTotal == '') {
    //      currentRedTotal = 0;
    //  } else {
    //      currentRedTotal = ($('#red-total-score').html());
    //  }

    //  console.log(currentRedTotal)

    //  if (team == 'red') {
    //     if (cell.html()) {
    //         $('#red-total-score').html(currentRedTotal + parseInt(cell.html()))
    //         console.log((currentRedTotal));
            
    //      }
    //  }

     
}