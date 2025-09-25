import React from 'react';
import { NavBar as RainNavBar, NavBarThemeProvider, NavBarProps as RainNavBarProps, NavLinkItem } from '@karya_app1/rain-js';
import theme from './theme'

const NavBar: React.FC<RainNavBarProps> = (props) => {
    const navLinks: NavLinkItem[] | undefined = props.links;
  return (
    <NavBarThemeProvider theme={theme}>
      <RainNavBar {...props} links={navLinks} />
    </NavBarThemeProvider>
  );
};

export default NavBar;
