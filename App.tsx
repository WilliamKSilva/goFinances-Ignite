import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';  

import {
  useFonts, 
  Poppins_400Regular, 
  Poppins_500Medium, 
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import React from 'react';
import { Register } from './src/screens/Register';

import theme from './src/global/styles/theme';

export default function App() { 
  const [fontLoaded] = useFonts({
    Poppins_400Regular, 
    Poppins_500Medium, 
    Poppins_700Bold

  });

  if(!fontLoaded){
    return <AppLoading />
  }
  return (
    <ThemeProvider theme={theme}>
        <Register />
    </ThemeProvider>
        
  );
}


