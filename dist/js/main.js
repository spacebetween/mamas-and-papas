'use strict';
/* global google  */
/**
* the debounce function takes a callback, a wait time in milliseconds,
 * and an immediate trigger (true, false value)
 * It returns a function, which checks if immediate is returned true.
 * If not, it applies (curries) the arguments of the debounce function to the callback function.
 * 
*/

function debounce(func, wait, immediate) {
    // eslint-disable-line no-unused-vars
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function later() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// If it's got a target and a toggle and somebody clicks it, toggle that target
$('*[data-target]*[data-toggle]').on('click', function () {
    var $this = $(this);
    $($this.attr('data-target')).toggleClass($this.attr('data-toggle'));
});

var searchForm = $('#searchForm');
var searchSpinner = $('.js-loadingSpinner');
var searchInput = $('.js-searchInput');

searchInput.on('keyup', function () {
    $(this).closest('form').find(searchSpinner).removeClass('d-none').addClass('d-flex');
});

searchInput.on('blur', function () {
    $(this).closest('form').find(searchSpinner).removeClass('d-flex').addClass('d-none');
});

var leftOpen = false;
var rightOpen = false;

// This function is used for the header the header has slide down sections;
// the search overlay, and the product overlay.
// This function makes sure that only one or the other is active at any given time.

function slideSibling(targetId) {

    var targetElement = $(targetId);
    var leftPane = $('#leftPane');
    var rightPane = $('#rightPane');

    // Get id of both panes
    var leftTargetPane = $('#productCollapse');
    var rightTargetPane = $('#storeCollapse');

    // Get State of left pane
    if (leftTargetPane.is(':visible')) {
        leftOpen = true;
    }

    // Get State of right pane
    if (rightTargetPane.is(':visible')) {
        rightOpen = true;
    }

    if (targetElement.is(leftPane)) {
        leftPane.addClass('background-secondary');
        rightPane.removeClass('background-secondary');
        rightTargetPane.slideUp();
        leftTargetPane.slideDown();
        rightOpen = false;
    } else {
        rightPane.addClass('background-secondary');
        leftPane.removeClass('background-secondary');
        leftTargetPane.slideUp();
        rightTargetPane.slideDown();
        leftOpen = false;
    }

    if (targetElement.is(leftPane) && leftTargetPane.is(':visible') && leftOpen === true) {
        leftTargetPane.slideUp();
        leftPane.removeClass('background-secondary');
        leftOpen = false;
    } else if (targetElement.is(rightPane) && rightTargetPane.is(':visible') && rightOpen === true) {
        rightTargetPane.slideUp();
        rightPane.removeClass('background-secondary');
        rightOpen = false;
    }
}

$(searchForm).on('submit', function (e) {
    e.preventDefault();
    slideSibling('#leftPane');
});

$('#rightPane').on('click', function () {
    slideSibling('#rightPane');
});

/*
    Store search - autocomplete example
*/

/* eslint-disable no-unused-vars */

function initialize() {
    var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(51.523005, -0.131837));

    var originInput = document.getElementById('searchLocation');

    var options = {
        bounds: defaultBounds,
        componentRestrictions: { country: 'uk' }
    };

    var autocomplete = new google.maps.places.Autocomplete(originInput, options);
}

google.maps.event.addDomListener(window, 'load', initialize);
/* eslint-enable no-unused-vars */

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            return console.log([position.coords.latitude, position.coords.longitude]); //eslint-disable-line
        });
    }
}

/*
    Store search - Get location
*/

$('.js-useLocation').on('click', function () {
    getLocation();
});

'use strict';

function checkCookie(name) {
    //name of our cookie to search against
    var nameEQ = name + '=';
    //an array of all of the cookies on the page
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        //if the first character is a space remove it and do this until first character
        //is not a space
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        } //return value of cookie if it is found
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function createCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toGMTString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}

$(document).ready(function () {
    var cookieBanner = $('#cookieBanner');
    if (checkCookie('complianceCookie') === null) {
        cookieBanner.addClass('show');
    }

    $('.js-cookieClose').on('click', function () {
        createCookie('complianceCookie', 'on', 14);
    });
});

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

    var $body = $('body');

    // If we're in a no scroll state dont worry about resizing
    if ($body.hasClass('noScroll')) {
        return false;
    }

    //checks if the header offset is of a greater value, and applies the fixed top class
    //else, remove the class 
    if ($(this).scrollTop() >= fixedHeaderOffset) {
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
    var $this = $(this);

    // Get that current state of the window
    var isActive = $this.hasClass('active');

    // Clear the state before deciding our next move
    $('.js-tabNav').removeClass('active');

    // If we used to be active
    if (isActive) {
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
    var $this = $(this);

    // Get that current state of the element
    var isActive = $this.hasClass('active');

    // If we used to be active
    if (isActive) {
        // Lets assume it's top
        var offsetTop = 0;

        // Unless we're told it's variable
        if ($this.data('variable-top') === true) {
            // Then check if we're in a fixed header state or not
            offsetTop = $('.js-fixedHeader').hasClass('fixed-top') ? $this.outerHeight() : $this.offset().top + $this.outerHeight();
        }

        // Unless we are supposed to be variable based on parent
        if ($this.data('variable-parent')) {
            // In that case copy the parent
            offsetTop = $this.closest($this.data('variable-parent')).css('top');
        }
        // Find our target and make it scrollable and also set the correct top
        $($this.data('target')).addClass('scrollInner').css('top', offsetTop);

        // No lets go looking for parent containers
        var currentScroll = $this.closest('.scrollInner');
        if (currentScroll.length) {
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
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 1,
                fade: true
            }
        }, {
            breakpoint: 99999,
            settings: {
                slidesToShow: 4
            }
        }]
    });
});
//# sourceMappingURL=main.js.map
