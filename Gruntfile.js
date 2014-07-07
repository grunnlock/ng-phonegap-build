'use strict';

module.exports = function(grunt) {

	var appConfig = {
		port: 35729,
		path: 'http://127.0.0.1/YOUR_PROJECT_FOLDER/', // The path to your project, used by open
		app: 'app',
		dist: 'dist',
	    ios: 'ios',
	    android: 'android',
	    pgbModules: 'pgb_modules',
	    pgbSettings: {
	    	appId: 000000,				 // Don't forget to change
	    	email: 'ACCOUNT_EMAIL',		 // these settings with your
	    	password: 'ACCOUNT_PASSWORD' // Phonegap Build account ones!
	    }
	};

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take
	require('time-grunt')(grunt);

	grunt.initConfig({

		config: appConfig,

		// Watch files and do specific actions if they're edited
		watch: {
			options: {
            	livereload: {port: '<%= config.port %>'}
            },
            server: {
            	files: [
            		'<%= config.app %>/index.html',
            		'<%= config.app %>/views/{,*/}*.html',
            		'<%= config.app %>/scripts/**/*.js'
            	],
            },
            sass: {
        		files: ['<%= config.app %>/styles/{,*/}*.scss'],
       			tasks: ['newer:sass:all']
      		}
        },

		// Check js syntax to avoid errors
		jshint: {
			all: ['<%= config.app %>/js/*.js']
		},

        // Delete files
        clean: {
        	server: {
        		src: [
        			'.tmp/{,*/}*'
        		]
        	},
        	prepare: {
        		src: [
        			'.tmp/{,*/}*',
        			'<%= config.ios %>{,*/}*',
        			'<%= config.android %>{,*/}*'
        		]
        	},
        	build: {
				src: [
        			'<%= config.dist %>'
        		]
        	}
        },

        // Copy/paste files
		copy: {
			build: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    src: [
                    	'{,*/*}*.html',
                    	'views/**/*'
                    ],
                    dest: '<%= config.dist %>'
                }, {
                    expand: true,
                    cwd: 'bower_components',
                    src: ['font-awesome/fonts{,*/}*'],
                    dest: '<%= config.dist %>/bower_components'
                }]
            },
            // Platforms
			ios: {
				files: [{
					expand: true,
					cwd: '<%= config.dist %>',
					dest: '<%= config.ios %>/www',
					src: '**/*'
				}, {
					expand: true,
					cwd: '<%= config.pgbModules %>/<%= config.ios %>',
					dest: '<%= config.ios %>/www',
					src: '**/*'
				}, {
					expand: true,
					cwd: '<%= config.pgbModules %>/all',
					dest: '<%= config.ios %>/www',
					src: '**/*'
				}]
			},
			android: {
				files: [{
					expand: true,
					cwd: '<%= config.dist %>',
					dest: '<%= config.android %>/www',
					src: '**/*'
				}, {
					expand: true,
					cwd: '<%= config.pgbModules %>/<%= config.android %>',
					dest: '<%= config.android %>/www',
					src: '**/*'
				}, {
					expand: true,
					cwd: '<%= config.pgbModules %>/all',
					dest: '<%= config.android %>/www',
					src: '**/*'
				}]
			}
        },

		// Compiles Sass to CSS and generates necessary files if requested
		sass: {
	        all: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/styles',
					src: ['*.scss'],
					dest: '.tmp',
					ext: '.css'
				}]
	        }
	    },

  		// Update index.html for different platforms folders
  		targethtml: {
			ios: {
				files: {
					'<%= config.ios %>/www/index.html': '<%= config.ios %>/www/index.html'
				}
			},
			android: {
				files: {
					'<%= config.android %>/www/index.html': '<%= config.android %>/index.html'
				}
			}
		},

		// Run some tasks in parallel to speed up the processes
	    concurrent: {
	    	server: [
	    		'sass:all'
	    	],
	    	build: [
	    		'sass:all',
	    		'imagemin'
	    	]
	    },

	    // Compress images
		imagemin: {
			build: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg,gif}',
					dest: '<%= config.dist %>/images'
				}]
			}
	    },

		// Preserve AngularJS variables syntax for minification
		ngmin: {
			build: {
				files: [{
					expand: true,
					cwd: '.tmp/concat/scripts',
					src: '*.js',
					dest: '.tmp/concat/scripts'
				}]
			}
		},

        // Minify html
        htmlmin: {
            build: {
            	options: {
		        	collapseWhitespace: true
		        },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '**/*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },

		useminPrepare: {
			options: {
				dest: '<%= config.dist %>'
			},
			html: '<%= config.app %>/**/*.html'
		},

		usemin: {
			options: {
                assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
            },
            html: ['<%= config.dist %>/index.html'],
            css: ['<%= config.dist %>/styles/**/*.css']
		},

        // Open app on browser
        open: {
			server: {
				path: '<%= config.path %><%= config.app %>'
			}
		},

		// Create "www" zip file for each platform
		compress: {
			ios: {
				options: {
					archive: '<%= config.ios %>/www.zip'
				},
				files: [{
					expand: true,
					cwd: '<%= config.ios %>/www/',
					src: ['**/*'],
					dest: 'www/'
				}]
			},
			android: {
				options: {
					archive: '<%= config.android %>/www.zip'
				},
				files: [{
					expand: true,
					cwd: '<%= config.android %>/www/',
					src: ['**/*'],
					dest: 'www/'
				}]
			}
		},

		// Send applications to Phonegap Build
		// N.B.: Don't forget to unlock the keys for each platform!
		'phonegap-build': {
			ios: {
				options: {
					archive: '<%= config.ios %>/www.zip',
					'appId': '<%= config.pgbSettings.appId %>',
					'user': {
						'email': '<%= config.pgbSettings.email %>',
						'password': '<%= config.pgbSettings.password %>'
					}
				}
			},
			android: {
				options: {
					archive: '<%= config.android %>/www.zip',
					'appId': '<%= config.pgbSettings.appId %>',
					'user': {
						'email': '<%= config.pgbSettings.email %>',
						'password': '<%= config.pgbSettings.password %>'
					}
				}
			}
		}

	});

	grunt.registerTask('serve', [
		'jshint:all',
		'clean:server',
		'concurrent:server',
		'open:server',
		'watch'
	]);

	grunt.registerTask('default', [
		'jshint:all',
		'build'
	]);

	grunt.registerTask('build', [
		'clean:prepare',
		'concurrent:build',
		'copy:build',
		'useminPrepare',
		'concat',
		'ngmin',
	    'uglify',
	    'cssmin',
	    'usemin',
	    'htmlmin',
		'generate:ios',
		'generate:android',
		'clean:build'
	]);

	grunt.registerTask('generate', 'Generate applications zip files for Phonegap Build', function (target) {
		if (target === 'ios' || target === 'android') {
			grunt.task.run([
			'copy:' + target,
			'targethtml:' + target,
			'compress:' + target
			]);
		} else {
			grunt.log.error('Incorrect target');
		}
	});

	grunt.registerTask('send', 'Send the application to Phonegap Build', function (target) {
		if (target === 'ios' || target === 'android') {
			grunt.task.run('phonegap-build:' + target);
		} else {
			grunt.log.error('Incorrect target');
		}
	});

};