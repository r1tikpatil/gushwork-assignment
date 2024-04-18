const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const { addBook, getAllBook } = require("../controllers/book.controller");

router.post("/add", authentication, addBook);
router.get("/allBooks", authentication, getAllBook);

module.exports = router;
