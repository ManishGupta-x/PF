import React from 'react';

const FloatingResume = ({ 
  resumeUrl = 'https://drive.google.com/file/d/1LCIeO9p8W49yqbNcLmb-CreENAlBRFMw/view?usp=sharing',
  position = { bottom: '20px', left: '20px' },
  size = 60,
  backgroundColor = '#8b4513',
  hoverColor = '#6b3410',
  textColor = '#ffffff',
  className = ''
}) => {
  const handleClick = () => {
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
  };

  const buttonStyle = {
    position: 'fixed',
    bottom: position.bottom,
    left: position.left,
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor,
    color: textColor,
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    zIndex: 1000,
    fontSize: 0,
  };

  return (
    <button
      onClick={handleClick}
      style={buttonStyle}
      className={`floating-resume-btn ${className}`}
      aria-label="View Resume"
      title="View Resume"
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = hoverColor;
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = backgroundColor;
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }}
      onMouseDown={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
      }}
      onMouseUp={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
      }}
    >
      <svg 
        width="24" 
        height="24" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        style={{ strokeWidth: 2 }}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
        />
      </svg>
    </button>
  );
};

export default FloatingResume;
FloatingResume.displayName = 'FloatingResume';