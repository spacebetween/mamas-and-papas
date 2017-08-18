'use strict';

/*
 * https://www.iambacon.co.uk/blog/prevent-transitionend-event-firing-twice
 * Find and set globally the supported transition property for our listeners.
 */
function whichTransitionEvent () {
    var el = document.createElement('fake'),
        transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd', // Saf 6, Android Browser
            'MozTransition': 'transitionend', // only for FF < 15
            'transition': 'transitionend' // IE10, Opera, Chrome, FF 15+, Saf 7+
        };

    for (var t in transEndEventNames) {
        if ( el.style[t] !== undefined ) {
            return transEndEventNames[t];
        }
    }
}

var transitionEnd = whichTransitionEvent();

(function ($) {

    /* 
     * Toggle Function
     * Multi use toggle for when you only want one div to show at a time
     * Add .js-toggle to the container, .js-trigger to the trigger and .js-target to the div
     * that will be toggled.
     */

    $('.js-toggle').on('click', '.js-trigger', function () {
        var parent = $(this).closest('.js-toggle');
        var toggle = $(this).data('target');
        var target = document.querySelectorAll('[data-trigger=' + toggle + ']');
        parent.find('.js-target').not(target).removeClass('d-block');
        parent.find('.js-trigger').not($(this)).removeClass('active');
        parent.find(target).toggleClass('d-block');
        $(this).toggleClass('active');
    });
})(jQuery);

(function ($) {

    /* 
     * Slide Panel
     * Multi use toggle for the slide panel feature.
     * Requires the class js-slidePanel on the triggers, and a data-target attribute for the DOM element to be slid in/out.
     */

    var locked = 0;

    $('body').append('<div class="blackout"></div>');

    $('body').on('click', '.js-slidePanel', function () {

        // Get our target element to slide in
        var target = $(this).data('target');
        var slidePanel = null;

        function setLock (lock) {
            locked = lock || 0;
        }

        function toggleState () {
            slidePanel.css('z-index', 9999).toggleClass('active');
            $('body').find('.blackout').toggleClass('active');
        }                 

        if (!target) {
            slidePanel = $(this).closest('.slidePanel');
        } else {
            slidePanel = $(target).closest('.slidePanel');
        }

        if (slidePanel.length) {
            if (slidePanel.hasClass('active')) {
                toggleState();

                // Listen once (same as .on .off for the transition to finish, if it's closed, reset the z-index)
                slidePanel.one(transitionEnd, function () {
                    $(this).css('z-index', '-1');

                    setLock(0);
                    slidePanel.off();
                });
            } else if (!slidePanel.hasClass('active') && locked === 0) {
                setLock(1);
                toggleState();
            }
        }

    });

}(jQuery));

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

}(jQuery));

var Carousel = function ($, window) {

    /*
     * Feature Carousel - Homepage
     */

    return function () {

        // Carousel elements, see init()
        var element = {};

        // A lock for the prev and next functions, just a nice to have feature
        var locked = 0;

        // Delay timing for transition lock
        var delayTime = 600;

        // Store array of the carousel elements, see init()
        var order;

        // Default central carousel item
        var currentFocusIndex = 1;

        // Mobile touch variables
        var xDown = null;
        var yDown = null;

        // Carousel supports up to 5 layered images in a rotating fashion, these are the style rules for the positioning
        // Note: this needs improving. Now we have the basic carousel in place, this CSS needs to be generated for X amount of slides, using the config options to decide offset etc.
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

        function init (config) {

            config = config || {};

            config = Object.assign({
                element: $('#featureCarousel'),
                offsetTop: '40px',
                offsetTopStep: '20px',
                offsetSide: '50%',
                lockDelayTimer: 600
            }, config);

            element = {
                carousel: config.element,
                carouselTrack: config.element.find('.featureCarousel_track'),
                carouselElement: config.element.find('.featureCarousel_entry'),
                carouselControls: config.element.find('.featureCarousel_controls')
            };

            if (element.carousel.length) {

                // Store array of the carousel elements, we'll keep track of and manipulate the order of them via this
                order = element.carouselElement.toArray();

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

        return {
            init: init
        };

    };

}(jQuery, window);

(function ($) {

    /* 
     * Product Page Column Toggle
     */

    var currentState = 'small',
        triggeredState,
        container = $('.products'),
        products = container.find('.productCard'),
        jsProductToggle = '.js-productPanel',
        colSwapper,
        locked = 0;

    // rudimentary mechanism to allow the transition to finish first.. 
    // without this, a user could click very quickly on the col switcher and be mid-transition, leaving the screen blank
    function setLock () {
        locked = 1;
        setTimeout(function () {
            locked = 0;
        }, 1000);
    }

    function setColumnState () {
        switch (currentState) {
            case 'large':
                colSwapper = [
                    {
                        f: '.col-lg-3.col-md-4.col-sm-6', // Joint, for class group search
                        s: 'col-lg-3 col-md-4 col-sm-6', // Spaced to removeClass
                        t: 'col-lg-4 col-md-4 col-sm-6' // Becomes this
                    },
                    {
                        f: '.col-lg-6.col-md-8.col-sm-12', // Large UPS default group
                        s: 'col-lg-6 col-md-8 col-sm-12',
                        t: 'col-lg-8 col-md-8 col-sm-12' // to this
                    }
                ];
                break;
            default:
                colSwapper = [
                    {
                        f: '.col-lg-4.col-md-4.col-sm-6',
                        s: 'col-lg-4 col-md-4 col-sm-6',
                        t: 'col-lg-3 col-md-4 col-sm-6'
                    },
                    {
                        f: '.col-lg-8.col-md-8.col-sm-12',
                        s: 'col-lg-8 col-md-8 col-sm-12',
                        t: 'col-lg-6 col-md-8 col-sm-12'
                    }
                ];
        }

        $.each(colSwapper, function ( index, value ) {
            $('.products').find(value.f).removeClass(value.s).addClass(value.t);
        });
    }

    // Listener for transition to finish before switching columns
    container.on(transitionEnd, '.transition', function () {
        setColumnState();
        products.removeClass('transition');
    });

    container.on('click', jsProductToggle, function () {

        triggeredState = $(this).data('state');

        if (currentState !== triggeredState && !locked) {
            setLock();

            $(this).parent().find(jsProductToggle).removeClass('active');
            $(this).addClass('active');

            currentState = triggeredState;
            products.addClass('transition');
        }
    });

}(jQuery));

// Slick article carousel
$(document).ready(function () {
    $('.article_carousel').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 10000
    });

    $('.basket_upsellCarousel').slick({
        dots: true,
        arrows: false,
        autoplay: false
    });

    $(function () {
        var homepageFeature = new Carousel();
        homepageFeature.init();
    });
});
