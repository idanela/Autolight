const express = require("express");
const favoritesRouter = express.Router();

var sqlConfig = require('../db/dbconfig');
const sql = require('mssql');

favoritesRouter.get('/', async (req, result) => {

    let userId = req.query.userId;
    let results = await getFavoritesList(userId);
    result.send(results.recordset);
});


favoritesRouter.post('/', async (req, result) => {

    let userId = req.body.userId;
    let favWarningLightId = req.body.warningLightId;
    await addToFavorites(userId, favWarningLightId);

    result.send({
        WarningLightId: favWarningLightId,
    });
});

favoritesRouter.delete('/', async (req, result) => {
    let userId = req.query.userId;
    let favWarningLightId = req.query.warningLightId;

    await removeFromFavorites(userId, favWarningLightId);

    result.send({
        WarningLightId: favWarningLightId,
    });
});

async function addToFavorites(userId, favWarningLightId) {
    try {
        let pool = await sql.connect(sqlConfig);
        let queryToExecute = "INSERT INTO [autoLightDb].[dbo].[favorites] (UserId, WarningLightId) VALUES ("
            + userId + ","
            + "'" + favWarningLightId + "'"
            + ")"

        await pool.request().query(queryToExecute);
        /*}*/
    } catch (error) {
        console.log(error);
    }
}

async function removeFromFavorites(userId, favWarningLightId) {
    try {
        let pool = await sql.connect(sqlConfig);
        // Remove warning light from favorites
        let queryToExecute = "DELETE FROM [autoLightDb].[dbo].[favorites] WHERE WarningLightId='" + favWarningLightId + "' AND UserId='" + userId + "'";

        await pool.request().query(queryToExecute);
    } catch (error) {
        console.log(error);
    }
}

async function getFavoritesList(userId) {
    try {
        let pool = await sql.connect(sqlConfig);

        let queryToExecute = "SELECT F.WarningLightId , W.* FROM [autoLightDb].[dbo].[Favorites] F JOIN [autoLightDb].[dbo].[WarningLightsTbl] W ON F.WarningLightId=W.Id  WHERE F.UserId='" + userId + "'";
        let results = await pool.request().query(queryToExecute);
        return results;

    } catch (error) {
        console.log(error);
    }
}


module.exports = favoritesRouter;
