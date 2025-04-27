'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  button {
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 50px; /* real switch size */
    height: 26px;
  }

  /* Hide default checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #2a2a2a;
    transition: 0.4s;
    border-radius: 34px;
    overflow: hidden;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    box-shadow: inset 8px -4px 0px 0px #fff;
  }

  input:checked + .slider {
    background-color: #00a6ff;
  }

  input:checked + .slider:before {
    transform: translateX(24px);
    box-shadow: inset 15px -4px 0px 15px #ffcf48;
  }

  .star {
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    width: 4px;
    height: 4px;
    transition: all 0.4s;
  }

  .star_1 {
    left: 32px;
    top: 6px;
  }

  .star_2 {
    left: 28px;
    top: 16px;
  }

  .star_3 {
    left: 38px;
    top: 12px;
  }

  input:checked ~ .slider .star {
    opacity: 0;
  }

  .cloud {
    width: 40px;
    position: absolute;
    bottom: -12px;
    left: -12px;
    opacity: 0;
    transition: all 0.4s;
  }

  input:checked ~ .slider .cloud {
    opacity: 1;
  }
`;

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <StyledWrapper>
      <button onClick={toggleTheme} aria-label="Toggle theme">
        <label className="switch">
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={toggleTheme}
          />
          <span className="slider">
            <div className="star star_1" />
            <div className="star star_2" />
            <div className="star star_3" />
            <svg viewBox="0 0 16 16" className="cloud_1 cloud">
              <path
                transform="matrix(.77976 0 0 .78395-299.99-418.63)"
                fill="#fff"
                d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
              />
            </svg>
          </span>
        </label>
      </button>
    </StyledWrapper>
  );
};

export default ThemeToggleButton;
