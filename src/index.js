import React from 'react';

const THEMES = {
  dark: {
    bezel: '#222222',
    face: '#333333',
    hour: '#E63946',
    minute: '#457B9D',
    second: '#A8DADC',
    dot: '333333',
  },
  light: {
    bezel: '#A8DADC',
    face: '#F1FAEE',
    hour: '#1D3557',
    minute: '#457B9D',
    second: '#E63946',
    dot: '#F1FAEE',
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

  static getCurrentTimeString() {
    const now = new Date();
    return [now.getHours(), now.getMinutes(), now.getSeconds()].join(':');
  }

  static convertTimeStringToHash(timeString) {
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

  static getPointByDegree(angleInDegrees, radius, centerX, centerY) {
    const x = (radius * Math.cos((angleInDegrees - 90) * Math.PI / 180)) + centerX;
    const y = (radius * Math.sin((angleInDegrees - 90) * Math.PI / 180)) + centerY;

    return {
      x,
      y,
    };
  }

  constructor(props, context) {
    super(props, context);

    // Set initial state
    let time = '00:00:00';
    if (typeof props.time !== 'undefined') {
      time = props.time;
    }

    this.state = {
      time: Clock.convertTimeStringToHash(time),
      status: STATUSES.stopped,
    };
  }

  componentWillMount() {
    if (typeof this.props.time === 'undefined') {
      this.setState({
        time: Clock.convertTimeStringToHash(Clock.getCurrentTimeString()),
      });
      this.startTimer();
    }

    this.setState({ theme: this.findThemeById('light') });
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  findThemeById(themeId) {
    return THEMES[themeId];
  }

  startTimer() {
    this.setState({ status: STATUSES.ticking });

    const _this = this;
    this.timer = setInterval(function () {
      _this.setState({
        time: Clock.convertTimeStringToHash(Clock.getCurrentTimeString()),
      });
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = undefined;
  }

  render() {
    const { radius } = this.props;
    const { time, theme } = this.state;

    const centerX = radius * 0.5;
    const centerY = radius * 0.5;
    const strokeWidth = radius * 0.02;
    const compactRadius = radius - strokeWidth;
    // const compactDiameter = compactRadius * 0.5;

    // Calculating hours
    const hoursDegree = (time.h + time.m / 60) / 12 * 360;
    const hoursHandleSize = Math.ceil(compactRadius * 0.3);
    const hoursHandleEndPoint = Clock.getPointByDegree(
      hoursDegree, hoursHandleSize, centerX, centerY
    );
    const hoursHandleWidth = Math.ceil(compactRadius * 0.04);

    // Calculating minutes
    const minutesDegree = time.m / 60 * 360;
    const minutesHandleSize = Math.ceil(compactRadius * 0.36);
    const minutesHandleEndPoint = Clock.getPointByDegree(
      minutesDegree, minutesHandleSize, centerX, centerY
    );
    const minutesHandleWidth = Math.ceil(compactRadius * 0.03);

    // Calculating seconds
    const secondsDegree = time.s / 60 * 360;
    const secondsHandleSize = Math.ceil(compactRadius * 0.42);
    const secondsHandleEndPoint = Clock.getPointByDegree(
      secondsDegree, secondsHandleSize, centerX, centerY
    );
    const secondsHandleWidth = Math.ceil(compactRadius * 0.015);

    const dotSize = Math.ceil(compactRadius * 0.015);

    const clockStyle = {
      position: 'relative',
      width: `${radius}px`,
      height: `${radius}px`,
    };

    const { dot, face, bezel, hour, minute, second } = theme;

    return (
      <div style={ clockStyle }>
        <svg width={ radius } height={ radius } viewBox={ `0 0 ${radius} ${radius}` } xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
          <g>
            /* Bezel */
            <circle cx={ centerX } cy={ centerY } r={ radius * 0.5 } fill={ bezel } />

            /* Clock face */
            <circle cx={ centerX } cy={ centerY } r={ compactRadius * 0.5 } fill={ face } />
          </g>

          <g>
            /* Hour hand */
            <line x1={ centerX } y1={ centerY } x2={ hoursHandleEndPoint.x }
              y2={ hoursHandleEndPoint.y } strokeWidth={ hoursHandleWidth }
              strokeLinecap="round" stroke={ hour }
            />

            /* Minute hand */
            <line x1={ centerX } y1={ centerY } x2={ minutesHandleEndPoint.x }
              y2={ minutesHandleEndPoint.y } strokeWidth={ minutesHandleWidth }
              strokeLinecap="round" stroke={ minute }
            />

            /* Seconds hand */
            <line x1={ centerX } y1={ centerY } x2={ secondsHandleEndPoint.x }
              y2={ secondsHandleEndPoint.y } strokeWidth={ secondsHandleWidth }
              strokeLinecap="round" stroke={ second }
            />

            /* Middle dot */
            <circle cx={ centerX } cy={ centerY } r={ dotSize } fill={ dot } />
          </g>
        </svg>
      </div>
    );
  }
}

/* TODO - See multiple type checking */
Clock.propTypes = {
  theme: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  radius: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  time: React.PropTypes.string,
};

Clock.defaultProps = {
  radius: 90,
  theme: 'mono-multi-light',
};

export default Clock;
