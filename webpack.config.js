const path = require('path');

module.exports = [{
  mode: 'production',
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  entry: {
    puissance4: {
      import: [
        './src/modules/Game',
        './src/modules/CheckIfWinner',
        './src/modules/gameManager',
        './src/modules/Interfaces',
        './src/modules/Jeton',
        './src/modules/main',
        './src/modules/MonTour',
        './src/modules/RobotManager',
        './src/modules/WinnerManager'
      ],
      dependOn: 'shared'
    },
    util: {
      import: './src/modules/Utils',
      dependOn: 'shared'
    },
    shared: 'jquery'
  },
  // devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader'
    }, ]
  },
  resolve: {
    alias: {
      '@modules': path.resolve(__dirname, 'src/modules')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}];