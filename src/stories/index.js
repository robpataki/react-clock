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
  .add('ticking', () => (
    <Clock />
  ))
  .add('no battery', () => (
    <Clock time="09:45" />
  ))
  .add('custom size', () => (
    <Clock radius="120" />
  ))
  .add('built in theme', () => (
    <Clock theme="light" />
  ))
  .add('custom theme', () => (
    <Clock theme={{
      bezel: 'orange',
      face: 'black',
      hour: 'orange',
      minute: 'orange',
      second: 'orange',
      dot: 'black' }}
    />
  ));
