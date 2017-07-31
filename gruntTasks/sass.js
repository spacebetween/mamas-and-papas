'use strict';

var options = {
    options: {
        sourcemap: false,
        includePaths: [
            '<%= package.config.npm %>/'
        ],
        outputStyle: 'nested'
    },
    dist: {
        files: {
            '<%= package.config.dist.styles %>/styles.css': '<%= package.config.src.styles %>/default.scss'
        }
    }
};

module.exports = options;
