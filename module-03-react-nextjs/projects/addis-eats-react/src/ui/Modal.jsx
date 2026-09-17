function Modal({ title, children, onClose }) {
  return (
    <div className="admin-modal-backdrop" role="presentation" onClick={onClose}>
      <section className="admin-modal" role="dialog" aria-modal="true" aria-label={title} onClick={(event) => event.stopPropagation()}>
        <div className="admin-modal-head">
          <h2>{title}</h2>
          <button className="modal-close-button" type="button" onClick={onClose} aria-label="Close">×</button>
        </div>
        {children}
      </section>
    </div>
  );
}

export default Modal;