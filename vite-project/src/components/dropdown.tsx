import React, { useState, useRef, useEffect } from 'react';

interface DropdownInputProps {
  options: string[];
  placeholder?: string;
  onSelect?: (selectedOption: string) => void;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  options,
  placeholder = 'Select an option...',
  onSelect,
<<<<<<< HEAD
  className = '', // Default to empty string if no className is provided
=======
  className = '',
>>>>>>> c9252fb (Restore initial commit)
  value = '',
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
<<<<<<< HEAD
=======
  const [filteredOptions, setFilteredOptions] = useState(options);
>>>>>>> c9252fb (Restore initial commit)
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

<<<<<<< HEAD
  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    if (onChange) onChange(option); // Call onChange if provided
    setIsOpen(false);
    if (onSelect) onSelect(option);
=======
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (onChange) onChange(inputValue);

    const matches = options.filter((option) =>
        option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(matches);
};

const handleInputClick = () => {
    if (!value) {
        setFilteredOptions(options); // Show all options if no value
    }
    setIsOpen((prev) => !prev); // Toggle dropdown visibility
};


  const handleOptionClick = (option: string) => {
    if (onChange) onChange(option);
    if (onSelect) onSelect(option);
    setIsOpen(false);
>>>>>>> c9252fb (Restore initial commit)
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onClick={handleInputClick}
<<<<<<< HEAD
        readOnly
        className="border border-gray-300 rounded-md p-2 w-full cursor-pointer"
        ref={inputRef}
      />
      {isOpen && (
=======
        onChange={handleInputChange}
        className="border border-gray-300 rounded-md p-2 w-full cursor-pointer"
        ref={inputRef}
      />

      {isOpen && filteredOptions.length > 0 && (
>>>>>>> c9252fb (Restore initial commit)
        <div
          ref={dropdownRef}
          className="absolute mt-1 w-full border border-gray-300 bg-white rounded-md shadow-lg z-10 max-h-60 overflow-y-auto"
        >
          <ul className="list-none p-0 m-0">
<<<<<<< HEAD
            {options.map((option) => (
=======
            {filteredOptions.map((option) => (
>>>>>>> c9252fb (Restore initial commit)
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
