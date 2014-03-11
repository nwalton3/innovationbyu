'use strict'
path = require('path')
# lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet

folderMount = (connect, point) ->
	return connect.static(path.resolve(point))


module.exports = (grunt) ->

	grunt.initConfig
		pkg: grunt.file.readJSON('package.json')

		uglify:
			options:
				mangle: false
				preserveComments: 'some'
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %>  */'
				compress: true
				report: 'min'
			byuticketsjs:
				options:
					sourceMap: 'js/byutickets.min.js.map'
					sourceMappingURL: 'byutickets.min.js.map'
				files:
					'js/innovation.min.js': [	
						#'js/bootstrap/bootstrap-transition.js',
						#'js/bootstrap/bootstrap-collapse.js',
						#'js/bootstrap/bootstrap-tab.js',
						# 'js/plugins/hashchange.js',
						'js/innovation.js' ]
			scriptjs:
				options:
					sourceMap: 'js/innovation.min.js.map'
					sourceMappingURL: 'innovation.min.js.map'
				files:
					'js/innovation.min.js' : 'js/innovation.js'

		# jshint:
		# 	options:
		# 		"camelcase" : false
		# 		"es3" : false
		# 		"trailing" : false
		# 		"white" : false
		# 		"smarttabs" : true
		# 		"jquery" : true
		# 		"browser" : true
		# 		"laxcomma" : true
		# 	files:[
		# 		'js/byutickets.js',
		# 		'js/script.js'
		# 	]


		sass:
			options:
				style: 'compressed'
				compass: 'config.rb'
				#debugInfo: true
				trace: true
				loadPath: ['sass/','sass/**/*']
				sourcemap: true
			innovation:
				files:[
					expand: true
					cwd: 'sass/'
					src: ['innovation.sass']
					dest: 'css/'
					ext: '.css'
				]
			responsive:
				files:[
					expand: true
					cwd: 'sass/'
					src: ['responsive.scss']
					dest: 'css/'
					ext: '.css'
				]

		autoprefixer:
			options:
				map: true
			src: 'css/innovation.css'

		watch:
			sass_innovation:
				files: ['sass/innovation.sass']
				tasks: ['sass:innovation', 'autoprefixer']
			sass_responsive:
				files: ['sass/responsive.scss', 'sass/responsive/**/*.scss']
				tasks: ['sass:responsive', 'autoprefixer']
			sass_all:
				files: ['sass/shared/**/*.scss']
				tasks: ['sass', 'autoprefixer']				

			js:
				files: ['js/innovation.js', 'js/script.js']
				tasks: ['uglify']

			css:
				files: ['css/**/*']
				options:
					livereload: true
			templates:
				files: ['templates/*', 'template.php', 'innovation.info']
				options:
					livereload: true
			images:
				files: ['img/*']
				options:
					livereload: true
			scripts:
				files: ['js/script.min.js', 'js/innovation.min.js']
				options:
					livereload: true


	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-sass')
	grunt.loadNpmTasks('grunt-autoprefixer')
	grunt.loadNpmTasks('grunt-contrib-watch')

	# Default task(s).
	grunt.registerTask('compile', ['sass', 'uglify'])
	grunt.registerTask('default', ['compile', 'watch'])
