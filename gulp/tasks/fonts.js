import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
  // find .otf fonts
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>",
        sound: false,
      })
    ))
    // convert to .ttf
    .pipe(fonter({
      formats: ['ttf']
    }))
    //copy to src folder
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
  // find .ttf fonts
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>",
        sound: false,
      })
    ))
    // convert to .ttf
    .pipe(fonter({
      formats: ['woff']
    }))
    //copy to src folder
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    // find .ttf fonts
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    // convert to woff2
    .pipe(ttf2woff2())
    //copy to dist folder
    .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}

export const fontsStyle = () => {
  // Font stylesheet
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
  // check if available fonts
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      // Check if available fonts stylesheet
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (let i = 0; i < fontsFiles.length; i++) {
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0]
              ? fontFileName.split('-')[0]
              : fontFileName;
            
            let fontWeight = fontFileName.split('-')[1]
              ? fontFileName.split('-')[1].toLowerCase()
              : fontFileName.toLowerCase();
            
            switch (fontWeight) {
              case 'thin':
                fontWeight = 100;
                break;
              case 'extralight':
                fontWeight = 200;
                break;
              case 'light':
                fontWeight = 300;
                break;
              case 'medium':
                fontWeight = 500;
                break;
              case 'semibold':
                fontWeight = 600;
                break;
              case 'bold':
                fontWeight = 700;
                break;
              case ('extrabold' || 'heavy'):
                fontWeight = 800;
                break;
              case 'black':
                fontWeight = 900;
                break;
              default:
                fontWeight = 400;
            }

            fs.appendFile(fontsFile,
              `@font-face {\r\n\tfont-family: ${fontName};\r\n\tfont-display: swap;\r\n\tsrc: url("../fonts/${fontFileName}.woff") format("woff"), url("../fonts/${fontFileName}.woff2") format("woff2");\r\n\tfont-weight: ${fontWeight};\r\n\tfont-style: normal;\r\n};\r\n\r\n`,
              cb
            );
              
            newFileOnly = fontFileName;
          }
        }
      } else {
        console.log("File scss/fonts.scss is exists. Please delete it")
      }
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() { };
}