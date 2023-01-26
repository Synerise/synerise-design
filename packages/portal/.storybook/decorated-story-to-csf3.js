module.exports = function convertCustomStoryToCsf3(babel, _, file) {
  return {
    visitor: {
      Identifier(path, state, opts) {
        if (path.node.name !== 'stories') return;
        if (state.filename.includes('index.stories.tsx')) {
          1;// debugger
        }
        const isVariable = path.parent.type === 'VariableDeclarator'
        if (!isVariable || path.parent.init.type !== 'ObjectExpression') return;
        const storiesNames = path.parent.init.properties.map(e => {
          if (e.key.name == '') {}
          return e.key?.extra?.rawValue || e.key.name
        })
        const getExp = storyName => {
          const nonConflictingName = name => (name === 'default') ? '__default' : `__${name}`;
          return babel.template.statement.ast(`export var ${nonConflictingName(storyName)} = stories['${storyName}']`)
        }
        storiesNames.forEach((name) => {
          path.parentPath.parentPath.parentPath.parent.program.body.push(getExp(name.replace?.(/- /g, '_')))
        })
      },
      ExportDefaultDeclaration(path, state) {
        if (path.node.declaration.type !== 'ObjectExpression') return;
        const storiesProp = path.node.declaration.properties.find(e => e.key.name === 'stories');
        if (!storiesProp) return; // this is not a _stories_ file
        const keys = path.node.declaration.properties.map(e => e.key.name)
        if (!keys.includes('title')) {
          const nameProp = path.node.declaration.properties.find(e => e.key.name === 'name');
          // const titleObj = babel.template.statement.ast(`({title: ""})`)
          // titleObj.expression.properties[0].value = nameProp.value; // copy property value
          const titleObj = babel.template.statement.ast(`({title: "${nameProp.value.value}"})`)
          path.node.declaration.properties.push(titleObj.expression.properties[0])
        }
        if (!keys.includes('component')) {
          const prop = path.node.declaration.properties.find(e => e.key.name === 'Component');
          // const objWithProp = babel.template.statement.ast(`({component: () => (<>dummy</>)})`)
          const objWithProp = babel.template.statement.ast(`({ component: () => React.createElement('dummy') })`)
          if (prop) {
            // objWithProp.expression.properties[0].value = path.node.declaration.properties[propIdx]
            objWithProp.expression.properties[0].value = prop.value
          }
          path.node.declaration.properties.push(objWithProp.expression.properties[0]);
        }
      },
    }
  }
}
