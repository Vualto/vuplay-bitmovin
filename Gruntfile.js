/*global module:false*/
module.exports = function(grunt) {
    grunt.initConfig({
        dist: "dist",
        pkg: grunt.file.readJSON("package.json"),
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
                globals: {},
            },
            gruntfile: {
                src: "Gruntfile.js",
            },
        },
        clean: ["<%= dist %>/*"],
        copy: {
            all: {
                expand: true,
                src: ["index.html"],
                dest: "<%= dist %>/",
                flatten: true,
            },
        },
        uglify: {
            js: {
                src: "src/<%= pkg.name %>.js",
                dest: "dist/<%= pkg.name %>.min.js",
            },
        },
        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ["**/*.js", "./index.html"],
                tasks: ["build"],
                options: {
                    spawn: false,
                },
            },
            gruntfile: {
                files: "<%= jshint.gruntfile.src %>",
                tasks: ["jshint:gruntfile"],
            },
        },
        connect: {
            server: {
                options: {
                    protocol: "https",
                    hostname: "bitmovin.local.vuplay.co.uk",
                    port: 14712,
                    base: "dist",
                    keepalive: true,
                },
            },
        },

        concurrent: {
            target1: {
                tasks: ["connect", "watch"],
                options: {
                    logConcurrentOutput: true,
                },
            },
        },
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify-es");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-concurrent");

    grunt.registerTask("build", ["jshint", "clean", "copy", "uglify"]);
    grunt.registerTask("serve", ["build", "concurrent:target1"]);
};
