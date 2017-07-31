'use strict';
/* global debounce */

/**
* Fixed header watcher
* This function is going to watch any .js-fixedHeader class and add fixed if we're down below it's height
* Makes use of the debounce function
*/
// Set the trigger element
var fixedHeader = $('.js-fixedHeader');
// Add the current top to memory
var fixedHeaderOffset = fixedHeader.offset().top;

//wrap the trigger in a debounce, with a wait time of 10ms.
var fixedHeaderTrigger = debounce(function () {

    let $body = $('body');

    // If we're in a no scroll state dont worry about resizing
    if ( $body.hasClass('noScroll') ) {
        return false;
    }

    //checks if the header offset is of a greater value, and applies the fixed top class
    //else, remove the class 
    if ( $(this).scrollTop() >= fixedHeaderOffset ) {
        $body.css('margin-top', fixedHeader.height());
        fixedHeader.addClass('fixed-top');
    } else {
        $body.removeAttr('style');
        fixedHeader.removeClass('fixed-top');
    }
}, 10);
//attach the listener to the scroll event
window.addEventListener('scroll', fixedHeaderTrigger);

// Bootstrap tabNav doesn't allow for unclicking the current tab so we've added that in here
$('.js-tabNav').on('click', function () {
    // Not using bootstrap as their code cannot hide tabs
    const $this = $( this );

    // Get that current state of the window
    const isActive = $this.hasClass('active');

    // Clear the state before deciding our next move
    $('.js-tabNav').removeClass('active');

    // If we used to be active
    if ( isActive ) {
        // Close our current window down
        $($this.data('target')).removeClass('active');
    } else {
        // Show the correct tab
        $(this).tab('show');
    }

});

// This function will lock the window and allow an inner element to scroll
$('.js-fixedScroll').on('click', function () {
    // Not using bootstrap as their code cannot hide tabs
    const $this = $( this );

    // Get that current state of the element
    const isActive = $this.hasClass('active');

    // If we used to be active
    if ( isActive ) {
        // Lets assume it's top
        let offsetTop = 0;

        // Unless we're told it's variable
        if ( $this.data('variable-top') === true ) {
            // Then check if we're in a fixed header state or not
            offsetTop = $('.js-fixedHeader').hasClass('fixed-top') ? $this.outerHeight() : $this.offset().top + $this.outerHeight();
        }

        // Unless we are supposed to be variable based on parent
        if ( $this.data('variable-parent') ) {
            // In that case copy the parent
            offsetTop = $this.closest( $this.data('variable-parent') ).css('top');
        }
        // Find our target and make it scrollable and also set the correct top
        $($this.data('target')).addClass('scrollInner').css('top', offsetTop);

        // No lets go looking for parent containers
        const currentScroll = $this.closest('.scrollInner');
        if ( currentScroll.length ) {
            // If we have any, it's time to make that no scroll
            $this.closest('.scrollInner').addClass('noScroll');
        } else {
            // Otherwise, final place to look is the body
            $('body').addClass('noScroll');
        }
    } else {
        // Clear up, look for the target and take off the inner
        $($this.data('target')).removeClass('scrollInner');
        // Traverse the dom looking for nearest no scroll and remove
        $this.closest('.noScroll').removeClass('noScroll');
    }
});

// adds a border to the tabs, as the default border is always visible,
// whereas it is not in the design.
// this is toggled to match the design.
$('a[role="tab"]').on('show.bs.tab', function () {
    $('.nav-tabs').addClass('header_introduction header_thin');
});

$(document).ready(function () {
    // Setting up a slick carousel - http://kenwheeler.github.io/slick/
    $('.js-promoCarousel').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        dots: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 1,
                    fade: true
                }
            },
            {
                breakpoint: 99999,
                settings: {
                    slidesToShow: 4
                }
            }

        ]
    });
});
