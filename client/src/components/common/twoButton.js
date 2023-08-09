import React from 'react';
import { Link } from 'react-router-dom';

const NavigationButtons = ({ link1, text1, link2, text2 }) => {
  return (
    <div className="flex justify-center">
      <Link to={link1} className="mr-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        {text1}
      </Link>
      <Link to={link2} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
        {text2}
      </Link>
    </div>
  );
};

export default NavigationButtons;
