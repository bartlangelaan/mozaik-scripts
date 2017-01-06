const path = require('path');

module.exports = {
    paths: {}
};


module.exports.paths.root = process.cwd();

module.exports.packageJson = require(module.exports.paths.root + '/package.json');

module.exports.name = (module.exports.packageJson.name || 'untitled').replace('mozaik-ext-', '');

if(module.exports.packageJson.main){
    const extensionUiPath = path.join(module.exports.paths.root, module.exports.packageJson.main);
    try {
        require.resolve(module.exports.packageJson.main);
        module.exports.paths.ui = extensionUiPath;
    } catch(e) {
        // don't set path
    }
    module.exports.paths.ui = path.join(module.exports.paths.root, module.exports.packageJson.main);
}

const extensionClientPath = path.join(module.exports.paths.root, 'client');

try {
    require.resolve(extensionClientPath);
    module.exports.paths.client = extensionClientPath;
} catch(e) {
    // don't set path
}