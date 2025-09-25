import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './containers/Home';
import Landing from './containers/Landing';
import { ToastProvider } from './components/ui';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import PageLayout from './components/ui/PageLayout';
import AppHeader from './components/AppHeader';

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
