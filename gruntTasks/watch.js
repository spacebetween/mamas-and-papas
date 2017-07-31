'use strict';

module.exports = {
    express: {
        files: ['<%= package.config.src.views %>/**/*.hbs', '<%= package.config.src.server %>/**/*.js'],
        tasks: ['express', 'eslint'],
        options: {
            spawn: false
        }
    },
    css: {
        files: ['<%= package.config.src.styles %>/**/*.scss'],
        tasks: ['css']
    },
    js: {
        files: ['<%= package.config.src.scripts %>/**/*.js'],
        tasks: ['js']
    },
    svgs: {
        files: ['<%= package.config.src.svgs %>/**/*.svg'],
        tasks: ['svgs']
    }
};
