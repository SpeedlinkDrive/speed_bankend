const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const {login, createUser, getMe, getMeOnRefresh} = require('../controllers/AuthController');
const {checkToken} = require("../middlewares/ValidateToken");
const {getGoogleData, checkLinkExpire} = require("../middlewares/Generals");
const {addRecord, updateRecord, getRecord, getSubmissionById,getUploadRecordById, getRecordById, getSettingById, refresh, sendmail, checkId, getSubmissionCount} = require('../controllers/CreateController');
const { submitAndUpdate, checkOnline, submitReplies } = require('../controllers/SubmitController');


// check token valid 
// this endpoint runs frequently in the background after every login
router.get('/check', checkToken, getMe)
router.get('/checkonrefresh', checkToken, getMeOnRefresh)

// Create upload request
// observe the chcekToken middleware to see if the user is logged in and
// is passing the right access token 
// getGoogleData middleware also gets the google access from the DB
router.post('/create', checkToken, getGoogleData, addRecord)

// getGoogleData middleware also gets the google access from the DB
router.put('/update', checkToken, getGoogleData, updateRecord)

// get all of a users rcords upload request 
router.get('/getrecords', checkToken, getRecord)

// get submission count for each record
router.get('/getSubmissionCount', checkToken, getSubmissionCount)

// get url record by id
router.get('/getrecordbyid/:id', checkToken, getRecordById)

//get submissions by ID
router.get('/getSubmissionById/:record_id', checkToken, getSubmissionById)

// get form/upload/record data by the record ID
router.get('/getUploadRecordById/:record_id', getUploadRecordById)

// get these records and settings details when the user is trying to upload files
router.get('/getrecordbyidnoauth/:id', getRecordById)
router.get('/getsettingbyidnoauth/:id', getSettingById)
router.get('/refresh', refresh)

// router.get('/getsettingbyidnoauth/:id', getSettingById)
// run this code to check the status of the resumable upload,
// how much byte has been uploaded and
// where to continue from.
router.post('/checkonline', checkOnline)


// check if record is expired or is completed.
// check this using middleware.
// submit the image data url and downloadable url and update the record field with this
router.put('/submitAndUpdate', submitAndUpdate)

// This route submits the form replies to the database
router.post('/submitReplies',checkLinkExpire, submitReplies)

//This route is for mails
router.get('/sendmail', sendmail)

//This route handles checks for form id, and returns a boolean if th id if found or not
// it also has a middleware that does so as form is being submittd
router.get('/checkId/:request_id',checkToken, checkId)



module.exports = router