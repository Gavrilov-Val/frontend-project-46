import fs from 'fs'
import path from 'path'
import parseFile from './parsers.js'
import buildDiff from './diffBuilder.js'
import getFormatter from './formatters/index.js'

const getFilepath = filepath => path.resolve(process.cwd(), filepath)
const getFileExt = filepath => path.extname(filepath)

const showDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const absPath1 = getFilepath(filepath1)
  const absPath2 = getFilepath(filepath2)

  const ext1 = getFileExt(filepath1)
  const ext2 = getFileExt(filepath2)

  const data1 = fs.readFileSync(absPath1, 'utf-8')
  const data2 = fs.readFileSync(absPath2, 'utf-8')

  const parsedData1 = parseFile(data1, ext1)
  const parsedData2 = parseFile(data2, ext2)
  const diff = buildDiff(parsedData1, parsedData2)
  const formatter = getFormatter(formatName)

  return formatter(diff)
}

export default showDiff
