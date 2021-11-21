const express = require('express');
const router = express.Router();
const {spawn} = require('child_process');
const dbOperations = require('../db/dbOperations');
const fs = require('fs');

//todo: change storageDanit name
const multer = require('multer');
const storageDanit = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./server/imgProcessing/uploaded");
    },
    filename: function (req, file, cb) {
        cb(null, 'uploadedImg.jpg');
    }
});
const uploadDanit = multer({storage: storageDanit});

router.post("/saveImg", uploadDanit.single('uploadedFile'), async (req, res) => {
});

router.get("/", async (req, res) => {
    let warningLightsNum = req.query.warningLightsNum;
    let imgName = req.query.imgName;
    await runPythonIdentification(warningLightsNum, imgName, res);
})

router.get("/showResults", async (req, res) => {

    let resultsIds = req.query.resultsIds;
    let userName = req.query.userName ? req.query.userName : "";
    let data = await getIdentifiedLightsData(resultsIds, userName);
    res.send(data);
})

async function getIdentifiedLightsData(resultsIds, userName) {
    let warningLightsList = null;
    let warningLightsQuery = "select * from [dbo].[WarningLightsTbl] WHERE Id IN (" + resultsIds + ")";
    warningLightsList = await dbOperations.execQuery(warningLightsQuery);
    return warningLightsList;
}

async function runPythonIdentification(warningLightsNum, imgName, res) {
    const {spawn} = require('child_process');
    const pythonProcess = spawn('.\\server\\imgProcessing\\Python37\\python.exe', ['.\\server\\imgProcessing\\identifyWarningLights.py', warningLightsNum, imgName]);


    pythonProcess.stdout.on('data', (data) => {
        data = data.toString().replace('\r\n', '');
        res.end(data);

    });
}

//export this router to use in our index.js
module.exports = router;
