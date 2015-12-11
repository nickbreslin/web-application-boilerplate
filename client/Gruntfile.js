'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        pkg:        grunt.file.readJSON('package.json'),
        qunit:      grunt.file.readJSON('grunt/qunit.json'),
        jshint:     grunt.file.readJSON('grunt/jshint.json'),
        uglify:     grunt.file.readJSON('grunt/uglify.json'),
        clean:      grunt.file.readJSON('grunt/clean.json'),
        watch:      grunt.file.readJSON('grunt/watch.json'),
        dalek:      grunt.file.readJSON('grunt/dalek.json'),
        exec:       grunt.file.readJSON('grunt/exec.json'),
        jsdoc:      grunt.file.readJSON('grunt/jsdoc.json'),
        handlebars: grunt.file.readJSON('grunt/handlebars.json'),
        'jsdoc-ng': grunt.file.readJSON('grunt/jsdoc-ng.json')
    });

    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-dalek');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-circleci');
    grunt.loadNpmTasks('grunt-aws');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-jsdoc-ng');

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('compile', ['default', 'clean:build', 'uglify', 'handlebars']);
    grunt.registerTask('test', ['compile' /*, 'qunit', 'dalek'*/]);
    grunt.registerTask('ci', ['test']);

    grunt.registerTask('docs', ['test', 'clean:docs', 'jsdoc', 'jsdoc-ng']);
};