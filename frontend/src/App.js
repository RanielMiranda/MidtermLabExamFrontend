import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home.js';
import Add from './Pages/Add.js';
import Edit from './Pages/Edit.js';
import View from './Pages/View.js';  
import './App.css';
import './components/ButtonStyles.css';


function App() {
  const [books, setBooks] = useState([]); // State to hold the list of books

  
  const addBook = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]); // Update the state with the new book
  };

  return (
    <div className="auth-wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Home books={books} />} />
          <Route path="/add" element={<Add addBook={addBook} />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/books/:id" element={<View />} />
        </Routes>
      </Router>      
    </div>
  );
}

export default App;
