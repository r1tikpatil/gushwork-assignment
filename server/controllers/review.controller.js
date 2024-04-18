const Review = require("../models/review.model");

exports.addReview = async (req, res) => {
  try {
    const { rating, comment, bookId } = req.body;
    const loggedInUser = req.user;
    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    await Review.create({
      user: loggedInUser._id,
      rating,
      comment,
      bookId,
    });

    return res.status(400).json({
      success: true,
      message: "Thanks for reviewing.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Book must be exist.",
      });
    }

    const review = await Review.find(
      {
        bookId: id,
      },
      { user: 1, rating: 1, comment: 1 }
    ).populate({
      path: "user",
      select: "name",
    });

    return res.status(400).json({
      success: true,
      message: "Thanks for reviewing.",
      data: { reviews: review },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};
