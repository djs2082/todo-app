import { Icon } from "@karya_app1/rain-js";
import { THEME } from "../../constants";
import { changeTheme as changeUserTheme } from "./api";
import { Button } from "../ui";
import useUserStore from "../../userStore";
import { makeNoun } from "../../utils";
import { type Theme } from './../../context/model';

type ThemeButtonProps = {
    isMobile: boolean;
    theme: Theme;
    setTheme: (theme: Theme) => void;
};



const ThemeButton: React.FC<ThemeButtonProps> = ({ isMobile, theme, setTheme }) => {
    
    const { user } = useUserStore();
    if (!user) return null;

    const themeSetting = user.settings?.find(s => s.key === 'theme');
    if(!themeSetting) return null;

    const getThemeText = () => {
        if (isMobile) return '';
        return theme === THEME.DARK ? makeNoun(THEME.LIGHT) : makeNoun(THEME.DARK);
    }

    const changeTheme = async () => {
        const newTheme = (theme === THEME.DARK ? THEME.LIGHT : THEME.DARK) as Theme;
        try {
            await changeUserTheme(themeSetting.id, newTheme);
            setTheme(newTheme);
        } catch (error) {
            console.error('Error changing theme:', error);
        }
    }

    const icon = <Icon name={theme === THEME.DARK ? 'sun' : 'moon'} color="var(--main-fancy)" />;
    
    return (
        <Button color="secondary" variant={isMobile ? "text" : "contained"} type="button" className="theme-toggle" aria-label="Toggle theme" onClick={changeTheme} startIcon={icon} style={{ borderRadius: 24, borderWidth: 2, textTransform: 'none', fontWeight: 600 }}>
            {getThemeText()}
        </Button>);
};

export default ThemeButton;