import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";

import Loader from "../../common/components/Loader/Loader";
import { getBookDetail, addReview } from "../../APIs/bookAPIs";
import { AuthContext } from "../../context/auth.context";

export default function BookDetails() {
  const params = useParams();
  const bookId = params.id;
  const { isLoggedIn } = useContext(AuthContext);
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const submitReview = async () => {
    if (rating === 0 || comment.trim() === "") {
      toast.error("Please provide a rating and comment before submitting.");
      return;
    }

    try {
      const data = { rating, comment, bookId };
      const res = await addReview(data);
      if (res.success) {
        fetchData();
      }
    } catch (error) {
      toast.error(error.message);
    }

    setRating(0);
    setComment("");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getBookDetail(bookId);
      if (res.success) {
        setBookDetails(res.data);
        setReviews(res.data.reviews);
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  function getInitials(name) {
    const nameArray = name.split(" ");
    const initials = nameArray
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
    return initials;
  }

  if (loading || bookDetails === null) {
    return <Loader />;
  }
  return (
    <div className="flex-col py-10 w-full">
      <h1 className="text-4xl mt-5 font-bold text-center text-gray-800">
        Book Details
      </h1>

      <div className="rounded-lg  p-8 w-full ">
        <div className="text-xl my-4 text-center">
          <p className="mb-2">
            <span className="font-semibold text-blue-600">Title:</span>{" "}
            <span className="italic">{bookDetails.title}</span>
          </p>
          <p className="mb-2">
            <span className="font-semibold text-blue-600">Author:</span>{" "}
            <span className="italic">{bookDetails.author}</span>
          </p>
          <p className="mb-2">
            <span className="font-semibold text-blue-600">Genre:</span>{" "}
            <span className="italic">{bookDetails.genre}</span>
          </p>
        </div>

        <div className="my-6">
          <p className="text-lg font-semibold mb-2">Description:</p>
          <div className="text-gray-700">
            <p className="mb-4">
              {bookDetails.description.substring(
                0,
                bookDetails.description.length / 2
              )}
            </p>
            <p>
              {bookDetails.description.substring(
                bookDetails.description.length / 2
              )}
            </p>
          </div>
        </div>

        {reviews.length !== 0 && (
          <>
            {" "}
            <p className="text-lg font-semibold mb-2">Reviews</p>
            <div className="flex justify-center items-center mt-4">
              {reviews.length > 0 ? (
                <div className="flex justify-center  flex-wrap">
                  {bookDetails.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="mb-4 mr-4 border bg-white rounded-xl p-2 max-w-md"
                    >
                      <div className="flex items-center ">
                        <div className="h-12 w-12 border rounded-full flex items-center justify-center text-gray-800 bg-gray-200 font-bold text-xl">
                          {getInitials(review.user.name)}
                        </div>
                        <p className="text-gray-800 font-bold text-xl ml-4">
                          {review.user.name}
                        </p>
                      </div>
                      <div className="flex items-center mb-2 w-full justify-center">
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="#FFD700"
                              width="24"
                              height="24"
                            >
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700">No reviews yet.</p>
              )}
            </div>
          </>
        )}

        <div className="mb-4">
          <p className="text-lg font-semibold mb-2">Add Your Review:</p>
          <div className="flex items-start flex-col my-4">
            <div className="flex mr-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={star <= rating ? "#FFD700" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => setRating(star)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 2L9 10l-7 2 5 5-1 7 6-4 6 4-1-7 5-5-7-2z"
                  ></path>
                </svg>
              ))}
            </div>
            <textarea
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              rows="3"
              placeholder="Write your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <button
            className="bg-blue-500 mt-4 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
            onClick={submitReview}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
