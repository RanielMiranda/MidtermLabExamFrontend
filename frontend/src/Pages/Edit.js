//Edit.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditSuccessModal from '../components/EditSuccessModal';
import axios from 'axios';

function Edit() {
    const { id } = useParams();
    const [book, setBook] = useState({ title: '', author: '', published_year: '', genre: '', description: '' });
    const [originalValues, setOriginalValues] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showEditSuccessModal, setShowEditSuccessModal] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/books/${id}`)
            .then(response => {
                setBook(response.data);
                setOriginalValues(response.data); // Store original values
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching book:', error);
                setError('Failed to load book data. Please try again.');
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({ ...prevBook, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/books/${id}`, book)
            .then(response => {
                console.log('Book updated:', response.data);
                setShowEditSuccessModal(true); // Show edit success modal
            })
            .catch(error => {
                console.error('Error updating book:', error);
                setError('Failed to update the book. Please try again.');
            });
    };

    const handleCloseEditSuccessModal = () => {
        setShowEditSuccessModal(false);
        navigate('/');
    };


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h1 className="mt-4">
                <FontAwesomeIcon icon={faEdit} className="fa-fw" /> Edit Page
            </h1>
            <div className="card container mt-4" style={{width: "800px"}}>
                <form onSubmit={handleSubmit}>
                    <div className="mt-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            value={book.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mt-3">
                        <label className="form-label">Author</label>
                        <input
                            type="text"
                            name="author"
                            className="form-control"
                            value={book.author}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mt-3">
                        <label className="form-label">Published Year</label>
                        <input
                            type="number"
                            name="published_year"
                            className="form-control"
                            value={book.published_year}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mt-3">
                        <label className="form-label">Genre</label>
                        <input
                            type="text"
                            name="genre"
                            className="form-control"
                            value={book.genre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mt-3">
                        <label className="form-label">Description</label>
                        <textarea
                            name="description"
                            className="form-control"
                            value={book.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                        <button type="submit" className="button button-edit mt-2">Update Book</button>
                    </div>
                </form>
            </div>

            <EditSuccessModal 
                show={showEditSuccessModal}  // Updated to match the new state variable name
                originalValues={originalValues} 
                newValues={book} 
                handleClose={handleCloseEditSuccessModal}  // Updated to match the new close function
            />
            <div className="d-flex justify-content-around mt-2">
                <Link to="/" className="button mt-2">
                    <FontAwesomeIcon icon={faHouse} className="fa-fw" /> Go to Home Page
                </Link>
            </div>                
        </div>
    );
}

export default Edit;

