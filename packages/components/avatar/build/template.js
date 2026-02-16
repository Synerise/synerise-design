function template({ componentName, jsx }, { tpl }) {
  return tpl`
    import React from 'react';
    const ${componentName} = (props: React.SVGProps<SVGSVGElement>): JSX.Element => ${jsx};
    export default ${componentName};
  `;
}
module.exports = template;
