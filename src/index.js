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

const DEFAULT_THEME_ID = 'dark';
const DEFAULT_THEME = THEMES[DEFAULT_THEME_ID];

const STATUSES = {
  stopped: 'stopped',
  ticking: 'ticking',
};

class Clock extends React.Component {
  static get THEMES() {
    return THEMES;
  }

  static get DEFAULT_THEME() {
    return DEFAULT_THEME;
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

  static configureTheme(userOpt) {
    let theme = DEFAULT_THEME;

    if (typeof userOpt === 'string' && THEMES[userOpt]) {
      theme = THEMES[userOpt];
    } else if (typeof userOpt === 'object') {
      theme = {
        ...theme,
        ...userOpt,
      };
    }

    return theme;
  }

  constructor(props, context) {
    super(props, context);

    const theme = Clock.configureTheme(props.theme);
    const status = STATUSES.stopped;
    const time = props.time ? Clock.convertTimeStringToHash(props.time) :
    Clock.convertTimeStringToHash(Clock.getCurrentTimeString());

    // Set initial state
    this.state = {
      time,
      status,
      theme,
    };
  }

  componentWillMount() {
    if (typeof this.props.time === 'undefined') {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
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
            /* Clock face */
            <circle cx={ centerX } cy={ centerY } r={ compactRadius * 0.5 } fill={ face }
              strokeWidth={ strokeWidth } stroke={ bezel }
            />
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
  theme: DEFAULT_THEME_ID,
};

export default Clock;
