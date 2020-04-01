import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Typography, Grid, Box, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

const Main = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [currentTemp, setCurrentTemp] = useState(0);
    const [currentUmidity, setCurrentUmidity] = useState(0);
    const [currentIsRaining, setCurrentIsRaining] = useState(false);
    const [currentUvIndex, setCurrentUvIndex] = useState(0);
    
    const [error, setError] = useState('');

    useEffect(() => {
        const loadWeatherData = async () => {
            const response = await api.get('/weather/getCurrentWeather');
            
            if (response.data.success) {
                if (response.data.content.weather) {
                    const weather = response.data.content.weather;

                    if (weather.dateTime)
                        setCurrentDateTime(weather.dateTime);
                    if (weather.temp)
                        setCurrentTemp(weather.temp);
                    if (weather.umidity)
                        setCurrentUmidity(weather.umidity);
                    if (weather.raining)
                        setCurrentIsRaining(weather.raining);
                    if (weather.uvIndex)
                        setCurrentUvIndex(weather.uvIndex);
                }
            }    
            else
                setError(response.data.content);
        }
        
        loadWeatherData();
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box my="10vh">
                        <Typography variant="h1" align="center" gutterBottom>{ currentTemp }°C</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <List>
                            <ListItem>
                                <ListItemText primary="Umidade:"/>
                                <ListItemText primary={ currentUmidity + "%" } />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Chuva:"/>
                                <ListItemText primary={ currentIsRaining ? "Sim" : "Não"} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Índice UV:"/>
                                <ListItemText primary={ currentUvIndex } />
                            </ListItem>
                        </List>
                    </div>
                </Grid>
                <Typography variant="h6" color="error" gutterBottom>{ error }</Typography>
            </Grid>
        </div>
    );
}

export default Main;