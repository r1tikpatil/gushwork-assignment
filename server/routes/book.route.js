const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const { addBook } = require("../controllers/book.controller");

router.post("/add", authentication, addBook);

module.exports = router;
