import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";

export const Login = () => {
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

  const onSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ("profileObj" in response) {
      setUser(response.profileObj);
    }
  };

  const onFailure = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response);
  };

  return (
    <>
      <GoogleLogin
        clientId={clientId}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
      />
      <div className={user.imageUrl ? "profile" : "hidden"}>
        {user.imageUrl && <img src={user.imageUrl} alt="" />}
        {user.name && <h3>{user.name}</h3>}
      </div>
    </>
  );
};
