import React, { useState } from 'react';
import { Login } from './components/login';
import { Footer } from './components/footer';
import AppointmentSystem from './components/citas';
import { Dbrespuesta } from './components/bdrespuesta';

export function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsUserLoggedIn(true);
  };

  return (
    <div className="App">
      {isUserLoggedIn ? (
        <>
          <AppointmentSystem />
          <Dbrespuesta />
        </>
      ) : (
        <Login onSuccess={handleLoginSuccess} />
      )}
      <Footer />
    </div>
  );
}
