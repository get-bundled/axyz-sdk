import { CSS, styled } from '@nextui-org/react';
import React from 'react';

interface Props {
  css?: CSS;
}

const Div = styled('div');

const Box: React.FC<Props> = ({ css, children }) => <Div css={css}>{children}</Div>;

export default Box;
