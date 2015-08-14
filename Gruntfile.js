"use strict";

module.exports = function(grunt) {
    grunt.initConfig({

        less: {
            build: {
                options: {},
                files: {
                    "dist/style_less.css": "src/less/style.less"
                }
            },
            minified: {
                options: {
                    cleancss: true
                },
                files: {
                    "dist/style_less.min.css": "src/less/style.less"
                }
            }
        },

        eslint: {
            all: [
                "gruntfile.js",
                "lib/*.js",
                "components/*.jsx",
                "app.js",
                "src/*/*.js",
                "app.js",
                "Gruntfile.js"
            ],
            options: {
                config: "config/eslint.json"
            }
        },

        browserify: {
            options: {
              transform: [["babelify", { "stage": 2 }]]
            },
            client: {
                src: ["components/*.jsx", "build/lodash.build.min.js", "src/js/script.js"],
                dest: "dist/react/bundle.js"
            }
        },

        // Copy to dist
        copy: {
            js: {
                expand: true,
                cwd: "src/js",
                src: "*.js",
                dest: "dist/"
            }
        },

        watch: {
            script: {
               options: {
                    spawn: false,
                    event: ["added", "deleted", "changed"]
                },
                files: ["src/**/*.js", "src/**/*.css", "src/**/*.less"],
                tasks: ["build"]
            },
            grunt: {
                files: ["Gruntfile.js"]
            },
            jsx: {
                files: ["components/**/*.jsx"],
                tasks: ["browserify"]
            }
        },

        nodemon: {
            dev: {
                script: "app.js"
            }
        },

        concurrent: {
            dev: {
                tasks: ["build", "nodemon:dev", "watch"],
                options: {
                    logConcurrentOutput: true
                }
            }
        }

    });

    // Load module
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("eslint-grunt");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-concurrent");
    grunt.loadNpmTasks("grunt-nodemon");

    // Create grunt task
    grunt.registerTask("build", [
        "less:build",
        "less:minified",
        "eslint",
        "browserify",
        "copy"
    ]);

    grunt.registerTask("dev", ["concurrent:dev"]);
};
