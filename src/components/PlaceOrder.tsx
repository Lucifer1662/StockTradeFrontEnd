import { useAuth0 } from '@auth0/auth0-react';
import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography, colors, ThemeProvider, createMuiTheme, Card, CardContent } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { usePlaceOrder } from '../api/placeOrder';
import { useUserId } from '../api/useUserId';
import { OrderData } from '../interfaces/Order';
import { OrderContext } from '../state/orders';


const theme = createMuiTheme({
    palette: {
        primary: colors.green,
        secondary: colors.red
    },
});

function parseIntNan(v: string) {
    const n = parseInt(v);
    
    if (isNaN(n)) {
        return undefined
    } else {
        return n;
    }
}

export function PlaceOrder() {
    const placeOrder = usePlaceOrder();
    const uid = useUserId();
    const [state, setState] = React.useState<any>({ stock: 'VAS', price: 20, volume: 1});


    const handleStockCode = (e: any) => setState({ ...state, stock: e.target.value })
    const handlePrice = (e: any) => setState({ ...state, price: Number(e.target.value) })
    const handleVolume = (e: any) => setState({ ...state, volume: parseIntNan(e.target.value) })

    const buyOrder = () => {
        if(state.stock && state.price && state.volume){
            placeOrder({...state, isBuy:true, uid:uid});
        }
    }

    const sellOrder = () => {
        if(state.stock && state.price && state.volume){
            placeOrder({...state, isBuy:false, uid:uid});
        }
    }
    

    console.log(state)


    return <Card>
        <CardContent>
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Payment method
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <TextField required label="Stock Code" fullWidth onChange={handleStockCode} value={state.stock}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField required id="price" label="Price" fullWidth onChange={handlePrice} value={state.price} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            type="number"
                            required
                            id="volume"
                            label="Volume"
                            helperText="number of stocks"
                            fullWidth
                            value={state.volume}
                            onChange={handleVolume}
                        />
                    </Grid>
                    <Grid justify='space-evenly' container>
                        <ThemeProvider theme={theme}>
                            <Button variant='contained' color="primary" onClick={buyOrder}>Buy Order</Button>
                            <Button variant='contained' color="secondary" onClick={sellOrder}>Sell Order</Button>
                        </ThemeProvider>
                    </Grid>
                </Grid>
            </React.Fragment>
        </CardContent>
    </Card>


}