// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ToolsPage from './pages/ToolsPage';
import Footer from './components/Footer';
import Completed from "./pages/completed";

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
                    <Route path="/delete-pages" element={<ToolsPage tool="delete" />} />
                    <Route path="/rotate" element={<ToolsPage tool="rotate" />} />
                    <Route path="/watermark" element={<ToolsPage tool="watermark" />} />
                    <Route path="/protect" element={<ToolsPage tool="protect" />} />
                    <Route path="/page-numbers" element={<ToolsPage tool="pageNumbers" />} />
                    <Route path="/unlock" element={<ToolsPage tool="unlock" />} />
                    <Route path="/extract-images" element={<ToolsPage tool="extractImages" />} />
                    <Route path="/extract-text" element={<ToolsPage tool="extractText" />} />
                    <Route path="/html-to-pdf" element={<ToolsPage tool="htmlToPdf" />} />
                    <Route path="/url-to-pdf" element={<ToolsPage tool="urlToPdf" />} />
                    <Route path="/completed" element={<Completed />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
