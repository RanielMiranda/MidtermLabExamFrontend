import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons';

function BookDetails() {
    const { id } = useParams(); // Get the book ID from the URL
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/books/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book:', error);
                setError('Failed to load book data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="card container" style={{ width: "800px" }}>
                <h2 className="d-flex justify-content-center mt-2">
                    <FontAwesomeIcon icon={faBookOpenReader} className="fa-fw" /> <strong>Book Details</strong>
                </h2>

                <p><strong>Book Title:</strong> {book.title}</p>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Published Year:</strong> {book.published_year}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p><strong>Description:</strong> {book.description}</p>
            </div>
        </div>
    );
}

export default BookDetails;
