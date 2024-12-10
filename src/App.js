import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './css/App.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import FooterMobile from './components/FooterMobile.js';
import Home from './components/Home.js';
import HomeMobile from './components/HomeMobile.js';
import Test from './components/Test.js'

function App() {
  const [isMobileView, setIsMobileView] = useState(window.innerHeight > window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerHeight > window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router basename="/Portfolio">
      <div className="App">
        {!isMobileView && <Header className="z-50" />}
        <main className="z-0">
          <Routes>
            <Route path="/" element={isMobileView ? <HomeMobile /> : <Home />} />
            <Route path="/Test" element={<Test />} />
          </Routes>
        </main>
        {!isMobileView && <Footer />}
        {isMobileView && <FooterMobile />}
      </div>
    </Router>
  );
}

export default App;
