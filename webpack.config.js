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
                test: /\.tsx?$/,
                use: 'ts-loader',
              },
            ]
          },
    },
    {
        name: 'option',
        cache: true,
        entry: './src/option/index.tsx',
        output: {
            path: __dirname+'/dist',
            filename: 'option.js'
        },
        resolve: {
            extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
        },
        devtool: 'source-map',
        module: {
            rules: [
              {
                test: /\.tsx?$/,
                use: 'ts-loader',
              },
            ]
          },
    }
];
