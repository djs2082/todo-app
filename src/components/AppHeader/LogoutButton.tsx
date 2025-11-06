import useUserStore from "../../userStore";
import { Button } from "../ui";
import Icon from "../ui/Icon";
import { signOut as userSignout, changeTheme as changeUserTheme} from './api';

type LogoutButtonProps = {
    isMobile?: boolean;
};

const LogoutButton:React.FC<LogoutButtonProps> = ({ isMobile }) => {

    const { signOut } = useUserStore();

    const logout = async () => {
        try {
            await userSignout(
                { access_token: sessionStorage.getItem('access_token') || '' }
            );
        } catch (error) {
            console.error('Error during sign out:', error);
        }
        finally {
            signOut();
            sessionStorage.removeItem('access_token');
            window.location.href = '/';
        }
    }


    if (isMobile) {
        return <Button color="primary" variant="text" type="button" className="theme-toggle" aria-label="Toggle theme" style={{borderWidth:2, textTransform:'none', fontWeight:600}} onClick={logout}>
                    <Icon name="logout" />
                </Button>
            
        }
        return  <Button color="primary" variant="contained" type="button" className="theme-toggle" aria-label="Toggle theme" style={{borderWidth:2, textTransform:'none', fontWeight:600}} onClick={logout}>
                       Sign Out
                  </Button>
}

export default LogoutButton;
