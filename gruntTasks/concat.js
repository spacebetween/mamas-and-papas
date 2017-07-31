'use strict';

module.exports = {
    options: {},
    dist: {
        files: {
            '<%= package.config.dist.scripts %>/main.js': [
                '<%= package.config.src.scripts %>/main.js',
                '<%= package.config.src.scripts %>/*'
            ]
        }
    }
};
