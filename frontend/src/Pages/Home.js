// home.js

import React from 'react';
import BookList from '../components/BookList';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen , faHouse } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    return (
        <div className='container'>
            <div className="container d-flex flex-column align-items-center mt-4">
                <h1>
                    <FontAwesomeIcon icon={faHouse} className="fa-fw"/> Book Management System
                </h1>
            </div>
            <div className="d-flex justify-content-around mt-2">
                <Link to="/add" className="button mt-2">                
                    <FontAwesomeIcon icon={faBookOpen } className="fa-fw"/> Add a book
                </Link>
            </div>               

            <BookList />
        </div>
    );
};

export default Home;
