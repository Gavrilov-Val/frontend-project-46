import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getFilepath = (filepath) => path.resolve(process.cwd(), filepath);

const getParsedData = (data) => JSON.parse(data);

const showDiff = (filepath1, filepath2) => {
  const absPath1 = getFilepath(filepath1);
  const absPath2 = getFilepath(filepath2);
  const data1 = fs.readFileSync(absPath1, 'utf-8');
  const data2 = fs.readFileSync(absPath2, 'utf-8');
  const parsedData1 = getParsedData(data1);
  const parsedData2 = getParsedData(data2);
  const sortedKeys = _.sortBy(_.union(_.keys(parsedData1), _.keys(parsedData2)));
  const diffLines = sortedKeys.map((key) => {
    const hasInData1 = _.has(parsedData1, key);
    const hasInData2 = _.has(parsedData2, key);
    
    if (!hasInData1) {
      return `  + ${key}: ${parsedData2[key]}`;
    }
    
    if (!hasInData2) {
      return `  - ${key}: ${parsedData1[key]}`;
    }
    
    if (parsedData1[key] === parsedData2[key]) {
      return `    ${key}: ${parsedData1[key]}`;
    }
    
    return [
      `  - ${key}: ${parsedData1[key]}`,
      `  + ${key}: ${parsedData2[key]}`
    ].join('\n');
  });

  return `{\n${diffLines.join('\n')}\n}`;  
};



export default showDiff;