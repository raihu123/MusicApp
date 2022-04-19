const express = require("express");
const authenticationController = require("../controller/authenticationController");


const router = express.Router();

router.post('/', authenticationController.login);
router.post('/logout', authenticationController.logout);

module.exports = router;
