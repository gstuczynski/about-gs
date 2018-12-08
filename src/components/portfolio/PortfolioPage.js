import React from 'react';
import _ from 'underscore';
import axios from 'axios';
import cn from 'classnames';
import ProjectBlock from './ProjectBlock';
import style from '../../styles/portfolio.page.module.styl';
import config from '../../config';
import Particles from 'react-particles-js';
import { ThemeContext } from '../../App';

const particleParams = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        speed: 4,
        size_min: 0.3,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      random: true,
      speed: 1,
      direction: 'top',
      out_mode: 'out',
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'bubble',
      },
      onclick: {
        enable: true,
        mode: 'repulse',
      },
    },
    modes: {
      bubble: {
        distance: 250,
        duration: 2,
        size: 0,
        opacity: 0,
      },
      repulse: {
        distance: 400,
        duration: 4,
      },
    },
  },
};

const ProjectBlockList = ({ projectsList }) =>
  _.map(projectsList, p => (
    <ProjectBlock
      img={`${config.backendAddress}/asset?file=${p.image}`}
      text={p.text}
      url={p.url}
      openInModal={p.openInModal}
    />
  ));

class PortfolioPage extends React.Component {
  constructor() {
    super();
    this.state = {
      projectList: [],
    };
  }

  componentDidMount() {
    return axios
      .get(`${config.backendAddress}/about-projects`)
      .then(response => {
        this.setState({ projectList: response.data });
      })
      .catch(() => {
        this.setState({ isError: true });
      });
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => (
          <div className={cn(style.portfolioPage, value)}>
            <Particles params={particleParams} style={{ position: 'absolute' }} />
            <ProjectBlockList projectsList={this.state.projectList} />
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}
export default PortfolioPage;
