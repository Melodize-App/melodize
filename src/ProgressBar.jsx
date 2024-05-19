import React from 'react';

const ProgressBar = ({ progress }) => {
  // הגדרת סגנון לפס ההתקדמות
  const progressBarStyle = {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    overflow: 'hidden',
  };

  // הגדרת סגנון לחלק המלא של הפס
  const progressStyle = {
    height: '20px',
    width: `${progress}%`, // רוחב החלק המלא מתבסס על ההתקדמות
    backgroundColor: '#4caf50',
    borderRadius: '5px',
  };

  return (
    <div style={progressBarStyle}>
      <div style={progressStyle}></div>
    </div>
  );
};

export default ProgressBar;
