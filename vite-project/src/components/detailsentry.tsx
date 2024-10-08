import React, { useEffect, useState } from 'react';
import DropdownInput from "./dropdown";
import data from '../data/DetailsDisplayLang.json';
import schooldata from '../data/SchoolsList.json';
import { Translations, LanguageCode, SchoolInterface } from '../types/Data'; //I deeply apologize for not using the i18 library
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './header';

interface DetailsEntryProps {
    selectedlang: string;
    willReadScreen: boolean;
    setWillReadScreen: (value: boolean) => void;
}

const translations: Translations = data;
const schools: SchoolInterface[] = schooldata;
const schoolNames: string[] = schools.map(school => school.schoolName);
const schoolCodes: string[] = schools.map(school => school.schoolCode);

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

// Language code assignment
function getLanguageCode(value: string): LanguageCode {
    if (value === 'English') return 'eng';
    else if (value === 'Hindi') return 'hin';
    return 'kan';
}

export default function DetailsEntry({ selectedlang, willReadScreen, setWillReadScreen }: DetailsEntryProps) {
    const languageCode: LanguageCode = getLanguageCode(selectedlang);

    const Gender = getTranslation('gender', languageCode);
    const genderOptions = [
        getTranslation('genderoptionsmale', languageCode),
        getTranslation('genderoptionsfemale', languageCode),
        getTranslation('genderoptionsother', languageCode)
    ];

    // States
    const [school, setSchool] = useState('');
    const [classSelection, setClassSelection] = useState('');
    const [section, setSection] = useState('');
    const [board, setBoard] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [selectedGender, setSelectedGender] = useState('');

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedGender(event.target.value);
    };

    const handleSchoolChange = (value: string) => setSchool(value);
    const handleClassChange = (value: string) => setClassSelection(value);
    const handleSectionChange = (value: string) => setSection(value);
    const handleBoardChange = (value: string) => setBoard(value);
    const handleRollNoChange = (event: React.ChangeEvent<HTMLInputElement>) => setRollNo(event.target.value);

    const navigateToCategory = useNavigate();

    // Theme state
    const [isLightMode, setLightMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme === 'light' : true; // Default to light mode if not set
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

    const toggleLightMode = () => setLightMode(prevMode => !prevMode);

    // Handle form submission
    const handleCreate = () => {
        console.log('handleCreate called');
        let category = ''; // for age category i.e., elementary, middle or high school
        const classVal = parseInt(classSelection, 10); // Parse the class selection
        if (classVal <= 5) {
            category = 'elementary'; // for classes 1-5
        } else if (classVal <= 8) {
            category = 'middle'; // for classes 6-8
        } else {
            category = 'high'; // for classes 9-12
        }

        const newDetailsList = {
            school_code: (() => {
                const index = schoolNames.indexOf(school);
                return index !== -1 ? parseInt(schoolCodes[index], 10) : 0;
            })(),
            class_name: classVal,
            section: section,
            board: board,
            gender: (() => {
                const index = genderOptions.indexOf(selectedGender);
                return index === 0 ? 'M' : index === 1 ? 'F' : 'O';
            })(),
            lang: selectedlang,
            rollno: rollNo
        };

        console.log('Making POST request with', newDetailsList);
        axios.post(`http://127.0.0.1:8000/${category}`, newDetailsList)
            .then(res => {
                console.log('POST request success', res.data);
                navigateToCategory(`/${category}survey`, { state: res.data });
            })
            .catch(error => {
                console.error('There was an error with the POST request!', error);
            });
    };

    return (
        <>
            <Header
                willReadScreen={willReadScreen}
                setWillReadScreen={setWillReadScreen}
                isLightMode={isLightMode}
                setLightMode={toggleLightMode} // Pass toggle function for light mode
                className="fixed top-0 left-0 w-full z-50" // Fixing header at the top
            />
            <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full dark:shadow-gray-700">
                    {/* School Selection */}
                    <label className="block text-left text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">
                        {getTranslation('school', languageCode)}
                    </label>
                    <DropdownInput
                        className="w-full p-3 mb-6 border border-purple-300 dark:border-purple-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-600"
                        options={schoolNames}
                        placeholder={getTranslation('schoolselection', languageCode)}
                        value={school}
                        onChange={handleSchoolChange}
                    />

                    {/* Class Selection */}
                    <label className="block text-left text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">
                        {getTranslation('class', languageCode)}
                    </label>
                    <DropdownInput
                        className="w-full p-3 mb-6 border border-purple-300 dark:border-purple-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-600"
                        options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}
                        placeholder={getTranslation('classselection', languageCode)}
                        value={classSelection}
                        onChange={handleClassChange}
                    />

                    {/* Section Selection */}
                    <label className="block text-left text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">
                        {getTranslation('sec', languageCode)}
                    </label>
                    <DropdownInput
                        className="w-full p-3 mb-6 border border-purple-300 dark:border-purple-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-600"
                        options={['A', 'B', 'C', 'D', 'E']}
                        placeholder={getTranslation('secselection', languageCode)}
                        value={section}
                        onChange={handleSectionChange}
                    />

                    {/* Board Selection */}
                    <label className="block text-left text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">
                        {getTranslation('board', languageCode)}
                    </label>
                    <DropdownInput
                        className="w-full p-3 mb-6 border border-purple-300 dark:border-purple-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-600"
                        options={['CBSE', 'ICSE', 'State']}
                        placeholder={getTranslation('boardselection', languageCode)}
                        value={board}
                        onChange={handleBoardChange}
                    />

                    {/* Roll No */}
                    <label className="block text-left text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">
                        {getTranslation('rollno', languageCode)}
                    </label>
                    <input
                        type="text"
                        className="w-full p-3 mb-6 border border-purple-300 dark:border-purple-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-600"
                        placeholder={getTranslation('rollnoentry', languageCode)}
                        value={rollNo}
                        onChange={handleRollNoChange}
                    />

                    {/* Gender */}
                    <label className="block text-left text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">
                        {Gender}
                    </label>
                    <div className="flex space-x-4 mb-6">
                        {genderOptions.map((option, index) => (
                            <label key={index} className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    className="form-radio h-5 w-5 text-purple-500 dark:text-purple-400"
                                    value={option}
                                    checked={selectedGender === option}
                                    onChange={handleGenderChange}
                                />
                                <span className="ml-2 text-gray-900 dark:text-gray-300">{option}</span>
                            </label>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleCreate}
                        className="w-full p-3 bg-purple-500 dark:bg-purple-700 text-white rounded-lg hover:bg-purple-600 dark:hover:bg-purple-800 transition-colors focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-600"
                    >
                        {getTranslation('submit', languageCode)}
                    </button>
                </div>
            </div>
        </>
    );
}
