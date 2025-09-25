import React from 'react';
import NavBar from '../ui/NavBar';
import Button from '../ui/Button';
import logo from '../../images/logo.png';
import BrandLogo from '../BrandLogo';


interface AppHeaderProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}
const AppHeader: React.FC<AppHeaderProps> = ({ theme, toggleTheme }) => {
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
                // <div className="app-actions">
                  <Button color="secondary" variant="outlined" type="button" className="theme-toggle" aria-label="Toggle theme" onClick={toggleTheme} style={{borderRadius: 24, borderWidth:2, textTransform:'none', fontWeight:600}}>
                    {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
                  </Button>
                // </div>
            }
            />
    );
};
export default AppHeader;