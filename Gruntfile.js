/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    //regarde (instead of watch) watches for changes in file to fire tasks
    regarde: {
      dev: {
        files: [
            'js/**/*.js',
            'css/**/*.css',
            '*.html'
        ],
        tasks: ['livereload']
      }
    },

    //launch a tiny-lr server for livereload
    connect: {
      livereload: {
        options: {
          port: 9001,
          middleware: function(connect, options) {
            return [require('grunt-contrib-livereload/lib/utils').livereloadSnippet, (function(c,p) {
              return c.static(require('path').resolve(p));})(connect, '.')]
          }
        }
      }
    }
    
  });

  // These plugins provide necessary tasks.

  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');

  grunt.registerTask('lr', ['livereload-start', 'connect', 'regarde']);
  
  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit']);

};
