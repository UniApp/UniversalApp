module.exports = function (grunt) {
// Load tasks provided by each plugin
    grunt.loadNpmTasks("grunt-contrib-coffee");
    grunt.loadNpmTasks("grunt-contrib-stylus");
    grunt.loadNpmTasks("grunt-contrib-jade");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-jshint');

// Project configuration
    grunt.initConfig({
        coffee: {
            build: {
                options: {
                    join: true
                },
                src: "src/scripts/app.coffee",
                dest: "build/js/app.js"
            }
        },
        stylus: {
            build: {
                src: "src/styles/app.styl",
                dest: "build/css/app.css"
            }
        },
        jade: {
            build: {
                options: {
                    pretty: true
                },
                src: "src/views/app.jade",
                dest: "build/app.html"
            }
        },
        uglify: {
            options: {
                compress: {
                    global_defs: {
                        "DEBUG": false
                    },
                    dead_code: true
                }
            },
            my_target: {
                src: "<%=coffee.build.dest%>",
                dest: "<%=coffee.build.dest%>"
            }
        },
        cssmin: {
            compress: {
                src: "<%= stylus.build.dest %>",
                dest: "<%= stylus.build.dest %>"
            }
        },
        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                removeOptionalTags: true
            },
            compress: {
                src: "<%= jade.build.dest %>",
                dest: "<%= jade.build.dest %>"
            }
        },
        watch: {
            scripts: {
                files: "src/scripts/**/*.coffee",
                tasks: "scripts"
            },
            styles: {
                files: "src/styles/**/*.styl",
                tasks: "styles"
            },
            views: {
                files: "src/views/**/*.jade",
                tasks: "views"
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                undef: true
            },
            target1: ['Gruntfile.js', 'build/**/*.js']
        }
    });


    // Initialize environment
    var env = grunt.option('env') || 'dev';
    // Environment specific tasks
    if (env === 'prod') {
        grunt.registerTask('scripts', ['coffee', 'uglify']);
        grunt.registerTask('styles', ['stylus', 'cssmin']);
        grunt.registerTask('views', ['jade', 'htmlmin']);
    } else {
        grunt.registerTask('scripts', ['coffee']);
        grunt.registerTask('styles', ['stylus']);
        grunt.registerTask('views', ['jade']);
    }
    // Define the default task
    grunt.registerTask('build', ['scripts', 'styles', 'views']);
    grunt.registerTask('default', ['build', 'jshint']);
};
