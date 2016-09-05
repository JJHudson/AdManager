module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // RequireJS optimisation
    requirejs: {
      compile: {
        options: {
          baseUrl: "web/js/modules",
          name: "../main",
          out: "web/dist/main.js",
          optimize: "none"
        }
      }
    },

    // Concat JS (merging jQuery with RequireJS)
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['web/js/vendor/jquery.js', 'web/dist/main.js'],
        dest: 'web/dist/main.js'
      }
    },

    // Autoprefixer
    autoprefixer: {
      options: {
      },

      single_file: {
        options: {
        },
        src: 'web/css/main.css',
        dest: 'web/css/main.css'
      }
    },

    // Copy files
    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['web/img/**'], dest: 'web/dist/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['web/vid/**'], dest: 'web/dist/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['web/css/**'], dest: 'web/dist/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['web/js/vendor/*'], dest: 'web/dist/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['web/index.html'], dest: 'web/dist/', filter: 'isFile'}
        ]
      }
    },

    // Remove relative paths
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: /[\"\'](css|js|img|vid)\/([^\/\"\'"]*\/)*([^\"\']*)[\"\']/gi,
              replacement: "\"$3\""
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: 'web/dist/index.html', dest: 'web/dist'}
        ]
      }
    },

    // SASS
    sass: {
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'web/css/main.css': 'sass/main.scss'
        }
      }
    },

    // Watch
    watch: {
      stylesheets: {
        files: ['sass/**/*.scss'],
        tasks: ['sass']
      }

      /*scripts: {
        files: 'web/js/*.js',
        tasks: ['concat']
      }*/
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['requirejs', 'concat', 'autoprefixer', 'copy', 'replace']);
  grunt.registerTask('dev', ['requirejs', 'concat', 'autoprefixer', 'watch']);
};