# postcss-figma-blur-fix

> [PostCSS](https://github.com/postcss/postcss) plugin that adjusts blur values imported from Figma by multiplying them by 0.45. This ensures the blur effect in browsers visually matches the design as seen in Figma.

## Why do you need it?

Figma and browsers use different algorithms to render blur effects, often resulting in inconsistent visuals. A blur value from Figma may appear significantly stronger or weaker when implemented in CSS.

The plugin solves this by simply multiplying the blur() value by 0.45, so that the browser output closely resembles the original design.

> [!NOTE]
> This plugin only works with absolute `px` values.
> If your CSS uses other units like `em`, `rem`, etc., the plugin will not change those values. Make sure your values are in px for the plugin to work correctly.

## Examples

input:

```css
.filter {
    filter: blur(25.5px);
}

.backdrop-filter {
    backdrop-filter: blur(15px);
}

.multiple-values {
    filter: opacity(90%) blur(30px);
}
```

output:

```css
.filter {
    filter: blur(11.475px);
}

.backdrop-filter {
    backdrop-filter: blur(6.75px);
}

.multiple-values {
    filter: opacity(90%) blur(13.5px);
}
```

## Usage
install:

```bash
npm install --save-dev postcss-figma-blur-fix
```

Add to PostCSS plugins:

```diff
module.exports = {
  plugins: [
+   require('postcss-figma-blur-fix'),
    require('autoprefixer')
  ]
}
```
