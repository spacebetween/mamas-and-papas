'use strict';

// Footer specific JS
$(function () {

    $('.footer').on('click', '.footer_heading', function () {
        $(this).toggleClass('active');
    });

});

$(document).ready(function () {
    $('.article_carousel').slick({
        dots: true,
        arrows: false
    });
});
