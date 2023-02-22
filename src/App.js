import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Start from './pages/Start.jsx'
import Footer from './components/Footer.jsx'
import Game from "./pages/Game.jsx";
import Rules from './pages/Rules.jsx'
function App(){
    return(
        <>
        <Router>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/game" element={<Game />} />
            <Route path="/rules" element={<Rules />} />
          </Routes>
        </Router>
        <Footer />
        </>
    );
}
export default App;