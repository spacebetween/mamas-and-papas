'use strict';

function checkCookie (name) {
    //name of our cookie to search against
    var nameEQ = name + '=';
    //an array of all of the cookies on the page
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        //if the first character is a space remove it and do this until first character
        //is not a space
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        //return value of cookie if it is found
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function createCookie (name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
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
