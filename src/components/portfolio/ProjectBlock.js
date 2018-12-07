import React from 'react';
import { string, bool } from 'prop-types';
import Fullscreen from 'react-full-screen';
import Iframe from 'react-iframe';
import style from '../../styles/project.block.module.styl';

class ProjectBlock extends React.Component {
  static propTypes = {
    img: string.isRequired,
    text: string.isRequired,
    url: string.isRequired,
    allowFullScreen: bool,
  };

  static defaultProps = {
    allowFullScreen: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      isFull: false,
    };
  }

  renderFullScreen = () => {
    const display = this.state.isFull ? 'initial' : 'none';
    return (
      <Fullscreen enabled={this.state.isFull} onChange={isFull => this.setState({ isFull })}>
        <Iframe url={this.props.url} display={display} allowFullScreen />
      </Fullscreen>
    );
  };

  render() {
    const { img, text, url, allowFullScreen } = this.props;

    let projectButton;

    if (allowFullScreen) {
      projectButton = (
        <button onClick={() => this.setState({ isFull: true })}>Open FullScreen</button>
      );
    } else {
      projectButton = (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <button>Go to website</button>
        </a>
      );
    }

    return (
      <div className={style.projectBlock}>
        <img src={img} />
        <div>
          <p>{text}</p>
          {projectButton}
        </div>
        {this.props.allowFullScreen && this.renderFullScreen()}
      </div>
    );
  }
}

export default ProjectBlock;
