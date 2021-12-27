const express = require("express");

const { login } = require("../controllers/Login");

const router = express.Router();

router.post("/", login);

module.exports = router;
