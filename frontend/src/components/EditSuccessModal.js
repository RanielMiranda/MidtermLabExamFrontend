// EditSuccessModal.js
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function EditSuccessModal({ show, originalValues, newValues, handleClose }) {
    const changes = [];

    Object.keys(originalValues).forEach((key) => {
        if (originalValues[key] !== newValues[key]) {
            changes.push(
                <div key={key}>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {originalValues[key]} <FontAwesomeIcon icon={faArrowRight} className="fa-fw" /> {newValues[key]}
                </div>
            );
        }
    });

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="w-100 text-center">Changes Made</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {changes.length > 0 ? (
                    <div>{changes}</div>
                ) : (
                    <p>No changes made.</p>
                )}
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <button className="button" onClick={handleClose}>Close</button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditSuccessModal;


