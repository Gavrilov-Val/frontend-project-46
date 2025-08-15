import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'
import showDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

const expectedStylish = readFile('expectedStylish.txt')
const expectedPlain = readFile('expectedPlain.txt')
const expectedJson = readFile('expectedJson.json')

const filePairs = [
  ['json', 'json'],
  ['yml', 'yml'],
  ['json', 'yml'],
  ['yml', 'json'],
]

describe('genDiff for nested structures', () => {
  const getFilePaths = (type1, type2) => ({
    file1: getFixturePath(`file1.${type1}`),
    file2: getFixturePath(`file2.${type2}`),
  })

  describe.each([
    ['stylish', expectedStylish],
    ['plain', expectedPlain],
    ['json', expectedJson],
  ])('%s format', (formatName, expected) => {
    test.each(filePairs)('%s vs %s', (type1, type2) => {
      const { file1, file2 } = getFilePaths(type1, type2)
      expect(showDiff(file1, file2, formatName)).toBe(expected)
    })
  })

  test('default format (stylish)', () => {
    const { file1, file2 } = getFilePaths('json', 'json')
    expect(showDiff(file1, file2)).toBe(expectedStylish)
  })
})
