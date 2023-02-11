const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'chat.bundle.js',
  },

  devServer: {
    compress: false,
    port: 4000,
    historyApiFallback: true,
  },

  resolve: {
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js',
      core: path.resolve(__dirname, './src/core'),
      pages: path.resolve(__dirname, './src/pages'),
      components: path.resolve(__dirname, './src/components'),
      helpers: path.resolve(__dirname, './src/helpers'),
      services: path.resolve(__dirname, './src/services'),
      hocs: path.resolve(__dirname, './src/hocs'),
      store: path.resolve(__dirname, './src/store'),
      models: path.resolve(__dirname, './src/models'),
      api: path.resolve(__dirname, './src/api'),
      router: path.resolve(__dirname, './src/router'),
    },

    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      // изображения
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      // шрифты и SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
};
