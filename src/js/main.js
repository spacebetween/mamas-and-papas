'use strict';

// Footer
$(function () {

    $('.footer').on('click', '.footer_heading', function () {
        $(this).toggleClass('active');
    });

});

// Navigation
$(function () {

    // Settings
    var settings = {
        header: $('header'),
        nav: $('.nav')
    };

    function closeNavigation () {
        settings.nav.removeClass('active');
    }

    function categoryChanger (gotoCategory) {
        settings.nav.find('div.nav_category').removeClass('nav_category-selected');
        gotoCategory.addClass('nav_category-selected');
    }

    // Listen for esc of left arrow keyPress to track back menu
    $(document).on('keyup', function (e) {
        if (e.keyCode === 27 || e.keyCode === 37) {
            var parentCategory = $('.nav_category-selected').find('.js-navSwitchCategory').data('goto-category');
            var gotoParentCategory = settings.nav.find('div.nav_category[data-category=' + parentCategory + ']');

            if (!gotoParentCategory.length) {
                closeNavigation();
            } else {
                categoryChanger(gotoParentCategory);
            }
        }
    });

    // Sets the layer index for the nav to appear above the content
    settings.header.on('click', '.js-navOpen', function () {
        settings.nav.css('z-index', '9999').addClass('active');
    });

    // Switch the category, nav list items and titles trigger this to traverse the menu
    settings.nav.on('click', '.js-navSwitchCategory', function (e) {
        e.preventDefault();

        var category = $(this).data('goto-category');
        var gotoCategory = settings.nav.find('div.nav_category[data-category=' + category + ']');

        if (gotoCategory.length) {
            categoryChanger(gotoCategory);
        }
    });

    // Close the navigation
    settings.nav.on('click', '.js-navClose', function () {
        closeNavigation();
    });

    // Wait for the CSS transition to finish before resetting the z-index for the inactive nav.
    settings.nav.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
        if (!$(this).hasClass('active')) {
            settings.nav.css('z-index', '-1');
        }
    });
  
});

// Slick article carousel
$(document).ready(function () {
    $('.article_carousel').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 10000
    });

});
