import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/login.component";
import SignUp from "./Components/SignUp/signUp.component";
import Error from "./common/components/Error/error.component";
import BookGallery from "./Components/BookGallery/bookGallery.component";
import Navbar from "./common/components/Navbar/Navbar";
import AddBook from "./Components/AddBook/addBook.component";
import BookDetails from "./Components/BookDetail/bookDetail.component";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="pt-14">
        <Routes>
          <Route index element={<Home />} />

          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/books/allBooks" element={<BookGallery />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/books/:id" element={<BookDetails />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
