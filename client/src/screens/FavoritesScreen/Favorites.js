import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {listFavorites} from '../../actions/lightActions';
import {Box, Container, Grid} from '@material-ui/core';

import './Favorites.css';
import WarningLightCard from "../WarningLightCard/WarningLightCard";

function Favorites(props) {
    const favoritesList = useSelector(state => state.lightList);
    const { favorites, loading, error} = favoritesList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listFavorites());
        return () => {
            //
        };
    }, [dispatch])


    return loading ? <div>Loading...</div> :
        error ? <div>{error}</div> :
            <Container>
                {/* Header */}
                <Box className="headerBox" fontSize={32}>My Favorite Warning Lights </Box>
                {/* Lights cards */}
                <Grid container spacing={3} className="rootG">
                    {
                        favorites && favorites.map((light, i) =>
                                <WarningLightCard
                                    key={i}
                                    light = {light}
                                    favorites = {favorites}
                                    i= {i}
                                    user= {props.user}
                                />
                    )}
                </Grid>
            </Container>
}

export default Favorites;
