const gulp = require('gulp');

gulp.task('processJS', () => {
    gulp.src('*.js')
        .pipe(gulp.dest('dist'));
});

