import React from 'react';

const Loading = () => {
  return (
    <svg viewBox='0 0 178 40' width='178' height='40'>
      <g id='car'>
        <svg
          viewBox='0 0 118 28.125'
          x='30'
          y='11.725'
          width='118'
          height='28.125'
        >
          <defs>
            <circle id='circle' cx='0' cy='0' r='1'></circle>

            <g id='wheel'>
              <use href='#circle' fill='#1E191A' transform='scale(10)'></use>
              <use href='#circle' fill='#fff' transform='scale(5)'></use>
              <path
                fill='#1E191A'
                stroke='#1E191A'
                strokeWidth='0.5'
                strokeLinecap='round'
                strokeLinejoin='round'
                opacity='0.2'
                strokeDashoffset='0'
                d='M -3.5 0 a 4 4 0 0 1 7 0 a 3.5 3.5 0 0 0 -7 0'
              ></path>
              <use href='#circle' fill='#1E191A' transform='scale(1.5)'></use>

              <path
                fill='none'
                stroke='#F9B35C'
                strokeWidth='0.75'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeDasharray='20 14 8 5'
                d='M 0 -7.5 a 7.5 7.5 0 0 1 0 15 a 7.5 7.5 0 0 1 0 -15'
              ></path>
              <path
                fill='none'
                stroke='#fff'
                strokeWidth='1'
                strokeLinecap='round'
                strokeLinejoin='round'
                opacity='0.1'
                strokeDashoffset='0'
                d='M -6.5 -6.25 a 10 10 0 0 1 13 0 a 9 9 0 0 0 -13 0'
              ></path>
            </g>
          </defs>

          <g transform='translate(51.5 11.125)'>
            <path
              strokeWidth='2'
              stroke='#1E191A'
              fill='#EF3F33'
              d='M 0 0 v -2 a 4.5 4.5 0 0 1 9 0 v 2'
            ></path>
            <rect fill='#1E191A' x='3.25' y='-3' width='5' height='3'></rect>
          </g>

          <g transform='translate(10 24.125)'>
            <g transform='translate(59 0)'>
              <path
                id='shadow'
                opacity='0.7'
                fill='#1E191A'
                d='M -64 0 l -4 4 h 9 l 8 -1.5 h 100 l -3.5 -2.5'
              ></path>
            </g>
            <path
              fill='#fff'
              stroke='#1E191A'
              strokeWidth='2.25'
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M 0 0 v -10 l 35 -13 v 5 l 4 0.5 l 0.5 4.5 h 35.5 l 30 13'
            ></path>

            <g
              fill='#fff'
              stroke='#1E191A'
              strokeWidth='2.25'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M -6 0 v -22 h 10 z'></path>
              <path d='M 105 0 h -3 l -12 -5.2 v 6.2 h 12'></path>
            </g>

            <g fill='#949699' opacity='0.7'>
              <rect x='16' y='-6' width='55' height='6'></rect>
              <path d='M 24 -14 l 13 -1.85 v 1.85'></path>
            </g>

            <g
              fill='none'
              stroke='#1E191A'
              strokeWidth='2.25'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path strokeDasharray='30 7 42' d='M 90 0 h -78'></path>
              <path d='M 39.5 -13 h -15'></path>
            </g>

            <path
              fill='#fff'
              stroke='#1E191A'
              strokeWidth='2.25'
              strokeLinejoin='round'
              d='M 48.125 -6 h -29 v 6 h 29'
            ></path>

            <rect
              x='48'
              y='-7.125'
              width='6.125'
              height='7.125'
              fill='#1E191A'
            ></rect>

            <g fill='#1E191A'>
              <rect x='60' y='-15' width='1' height='6'></rect>
              <rect x='56.5' y='-17.5' width='6' height='2.5'></rect>
            </g>
          </g>

          <g className='wheels' transform='translate(0 18.125)'>
            <g transform='translate(10 0)'>
              <use href='#wheel'></use>
            </g>

            <g transform='translate(87 0)'>
              <use href='#wheel' strokeDashoffset='-22'></use>
            </g>
          </g>
        </svg>
      </g>
    </svg>
  );
};

export default Loading;
