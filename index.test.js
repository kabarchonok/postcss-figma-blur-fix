const { equal } = require('node:assert')
const fs = require('node:fs')
const path = require('node:path')
const { test } = require('node:test')
const postcss = require('postcss')
const plugin = require('./')

async function run(input, output, opts = {}) {
  const result = await postcss([plugin(opts)]).process(getOutput(input), {
    from: undefined,
  })

  equal(result.css, getOutput(output))
  equal(result.warnings().length, 0)
}

function getOutput(file) {
  const filePath = path.resolve(__dirname, file)
  return fs.readFileSync(filePath, 'utf-8')
}

test('opts with multiple units', async () => {
  await run (
    'test/common.css',
    'test/common.expected.css',
    { units: ['px', 'em', 'rem'] },
  )
})

test('opts px only', async () => {
  await run (
    'test/opts-px-only.css',
    'test/opts-px-only.expected.css',
    { units: ['px'] },
  )
})

test('multiple-values', async () => {
  await run (
    'test/multiple-values.css',
    'test/multiple-values.expected.css',
  )
})

test('warns on invalid units', async () => {
  const input = '.test { filter: blur(10px); }'
  const result = await postcss([plugin({ units: ['px', '%', 'vw'] })]).process(input, {
    from: undefined,
  })

  equal(result.warnings().length, 2)
  equal(result.warnings()[0].text, 'Unit "%" is not allowed. Allowed units: px, em, rem')
  equal(result.warnings()[1].text, 'Unit "vw" is not allowed. Allowed units: px, em, rem')
})
