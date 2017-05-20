import del = require('del');
import * as gulp from 'gulp';
import tsc = require('gulp-typescript');
import sourcemaps = require('gulp-sourcemaps');

const DIST_FOLDER = './dist';

const paths = {
  ts: {
    src: './src/**/*.ts',
    dest: `${DIST_FOLDER}`
  },
  views: {
    src:  './src/views/**/*',
    dest: `${DIST_FOLDER}/views`
  }
};

const clean = () => del([DIST_FOLDER]);
gulp.task('clean', clean);

const views = () =>
  gulp.src(paths.views.src)
    .pipe(gulp.dest(paths.views.dest));
gulp.task('views', views);

const tsProject = tsc.createProject('./tsconfig.json');
const ts        = () =>
  tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(tsProject.config.compilerOptions.outDir));
gulp.task('ts', ts);

const watchTs = () => gulp.watch(paths.ts.src, ['ts']);
gulp.task('watch-ts', watchTs);

const watchViews = () => gulp.watch(paths.views.src, ['views']);
gulp.task('watch-views', watchViews);

gulp.task('watch', ['watch-ts', 'watch-views']);
gulp.task('build', ['clean', 'views', 'ts']);
gulp.task('default', ['build']);
