#!/usr/bin/env node

import { Command } from 'commander';
import showFilesData from '../src/index.js';
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    // Здесь будет логика сравнения файлов
    console.log(showFilesData(filepath1, filepath2));
  });

program.parse(process.argv);