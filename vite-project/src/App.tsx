import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/header";
import Details from "./components/details";
import Ending from "./components/endingpage";
import ElementarySurvey from "./components/elementarysurvey";
import MiddleSurvey from "./components/middlesurvey";
import HighSurvey from "./components/highsurvey";

function App() {

  const [willReadScreen, setWillReadScreen] = useState(false);

  const [isLightMode, setLightMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme? savedTheme === 'light' : false;
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
          <Route path="/elementarysurvey" element={<ElementarySurvey willReadScreen={willReadScreen} />} />
          <Route path="/middlesurvey" element={<MiddleSurvey willReadScreen={willReadScreen} />} />
          <Route path="/highsurvey" element={<HighSurvey willReadScreen={willReadScreen} />} />
          <Route path="/finish" element={<Ending />} />
        </Routes>
    </Router>
  )
}

export default App