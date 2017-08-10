'use strict';

$(function () {

    /* 
     * Accordion show/hide
     * Used in the footer, toggles the active state of accordion element, bound within a group.
     */

    $('.js-accordion').on('click', '.js-accordionTitle', function () {
        $(this).closest('.js-accordion').find('.js-accordionTitle').not(this).removeClass('active');
        $(this).toggleClass('active');
    });

});

(function ($) {

    /* 
     * Slide Panel
     * Multi use toggle for the slide panel feature.
     * Requires the class js-slidePanel on the triggers, and a data-target attribute for the DOM element to be slid in/out.
     */

    $('body').on('click', '.js-slidePanel', function () {

        // Get our target element to slide in
        var target = $(this).data('target');
        var slidePanel = null;

        if (!target) {
            slidePanel = $(this).closest('.slidePanel');
        } else {
            slidePanel = $(target).closest('.slidePanel');
        }

        slidePanel.css('z-index', '9999').toggleClass('active');

        // Listen once (same as .on .off for the transition to finish, if it's closed, reset the z-index)
        slidePanel.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
            if (!$(this).hasClass('active')) {
                $(this).css('z-index', '-1');
            }
        });
    });

})(jQuery);

(function ($) {

    /* 
     * Navigation
     * Category change functions and esc/left arrow funcitonality only
     * The containing panel is triggered via the Slide Panel function
     */

    var element = {
        nav: $('.nav')
    };

    function categoryChanger (gotoCategory) {
        element.nav.find('div.nav_category').removeClass('nav_category-selected');
        gotoCategory.addClass('nav_category-selected');
    }

    // Listen for esc of left arrow keyPress to track back menu
    $(document).on('keyup', function (e) {
        if (e.keyCode === 27 || e.keyCode === 37) {
            var parentCategory = $('.nav_category-selected').find('.js-navSwitchCategory').data('goto-category');
            var gotoParentCategory = element.nav.find('div.nav_category[data-category=' + parentCategory + ']');

            if (!gotoParentCategory.length) {
                element.nav.parent().find('.js-slidePanel').trigger('click');
            } else {
                categoryChanger(gotoParentCategory);
            }
        }
    });

    // Switch the category, nav list items and titles trigger this to traverse the menu
    element.nav.on('click', '.js-navSwitchCategory', function (e) {
        e.preventDefault();

        var category = $(this).data('goto-category');
        var gotoCategory = element.nav.find('div.nav_category[data-category=' + category + ']');

        if (gotoCategory.length) {
            categoryChanger(gotoCategory);
        }
    });

})(jQuery);

(function ($) {

    /*
     * Feature Carousel - Homepage
     */

    var element = {
        carousel: $('.featureCarousel'),
        carouselTrack: $('.featureCarousel_track'),
        carouselElement: $('.featureCarousel_entry'),
        carouselControls: $('.featureCarousel_controls')
    };

    var xDown = null;
    var yDown = null;

    function setControlArrowPos () {
        // Get the image height, adjust amount by scaling and margin offset
        var offset = Math.ceil(element.carouselElement.first().find('img').height() * .9 - 60);
        element.carouselControls.css('top', offset);
    }

    function setContainerHeight () {
        element.carouselTrack.css('height', (element.carouselElement.outerHeight() + 20) + 'px');
        setControlArrowPos();
    }

    function setContainerBackground () {
        var active = element.carouselTrack.find('.featureCarousel_entry').first();
        var colour = active.data('background') || '';

        element.carouselTrack.css('background-color', colour);
    }

    function next () {
        element.carouselTrack.find('.featureCarousel_entry').first().appendTo(element.carouselTrack);
        setContainerBackground();
    }

    function prev () {
        element.carouselTrack.find('.featureCarousel_entry').last().prependTo(element.carouselTrack);
        setContainerBackground();
    }

    function handleTouchStart (event) {
        xDown = event.touches[0].clientX;
        yDown = event.touches[0].clientY;
    }

    function handleTouchMove (event) {
        if (!xDown || !yDown) {
            return;
        }

        var xUp = event.touches[0].clientX;
        var yUp = event.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        // ensure the user isn't just scrolling down, in which case the Y travel will be greater than the X sway
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if ( xDiff > 0 ) {
                // swipe left
                next();
            } else {
                // swipe right
                prev();
            }
        }

        /* reset */
        xDown = null;
    }

    element.carousel.on('click', '.js-next', function () {
        next();
    });

    element.carousel.on('click', '.js-prev', function () {
        prev();
    });

    window.addEventListener('resize', setContainerHeight);
    document.getElementById('featureCarousel').addEventListener('touchstart', handleTouchStart);
    document.getElementById('featureCarousel').addEventListener('touchmove', handleTouchMove);

    $(function () {
        setContainerHeight();
        setContainerBackground();
    });

})(jQuery);

// Slick article carousel
$(document).ready(function () {
    $('.article_carousel').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 10000
    });
});
