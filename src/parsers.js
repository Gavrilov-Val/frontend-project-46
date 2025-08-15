import yaml from 'js-yaml'

const parseFile = (data) => {
  try {
    return JSON.parse(data)
  }
  catch {
    try {
      const parsed = yaml.load(data)
      if (typeof parsed === 'string') {
        throw new Error('Plain text is not allowed')
      }
      return parsed
    }
    catch {
      throw new Error('Failed to parse: valid JSON or YAML expected')
    }
  }
}

export default parseFile
