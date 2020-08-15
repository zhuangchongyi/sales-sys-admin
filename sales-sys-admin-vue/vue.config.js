module.exports = {
    devServer:{
        port:9090, // 启动端口
        open:false  // 启动后是否自动打开网页
    },
    // publicPath: '/sales-sys',//添加前缀
    assetsDir: './',//静态资源存放目录
    productionSourceMap: false,
    // devServer: {
    //     proxy: {
    //         '/api':{
    //             target:'http://127.0.0.1:8801',
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '/api':''
    //             }
    //         }
    //     }
    // }
}