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

import React from 'react';
import { Dashboard } from './src/screens/dashboard';

import { light } from './src/global/styles/light';
import { dark } from './src/global/styles/dark';
import { Button } from 'react-native';


export default function App() {
  const [theme, setTheme] = useState(light);

  const toggleTheme = () => {
    setTheme(theme === light ? dark : light);
  }
  const [fontLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold

  });

  if (!fontLoaded) {
    return <AppLoading />
  }
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
      <Button onPress={toggleTheme} title={"BOTAO"}/>
    </ThemeProvider>

  );
}


