const Timestamp = new Date().getTime();
let conunt = 0

module.exports = {
    lintOnSave: false,
    publicPath: './',
    //filenameHashing: false,
    assetsDir: 'assets',
    outputDir: './electron/dist/',
    /*图片去除hash*/
    chainWebpack: (config) => {
        config.module
            .rule("images")
            .use("url-loader")
            .loader("url-loader")
            .tap((options) => {
                console.log('image config',options)
                options.fallback.options.name = "[path][name].[ext]"
                return options
            })
    },
    configureWebpack: {
        output: {
            filename: 'js/[name].' + Timestamp + '.js',
            chunkFilename: 'js/[name].' + Timestamp + '.js'
        }
    },
}
