import { writeFileSync } from 'fs'

export default function wrapStyles(options) {
  const { id, customGroup } = options
  let trimmedCSS

  return {
    name: 'wrap-css',
    writeBundle(_, bundle) {
      if (bundle) {
        Object.keys(bundle).forEach(fileName => {
          // Check if the file is a minified CSS file
          if (fileName.endsWith('.min.css')) {
            const cssContent = bundle[fileName].source

            // Remove charset
            trimmedCSS = cssContent.replace(/^@charset "UTF-8";/, '')
            // Capture modal ID selectors
            // because our modal appends to the DOM outside of our #ID,
            // we need to ensure it doesn't get wrapped during the build
            // regex patterns
            const customGroupIDPattern = `(${customGroup})`
            const customGroupPattern = `${customGroupIDPattern}.*?(})`
            const customGroupRegExp = new RegExp(customGroupPattern, 'g')
            const customGroupIDRegExp = new RegExp(customGroupIDPattern, 'g')
            // find matches for selectors
            const customGroupMatch = trimmedCSS.match(customGroupRegExp)
            // remove matches from bundle
            trimmedCSS = trimmedCSS.replace(customGroupMatch.join(''), '')

            // trim custom group styles so we can wrap later
            const customGroupStyles =
              customGroupMatch &&
              customGroupMatch
                .map(selector => {
                  return selector.replace(customGroupIDRegExp, '')
                })
                .join('')

            // Wrap the CSS content with the provided ID and charset
            const wrappedCssContent = `@charset "UTF-8"; #${id} {${trimmedCSS}} ${customGroup} {${customGroupStyles}}`

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
