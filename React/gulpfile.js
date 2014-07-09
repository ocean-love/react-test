var gulp = require('gulp');

var compass = require('gulp-compass')
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');

var reactify = require('reactify');
var react = require('gulp-react');

var browserify = require('browserify');


var source = require('vinyl-source-stream');
var CombinedStream = require('combined-stream');
var watch = require('gulp-watch');

var buildReact = function(b){ 
  b.add('./Script/App/app.js');

  /// Translate react syntax to proper JS
  b.transform(reactify)  

  /// Write to file
  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('Script/Build'));
}

var buildCompass=function(release){
  return gulp.src('./Content/SASS/main.scss')
    .pipe( compass(
      {
        config_file: 'config.rb',
        sass: './Content/SASS',
        css: './Content/CSS'
      }
      ))
    .on('error', function(err) {
      console.log("SASS ERROR "+err);
    })
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCSS())  
    .pipe(gulp.dest('./Content/CSS'));
}



gulp.task('compass', function() {
  return buildCompass(true);
});

/*
  Build SERVER JS
**/
gulp.task('react', function() {
    return buildReact(browserify());
});


gulp.task('watch', function () {
  /// Build Bundle when JS Changes
  watch({glob: "./Script/App/**/*.js"}, function (files) {
      return buildReact(browserify());
  });

  watch({glob: "./Content/SASS/**/*.scss"}, function (files) {
      return buildCompass(false);
  });
});

gulp.task('default', ['react']);
