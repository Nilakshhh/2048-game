import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Start from './pages/Start.jsx'
import Footer from './components/Footer.jsx'
function App(){
    return(
        <>
        <Router>
          <Routes>
            <Route path="/" element={<Start />} />
          </Routes>
        </Router>
        <Footer />
        </>
    );
}
export default App;