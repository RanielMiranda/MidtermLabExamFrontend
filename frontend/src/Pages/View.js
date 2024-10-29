import React from 'react';
import BookDetails from '../components/BookDetails';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faEye } from '@fortawesome/free-solid-svg-icons';

const View = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h1>
                <FontAwesomeIcon icon={faHouse} className="fa-fw"/> Book Management System
            </h1>            
            <h2 className="mt-2">
                <strong><FontAwesomeIcon icon={faEye} className="fa-fw" /> View Page</strong>
            </h2>            
            <BookDetails className/>
        <div className="d-flex justify-content-around mt-2">
            <Link to="/" className="button btn-success mt-2">
                <FontAwesomeIcon icon={faHouse} className="fa-fw" /> Go back to Home Page
            </Link>
        </div>
    </div>
    );
};

export default View