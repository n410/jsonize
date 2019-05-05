const conf = {
    prodMode: process.env.NODE_ENV === 'production',
  };

module.exports = [
    {
        name: 'bundle',
        mode: conf.prodMode ? 'production' : 'development',
        cache: true,
        entry: {
          popup: './src/popup/index.tsx',
          content: './src/content/index.ts'
        },
        output: {
            path: __dirname+'/dist',
            filename: '[name].bundle.js'
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
