'use strict';
/* global google  */
/**
* the debounce function takes a callback, a wait time in milliseconds,
 * and an immediate trigger (true, false value)
 * It returns a function, which checks if immediate is returned true.
 * If not, it applies (curries) the arguments of the debounce function to the callback function.
 * 
*/

function debounce (func, wait, immediate) { // eslint-disable-line no-unused-vars
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = () => {
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
    const $this = $(this);
    $( $this.attr('data-target') ).toggleClass( $this.attr('data-toggle') );
});

const searchForm = $('#searchForm');
const searchSpinner = $('.js-loadingSpinner');
const searchInput = $('.js-searchInput');

searchInput.on('keyup', function () {
    $(this).closest('form').find(searchSpinner).removeClass('d-none').addClass('d-flex');
});

searchInput.on('blur', function () {
    $(this).closest('form').find(searchSpinner).removeClass('d-flex').addClass('d-none');
});

let leftOpen = false;
let rightOpen = false;

// This function is used for the header the header has slide down sections;
// the search overlay, and the product overlay.
// This function makes sure that only one or the other is active at any given time.

function slideSibling (targetId) {

    const targetElement = $(targetId);
    const leftPane = $('#leftPane');
    const rightPane = $('#rightPane');

    // Get id of both panes
    const leftTargetPane = $('#productCollapse');
    const rightTargetPane = $('#storeCollapse');

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

function initialize () {
    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(51.523005, -0.131837)
    );

    var originInput = document.getElementById('searchLocation');

    var options = {
        bounds: defaultBounds,
        componentRestrictions: { country: 'uk' }
    };

    var autocomplete = new google.maps.places.Autocomplete(originInput, options);
}

google.maps.event.addDomListener(window, 'load', initialize);
/* eslint-enable no-unused-vars */

function getLocation () {
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
