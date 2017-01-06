#!/usr/bin/env node

const path = require('path');
const nodemon = require('nodemon');
const chalk = require('chalk');
const spawn = require('cross-spawn');

const extensionPath = process.cwd();
const extension = require(extensionPath + '/package.json');

/**
 * Extension ui (components)
 */
if(extension.main) {

    console.log(chalk.blue('[Mozaik UI] Starting react server..'))

    spawn(
        'node',
        [
            require.resolve('../ui/react-scripts-start'),
            'start'
        ],
        {
            stdio: 'inherit', // Log all messages to console
            cwd: path.join(__dirname, '../ui'),
            env: {
                extensionName: extension.name,
                extensionMainPath: path.join(extensionPath, extension.main),
                extensionPath
            }
        }
    );
}
else {
    console.log(chalk.blue('[Mozaik UI] There was no main script found in your package. Please add one and restart include your components in the React server.'))
}

/**
 * Extention client (server)
 */

// let clientExists = true;
// try {
//     console.log(require.resolve(extensionPath));
// } catch(e) {
//     clientExists = false;
// }
//
// if(true) {
//     const entryPath = path.join(extensionPath, 'client');
//
//     nodemon({
//         verbose: true,
//         script: path.join(__dirname, '../server'),
//         cwd: __dirname,
//         env: {
//             'TEST2': 'jawel'
//         }
//     }).on('start', function () {
//         console.log(chalk.blue('[Mozaik components] Server started.'));
//     }).on('quit', function () {
//         console.log(chalk.blue('[Mozaik components] Server stopped.'));
//     }).on('restart', function (files) {
//         console.log(chalk.blue('[Mozaik components] Server restarted.'));
//     });
// }