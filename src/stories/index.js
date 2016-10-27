import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Clock from '../clock';

storiesOf('Clock', module)
  .add('default view', () => (
    <pre>
      process.env.STORYBOOK_CLOUD_URL: {process.env.STORYBOOK_CLOUD_URL}
      process.env.STORYBOOK_CLOUD_APPID: {process.env.STORYBOOK_CLOUD_APPID}
      process.env.STORYBOOK_CLOUD_DATABASE: {process.env.STORYBOOK_CLOUD_DATABASE}
    </pre>
  ))
  .add('clock', () => (
    <Clock />
  ))
  .add('huge clock', () => (
    <Clock radius="200"/>
  ))
  .add('sailor\'s clock', () => (
    <Clock theme="mono-navi"/>
  ))
  .add('custom clock', () => (
    <Clock theme={{bezel: 'black', face: 'grey', hour: 'lightgrey', minute: 'darkgrey', second: 'black'}}/>
  ))
