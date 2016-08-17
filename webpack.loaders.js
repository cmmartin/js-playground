var path = require('path');

module.exports = [
  {
    test: /\.jsx?$/,
    include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'example'),
        path.resolve(__dirname, 'node_modules/react-toolbox')
    ],
    exclude: /(\.sample.js)/,
    loaders: ['react-hot', 'babel'],
  },
  {
    test: /\.css|less$/,
    loader: 'style-loader!css-loader!less-loader'
  },
  {
    test: /\.scss$/,
    loaders: [
      'style?sourceMap',
      'css?sourceMap&modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!sass?sourceMap'
    ]
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file'
  },
  {
    test: /\.(woff|woff2)$/,
    loader: 'url?prefix=font/&limit=5000'
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/octet-stream'
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=image/svg+xml'
  },
  {
    test: /\.gif/,
    loader: 'url-loader?limit=10000&mimetype=image/gif'
  },
  {
    test: /\.jpg/,
    loader: 'url-loader?limit=10000&mimetype=image/jpg'
  },
  {
    test: /\.png/,
    loader: 'url-loader?limit=10000&mimetype=image/png'
  },
  {
    test: /\.json/,
    loader: 'json-loader'
  }
];
