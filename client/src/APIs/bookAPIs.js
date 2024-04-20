import apiRequest from "./Common/apiCall";

export const addBook = async (data) => {
  const res = await apiRequest("POST", "books/add", data);
  return res;
};

export const getAllBooks = async () => {
  const res = await apiRequest("GET", "books/allBooks");
  return res;
};

export const getBookDetail = async (bookId) => {
  const res = await apiRequest("GET", `books/${bookId}`);
  return res;
};

export const addReview = async (data) => {
  const res = await apiRequest("POST", `reviews/add`, data);
  return res;
};
