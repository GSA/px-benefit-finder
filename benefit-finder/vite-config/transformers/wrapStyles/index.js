import { writeFileSync } from 'fs';

export default function wrapStyles(options) {

  const {id} = options

  return {
    name: 'wrap-css',
    writeBundle(options, bundle) {
      // Check if there is any CSS output in the bundle
      if (bundle) {
        console.log(Object.keys(bundle))
        // Assuming only one CSS file is generated, you can modify this according to your project structure
        const cssFileName = Object.keys(bundle).filter(file => file.includes('.min.css'));
        const cssContent = bundle[cssFileName].source;

        // Remove charset
        const trimmedCSS = cssContent.replace(/^@charset "UTF-8";/, '')
        
        // Wrap the CSS content with the provided ID, and charset
        const wrappedCssContent = `@charset "UTF-8"; #${id} { ${trimmedCSS} }`;
        bundle[cssFileName].source = wrappedCssContent

        // Write the wrapped CSS content back to the file
        writeFileSync(`./build/${cssFileName}`, wrappedCssContent);
        return bundle
      }
    }
  };
}