// gulp
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

// codemirror
gulp.task('bs',function(){
  gulp.src(['./vendor/rockskeleton/dist/**/*.*'],{base:'./vendor'})
    .pipe(gulp.dest('lib'));
});

gulp.task('jq',function(){
  gulp.src(['./vendor/jquery/dist/**/*.*'],{base: './vendor'})
    .pipe(gulp.dest('lib'));
});

//
gulp.task('default', function(){
  gulp.start('bs','jq');
  gulp.watch('./vendor/**/*.*',function(){
    gulp.start('bs','jq');
  });

});
