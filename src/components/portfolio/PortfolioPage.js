import React from 'react';
import _ from 'underscore';
import axios from 'axios';
import cn from 'classnames';
import ProjectBlock from './ProjectBlock';
import style from '../../styles/portfolio.page.module.styl';
import config from '../../config';
import Particles from 'react-particles-js';
import { ThemeContext } from '../../App';
import particleParams from '../../assets/particlesConfigs/rainfall.json';

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
      .get(`${config.backendAddress}/info/projects`)
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
