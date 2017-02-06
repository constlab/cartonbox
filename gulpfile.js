'use strict';

// ==== Packages ==== //

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	csso = require('gulp-csso'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	wrap = require("gulp-wrap"),
	del = require('del'),
	csscomb = require('gulp-csscomb'),
	notify = require('gulp-notify'),
	multipipe = require('multipipe'),
	livereload = require('gulp-livereload'),
	header = require('gulp-header');

// ==== Paths ==== //

var paths = {
	docs: {
		html: 'docs/',
		css: 'docs/css/',
		img: 'docs/img/',
		js: 'docs/js/'
	},
	src: {
		html: 'src/**/*.html',
		css: {
			libs: [
				'node_modules/normalize.css/normalize.css',
				'node_modules/ilyabirman-likely/release/likely.css'
			],
			cb: [
				'src/less/cartonbox.less'
			],
			main: [
				'src/less/main.less'
			]
		},
		img: 'src/img/**/*',
		js: {
			libs: [
				'node_modules/jquery/dist/jquery.min.js',
				'node_modules/ilyabirman-likely/release/likely.js'
			],
			cb: [
				'src/js/cartonbox.js'
			],
			app: [
				'src/js/app.js'
			]
		}
	},
	watch: {
		html: 'src/**/*.html',
		css: 'src/less/**/*.less',
		img: 'src/img/**/*',
		js: 'src/js/**/*.js'
	}
};

// ==== Header ==== //

var pkg = require('./package.json'),
	banner = ['/*!',
		' * <%= pkg.title %> v<%= pkg.version %> by <%= pkg.author %>',
		' * <%= pkg.description %>',
		' * Demo: <%= pkg.homepage %>',
		' * License: <%= pkg.license %>',
		' */',
		'',
		''].join('\n');

// ==== Build ==== //

gulp.task('html', function() {
	return multipipe(
		gulp.src(paths.src.html),
		gulp.dest(paths.docs.html)
	).on('error', notify.onError(function(err) {
		return {
			title: 'html',
			message: 'Line: ' + err.line
		}
	}));
});

gulp.task('css:libs:min', function() {
	return multipipe(
		gulp.src(paths.src.css.libs),
		concat('libs.min.css'),
		csso(),
		gulp.dest(paths.docs.css)
	).on('error', notify.onError(function(err) {
		return {
			title: 'css:libs:min',
			message: 'Line: ' + err.line
		}
	}));
});

gulp.task('css:cb', function() {
	return multipipe(
		gulp.src(paths.src.css.cb),
		concat('cartonbox.css'),
		less(),
		autoprefixer(),
		csscomb(),
		header(banner, {pkg: pkg}),
		gulp.dest(paths.docs.css),
		livereload()
	).on('error', notify.onError(function(err) {
		return {
			title: 'css:cb',
			message: 'Line: ' + err.line
		}
	}));
});

gulp.task('css:cb:min', function() {
	return multipipe(
		gulp.src(paths.src.css.cb),
		concat('cartonbox.min.css'),
		less(),
		autoprefixer(),
		csscomb(),
		csso(),
		header(banner, {pkg: pkg}),
		gulp.dest(paths.docs.css),
		livereload()
	).on('error', notify.onError(function(err) {
		return {
			title: 'css:cb:min',
			message: 'Line: ' + err.line
		}
	}));
});

gulp.task('css:main:min', function() {
	return multipipe(
		gulp.src(paths.src.css.main),
		concat('main.min.css'),
		less(),
		autoprefixer(),
		csscomb(),
		gulp.dest(paths.docs.css),
		livereload()
	).on('error', notify.onError(function(err) {
		return {
			title: 'css:main:min',
			message: 'Line: ' + err.line
		}
	}));
});

gulp.task('img', function() {
	return multipipe(
		gulp.src(paths.src.img),
		gulp.dest(paths.docs.img)
	).on('error', notify.onError(function(err) {
		return {
			title: 'img',
			message: 'Line: ' + err.line
		}
	}));
});

gulp.task('js:libs:min', function() {
	return multipipe(
		gulp.src(paths.src.js.libs),
		concat('libs.min.js'),
		uglify({mangle: false}),
		gulp.dest(paths.docs.js)
	).on('error', notify.onError(function(err) {
		return {
			title: 'js:libs:min',
			message: 'Line: ' + err.line
		}
	}));
});

gulp.task('js:cb', function() {
	return multipipe(
		gulp.src(paths.src.js.cb),
		concat('cartonbox.js'),
		header(banner, {pkg: pkg}),
		gulp.dest(paths.docs.js),
		livereload()
	).on('error', notify.onError(function(err) {
		return {
			title: 'js:cb',
			message: 'Line: ' + err.line
		}
	}));
});

gulp.task('js:cb:min', function() {
	return multipipe(
		gulp.src(paths.src.js.cb),
		concat('cartonbox.min.js'),
		uglify(),
		header(banner, {pkg: pkg}),
		gulp.dest(paths.docs.js),
		livereload()
	).on('error', notify.onError(function(err) {
		return {
			title: 'js:cb:min',
			message: 'Line: ' + err.line
		}
	}));
});

gulp.task('js:app', function() {
	return multipipe(
		gulp.src(paths.src.js.app),
		concat('app.js'),
		gulp.dest(paths.docs.js),
		livereload()
	).on('error', notify.onError(function(err) {
		return {
			title: 'js:app',
			message: 'Line: ' + err.line
		}
	}));
});

// ==== Watch ==== //

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(paths.watch.html, ['html']);
	gulp.watch(paths.watch.css, ['css:cb', 'css:main']);
	gulp.watch(paths.watch.img, ['img']);
	gulp.watch(paths.watch.js, ['js:cb', 'js:app']);
});

// ==== Clean ==== //

gulp.task('clean', function() {
	return del.sync(['docs/**', '!docs']);
});

// ==== Default ==== //

gulp.task('default', ['clean', 'html', 'css:libs:min', 'css:cb', 'css:cb:min', 'css:main:min', 'img', 'js:libs:min', 'js:cb', 'js:cb:min', 'js:app']);
