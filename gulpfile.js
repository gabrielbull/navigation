﻿var browserify = require('browserify');
var shim = require('browserify-shim');
var gulp = require('gulp');
var concat = require('gulp-concat');
var derequire = require('gulp-derequire');
var mocha = require('gulp-mocha');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var typescript = require('gulp-tsc');
var uglify = require('gulp-uglify');

var tests = [
	{ name: 'NavigationRouting', from: './NavigationJS/test/NavigationRoutingTest.ts', to: 'navigationRouting.test.js' },
	{ name: 'StateInfo', from: './NavigationJS/test/StateInfoTest.ts', to: 'stateInfo.test.js' },
	{ name: 'Navigation', from: './NavigationJS/test/NavigationTest.ts', to: 'navigation.test.js' },
	{ name: 'NavigationData', from: './NavigationJS/test/NavigationDataTest.ts', to: 'navigationData.test.js' }
];
var plugins = [
	{ name: 'NavigationReact', from: './NavigationReact/src/NavigationReact.ts', to: 'navigation.react.js' },
	{ name: 'NavigationKnockout', from: './NavigationKnockout/src/NavigationKnockout.ts', to: 'navigation.knockout.js' },
	{ name: 'NavigationAngular', from: './NavigationAngular/src/NavigationAngular.ts', to: 'navigation.angular.js' }
];
var testTasks = [];
function testTask(from, to) {
	return browserify(from)
		.plugin('tsify')
		.bundle()
		.pipe(source(to))
		.pipe(rename(to))
		.pipe(gulp.dest('./build/dist'))
        .pipe(mocha());
}
for (var i = 0; i < tests.length; i++) {
	(function (test) {
		gulp.task('Test' + test.name, function () {
			return testTask(test.from, test.to)
		});
	})(tests[i]);
	testTasks.push('Test' + tests[i].name);
}
gulp.task('test', testTasks);

gulp.task('BuildNavigation', function () {
	return buildTask('Navigation', './NavigationJS/src/Navigation.ts', 'navigation.js');
});
var buildTasks = ['BuildNavigation'];
function buildTask(name, from, to) {
	return browserify(from, { standalone: name })
		.plugin('tsify')
		.transform(shim)
		.bundle()
		.pipe(source(to))
		.pipe(rename(to))
		.pipe(derequire())
		.pipe(gulp.dest('./build/dist'))
		.pipe(rename(to.replace(/js$/, 'min.js')))
		.pipe(streamify(uglify()))
		.pipe(gulp.dest('./build/dist'));
}
for (var i = 0; i < plugins.length; i++) {
	(function (plugin) {
		gulp.task('Build' + plugin.name, function () {
			return buildTask(plugin.name, plugin.from, plugin.to);
		});
	})(plugins[i]);
	buildTasks.push('Build' + plugins[i].name);
}
gulp.task('build', buildTasks);

gulp.task('PackageNavigation', function () {
	return packageTask('Navigation', './NavigationJS/src/Navigation.ts');
})
var packageTasks = ['PackageNavigation'];
function packageTask(name, from) {
	return gulp.src(from)
		.pipe(typescript())
		.pipe(gulp.dest('./build/lib/' + name));
}
for (var i = 0; i < plugins.length; i++) {
	(function (plugin) {
		gulp.task('Package' + plugin.name, function () {
			return packageTask(plugin.name, plugin.from);
		});
	})(plugins[i]);
	packageTasks.push('Package' + plugins[i].name);
}
gulp.task('package', packageTasks);
