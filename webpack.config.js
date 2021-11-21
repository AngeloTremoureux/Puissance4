const path = require('path');

module.exports = [
  {
    mode: 'none',
    entry: './src/modules/Game',
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
      filename: 'Game.js',
      path: path.resolve(__dirname, 'public/dist'),
    }
  },
  {
    mode: 'none',
    entry: './src/modules/CheckIfWinner',
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
    entry: './src/modules/Jeton',
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
    entry: './src/modules/MonTour',
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
    entry: './src/modules/RobotManager',
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
    entry: './src/modules/TestsUnits',
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
    entry: './src/modules/Utils',
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
    entry: './src/modules/WinnerManager',
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
    entry: './src/modules/game_manager.inc',
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
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'gameManager.js',
      path: path.resolve(__dirname, 'public/dist'),
    }
  },
  {
    mode: 'none',
    entry: './src/modules/main.inc',
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
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'public/dist'),
    }
  }
];