import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars } from "react-icons/fa";

const FlyoutNav = ({ FlyoutContent }) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit"
    >
      <button className="relative text-white">
        <FaBars className="text-black text-2xl" />
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
        />
      </button>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-white text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* Flyout content */
const FlyoutContent = () => {
  return (
    <div className="space-y-3">
      <a 
        href="https://www.nitk.ac.in" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block text-sm text-gray-700 hover:underline"
      >
        Visit NITK Website
      </a>
      <a 
        href="https://www.nitk.ac.in/contact-us" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block text-sm text-gray-700 hover:underline"
      >
        Contact Us
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
  );
};

export default FlyoutNav;
