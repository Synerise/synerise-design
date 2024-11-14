const fs = require('fs');
const chalk = require('chalk');
const { componentTemplate } = require('../create-component/component-template');
const { componentTypesTemplate } = require('../create-component/component-types-template');
const { componentStoryTemplate } = require('../create-component/component-story-template');

const createFile = (path, content, type) => {
    fs.writeFile(path, content, err => {
        if (err) console.log(chalk.red(err))
        else console.log(chalk.green(`${type}`), `is created successfully.\n`);
    }); 
}

const createComponent = vars => {
    createFile(`${vars.folderPath}/src/${vars.componentName}.tsx`, componentTemplate(vars.componentName), 'Component file')
    createFile(`${vars.folderPath}/src/${vars.componentName}.types.ts`, componentTypesTemplate(vars.componentName), 'Component types file')
    createFile(`${vars.storiesCSF3Path}/${vars.componentName}.stories.tsx`, componentStoryTemplate(vars.componentName, vars.packageName), 'Component stories file')
}

module.exports = {
    createComponent
}
