import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {showResultsAction} from '../../actions/identifyWarningLightsInDashboardActions';
import {Box, Container, Grid} from '@material-ui/core';

import './IdentificationResultsScreen.css';
import WarningLightCard from "../WarningLightCard/WarningLightCard";

function IdentificationResultsScreen(props) {

    const identificationResults = useSelector(state => state.lightList);
    const {lights, favorites} = identificationResults;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(showResultsAction(props.location.state.resultIds));
    })


    return <Container>
        <Box className="headerBox" fontSize={32}> Recognized Warning Lights </Box>

        <div className="resultsTop">
            <img className="resuslt" key={Date.now()} src={props.location.state.imgPath} alt="dashboard-img"/>
        </div>

        <Grid container spacing={3} className="rootG">
            {
                lights && lights.map((warningLight, i) =>
                        <WarningLightCard
                                key={warningLight.Id}
                                light = {warningLight}
                                favorites = {favorites}
                                i= {i}
                                user= {localStorage.getItem("signedUser")}
                            />
                )}
        </Grid>
    </Container>

}

export default IdentificationResultsScreen;
