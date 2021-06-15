const form = $('form');
const inputName = $('#name');
const inputAlias = $('#alias');
const inputTop = $('#top');
const inputJung = $('#jung');
const inputMid = $('#mid');
const inputAdc = $('#adc');
const inputSup = $('#sup');
const pin = $('#password')




// form validation
form.submit((e) => {
    let errors = {};

    if(inputName.val() === '' || inputName.val() === undefined) {
        errors['name'] = 'enter a valid name';
    }

    if(inputAlias.val() === '' || inputAlias.val() === undefined) {
        errors['alias'] = 'enter a valid alias';
    }

    if(inputTop.val() === '' || inputTop.val() === undefined || inputTop.val() > 100 || inputTop.val() < 1 ) {
        errors['top'] = 'enter a number between 1 and 100';      
    }

    if(inputJung.val() === '' || inputJung.val() === undefined || inputJung.val() > 100 || inputJung.val() < 1 ) {
        errors['jung'] = 'enter a number between 1 and 100';      
    }

    if(inputMid.val() === '' || inputMid.val() === undefined || inputMid.val() > 100 || inputMid.val() < 1 ) {
        errors['mid'] = 'enter a number between 1 and 100';      
    }

    if(inputAdc.val() === '' || inputAdc.val() === undefined || inputAdc.val() > 100 || inputAdc.val() < 1 ) {
        errors['adc'] = 'enter a number between 1 and 100';      
    }

    if(inputSup.val() === '' || inputSup.val() === undefined || inputSup.val() > 100 || inputSup.val() < 1 ) {
        errors['sup'] = 'enter a number between 1 and 100';      
    }

    if(pin.val() != 'tf69') {
        errors['pin'] = 'enter a valid authorization code';      
    }

    // if errors is empty submit
    if (Object.entries(errors).length > 0) {
        e.preventDefault();
    }
});