var fs = require('fs');

module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            build: {
                options: {},
                files: {
                    'dist/style_less.css': 'src/less/style.less'
                }
            },
            minified: {
                options: {
                    cleancss: true
                },
                files: {
                    'dist/style_less.min.css': 'src/less/style.less'
                }
            },
            // re-minify everything in tests/ so that they all
            // have the same minification for comparision
            test: {
                options: {
                    cleancss: true,
                    cleancssOptions: {
                        keepSpecialComments: '0'
                    }
                },
                files: {
                    'tests/less/style_less.min.css': 'src/less/style.less'
                }
            }
        },

        eslint: {
            all: ['src/js/*.js', 'lib/*.js', 'grunt/*/*.js', 'app.js'],
            options: {
                config: "config/eslint.json",
            }
        },

        jshint: {
            files: [
                'gruntfile.js',
                'src/js/*.js',
                'lib/*.js',
                'grunt/*/*.js',
                'app.js'
            ],
            options: {
                globals: {
                    console: true
                },
                node: true
            }
        },

        uglify: {
            options: {
                mangle: true,  // false when debugging
                compress: true,  // false when debugging
                sourceMap: false,
                preserveComments: 'some'
            },
            js: {
                files: {
                    'dist/combo.min.js': ['src/js/script.js']
                }
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist',
                    ext: '.min.css'
                }]
            }
        },
        // Copy to dist
        copy: {
            js: {
                expand: true,
                cwd: 'src/js',
                src: '*.js',
                dest: 'dist/'
            },
            css: {
                expand: true,
                cwd: 'src/css',
                src: '*.css',
                dest: 'dist/'
            },
            docs: {
                expand: true,
                cwd: 'dist',
                src: ['*.min.js'],
                dest: 'docs/static'
            }
        },

        //convert less to stylus
        execute: {
            test: {
                call: function(grunt, options, async) {
                    var done = async();
                    done();
                }
            }
        },

        clean: {
            test: ['tests/*']
        },

        watch: {
            script: {
               options: {
                    spawn: false,
                    event: ['added', 'deleted', 'changed']
                },
                files: ['src/**/*.js', 'src/**/*.css', 'src/**/*.less'],
                tasks: ['build']
            },
            grunt: {
                files: ['Gruntfile.js']
            }
        }
    });

    // Load module
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('eslint-grunt');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Create grunt task
    grunt.registerTask('build', [
        'less:build',
        'less:minified',
        'eslint',
        'jshint',
        'uglify',
        'cssmin',
        'copy',
        'less:test',
        'execute:test',
        'clean:test'
    ]);

    grunt.registerTask('default', ['build', 'watch']);
};