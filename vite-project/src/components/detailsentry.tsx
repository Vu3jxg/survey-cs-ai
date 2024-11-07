import React, { useEffect, useState } from 'react';
import Captcha from './Captcha';
import DropdownInput from './dropdown';
import data from '../data/DetailsDisplayLang.json';
import schooldata from '../data/SchoolsList.json';
import statesData from '../data/states.json'; // Import your states and districts JSON
import { Translations, LanguageCode, SchoolInterface } from '../types/Data';

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
const schoolsWithOthers = schoolNames.includes('Others') ? schoolNames : [...schoolNames, 'Others'];

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

export default function DetailsEntryDeferred({ selectedlang, willReadScreen, setWillReadScreen }: DetailsEntryProps) {
    const languageCode: LanguageCode = getLanguageCode(selectedlang);
    const Gender = getTranslation('gender', languageCode);
    const genderOptions = [
        getTranslation('genderoptionsmale', languageCode),
        getTranslation('genderoptionsfemale', languageCode),
        getTranslation('genderoptionsother', languageCode)
    ];

    const [school, setSchool] = useState('');
    const [customSchoolName, setCustomSchoolName] = useState('');
    const [classSelection, setClassSelection] = useState('');
    const [section, setSection] = useState('');
    const [board, setBoard] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedState, setSelectedState] = useState(''); 
    const [rollNo, setRollNo] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [isFormValid, setIsFormValid] = useState(false);

    // Extract state names from the JSON data
    const stateNames = statesData.states.map(state => state.state);

    // Filtered districts based on selected state
    const districts = selectedState ? statesData.states.find(state => state.state === selectedState)?.districts || [] : [];

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedGender(event.target.value);
    };

    const handleSchoolChange = (value: string) => {
        setSchool(value);
        if (value !== 'Others') {
            setCustomSchoolName('');
        }
    };

    const handleClassChange = (value: string) => setClassSelection(value);
    const handleSectionChange = (value: string) => setSection(value);
    const handleBoardChange = (value: string) => setBoard(value);
    const handleRollNoChange = (event: React.ChangeEvent<HTMLInputElement>) => setRollNo(event.target.value);

    const handleStateChange = (value: string) => {
        setSelectedState(value);
        setSelectedDistrict(''); // Reset district when state changes
    };

    const handleDistrictChange = (value: string) => {
        setSelectedDistrict(value);
    };

    const navigateToCategory = useNavigate();

    const [isLightMode, setLightMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme === 'light' : true;
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

    const handleCreate = () => {
        if (!captchaToken) {
            alert('Please complete the reCAPTCHA');
            return;
        }

        let category = '';
        const classVal = parseInt(classSelection, 10);
        if (classVal <= 5) {
            category = 'elementary';
        } else if (classVal <= 8) {
            category = 'middle';
        } else {
            category = 'high';
        }

        const newDetailsList = {
            school_code: (() => {
                const index = schoolNames.indexOf(school);
                return index !== -1 ? parseInt(schoolCodes[index], 10) : 0;
            })(),
            other_name: school === 'Others' ? customSchoolName : null,
            class_name: classVal,
            section: section,
            board: board,
            gender: (() => {
                const index = genderOptions.indexOf(selectedGender);
                return index === 0 ? 'M' : index === 1 ? 'F' : 'O';
            })(),
            lang: selectedlang,
            rollno: rollNo,
            state_n: selectedState, 
            district: selectedDistrict,
            recaptcha_token: captchaToken
        };

        axios.post(`http://127.0.0.1:8000/${category}`, newDetailsList)
            .then(res => {
                navigateToCategory(`/${category}survey`, { state: res.data });
            })
            .catch(error => {
                console.error('Error with the POST request', error);
            });
    };

    useEffect(() => {
        setIsFormValid(board !== '' && selectedGender !== '' && selectedState !== '' && selectedDistrict !== '' && captchaToken !== null);
    }, [board, selectedGender, selectedState, selectedDistrict, captchaToken]);


    return (
        <>
            <Header
                willReadScreen={willReadScreen}
                setWillReadScreen={setWillReadScreen}
                isLightMode={isLightMode}
                setLightMode={toggleLightMode}
                className="fixed top-0 left-0 w-full z-50"
            />
            <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full dark:shadow-gray-700">

                    <label className="block text-left text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">
                        {getTranslation('school', languageCode)}
                    </label>
                    <DropdownInput
                        className="w-full p-3 mb-3 border border-purple-300 dark:border-purple-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-600"
                        options={schoolsWithOthers}
                        placeholder={getTranslation('schoolselection', languageCode)}
                        value={school}
                        onChange={handleSchoolChange}
                    />

                    {school === 'Others' && (
                        <input
                            type="text"
                            value={customSchoolName}
                            onChange={(e) => setCustomSchoolName(e.target.value)}
                            placeholder="Write your school's name"
                            className="w-full p-3 mb-6 border border-purple-300 dark:border-purple-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-600"
                        />
                    )}
                     {/* State Selection */}
                     <label className="block text-left text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">
                        {getTranslation('State', languageCode)}
                    </label>
                    <DropdownInput
                        className="w-full p-3 mb-6 border border-purple-300 dark:border-purple-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-600"
                        options={stateNames}
                        placeholder={getTranslation('stateselection', languageCode)}
                        value={selectedState}
                        onChange={handleStateChange}
                    />

                    {/* District Selection */}
                    <label className="block text-left text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">
                        {getTranslation('District', languageCode)}
                    </label>
                    <DropdownInput
                        className="w-full p-3 mb-6 border border-purple-300 dark:border-purple-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-600"
                        options={districts}
                        placeholder={getTranslation('districtselection', languageCode)}
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                    />
                    {/* Class Selection*/ }
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

{/* Board Selection*/ }
<label className="block text-left text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">
{getTranslation('board', languageCode)}
</label>
<DropdownInput
className="w-full p-3 mb-6 border border-purple-300 dark:border-purple-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-600"
options={['CBSE', 'ICSE', 'State Board']}
placeholder={getTranslation('boardselection', languageCode)}
value={board}
onChange={handleBoardChange}
/>

{/* Gender Selection*/ }
<label className="block text-left text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">
{Gender}
</label>
<div className="mb-6">
    {genderOptions.map((option, index) => (
        <div key={index}>
            <input
                type="radio"
                value={option}
                checked={selectedGender === option}
                onChange={handleGenderChange}
                className="mr-2"
            />
            <label>{option}</label>
        </div>
    ))}
</div>

{/* Roll No Input */}
<label className="block text-left text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">
{getTranslation('rollno', languageCode)}
</label>
<input
placeholder='Your Roll Number'
type="text"
value={rollNo}
onChange={handleRollNoChange}
className="w-full p-3 mb-6 border border-purple-300 dark:border-purple-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-600"
/>

                    <Captcha onTokenChange={setCaptchaToken} />

                    <button
                        onClick={handleCreate}
                        className={`mt-6 px-6 py-2 font-bold rounded-lg ${
                            isFormValid ? 'bg-purple-500 text-white hover:bg-gray-200' : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                        }`}
                        disabled={!isFormValid}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
}
