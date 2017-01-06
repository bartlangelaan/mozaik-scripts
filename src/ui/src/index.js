/* global EXTENSION_PATH_ROOT, EXTENSION_PATH_UI, EXTENSION_NAME */

import 'mozaik/ui.css'
import 'font-awesome/css/font-awesome.min.css'

import React         from 'react'
import { render }    from 'react-dom'
import Mozaik, { Registry, ThemeManager } from 'mozaik/ui'

// TODO: Auto-import all themes
import solarizedDark from 'mozaik-themes/themes/solarized-dark'
import nightBlue     from 'mozaik-themes/themes/night-blue'
import sunny         from 'mozaik-themes/themes/sunny'
import wine          from 'mozaik-themes/themes/wine'
import snow          from 'mozaik-themes/themes/snow'
import mini          from 'mozaik-themes/themes/mini'
import miniKuro      from 'mozaik-themes/themes/mini-kuro'

import 'mozaik-themes/themes/solarized-dark.css'
import 'mozaik-themes/themes/night-blue.css'
import 'mozaik-themes/themes/sunny.css'
import 'mozaik-themes/themes/wine.css'
import 'mozaik-themes/themes/snow.css'
import 'mozaik-themes/themes/mini.css'
import 'mozaik-themes/themes/mini-kuro.css'

ThemeManager.add(solarizedDark)
ThemeManager.add(nightBlue)
ThemeManager.add(sunny)
ThemeManager.add(wine)
ThemeManager.add(snow)
ThemeManager.add(mini)
ThemeManager.add(miniKuro)

ThemeManager.defaultTheme = nightBlue.name

const extensions = {}
extensions[EXTENSION_NAME] = require(EXTENSION_PATH_UI).default

console.log('Add extensions', extensions);

Registry.addExtensions(extensions);

render(
    <Mozaik />,
    document.getElementById('mozaik')
)