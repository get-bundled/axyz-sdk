import React from 'react';

interface Props {
  width?: number | string;
  height?: number | string;
}

const Coinbase: React.FC<Props> = ({ width = 40, height = 40 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 128 128"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={{ borderRadius: '20px' }}
    className="coinbase-logo"
  >
    <defs>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="coinbase-gradient">
        <stop stopColor="#2E66F8" offset="0%" />
        <stop stopColor="#124ADB" offset="100%" />
      </linearGradient>
      <circle id="coinbase-circle" cx={59.928} cy={59.928} r={59.928} />
    </defs>
    <g fill="none" fillRule="evenodd">
      <path fill="#FFF" fillRule="nonzero" d="M0 0h128v128H0z" />
      <path fill="#FFF" fillRule="nonzero" d="M0 0h128v128H0z" />
      <path d="M0 0h128v128H0z" />
      <path
        d="M19 64c0 24.853 20.147 45 45 45s45-20.147 45-45-20.147-45-45-45-45 20.147-45 45zm33.5-14.5a3 3 0 0 0-3 3v23a3 3 0 0 0 3 3h23a3 3 0 0 0 3-3v-23a3 3 0 0 0-3-3h-23z"
        fill="#FFF"
      />
      <g transform="translate(4 4)">
        <mask id="coinbase-mask" fill="#fff">
          <use xlinkHref="#coinbase-circle" />
        </mask>
        <g mask="url(#coinbase-mask)">
          <path d="M0 0h119.856v119.856H0z" />
          <rect
            fill="url(#coinbase-gradient)"
            fillRule="nonzero"
            width={119.856}
            height={119.856}
            rx={48}
          />
          <path
            d="M24.97 59.928c0 19.307 15.651 34.958 34.958 34.958s34.958-15.651 34.958-34.958S79.235 24.97 59.928 24.97 24.97 40.62 24.97 59.928zm26.024-11.264a2.33 2.33 0 0 0-2.33 2.33v17.868a2.33 2.33 0 0 0 2.33 2.33h17.868a2.33 2.33 0 0 0 2.33-2.33V50.994a2.33 2.33 0 0 0-2.33-2.33H50.994z"
            fill="#FFF"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default Coinbase;
