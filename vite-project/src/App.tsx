import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/header";
import Details from "./components/details";
import Details2 from "./components/details2";
import Ending from "./components/endingpage";
import ElementarySurvey from "./components/elementarysurvey";
import MiddleSurvey from "./components/middlesurvey";
import HighSurvey from "./components/highsurvey";
import blackLogo from './assets/logos/NITK_black.png'; // NITK black logo
import DetailsEntry from "./components/detailsentry";

// Developer images (replace these with actual images)
import Dev1 from './assets/devs/Anoop.jpg';
import Dev2 from './assets/devs/Shreya.jpg';
import Dev3 from './assets/devs/mehul.jpg';
import Dev4 from './assets/devs/sinchana.jpg';
import Dev5 from './assets/devs/MPS-Photo-2023.jpg';
import Dev6 from './assets/devs/GAURAV.jpg';

function App() {

  const [willReadScreen, setWillReadScreen] = useState(true);

  const [isLightMode, setLightMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'light' : true; // Default to light mode if not set
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
          <main className={`min-h-screen relative ${isLightMode ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-gray-100'}`}>
            {/* Watermark Background */}
            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-10 pointer-events-none">
              {/* Larger Logo */}
              <img src={blackLogo} alt="NITK Logo" className="w-[450px] h-[450px]" />
  
              {/* Text below the logo */}
              <div className="mt-4 text-center text-4xl font-bold text-gray-700 dark:text-gray-300">
                Cyber Security Research Laboratory
               </div>
            </div>

            {/* Main Content */}
            <Header willReadScreen={willReadScreen} setWillReadScreen={setWillReadScreen} isLightMode={isLightMode} setLightMode={toggleLightMode} />
            
            {/* Glowing Text */}
            <h1 className="text-center text-3xl font-bold mb-2 text-shadow-neon-purple">
              Cybersecurity and AI Survey Form
            </h1>
            
            {/* Description Below Title */}
            <p className="text-center text-lg mb-6 max-w-3xl mx-auto font-semibold">
            Welcome to a special activity designed just for you! In today’s world, the internet plays a huge role in our lives, from learning new things to staying connected with friends. But just like in real life, it’s important to stay safe online too! This activity will take you on a quick journey to explore how much you know about using the internet wisely and safely.

Let’s find out together what you already know about online safety and how we can help you learn even more. Your responses will help us create a safer, smarter online world for students like you!
            </p>

            <div>
              {isLightMode 
                ? <Details lang={lang} setLang={setLang} /> 
                : <Details2 lang={lang} setLang={setLang} />}
            </div>

            {/* Developer Images Animation */}
            <div className="mt-16 bg-gray-300 py-3"> {/* Background color and padding */}
  <div className="overflow-hidden">
    <div className="flex animate-slide space-x-40 pb-1"> {/* Added padding at the bottom */}
    <p className="mt-1 text-center text-lg font-semibold text-purple-700 whitespace-nowrap">
        Developed By:
      </p>
      <div className="flex flex-col items-center mx-5">
        <img 
          src={Dev2} 
          alt="Developer 2" 
          className="w-28 h-28 rounded-lg shadow-lg transition-transform duration-500 hover:scale-105 border-4 border-purple-800" 
        />
        <p className="mt-1 text-center text-lg font-semibold text-purple-700 whitespace-nowrap">
          Ms. Shreya S Rao
        </p>
        <p className="text-center text-sm text-purple-700 whitespace-nowrap">
          Intern, CSRL NITK
        </p>
      </div>
      
      <div className="flex flex-col items-center mx-5">
        <img 
          src={Dev1} 
          alt="Developer 1" 
          className="w-28 h-28 rounded-lg shadow-lg transition-transform duration-500 hover:scale-105 border-4 border-purple-800" 
        />
        <p className="mt-1 text-center text-lg font-semibold text-purple-700 whitespace-nowrap">
          Mr. Anoop S Prabhu
        </p>
        <p className="text-center text-sm text-purple-700 whitespace-nowrap">
          Intern, CSRL NITK
        </p>
      </div>

      <div className="flex flex-col items-center mx-5">
        <img 
          src={Dev3} 
          alt="Developer 3" 
          className="w-28 h-28 rounded-lg shadow-lg transition-transform duration-500 hover:scale-105 border-4 border-purple-800" 
        />
        <p className="mt-1 text-center text-lg font-semibold text-purple-700 whitespace-nowrap">
          Mr. Mehul Muralidhar Kini
        </p>
        <p className="text-center text-sm text-purple-700 whitespace-nowrap">
          Intern, CSRL NITK
        </p>
      </div>

      <div className="flex flex-col items-center mx-5">
        <img 
          src={Dev4} 
          alt="Developer 4" 
          className="w-28 h-28 rounded-lg bg-slate-400 shadow-lg transition-transform duration-500 hover:scale-105 border-4 border-purple-800" 
        />
        <p className="mt-1 text-center text-lg font-semibold text-purple-700 whitespace-nowrap">
          Ms. Sinchana N
        </p>
        <p className="text-center text-sm text-purple-700 whitespace-nowrap">
          Intern, CSRL NITK
        </p>
      </div>
      <p className="mt-1 text-center text-lg font-semibold text-purple-700 whitespace-nowrap">
        Under the Guidence of:
      </p>
      <div className="flex flex-col items-center mx-6">
        <img 
          src={Dev5} 
          alt="Developer 5" 
          className="w-28 h-28 rounded-lg shadow-lg transition-transform duration-500 hover:scale-105 border-4 border-purple-800" 
        />
        <p className="mt-1 text-center text-lg font-semibold text-purple-700 whitespace-nowrap">
          Dr. Mahendra Pratap Singh
        </p>
        <p className="text-center text-sm text-purple-700 whitespace-nowrap">
          Asst. Professor, Dept. of Computer Science & Engineering, NITK Surathkal
        </p>
      </div>

      <div className="flex flex-col items-center mx-5">
        <img 
          src={Dev6} 
          alt="Developer 6" 
          className="w-28 h-28 rounded-lg shadow-lg transition-transform duration-500 hover:scale-105 border-4 border-purple-800" 
        />
        <p className="mt-1 text-center text-lg font-semibold text-purple-700 whitespace-nowrap">
          Mr. Gaurav Pal
        </p>
        <p className="text-center text-sm text-purple-700 whitespace-nowrap">
          Project Co-ordinator, CSRL, NITK Surathkal
        </p>
      </div>
      

    </div>
  </div>
</div>



          </main>
        } />
        <Route path="/about" element={<DetailsEntry selectedlang={lang.name} willReadScreen={false} setWillReadScreen={function (): void {
          throw new Error("Function not implemented.");
        } } />} />
        <Route path="/elementarysurvey" element={<ElementarySurvey willReadScreen={willReadScreen} setWillReadScreen={function (): void {
          throw new Error("Function not implemented.");
        } } />} />
        <Route path="/middlesurvey" element={<MiddleSurvey willReadScreen={willReadScreen} setWillReadScreen={function (): void {
          throw new Error("Function not implemented.");
        } } />} />
        <Route path="/highsurvey" element={<HighSurvey willReadScreen={willReadScreen} setWillReadScreen={function (): void {
          throw new Error("Function not implemented.");
        } } />} />
        <Route path="/finish" element={<Ending />} />
      </Routes>
    </Router>
  )
}

export default App;
