import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './containers/Home';

function About() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">About</h2>
      <p className="mt-2 text-sm text-gray-600">Simple todo app demo with React Router.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-4xl mx-auto p-4 flex items-center gap-4">
            <Link to="/" className="font-bold text-lg">TodoApp</Link>
            <nav className="ml-auto flex gap-4">
              <Link to="/" className="text-sm text-gray-600 hover:underline">Home</Link>
              <Link to="/about" className="text-sm text-gray-600 hover:underline">About</Link>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
