import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FileUpload from '../FileUpload';

type FileUploadProps = React.ComponentProps<typeof FileUpload>;

const meta: Meta<FileUploadProps> = {
  title: 'components/FileUpload',
  component: FileUpload,
  argTypes: {
    onImagesChange: { action: 'images changed' }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onImagesChange: (files) => console.log('Updated files:', files)
  }
};
