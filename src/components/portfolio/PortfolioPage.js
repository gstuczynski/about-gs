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
    this.updateWindowDimensions();
    console.log(this.state);
    window.addEventListener('resize', this.updateWindowDimensions);
    return axios
      .get(`${config.backendAddress}/info/projects`)
      .then(response => {
        this.setState({ projectList: response.data });
      })
      .catch(() => {
        this.setState({ isError: true });
      });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ mobile: window.innerWidth < 700 });
  };

  render() {
    return (
      <ThemeContext.Consumer>
        {value => (
          <div className={cn(style.portfolioPage, value)}>
            <Particles params={particleParams} style={{ position: 'absolute' }} />
            <div className={style.projects}>
              <ProjectBlockList projectsList={this.state.projectList} mobile={this.state.mobile} />
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}
export default PortfolioPage;
