import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';

import Clock from '../index';

const { describe, it, beforeEach } = global;

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

  describe('getCurrentTimeString', () => {
    it('should return a : delimeted string with the current time\'s h, m, s values', () => {
      const now = new Date();
      const expected = [now.getHours(), now.getMinutes(), now.getSeconds()].join(':');
      const actual = Clock.getCurrentTimeString();
      expect(expected).toEqual(actual);
    });
  });

  describe('convertTimeStringToHash', () => {
    it('should convert a `h:m:s` formatted string to {h, m, s} formatted object', () => {
      expect(Clock.convertTimeStringToHash('16:12:10')).toEqual({ h: 16, m: 12, s: 10 });
    });
  });

  describe('getPointByDegree', () => {
    let radius;
    let centerX;
    let centerY;

    beforeEach(() => {
      radius = 100;
      centerX = centerY = radius;
    });

    it('should return the correct x/y positions for 3 o\'clock ', () => {
      let actual = Clock.getPointByDegree(90, radius, centerX, centerY);
      actual = { x: Math.round(actual.x), y: Math.round(actual.y) };
      const expected = { x: 200, y: 100 };
      expect(expected).toEqual(actual);
    });

    it('should return the correct x/y positions for 6 o\'clock ', () => {
      let actual = Clock.getPointByDegree(180, radius, centerX, centerY);
      actual = { x: Math.round(actual.x), y: Math.round(actual.y) };
      const expected = { x: 100, y: 200 };
      expect(expected).toEqual(actual);
    });

    it('should return the correct x/y positions for 9 o\'clock ', () => {
      let actual = Clock.getPointByDegree(270, radius, centerX, centerY);
      actual = { x: Math.round(actual.x), y: Math.round(actual.y) };
      const expected = { x: 0, y: 100 };
      expect(expected).toEqual(actual);
    });

    it('should return the correct x/y positions for 12 o\'clock ', () => {
      let actual = Clock.getPointByDegree(360, radius, centerX, centerY);
      actual = { x: Math.round(actual.x), y: Math.round(actual.y) };
      const expected = { x: 100, y: 0 };
      expect(expected).toEqual(actual);
    });
  });

  /* TODO - Test default themes */
  /* TODO - Test custom theming */
  /* TODO - Should do sanity check on time input */
  /* TODO - See if there is a way to test the timer being stopped on unmount */
});
