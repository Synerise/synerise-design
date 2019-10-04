const fs = require('fs');
const chalk = require('chalk');
const { componentTemplate } = require('../create-component/component-template');

const createFile = (path, content, type) => {
    fs.writeFile(path, content, err => {
        if (err) console.log(chalk.red(err))
        else console.log(chalk.green(`${type}`), `is created successfully.\n`);
    }); 
}

const createComponent = vars => 
    createFile(`${vars.folderPath}/src/${vars.componentName}.tsx`, componentTemplate(vars.componentName), 'Component file')

module.exports = {
    createComponent
}
