module.exports = function(grunt) {
    'use strict';
    var assets = {
        pathCss: 'css/',
        pathJs: 'js/',
        pathCssSrc: 'src/css/',
        pathJsSrc: 'src/js/'
    };

    grunt.initConfig({
        assets: assets,
        uglify: {
            my_target: {
                files: {
                    '<%= assets.pathJsSrc %>monthly.min.js': '<%= assets.pathJs %>monthly.js'
                }
            }
        },
        less: {
            options: {
                compress: true,
                yuicompress: true,
                optimization: 2
            },
            development: {
                files: {
                    "<%= assets.pathCssSrc %>monthly.min.css": "<%= assets.pathCss %>monthly.less"
                }
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    '<%= assets.pathCssSrc %>monthly.min.css': '<%= assets.pathCss %>monthly.css'
                }
            }
        },
        serve: {
            options: {
                port: 3000
            }
        }
    });
    grunt.registerTask('default', ['uglify', 'less', 'serve']);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-serve');
};
