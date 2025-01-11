const FIGMA_BLUR_FIX_COEFFICIENT = 0.45

const processed = Symbol('processed')

function process(decl) {
  if (decl[processed]) {
    return
  }

  decl.value = decl.value.replace(
    /blur\(([+-]?(?:\d+(?:\.\d+)?|\.\d+))(\D+)\)/,
    (match, value, unit) => {
      if (unit !== 'px') {
        return match
      }

      return `blur(${value * FIGMA_BLUR_FIX_COEFFICIENT}px)`
    },
  )

  decl[processed] = true
}

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = () => {
  return {
    postcssPlugin: 'postcss-figma-blur-fix',

    Declaration: {
      'filter': process,
      'backdrop-filter': process,
    },
  }
}

module.exports.postcss = true
