const express = require("express");

const { test } = require("../controllers/Test");

const router = express.Router();

router.post("/reset", test);

module.exports = router;
