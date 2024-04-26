import pSass from 'sass';
import gulpSass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupMq from 'gulp-group-css-media-queries';


const maskReplaceImagePath = /@img\//g;

const sass = gulpSass(pSass);

export const scss = () => {
  return app.gulp.src(app.path.src.scss, { sourcemaps: true })
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "SCSS",
        message: "Error: <%= error.message %>",
        sound: false,
      })
    ))
    .pipe(app.plugins.if(app.isDev, sourcemaps.init()))
    .pipe(app.plugins.replace(maskReplaceImagePath, '../img/'))
    .pipe(sass({
      outputStyle: 'expanded',
    }))
    .pipe(
      app.plugins.if(app.isBuild, groupMq())
    )
    .pipe(
      app.plugins.if(app.isBuild, webpcss({
      webpClass: '.webp',
      noWebpClass: '.no-webp',
      }))
    )
    .pipe(
      app.plugins.if(app.isBuild, autoprefixer({
      grid: true,
      overrideBrowserslist: ["last 3 versions"],
      cascade: true,
      }))
    )
    .pipe(
      app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.css))
    )
    .pipe(
      app.plugins.if(app.isBuild, cleanCss())
    )
    .pipe(rename({
      extname: ".min.css",
    }))
    .pipe(app.plugins.if(app.isDev, sourcemaps.write()))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
}