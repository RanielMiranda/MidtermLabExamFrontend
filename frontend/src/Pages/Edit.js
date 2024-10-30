//Edit.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faEdit } from '@fortawesome/free-solid-svg-icons';
import BookForm from '../components/BookForm';

function Edit() {

    const { id } = useParams();
    
    return (
        <div className="container mt-4 d-flex flex-column align-items-center justify-content-center">
            <h1>
                <FontAwesomeIcon icon={faHouse} className="fa-fw"/> Book Management System
            </h1>         
            <h2 className="mt-2">
                <FontAwesomeIcon icon={faEdit} className="fa-fw" /> Edit Page
            </h2>
            <div className="card mt-4" style={{ width: '400px' }}>
                <div className="card-body">
                    <BookForm bookID={id} editBook={(updatedBook) => {/* handle updating state if needed */}} />
                </div>
            </div>
            <div className="d-flex justify-content-around mt-2">
                <Link to="/" className="button mt-2">
                    <FontAwesomeIcon icon={faHouse} className="fa-fw" /> Go back to Home Page
                </Link>
            </div>
        </div>
    );
}

export default Edit;

