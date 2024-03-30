/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { DownOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dropdown.scss';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // Delay of 200 second
  };

  return (
    <div className='relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <span className='cursor-pointer relative'>
        Other
        <DownOutlined className='cursor-pointer text-2xl absolute top-1 ml-1 icon-other' />
      </span>
      {isOpen && (
        <div
          className={`dropdown-other absolute mt-3 transition-all duration-500 py-4 px-10 rounded-xl shadow-lg shadow-gray-50${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          style={{ backgroundColor: '#f8f5f5' }}
        >
          <Link to='/blog' className='block hover:opacity-50'>
            Blog
          </Link>
          {/* <Link to='/inbox' className='block mt-6 hover:opacity-50'>
            Inbox
          </Link> */}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
