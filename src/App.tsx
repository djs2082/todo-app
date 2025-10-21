import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TypographyThemeProvider } from '@karya_app1/rain-js';
import Home from './containers/Home';
import Activate from './containers/Activate';
import Landing from './containers/Landing';
import { ThemeProvider, useTheme } from './context/ThemeContext';
// import ResponsiveProvider from './context/ResponsiveContext';
// import ResponsiveProvider from './context/ResponsiveContext';
import { ResponsiveProvider } from '@karya_app1/rain-js';
import PageLayout from './components/ui/PageLayout';
import AppHeader from './components/AppHeader';
import TypographyTheme from './components/ui/Typography/theme'
import ToastContainer from './components/ToastContainer';
import Loader from './components/ui/Loader';
import { Upcoming } from '@mui/icons-material';
import UpdatePassword from './components/UpdatePassword';
import { fetchUser } from './api';
import { useEffect } from 'react';
import store from './userStore';

function App() {
  return (
    <BrowserRouter>
    
        <ThemeProvider>
            <ResponsiveProvider breakpoints={{ mobile: 480, tablet: 1024 }}>
              <TypographyThemeProvider theme={TypographyTheme}>
                <ToastContainer />
                <Shell />
                
              </TypographyThemeProvider>
            </ResponsiveProvider>
        </ThemeProvider>
    </BrowserRouter>
  );
}



function Shell() {
  const { theme, toggleTheme, setTheme } = useTheme();
  
  useEffect(() => {
  const { user } = store.getState();
  if (!user) return;

    const loadUser = async () => {
      const userId = user.id; 
      try {
        const userData = await fetchUser(userId);
        console.log('Fetched user data:', userData);
        // You can update your user store or state here with the fetched data
        store.setState({ user: userData });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    loadUser();
  }, []);

  return (
    <div>
    <Loader />
    <PageLayout
      contentPadding="0"
      stickyHeader={true}
      header={<AppHeader theme={theme} toggleTheme={toggleTheme} setTheme={setTheme} />}
      >
      <main className="app-main">
         <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/tasks" element={<Home />} />
            {/* Activation routes */}
            <Route path="/activate" element={<Activate />} />
            <Route path="/activate/:token" element={<Activate />} />
            <Route path="/reset-password/:token" element={<UpdatePassword />} />
          </Routes>
      </main>
    </PageLayout>
    </div>
    );
  }

export default App;
