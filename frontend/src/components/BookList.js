import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';


const BookList = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Fetch books when component mounts or search term changes
    useEffect(() => {
        if (!searchTerm) {
            fetchBooks();
    
            const intervalId = setInterval(() => {
                fetchBooks();
            }, 5000);
    
            return () => clearInterval(intervalId);
        }
    }, [searchTerm]);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/books?search=${searchTerm}`);
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleView = (id) => {
        navigate(`/books/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = async (id, title) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/books/${id}`);
            fetchBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <h4> Search bar</h4>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for a book title or book author here"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={fetchBooks}>
                        <FontAwesomeIcon icon={faEye} className="fa-fw" /> Search
                    </button>
                </div>
            </div>
            <table className="table table-striped mt-2">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published Year</th>
                        <th>Genre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.published_year}</td>
                            <td>{book.genre}</td>
                            <td>
                                <button className="button" onClick={() => handleView(book.id)}>
                                    <FontAwesomeIcon icon={faEye} className="fa-fw" />    View
                                </button>
                                <button className="button" onClick={() => handleEdit(book.id)} >
                                    <FontAwesomeIcon icon={faEdit} className="fa-fw" />    Edit
                                </button>
                                <button className="button button-delete" onClick={() => handleDelete(book.id)} >
                                <FontAwesomeIcon icon={faTrash} className="fa-fw" />    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;
