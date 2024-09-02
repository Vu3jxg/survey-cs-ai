import React, { useState } from 'react';
import DropdownInput from "./dropdown";
import data from '../data/DetailsDisplayLang.json';
import { Translations, LanguageCode } from '../types/Data'; //I deeply apologize for not using the i18 library

interface DetailsEntryProps {
    selectedlang: string,
    setIsModalOpen: (value: boolean) => void
}

const translations: Translations = data;

function getTranslation(key: string, lang: LanguageCode): string {
    const translation = translations[key];
    if (!translation) {
      console.warn(`No translation found for key '${key}'`);
      return key;
    }
    const result = translation[lang];
    if (typeof result === 'undefined') {
      console.warn(`No translation found for key '${key}' and language '${lang}'`);
      return key;
    }
    return result;
  }

  //const defaultLanguageCode: LanguageCode = 'kan';
  function getLanguageCode(value: string): LanguageCode {
    if(value == 'English') return 'eng'
    else if(value == 'Hindi') return 'hin'
    else return 'kan'
}

export default function DetailsEntry({selectedlang, setIsModalOpen}: DetailsEntryProps) {
    
    const languageCode: LanguageCode = getLanguageCode(selectedlang);

    const Gender = getTranslation('gender',languageCode)
    const genderOptions = [getTranslation('genderoptionsmale',languageCode), getTranslation('genderoptionsfemale',languageCode), getTranslation('genderoptionsother',languageCode)]
    
    const [school, setSchool] = useState('');
    const [classSelection, setClassSelection] = useState('');
    const [section, setSection] = useState('');
    const [board, setBoard] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [selectedGender, setSelectedGender] = useState<string | null>(null);

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedGender(event.target.value);
    };

    const handleSchoolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSchool(event.target.value);
    };

    const handleClassChange = (value: string) => {
        setClassSelection(value);
    };

    const handleSectionChange = (value: string) => {
        setSection(value);
    };

    const handleBoardChange = (value: string) => {
        setBoard(value);
    };

    const handleRollNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRollNo(event.target.value);
    };


    return (
        <>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700">
            {/* School Selection */}
            <label className="block text-left text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                {getTranslation('school',languageCode)}
            </label>
            <input 
                type="text" 
                value={school}
                onChange={handleSchoolChange}
                placeholder={getTranslation('schoolselection',languageCode)}
                className="w-full mb-9 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            {/* Class Selection */}
            <label className="block text-left text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                {getTranslation('class',languageCode)}
            </label>
            <DropdownInput 
                className="w-full p-2 mb-9 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                options={['1','2','3','4','5','6','7','8','9','10','11','12']}
                placeholder={getTranslation('classselection',languageCode)}
                value={classSelection}
                onChange={handleClassChange}
            />

            {/* Sec Selection */}
            <label className="block text-left text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                {getTranslation('sec',languageCode)}
            </label>
            <DropdownInput 
                className="w-full p-2 mb-9 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                options={['A','B','C','D','E']}
                placeholder={getTranslation('secselection',languageCode)}
                value={section}
                onChange={handleSectionChange}
            />

            {/* Board Selection */}
            <label className="block text-left text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                {getTranslation('board',languageCode)}
            </label>
            <DropdownInput 
                className="w-full p-2 mb-9 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                options={['State','CBSE',(classSelection == '11' || classSelection == '12')? 'ISC':'ICSE']}
                placeholder={getTranslation('boardselection',languageCode)}
                value={board}
                onChange={handleBoardChange}
            />

            {/* Rollno Selection */}
            <label className="block text-left text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                {getTranslation('rollno', languageCode)}
            </label>
            <input 
                type="text" 
                value={rollNo}
                onChange={handleRollNoChange}
                placeholder={getTranslation('rollnoselection', languageCode)}
                className="w-full mb-9 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            {/* Gender Selection */}
            <fieldset className="mb-4">
                <legend className="block text-left text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    {Gender}
                </legend>
                <div className="flex flex-col space-y-2">
                    {genderOptions.map((option: string, index: number) => (
                        <label key={index} className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
                            <input
                                type="radio"
                                name="gender"
                                value={option}
                                checked={selectedGender === option}
                                onChange={handleGenderChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
            </fieldset>
        </div>
        <button className="mt-6 px-6 py-3 text-white bg-orange-400 rounded-lg shadow-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-500"
                            onClick={() => setIsModalOpen(true)}>
                        Submit
                    </button>
        </>
    );
}