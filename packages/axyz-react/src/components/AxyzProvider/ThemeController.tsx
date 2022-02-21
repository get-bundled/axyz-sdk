import { changeTheme } from '@nextui-org/react';
import React, { useEffect } from 'react';

interface Props {
  darkMode: boolean;
}

const ThemeController: React.FC<Props> = ({ darkMode }) => {
  useEffect(() => {
    changeTheme(darkMode ? 'dark' : 'light');
  }, [darkMode]);
  return null;
};

export default ThemeController;
