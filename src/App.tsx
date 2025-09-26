import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Typography, { TypographyThemeProvider } from '@karya_app1/rain-js';
import Home from './containers/Home';
import Landing from './containers/Landing';
import { ToastProvider } from './components/ui';
import { ThemeProvider, useTheme } from './context/ThemeContext';
// import ResponsiveProvider from './context/ResponsiveContext';
// import ResponsiveProvider from './context/ResponsiveContext';
import { ResponsiveProvider } from '@karya_app1/rain-js';
import PageLayout from './components/ui/PageLayout';
import AppHeader from './components/AppHeader';
import TypographyTheme from './components/ui/Typography/theme'

function App() {
  return (
    <BrowserRouter>
    
        <ThemeProvider>
            <ResponsiveProvider breakpoints={{ mobile: 480, tablet: 1024 }}>
              <TypographyThemeProvider theme={TypographyTheme}>
                <ToastProvider>
                  <Shell />
                </ToastProvider>
              </TypographyThemeProvider>
            </ResponsiveProvider>
        </ThemeProvider>
    </BrowserRouter>
  );
}

function Shell() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
    <PageLayout
      contentPadding="0"
      stickyHeader={true}
      header={<AppHeader theme={theme} toggleTheme={toggleTheme} />}
      >
      <main className="app-main">
         <Routes>
            <Route path="/" element={<Landing />} />
           <Route path="/home" element={<Home />} />
            <Route path="/tasks" element={<Home />} />
          </Routes>
      </main>
    </PageLayout>
    </div>
    );
  }

export default App;
