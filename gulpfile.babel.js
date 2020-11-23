/*
Author: HF Schoonewille
*/

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

/* 
Create bundle.css and admin.css from all SCSS files imported in bundle.scss and admin.scss
*/ 
export const styles = () => {
  return src(['src/scss/bundle.scss', 'src/scss/admin/admin.scss'])
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(PRODUCTION, postcss([ autoprefixer ])))
    .pipe(gulpif(PRODUCTION, cleanCss({compatibility:'ie8'})))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(dest('public/css'));
}

/* 
Process images into ./public/images
*/ 
export const images = () => {
  return src('src/images/**/*.{jpg,jpeg,png,svg,gif}')
    .pipe(gulpif(PRODUCTION, imagemin()))
    .pipe(dest('public/images'));
}

/* 
Copy all non images, scss and js files from ./src into its own folder inside ./public
*/ 
export const copy = () => {
  return src(['src/**/*','!src/{images,js,scss,components,vendor}','!src/{images,js,scss,components,vendor}/**/*'])
    .pipe(dest('public'));
}

// JS concatination
/* 
Concatenate our 3rd party dependencies
into a temporary main.deps.js file.
*/ 
export const jsDeps = () => {
  const files = [
    'src/vendor/jquery.js',
    'src/vendor/bootstrap.js',
    'src/vendor/just-validate.min.js',
    'src/vendor/sb-admin-2.min.js',
    'src/vendor/parallax.js',
    'src/vendor/bootstrap-lightbox.min.js'
  ];
  return src(files)
    .pipe(concat('main.deps.js'))
    .pipe(dest('./tmp'));
}

/* 
Concatenate our homegrown components 
into a temporary main.build.js file.
*/ 
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

/* 
Concatenate the third-party libraries and our
homegrown components into a single app.js file.
*/ 
export const jsConcat = () => {
  const files = [
    './tmp/main.deps.js',
    './tmp/main.build.js'
  ];
  return src(files)
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(dest('./public/js'))
}
// End JS concatination


export const watcher = () => {
  // Watch source scss files for changes to process
  watch('src/scss/**/*.scss', styles);
  // Watch source images for changes to process
  watch('src/images/**/*.{jpg,jpeg,png,svg,gif}', images);
  // Watch every other file we place in ./src and trigger the copy task
  watch(['src/**/*','!src/{images,js,scss}','!src/{images,js,scss,components}/**/*'], copy);
  // Watch JS and process in the following order: jsDeps > jsBuild > jsConcat 
  watch('src/components/**/*.js', series(jsDeps, jsBuild, jsConcat));
}