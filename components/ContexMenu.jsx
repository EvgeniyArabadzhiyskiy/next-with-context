const ContexMenu = ({ onClose, onDelete, onCancelDeletion, activ }) => {
  return (
    <div style={{ backgroundColor: activ ? "red" : "blue" }}>
      <button type="button" onClick={onClose}>Close</button>
      <button type="button" onClick={onDelete}>Delete</button>
      <button type="button" onClick={onCancelDeletion}>Cancel</button>
    </div>
  );
};

export default ContexMenu;
