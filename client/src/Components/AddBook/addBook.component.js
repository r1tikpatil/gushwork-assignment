import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { addBook } from "../../APIs/bookAPIs";

export default function AddBook() {
  const navigate = useNavigate();
  const defaultData = {
    title: "",
    author: "",
    genre: "",
    description: "",
  };
  const [formData, setFormData] = useState(defaultData);

  const onSubmitForm = async () => {
    if (formData.description.length <= 500) {
      return toast.error("Description must be greater than 500 characters.");
    }
    try {
      const res = await addBook(formData);
      if (res.success) {
        toast.success(res.message);
        navigate("/books/allBooks");
        setFormData(defaultData);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  function changeHandler(event) {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  return (
    <div className="max-w-md mt-10 mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <p className="mb-6 text-2xl font-semibold">Add a New Book</p>

      <div className="space-y-4 w-full">
        <div className="space-y-1">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={changeHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={changeHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-700"
          >
            Genre:
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={changeHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={changeHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          onClick={onSubmitForm}
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Book
        </button>
      </div>
    </div>
  );
}
