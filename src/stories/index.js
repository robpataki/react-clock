import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from '../index';
import Clock from '../clock';

storiesOf('Button', module)
  .add('default view', () => (
    <pre>
      process.env.STORYBOOK_CLOUD_URL: {process.env.STORYBOOK_CLOUD_URL}
      process.env.STORYBOOK_CLOUD_APPID: {process.env.STORYBOOK_CLOUD_APPID}
      process.env.STORYBOOK_CLOUD_DATABASE: {process.env.STORYBOOK_CLOUD_DATABASE}
    </pre>
  ))
  .add('link button', () => (
    <Button onClick={ linkTo('Button', 'some emojies as the text') }>Next Story</Button>
  ))
  .add('some emojies as the text', () => (
    <Button>😀 😎 👍 💯</Button>
  ))
  .add('custom styles', () => {
    const style = {
      fontSize: 20,
      textTransform: 'uppercase',
      color: '#FF8833',
    };
    return (
      <Button style={style}>Hello</Button>
    );
  });

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
    .add('Large clock', () => (
      <Clock radius="200"/>
    ))
    .add('Themed clock', () => (
      <Clock theme="mono-navi"/>
    ))
    .add('Custom themed clock', () => (
      <Clock theme={{bezel: 'black', face: 'grey', hour: 'lightgrey', minute: 'darkgrey', second: 'black'}}/>
    ))
