import yaml from 'js-yaml'

const parseFile = (data, dataType) => {
  switch (dataType) {
    case 'json':
      return JSON.parse(data)
    case 'yaml':
      return yaml.load(data)
    case 'yml':
      return yaml.load(data)
    default:
      throw new Error('Unknown file extension!')
  }
}

export default parseFile
