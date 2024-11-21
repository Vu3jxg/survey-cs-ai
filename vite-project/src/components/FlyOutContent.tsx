

const FlyoutContent = () => {
  return (
    <div className="w-64 bg-white p-6 shadow-xl">
      <div className="mb-3 space-y-3">
      <a 
        href="https://www.nitk.ac.in" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block text-sm text-gray-700 hover:underline"
      >
        Visit NITK Website
      </a>
        <a 
        href="https://cse.nitk.ac.in" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block text-sm text-gray-700 hover:underline"
      >
        CSE Department NITK
      </a>
        <a 
        href="https://www.nitk.ac.in/contact-us" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block text-sm text-gray-700 hover:underline"
      >
        Contact Us
      </a>
      </div>
      
    </div>
  );
};

export default FlyoutContent;