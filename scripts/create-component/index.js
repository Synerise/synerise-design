#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const inquirer = require('inquirer');
const copyTemplateDir = require('copy-template-dir');

const { getPackages, toPackageName } = require('../utils/packages.js');
const { createComponent } = require('../utils/templates.js');
const { smush, pascalize } = require('../utils/string.js');

const packagesDir = path.resolve(__dirname, '..', '..', 'packages', 'components');
const storiesCSF3Dir = path.resolve(__dirname, '..', '..', 'packages', 'storybook', 'stories', 'components');
const templateDir = path.resolve(__dirname, 'package-template');


const copyPackageFromTemplateDir = (source, dest, vars) => {
  return new Promise((resolve, reject) => {
    copyTemplateDir(source, dest, vars, (err, createdFiles) => {
      if (err) reject(err);
      else {
        resolve(createdFiles)
      };
    });
  });
};

async function main() {
  const packages = await getPackages();
  const packagesMap = packages.reduce((acc, pkg) => ({
    ...acc,
    [pkg.name]: pkg.version,
  }));

  const suggestedExternalDependencies = [];

  const suggestedDependencies = ['button', 'typography', 'card'].map(toPackageName);

  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Component Name (kebab-case)',
      validate: name => (name.length > 0 ? true : 'invalid name'),
    },
    {
      type: 'checkbox',
      name: 'dependencies',
      message: 'Dependencies',
      choices: [...suggestedDependencies, ...suggestedExternalDependencies].map(name => ({ name })),
      filter: keys => {
        const depMap = keys.reduce((acc, name) => ({ ...acc, [name]: '*' }), {});
        return JSON.stringify(depMap);
      },
    },
  ];

  const answers = await inquirer.prompt(questions);

  const componentName = pascalize(answers.name);
  const docsID = answers.name;
  const folderName = smush(answers.name);
  const packageName = toPackageName(answers.name);
  const folderPath = path.resolve(packagesDir, folderName);
  const storiesCSF3Path = path.resolve(storiesCSF3Dir, componentName);


  const vars = {
    ...answers,
    componentName,
    docsID,
    folderName,
    folderPath,
    packageName,
    storiesCSF3Path
  };

  if (fs.existsSync(folderPath)) {
    throw new Error(`folder ${folderName} already exists`);
  }
  if (!fs.existsSync(storiesCSF3Path)){
    fs.mkdirSync(storiesCSF3Path);
  }

  await copyPackageFromTemplateDir(templateDir, folderPath, vars);
  createComponent(vars)
  return vars;
}

main()
  .then(vars => {
    console.info(`\n${vars.componentName} created at: ${vars.folderPath}\n`);
    console.info(`Next run: ${chalk.magenta('yarn bootstrap')}\n`);
  })
  .catch(console.error);
