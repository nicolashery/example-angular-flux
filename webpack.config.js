var path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', ignore: /node_modules/},
      {test: /\.html$/, loader: 'raw'}
    ]
  }
};
