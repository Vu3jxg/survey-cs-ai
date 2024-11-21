import { useEffect, useState } from 'react';

const VisitorCounter = () => {
    const [counter, setCounter] = useState(() => {
      // Initialize state with current value from localStorage
      return parseInt(localStorage.getItem('total_visited')) || 0;
    });
    
    const [hasIncremented, setHasIncremented] = useState(false);
  
    useEffect(() => {
      // Only increment if we haven't done so in this session
      if (!hasIncremented) {
        const newCount = counter + 1;
        localStorage.setItem('total_visited', newCount.toString());
        setCounter(newCount);
        setHasIncremented(true);
      }
    }, [counter, hasIncremented]);

  return <div>Visitor Count: {counter}</div>;
}

export default VisitorCounter;
