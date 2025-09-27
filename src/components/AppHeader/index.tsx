import React from 'react';
import { useResponsive } from '@karya_app1/rain-js';
import NavBar from '../ui/NavBar';
import Button from '../ui/Button';
import BrandLogo from '../BrandLogo';
import Icon from '../ui/Icon';


interface AppHeaderProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}
const AppHeader: React.FC<AppHeaderProps> = ({ theme, toggleTheme }) => {
    const { isMobile } = useResponsive();


    const getThemeIcon = () => {
        return theme === 'dark' ? <Icon name="sun" color="var(--main-fancy)" /> : <Icon name="moon" color="var(--main-fancy)" />;
    }

    const getThemeText = () => {
        if (isMobile) return '';
        return theme === 'dark' ? 'Light' : 'Dark';
    }

    const themeIcon = () => {
        const icon = getThemeIcon();
            return (
                <Button color="secondary" variant={isMobile ? "text" : "contained"} type="button" className="theme-toggle" aria-label="Toggle theme" onClick={toggleTheme} startIcon={icon} style={{ borderRadius: 24, borderWidth: 2, textTransform: 'none', fontWeight: 600 }}>
                    {getThemeText()}
                </Button>
            );
    };

    const logoutIcon = () => {
        if (isMobile) {
            return (
                <Button color="primary" variant="text" type="button" className="theme-toggle" aria-label="Toggle theme" style={{borderWidth:2, textTransform:'none', fontWeight:600}}>
                    <Icon name="logout" />
                </Button>
            );
        }
        return  <Button color="primary" variant="contained" type="button" className="theme-toggle" aria-label="Toggle theme" style={{borderWidth:2, textTransform:'none', fontWeight:600}}>
                       Sign Out
                  </Button>
    }

    return (
    <NavBar
        sticky
        brand={<BrandLogo />}
        collapseAt={576}
        links={[
        ]}
            right={
                <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                   {themeIcon()}
                </div>
                <div>
                    {logoutIcon()}
                  </div>
             </>
            }
            />
    );
};
export default AppHeader;