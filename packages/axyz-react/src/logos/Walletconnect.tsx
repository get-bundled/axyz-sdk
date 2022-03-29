import React from 'react';

interface Props {
  width?: number | string;
  height?: number | string;
}

const Walletconnect: React.FC<Props> = ({ width = 40, height = 40 }) => (
  <svg width={width} height={height} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <radialGradient id="a" cx="0%" cy="50%" r="100%">
      <stop offset={0} stopColor="#5d9df6" />
      <stop offset={1} stopColor="#006fff" />
    </radialGradient>
    <g fill="none" fillRule="evenodd">
      <path
        d="M256 0c141.385 0 256 114.615 256 256S397.385 512 256 512 0 397.385 0 256 114.615 0 256 0z"
        fill="url(#a)"
      />
      <path
        d="M162.692 197.709c51.533-50.279 135.084-50.279 186.617 0l6.202 6.05a6.327 6.327 0 0 1 0 9.105l-21.216 20.7a3.357 3.357 0 0 1-4.666 0l-8.535-8.328c-35.95-35.075-94.238-35.075-130.188 0l-9.14 8.918a3.357 3.357 0 0 1-4.666 0l-21.216-20.7a6.327 6.327 0 0 1 0-9.104zm230.493 42.809 18.883 18.422a6.327 6.327 0 0 1 0 9.104l-85.142 83.07c-2.577 2.514-6.754 2.514-9.33 0l-60.43-58.957a1.679 1.679 0 0 0-2.332 0l-60.427 58.958c-2.576 2.513-6.754 2.514-9.33 0l-85.145-83.072a6.327 6.327 0 0 1 0-9.104l18.883-18.422c2.576-2.514 6.754-2.514 9.33 0l60.43 58.958a1.679 1.679 0 0 0 2.332 0l60.427-58.958c2.576-2.514 6.754-2.514 9.33 0l60.43 58.958a1.679 1.679 0 0 0 2.332 0l60.428-58.957c2.577-2.514 6.755-2.514 9.331 0z"
        fill="#fff"
        fillRule="nonzero"
      />
    </g>
  </svg>
);

export default Walletconnect;
