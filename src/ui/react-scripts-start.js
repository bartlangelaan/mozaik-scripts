'use strict';

const path = require('path');
const webpack = require('webpack');

/**
 * Before we can use react-scripts start, we need to edit the webpack config
 * a little to also use the node_modules folder from the extension, and add
 * some variables to use in src/index.js
 */

const config = require('react-scripts/config/webpack.config.dev');


/**
 * Add an variable EXTENSION_PATH, so we can use it in src/index.js to register its components.
 */
config.plugins.unshift(new webpack.DefinePlugin({
    EXTENSION_PATH: JSON.stringify(process.env.extensionMainPath)
}));


/**
 * Get the babel loader and also transpile the src folder of the extension.
 * TODO: Get the babel loader by filtering trough al the loaders
 */
const babel = config.module.loaders[1];
babel.include = [babel.include, path.join(process.env.extensionPath, 'src')];

/**
 * Define all possible places of node_modules
 */
const nodeModulesFolders = [
    path.join(process.env.extensionPath, 'node_modules'), // mozaik-ext-NAME/node_modules
    path.join(__dirname, '../../node_modules'), // mozaik-scripts/node_modules
    config.resolveLoader.root // react-scripts/node_modules
];

config.resolveLoader.root = nodeModulesFolders;
config.resolve.fallback = nodeModulesFolders;

require('react-scripts/scripts/start')