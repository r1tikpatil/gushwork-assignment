import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

import Loader from "../../common/components/Loader/Loader";
import { getAllBooks } from "../../APIs/bookAPIs";

export default function BookGallary() {
  const navigate = useNavigate();

  const User = localStorage.getItem("user");
  const user = JSON.parse(User);
  const [isLoading, setLoading] = useState(false);
  const [allBooksData, setAllBooksData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getAllBooks();
      if (result.success) {
        const bookData = result.data?.books || [];
        toast.success(result.message);
        setAllBooksData(bookData);
        setFilterData(bookData);
      }
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
  };

  const viewDetails = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredBooks = allBooksData.filter(
      (book) =>
        book.title.toLowerCase().includes(searchText) ||
        book.author.toLowerCase().includes(searchText) ||
        book.genre.toLowerCase().includes(searchText)
    );
    setFilterData(filteredBooks);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-center align-middle text-center">
      <h1 className="my-3 text-2xl font-semibold">Hello👋 {user.name}</h1>

      <div className="mx-5">
        <h1 className="float-left text-2xl ">See all the Books</h1>
        <button className="float-right">
          <Link to="/books/add" className="text-[17px] px-3 font-semibold">
            Add A Book
          </Link>
        </button>
      </div>

      <div className="bg-slate-300 my-5 p-3 rounded-md">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Search Here"
          onChange={handleSearch}
        />
      </div>

      {filterData.length === 0 ? (
        <p className="text-lg text-center mt-8">No books to show</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-5">
          {filterData.map((book) => (
            <div className="p-4 bg-white shadow-md rounded-md overflow-hidden">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {book.title}
              </h3>
              <p className="text-gray-700 mb-2">
                Written by <span className="font-semibold">{book.author}</span>
              </p>
              <p className="text-gray-700 mb-4">
                Genre: <span className="font-semibold">{book.genre}</span>
              </p>
              <button
                onClick={() => {
                  viewDetails(book._id);
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Explore
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
