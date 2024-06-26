const express = require('express');
const router = express.Router();
const {checkToken} = require("../middlewares/ValidateToken");
const {getGoogleData, checkLinkExpire} = require("../middlewares/Generals");
const {addRecord, getRecord, getRecordById, getSettingById, submitUpload, refresh} = require('../controllers/CreateController');
const { submitAndUpdate, checkOnline } = require('../controllers/SubmitController');


// save upload request
// observe the chcekToken middleware to see if the user is logged in and
// is passing the right access token 
// getGoogleData middleware also gets the google access from the DB
router.post('/saveUploadRequest', checkToken, getGoogleData, addRecord)

// get all of a users rcords upload request 
router.get('/getUploadRequest', checkToken, getRecord)

// get url record by id
router.get('/getUploadRequestByurl/:id', checkToken, getRecordById)


// check if record is expired or is completed.
// check this using middleware.
// if it is completed or expired dont submit, return status 301 or 303
router.post('/submitAndUpdate',checkLinkExpire, submitAndUpdate)

// this route isnt functional, discard
router.post('/submitupload', upload.single('file'), submitUpload)



module.exports = router