'use strict';

module.exports = function (grunt) {

    // load grunt config
    var path = require('path');
    var tasksPath = require('./package.json').config.tasks;
    require('load-grunt-config')(grunt, {
        configPath: path.join(process.cwd(), tasksPath)
    });
};
