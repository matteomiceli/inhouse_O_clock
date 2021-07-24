const nav = $('nav');
const menuBtn = $('.menu-icon');
const header = $('header')

menuBtn.click(() => {
    if (menuBtn.attr('src') === '/img/menu.svg') {
        menuBtn.attr('src', '/img/close_white.svg');
        nav.css('max-height', '1000px');
        // header.addClass('shadow-xl')
    } else {
        header.removeClass('shadow-xl')
        menuBtn.attr('src', '/img/menu.svg');
        nav.css('max-height', '0px');        
    }
})
