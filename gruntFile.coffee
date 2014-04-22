module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  # Core tasks
  tasks = ['coffee', 'uglify', 'jasmine']

  grunt.initConfig
    coffee:
      main:
        options:
          expand: yes
          join: yes
        files:
          'dist/translator.js': 'src/translator.coffee'
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
        'dist/translator.js'
      ]
      options:
        specs: 'spec/javascripts/**/*.spec.js'
    uglify:
      dist:
        files:
          'dist/translator.min.js': 'dist/translator.js'
    watch:
      files: [
        'src/*',
      ],
      tasks: tasks

  grunt.registerTask 'default', tasks
  grunt.registerTask 'test', ['jasmine']
