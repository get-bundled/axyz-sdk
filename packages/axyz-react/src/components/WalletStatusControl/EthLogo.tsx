import React, { CSSProperties } from 'react';

const EthLogo: React.FC<React.SVGProps<SVGSVGElement> & { styles: CSSProperties }> = ({
  styles,
  ...props
}) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={styles}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    <rect width={16} height={16} rx={2} fill="#9FB2DE" />
    <g clipPath="url(#prefix__clip0_1154_375)" fill="#DFE6F3">
      <path d="M7.998 2l-.08.273v7.935l.08.08 3.683-2.177L7.998 2z" />
      <path d="M7.999 2L4.315 8.111 8 10.288V2zM7.998 10.986l-.045.055v2.826l.045.133 3.686-5.19-3.685 2.176z" />
      <path d="M7.999 14v-3.014L4.315 8.81 8 14zM7.999 10.289l3.683-2.178L8 6.437v3.852z" />
      <path d="M4.315 8.111L8 10.29V6.437L4.315 8.111z" />
    </g>
    <defs>
      <clipPath id="prefix__clip0_1154_375">
        <path fill="#fff" transform="translate(2 2)" d="M0 0h12v12H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default EthLogo;
