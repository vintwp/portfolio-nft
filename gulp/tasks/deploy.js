import gh from 'gh-pages';

export const deploy = () => {
  return gh.publish(app.path.buildFolder, function(err) {})
}