import React from 'react';
import { string, bool, arrayOf } from 'prop-types';
import Iframe from 'react-iframe';
import Modal from 'react-modal';
import cn from 'classnames';
import _ from 'underscore';
import githubIcon from '../../assets/githubLogo.png';
import style from '../../styles/project.block.module.styl';
import { ThemeContext } from '../../App';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '80%',
    height: '80%',
    padding: '0',
    overflow: 'hidden',
    transform: 'translate(-50%, -50%)',
    background: 'transparent',
  },
  img: {
    height: '100%',
  },
};

class ProjectBlock extends React.Component {
  static propTypes = {
    img: string.isRequired,
    text: string.isRequired,
    url: string.isRequired,
    mobileUrl: string,
    openInModal: bool,
    mobile: bool,
    repos: arrayOf(string),
  };

  static defaultProps = {
    openInModal: false,
    repos: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
    };
  }

  renderModal = () => {
    const url =
      this.props.mobile && Boolean(this.props.mobileUrl) ? this.props.mobileUrl : this.props.url;
    return (
      <Modal isOpen={this.state.openModal} style={modalStyles}>
        <div className={style.modal}>
          <Iframe url={url} allowFullScreen />
          <button
            type="button"
            aria-label="Close"
            className={cn('close', style.modalBtn)}
            onClick={() => this.setState({ openModal: false })}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </Modal>
    );
  };

  render() {
    const { img, text, url, openInModal, repos } = this.props;

    let projectButton;

    if (openInModal) {
      projectButton = (
        <button onClick={() => this.setState({ openModal: true })}>Open Modal</button>
      );
    } else {
      projectButton = (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <button>Visit the website</button>
        </a>
      );
    }

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div className={cn(style.projectBlock, theme)}>
            <img src={img} />
            <div>
              <div dangerouslySetInnerHTML={{ __html: text }} />
              <div className={style.projectAttachments}>
                {_.map(repos, repo => (
                  <a
                    href={repo}
                    className={style.githubIcon}
                    src={githubIcon}
                    target="_blank"
                    rel="noopener noreferrer">
                    <img src={githubIcon} />
                  </a>
                ))}
                {this.props.mobile && this.props.mobileUrl && (
                  <p style={{ color: 'red', fontSize: 14 }}>
                    360 tours not working well on mobiles yet, will be open demo, for full version
                    try on higher resolution{' '}
                  </p>
                )}
                {projectButton}

                {this.props.openInModal && this.renderModal()}
              </div>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default ProjectBlock;
