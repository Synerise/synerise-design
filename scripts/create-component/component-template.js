const componentTemplate = name => {
    return `import React from 'react';\n`+
        ``+
        `export type ${name}Props = {};\n`+
        ``+
        `const ${name} = (props: ${name}Props) => {\n`+
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
