import React from 'react';

const THEMES = {
  dark: {
    bezel: '#222222',
    face: '#333333',
    hour: '#E63946',
    minute: '#457B9D',
    second: '#A8DADC',
  },
  light: {
    bezel: '#A8DADC',
    face: '#F1FAEE',
    hour: '#1D3557',
    minute: '#457B9D',
    second: '#E63946',
  },
};

const STATUSES = {
  stopped: 'stopped',
  ticking: 'ticking',
};

class Clock extends React.Component {
  static get THEMES() {
    return THEMES;
  }

  static get STATUSES() {
    return STATUSES;
  }

  constructor(props, context) {
    super(props, context);

    // Set initial state
    let time = '00:00:00';
    if (typeof props.time !== 'undefined') {
      time = props.time;
    }

    this.state = {
      time: this.convertTimeStringToHash(time),
      status: STATUSES.stopped,
    };
  }

  componentWillMount() {
    if (typeof this.props.time === 'undefined') {
      this.setState({
        time: this.convertTimeStringToHash(this.getCurrentTimeString()),
      });
      this.startTimer();
    }
  }

  getCurrentTimeString() {
    const now = new Date();
    return [now.getHours(), now.getMinutes(), now.getSeconds()].join(':');
  }

  convertTimeStringToHash(timeString) {
    let h = 0;
    let m = 0;
    let s = 0;

    if (typeof timeString === 'string' && timeString.indexOf(':') >= 1) {
      h = parseInt(timeString.split(':')[0], 10);
      m = parseInt(timeString.split(':')[1], 10) || 0;
      s = parseInt(timeString.split(':')[2], 10) || 0;
    }

    return {
      h,
      m,
      s,
    };
  }

  startTimer() {
    this.setState({ status: STATUSES.ticking });

    const _this = this;
    this.timer = setInterval(function () {
      _this.setState({
        time: _this.convertTimeStringToHash(_this.getCurrentTimeString()),
      });
    }, 1000);
  }

  render() {
    return (
      <div>{ [this.state.time.h, this.state.time.m, this.state.time.s].join(':') }</div>
    );
  }
}

Clock.propTypes = {
  theme: React.PropTypes.object,
  radius: React.PropTypes.number,
  time: React.PropTypes.string,
};

Clock.defaultProps = {
  radius: 90,
  theme: 'mono-multi-light',
};

export default Clock;
