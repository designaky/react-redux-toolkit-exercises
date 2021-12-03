import React from 'react';
import PhoneKeypad from './components/PhoneKeypad';
import PhoneScreen from './components/PhoneScreen';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <PhoneScreen />
      <PhoneKeypad />
    </div>
  );
}

export default App;
