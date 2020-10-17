'use strict';

var HtmlValidate = require('html-validate').HtmlValidate;
var c = require('ansi-colors');
var log = require('fancy-log');
var textFormat = require('html-validate/build/formatters/text').default;

function validateHtml (sourceFileHtml, filename) {
  try {
    var htmlvalidate = new HtmlValidate();

    const report = htmlvalidate.validateSource({
      /* markup to validate */
      data: sourceFileHtml,
      /* filename to put in report, content is not read */
      filename: filename
    });

    if (!report.valid) {
      /* errors log */
      log(c.red(`File is not valid => ${report.results[0].filePath}`));
      log(c.green(`File - ${textFormat(report.results)}`));
    }
  } catch (error) {
    log.error('WebpackHtmlValidate ERROR');
    log.error(error);
  }
}

class WebpackHtmlValidatePlugin {
  constructor () {
    this.REGEX_HTML = new RegExp(/\.html$/);
  }

  apply (compiler) {
    compiler.hooks.emit.tapAsync('WebpackHtmlValidatePlugin', (compilation, callback) => {
      var allFiles = compilation.assets;

      for (var filename in allFiles) {
        const isMatch = filename.match(this.REGEX_HTML);

        if (isMatch) {
          var sourceFileHtml = allFiles[filename].source();
          validateHtml(sourceFileHtml, filename);
        }
      }

      callback();
    });
  }
}

module.exports = WebpackHtmlValidatePlugin;
