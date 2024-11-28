import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/header";
import Details from "./components/details";
import Ending from "./components/endingpage";
import ElementarySurvey from "./components/elementarysurvey";
import MiddleSurvey from "./components/middlesurvey";
import HighSurvey from "./components/highsurvey";
import blackLogo from './assets/logos/NITK_black.png'; // NITK black logo
import DetailsEntry from "./components/detailsentry";
import FundedLogo from './assets/logos/NCSTC.jpg'; // Update with actual path
import VisitCounter from './components/visitorCount';

// Developer images (replace these with actual images)
import Dev1 from './assets/devs/Anoop.jpg'; // Update with actual paths
import Dev2 from './assets/devs/Shreya.jpg';
import Dev3 from './assets/devs/mehul.jpg';
import Dev5 from './assets/devs/MPS-Photo-2023.jpg';
import Dev6 from './assets/devs/Pais.jpg';
import Dev7 from './assets/devs/GAURAV.jpg';

const App = () => {
  const [willReadScreen] = useState(true);
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
      <Route
        path="/"
        element={
          <main
            className={`min-h-screen relative overflow-x-hidden ${
              isLightMode ? "bg-gray-100 text-gray-900" : "bg-gray-900 text-gray-100"
            }`}
          >
            {/* Watermark Background */}
            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-15 pointer-events-none">
              <img src={blackLogo} alt="NITK Logo" className="w-[450px] h-[450px]" />
              <div className="mt-4 text-center text-4xl font-bold text-gray-700 dark:text-gray-400">
                Cyber Security Research Laboratory
              </div>
            </div>
            <Header
              // willReadScreen={willReadScreen}
              // setWillReadScreen={setWillReadScreen}
              isLightMode={isLightMode}
              setLightMode={toggleLightMode}
            />
  
            <h1 className="text-center text-4xl font-bold  text-shadow-neon-purple">
              CYBER SMART
            </h1>
            <div className='h-3/4 w-full'>
            <div>
            {/* Flex layout for Funded By */}            
            <div className="flex flex-col md:flex-row w-full px-2 items-start justify-between mb-6">
    {/* Funded by Section (Left) */}
    <div className="flex flex-col items-center md:items-start w-full md:w-1/5 bg-white shadow-lg p-3 rounded-lg">
    {/* Funded by Section */}
    <div className="flex flex-col items-center md:items-start w-full">
        <p className="text-center md:text-left text-lg font-semibold text-purple-700 mb-2">
            Funded by: <br /> National Council Science and Technology Communication (NCSTC)
        </p>
        <img src={FundedLogo} alt="Funded by NCSTC" className="w-40 h-auto mb-4" />
    </div>

    {/* Contact Information Section */}
    <div className="w-full bg-white shadow-lg p-4 rounded-lg mt-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2 text-center md:text-left">
            Contact Information
        </h2>
        <p className="text-gray-700 text-center md:text-left"><strong>Landline:</strong> +91-824-2473402</p>
        <p className="text-gray-700 text-center md:text-left"><strong>Email:</strong> projectcihub@gmail.com</p>
    </div>
</div>


    {/* Main Content Paragraph (Center - 60% width) */}
    <div className="w-full md:w-3/5 p-6 rounded-lg">
        <p className="text-lg font-semibold text-justify p-8">
            Welcome to a special activity designed just for you! In today’s world, the internet
            plays a huge role in our lives, from learning new things to staying connected with
            friends. But just like in real life, it’s important to stay safe online too! This
            activity will take you on a quick journey to explore how much you know about using the
            internet wisely and safely.
            <br />
            Let’s find out together what you already know about online safety and how we can help
            you learn even more. Your responses will help us create a safer, smarter online world
            for students like you!
        </p>
        <div className="mx-16 w-1/1 p-0">
                       
                        <Details lang={lang} setLang={setLang} />
                       
            </div>
    </div>

    {/* Guidance Section (Right) */}
    <div className="flex flex-col md:w-1/5 items-center space-y-4">
        <div className="flex flex-col items-center">
            <p className="text-center text-base font-semibold text-purple-700 mb-2">Under the Guidance of:</p>
        </div>
        
        {/* Dr. Mahendra Pratap Singh */}
        <div className="flex flex-col items-center">
            <img src={Dev5} alt="Dr. Mahendra Pratap Singh" className="w-24 h-24 rounded-lg shadow-md transition-transform duration-500 hover:scale-105 border-2 border-purple-800" />
            <p className="mt-1 text-center text-sm font-semibold text-purple-700">Dr. Mahendra Pratap Singh</p>
            <p className="text-center text-xs text-purple-700">Asst. Professor, Dept. of CSE (PI)</p>
        </div>

        {/* Dr. Alwyn Roshan Pais */}
        <div className="flex flex-col items-center">
            <img src={Dev6} alt="Dr. Alwyn Roshan Pais" className="w-24 h-24 rounded-lg shadow-md transition-transform duration-500 hover:scale-105 border-2 border-purple-800" />
            <p className="mt-1 text-center text-sm font-semibold text-purple-700">Dr. Alwyn Roshan Pais</p>
            <p className="text-center text-xs text-purple-700">Professor, Dept. of CSE (Co-PI)</p>
        </div>

        {/* Mr. Gaurav Pal */}
        <div className="flex flex-col items-center">
            <img src={Dev7} alt="Gaurav Pal" className="w-24 h-24 rounded-lg shadow-md transition-transform duration-500 hover:scale-105 border-2 border-purple-800" />
            <p className="mt-1 text-center text-sm font-semibold text-purple-700">Mr. Gaurav Pal</p>
            <p className="text-center text-xs text-purple-700">Project Coordinator, CSRL, NITK Surathkal</p>
        </div>
    </div>
</div>

            {/* Contact Information */}
            
            
            </div>
            
            
  
              
              
            </div>
            
            
            
            
            {/* Developer Images Animation */}
            <div className="relative mt-12 py-1">
              <div className="relative inset-0 bg-gray-300 opacity-40"></div>
              <div className="relative z-30">
                <div className="flex justify-center space-x-35 pb-1">
                  <p className="mt-1 text-center text-lg font-semibold text-purple-700 ">
                    Developed By:
                  </p>
  
                  {/* Developer avatars and names */}
                  <div className="flex flex-col items-center mx-5">
                    <img
                      src={Dev2}
                      alt="Developer 2"
                      className="w-28 h-28 rounded-lg shadow-lg transition-transform duration-1000 hover:scale-105 border-4 border-purple-800"
                    />
                    <p className="mt-1 text-center text-lg font-semibold text-purple-700">
                      Mr. Mehul Muralidhar Kini
                    </p>
                    <p className="text-center text-sm text-purple-700">
                      Intern, CSRL NITK
                    </p>
                  </div>
  
                  <div className="flex flex-col items-center mx-5">
                    <img
                      src={Dev1}
                      alt="Developer 1"
                      className="w-28 h-28 rounded-lg shadow-lg transition-transform duration-1000 hover:scale-105 border-4 border-purple-800"
                    />
                    <p className="mt-1 text-center text-lg font-semibold text-purple-700">
                      Mr. Anoop S Prabhu
                    </p>
                    <p className="text-center text-sm text-purple-700">
                      Intern, CSRL NITK
                    </p>
                  </div>
  
                  <div className="flex flex-col items-center mx-5">
                    <img
                      src={Dev3}
                      alt="Developer 3"
                      className="w-28 h-28 rounded-lg shadow-lg transition-transform duration-1000 hover:scale-105 border-4 border-purple-800"
                    />
                    <p className="mt-1 text-center text-lg font-semibold text-purple-700">
                      Ms. Shreya S Rao
                    </p>
                    <p className="text-center text-sm text-purple-700">
                      Intern, CSRL NITK
                    </p>
                  </div>
                  {/* <div className="flex flex-col items-center mx-5">
                        <img
                          src={Dev4}
                          alt="Developer 4"
                          className="w-28 h-28 rounded-lg bg-slate-400 shadow-lg transition-transform duration-1000 hover:scale-105 border-4 border-purple-800"
                        />
                        <p className="mt-1 text-center text-lg font-semibold text-purple-700 whitespace-nowrap">
                          Ms. Sinchana N
                        </p>
                        <p className="text-center text-sm text-purple-700 whitespace-nowrap">
                          Intern, CSRL NITK
                        </p>
                      </div> */}
  
                  
                </div>
              </div>
            </div>
  
            {/* Footer */}
            <footer className="w-full py-4 bg-gray-800 text-white">
    <div className="container mx-auto flex justify-between items-center">
        <div className="flex-1 text-center">
            &copy; {new Date().getFullYear()} CSRL, NITK Surathkal. All rights reserved.
        </div>
        <VisitCounter />
    </div>
</footer>
          </main>
        }
          />
          {/* Additional Routes */}
          <Route
            path="/about"
            element={
              <DetailsEntry
                selectedlang={lang.name}
                willReadScreen={false}
                setWillReadScreen={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          />
          <Route
            path="/elementarysurvey"
            element={
              <ElementarySurvey
                willReadScreen={willReadScreen}
                setWillReadScreen={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          />
          <Route
            path="/middlesurvey"
            element={
              <MiddleSurvey
                willReadScreen={willReadScreen}
                setWillReadScreen={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          />
          <Route
            path="/highsurvey"
            element={
              <HighSurvey
                willReadScreen={willReadScreen}
                setWillReadScreen={() => {}}
              />
            }
          />
          <Route
            path="/finish"
            element={
              <Ending
                // willReadScreen={false}
                // setWillReadScreen={() => {
                //   throw new Error("Function not implemented.");
                // }}
              />
            }
          />
        </Routes>
      </Router>
    );
  };
  
  export default App;
