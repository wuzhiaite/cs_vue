
module.exports = {
    publicPath : '/',//部署应用包时的基本 URL
    outputDir : 'dist',
    assetsDir : 'static',//放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    indexPath : 'index.html',
    filenameHashing : false,//生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
    runtimeCompiler : true,//是否使用包含运行时编译器的 Vue 构建版本
    transpileDependencies : [],//通过 Babel 显式转译一个依赖
    productionSourceMap : false,//
    configureWebpack: config => { // 修改配置数据
        if (process.env.NODE_ENV === 'product') {
            plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: false,
                            pure_funcs: ['console.log'] //移除console
                        }
                    },
                    sourceMap: false,
                    parallel: true
                })
            );
            config.plugins = [...config.plugins, ...plugins];
        }
        
        if (process.env.NODE_ENV === 'product') {
          // 为生产环境修改配置...
        } else {
          // 为开发环境修改配置...
        }
    },
    devServer : { //代理
        port : 9876,
        proxy: "http://127.0.0.1:8001"
    },
    pages : {
        index : {           
            entry: 'src/index/main.js',// page 的入口          
            template: 'public/index.html',// 模板来源           
            filename: 'index.html',// 在 dist/index.html 的输出
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '首页数据',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
    },   
   

}

















