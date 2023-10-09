import React, { useState, useEffect, useRef } from 'react';

const Test = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (openDropdown && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [openDropdown]);

  const handleDropdownClick = (item) => {
    if (openDropdown === item) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(item);
    }
  };

  return (
    <section id='test'>
      <ul>
        <li>
          <button onClick={() => handleDropdownClick('item1')}>Item 1</button>
          {openDropdown === 'item1' && (
            <ul className="dropdown" ref={dropdownRef}>
              <li>Child 1</li>
              <li>Child 2</li>
              <li>Child 3</li>
              <li>Child 4</li>
            </ul>
          )}
        </li>
        <li>
          <button onClick={() => handleDropdownClick('item2')}>Item 2</button>
          {openDropdown === 'item2' && (
            <ul className="dropdown" ref={dropdownRef}>
              <li>Child 1</li>
              <li>Child 2</li>
              <li>Child 3</li>
              <li>Child 4</li>
            </ul>
          )}
        </li>
        <li>
          <button onClick={() => handleDropdownClick('item3')}>Item 3</button>
          {openDropdown === 'item3' && (
            <ul className="dropdown" ref={dropdownRef}>
              <li>Child 1</li>
              <li>Child 2</li>
              <li>Child 3</li>
              <li>Child 4</li>
            </ul>
          )}
        </li>
      </ul>
    </section>
  );
};

export default Test;