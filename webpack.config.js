// 导入nodejs的内置模块
const path = require("path");
//引入html打包的插件 
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 项目优化
//导入提取js中的css代码的两个插件
//引入 提取js中的css代码的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//将css文件及代码进行极致压缩s
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
//自动清除dist 
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
module.exports = {
    // 入口
    entry: {
        // 公共css
        commonCss:"./src/js/commonCss.js",
        // 公共js
        http: './src/js/http.js',
        utils:"./src/js/utils.js",
        // 三方插件
        captcha:"./src/lib/captcha-mini.js",
        // 自己写的
        home: "./src/js/home.js",
        login: "./src/js/login.js",
        register: "./src/js/register.js",
        banner: "./src/js/banner.js"

    },
    // 出口
    output: {
        // 获取根目录再拼接dist
        path: path.resolve(__dirname, "dist"),
        // 打包完成后 输出的js文件
        filename: "js/[name].js",
        publicPath: './' //打包完成之后的html文件引入其他资源的基础路径（相对路径）
    },
    // 解释器
    module: {
        // css-loader将css文件能够给webpack打包
        // 配置css
        // style-loader将已经打包之后的css代码写入大页面style中
        // 必须先写 style-loader

        // 优化项目
        //将style-loader 替换为 MiniCssExtractPlugin.loader
        rules: [{
                test: /\.css$/,
                //use: ["style-loader", "css-loader"]
                //use: [MiniCssExtractPlugin.loader, "css-loader"]
                // css兼容性处理 postcss
                use: [{loader:MiniCssExtractPlugin.loader, options: {
                    publicPath: '../'
                  }}, "css-loader", 'postcss-loader'],

            },
            // 配置less
            {
                test: /\.less$/,
                //use: ["style-loader", "css-loader", "less-loader"]
                //use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
                // css兼容性处理 postcss
                use: [{loader:MiniCssExtractPlugin.loader, options: {
                    publicPath: '../'
                  }}, "css-loader", 'postcss-loader', "less-loader"],



            },
            // 配置图片
            {
                test: /\.(jpg|gif|png|svg)$/,
                loader: "url-loader",
                options: {
                    // 重命名 16位随机字符串 ext：获取的图片后缀
                    name: "[hash:16].[ext]",
                    limit: 30 * 1024,
                    esModule: false, //默认css中的图片以ES6的模块进行打包，但是html中图片只能以node下的commonjs规范进行打包
                    //有可能存在图片打包的冲突，要求直接将css打包模块设置为node的模块打包
                    outputPath: 'img'
                }

            },
            // 配置html
            {
                test: /\.html$/,
                loader: "html-loader",
            },
            // font
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts' //输出的目录
                }
            },
            // es6==>es5
            {
                test: /\.js$/,
                loader: 'babel-loader', // loader 编译es6为es5
                exclude: /node_modules/ // 排除
            },

        ]
    },
    // 插件
    plugins: [
        // html插件
        // new 插件名({
        //     配置  key:value
        // })
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/home.html', //以哪个html文件作为打包的模板
            filename: 'home.html',
            chunks: ['home','commonCss',"http"]
        }),
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/login.html', //以哪个html文件作为打包的模板
            filename: 'login.html',
            chunks: ['login','commonCss',"http","utils"]
        }),
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/register.html', //以哪个html文件作为打包的模板
            filename: 'register.html',
            chunks: ['register','commonCss',"captcha","http","utils"]
        }),
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/banner.html', //以哪个html文件作为打包的模板
            filename: 'banner.html',
            chunks: ['banner','commonCss']
        }),
        // 项目优化
        //提取js中的css代码
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[hash:16].css'
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        // 自动清除dist
        new CleanWebpackPlugin(),

    ],



    //热更新 本地服务启动
    //webpack.config.js   
    // 开发服务器 配置
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
        compress: true, // 启动gzip
        port: 8080, // 端口  8080 80  8081 8082
        open: true, // 自动打开服务
        publicPath: '/', // 静态资源查找路径
        openPage: 'banner.html', // 打开的页面
    },
    target: 'web', // 目标是浏览器





    // 环境  本地环境development   线上环境production
    //mode: "development"

    //开发环境和生产环境的区分
    //修改webpack.config.js 中的mode 获取当前环境的变量
    mode: process.env.NODE_ENV,
};