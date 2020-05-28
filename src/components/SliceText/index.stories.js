import React from 'react';
// import { action } from '@storybook/addon-actions';
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs/react';

import SliceText from './index';

export default {
  component: SliceText,
  title: 'SliceText',
  decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const initialData = {
  text: '这是一段文字，会根据传入的`length`值调整显示的字数，显示不全的文字以...结束',
  length: 0,
  showTitle: true
};

export const actionsData = {
};

export const Default = () => (
  <SliceText
    text={text('text', initialData.text)}
    length={number('length', initialData.length)}
    showTitle={boolean('showTitle', initialData.showTitle)}
    {...actionsData}
   />
)
