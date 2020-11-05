import { src, dest, watch } from 'gulp';
import yargs from 'yargs';
import sass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import plumber from 'gulp-plumber';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
const PRODUCTION = yargs.argv.prod;

export const styles = () => {
  return src(['src/scss/bundle.scss', 'src/scss/admin/admin.scss'])
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(PRODUCTION, postcss([ autoprefixer ])))
    .pipe(gulpif(PRODUCTION, cleanCss({compatibility:'ie8'})))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(dest('public/css'));
}

export const images = () => {
  return src('src/images/**/*.{jpg,jpeg,png,svg,gif}')
    .pipe(gulpif(PRODUCTION, imagemin()))
    .pipe(dest('public/images'));
}

export const copy = () => {
  return src(['src/**/*','!src/{images,js,scss}','!src/{images,js,scss}/**/*'])
    .pipe(dest('public'));
}

export const js = () => {
  return src('src/js/**/*.js')
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(babel({
      presets: [
        ['@babel/env', {
          modules: false
        }]
      ]
    }))
    .pipe(dest('public/js'));
}

export const watcher = () => {
  watch('src/scss/**/*.scss', styles);
  watch('src/images/**/*.{jpg,jpeg,png,svg,gif}', images);
  watch(['src/**/*','!src/{images,js,scss}','!src/{images,js,scss}/**/*'], copy);
  watch('src/js/**/*.js', js);
}