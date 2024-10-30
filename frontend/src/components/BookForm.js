import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddSuccessModal from './AddSuccessModal';
import EditSuccessModal from './EditSuccessModal';

function BookForm({ addBook, editBook, bookID }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [originalValues, setOriginalValues] = useState({});

    // Load book details if editing
    useEffect(() => {
        if (bookID) {
            axios.get(`http://127.0.0.1:8000/api/books/${bookID}`)
                .then(response => {
                    const book = response.data;
                    setTitle(book.title);
                    setAuthor(book.author);
                    setPublishedYear(book.published_year);
                    setGenre(book.genre);
                    setDescription(book.description);
                    setOriginalValues({
                        title: book.title,
                        author: book.author,
                        publishedYear: book.published_year,
                        genre: book.genre,
                        description: book.description
                    });                    
                })
                .catch(error => {
                    console.error("Error fetching book details:", error);
                    setErrorMessage("Failed to load book details.");
                    setShowErrorModal(true);
                });
        }
    }, [bookID]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            title,
            author,
            published_year: parseInt(publishedYear),
            genre,
            description,
        };

        const request = bookID
            ? axios.put(`http://127.0.0.1:8000/api/books/${bookID}`, formData)
            : axios.post('http://127.0.0.1:8000/api/books', formData);

        request
            .then(response => {
                console.log('Book', bookID ? 'updated:' : 'added:', response.data);
                if (bookID) {
                    editBook(response.data);
                } else {
                    addBook(response.data);
                }
                setShowModal(true);
            })
            .catch(error => {
                console.error('Error submitting form:', error.response ? error.response.data : error.message);
                setErrorMessage('Failed to submit the form. Reason: ' + (error.response ? error.response.data.message : error.message));
                setShowErrorModal(true);
            });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        if (!bookID) {
            setTitle('');
            setAuthor('');
            setPublishedYear('');
            setGenre('');
            setDescription('');
        }
    };

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
        setErrorMessage('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Form fields remain the same */}
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
                    <button type="submit" className="button mt-2">
                        {bookID ? 'Update' : 'Submit'}
                    </button>
                </div>
            </form>
            
            {bookID ? (
                <EditSuccessModal 
                    show={showModal} 
                    originalValues={originalValues} 
                    newValues={{ title, author, publishedYear, genre, description }}
                    handleClose={handleCloseModal} 
                />
            ) : (
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
            )}

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
        </div>
    );
}

export default BookForm;
