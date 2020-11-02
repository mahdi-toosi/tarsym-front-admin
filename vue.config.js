module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/administrator/" : "/",
    outputDir: "administrator",
    chainWebpack(config) {
        config.plugins.delete("prefetch");
        // config.plugin('CompressionPlugin').use(CompressionPlugin);
    },
    //     css: {
    //         loaderOptions: {
    //             sass: {
    //                 prependData: `@import "@/assets/scss/main.scss";`,
    //             },
    //         },
    //     },
};
