module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    devServer: {
        // Paths

        proxy: {
            '/EXPECT': {
                target: 'https://way.jd.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/EXPECT': '/'
                }
            },
        }
    }
}