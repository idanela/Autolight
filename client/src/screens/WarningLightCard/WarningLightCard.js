import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    Grid,
    IconButton,
    makeStyles,
    Typography
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import FavoriteIcon from "@material-ui/icons/Favorite";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, {useState} from "react";
import {addToFavoritesAction, removeFromFavoritesAction} from "../../actions/lightActions";
import {useDispatch} from 'react-redux';
import './WarningLightCard.css';

const useStyles = makeStyles((theme) => ({

    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandText: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));




const WarningLightCard = ({light, favorites,i,user}) => {

    const [expandedId, setExpandedId] = useState(-1);


    const handleFavorites = (warningLightid) => {
        // Add to favorites
        if (favorites.findIndex(favorites => favorites.WarningLightId === warningLightid) === -1) {
            dispatch(addToFavoritesAction(warningLightid));
        } else // Remove from favorites
        {
            dispatch(removeFromFavoritesAction(warningLightid));
        }
    }

    const handleExpandClick = (i) => {
        setExpandedId(expandedId === i ? -1 : i);
    };

    const dispatch = useDispatch();
    const classes = useStyles();


    return(<Grid item xs={7} sm={5} md={3} key={light.Id + light.Name}>
        <Card className="rootCard" key={light.Id}>
            <CardHeader className="title"
                        title={light.Name}/>
            <CardMedia className="media" style={{display: 'flex'}}
                       title={light.Name}>
                <img className="img" src={light.displayImgPath} alt={light.Name}/>
            </CardMedia>

            <CardActions disableSpacing>

                {user !== "" ?

                    (<IconButton onClick={() => handleFavorites(light.Id)}
                                 aria-label="add to favorites">
                        {favorites.findIndex(favorites => favorites.WarningLightId === light.Id) > -1 ?
                            (<Tooltip title="remove from favorites">
                                    <FavoriteIcon style={{fill: "red"}}/>
                                </Tooltip>
                            ) : (
                                <Tooltip title="add to favorites">
                                    <FavoriteIcon/>
                                </Tooltip>
                            )}

                    </IconButton>) : (<div/>)}

                <Box textAlign="right"
                     className={clsx(classes.expandText)}
                >
                    {expandedId === i ? "Hide info" : "Show info"}
                </Box>

                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expandedId === i,
                    })}
                    onClick={() => handleExpandClick(i)}
                    aria-expanded={expandedId === i}
                    aria-label="show more">
                    <ExpandMoreIcon/>
                </IconButton>

            </CardActions>
            <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
                <CardContent className="cardContant">
                    <Box className="titleBox">Explanation:</Box>
                    <Typography paragraph>
                        {light.Explanation}
                    </Typography>
                    <Box className="titleBox">Recommendation:</Box>
                    <Typography paragraph>
                        {light.Recommendation}
                    </Typography>
                    <Box className="titleBox">Severity:</Box>
                    <Typography paragraph>
                        {light.Severity}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    </Grid>
    )};

export default WarningLightCard;
