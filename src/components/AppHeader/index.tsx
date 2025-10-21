import React, { useEffect } from 'react';
import { useResponsive } from '@karya_app1/rain-js';
import NavBar from '../ui/NavBar';
import Button from '../ui/Button';
import BrandLogo from '../BrandLogo';
import Icon from '../ui/Icon';
import { signOut as userSignout, changeTheme as changeUserTheme} from './api';
import useUserStore from '../../userStore';


interface AppHeaderProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    setTheme: (theme: 'light' | 'dark') => void;
}
const AppHeader: React.FC<AppHeaderProps> = ({ theme, toggleTheme, setTheme}) => {
    const { signOut, user } = useUserStore();
    const { isMobile } = useResponsive();
    const themeSetting = user?.settings?.find(s => s.key === 'theme');

    const getThemeIcon = () => {
        return theme === 'dark' ? <Icon name="sun" color="var(--main-fancy)" /> : <Icon name="moon" color="var(--main-fancy)" />;
    }

    const getThemeText = () => {
        if (isMobile) return '';
        return theme === 'dark' ? 'Light' : 'Dark';
    }

    const changeTheme = async () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        try {
            await changeUserTheme(themeSetting?.id, newTheme);
            setTheme(newTheme);
        } catch (error) {
            console.error('Error changing theme:', error);
        }
    }

    const themeIcon = () => {
        const icon = getThemeIcon();
            return (
                <Button color="secondary" variant={isMobile ? "text" : "contained"} type="button" className="theme-toggle" aria-label="Toggle theme" onClick={changeTheme} startIcon={icon} style={{ borderRadius: 24, borderWidth: 2, textTransform: 'none', fontWeight: 600 }}>
                    {getThemeText()}
                </Button>
            );
    };

    const logout = async () => {
        try {
            await userSignout(
                { access_token: sessionStorage.getItem('access_token') || '' }
            );
            signOut();
            sessionStorage.removeItem('access_token');
            window.location.href = '/';
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    }

    const logoutIcon = () => {
        if (isMobile) {
            return (
                <Button color="primary" variant="text" type="button" className="theme-toggle" aria-label="Toggle theme" style={{borderWidth:2, textTransform:'none', fontWeight:600}} onClick={logout}>
                    <Icon name="logout" />
                </Button>
            );
        }
        return  <Button color="primary" variant="contained" type="button" className="theme-toggle" aria-label="Toggle theme" style={{borderWidth:2, textTransform:'none', fontWeight:600}} onClick={logout}>
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
                {user ? <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                   {themeIcon()}
                </div> : <></>}
                <div>
                    {logoutIcon()}
                  </div>
             </>
            }
            />
    );
};
export default AppHeader;