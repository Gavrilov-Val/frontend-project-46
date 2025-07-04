import _ from 'lodash'

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

const buildPath = (ancestors, key) => [...ancestors, key].join('.')

const formatPlain = (diff, ancestors = []) => {
  const lines = diff.flatMap((node) => {
    const currentPath = buildPath(ancestors, node.key)

    switch (node.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${stringify(node.value)}`
      case 'removed':
        return `Property '${currentPath}' was removed`
      case 'changed':
        return `Property '${currentPath}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`
      case 'nested':
        return formatPlain(node.children, [...ancestors, node.key])
      case 'unchanged':
        return []
      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  })

  return lines.join('\n')
}

export default formatPlain
