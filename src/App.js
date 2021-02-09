import React from 'react';
import {StatusBar} from 'react-native';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <>
      <Navigation />
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
    </>
  );
};

export default App;
