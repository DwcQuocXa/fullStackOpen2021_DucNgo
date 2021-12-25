const express = require("express");

const { findAll } = require("../controllers/User");
const { createUser } = require("../controllers/User");

const router = express.Router();

router.get("/", findAll);
router.post("/", createUser);

module.exports = router;
