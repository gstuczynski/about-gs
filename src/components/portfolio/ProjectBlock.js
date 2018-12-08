import React from 'react';
import { string, bool } from 'prop-types';
import Iframe from 'react-iframe';
import Modal from 'react-modal';
import cn from 'classnames';
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
  },
};

class ProjectBlock extends React.Component {
  static propTypes = {
    img: string.isRequired,
    text: string.isRequired,
    url: string.isRequired,
    openInModal: bool,
  };

  static defaultProps = {
    openInModal: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
    };
  }

  renderModal = () => {
    return (
      <Modal isOpen={this.state.openModal} style={modalStyles}>
        <div className={style.modal}>
          <Iframe url={this.props.url} allowFullScreen />
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
    const { img, text, url, openInModal } = this.props;

    let projectButton;

    if (openInModal) {
      projectButton = (
        <button onClick={() => this.setState({ openModal: true })}>Open FullScreen</button>
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
        {value => (
          <div className={cn(style.projectBlock, value)}>
            <img src={img} />
            <div>
              <div dangerouslySetInnerHTML={{ __html: text }} />
              <div className={style.projectAttachments}>
                {projectButton}
                {this.props.openInModal && this.renderModal()}
                <a
                  className={style.githubIcon}
                  src={githubIcon}
                  target="_blank"
                  rel="noopener noreferrer">
                  <img src={githubIcon} />
                </a>
              </div>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default ProjectBlock;
