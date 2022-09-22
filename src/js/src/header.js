let menuBtn = $('.header .header__menu-btn'),
    mobMenuCanvas = $('.mobile__menu'),
    closeBtn = $('.mobile__menu .close-btn');

function closeMobileMenu() {
    mobMenuCanvas.addClass('--closing');
    menuBtn.removeClass('--active')
    setTimeout(() => {
        mobMenuCanvas.removeClass('--open');
        mobMenuCanvas.removeClass('--closing');
        $('body').removeClass('mobile-menu-opened')
    }, 250)
}

menuBtn.on('click', function (e) {
    e.preventDefault();
    $(this).addClass('--active')
    mobMenuCanvas.addClass('--open');
    $('body').addClass('mobile-menu-opened')
})
closeBtn.on('click', closeMobileMenu)
$('.mobile__menu__bg').on('click', closeMobileMenu);
$('.mobile__menu nav a').on('click', closeMobileMenu)
$('.mobile__menu .btn-primary').on('click', closeMobileMenu)