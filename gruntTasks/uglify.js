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
                '<%= package.config.dist.scripts %>/main.js'
            ]
        }
    }
};
