import _ from 'lodash';

const stringify = (value, depth = 1) => {
  if (!_.isPlainObject(value)) {
    return value;
  }

  const indentSize = depth * 4;
  const currentIndent = ' '.repeat(indentSize);
  const bracketIndent = ' '.repeat(indentSize - 4);
  const lines = Object.entries(value)
    .map(([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 1)}`);

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const formatStylish = (diff, depth = 1) => {
  const indentSize = depth * 4;
  const currentIndent = ' '.repeat(indentSize - 2);
  const bracketIndent = ' '.repeat(indentSize - 4);

  const lines = diff.map((node) => {
    switch (node.type) {
      case 'added':
        return `${currentIndent}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'removed':
        return `${currentIndent}- ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'unchanged':
        return `${currentIndent}  ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'changed':
        return [
          `${currentIndent}- ${node.key}: ${stringify(node.value1, depth + 1)}`,
          `${currentIndent}+ ${node.key}: ${stringify(node.value2, depth + 1)}`,
        ].join('\n');
      case 'nested':
        return `${currentIndent}  ${node.key}: ${formatStylish(node.children, depth + 1)}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

export default formatStylish;
