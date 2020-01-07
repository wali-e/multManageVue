const rawArgv = process.argv.slice(2); // 获取运行参数

// 多页面配置
const pages = {
    twelve: {
        entry: "src/modules/twelve/main.js",
        template: "src/modules/twelve/index.html",
        favicon: 'src/modules/twelve/favicon.ico',
        filename: "index.html",
        title: "双十二温暖福利",
        chunks: ['chunk-vendors', 'chunk-common', 'twelve']
    },
};

// 详细配置
const conf = {
    filenameHashing: true,
    publicPath: process.env.NODE_ENV === 'production' && 'VUE_APP_CDN_HOST' in process.env ? process.env.VUE_APP_CDN_HOST : './',
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require("postcss-px-to-viewport")({
                        unitToConvert: "px",
                        viewportWidth: 750,
                        unitPrecision: 5,
                        propList: [
                            "*"
                        ],
                        viewportUnit: "vw",
                        fontViewportUnit: "vw",
                        selectorBlackList: [
                            ".ignore",
                            ".hairlines",
                            "van",
                        ],
                        minPixelValue: 1,
                        mediaQuery: false,
                        replace: true,
                        exclude: /(\/|\\)(node_modules)(\/|\\)/,
                    })
                ]
            }
        }
    }
};

// 根据命令行参数来打包modules
// 例如 yarn run build cp 则会只打包编译 module twelve 模块
// 打包部署上线 由于是分目录打包，所以pages.filename都可以问index.html 这样打包出来的目录下入口文件都问index.html,然后在通过nginx设置将入口文件定位到当前层目录的index.html
if(rawArgv[0] === 'build' && undefined !== rawArgv[3]){
    if(undefined !== rawArgv[3] && rawArgv[3] in pages){
        conf.pages = {};
        conf.pages[rawArgv[3]] = pages[rawArgv[3]];
        conf.outputDir = 'dist/' + rawArgv[3];
        conf.publicPath += rawArgv[3] + '/';
    }else{
        console.warn('\x1B[33m%s\x1b[0m',"not modules.\n")
        throw Error('not modules');
    }
} else {
    // node 服务运行模式下
    // 1. publicPath 必须为/，否则js，css，图片等在多一层目录情况下加载不到
    // 2. pages.filename 必须不相同最好是和模块名相同，这样才能通过多入口访问
    if(rawArgv[0] === 'serve'){
        conf.publicPath = '/';
        Object.keys(pages).forEach(item => {
            pages[item].filename = item;
        });
    }
    conf.pages = pages;
}

module.exports = conf;
