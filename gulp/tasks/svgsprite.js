import svgSpr from 'gulp-svg-sprite';

export const svgSprite = () => {
  return app.gulp.src(app.path.src.svgicons, { sourcemaps: true })
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "SVG",
        message: "Error: <%= error.message %>",
        sound: false,
      })
    ))
    .pipe(svgSpr({
      mode: {
        stack: {
          sprite: `../icons/icons.svg`,
          // Create sample page (preview) with icons
          example: true,
        }
      }
    }))
    .pipe(app.gulp.dest(app.path.build.images))
}