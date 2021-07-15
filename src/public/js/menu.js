const nav = $('nav');
const menuBtn = $('.menu-icon');

menuBtn.click(() => {
    if (menuBtn.attr('src') === '/img/menu.svg') {
        menuBtn.attr('src', '/img/close_white.svg');
        nav.css('display', 'flex');
    } else {
        menuBtn.attr('src', '/img/menu.svg');
        nav.css('display', 'none');
    }
})
