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

const ProjectBlockList = ({ projectsList, mobile }) =>
  _.map(projectsList, p => (
    <ProjectBlock
      img={`${config.backendAddress}/asset?file=${p.image}`}
      text={p.text}
      url={p.url}
      mobileUrl={p.mobileUrl}
      openInModal={p.openInModal}
      mobile={mobile}
      repos={p.repos}
    />
  ));

class PortfolioPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      mobile: false,
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
        {({ theme, mobile }) => (
          <div className={cn(style.portfolioPage, theme)}>
            {!mobile && <Particles params={particleParams} style={{ position: 'absolute' }} />}
            <div className={style.projects}>
              <ProjectBlockList projectsList={this.state.projectList} mobile={mobile} />
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}
export default PortfolioPage;
