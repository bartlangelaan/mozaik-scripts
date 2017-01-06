require('dotenv').load({silent: true})

const path = require('path')
const Mozaik = require('mozaik')

const widgets = require(process.env.EXTENSION_PATH_UI).default;

const configuration = {
    host: 'localhost',
    port: 5000,
    rotationDuration: 8000,
    dashboards: []
};
if (typeof widgets == 'object' && widgets !== null) {
    configuration.dashboards = Object.keys(widgets).map(widget => ({
        columns: 1,
        rows: 1,
        widgets: [{
            extension: process.env.EXTENSION_NAME,
            widget,
            columns: 1,
            rows: 1,
            x: 1,
            y: 0,
        }]
    }));
}
else {
    console.log('No components found, didn\'t generate dashboards')
}

Mozaik.configure(configuration)

Mozaik.registerApi(process.env.EXTENSION_NAME, require(process.env.EXTENSION_PATH_CLIENT))
Mozaik.start()