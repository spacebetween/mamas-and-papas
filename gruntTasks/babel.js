'use strict';

const babel = {
    options: {
        sourceMap: true,
        presets: ['es2015']
    },
    dist: {
        files: {
            '<%= package.config.dist.scripts %>/main.js': '<%= package.config.dist.scripts %>/main.js'
        }
    }
};

module.exports = babel;
