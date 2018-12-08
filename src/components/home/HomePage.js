import React from 'react';
import cn from 'classnames';
import Particles from 'react-particles-js';
import style from '../../styles/home.page.module.styl';
import { ThemeContext } from '../../App';

const particlesParams = {
  fps_limit: 28,
  particles: {
    number: {
      value: 200,
      density: {
        enable: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 30,
      opacity: 0.4,
    },
    move: {
      speed: 1,
    },
    opacity: {
      anim: {
        enable: true,
        opacity_min: 0.05,
        speed: 2,
        sync: false,
      },
      value: 0.4,
    },
  },
  polygon: {
    enable: true,
    scale: 0.5,
    type: 'inline',
    move: {
      radius: 10,
    },
    url: 'images/small-deer.svg',
    inline: {
      arrangement: 'equidistant',
    },
    draw: {
      enable: true,
      stroke: {
        color: 'rgba(255, 255, 255, .2)',
      },
    },
  },
  retina_detect: false,
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'bubble',
      },
    },
    modes: {
      bubble: {
        size: 6,
        distance: 40,
      },
    },
  },
};

class HomePage extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <ThemeContext.Consumer>
        {value => (
          <div className={cn(style.homePage, value)}>
            <Particles params={particlesParams} />
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default HomePage;
