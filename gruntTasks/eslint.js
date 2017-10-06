'use strict';

module.exports = {
    options: {
        configFile: '.eslintrc.json',
        fix: true
    },
    grunt: [
        'Gruntfile.js',
        '<%= package.config.tasks %>/**/*.js'
    ],
    webBuild: [
        '<%= package.config.src.scripts %>/**/*.js',
        '!<%= package.config.src.scripts %>/vendor/*.js',
        '!<%= package.config.src.scripts %>/plugins/*.js'
    ],
    server: [
        '<%= package.config.src.server %>/**/*.js',
        'index.js'
    ]
};
