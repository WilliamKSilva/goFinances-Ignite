import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import React, { useState, useContext } from 'react'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';


import { Register } from './src/screens/Register';


import { SwitchContextProvider } from './src/context/SwitchContext'
import { Teste } from './src/components/teste/teste';


export default function App() {

  const [fontLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold

  });

  if (!fontLoaded) {
    return <AppLoading />
  }
  return (
    <SwitchContextProvider>
        <Register />
    </SwitchContextProvider>
        
  );
}


