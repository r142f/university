import Button from '../Button/Button.js';

function DeleteButton({ className, onClick }) {
  return <Button type="delete" className={className} onClick={onClick} />;
}

export default DeleteButton;
