module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                src: "@/",
            },
        },
    },
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },
    },
   lintOnSave: false
};
