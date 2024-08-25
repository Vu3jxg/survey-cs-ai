import DropdownInput from "./dropdown";

interface DetailsEntryProps {
    selectedlang: string,
}

function GetPlaceholder(selectedlang: string) {
    switch (selectedlang) {
        case 'English':
            return 'Select your class';
        case 'Hindi':
            return 'Select your class';
        case 'Kannada':
            return 'Select your class';
        default:
            return 'Select your class';
    }
}

export default function DetailsEntry({selectedlang}: DetailsEntryProps) {
    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700">
            {/* School Selection */}
            {selectedlang === 'English' && (
                <label className="block text-left text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                School
                </label>
            )}
            {selectedlang === 'Hindi' && (
                <label className="block text-left text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                School
                </label>
            )}
            {selectedlang === 'Kannada' && (
                <label className="block text-left text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                School
                </label>
            )}
            <input 
                type="text" 
                placeholder="Enter your school name" 
                className="w-full mb-9 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            {/* Class Selection */}
            {selectedlang === 'English' && (
                <label className="block text-left text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Class</label>
            )}
            {selectedlang === 'Hindi' && (
                <label className="block text-left text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Class</label>
            )}
            {selectedlang === 'Kannada' && (
                <label className="block text-left text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Class</label>
            )}
            <DropdownInput 
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                options={['1','2','3','4','5','6','7','8','9','10','11','12']}
                placeholder={GetPlaceholder(selectedlang)}
            />
        </div>
    );
}