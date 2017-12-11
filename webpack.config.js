module.exports = {
  loaders: [
    { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
  ],
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  }
};