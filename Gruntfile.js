/*global module:false*/
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration. 
    concat: {
      dist: {
        src: ['<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    copy: {
      index: {
        src: 'index.html',
        dest: 'dist/index.html',
      }
    },
    uglify: {
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['**/*.js', './index.html'],
        tasks: ['build'],
        options: {
          spawn: false,
        },
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile'],
      }
    },
    connect: {
      server: {
        options: {
          protocol: "https",
          hostname: "bitmovin.local.vuplay.co.uk",
          port: 14712,
          base: "dist",
          keepalive: true,
        }
      }
    },

    concurrent: {
      target1: {
        tasks: ['connect', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-concurrent');

  // Build task.
  grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'copy']);
  grunt.registerTask('serve', ['build', 'concurrent:target1']);

};