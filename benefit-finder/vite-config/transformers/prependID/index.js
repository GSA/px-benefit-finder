import postcss from 'postcss'

const prependID = postcss.plugin('wrap-css-with-id', options => {
  return root => {
    if (root.source.input.file && root.source.input.file.endsWith('.scss')) {
      root.walkRules(rule => {
        const ignoreClasss = options.ignoreClasss || []
        if (!ignoreClasss.includes(rule.selector)) {
          rule.selector = `#${options.id} ${rule.selector}`
        }
      })
    }
  }
})

export default prependID
