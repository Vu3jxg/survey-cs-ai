import React, { useEffect, useState } from 'react';
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

// Developer images (replace these with actual images)
import Dev1 from './assets/devs/Anoop.jpg'; // Update with actual paths
import Dev2 from './assets/devs/Shreya.jpg';
import Dev3 from './assets/devs/mehul.jpg';
import Dev4 from './assets/devs/sinchana.jpg';
import Dev5 from './assets/devs/MPS-Photo-2023.jpg';
import Dev6 from './assets/devs/Gaurav.jpg';

const App = () => {
  const [willReadScreen, setWillReadScreen] = useState(true);
  const [isLightMode, setLightMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'light' : true; // Default to light mode if not set
  });
  const [lang, setLang] = useState({
    isSet: false,
    name: '',
  });
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLightMode]);

  useEffect(() => {
    const cookieVal = (cookieName) => {
      const thisCookie = document.cookie.split("; ");
      for (let i = 0; i < thisCookie.length; i++) {
        if (cookieName === thisCookie[i].split("=")[0]) {
          return thisCookie[i].split("=")[1];
        }
      }
      return 0;
    };
  
    // Get the current visitor count from the cookie
    let counter = parseInt(cookieVal("total_visited")) || 0;
    
    // Only increment if no visit cookie is set for this session
    if (!sessionStorage.getItem('visited')) {
      counter++;
      setCounter(counter);
  
      // Set cookie expiration to 6 months
      const expiration = new Date();
      expiration.setMonth(expiration.getMonth() + 6);
      document.cookie = `total_visited=${counter};expires=${expiration.toGMTString()}`;
      
      // Mark this session as visited to avoid double increment
      sessionStorage.setItem('visited', 'true');
    } else {
      setCounter(counter); // Just set the counter without incrementing
    }
  }, []);

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
              willReadScreen={willReadScreen}
              setWillReadScreen={setWillReadScreen}
              isLightMode={isLightMode}
              setLightMode={toggleLightMode}
            />
  
            <h1 className="text-center text-4xl font-bold mb-2 text-shadow-neon-purple">
              CYBER SMART
            </h1>
  
            {/* Flex layout for Funded By and Main Paragraph */}
            <div className="flex flex-col md:flex-row w-full px-4 items-start justify-between mb-6">
              {/* Funded by Section (Left) */}
              <div className="w-full md:w-1/4 flex flex-col items-center md:items-start">
                <img src={FundedLogo} alt="Funded by NCSTC" className="w-48 h-auto mb-2" />
                <p className="text-justify text-lg font-semibold text-purple-700">
                  Funded by: <br /> National Council Science and Technology Communication (NCSTC)
                </p>
              </div>
  
              {/* Main Content Paragraph (Right) */}
              <div className="w-full md:w-3/4">
                <p className="text-lg mb-6 max-w-2xl font-semibold text-justify">
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
              </div>
            </div>
  
            {/* Contact Information */}
            <div className="w-full px-4 mb-8">
              <div className="w-full md:w-1/4 bg-white shadow-lg p-2 rounded-lg">
                <h2 className="text-xl font-bold mb-0 text-gray-800">Contact Information</h2>
                <p className="text-gray-700"><strong>Landline:</strong> +91-824-2473402</p>
                <p className="text-gray-700"><strong>Email:</strong> projectcihub@gmail.com</p>
              </div>
            </div>
            <div className="mx-auto w-1/2">
                       
                        <Details lang={lang} setLang={setLang} />
                       
            </div>
            {/* Developer Images Animation */}
            <div className="relative mt-16 py-2">
              <div className="relative inset-0 bg-gray-300 opacity-40"></div>
              <div className="relative z-10">
                <div className="flex animate-slide space-x-40 pb-1">
                  <p className="mt-1 text-center text-lg font-semibold text-purple-700 whitespace-nowrap">
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
                      Ms. Shreya S Rao
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
                      Mr. Mehul Muralidhar Kini
                    </p>
                    <p className="text-center text-sm text-purple-700">
                      Intern, CSRL NITK
                    </p>
                  </div>
                  <div className="flex flex-col items-center mx-5">
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
                      </div>
  
                  <p className="mt-1 text-center text-lg font-semibold text-purple-700 whitespace-nowrap">
                    Under the Guidance of:
                  </p>
  
                  <div className="flex flex-col items-center mx-6">
                    <img
                      src={Dev5}
                      alt="Developer 5"
                      className="w-28 h-28 rounded-lg shadow-lg transition-transform duration-1000 hover:scale-105 border-4 border-purple-800"
                    />
                    <p className="mt-1 text-center text-lg font-semibold text-purple-700">
                      Dr. Mahendra Pratap Singh
                    </p>
                    <p className="text-center text-sm text-purple-700">
                      Asst. Professor, Dept. of Computer Science & Engineering, NITK Surathkal
                    </p>
                  </div>
  
                  <div className="flex flex-col items-center mx-5">
                    <img
                      src={Dev6}
                      alt="Developer 6"
                      className="w-28 h-28 rounded-lg shadow-lg transition-transform duration-1000 hover:scale-105 border-4 border-purple-800"
                    />
                    <p className="mt-1 text-center text-lg font-semibold text-purple-700">
                      Mr. Gaurav Pal
                    </p>
                    <p className="text-center text-sm text-purple-700">
                      Project Co-ordinator, CSRL, NITK Surathkal
                    </p>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Visitor Count */}
            <div className="visitor-count">
              <center>
                <h3>
                  You visited this page <label className="visitor-count-label">{counter}</label> times.
                </h3>
              </center>
            </div>
  
            {/* Footer */}
            <footer className="w-full py-4 bg-gray-800 text-white text-center">
              &copy; {new Date().getFullYear()} CSRL, NITK Surathkal. All rights reserved.
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
                willReadScreen={false}
                setWillReadScreen={() => {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          />
        </Routes>
      </Router>
    );
  };
  
  export default App;
