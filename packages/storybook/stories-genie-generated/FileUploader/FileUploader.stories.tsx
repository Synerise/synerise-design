import React, {
  useState
} from 'react';
import FileUploader, {
  FileUploaderProps
} from './FileUploader';
import {
  Story
} from '@storybook/react/types-6-0';
export default {
  title: 'Components/FileUploader',
  component: FileUploader,
};
const Template: Story < FileUploaderProps > = (args) => {
  const [files, setFiles] = useState([]);
  const handleUpload = (uploadedFiles) => {
    setFiles([...files, ...uploadedFiles]);
  };
  const handleRemove = (fileIndex) => {
    const updatedFiles = [...files];
    updatedFiles.splice(fileIndex, 1);
    setFiles(updatedFiles);
  };
  return (<FileUploader {...args} onUpload={handleUpload} onRemove={handleRemove} files={files} />);
};
export const Primary = Template.bind({});
Primary.args = {
  label: 'Upload Files',
  description: 'Upload up to 5 files',
  filesAmount: 5,
  accept: '.pdf,.doc,.docx',
};