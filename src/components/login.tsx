import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

export const Login: React.FC<{ onSuccess: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void }> = ({ onSuccess }) => {
    const clientId = "158206345264-t5i4d9abt17i42tf4qrn3a74eit9aebd.apps.googleusercontent.com";
  const [user, setUser] = useState<{ imageUrl?: string; name?: string }>({});

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientId,
      });
    };

    gapi.load("client:auth2", start);
  }, []);

  const handleGoogleLoginSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    handleSuccess(response);
  };

  const handleSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ("profileObj" in response) {
      setUser(response.profileObj);
      if (onSuccess) {
        onSuccess(response);
      }
    }
  };
  const onFailure = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response);
  };

  return (
    <div style={pageStyle}>
      <div style={welcomeBoxStyle}>
        <h1>Bienvenido a Nicestyle</h1>
        <p>Explora nuestro mundo de estilo y belleza.</p>
      </div>
      <div>
        <GoogleLogin
          clientId={clientId}
          onSuccess={handleGoogleLoginSuccess}
          onFailure={onFailure}
          cookiePolicy="single_host_origin"
        />
      </div>
    </div>
  );
};

const pageStyle: React.CSSProperties = {
  background: 'url("https://cdn.pixabay.com/photo/2015/07/07/11/36/haircut-834280_1280.jpg")', 
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  minHeight: '75vh', 
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const welcomeBoxStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.8)', 
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
};
