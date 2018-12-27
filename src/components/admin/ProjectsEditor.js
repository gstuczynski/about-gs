import React from 'react';
import _ from 'underscore';
import axios from 'axios';
import SingleProjectEditor from './SingleProjectEditor';
import config from '../../config';

const ProjectList = ({ projectsList }) =>
  _.map(projectsList, p => (
    <SingleProjectEditor
      image={`${config.backendAddress}/asset?file=${p.image}`}
      text={p.text}
      url={p.url}
      openInModal={p.openInModal}
      id={p._id}
      mobileUrl={p.mobileUrl}
    />
  ));

class ProjectsEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      projectList: [],
      isError: false,
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
      <div>
        <ProjectList projectsList={this.state.projectList} />
      </div>
    );
  }
}
export default ProjectsEditor;
