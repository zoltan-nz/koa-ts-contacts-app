import del = require('del');
import * as gulp from 'gulp';
import tsc = require('gulp-typescript');
import sourcemaps = require('gulp-sourcemaps');

const DIST_FOLDER = './dist';

const paths = {
  views: {
    src:  './src/views/**/*',
    dest: `${DIST_FOLDER}/views`
  }
};

const clean = () => del([DIST_FOLDER]);

const views = () =>
  gulp.src(paths.views.src)
    .pipe(gulp.dest(paths.views.dest));

const tsProject = tsc.createProject('./tsconfig.json');
const ts        = () =>
  tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_FOLDER));

export { clean, views, ts };
