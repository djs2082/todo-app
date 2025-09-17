import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './containers/Home';
import Landing from './containers/Landing';
import { ToastProvider } from './components/ui';
import logo from './images/logo.png'
import { ThemeProvider, useTheme } from './context/ThemeContext';

const pathsToExcludeHeader:string[] = []

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <Shell />
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

function Shell() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const hideHeader = pathsToExcludeHeader.includes(location.pathname)
  return (
    <div className={`app-shell min-h-screen ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
      {!hideHeader && (
          <header className="app-header">
            <div className="max-w-4xl mx-auto">
              <div className="app-header-row">
                <div className="app-brand">
                  <div className="app-logo" aria-hidden="true">
                    <img src={logo} alt="Karya logo" className="app-logo-img" />
                  </div>
                  <h1 className="app-title">KARYA <span className="app-sub">App</span></h1>
                </div>
                <div className="app-actions">
                  <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                    {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
                  </button>
                </div>
              </div>
            </div>
          </header>
        )}

        <main className="app-main max-w-4xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/tasks" element={<Home />} />
          </Routes>
        </main>
      </div>
    );
  }

export default App;
