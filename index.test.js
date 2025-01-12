const { equal } = require('node:assert')
const { test } = require('node:test')
const postcss = require('postcss')

const plugin = require('./')

async function run(input, output, opts = {}) {
  const result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  })
  equal(result.css, output)
  equal(result.warnings().length, 0)
}

test('combined test case', async () => {
  await run(
    `
      .filter {
          filter: blur(25.5px);
      }

      .skip-not-px {
          filter: blur(25rem);
      }

      .backdrop-filter {
          backdrop-filter: blur(15px);
      }

      .multiple-values {
          filter: opacity(90%) blur(30px);
      }
    `,
    `
      .filter {
          filter: blur(11.475px);
      }

      .skip-not-px {
          filter: blur(25rem);
      }

      .backdrop-filter {
          backdrop-filter: blur(6.75px);
      }

      .multiple-values {
          filter: opacity(90%) blur(13.5px);
      }
    `,
  )
})
