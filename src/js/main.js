'use strict';

// Toggle function
$(function () {

    /* 
     * Toggle Function
     * Multi use toggle for when you only want one div to show at a time
     * Add .js-toggle to the container, .js-trigger to the trigger and .js-target to the div
     * that will be toggled.
     */

    $('.js-toggle').on('click', '.js-trigger', function () {
        var toggle = $(this).data('target');
        var target = document.querySelectorAll('[data-trigger=' + toggle + ']');
        $('.js-target').not(target).removeClass('d-block');
        $('.js-trigger').not($(this)).removeClass('active');
        $(this).toggleClass('active');
        $(target).toggleClass('d-block');
    });
});

// Navigation
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

    // Grab references to our carousel elements
    var element = {
        carousel: $('.featureCarousel'),
        carouselTrack: $('.featureCarousel_track'),
        carouselElement: $('.featureCarousel_entry'),
        carouselControls: $('.featureCarousel_controls')
    };

    // A lock for the prev and next functions, just a nice to have feature
    var locked = 0;

    // Delay timing for transition lock
    var delayTime = 600;

    // Store array of the carousel elements, we'll keep track of and manipulate the order of them via this
    var order = element.carouselElement.toArray();

    // Default central carousel item
    var currentFocusIndex = 1;

    // Mobile touch variables
    var xDown = null;
    var yDown = null;

    // Carousel supports up to 5 layered images in a rotating fashion, these are the style rules for the positioning
    var cssRule = [
        {
            visibility: 'visible',
            transform: 'translate(0, -40px) scale(1)',
            zIndex: '30'
        },
        {
            visibility: 'visible',
            transform: 'translate(50%, -20px) scale(.9)',
            zIndex: '20'
        },
        {
            visibility: 'visible',
            transform: 'translate(90%, 0) scale(.8)',
            zIndex: '10'
        },
        {
            visibility: 'visible',
            transform: 'translate(-90%, 0) scale(.8)',
            zIndex: '10'
        },
        {
            visibility: 'visible',
            transform: 'translate(-50%, -20px) scale(.9)',
            zIndex: '20'
        }
    ];

    function unlock () {
        locked = 0;
    }

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
        var active = element.carouselTrack.find('.featureCarousel_entry.focused');
        var colour = active.data('background') || '';

        element.carouselTrack.css('background-color', colour);
    }

    function setCssRules () {
        element.carouselElement.removeClass('focused');
        element.carouselElement.eq(currentFocusIndex - 1).addClass('focused');

        $.each(order, function (i, e) {
            element.carouselTrack.find(e).css(cssRule[i]);
        });

        setContainerBackground();

        setTimeout(unlock, delayTime);
    }

    function next () {
        if (!locked) {

            locked = 1;

            if (currentFocusIndex >= element.carouselElement.length) {
                currentFocusIndex = 1;
            } else {
                currentFocusIndex++;
            }

            order.push(order.shift());
            setCssRules();
        }
    }

    function prev () {
        if (!locked) {

            locked = 1;

            if (currentFocusIndex <= 1) {
                currentFocusIndex = element.carouselElement.length;
            } else {
                currentFocusIndex--;
            }

            order.unshift(order.pop());
            setCssRules();
        }
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

    function init () {
        if (element.carousel.length) {

            // Add listeners for resize and touch
            window.addEventListener('resize', setContainerHeight);
            element.carousel.on('touchstart', handleTouchStart);
            element.carousel.on('touchmove', handleTouchMove);
            element.carousel.on('click', '.js-next', next);
            element.carousel.on('click', '.js-prev', prev);

            // Set the height and background of the container
            setCssRules();
            setContainerHeight();

            // First load, after the initial background has been set, we'll now tag it to add transitions to further background changes
            setTimeout(function () {
                element.carouselTrack.addClass('transition-background');
            }, 1000);

        }
    }

    $(function () {
        init();
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
