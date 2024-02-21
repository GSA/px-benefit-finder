import { writeFileSync } from 'fs'

export default function wrapStyles(options) {
  const { id } = options

  return {
    name: 'wrap-css',
    writeBundle(_, bundle) {
      if (bundle) {
        Object.keys(bundle).forEach(fileName => {
          // Check if the file is a minified CSS file
          if (fileName.endsWith('.min.css')) {
            const cssContent = bundle[fileName].source

            // Remove charset
            const trimmedCSS = cssContent.replace(/^@charset "UTF-8";/, '')

            // Wrap the CSS content with the provided ID and charset
            const wrappedCssContent = `@charset "UTF-8"; #${id} { ${trimmedCSS} }`

            // Write the wrapped CSS content back to the file
            try {
              writeFileSync(`./build/${fileName}`, wrappedCssContent)
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error(`Error writing file ${fileName}: ${error}`)
            }
          }
        })
      }
    },
  }
}
