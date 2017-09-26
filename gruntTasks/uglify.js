'use strict';

module.exports = {
    options: {
        compress: {},
        beautify: false,
        mangle: {},
        report: 'gzip',
        preserveComments: false,
        sourceMap: true
    },
    main: {
        files: {
            '<%= package.config.dist.scripts %>/main.min.js': [
                '<%= package.config.npm %>/slick-carousel/slick/slick.min.js',
                '<%= package.config.npm %>/aos/dist/aos.js',
                '<%= package.config.dist.scripts %>/main.js'
            ]
        }
    }
};
