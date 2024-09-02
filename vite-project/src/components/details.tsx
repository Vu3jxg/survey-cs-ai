import { useState } from 'react';
import Modal from './surveyquestions.tsx';
import DetailsEntry from "./detailsentry";

interface DetailsProps {
    lang: {
        isSet: boolean,
        name: string,
    };
    setLang: (value: {isSet: boolean; name: string}) => void;
}

export default function Details({lang, setLang}: DetailsProps) { 
    const handleSelect = (selectedOption: string) => {
        setLang({
            isSet: true,
            name: selectedOption,
        });
      };

      const [isModalOpen, setIsModalOpen] = useState(false);
      const openModal = () => setIsModalOpen(true);
      const closeModal = () => setIsModalOpen(false);

    return (
        <div className="p-6 max-w-screen-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-gray-700">
                <p className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                    Choose your language
                </p>
                <div className="flex flex-row px-12 py-3 items-center justify-between">
                    <button 
                        className="px-12 py-4 text-white bg-blue-400 rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500"
                        onClick={() => handleSelect('Kannada')}>Kannada</button>
                    <button 
                        className="px-12 py-4 text-white bg-green-400 rounded-lg shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-500"
                        onClick={() => handleSelect('Hindi')}>Hindi</button>
                    <button 
                        className="px-12 py-4 text-white bg-red-400 rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-500"
                        onClick={() => handleSelect('English')}>English</button>
                </div>
                {lang.isSet && (
                    <div className="mt-8 text-center">
                    <DetailsEntry selectedlang={lang.name} setIsModalOpen={openModal}/>                    
                    <Modal isOpen={isModalOpen} onClose={closeModal} lang={lang.name} />
                    </div>
                    )}
        </div>
    );
}