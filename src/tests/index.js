import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';

import Clock from '../index';

const { describe, it } = global;

describe('Clock', () => {
  it('should exist', () => {
    const clock = shallow(<Clock />);
    expect(clock).toExist();
  });

  it('should have a default `radius` prop', () => {
    const clock = mount(<Clock />);
    expect(typeof clock.props().radius).toBe('number');
  });

  describe('with `time` prop', () => {
    it('should keep the time prop unchanged', (done) => {
      const clock = mount(<Clock time="12:30" />);

      setTimeout(() => {
        expect(clock.state().time).toEqual({ h: 12, m: 30, s: 0 });
        done();
      }, 1100);
    });

    it('should not be ticking', () => {
      const clock = mount(<Clock time="12:30" />);
      expect(clock.state().status).toEqual(Clock.STATUSES.stopped);
    });
  });

  /* TODO - Should do sanity check on time input */

  describe('without `time` prop', () => {
    it('should be ticking', () => {
      const clock = mount(<Clock />);
      expect(clock.state().status).toEqual(Clock.STATUSES.ticking);
    });

    it('should update the time automatically when time prop isn\'t passed in', (done) => {
      const clock = mount(<Clock />);
      const firstTime = clock.state().time;

      setTimeout(() => {
        expect(clock.state().time).toNotEqual(firstTime);
        done();
      }, 1100);
    });
  });

  /* When the component is unmounted */
  /* Theming */
});
