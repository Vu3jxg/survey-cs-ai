import { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/header";
import Details from "./components/details";
import Ending from "./components/endingpage";

function App() {

  const [willReadScreen, setWillReadScreen] = useState(false);

  const [isLightMode, setLightMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Default to dark mode if no preference is saved and system prefers dark mode
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [lang, setLang] = useState({
    isSet: false,
    name: '',
  });

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLightMode]);

  const toggleLightMode = () => {
    setLightMode(prevMode => !prevMode);
  };

  return (
    <Router>
        <Routes>
          <Route path="/" element={
		        <main className={`min-h-screen ${isLightMode ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-gray-100'}`}>
              <Header willReadScreen={willReadScreen} setWillReadScreen={setWillReadScreen} isLightMode={isLightMode} setLightMode={toggleLightMode}/>
              <h1 className="text-center text-3xl font-bold mb-6">Cybersecurity and AI Survey Form</h1>
              <div>
                 <Details lang={lang} setLang={setLang}/>
              </div>
            </main>
		      } />
          <Route path="/finish" element={<Ending />} />
        </Routes>
    </Router>
  )
}

export default App