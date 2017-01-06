#!/usr/bin/env node

const path = require('path');
const nodemon = require('nodemon');
const chalk = require('chalk');
const spawn = require('cross-spawn');

/**
 * Get all information about the extension
 */
const extension = require('../getExtensionInfo');

if(!extension.paths.ui){
    console.log(chalk.blue('[Mozaik] There was no main script found in your package. Please add one to your package.json and make sure the file exists.'))
    process.exit(1);
}

if(!extension.paths.client){
    console.log(chalk.blue('[Mozaik] There was no client found in your package. The server will start without a client.'));
}

console.log(chalk.blue(`[Mozaik] Info found:
    Name: ${chalk.magenta(extension.name)}
    Paths:
     - Root:   ${chalk.magenta(extension.paths.root)}
     - UI:     ${chalk.magenta(extension.paths.ui)}
     - Client: ${chalk.magenta(extension.paths.client)}
`));

const environmentVariables = {
    EXTENSION_NAME: extension.name,
    EXTENSION_PATH_ROOT: extension.paths.root,
    EXTENSION_PATH_CLIENT: extension.paths.client,
    EXTENSION_PATH_UI: extension.paths.ui
}

/**
 * Extension ui (components)
 */

spawn(
    'node',
    [
        require.resolve('../ui/react-scripts-start'),
        'start'
    ],
    {
        stdio: 'inherit', // Log all messages to console
        cwd: path.join(__dirname, '../ui'),
        env: environmentVariables
    }
);

/**
 * Extention client (server)
 */

nodemon({
    verbose: true,
    script: path.join(__dirname, '../server'),
    cwd: __dirname,
    env: environmentVariables
}).on('start', function () {
    console.log(chalk.blue('[Mozaik components] Server started.'));
}).on('quit', function () {
    console.log(chalk.blue('[Mozaik components] Server stopped.'));
}).on('restart', function (files) {
    console.log(chalk.blue('[Mozaik components] Server restarted.'));
});