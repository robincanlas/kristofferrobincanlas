const commonConfig = require('./webpack.common');
const developmentConfig = require('./webpack.config.dev');
const productionConfig = require('./webpack.config.prod');
const { merge } = require('webpack-merge');

module.exports = (env, options) => {
  console.log(
    `
		####### ##         ##       #####  ##   ##
		##      ##        ####     ##      ##   ##
		#####   ##       ##  ##     ####   ####### ` + options.mode + `
		##      ##      ########       ##  ##   ##
		##      ###### ##      ##  #####   ##   ##
		`
  );

  switch(options.mode) {
    case 'development':
      return merge(commonConfig, developmentConfig);
    case 'production':
      return merge(commonConfig, productionConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
};