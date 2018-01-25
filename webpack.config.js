console.log('I am webpack.');
const path = require('path');
module.exports = {
	entry: "./source/js/index.js",
	output: {
		path: __dirname + "/compiled/js",
		filename: "bundle.js"
	},
	externals: [{
		xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}',
	}],
	resolve: {
	  root: path.resolve(__dirname),
    alias: {
       handlebars: 'handlebars/dist/handlebars.min.js'
    }
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
