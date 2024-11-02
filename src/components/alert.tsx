import React from 'react';

interface AlertProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const alertClasses = {
    success: 'bg-green-100 text-green-800 border border-green-400',
    error: 'bg-red-100 text-red-800 border border-red-400',
    info: 'bg-blue-100 text-blue-800 border border-blue-400',
  };

  return (
    <div className={`p-4 rounded relative ${alertClasses[type]}`}>
      <span className="font-medium">{message}</span>
      {onClose && (
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;