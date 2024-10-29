import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlus, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Home() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchBooks = () => {
        axios.get('http://localhost:8000/api/books')
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching books:', error));
    };

    useEffect(() => {
        if (!searchTerm) {
            fetchBooks();
    
            const intervalId = setInterval(() => {
                fetchBooks();
            }, 5000);
    
            return () => clearInterval(intervalId);
        }
    }, [searchTerm]);
        

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchBooks = () => {
        axios.get(`http://localhost:8000/api/books?search=${searchTerm}`)
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error searching books:', error));
    };

    const sortedBooks = books.sort((a, b) => a.title.localeCompare(b.title));

    return (
        <div className="container mt-4">
            <h1 className="text-center">
                <FontAwesomeIcon icon={faHouse} className="fa-fw" /> Home Page
            </h1>
            <div className="text-center mt-2">
                <Link to="/add" className="button">
                    <FontAwesomeIcon icon={faPlus} className="fa-fw" /> Go to Add Page
                </Link>
            </div>

            <div className="input-group mt-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for a book"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={handleSearchBooks}>
                        <FontAwesomeIcon icon={faEye} className="fa-fw" /> Search
                    </button>
                </div>
            </div>

            {/* Book Table */}
            <table className="table table-bordered mt-4">
                <thead>
                    <tr>
                        <th><strong>Title</strong></th>
                        <th><strong>Author</strong></th>
                        <th><strong>Genre</strong></th>
                        <th className="text-center"><strong>Edit</strong></th>
                        <th className="text-center"><strong>View</strong></th>
                    </tr>
                </thead>
                <tbody>
                    {sortedBooks.map((book, index) => (
                        <tr key={index}>
                            <td style={{ verticalAlign: 'middle' }}>{book.title}</td>
                            <td style={{ verticalAlign: 'middle' }}>{book.author}</td>
                            <td style={{ verticalAlign: 'middle' }}>{book.genre}</td>
                            <td className="text-center" style={{ width: '200px' }}>
                                <Link to={`/edit/${book.id}`} className="button">
                                    <FontAwesomeIcon icon={faEdit} className="fa-fw" /> Edit Book
                                </Link>
                            </td>
                            <td className="text-center" style={{ width: '200px' }}>
                                <Link to={`/books/${book.id}`} className="button">
                                    <FontAwesomeIcon icon={faEye} className="fa-fw" /> View Book
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
