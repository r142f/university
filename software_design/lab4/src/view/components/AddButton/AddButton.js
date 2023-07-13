function AddButton({ placeholder, onClick }) {
  placeholder ||= 'Item name';
  return (
    <div className="form-group d-inline-flex">
      <input
        type="text"
        className="form-control p-0 px-1"
        placeholder={placeholder}
        aria-label={placeholder}
      />
      <button type="button" className="btn btn-lg ms-1 p-0" onClick={onClick}>
        ➕
      </button>
    </div>
  );
}

export default AddButton;
