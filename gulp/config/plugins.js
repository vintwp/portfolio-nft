import replace from "gulp-replace";
import plumber from "gulp-plumber"; // Error handler
import notify from "gulp-notify"; // Error messages
import browsersync from "browser-sync";
import newer from "gulp-newer";
import ifPlugin from "gulp-if";

export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browsersync: browsersync,
  newer: newer,
  if: ifPlugin,
}