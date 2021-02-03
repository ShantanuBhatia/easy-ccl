const {appendWebpackPlugin} = require('@rescripts/utilities')
const webpack = require('webpack')

module.exports = config => {
    config.target = 'electron-renderer';
    return appendWebpackPlugin(
        new webpack.DefinePlugin({
            'process.env.FLUENTFFMPEG_COV': false
        }),
        config,
      )
}