import React from 'react';

const Clock = React.createClass({
  getDefaultProps: () => {
    return {
      radius: 120,
      theme: 'mono-multi-light'
    }
  },

  getInitialState: function() {
		return {
			time: {h: 0, m: 0, s: 0},
			timerStatus: 'stopped'
		};
	},

  componentWillMount: function() {
    this.setState({
      time: this.getCurrentTime()
    });
    this.startTimer();
  },

  componentWillUnmount: function() {
    this.stopTimer();
  },

  getCurrentTime: function() {
    return this.getTimeFragments(new Date());
  },

  getTimeFragments: (date) => {
    let now = date;
    let h = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    return {
      h: h,
      m: m,
      s: s
    };
  },

  getPointByDegree: (angleInDegrees, radius, centerX, centerY) => {
    let x = (radius * Math.cos((angleInDegrees - 90) * Math.PI / 180)) + centerX;
    let y = (radius * Math.sin((angleInDegrees - 90) * Math.PI / 180)) + centerY

    return {
      x: x,
      y: y
    }
  },

  startTimer: function() {
    var _this = this;
    this.timer = setInterval(function() {
      let time = _this.getCurrentTime();

      _this.setState({
        time: time
      });

    }, 500);
  },

  stopTimer: function() {
    clearInterval(this.timer);
  },

  getThemes: function(themeId) {
    var themes = {
      'dark': {
        bezel: '#222222',
        face: '#333333',
        hour: '#E63946',
        minute: '#457B9D',
        second: '#A8DADC'
      },
      'light': {
        bezel: '#A8DADC',
        face: '#F1FAEE',
        hour: '#1D3557',
        minute: '#457B9D',
        second: '#E63946'
      },
      'mono-dark': {
        bezel: '#000000',
        face: '#000000',
        hour: '#FFFFFF',
        minute: '#FFFFFF',
        second: '#FFFFFF'
      },
      'mono-multi-dark': {
        bezel: '#000000',
        face: '#000000',
        hour: 'rgba(255, 255, 255, 1)',
        minute: 'rgba(255, 255, 255, 0.7)',
        second: 'rgba(255, 255, 255, 0.4)'
      },
      'mono-multi-light': {
        bezel: 'rgba(0, 0, 0, 0.1)',
        face: '#FFFFFF',
        hour: 'rgba(0, 0, 0, 1)',
        minute: 'rgba(0, 0, 0, 0.7)',
        second: 'rgba(0, 0, 0, 0.4)'
      },
      'playground': {
        bezel: '#2EC4B6',
        face: '#FDFFFC',
        hour: '#FF9F1C',
        minute: '#011627',
        second: '#E71D36'
      },
      'mono-navi': {
        bezel: '#2EC4B6',
        face: '#011627',
        hour: '#E71D36',
        minute: '#FFFFFF',
        second: '#2EC4B6'
      }
    }

    let theme = themes.light;

    if(typeof themeId !== 'string') {
      theme = {
        ...theme,
        ...themeId
      }
    } else {
      theme = themes[themeId];
    }
    
    return theme;
  },

  render: function() {
    let {radius, theme} = this.props;
    let {time} = this.state;
    let strokeWidth = radius * 0.02;
    let compactRadius = radius - strokeWidth;
    let compactDiameter = compactRadius * 0.5;
    let centerX = radius * 0.5;
    let centerY = radius * 0.5;

    let {face, bezel, hour, minute, second} = this.getThemes(theme);

    // Calculating hours
    let hoursDegree = (time.h + time.m / 60)/ 12 * 360;
    let hoursHandleSize = Math.ceil(compactRadius * 0.3);
    let hoursHandleEndPoint = this.getPointByDegree(hoursDegree, hoursHandleSize, centerX, centerY);
    let hoursHandleWidth = Math.ceil(compactRadius * 0.04);

    // Calculating minutes
    let minutesDegree = time.m / 60 * 360;
    let minutesHandleSize = Math.ceil(compactRadius * 0.36);
    let minutesHandleEndPoint = this.getPointByDegree(minutesDegree, minutesHandleSize, centerX, centerY);
    let minutesHandleWidth = Math.ceil(compactRadius * 0.03);

    // Calculating seconds
    let secondsDegree = time.s / 60 * 360;
    let secondsHandleSize = Math.ceil(compactRadius * 0.42);
    let secondsHandleEndPoint = this.getPointByDegree(secondsDegree, secondsHandleSize, centerX, centerY);
    let secondsHandleWidth = Math.ceil(compactRadius * 0.015);

    let dotSize = Math.ceil(compactRadius * 0.015);

    const clockStyle = {
      position: 'relative',
      width: radius + 'px',
      height: radius + 'px'
    };

    return (
      <div className="clock" style={clockStyle}>
        <svg width={radius} height={radius} viewBox={"0 0 " + radius + " " + radius} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
          <g>
            /* Bezel */
            <circle cx={centerX} cy={centerY} r={radius * 0.5} fill={bezel} />

            /* Clock face */
            <circle cx={centerX} cy={centerY} r={compactRadius * 0.5} fill={face} />
          </g>
          <g>
            /* Hour hand */
            <line x1={centerX} y1={centerY} x2={hoursHandleEndPoint.x} y2={hoursHandleEndPoint.y} strokeWidth={hoursHandleWidth} strokeLinecap="round" stroke={hour} />

            /* Minute hand */
            <line x1={centerX} y1={centerY} x2={minutesHandleEndPoint.x} y2={minutesHandleEndPoint.y} strokeWidth={minutesHandleWidth} strokeLinecap="round" stroke={minute}/>

            /* Seconds hand */
            <line x1={centerX} y1={centerY} x2={secondsHandleEndPoint.x} y2={secondsHandleEndPoint.y} strokeWidth={secondsHandleWidth} strokeLinecap="round" stroke={second}/>

            /* Middle dot */
            <circle cx={centerX} cy={centerY} r={dotSize} fill={face}/>
          </g>
        </svg>
      </div>
    );
  }
});

export default Clock;
