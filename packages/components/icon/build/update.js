const fs = require('fs-extra');

const ICON_PATH = './src/icons/';
const STORYBOOK_ICONLIST = '../../portal/stories/components/Icon/icons/index.ts'
const files = fs.readdirSync(ICON_PATH);

const writeStream = fs.createWriteStream(STORYBOOK_ICONLIST);
writeStream.on('error', err => console.log('Something wrong with your file: ',err ));
writeStream.write('const iconArr = [\n')
const updateFun = files.forEach(i => {
  if(!i.includes('index')){
    i = i.replace('.tsx','');
    writeStream.write('\''+ i + '\','+'\r\n');
  }
});
writeStream.write('];\n'+'\n'+'export default iconArr;')
writeStream.end();



module.exports.updateFun;