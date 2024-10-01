import React, { useState } from 'react';
import DropdownInput from "./dropdown";
import data from '../data/DetailsDisplayLang.json';
import schooldata from '../data/SchoolsList.json';
import { Translations, LanguageCode, SchoolInterface } from '../types/Data'; //I deeply apologize for not using the i18 library
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface DetailsEntryProps {
    selectedlang: string;
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

  //const defaultLanguageCode: LanguageCode = 'kan';
  function getLanguageCode(value: string): LanguageCode {
    if(value == 'English') return 'eng'
    else if(value == 'Hindi') return 'hin'
    else return 'kan'
}

export default function DetailsEntry({selectedlang}: DetailsEntryProps) {
    
    const languageCode: LanguageCode = getLanguageCode(selectedlang);

    const Gender = getTranslation('gender',languageCode)
    const genderOptions = [getTranslation('genderoptionsmale',languageCode), getTranslation('genderoptionsfemale',languageCode), getTranslation('genderoptionsother',languageCode)]
    
    const [school, setSchool] = useState('');
    const [classSelection, setClassSelection] = useState('');
    const [section, setSection] = useState('');
    const [board, setBoard] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [selectedGender, setSelectedGender] = useState('');

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedGender(event.target.value);
    };

    const handleSchoolChange = (value: string) => {
        setSchool(value);
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

    const navigateToCategory = useNavigate();

    const handleCreate = () => {
        console.log('handleCreate called');
        let category = ''; // for age category i.e., elementary, middle or high school
        const classVal = parseInt(classSelection, 10); //to store number value of the student's class. 10 is to denote base10
        if(classVal <= 5) {
            category = 'elementary'; // for classes 1-5
        }
        else if(classVal <= 8) {
            category = 'middle'; // for classes 6-8
        }
        else {
            category = 'high'; // for classes 9-12
        }

        const newDetailsList = {
            school_code: (() => { //finding and assigning the corresponding school code for the school name
                const index = schoolNames.indexOf(school); //finding index of the school in the school names list
                return (index != -1)? parseInt(schoolCodes[index], 10) : 0; // using the same index, find the corresponding school code since both are derived from the same object in the SchoolsList json
            })(),
            class_name: classVal, //assigning number value
            section: section,
            board: board,
            gender: (() => {
                const index = genderOptions.indexOf(selectedGender);
                if(index == 0) return 'M';
                else if(index == 1) return 'F';
                else return 'O';
            })(),
            lang: selectedlang,
            rollno: rollNo
        };
        console.log('Making POST request with', newDetailsList);
        axios.post(`http://127.0.0.1:8000/${category}`, newDetailsList) // post request to the relevant fastapi endpoint with DetailsList
          // on success
          .then(res => {
            console.log('POST request success', res.data);
            navigateToCategory(`/${category}survey`, {state: res.data}); // navigating to the relevant survey questions page and passing the response (Record) as props
          })
          // on failure
          .catch(error => {
            console.error('There was an error with the POST request!', error);
          });
    };

    return (
        <>
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full dark:shadow-gray-700">
        {/* School Selection */}
        <label className="block text-left text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">
            {getTranslation('school',languageCode)}
        </label>
        <DropdownInput 
            className="w-full p-3 mb-6 border border-purple-300 dark:border-purple-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-600"
            options={schoolNames}
            placeholder={getTranslation('schoolselection',languageCode)}
            value={school}
            onChange={handleSchoolChange}
        />

        {/* Class Selection */}
        <label className="block text-left text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">
            {getTranslation('class',languageCode)}
        </label>
        <DropdownInput 
            className="w-full p-3 mb-6 border border-purple-300 dark:border-purple-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-600"
            options={['1','2','3','4','5','6','7','8','9','10','11','12']}
            placeholder={getTranslation('classselection',languageCode)}
            value={classSelection}
            onChange={handleClassChange}
        />

        {/* Section Selection */}
        <label className="block text-left text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">
            {getTranslation('sec',languageCode)}
        </label>
        <DropdownInput 
            className="w-full p-3 mb-6 border border-purple-300 dark:border-purple-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-600"
            options={['A','B','C','D','E']}
            placeholder={getTranslation('secselection',languageCode)}
            value={section}
            onChange={handleSectionChange}
        />

        {/* Board Selection */}
        <label className="block text-left text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">
            {getTranslation('board',languageCode)}
        </label>
        <DropdownInput 
            className="w-full p-3 mb-6 border border-purple-300 dark:border-purple-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-600"
            options={['State', 'CBSE', (classSelection == '11' || classSelection == '12')? 'ISC':'ICSE']}
            placeholder={getTranslation('boardselection',languageCode)}
            value={board}
            onChange={handleBoardChange}
        />

        {/* Roll No Selection */}
        <label className="block text-left text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">
            {getTranslation('rollno',languageCode)}
        </label>
        <input 
            type="text" 
            value={rollNo}
            onChange={handleRollNoChange}
            placeholder={getTranslation('rollnoselection',languageCode)}
            className="w-full p-3 mb-6 border border-purple-300 dark:border-purple-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-600"
        />

        {/* Gender Selection */}
        <fieldset className="mb-6">
            <legend className="block text-left text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">
                {getTranslation('gender',languageCode)}
            </legend>
            <div className="flex flex-col space-y-2">
                {genderOptions.map((option: string, index: number) => (
                    <label key={index} className="flex items-center space-x-3 text-gray-800 dark:text-gray-300">
                        <input
                            type="radio"
                            name="gender"
                            value={option}
                            checked={selectedGender === option}
                            onChange={handleGenderChange}
                            className="h-5 w-5 text-purple-600 focus:ring-purple-500 dark:focus:ring-purple-400"
                        />
                        <span>{option}</span>
                    </label>
                ))}
            </div>
        </fieldset>

        <button className="w-full mt-6 px-6 py-3 font-semibold text-white bg-purple-500 rounded-lg shadow-lg hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-700 dark:hover:bg-purple-800 dark:focus:ring-purple-600 transition-all duration-300"
            onClick={handleCreate}
            disabled={school === '' || classSelection === '' || section === '' || board === '' || rollNo === '' || selectedGender === ''}>
                Submit
        </button>
    </div>
</div>

        </>
    );
}