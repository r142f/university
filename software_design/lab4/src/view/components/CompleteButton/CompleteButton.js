import Button from '../Button/Button.js';

function CompleteButton({ className, onClick }) {
  return <Button type="complete" className={className} onClick={onClick} />;
}

export default CompleteButton;
