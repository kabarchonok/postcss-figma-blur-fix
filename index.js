const FIGMA_BLUR_FIX_COEFFICIENT = 0.4356

// Allowed units for processing
const ALLOWED_UNITS = ['px', 'em', 'rem']

const processed = Symbol('processed')
const warned = new Set()

function process(decl, opts, result) {
  opts = {
    units: opts.units || ['px'],
  }

  if (decl[processed]) {
    return
  }

  // Validate units option
  opts.units.forEach((unit) => {
    if (!ALLOWED_UNITS.includes(unit)) {
      const warningKey = `invalid-unit-${unit}`
      if (!warned.has(warningKey)) {
        warned.add(warningKey)
        decl.warn(result, `Unit "${unit}" is not allowed. Allowed units: ${ALLOWED_UNITS.join(', ')}`)
      }
    }
  })

  decl.value = decl.value.replace(
    /blur\(([+-]?(?:\d+(?:\.\d+)?|\.\d+))(\D+)\)/,
    (match, value, unit) => {
      if (opts.units.includes(unit)) {
        const processedValue = +(value * FIGMA_BLUR_FIX_COEFFICIENT).toFixed(3)

        return `blur(${processedValue}${unit})`
      }

      return match
    },
  )

  decl[processed] = true
}

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  return {
    postcssPlugin: 'postcss-figma-blur-fix',

    Declaration(decl, { result }) {
      if (decl.prop === 'filter' || decl.prop === 'backdrop-filter') {
        process(decl, opts, result)
      }
    },
  }
}

module.exports.postcss = true
