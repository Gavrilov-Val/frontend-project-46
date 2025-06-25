import yaml from 'js-yaml';

const parseFile = (data, fileExt) => {
  switch (fileExt) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
      return yaml.load(data);
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error('Unknown file extension!');
  }
};

export default parseFile;
