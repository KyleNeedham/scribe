module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  // Core tasks
  const tasks = ['jasmine'];

  grunt.initConfig({
    jasmine: {
      scribe: {
        options: {
          specs: './dist/spec/scribe.spec.js',
          template: require('grunt-template-jasmine-requirejs'),
          keepSpecRunner: true
        }
      }
    }
  });

  grunt.registerTask('default', tasks);
  grunt.registerTask('test', tasks);
};
