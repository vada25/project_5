import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';

// Инициализация gulp-sass с компилятором dartSass
const sass = gulpSass(dartSass);

// Задача для запуска сервера
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch('src/*.html').on('change', browserSync.reload);
});

// Задача для компиляции стилей
gulp.task('styles', function() {
    return gulp.src('src/sass/*.+(scss|sass)')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

// Задача для отслеживания изменений в файлах стилей
gulp.task('watch', function() {
    gulp.watch('src/sass/*.+(scss|sass)', gulp.parallel('styles'));
});

// Задача по умолчанию, запускающая сервер, стили и отслеживание изменений
gulp.task('default', gulp.parallel('watch', 'server', 'styles'));