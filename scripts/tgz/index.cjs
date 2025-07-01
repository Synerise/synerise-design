#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const argv = minimist(process.argv);

// Input and output file paths
const inputFilePath = path.resolve(__dirname, '../../', argv.inputFilePath);
const outputFilePath = path.resolve(__dirname, '../..', argv.outputFilePath);

async function main() {
  const chromaticUrl = argv.url;

  // Read input file line by line
  const lines = fs.readFileSync(inputFilePath, 'utf-8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  const output = {};

  lines.forEach(filename => {
    // Ensure the filename matches the expected pattern
    const match = filename.match(/^synerise-ds-(.+)-(\d+\.\d+\.\d+)\.tgz$/);

    if (!match) {
      // console.warn(`Skipping invalid filename: ${filename}`);
      return;
    }

    const packageName = match[1];
    const key = `@synerise/ds-${packageName}`;

    output[key] = `${chromaticUrl}static/${filename}`;
  });

  console.log('\x1b[32m', '=== generated tgz packages ===', '\x1b[0m')
  // print in job log
  console.log(JSON.stringify(output, null, 2));

  // Write result to output.json
  fs.writeFileSync(outputFilePath, JSON.stringify(output, null, 2), 'utf-8');

  console.log(`Generated ${outputFilePath} with ${Object.keys(output).length} entries.`);
}

main()