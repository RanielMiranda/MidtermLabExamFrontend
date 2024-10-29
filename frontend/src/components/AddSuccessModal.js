//AddSuccessModal.js
import React from 'react';

function AddSuccessModal({ show, title, author, publishedYear, genre, description, handleClose, action }) {
    return (
        <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={!show}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center">
                        <h5 className="modal-title" id="exampleModalLabel">Book {action}</h5>
                    </div>
                    <div className="modal-body">
                        <p><strong>{title}</strong> has been {action}.</p>
                        <p>Here are the details:</p>
                        <ul>
                            <li><strong>Author:</strong> {author}</li>
                            <li><strong>Published Year:</strong> {publishedYear}</li>
                            <li><strong>Genre:</strong> {genre}</li>
                            <li><strong>Description:</strong> {description}</li>
                        </ul>
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="button" className="button" onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddSuccessModal;
