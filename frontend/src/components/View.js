import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function View() {
    const { id } = useParams(); // Get the book ID from the URL
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/books/${id}`)
            .then(response => {
                setBook(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching book:', error);
                setError('Failed to load book data. Please try again.');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h1 className="mt-4">
                <FontAwesomeIcon icon={faEye} className="fa-fw" /> View Page
            </h1>
            <h1 className = "d-flex justify-content-center mt-2"><strong>Book Description</strong></h1>            
            <div className="card container" style={{width: "800px"}}>
                <h2 className = "d-flex justify-content-center mt-2"><strong>{book.title}</strong></h2>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Published Year:</strong> {book.published_year}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p><strong>Description:</strong> {book.description}</p>
            </div>
            <div className="d-flex justify-content-around mt-2">
                <Link to="/" className="button btn-success mt-2">
                    <FontAwesomeIcon icon={faHouse} className="fa-fw" /> Go to Home Page
                </Link>
            </div>            
        </div>
    );
}

export default View;
