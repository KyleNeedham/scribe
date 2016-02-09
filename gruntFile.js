module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  // Core tasks
  const tasks = ['uglify', 'jasmine'];

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
    },
    uglify: {
      scribe: {
        files: {
          'lib/scribe.js': 'lib/scribe.js'
        }
      }
    }
  });

  grunt.registerTask('default', tasks);
  grunt.registerTask('test', 'jasmine');
};
