const nav = $('nav');
const menuBtn = $('.menu-icon');

menuBtn.click(() => {
    if (menuBtn.attr('src') === '/img/menu.svg') {
        menuBtn.attr('src', '/img/close_white.svg')
    } else {
        menuBtn.attr('src', '/img/menu.svg')
    }

    nav.toggle(100, 'linear', () => {

    })
})

console.log()