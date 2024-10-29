// Add.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlus } from '@fortawesome/free-solid-svg-icons';
import BookForm from '../components/BookForm';

function Add({ addBook }) {
    return (
        <div className="container mt-4 d-flex flex-column align-items-center justify-content-center">
            <h1>
                <FontAwesomeIcon icon={faHouse} className="fa-fw"/> Book Management System
            </h1>         
            <h2 className="mt-2">
                <FontAwesomeIcon icon={faPlus} className="fa-fw" /> Add Page
            </h2>
            <div className="card mt-4" style={{ width: '400px' }}>
                <div className="card-body">
                    <BookForm addBook={addBook} />
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

export default Add;
