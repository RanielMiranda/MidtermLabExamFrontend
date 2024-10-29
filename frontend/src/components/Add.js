import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AddSuccessModal from './AddSuccessModal';

function Add({ addBook }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            title,
            author,
            published_year: parseInt(publishedYear),
            genre,
            description,
        };

        axios.post('http://127.0.0.1:8000/api/books', formData)
        .then(response => {
            console.log('Book added:', response.data);
            addBook(response.data);
            setShowModal(true);
        })
        .catch(error => {
            console.error('Error adding book:', error.response ? error.response.data : error.message);
            setErrorMessage('Failed to add the book. Reason: ' + (error.response ? error.response.data.message : error.message));
            setShowErrorModal(true);
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setTitle('');
        setAuthor('');
        setPublishedYear('');
        setGenre('');
        setDescription('');
    };

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
        setErrorMessage('');
    };

    return (
        <div className="container mt-4 d-flex flex-column align-items-center justify-content-center">
            <h1 className="mt-4">
                <FontAwesomeIcon icon={faPlus} className="fa-fw" /> Add Page
            </h1>
            <div className="card mt-4" style={{ width: '400px' }}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Author</label>
                            <input
                                type="text"
                                className="form-control"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Published Year</label>
                            <input
                                type="number"
                                className="form-control"
                                value={publishedYear}
                                onChange={(e) => setPublishedYear(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Genre</label>
                            <input
                                type="text"
                                className="form-control"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="d-flex justify-content-around mt-2">
                            <button type="submit" className="button mt-2">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

            <AddSuccessModal 
                show={showModal} 
                title={title} 
                author={author}
                publishedYear={publishedYear}
                genre={genre}
                description={description}
                handleClose={handleCloseModal} 
                action="added"
            />

            {/* Error Modal */}
            <div className={`modal fade ${showErrorModal ? 'show' : ''}`} style={{ display: showErrorModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="errorModalLabel" aria-hidden={!showErrorModal}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-center">
                            <h5 className="modal-title" id="errorModalLabel">Error</h5>
                        </div>
                        <div className="modal-body">
                            <p>{errorMessage}</p>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="button" onClick={handleCloseErrorModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-around mt-2">
                <Link to="/" className="button mt-2">
                    <FontAwesomeIcon icon={faHouse} className="fa-fw" /> Go to Home Page
                </Link>
            </div>            
        </div>
    );
}

export default Add;

