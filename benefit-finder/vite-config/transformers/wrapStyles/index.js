import { extname } from 'path'

export default function wrapStyles(options) {
  console.log(options)
  return {
    name: 'wrap-styles',
    renderChunk(code, chunkInfo) {
      const isStyleChunk =
        chunkInfo.facadeModuleId && extname(chunkInfo.facadeModuleId) === '.css'
      if (isStyleChunk) {
        const wrappedCode = `#${options.id} { ${code} }`
        console.log(code)
        return { code: wrappedCode }
      }
    },
  }
}
