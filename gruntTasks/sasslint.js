'use strict';

module.exports = {
    options: {
        configFile: '.sass-lint.yml'
    },
    target: ['<%= package.config.src.styles %>/**/*.scss', '!<%= package.config.src.styles %>/legacy/*']
};
