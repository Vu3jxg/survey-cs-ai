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
      <Header
        isLightMode={isLightMode}
        setLightMode={toggleLightMode}
        className="fixed top-0 left-0 w-full z-50 bg-opacity-75 bg-gray-900"
      />
      <div className="mt-20 flex flex-col items-center">
        <h1 className="text-center text-4xl font-bold text-white mb-8">
          Thank you for your response.
        </h1>
        <img
          src={bgCharacter}
          alt="Character giving thumbs-up"
          className="w-90 h-90"
        />
      </div>
    </div>
  );
}
