const conf = {
    prodMode: process.env.NODE_ENV === 'production',
  };
  
module.exports = [
    {
        name: 'bundle',
        mode: conf.prodMode ? 'production' : 'development',
        cache: true,
        entry: './src/popup/index.tsx',
        output: {
            path: __dirname+'/dist',
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
        },
        devtool: 'source-map',
        module: {
            rules: [
              {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
              },
              {
                test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
                loader: 'file-loader',
                options: {
                  name: '[hash:12].[ext]',
                  publicPath : path => 'dist/' + path,
                }
              },
              {
                test: /\.tsx?$/,
                use: 'ts-loader',
              },
            ]
          },
    },
];
