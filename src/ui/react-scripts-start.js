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
    EXTENSION_NAME: JSON.stringify(process.env.EXTENSION_NAME),
    EXTENSION_PATH_ROOT: JSON.stringify(process.env.EXTENSION_PATH_ROOT),
    EXTENSION_PATH_CLIENT: JSON.stringify(process.env.EXTENSION_PATH_CLIENT),
    EXTENSION_PATH_UI: JSON.stringify(process.env.EXTENSION_PATH_UI)
}));


/**
 * Get the babel loader and also transpile the src folder of the extension.
 * TODO: Get the babel loader by filtering trough al the loaders
 */
const babel = config.module.loaders[1];
babel.include = [babel.include, process.env.EXTENSION_PATH_ROOT];

/**
 * Define all possible places of node_modules
 */
const nodeModulesFolders = [
    path.join(process.env.EXTENSION_PATH_ROOT, 'node_modules'), // mozaik-ext-NAME/node_modules
    path.join(__dirname, '../../node_modules'), // mozaik-scripts/node_modules
    config.resolveLoader.root // react-scripts/node_modules
];

config.resolveLoader.root = nodeModulesFolders;
config.resolve.fallback = nodeModulesFolders;

require('react-scripts/scripts/start')