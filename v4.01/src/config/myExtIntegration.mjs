import fs from 'fs';
import { globSync } from 'glob';
import beautify from 'js-beautify';

function htmlFormatter(filePath) {
  const config = {
    end_with_newline: true,
    extra_liners: [],
    indent_char: ' ',
    indent_empty_lines: false,
    indent_inner_html: false,
    indent_scripts: 'keep',
    indent_size: 2,
    wrap_line_length: 0,
  };

  const inputHtml = fs.readFileSync(filePath, { encoding: 'utf8' });
  const outputHtml = beautify.html(inputHtml, config);
  fs.writeFileSync(filePath, outputHtml);
}

export default function() {
  return {
    name: 'myExt:integration',
    hooks: {
      'astro:build:generated': (options) => {
        globSync(`${options.dir.pathname}**/*.html`).forEach((filePath) => {
          htmlFormatter(filePath);
        });
      },
    },
  };
};
