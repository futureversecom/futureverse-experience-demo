const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

const config = {
  webpack: {
    configure: {
      plugins: [new NodePolyfillPlugin()],

      module: {
        rules: [
          {
            test: /\.m?js$/,
            resolve: {
              fullySpecified: false,
            },
          },
        ],
      },
    },
  },
}

export default config
