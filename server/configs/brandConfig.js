'use strict';

const brandConfig = {
    3000: {
        'name': 'Mamas and Papas',
        'css': 'styles',
        'logo': 'placeholder.jpg',
        'font': 'https://fonts.googleapis.com/css?family=Roboto:300,400',
        'footer_strapline': '&copy; 2017',
        'footer_logo': 'placeholder.jpg',
        'store_image': 'placeholder.jpg',
        'favicon': 'favicon.ico',
        'sign_in': 'Sign in / Register',
        'quick_order': 'Quick order',
        'search_message': 'Search products - what do you need?',
        'store_message': 'Stores',
        'store_message_support': 'Find your nearest store',
        'cookie_message': 'We use cookies to provide you with a better online experience. Please continue browsing if you\'re happy with this or find out how to manage cookies',
        'cookie_btn_text': 'OK, got it',
        'promotions': [
            'Big brands, low prices',
            'FREE next day delivery*',
            'No account needed',
            'Click &amp; collect in 5 minutes'
        ],
        'store_search_title': 'Our Stores',
        'store_area_count': 'We have 8 stores all within the London area with more on the way',
        'store_postcode_town_message': 'Please enter a postcode or town',
        'store_inc_vat_message': 'inc VAT',
        'store_product_categories': 'Product Categories',
        'store_product_suggestions': 'Product Suggestions',
        'use_location_message': 'Use your current location',
        'navigation_browse': 'Browse',
        'navigation_search': 'Search',
        'navigation_stores': 'Stores',
        'navigation_checkout': 'Checkout',
        'navigation': {
            'Plumbing': {
                'Category one': [
                    'Sub Category one',
                    'Sub Category two',
                    'Sub Category three',
                    'Sub Category four'
                ],
                'Category two': [
                    'Sub Category one',
                    'Sub Category two',
                    'Sub Category three',
                    'Sub Category four'
                ],
                'Category three': [
                    'Sub Category one',
                    'Sub Category two',
                    'Sub Category three',
                    'Sub Category four'
                ],
                'Category four': [
                    'Sub Category one',
                    'Sub Category two',
                    'Sub Category three',
                    'Sub Category four'
                ],
                'Category five': [
                    'Sub Category one',
                    'Sub Category two',
                    'Sub Category three',
                    'Sub Category four'
                ],
                'Category six': [
                    'Sub Category one',
                    'Sub Category two',
                    'Sub Category three',
                    'Sub Category four'
                ]
            }
        },
        'footer_links': {
            'Customer Services': [
                'Link one',
                'Another link two',
                'Link three here',
                'This is link four'
            ],
            'About Priority Direct': [
                'Link one',
                'Another link two',
                'Link three here',
                'This is link four'
            ],
            'Delivery information': [
                'Link one',
                'Another link two',
                'Link three here',
                'This is link four'
            ],
            'Legal information': [
                'Link one',
                'Another link two',
                'Link three here',
                'This is link four'
            ]
        },
        'social_links': [
            'instagram',
            'facebook',
            'linkedin',
            'twitter'
        ],
        'products': [
            {
                name: 'Makita 18V LXT Combi Drill',
                promo: false,
                recommended: true,
                price: 180
            },
            {
                name: 'Some Other Drill',
                promo: true,
                recommended: false,
                price: 300
            },
            {
                name: 'this is not a drill',
                promo: false,
                recommended: false,
                price: 50
            }
        ],
        'search_results': [
            {
                name: 'Drills',
                category: 'Drill Bits'
            },
            {
                name: 'Drills',
                category: 'Cordless'
            },
            {
                name: 'Drills',
                category: 'Corded'
            }
        ]
    }
};

module.exports = brandConfig;
