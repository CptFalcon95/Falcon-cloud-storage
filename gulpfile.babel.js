import { src, dest, watch, series } from 'gulp';
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

export const jsDeps = () => {
  const files = [
    'src/vendor/jquery.js',
    'src/vendor/bootstrap.js'
  ];
  return src(files)
    .pipe(concat('main.deps.js'))
    .pipe(dest('./tmp'));
}

export const jsBuild = () => {
  return src('src/components/**/*.js')
    .pipe(plumber())
    .pipe(concat('main.build.js'))
    .pipe(babel({
      presets: [
        ['@babel/env', {
          modules: false
        }]
      ]
    }))
    .pipe(dest('./tmp'));
}

export const jsConcat = () => {
  const files = [
    './tmp/main.deps.js',
    './tmp/main.build.js'
  ];
  return src(files)
    .pipe(plumber())
    // Concatenate the third-party libraries and our
    // homegrown components into a single main.js file.
    .pipe(concat('app.js'))
    // Save it to the final destination.
    .pipe(dest('./public/js'))
}

export const watcher = () => {
  watch('src/scss/**/*.scss', styles);
  watch('src/images/**/*.{jpg,jpeg,png,svg,gif}', images);
  watch(['src/**/*','!src/{images,js,scss}','!src/{images,js,scss,components}/**/*'], copy);
  watch('src/components/**/*.js', series(jsDeps, jsBuild, jsConcat));
}