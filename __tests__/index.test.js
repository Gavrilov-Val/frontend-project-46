import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import showDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), { encoding: 'utf8' });
const expectedFileJson = readFile('expectedFileJson.txt');

test('showDiff with JSON files', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const result = showDiff(filepath1, filepath2);
  expect(result).toBe(expectedFileJson);
});
