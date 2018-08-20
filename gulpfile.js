const path = require("path")
const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');

gulp.task('builddev', () => {
    return watch(path.resolve(__dirname, 'src/nodeuii/**/*.js'), { ignoreInitial: false }, () => {
        gulp.src(path.resolve(__dirname, 'src/nodeuii/**/*.js'))
            .pipe(babel({
                babelrc: false
            }))
            .pipe(gulp.dest('dist'))
    })

}
);
let _task = ["builddev"]
if (process.env.NODE_ENV == "production") {
    _task = []
}
gulp.task("default", _task)