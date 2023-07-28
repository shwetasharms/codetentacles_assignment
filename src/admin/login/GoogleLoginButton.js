import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router';
import { setToken } from '../../_helper/secureToken';

function GoogleLoginButton() {
  let navigate=useNavigate()
  return (
<div style={{textAlign:"center", display:"flex", justifyContent:"center"}}>
      <GoogleOAuthProvider clientId="312833596109-vg9mh7uf5fo8b8jl6udemps5jkvs27fv.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={credentialResponse => {
            setToken(credentialResponse.credential)
            navigate("/")
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>
      </div>
  )
}

export default GoogleLoginButton
