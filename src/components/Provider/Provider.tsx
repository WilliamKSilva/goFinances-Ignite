import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import { useState } from 'react'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';


import React, { useContext } from 'react';

import { Dashboard } from '../../screens/dashboard';
import { Register } from '../../screens/Register';

import { SwitchContext } from '../../context/SwitchContext';





export function Provider() {
  const { theme, toggleTheme } = useContext(SwitchContext)
  
  return (
    <ThemeProvider theme={theme}>
      <Register />
    </ThemeProvider>
  );
}


