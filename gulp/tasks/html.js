import fileinclude from 'gulp-file-include';
import webHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from "gulp-version-number";

const version = {
  value: '%DT%',
  append: {
    key: '_v',
    cover: 0,
    to: [
      'css',
      'js',
    ]
  },
  output: {
    file: 'gulp/version.json',
  },
}
const maskReplaceImagePath = /@img\//g;

export const html = () => {
  return app.gulp.src(app.path.src.html, { sourcemaps: app.isDev })
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "HTML",
        message: "Error: <%= error.message %>",
        sound: false,
      })
    ))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
    }))
    .pipe(app.plugins.replace(maskReplaceImagePath, 'img/'))
    .pipe(
      app.plugins.if(app.isBuild, webHtmlNosvg())
    )
    .pipe(
      app.plugins.if(app.isBuild, versionNumber(version))
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream());
}