const path = require("path");

module.exports = function convertCustomStoryToCsf3(babel, _, file) {
  return {
    visitor: {
      Identifier(path, state, opts) {
        if (path.node.name !== 'stories') return;
        if (state.filename.includes('Badge/index.stories.tsx')) {
          // debugger
        }
        const isVariable = path.parent.type === 'VariableDeclarator'
        if (!isVariable || path.parent.init.type !== 'ObjectExpression') return;
        const storiesNames = path.parent.init.properties.map(e => {
          if (e.key.name == '') {}
          return e.key.name
        })
        const getExp = storyName => {
          return babel.template.statement.ast(`export const ${storyName} = stories['${storyName}']`)
        }
        storiesNames.forEach((name) => {
          path.parentPath.parentPath.parentPath.parent.program.body.push(getExp(name))
        })
      },
      ExportDefaultDeclaration(path, state) {
        return;
        if (path.node.declaration.type !== 'ObjectExpression') return;
        let idx = path.node.declaration.properties.find();
        const keys = path.node.declaration.properties.map(e => e.key.name)
        if (!keys.include('title')) {
          const filename = 'badge'
          const titleObj = babel.template.statement.ast(`({title: "${filename}"})`)
          path.node.declaration.properties.push(titleObj.expression.properties[0])
        }
      },
      Program() {},
    }
  }
}
