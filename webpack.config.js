const path = require('path');

module.exports = [
  {
    mode: 'none',
    watch: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    entry: {
      puissance4: [
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
      tests: ['./src/modules/TestsUnits'],
      util: ['./src/modules/Utils']
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader'
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'public/dist'),
    }
  }
];