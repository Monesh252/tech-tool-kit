// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home';
import ToolsPage from './pages/ToolsPage';
import Footer from './components/Footer/Footer';

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/alltools" element={<ToolsPage />} />
                    <Route path="/merge" element={<ToolsPage tool="merge" />} />
                    <Route path="/split" element={<ToolsPage tool="split" />} />
                    <Route path="/pdf-to-markdown" element={<ToolsPage tool="markdown" />} />
                    <Route path="/compress" element={<ToolsPage tool="compress" />} />
                    <Route path="/pdf-to-word" element={<ToolsPage tool="word" />} />
                    <Route path="/pdf-to-csv" element={<ToolsPage tool="csv" />} />
                    <Route path="/pdf-to-jpg" element={<ToolsPage tool="jpg" />} />
                    <Route path="/reorder" element={<ToolsPage tool="reorder" />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
