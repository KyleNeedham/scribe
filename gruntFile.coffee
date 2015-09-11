module.exports = (grunt) ->

  require('load-grunt-tasks') grunt

  # Core tasks
  tasks = ['coffee', 'uglify', 'jasmine']

  grunt.initConfig
    coffee:
      main:
        options:
          expand: yes
          join: yes
        files:
          'dist/scribe.js': 'src/scribe.coffee'
      specs:
        files: [
          expand: yes
          cwd: 'spec/coffeescripts/'
          src: '*.spec.coffee'
          dest: 'spec/javascripts/'
          ext: '.spec.js'
        ]
    jasmine:
      src: [
        'node_modules/underscore/underscore.js'
        'dist/scribe.js'
      ]
      options:
        specs: 'spec/javascripts/**/*.spec.js'
    uglify:
      dist:
        files:
          'dist/scribe.min.js': 'dist/scribe.js'
    watch:
      files: [
        'src/*',
      ],
      tasks: tasks

  grunt.registerTask 'default', tasks
  grunt.registerTask 'test', ['jasmine']
