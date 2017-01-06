require('dotenv').load({silent: true})

const path = require('path')
const Mozaik = require('mozaik')

// TODO: Auto generate config file based on available ui components
let configFile = path.join(process.env.EXTENSION_PATH_ROOT, 'config.yml')

console.log(`using config file: ${configFile}\n`)

Mozaik.configureFromFile(configFile)
    .then(() => {
        Mozaik.registerApi(process.env.EXTENSION_NAME, require(process.env.EXTENSION_PATH_CLIENT))
        Mozaik.start()
    })
    .catch(err => {
        console.error(err)
    })