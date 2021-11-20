const path = require('path');

module.exports = [
  {
    mode: 'none',
    entry: './src/modules/CheckIfWinner.js',
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'CheckIfWinner.js',
      path: path.resolve(__dirname, 'public/dist'),
    }
  },
  {
    mode: 'none',
    entry: './src/modules/Game.js',
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'Game.js',
      path: path.resolve(__dirname, 'public/dist'),
    }
  },
  {
    mode: 'none',
    entry: './src/modules/Jeton.js',
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'Jeton.js',
      path: path.resolve(__dirname, 'public/dist'),
    }
  },
  {
    mode: 'none',
    entry: './src/modules/MonTour.js',
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'MonTour.js',
      path: path.resolve(__dirname, 'public/dist'),
    }
  },
  {
    mode: 'none',
    entry: './src/modules/RobotManager.js',
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'RobotManager.js',
      path: path.resolve(__dirname, 'public/dist'),
    }
  },
  {
    mode: 'none',
    entry: './src/modules/TestsUnits.js',
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'TestsUnits.js',
      path: path.resolve(__dirname, 'public/dist'),
    }
  },
  {
    mode: 'none',
    entry: './src/modules/Utils.js',
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'Utils.js',
      path: path.resolve(__dirname, 'public/dist'),
    }
  },
  {
    mode: 'none',
    entry: './src/modules/WinnerManager.js',
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'WinnerManager.js',
      path: path.resolve(__dirname, 'public/dist'),
    }
  },
  {
    mode: 'none',
    entry: './src/modules/game_manager.inc.js',
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'gameManager.js',
      path: path.resolve(__dirname, 'public/dist'),
    }
  },
  {
    mode: 'none',
    entry: './src/modules/main.inc.js',
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'public/dist'),
    }
  }
];