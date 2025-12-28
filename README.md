# postcss-figma-blur-fix

> [PostCSS](https://github.com/postcss/postcss) plugin that adjusts blur values imported from Figma by multiplying them by 0.4356. This ensures the blur effect in browsers visually matches the design as seen in Figma.
>
> Works with `filter: blur()` and `backdrop-filter: blur()`.

## Why do you need it?

Figma and CSS implement blur differently. According to [Bjango's research](https://bjango.com/articles/blurradiuscomparison/):

- Figma blur coefficient: `1.136364`
- CSS `filter: blur()` coefficient: `0.495050`

Conversion coefficient: `0.495050 / 1.136364 = 0.4356`

## Example

Input:
```css
.element {
  filter: blur(30px);
}

.backdrop {
  backdrop-filter: blur(15px);
}

.multiple {
  filter: opacity(90%) blur(30px);
}
```

Output:
```css
.element {
  filter: blur(13.068px);
}

.backdrop {
  backdrop-filter: blur(6.534px);
}

.multiple {
  filter: opacity(90%) blur(13.068px);
}
```

## Installation

```bash
npm install --save-dev postcss-figma-blur-fix
```

## Usage

```diff
module.exports = {
  plugins: [
+   require('postcss-figma-blur-fix'),
    require('autoprefixer')
  ]
}
```

## Default options
```js
require('postcss-figma-blur-fix')({
  units: ['px'] // allowed: px, em, rem
})
```

Example with `units: ['px']`:
```css
/* Input */
.example {
  filter: blur(20px);
}

.ignored {
  filter: blur(2em);
}

/* Output */
.example {
  filter: blur(8.712px);
}

.ignored {
  filter: blur(2em); /* unchanged */
}
```
