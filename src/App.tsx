import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './containers/Home';
import Landing from './containers/Landing';
import logo from './images/logo.png'
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <BrowserRouter>
        <div className={`app-shell min-h-screen ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
        <header className="app-header">
          <div className="max-w-4xl mx-auto">
            <div className="app-header-row">
              <div className="app-brand">
                <div className="app-logo" aria-hidden="true">
                  {/* Place your logo file in the project's public/ folder as 'karya-logo.png' */}
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

        <main className="app-main max-w-4xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </main>
        </div>
    </BrowserRouter>
  );
}

export default App;
