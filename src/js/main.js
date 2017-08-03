'use strict';

// Footer
$(function () {

    $('.footer').on('click', '.footer_heading', function () {
        $(this).toggleClass('active');
    });

});

// Navigation
$(function () {

    function resetNav () {
        $('.nav').find('ul').hide();
        $('.nav').find('ul[data-category="nav_tier1"]').show();
    }

    $('.nav').on('click', 'li', function (e) {
        e.preventDefault();
        var _this = $(this);
        var category = _this.data('category');
        console.log('Category', category);

        $('.nav').find('ul').hide();
        $('.nav').find('ul[data-category=' + category + ']').show();
    });

    $('.nav').on('click', '.js-nav-close', function () {
        resetNav();
        $('.nav').removeClass('active');
    });

    $('nav').on('click', '.js-nav-open', function () {
        $('.nav').css('z-index', '1').addClass('active');
    });

    $('.nav').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
        console.log('Close animation ended');
        if ($(this).hasClass('active')) {
            console.log('open');
        } else {
            console.log('closed');
            $('.nav').css('z-index', '-1');
        }
    });

});
