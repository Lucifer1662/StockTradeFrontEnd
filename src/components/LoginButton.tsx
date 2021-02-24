import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button color='inherit' onClick={() => loginWithRedirect()}>Log In/Sign Up</Button>;
};

export default LoginButton;