module.exports = {
  webpack: {
    configure: {
      output: {
        filename: 'static/js/usagov-bears-app.min.js',
      },
      optimization: {
        runtimeChunk: false,
        splitChunks: {
          chunks(chunk) {
            return false
          },
        },
      },
    },
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          // we overide the filename for our output files
          webpackConfig.plugins[5].options.filename =
            'static/css/usagov-bears-app.min.css'
          return webpackConfig
        },
      },
      options: {},
    },
  ],
}
