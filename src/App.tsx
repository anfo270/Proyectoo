import React, { useState } from 'react';
import { Login } from './components/login';
import { Footer } from './components/footer';
import AppointmentSystem from './components/citas';
import { Apii } from './components/apii';

const boton: React.CSSProperties = {
}
export function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLoginSuccess = () => {
    setIsUserLoggedIn(true);
  };

  const handleToggleView = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="App">
      {isUserLoggedIn ? (
        <>
          {showComments ? (
            <>
              <Apii />
              <button onClick={handleToggleView}style={boton}>Ver Citas</button>
            </>
          ) : (
            <>
              <AppointmentSystem />
              <button onClick={handleToggleView}>Ver Comentarios</button>
            </>
          )}
        </>
      ) : (
        <Login onSuccess={handleLoginSuccess} />
      )}
      <Footer />
    </div>
  );
}
