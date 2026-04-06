import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './App.scss';
import Header from './comp/Header';
import Footer from './comp/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Package from './pages/Package';
import Web from './pages/Web';
import Etc from './pages/Etc';
import Ui from './pages/Ui';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/package" element={<Package />} />
          <Route path="/web" element={<Web />} />
          <Route path="/etc" element={<Etc />} />
          <Route path="/ui" element={<Ui />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
