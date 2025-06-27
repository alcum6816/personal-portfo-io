import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  className = ''
}) => {
  const variants = {
    primary: 'bg-highlight text-primary hover:bg-highlight/90',
    secondary: 'bg-card text-secondary hover:bg-card/80',
    accent: 'bg-accent text-primary hover:bg-accent/90',
    outline: 'border border-highlight text-accent hover:bg-highlight-light'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`rounded-lg transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;