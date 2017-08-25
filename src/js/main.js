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

// Toggle function
(function ($) {
    /* 
     * Set Filter Styles Function
     * This is a function specific to the product filter
     * If there is a list item that is active, all non active list items will have .text-grayLight set
     * whilst the active will be black. If none are active, all list items will be black.
     */
    function setFilterStyles (container) {
        var filterContainer = container.find('.productFilter_filterContainer');
        var listItems = container.find('.productFilter_links');
        if (filterContainer.find('.active').length > 0) {
            $(listItems).each(function () {
                if (!$(this).hasClass('active')) {
                    $(this).addClass('text-grayLight');
                }
            });
        } else {
            listItems.removeClass('text-grayLight');
        }
    }
    /* 
     * Toggle Function
     * Multi use toggle for when you only want one div to show at a time
     * Add .js-toggle to the container, .js-trigger to the trigger and .js-target to the div
     * that will be toggled.
     */
    $('.js-toggle').on('click', '.js-trigger', function (e) {
        e.stopPropagation();
        var container = $(this).closest('.js-toggle');
        var toggle = $(this).data('toggle');
        var target = container.find('[data-trigger=' + toggle + ']');
        container.find('.js-target').not(target).removeClass('d-block');
        container.find('.js-trigger').not($(this)).removeClass('active');
        container.find(target).toggleClass('d-block');
        $(this).toggleClass('active');

        if (container.find('.productFilter_tab')) {
            setFilterStyles(container);
        }
    });

})(jQuery);

// Radio button function
(function ($) {
    /* 
     * Radio Function
     * Multi use toggle for when you only want one div to show at a time
     * Add .js-toggle to the container, .js-trigger to the trigger and .js-target to the div
     * that will be toggled.
     */

    $('.js-radio').on('click', '.checkbox_toggle', function () {
        $('.js-radio').find('.checkbox_toggle').not($(this)).removeClass('active');
        $(this).addClass('active');
        var index = $(this).closest('.js-radio').data('index');
        var text = $(this).siblings('.checkbox_text').text();
        var label = $(document).find('.sortBy' + index);
        label.text(text);
    });

    $(document).ready(function () {
        $('.js-radio').each(function () {
            var index = $(this).data('index');
            var label = $(document).find('.sortBy' + index);
            var activeText = $(this).find('.active').siblings('.checkbox_text').text();
            label.text(activeText);
        });
    });

})(jQuery);

// Checkbox button function
(function ($) {
    /* 
     * setFilterCounts Function
     * This is a function specifically for the product filters that works off of the checkbox
     * function. 'isClear' defines if the action is to clear the filters or not
     * if false, it will set the filter counts in the filter footer and button.
     */
    function setFilterCounts (container, isClear) {
        var activeCheckboxes = container.find('div.active');
        var count = activeCheckboxes.length;
        var index = container.data('index');
        var btnLabel = $('.productFilter').find('.filter' + index);
        var footer = container.closest('div').find('.filterFooter' + index);
        var suffix = count === 1 ? '' : 's';
        var filterList = '';
        if (isClear === true) {
            btnLabel.text('0 Selected');
            footer.text('0 filters applied');
        } else {
            // for each active checkbox, add the text value to filterList
            $(activeCheckboxes).each(function () {
                var sibText = $(this).siblings('.checkbox_text').text();
                var id = $(this).attr('id');
                var containerId = container.attr('id');
                filterList += '<div class="font-weight-light productFilter_label px-2 d-inline-block"> <div class="ico ico-cross px-1 js-uncheckCheckbox cursor-pointer" data-clear="'
                 + id
                 + '" data-container="'
                 + containerId
                 + '"></div><span class="checkbox_label">'
                 + sibText
                 + '</span></div>';
            });

            btnLabel.text(count + ' Selected');
            footer.text(count + ' filter' + suffix + ' applied');

            $('<div class="pl-2 d-block d-md-inline-block">' + filterList + '</div>').appendTo(footer);
        }
    }
    /* 
     * Checkbox Function
     * Multi use toggle for when you only want one div to show at a time
     * Add .js-toggle to the container, .js-trigger to the trigger and .js-target to the div
     * that will be toggled.
     */
    $('.js-checkbox').on('click', '.checkbox_toggle', function () {
        $(this).toggleClass('active');
        var container = $(this).closest('.js-checkboxContainer');
        if (container.find('.productFilter_tab')) {
            setFilterCounts(container, false);
        }
    });
    $('.js-uncheckCheckboxContainer').on('click', '.js-uncheckCheckbox', function () {
        var target = $(this).data('clear');
        var container = $(document).find('#' + $(this).data('container'));
        $(container).find('#' + target).removeClass('active');
        setFilterCounts(container, false);
    });

    $('.js-checkboxContainer').on('click', '.js-clearCheckbox', function () {
        var container = $(this).closest('.js-checkboxContainer');
        var activeCheckboxes = container.find('div.active');
        activeCheckboxes.removeClass('active');
        if (container.find('.productFilter_tab')) {
            setFilterCounts(container, true);
        }
    });

    /*
    * Checkbox mobile navigation
    */
    var element = {
        content: $('.js_slideContent')
    };

    function categoryChanger (gotoCategory) {
        element.content.find('div.slidePanel_category').removeClass('slidePanel_category-selected');
        gotoCategory.addClass('slidePanel_category-selected');
    }

    // Switch the category, nav list items and titles trigger this to traverse the menu
    element.content.on('click', '.js-switch_groupLink', function (e) {
        e.preventDefault();

        var category = $(this).data('goto-category');
        var gotoCategory = element.content.find('div.slidePanel_category[data-category=' + category + ']');

        if (gotoCategory.length) {
            categoryChanger(gotoCategory);
        }
    });

})(jQuery);

// Navigation
(function ($) {

    /* 
     * Slide Panel
     * Multi use toggle for the slide panel feature.
     * Requires the class js-slidePanel on the triggers, and a data-target attribute for the DOM element to be slid in/out.
     */

    // Is set when a slide panel is active. Stops multiple panels being active.
    var locked = 0;

    // Appends our blackout overlay for all slide panels.
    $('body').append('<div class="blackout"></div>');

    // Trigger for the slide panel, both open and close.
    $('body').on('click', '.js-slidePanel', function () {
        // Get our target element to slide in
        var target = $(this).data('target');

        // Our slide panel to open or close.. 
        var slidePanel;

        // Set the lock status
        function setLock (lock) {
            locked = lock || 0;
        }

        // Show the slide panel
        function showPanel () {
            slidePanel.css('z-index', 9999).addClass('active');
            $('body').addClass('noscroll').find('.blackout').addClass('active');
        }

        // Hide the slide panel
        function hidePanel () {
            slidePanel.removeClass('active');
            $('body').find('.blackout').removeClass('active');
        }

        // If we have a target, we're opening a panel, no target and we're closing the panel.
        if (!target) {
            slidePanel = $(this).closest('.slidePanel');
        } else {
            slidePanel = $(target).closest('.slidePanel');
        }

        // If we've got something to work with, work magic.
        if (slidePanel.length) {
            if (slidePanel.hasClass('active')) {
                hidePanel();

                // Listen once (same as .on .off for the transition to finish, if it's closed, reset the z-index)
                slidePanel.one(transitionEnd, function () {
                    $(this).css('z-index', '-1');
                    $('body').removeClass('noscroll');
                    setLock(0);
                    slidePanel.off();
                });
            } else if (!slidePanel.hasClass('active') && locked === 0) {
                showPanel();
                setLock(1);
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
