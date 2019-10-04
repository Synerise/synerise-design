const componentTemplate = name => {
    return `import * as React from 'react';\n`+
        `export type ${name}Props = {};\n`+
        `const ${name}: React.FC<${name}Props> = props => {\n`+
        `   return (\n`+
        `       <div>${name} example</div>\n`+
        `   );\n`+
        `};\n`+
        `export default ${name};\n`
    ;
}

module.exports = {
    componentTemplate
}
