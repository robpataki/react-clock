import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';

import Clock from '../index';

const { describe, it } = global;

describe('Clock', () => {
  it('should exist', () => {
    const wrapper = shallow(<Clock />);
    expect(wrapper).toExist();
  });

  it('should have a default `radius` prop', () => {
    const wrapper = mount(<Clock />);
    expect(typeof wrapper.props().radius).toBe('number');
  });

  it('should use the `radius` prop to draw the SVG', () => {
    const wrapper = mount(<Clock radius="100" />);
    const svgEl = wrapper.find({ width: '100', height: '100', viewBox: '0 0 100 100' });
    expect(svgEl.type()).toEqual('svg');

    expect(wrapper.html().toString().indexOf('width: 100px;') > 0).toBe(true);
    expect(wrapper.html().toString().indexOf('height: 100px;') > 0).toBe(true);
  });

  describe('with `time` prop', () => {
    it('should keep the time prop unchanged', (done) => {
      const wrapper = mount(<Clock time="12:30" />);

      setTimeout(() => {
        expect(wrapper.state().time).toEqual({ h: 12, m: 30, s: 0 });
        done();
      }, 1100);
    });

    it('should not be ticking', () => {
      const wrapper = mount(<Clock time="12:30" />);
      expect(wrapper.state().status).toEqual(Clock.STATUSES.stopped);
    });
  });

  describe('without `time` prop', () => {
    it('should be ticking', () => {
      const wrapper = mount(<Clock />);
      expect(wrapper.state().status).toEqual(Clock.STATUSES.ticking);
    });

    it('should update the time automatically when time prop isn\'t passed in', (done) => {
      const wrapper = mount(<Clock />);
      const firstTime = wrapper.state().time;

      setTimeout(() => {
        expect(wrapper.state().time).toNotEqual(firstTime);
        done();
      }, 1100);
    });
  });

  /* TODO - Should do sanity check on time input */
  /* TODO - Test default themes */
  /* TODO - Test custom theming */
  /* TODO - See if there is a way to test the timer being stopped on unmount */
});
