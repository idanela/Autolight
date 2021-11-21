import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {initFavoriteList, listLights} from '../../actions/lightActions';
import {Box, Container, Grid, IconButton, InputBase, makeStyles, MenuItem, Popover, Tab, Tabs} from '@material-ui/core';
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SearchIcon from "@material-ui/icons/Search";
import AppsIcon from '@material-ui/icons/Apps';
import './WarningLights.css';
import WarningLightCard from "../WarningLightCard/WarningLightCard";

const useStyles = makeStyles((theme) => ({
    inputRoot: {
        color: "inherit"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "22ch"
        }
    },
}));


function WarningLights(props) {
    const classes = useStyles();
    const [expandedId, setExpandedId] = useState(-1);
    const [filter, setFilter] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const lightList = useSelector(state => state.lightList);
    const {lights, favorites, loading, error} = lightList;

    const handleSearchChange = (e) => {
        setFilter("Advanced");
        e.preventDefault();
        setAnchorEl(null);
        dispatch(listLights(searchKeyword));
    }

    const handleFilterChange = (e, value) => {
        setExpandedId(-1);

        if (value !== "Advanced") {
            setFilter(value);
            dispatch(listLights(value));
        } else {
            handleClick(e);
            setFilter(value);
        }
    };

    const handleClick = (event) => {
        setExpandedId(-1);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(listLights());
        if (localStorage.getItem("signedUser") !== null) {
            dispatch(initFavoriteList(JSON.parse(localStorage.getItem("signedUser")).Id))
        }
        return () => {
            //
        };
    }, [dispatch])


    return loading ? <div>Loading...</div> :
        error ? <div>{error}</div> :
            <Container>
                {/* Header */}
                <Box className="headerBox" fontSize={32}> Search Warning Lights By Filters </Box>

                {/* Filters */}
                <Tabs
                    classes={{root: "tabRoot", scroller: "scroller"}}
                    onChange={handleFilterChange}
                    value={filter}
                    indicatorColor="primary"
                    aria-label="icon label tabs example"
                    variant={"scrollable"}
                    scrollButtons={"on"}
                >
                    <Tab
                        value=""
                        icon={<AppsIcon style={{fill: "black"}}/>}
                        label="All"
                    />
                    <Tab
                        value="Red"
                        icon={<FiberManualRecordIcon style={{fill: "red"}}/>}
                        label="Red"
                    />
                    <Tab
                        value="Green"
                        icon={<FiberManualRecordIcon style={{fill: "green"}}/>}
                        label="Green"
                    />
                    <Tab
                        value="Yellow"
                        icon={<FiberManualRecordIcon style={{fill: "orange"}}/>}
                        label="Yellow"
                    />
                    <Tab
                        value="Blue"
                        icon={<FiberManualRecordIcon style={{fill: "blue"}}/>}
                        label="BLUE"
                    />
                    <Tab
                        value="Common"
                        icon={<StarBorderIcon style={{fill: "black"}}/>}
                        label="Common"
                    />
                    <Tab
                        value="Advanced"
                        icon={<MoreHorizIcon style={{fill: "black"}}/>}
                        label="Advanced"
                    />
                </Tabs>

                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center"
                    }}
                >
                    <MenuItem>
                        <form onSubmit={handleSearchChange} className="form">
                            <InputBase
                                onChange={e => setSearchKeyword("ByText" + e.target.value)}
                                placeholder="Search by contained text"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                inputProps={{"aria-label": "search"}}
                            />
                            <IconButton type="submit" aria-label="search">
                                <SearchIcon/>
                            </IconButton>
                        </form>
                    </MenuItem>
                    <MenuItem>
                        <form onSubmit={handleSearchChange} className="form">
                            <InputBase
                                onChange={e => setSearchKeyword("ByName" + e.target.value)}
                                placeholder="Search by name"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                inputProps={{"aria-label": "search"}}
                            />
                            <IconButton type="submit" aria-label="search">
                                <SearchIcon/>
                            </IconButton>
                        </form>
                    </MenuItem>
                </Popover>

                {/* Lighs cards */}
                <Grid container spacing={3} className="rootGrid">
                    {
                        lights && lights.map((light, i) =>
                             <WarningLightCard
                                key={light.Id}
                                light = {light}
                                favorites = {favorites}
                                i= {i}
                                user= {props.user}
                            />
                   )}
                </Grid>
            </Container>
}

export default WarningLights;



