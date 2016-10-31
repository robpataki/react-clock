import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Clock from '../index';

storiesOf('Clock', module)
  .add('default view', () => (
    <pre>
      process.env.STORYBOOK_CLOUD_URL: {process.env.STORYBOOK_CLOUD_URL}
      process.env.STORYBOOK_CLOUD_APPID: {process.env.STORYBOOK_CLOUD_APPID}
      process.env.STORYBOOK_CLOUD_DATABASE: {process.env.STORYBOOK_CLOUD_DATABASE}
    </pre>
  ))
  .add('ticking clock', () => (
    <Clock />
  ))
  .add('frozen clock', () => (
    <Clock time="09:45" />
  ))
  .add('custom size clock', () => (
    <Clock radius="120" />
  ));
