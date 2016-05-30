var gulp = require('gulp');
var webserver = require('gulp-webserver');
var stylus = require('gulp-stylus');
var nib = require('nib');
var minifyCSS = require('gulp-minify-css');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var smoosher = require('gulp-smoosher');
var iamgeop = require('gulp-image-optimization');
var stripCssComments = require('gulp-strip-css-comments');

var config = {
  styles: {
    main: './src/styles/main.styl',
    watch: './src/styles/**/*.styl',
    output: './build/css'
  },
  html: {
    watch: './build/*.html'

  },
  scripts: {
    main: './src/scripts/main.js',
    watch: './src/scripts/**/*.js',
    output: './build/js'
  },
  images: {
    watch: ['./build/images/*.png', './build/images/*.jpg ' , './build/images/*.ico' , './build/images/*.gif','./build/images/**/*.png', './build/images/**/*.jpg ' , './build/images/**/*.ico' , './build/images/**/*.gif'  ],
    output: './dist/images'
  },

  php:{
    watch: './build/php/*.php'
  },

  fonts:{
    watch: ['./build/fonts/*.otf','./build/fonts/*.woff']
  }
}

gulp.task('server', function() {
  gulp.src('./build')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 8080,
      livereload: true
    }));
});

gulp.task('build:css', function() {
  gulp.src(config.styles.main)
    .pipe(stylus({
      use: nib(),
      'include css': true
    }))
    .pipe(stripCssComments(false))
    .pipe(minifyCSS())
    .pipe(gulp.dest(config.styles.output));
});

gulp.task('build:js', function() {
  return browserify(config.scripts.main)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(config.scripts.output));
});

gulp.task('images' , function(){
  gulp.src(config.images.watch)
  .pipe(iamgeop({
    optimizationLevel: 5,
    progressive: true,
    interlaced: true
  }))
  .pipe(gulp.dest(config.images.output));
})

gulp.task('inline', function() {
  gulp.src('./build/*.html')
    .pipe(smoosher())
    .pipe(gulp.dest('./dist'));
  gulp.src('./build/php/*.php')
    .pipe(gulp.dest('./dist/php'));
  gulp.src('./build/fonts/*.otf' )
    .pipe(gulp.dest('./dist/fonts'));
   gulp.src('./build/fonts/*.woff' )
    .pipe(gulp.dest('./dist/fonts'));

});

gulp.task('watch', function() {
  gulp.watch(config.images.watch, ['images']);
  gulp.watch(config.scripts.watch, ['build:js']);
  gulp.watch(config.styles.watch, ['build:css']);
  gulp.watch(config.html.watch, ['build']);
});


gulp.task('build', ['build:css', 'build:js' , 'images' , 'inline']);

gulp.task('default', ['server', 'watch', 'build']);
