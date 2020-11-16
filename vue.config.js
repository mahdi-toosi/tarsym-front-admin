const FileManagerPlugin = require("filemanager-webpack-plugin");

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/administrator/" : "/",
    outputDir: "administrator",
    chainWebpack(config) {
        config.plugins.delete("prefetch");
        // config.plugin('CompressionPlugin').use(CompressionPlugin);
    },
    configureWebpack: {
        plugins: [
            new FileManagerPlugin({
                events: {
                    onEnd: {
                        delete: ["./administrator.zip"],
                        archive: [{ source: "administrator", destination: "administrator.zip" }],
                    },
                },
            }),
        ],
    },
};
