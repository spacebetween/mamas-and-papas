'use strict';

// Footer
$(function () {

    $('.footer').on('click', '.footer_heading', function () {
        $('.footer_heading').removeClass('active');
        $(this).toggleClass('active');
    });

});

// Navigation
(function ($) {

    // Settings
    var settings = {
        header: $('.header'),
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
})(jQuery);

// Feature Carousel - Homepage
(function ($) {

    var element = {
        carousel: $('.featureCarousel'),
        carouselTrack: $('.featureCarousel_track'),
        carouselElement: $('.featureCarousel_entry')
    };

    var xDown = null;
    var yDown = null;

    function setContainerHeight () {
        element.carouselTrack.css('height', (element.carouselElement.outerHeight() + 20) + 'px');
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
