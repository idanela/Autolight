const express = require("express");
const router = express.Router();
const dbOperations = require('../db/dbOperations');
const sql = require("mssql");
const sqlConfig = require("../db/dbconfig");

router.get('/signin', async (req, res) => {
    let id = req.query.userId;
    let favoritesQuery = "SELECT WarningLightId FROM [dbo].[Favorites] WHERE UserId='" + id + "'";
    let pool = await sql.connect(sqlConfig);
    let favoritesResult = await pool.request().query(favoritesQuery);
    res.send(favoritesResult.recordset);
})
router.post('/signin', async (req, res) => {

    const userName = req.body.userName;
    const password = req.body.password;
    let signinUser = await queryUser(userName, password);
    if (signinUser) {
        res.send({
            Id: signinUser.Id,
            UserName: signinUser.UserName,
            IsAdmin: signinUser.IsAdmin,
        });

    } else {
        res.status(401).send('Incorrect user name or password');
    }
});

async function queryUser(userName, password) {
    try {
        let queryToExecute = "select * from [autoLightDb].[dbo].[Users] WHERE userName = '" + userName + "' AND Password='" + password + "'";
        let data = await dbOperations.execQuery(queryToExecute);
        let curUserData = data[0];
        return curUserData;
    } catch (error) {
        console.log(error);
    }
}

//export this router to use in our index.js
module.exports = router;
