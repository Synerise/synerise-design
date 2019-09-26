import { ReactElement } from 'react';

const templateComponent = ({ template }, opts, { componentName, jsx }): ReactElement => {
  const typeScriptTpl = template.smart({ plugins: ['typescript'] });
  const iconName = componentName.name;
  const iconNameWithoutNumber = iconName.replace(/[0-9]/g, '');

  return typeScriptTpl.ast`
    import * as React from 'react';
    const ${iconNameWithoutNumber} = (): React.ReactNode => ${jsx};

    export default ${iconNameWithoutNumber};
  `;
};

module.exports = templateComponent;
