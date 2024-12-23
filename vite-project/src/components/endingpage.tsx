import { useEffect, useState } from "react";
import background from "../assets/logos/Circle-pattern-on-purple-abstract-background.-scaled.jpg";
import bgCharacter from "../assets/logos/BG_character.png";
import Header from "./header";

export default function ThankYouPage() {
  const [isLightMode, setLightMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "light" : true; // Default to light mode
  });

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [isLightMode]);

  const toggleLightMode = () => {
    setLightMode((prev) => !prev);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-normal bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="fixed top-0 left-0 w-full z-50 bg-opacity-75 bg-gray-900">
        <Header isLightMode={isLightMode} setLightMode={toggleLightMode} />
      </div>
      <div className="mt-20 flex flex-col items-center">
        <img
          src={bgCharacter}
          alt="Character giving thumbs-up"
          className="w-90 h-80 mt-10"
        />
        <h1 className="text-center text-4xl font-bold text-white mb-10">
          Your Response is successfully submitted.
        </h1>

        {/* Custom Home Button */}
        <a
          href="https://cybersmart.nitk.ac.in/"
          target="_blank"
          // rel="noopener noreferrer"
          className="flex items-center px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          {/* Home Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 3l7 7h-4v7h-6v-7H5l7-7zm0-2L3 10h4v8h10v-8h4L12 1z" />
          </svg>
          HOME
        </a>
      </div>
    </div>
  );
}
