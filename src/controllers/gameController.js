// converts parsed form data into gameData object

function createGameDataObject(formData) {
    return gameData = {
        winningTeam: formData['win-red'] ? 'red' : 'blue',
        red: {
            top: { alias: formData['red-top'],  score: formData['red-top-value'] },
            jung: { alias: formData['red-jung'],  score: formData['red-jung-value'] },
            mid: { alias: formData['red-mid'],  score: formData['red-mid-value'] },
            adc: { alias: formData['red-adc'],  score: formData['red-adc-value'] },
            sup: { alias: formData['red-sup'],  score: formData['red-sup-value'] }
        },
        blue: {
            top: { alias: formData['blu-top'], score: formData['blu-top-value'] },
            jung: { alias: formData['blu-jung'], score: formData['blu-jung-value'] },
            mid: { alias: formData['blu-mid'], score: formData['blu-mid-value'] },
            adc: { alias: formData['blu-adc'], score: formData['blu-adc-value'] },
            sup: { alias: formData['blu-sup'], score: formData['blu-sup-value'] },
        },
        probability: { red: formData['red-prob'], blue: formData['blue-prob'] }
    }
}

module.exports = createGameDataObject;


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


// {
//     'red-top': 'RagerGirl',
//     'red-top-value': '66',
//     'blu-top-value': '66',
//     'blu-top': 'RagerGirl',
//     'red-jung': 'skoutNova',
//     'red-jung-value': '24',
//     'blu-jung-value': '80',
//     'blu-jung': 'Pesus sesus',
//     'red-mid': 'skoutNova',
//     'red-mid-value': '72',
//     'blu-mid-value': '82',
//     'blu-mid': 'Bougino',
//     'red-adc': 'skoutNova',
//     'red-adc-value': '90',
//     'blu-adc-value': '50',
//     'blu-adc': 'Hii1324',
//     'red-sup': 'RagerGirl',
//     'red-sup-value': '50',
//     'blu-sup-value': '88',
//     'blu-sup': 'skoutNova',
//     'red-prob': '0.18638778949441326',
//     'blue-prob': '0.8136122105055867',
//     'win-red': 'Red Victory'
// }