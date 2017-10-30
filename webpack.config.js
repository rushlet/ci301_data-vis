console.log('I am webpack.');
module.exports = {
	entry: "./source/js/index.js",
	output: {
		path: __dirname + "/compiled/js",
		filename: "bundle.js"
	},
  module: {
      loaders: [
          {
              test: /\.js$/,
              exclude: [
                  /node_modules/
              ],
              loader: 'babel',
              query: {
                  presets: ['es2015'],
              },
          },
       ],
    },
}
