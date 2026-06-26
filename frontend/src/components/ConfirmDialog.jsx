export const ConfirmDialog = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel'
}) => {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="card confirm-dialog">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="dialog-actions">
          <button className="button secondary" type="button" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className="button" type="button" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
