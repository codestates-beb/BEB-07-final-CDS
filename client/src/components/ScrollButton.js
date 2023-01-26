import React, { useState } from 'react';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
           in place of 'smooth' */
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <div>
      <button
        className="h-16 w-16 rounded-full bg-primaryColor text-center text-white drop-shadow-md transition-all hover:scale-110"
        onClick={scrollToTop}
        style={{ display: visible ? 'inline' : 'none' }}
      >
        Top
      </button>
    </div>
  );
};

export default ScrollButton;
