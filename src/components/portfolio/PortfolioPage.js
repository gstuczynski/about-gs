import React from 'react';
import _ from 'underscore';
import axios from 'axios';
import ProjectBlock from './ProjectBlock';
import style from '../../styles/portfolio.page.module.styl';
import config from '../../config';

const ProjectBlockList = ({ projectsList }) =>
  _.map(projectsList, p => (
    <ProjectBlock
      img={`${config.backendAddress}/asset?file=${p.image}`}
      text={p.text}
      url={p.url}
      allowFullScreen={p.fullScreen}
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
      <div className={style.portfolioPage}>
        <ProjectBlockList projectsList={this.state.projectList} />
      </div>
    );
  }
}
export default PortfolioPage;
