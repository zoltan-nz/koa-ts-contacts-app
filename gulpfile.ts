import del = require('del');
import * as gulp from 'gulp';

const DIST_FOLDER = './dist';

const paths = {
  views: {
    src:  './src/views/**/*',
    dest: `${DIST_FOLDER}/views`
  }
};

const clean = () => del([DIST_FOLDER]);

const views = () => {
  return gulp.src(paths.views.src)
  .pipe(
    gulp.dest(paths.views.dest)
  );
};

export { clean, views };
