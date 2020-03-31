import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const Main = () => {
    const [currentWeather, setCurrentWeather] = useState('');

    useEffect(async () => {
        const response = await api.get('/weather/getCurrentWeather');

        console.log(response);
        setCurrentWeather(response.data);
    }, []);

    return (
        <h2>Página Principal { currentWeather }</h2>
    );
}

export default Main;