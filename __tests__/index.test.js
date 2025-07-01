import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import showDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('expectedStylish.txt');
const expectedPlain = readFile('expectedPlain.txt');

describe('genDiff for nested structures', () => {
  const file1Json = getFixturePath('file1.json');
  const file2Json = getFixturePath('file2.json');
  const file1Yml = getFixturePath('file1.yml');
  const file2Yml = getFixturePath('file2.yml');

  describe('stylish format', () => {
    test('json vs json', () => {
      expect(showDiff(file1Json, file2Json, 'stylish')).toBe(expectedStylish);
    });

    test('yml vs yml', () => {
      expect(showDiff(file1Yml, file2Yml, 'stylish')).toBe(expectedStylish);
    });

    test('json vs yml', () => {
      expect(showDiff(file1Json, file2Yml, 'stylish')).toBe(expectedStylish);
    });

    test('yml vs json', () => {
      expect(showDiff(file1Yml, file2Json, 'stylish')).toBe(expectedStylish);
    });
  });

  describe('plain format', () => {
    test('json vs json', () => {
      expect(showDiff(file1Json, file2Json, 'plain')).toBe(expectedPlain);
    });

    test('yml vs yml', () => {
      expect(showDiff(file1Yml, file2Yml, 'plain')).toBe(expectedPlain);
    });

    test('json vs yml', () => {
      expect(showDiff(file1Json, file2Yml, 'plain')).toBe(expectedPlain);
    });

    test('yml vs json', () => {
      expect(showDiff(file1Yml, file2Json, 'plain')).toBe(expectedPlain);
    });
  });

  test('default format (stylish)', () => {
    expect(showDiff(file1Json, file2Json)).toBe(expectedStylish);
  });
});
