'use strict';

const postcss = {

    options: {
        map: true, // inline sourcemaps
        processors: [
            require('pixrem')(), // add fallbacks for rem units
            require('autoprefixer')({ browsers: 'last 2 versions' }), // add vendor prefixes
            require('cssnano')() // minify the result
        ]
    },
    dist: {
        src: ['<%= package.config.dist.styles %>/*.css']
    }
};

module.exports = postcss;
