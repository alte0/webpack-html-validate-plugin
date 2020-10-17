# Warning. This is my first plugin for Webpack. May be bugs 🐜.
Validate html files with [html-validate](https://html-validate.org/) only static html files.

`
npm i -D https://github.com/alte0/webpack-html-validate-plugin
`

Use plugin:

```sh
const WebpackHtmlValidatePlugin = require('webpack-html-validate')

 plugins: [
   new WebpackHtmlValidatePlugin()
 ]
```
## Configuration

Create `.htmlvalidate.json`:

```js
{
  "extends": [
    "html-validate:recommended"
  ]
}
```
####Look more - [gitlab html-validate](https://gitlab.com/html-validate/html-validate/)