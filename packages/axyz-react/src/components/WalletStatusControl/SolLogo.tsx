import React from 'react';

const SolLogo: React.FC<React.SVGProps<SVGSVGElement> & { styles: React.CSSProperties }> = ({
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
    <g clipPath="url(#sol-clip-path-1)" fill="#DFE6F3">
      <path d="M4.624 10.106a.324.324 0 01.231-.098h7.981c.146 0 .219.18.116.285l-1.577 1.61a.324.324 0 01-.231.097H3.163c-.146 0-.219-.18-.116-.285l1.577-1.61zM4.624 4.098A.333.333 0 014.855 4h7.981c.146 0 .219.18.116.285l-1.577 1.61a.324.324 0 01-.231.097H3.163c-.146 0-.219-.18-.116-.285l1.577-1.61zM11.375 7.082a.324.324 0 00-.231-.097H3.163c-.146 0-.219.18-.116.285l1.577 1.609c.06.062.143.098.231.098h7.981c.146 0 .219-.18.116-.285l-1.577-1.61z" />
    </g>
    <defs>
      <clipPath id="sol-clip-path-1">
        <path fill="#fff" transform="translate(3 4)" d="M0 0h10v8H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SolLogo;
