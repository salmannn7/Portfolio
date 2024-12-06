import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './css/App.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './components/Home.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Header className="z-50" />
        <main className="z-0">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;