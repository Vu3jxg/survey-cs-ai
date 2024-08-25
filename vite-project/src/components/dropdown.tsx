import React, { useState, useRef, useEffect } from 'react';

interface DropdownInputProps {
  options: string[];
  placeholder?: string;
  onSelect?: (selectedOption: string) => void;
  className?: string; // Add className prop here
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  options,
  placeholder = 'Select an option...',
  onSelect,
  className = '', // Default to empty string if no className is provided
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={selectedOption}
        placeholder={placeholder}
        onClick={handleInputClick}
        readOnly
        className="border border-gray-300 rounded-md p-2 w-full cursor-pointer"
        ref={inputRef}
      />
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute mt-1 w-full border border-gray-300 bg-white rounded-md shadow-lg z-10"
        >
          <ul className="list-none p-0 m-0">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionClick(option)}
                className="cursor-pointer text-left p-2 hover:bg-gray-100 dark:text-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownInput;
