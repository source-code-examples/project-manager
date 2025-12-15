import React from "react";
import "./DeleteModal.css";

const DeleteModal = ({ show, projectTitle, onConfirm, onCancel }) => {
  if (!show) return null; // Modal nur anzeigen, wenn show=true

  return (
    <div className="modal_overlay">
      <div className="modal_content">
        <h3>Delete Project?</h3>
        <p>
          Are you sure you want to delete <strong>{projectTitle}</strong>?
        </p>
        <div className="modal_actions">
          <button className="btn_confirm" onClick={onConfirm}>
            Yes, delete it.
          </button>
          <button className="btn_cancel" onClick={onCancel}>
            No, keep it.
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
