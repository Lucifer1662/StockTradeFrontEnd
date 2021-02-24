import React from 'react';
import { PlaceOrder } from './PlaceOrder';
import OrdersVeiw from './OrdersView';
import { Header } from './Header';
import { Container, createMuiTheme, CssBaseline, Grid, Paper, ThemeProvider, Typography } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import { OrderProvider } from '../state/orders';
import { UserFundsProvider } from '../state/UserFunds';
import { UserFunds } from './UserFunds';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  }
});

function App() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <OrderProvider>
          <UserFundsProvider>
            {isAuthenticated && <Container>
              <Grid xs={12} container spacing={3}>

                <Grid item xs={3} />
                <Grid item xs={6}>
                  <UserFunds />
                </Grid>
                <Grid item xs={3} />

                <Grid item xs={3} />
                <Grid item xs={6}>
                  <PlaceOrder />
                </Grid>
                <Grid item xs={3} />

                <Grid item xs={12} />

                <Grid item xs={3} />
                <OrdersVeiw />
                <Grid item xs={3} />
              </Grid>
            </Container>}
            {!isAuthenticated && <div>
              <Grid xs={12} container spacing={3}>

                <Grid item xs={3} />
                <Grid item xs={6}>
                  <Typography variant="h5"> Test Account</Typography>
                  <Typography variant="body1">Email: test@test.com</Typography>
                  <Typography variant="body1">Password: Test@123</Typography>
                </Grid>
                <Grid item xs={3} />
              </Grid>
            </div>
            }
          </UserFundsProvider>
        </OrderProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
