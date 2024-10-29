// DeleteSuccessModal.js
import React from 'react';
import { Modal } from 'react-bootstrap';

function DeleteSuccessModal({ show, title, handleClose }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="w-100 text-center">Book Deleted</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>{title}</strong> has been deleted.</p>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <button className="button" onClick={handleClose}>Close</button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteSuccessModal;

