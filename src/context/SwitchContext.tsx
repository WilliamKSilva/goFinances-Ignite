import React, { createContext, ReactNode, useState } from 'react';
import { DefaultTheme } from 'styled-components';
import { dark } from '../global/styles/dark';
import { light } from '../global/styles/light';

type Props ={
  theme: DefaultTheme;
  toggleTheme: () => void;
}

type SwitchContextProps ={
  children: ReactNode,
}

export const SwitchContext = createContext({} as Props)

export const SwitchContextProvider = ({ children }: SwitchContextProps) => {
  const [theme, setTheme] = useState(light);

  const toggleTheme = () => {
    setTheme(theme === light ? dark : light);
  }


  return (
    <SwitchContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </SwitchContext.Provider>
  )
}
