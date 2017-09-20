'use strict';

module.exports = {
    fonts: {
        nonull: true,
        files: {
            '<%= package.config.dist.fonts %>/grid.ttf': '<%= package.config.src.fonts %>/grid.ttf',
            '<%= package.config.dist.fonts %>/Linearicons.ttf': '<%= package.config.src.fonts %>/Linearicons.ttf'
        }
    }
};
