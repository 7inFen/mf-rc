import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import ColumnFilter from './index';

export default {
  component: ColumnFilter,
  title: 'ColumnFilter',
  decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const initialData = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '操作',
    dataIndex: 'manage'
  }
];

export const actionsData = {
  onChange: action('onChange'),
};

export const Default = () => <ColumnFilter data={object('data', initialData)} {...actionsData} />;
