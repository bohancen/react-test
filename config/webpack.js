// const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
const env = process.env.NODE_ENV || 'development'
// const {version} = require('../src/const/static_version')
// const {env} = require('../src/const/static_node_env')
// version也会参与webpack打包 以statice形式 例如 header insert时用到
console.log(`开始编译中...\n当前环境:${env}`)

let output_path = ''
if(env == 'development'){
  output_path = path.resolve(__dirname,'../build/js/dev/')
}
if(env == 'production'){
  output_path = path.resolve(__dirname,'../build/js/prod/')
}

// console.log(output_path)

let config = {
  mode: env,
  // mode: 'development',
  
  entry: {
    'index':'./src/index.js',
  },
  output: {
    publicPath:'/js/prod/',
    filename: '[name].js',
    path: output_path
  },
  resolve:{
    alias:{
      'src': path.resolve(__dirname, '../src'),
      // "react": "preact-compat",
      // "react-dom": "preact-compat"
    }
  },
  
  // optimization: {
  //   splitChunks: {
  //     // name: obj=>{
  //     //   console.log(Object.keys(obj))
  //     //   return `vendors_${obj.blocks}`
  //     // },
  //     name:'vendors',
  //     // name:false,
  //     // include all types of chunks
  //     chunks: 'initial'
  //   },
  //   minimizer: [new TerserPlugin({parallel: false})]
  // },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['react','stage-0',[
            'env',{
              targets: {
                browsers: [
                  'last 2 versions',
                  //'IE >= 11'
                ]
              }
            }
          ]]
        }
      }
    ]
  }
}
if(env == 'development'){
  config.devtool= 'cheap-module-source-map'
}
module.exports = config