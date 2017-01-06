require('dotenv').load({silent: true})

const path = require('path')
const Mozaik = require('mozaik')

console.log(process.env);

// TODO: Auto generate config file based on available ui components
let configFile = process.argv[2] || 'config.yml'

console.log(`using config file: ${configFile}\n`)

Mozaik.configureFromFile(path.join(__dirname, configFile))
    .then(() => {
        // TODO: Auto-register client
        Mozaik.registerApi('test', require('mozaik-ext-github/client'))
        Mozaik.start()
    })
    .catch(err => {
        console.error(err)
    })