import fs from 'fs';
import path from 'path';

const getFilepath = (filepath) => path.resolve(process.cwd(), filepath);

const getParsedData = (data) => JSON.parse(data);

const showFilesData = (filepath1, filepath2) => {
  const absPath1 = getFilepath(filepath1);
  const absPath2 = getFilepath(filepath2);
  const data1 = fs.readFileSync(absPath1, 'utf-8');
  const data2 = fs.readFileSync(absPath2, 'utf-8');
  const parsedData1 = getParsedData(data1);
  const parsedData2 = getParsedData(data2);
  return {
    filepath1: absPath1,
    filepath2: absPath2,
    data1: parsedData1,
    data2: parsedData2,
  };
};

//console.log(showFilesData('../files/file1.json', '../files/file2.json'));

export default showFilesData;