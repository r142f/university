import './Button.css';

function Button({ type, className, onClick }) {
  className ||= '';

  let icon;

  switch (type) {
    case 'delete':
      icon = '❌';
      break;

    case 'complete':
      icon = '✅';
      break;
    
    default:
      icon = '❓';
  }

  return (
    <button
      type="button"
      className={`btn btn-sm ms-2 p-0 ${className}`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}

export default Button;
