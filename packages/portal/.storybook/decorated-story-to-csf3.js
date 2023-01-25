module.exports = function convertCustomStoryToCsf3(babel, _, file) {
  return {
    visitor: {
      Identifier(path, state, opts) {
        if (path.node.name !== 'stories') return;
        const isVariable = path.parent.type === 'VariableDeclarator'
        if (!isVariable || path.parent.init.type !== 'ObjectExpression') return;
        const storiesNames = path.parent.init.properties.map(e => {
          if (e.key.name == '') {}
          return e.key.name
        })
        const getExp = storyName => {
          const nonConflictingName = name => (name === 'default') ? 'Default' : name;
          return babel.template.statement.ast(`export const ${nonConflictingName(storyName)} = stories['${storyName}']`)
        }
        storiesNames.forEach((name) => {
          path.parentPath.parentPath.parentPath.parent.program.body.push(getExp(name))
        })
      },
      ExportDefaultDeclaration(path, state) {
        if (path.node.declaration.type !== 'ObjectExpression') return;
        const storiesProp = path.node.declaration.properties.find(e => e.key.name === 'stories');
        if (!storiesProp) return; // this is not a _stories_ file
        const keys = path.node.declaration.properties.map(e => e.key.name)
        if (!keys.includes('title')) {
          const nameProp = path.node.declaration.properties.find(e => e.key.name === 'name');
          const titleObj = babel.template.statement.ast(`({title: ""})`)
          titleObj.expression.properties[0].value = nameProp.value; // copy property value
          path.node.declaration.properties.push(titleObj.expression.properties[0])
        }
      },
    }
  }
}
