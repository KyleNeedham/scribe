module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  // Core tasks
  const tasks = ['jasmine'];

  grunt.initConfig({
    jasmine: {
      scribe: {
        options: {
          specs: './spec/scribe.spec.js',
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfig: {
              paths: {
                scribe: './lib/scribe'
              }
            }
          }
        }
      }
    }
  });

  grunt.registerTask('default', tasks);
  grunt.registerTask('test', tasks);
};
