import React from 'react';
import { useResponsive } from '@karya_app1/rain-js';
import NavBar from '../ui/NavBar';
import Button from '../ui/Button';
import BrandLogo from '../BrandLogo';


interface AppHeaderProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}
const AppHeader: React.FC<AppHeaderProps> = ({ theme, toggleTheme }) => {
    const { isMobile } = useResponsive();

    return (
    <NavBar
        sticky
        brand={<BrandLogo />}
        collapseAt={576}
        links={[
            { key: 'home', label: 'Home', href: '#' },
            { key: 'tasks', label: 'Tasks', href: '#tasks' },
            { key: 'about', label: 'About', href: '#about' },
        ]}
            right={
                <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Button color="secondary" variant="text" type="button" className="theme-toggle" aria-label="Toggle theme" onClick={toggleTheme} style={{ borderRadius: 24, borderWidth: 2, textTransform: 'none', fontWeight: 600 }}>
                        {theme === 'dark' ? `☀️ ${isMobile ? '' : 'Light'}` : `🌙 ${isMobile ? '' : 'Dark'}`}
                    </Button>
                </div>
                <div>
                    <Button color="primary" variant="contained" type="button" className="theme-toggle" aria-label="Toggle theme" style={{borderWidth:2, textTransform:'none', fontWeight:600}}>
                        Sign Out
                  </Button>
                  </div>
             </>
            }
            />
    );
};
export default AppHeader;