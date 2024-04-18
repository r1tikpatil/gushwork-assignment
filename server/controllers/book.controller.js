const Book = require("../models/book.model");

exports.addBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    if (!title || !author || !genre) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    await Book.create({
      title,
      author,
      genre,
      reviews: [],
    });

    return res.status(400).json({
      success: true,
      message: "Book added successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};
