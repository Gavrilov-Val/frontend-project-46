#!/usr/bin/env node

import { Command } from 'commander'
import showDiff from '../src/index.js'

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format (stylish, plain, json)', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    console.log(showDiff(filepath1, filepath2, options.format))
  })

program.parse(process.argv)
