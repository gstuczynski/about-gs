import React from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import cn from 'classnames';
import { Link as RRNavLink } from 'react-router-dom';
import style from '../styles/header.module.styl';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleDrop = this.toggleDrop.bind(this);
    this.onScroll = this.onScroll.bind(this);

    this.state = {
      isNavOpen: false,
      isDropFeaturesOpen: false,
      isDropResourcesOpen: false,
      isDropProductOpen: false,
      isScrollingUp: true,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.previousPos = window.pageYOffset;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    const currentPos = window.pageYOffset;
    if (this.previousPos > currentPos || this.previousPos < 0) {
      this.setState({ isScrollingUp: true });
    } else {
      this.setState({ isScrollingUp: false });
    }
    this.previousPos = currentPos;
  }

  toggleNav() {
    const { isNavOpen } = this.state;
    this.setState({
      isNavOpen: !isNavOpen,
    });
  }

  toggleDrop(menu) {
    const currentState = this.state[menu];
    this.setState({
      [menu]: !currentState,
    });
  }

  render() {
    const { isScrollingUp } = this.state;
    const headerStyle = {
      top: isScrollingUp ? 0 : -150,
    };
    return (
      <Navbar light expand="md" className={style.header} style={headerStyle}>
        <NavbarToggler onClick={this.toggleNav} />
        <Collapse
          isOpen={this.state.isNavOpen}
          className={style.collapse}
          navbar
          // Without these props set to false, component won't collapse properly
          enter={false}
          exit={false}>
          <Nav className={style.navigation} navbar>
            <NavItem>
              <NavLink href="/licences/">licences</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/about" activeClassName="active" tag={RRNavLink}>
                About
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
