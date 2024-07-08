import React from 'react';

interface TagProps {
    text: string;
    color?: string;
    onClose?: () => void;
}

const Tag: React.FC<TagProps> = ({ text, color = 'bg-gray-200', onClose }) => {
    return (
        <div className={`inline-flex items-center px-3 py-1 rounded text-gray-500 text-xs my-2 mr-1 ${color}`}>
            <span>{text}</span>
            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    className="ml-2 bg-transparent text-white rounded-full focus:outline-none hover:bg-gray-200 hover:text-gray-800"
                >
                    &times;
                </button>
            )}
        </div>
    );
};

export default Tag;
