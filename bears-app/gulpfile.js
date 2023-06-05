const uswds = require('@uswds/compile')

/**
 * USWDS version
 */

uswds.settings.version = 3

/**
 * Path settings
 * Set as many as you need
 */

uswds.paths.dist.css = './src/components/shared/assets/css'
uswds.paths.dist.js = './src/components/shared/assets/js'
uswds.paths.dist.img = './src/components/shared/assets/img'
uswds.paths.dist.fonts = './src/components/shared/assets/fonts'
uswds.paths.dist.theme = './src/components/shared/sass'
uswds.paths.src.projectSass = './components/**/*.scss'

/**
 * Exports
 * Add as many as you need
 */

exports.init = uswds.init
exports.compile = uswds.compile
exports.watch = uswds.watch
