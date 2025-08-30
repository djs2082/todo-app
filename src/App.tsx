import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './containers/Home';
import logo from './images/logo.png'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="app-header">
          <div className="max-w-4xl mx-auto">
            <div className="app-brand">
              <div className="app-logo" aria-hidden="true">
                {/* Place your logo file in the project's public/ folder as 'karya-logo.png' */}
                <img src={logo} alt="Karya logo" className="app-logo-img" />
              </div>
              <h1 className="app-title">KARYA <span className="app-sub">App</span></h1>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
