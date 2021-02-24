import { AppBar, Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import LoginButton from "./LoginButton";
import MenuIcon from '@material-ui/icons/Menu';
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";


export function Header(){
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    return <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" style={{flexGrow: 1}}>
      News
    </Typography>
    
    {isAuthenticated ? <LogoutButton/> : <LoginButton/> }
  </Toolbar>
</AppBar>
}