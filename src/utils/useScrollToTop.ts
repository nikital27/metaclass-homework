import { useEffect, useState } from 'react';

const useScrollToTop = (threshold = 800) => {
  const [showScroll, setShowScroll] = useState(false);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { showScroll, handleClick };
};

export default useScrollToTop;
