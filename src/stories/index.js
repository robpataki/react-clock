import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Clock from '../index';

storiesOf('Clock', module)
  .add('deault view', () => (
    <Clock />
  ))
  .add('freeze in time', () => (
    <Clock time="09:45" />
  ))
  .add('custom size', () => (
    <Clock radius="120" />
  ))
  .add('use built in theme', () => (
    <Clock theme="light" />
  ))
  .add('use custom theme', () => (
    <Clock theme={{
      bezel: 'orange',
      face: 'black',
      hour: 'orange',
      minute: 'orange',
      second: 'orange',
      dot: 'black' }}
    />
  ))
  .add('hide seconds', () => (
    <Clock theme={{
      bezel: 'orange',
      face: 'black',
      hour: 'orange',
      minute: 'orange',
      second: 'rgba(0, 0, 0, 0)',
      dot: 'black' }}
    />
  ))
  .add('fully custom', () => (
    <Clock theme={{
      bezel: '#0099FF',
      face: 'rgba(0, 0, 0, 0)',
      hour: '#0099FF',
      minute: '#0099FF',
      second: 'rgba(0, 0, 0, 0)',
      dot: 'rgba(0, 0, 0, 0)' }}
    />
  ));
