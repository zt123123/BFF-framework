const path = require("path")
const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
const gulpSequence = require('gulp-sequence')

gulp.task('builddev', () => {
    return watch(path.resolve(__dirname, 'src/nodeuii/**/*.js'), { ignoreInitial: false }, () => {
        gulp.src(path.resolve(__dirname, 'src/nodeuii/**/*.js'))
            .pipe(babel({
                babelrc: false,
                "plugins": ["transform-es2015-modules-commonjs"]
            }))
            .pipe(gulp.dest('dist'))
    })

});
gulp.task('buildprod', () => {
    gulp.src(path.resolve(__dirname, 'src/nodeuii/**/*.js'))
        .pipe(babel({
            babelrc: false,
            ignore: ["./src/nodeuii/config/*.js"],
            "plugins": ["transform-es2015-modules-commonjs"]
        }))
        .pipe(gulp.dest('dist'))

});
gulp.task('configclean', () => {
    gulp.src('./src/nodeuii/**/*.js')
        .pipe(rollup({
            input: './src/nodeuii/config/index.js',
            output: {
                format: "cjs"
            },
            plugins: [
                replace({
                    "process.env.NODE_ENV": JSON.stringify('production')
                })
            ]
        }))
        .pipe(gulp.dest('./dist'));
});

let _task = ["builddev"]
if (process.env.NODE_ENV == "production") {
    _task = gulpSequence("buildprod", "configclean")
}
gulp.task("default", _task)